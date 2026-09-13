#!/usr/bin/env node
/**
 * Self-hosts the AI assets for the in-browser background remover
 * (/remove-background) so the site never depends on imgly's CDN.
 *
 * Downloads from the official staticimgly.com bundle that matches the
 * installed @imgly/background-removal version:
 *   - resources.json               (chunk manifest the library reads)
 *   - ort-wasm-simd-threaded.wasm  (ONNX Runtime CPU backend)
 *   - ort-wasm-simd-threaded.mjs   (its loader glue)
 *   - models/isnet_quint8          (the "small" model we run)
 *
 * Files land in public/imgly/bg-removal/ (flat, content-hash named chunks)
 * and are served at /imgly/bg-removal/. Idempotent: existing chunks whose
 * size already matches are skipped.
 *
 * Usage: node scripts/fetch-bg-removal-assets.mjs
 */

import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUT_DIR = path.join(ROOT, "public", "imgly", "bg-removal");

// Resources we actually use (see app/composables/useBackgroundRemoval.ts:
// device 'cpu', model 'small' → isnet_quint8).
const NEEDED_KEYS = [
    "/onnxruntime-web/ort-wasm-simd-threaded.wasm",
    "/onnxruntime-web/ort-wasm-simd-threaded.mjs",
    "/models/isnet_quint8",
];

const pkg = JSON.parse(
    readFileSync(path.join(ROOT, "node_modules", "@imgly", "background-removal", "package.json"), "utf8")
);
const BASE = `https://staticimgly.com/@imgly/background-removal-data/${pkg.version}/dist/`;

async function download(url)
{
    const res = await fetch(url);
    if (!res.ok) throw new Error(`GET ${url} → HTTP ${res.status}`);

    return Buffer.from(await res.arrayBuffer());
}

function sha256(buf)
{
    return createHash("sha256").update(buf).digest("hex");
}

async function main()
{
    mkdirSync(OUT_DIR, { recursive: true });

    console.log(`Fetching asset manifest for @imgly/background-removal@${pkg.version}`);
    const manifestBuf = await download(`${BASE}resources.json`);
    const manifest = JSON.parse(manifestBuf.toString("utf8"));

    // Persist the full manifest (tiny) — the library looks up keys in it.
    writeFileSync(path.join(OUT_DIR, "resources.json"), manifestBuf);

    const wanted = [];
    for (const key of NEEDED_KEYS)
    {
        const entry = manifest[key];
        if (!entry) throw new Error(`Manifest is missing ${key}`);
        for (const chunk of entry.chunks) wanted.push(chunk);
    }

    let downloaded = 0;
    let skipped = 0;
    for (const chunk of wanted)
    {
        const name = chunk.name ?? chunk.hash;
        const size = chunk.offsets[1] - chunk.offsets[0];
        const dest = path.join(OUT_DIR, name);

        if (existsSync(dest))
        {
            const stat = readFileSync(dest);
            if (stat.length === size && sha256(stat) === chunk.hash)
            {
                skipped++;
                continue;
            }
        }

        process.stdout.write(`  ${name.slice(0, 12)}… (${(size / 1e6).toFixed(1)} MB) `);
        const buf = await download(`${BASE}${name}`);
        if (buf.length !== size) throw new Error(`Size mismatch for ${name}`);
        if (sha256(buf) !== chunk.hash) throw new Error(`Hash mismatch for ${name}`);
        writeFileSync(dest, buf);
        downloaded++;
        process.stdout.write("ok\n");
    }

    console.log(`Done: ${downloaded} chunk(s) downloaded, ${skipped} already up to date.`);
    console.log(`Assets served at /imgly/bg-removal/`);
}

main().catch((err) =>
{
    console.error(err.message ?? err);
    process.exit(1);
});