<template>
    <div class="remover">
        <!-- ══ Idle: upload card ══ -->
        <div
            v-if="phase === 'idle'"
            class="upload-card"
            :class="{ 'drag-over': dragOver }"
            @dragover.prevent="dragOver = true"
            @dragleave.prevent="dragOver = false"
            @drop.prevent="onDrop"
        >
            <div class="upload-inner">
                <button class="upload-btn" @click="openPicker">
                    <svg
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                    >
                        <path d="M9,16V10H5L12,3L19,10H15V16H9M5,20V18H19V20H5Z" />
                    </svg>
                    Upload Image
                </button>
                <p class="upload-hint">
                    or drop a file, paste image or
                </p>
                <form class="url-form" @submit.prevent="submitUrl">
                    <input
                        v-model="urlInput"
                        type="url"
                        class="url-input"
                        placeholder="https://example.com/image.jpg"
                        aria-label="Image URL"
                    >
                    <button type="submit" class="url-go" :disabled="!urlInput.trim()">
                        URL
                    </button>
                </form>
                <p class="privacy-note">
                    <svg
                        width="13"
                        height="13"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                    >
                        <path d="M12,17A2,2 0 0,0 14,15C14,13.89 13.1,13 12,13A2,2 0 0,0 10,15A2,2 0 0,0 12,17M18,8A2,2 0 0,1 20,10V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V10C4,8.89 4.9,8 6,8H7V6A5,5 0 0,1 12,1A5,5 0 0,1 17,6V8H18M12,3A3,3 0 0,0 9,6V8H15V6A3,3 0 0,0 12,3Z" />
                    </svg>
                    Your files never leave this device — 100% in-browser processing
                </p>
            </div>
            <input
                ref="fileInput"
                type="file"
                accept="image/*"
                class="hidden-input"
                @change="onFilePicked"
            >
        </div>

        <!-- ══ Working: model download / inference ══ -->
        <div v-else-if="phase === 'working'" class="working-card">
            <div class="working-preview" :style="{ backgroundImage: `url(${originalUrl})` }" />
            <div class="working-body">
                <div class="spinner" />
                <p class="working-title">
                    {{ status === 'loading' ? 'Downloading AI model…' : 'Removing background…' }}
                </p>
                <div class="progress-track">
                    <div class="progress-fill" :style="{ width: progress + '%' }" />
                </div>
                <p class="working-sub">
                    {{ status === 'loading'
                        ? 'One-time download (~55 MB), cached by your browser. Your image never leaves this device.'
                        : 'The AI is cutting out your subject — hang tight.' }}
                </p>
                <button class="link-btn" @click="cancel">
                    Cancel
                </button>
            </div>
        </div>

        <!-- ══ Done: result ══ -->
        <div v-else-if="phase === 'done'" class="result-card">
            <div class="result-toolbar">
                <div class="toolbar-left">
                    <button class="tool-btn" @click="startOver">
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                        >
                            <path d="M17.65,6.35C16.2,4.9 14.21,4 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20C15.73,20 18.84,17.45 19.73,14H17.65C16.83,16.33 14.61,18 12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6C13.66,6 15.14,6.69 16.22,7.78L13,11H20V4L17.65,6.35Z" />
                        </svg>
                        New image
                    </button>
                    <button
                        class="tool-btn"
                        @mousedown="showOriginal = true"
                        @mouseup="showOriginal = false"
                        @mouseleave="showOriginal = false"
                        @touchstart.prevent="showOriginal = true"
                        @touchend.prevent="showOriginal = false"
                    >
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                        >
                            <path d="M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17M12,4.5C7,4.5 2.73,7.61 1,12C2.73,16.39 7,19.5 12,19.5C17,19.5 21.27,16.39 23,12C21.27,7.61 17,4.5 12,4.5Z" />
                        </svg>
                        Hold to compare
                    </button>
                </div>
                <div class="toolbar-right">
                    <span class="bg-label">Background:</span>
                    <button
                        v-for="opt in bgOptions"
                        :key="opt.id"
                        class="swatch"
                        :class="[opt.id, { active: bgChoice === opt.id }]"
                        :title="opt.label"
                        @click="bgChoice = opt.id"
                    />
                </div>
            </div>

            <div
                class="result-stage"
                :class="{ checker: bgChoice === 'transparent' }"
                :style="bgChoice !== 'transparent' ? { background: bgChoice } : {}"
            >
                <img
                    :src="showOriginal ? originalUrl : resultUrl"
                    :alt="showOriginal ? 'Original image' : 'Background removed'"
                    class="result-img"
                    draggable="false"
                >
            </div>

            <div class="result-actions">
                <button class="download-btn" @click="download">
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                    >
                        <path d="M5,20H19V18H5M19,9H15V3H9V9H5L12,16L19,9Z" />
                    </svg>
                    Download {{ bgChoice === 'transparent' ? 'PNG' : 'Image' }}
                </button>
                <p class="result-note">
                    Full resolution · Transparent PNG · Free forever — no credits, no sign-up
                </p>
            </div>
        </div>

        <!-- ══ Error ══ -->
        <div v-if="errorMsg" class="error-banner" role="alert">
            <span>{{ errorMsg }}</span>
            <button class="error-close" aria-label="Dismiss" @click="errorMsg = null">
                ×
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from "vue";

// useBackgroundRemoval is auto-imported by Nuxt (app/composables)

type Phase = "idle" | "working" | "done";

const { status, progress, error, remove, reset, preload } = useBackgroundRemoval();

const phase = ref<Phase>("idle");
const dragOver = ref(false);
const urlInput = ref("");
const errorMsg = ref<string | null>(null);
const fileInput = ref<HTMLInputElement | null>(null);

const originalUrl = ref("");
const resultUrl = ref("");
const resultBlob = ref<Blob | null>(null);
const originalBlob = ref<Blob | null>(null);
const fileName = ref("image");
const showOriginal = ref(false);
const bgChoice = ref<"transparent" | "#ffffff" | "#111827">("transparent");

const bgOptions = [
    { id: "transparent" as const, label: "Transparent" },
    { id: "#ffffff" as const, label: "White" },
    { id: "#111827" as const, label: "Dark" },
];

const busy = computed(() => status.value === "loading" || status.value === "processing");

function revoke(url : string)
{
    if (url && url.startsWith("blob:"))
    {
        URL.revokeObjectURL(url);
    }
}

function openPicker()
{
    preload();
    fileInput.value?.click();
}

function onFilePicked(e : Event)
{
    const file = (e.target as HTMLInputElement).files?.[0];
    if (file)
    {
        handleFile(file);
    }
    // allow picking the same file twice
    if (fileInput.value)
    {
        fileInput.value.value = "";
    }
}

function onDrop(e : DragEvent)
{
    dragOver.value = false;
    const file = e.dataTransfer?.files?.[0];
    if (file && file.type.startsWith("image/"))
    {
        handleFile(file);
    }
    else
    {
        errorMsg.value = "That does not look like an image file.";
    }
}

async function submitUrl()
{
    const url = urlInput.value.trim();
    if (!url)
    {
        return;
    }
    errorMsg.value = null;
    try
    {
        const res = await fetch(url);
        if (!res.ok)
        {
            throw new Error(`HTTP ${res.status}`);
        }
        const blob = await res.blob();
        if (!blob.type.startsWith("image/"))
        {
            throw new Error("That URL did not return an image.");
        }
        const name = url.split("/").pop()?.split("?")[0] || "image";
        handleFile(blob, name.replace(/\.[^.]+$/, "") || "image");
        urlInput.value = "";
    }
    catch
    {
        errorMsg.value = "Could not load that image URL (the site may block cross-origin access). Try downloading it and uploading the file instead.";
    }
}

async function handleFile(blob : Blob, name ?: string)
{
    if (!blob.type.startsWith("image/"))
    {
        errorMsg.value = "Please choose an image file (PNG, JPG, WebP…).";

        return;
    }
    if (busy.value)
    {
        return;
    }

    errorMsg.value = null;
    fileName.value = name ?? ("name" in blob && typeof (blob as File).name === "string"
        ? (blob as File).name.replace(/\.[^.]+$/, "")
        : "image");

    revoke(originalUrl.value);
    revoke(resultUrl.value);
    originalBlob.value = blob;
    originalUrl.value = URL.createObjectURL(blob);
    phase.value = "working";

    try
    {
        const out = await remove(blob);
        resultBlob.value = out;
        resultUrl.value = URL.createObjectURL(out);
        phase.value = "done";
    }
    catch
    {
        phase.value = "idle";
        errorMsg.value = error.value ?? "Background removal failed. Try a different image.";
        reset();
    }
}

function cancel()
{
    // Inference can't be aborted mid-flight, but the user can bail out of the UI.
    reset();
    phase.value = "idle";
}

function startOver()
{
    reset();
    phase.value = "idle";
    revoke(originalUrl.value);
    revoke(resultUrl.value);
    originalUrl.value = "";
    resultUrl.value = "";
    resultBlob.value = null;
    originalBlob.value = null;
    showOriginal.value = false;
    bgChoice.value = "transparent";
    errorMsg.value = null;
}

async function download()
{
    if (!resultBlob.value)
    {
        return;
    }

    let blob = resultBlob.value;
    const ext = "png";

    if (bgChoice.value !== "transparent")
    {
        // Composite the cut-out onto the chosen solid background
        const bitmap = await createImageBitmap(resultBlob.value);
        const canvas = document.createElement("canvas");
        canvas.width = bitmap.width;
        canvas.height = bitmap.height;
        const ctx = canvas.getContext("2d");
        if (ctx)
        {
            ctx.fillStyle = bgChoice.value;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(bitmap, 0, 0);
            blob = await new Promise<Blob>((resolve, reject) => canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("Export failed"))), "image/png"));
        }
        bitmap.close();
    }

    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `${fileName.value}-no-bg.${ext}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => revoke(a.href), 5000);
}

function onPaste(e : ClipboardEvent)
{
    if (phase.value !== "idle")
    {
        return;
    }
    const items = e.clipboardData?.items;
    if (!items)
    {
        return;
    }
    for (const item of items)
    {
        if (item.type.startsWith("image/"))
        {
            const blob = item.getAsFile();
            if (blob)
            {
                e.preventDefault();
                handleFile(blob, "pasted-image");

                return;
            }
        }
    }
}

onMounted(() =>
{
    window.addEventListener("paste", onPaste);
    preload();
});

onBeforeUnmount(() =>
{
    window.removeEventListener("paste", onPaste);
    revoke(originalUrl.value);
    revoke(resultUrl.value);
});
</script>

<style scoped>
.remover {
    width: 100%;
    max-width: 640px;
    margin: 0 auto;
    position: relative;
}

/* ── Upload card ─────────────────────────────────────────── */
.upload-card {
    background: #ffffff;
    border: 2px dashed #cbd5e1;
    border-radius: 20px;
    padding: 3rem 2rem 2rem;
    text-align: center;
    box-shadow: 0 20px 60px rgba(15, 23, 42, 0.08);
    transition: border-color 0.2s, background 0.2s, transform 0.2s, box-shadow 0.2s;
}

.upload-card:hover {
    border-color: #93c5fd;
    box-shadow: 0 24px 70px rgba(37, 99, 235, 0.10);
}

.upload-card.drag-over {
    border-color: #2563eb;
    background: #eff6ff;
    transform: scale(1.01);
}

.upload-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.625rem;
    background: #2563eb;
    color: #ffffff;
    font-size: 1.25rem;
    font-weight: 600;
    padding: 1rem 2.5rem;
    border: none;
    border-radius: 9999px;
    cursor: pointer;
    transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
    box-shadow: 0 8px 24px rgba(37, 99, 235, 0.35);
}

.upload-btn:hover {
    background: #1d4ed8;
    transform: translateY(-2px);
    box-shadow: 0 12px 28px rgba(37, 99, 235, 0.45);
}

.upload-hint {
    margin: 1.25rem 0 0.75rem;
    color: #64748b;
    font-size: 0.9375rem;
}

.url-form {
    display: flex;
    gap: 0.5rem;
    max-width: 380px;
    margin: 0 auto;
}

.url-input {
    flex: 1;
    min-width: 0;
    padding: 0.625rem 1rem;
    border: 1.5px solid #e2e8f0;
    border-radius: 9999px;
    font-size: 0.875rem;
    outline: none;
    transition: border-color 0.2s;
}

.url-input:focus {
    border-color: #2563eb;
}

.url-go {
    padding: 0.625rem 1.25rem;
    border: 1.5px solid #2563eb;
    border-radius: 9999px;
    background: transparent;
    color: #2563eb;
    font-weight: 600;
    font-size: 0.875rem;
    cursor: pointer;
    transition: all 0.2s;
}

.url-go:hover:not(:disabled) {
    background: #2563eb;
    color: #ffffff;
}

.url-go:disabled {
    opacity: 0.4;
    cursor: not-allowed;
}

.hidden-input {
    display: none;
}

.privacy-note {
    display: inline-flex;
    align-items: center;
    gap: 0.375rem;
    margin: 1.5rem 0 0;
    font-size: 0.75rem;
    font-weight: 600;
    color: #059669;
}

.privacy-note svg {
    flex-shrink: 0;
}

/* ── Working card ────────────────────────────────────────── */
.working-card {
    background: #ffffff;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 20px 60px rgba(15, 23, 42, 0.12);
    display: flex;
    flex-direction: column;
}

.working-preview {
    height: 220px;
    background-size: cover;
    background-position: center;
    filter: blur(6px) saturate(0.8);
    opacity: 0.6;
}

.working-body {
    padding: 2rem;
    text-align: center;
}

.spinner {
    width: 40px;
    height: 40px;
    margin: 0 auto 1rem;
    border: 4px solid #e2e8f0;
    border-top-color: #2563eb;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
}

@keyframes spin {
    to { transform: rotate(360deg); }
}

.working-title {
    font-size: 1.125rem;
    font-weight: 700;
    color: #0f172a;
    margin: 0 0 1rem;
}

.progress-track {
    height: 8px;
    background: #e2e8f0;
    border-radius: 9999px;
    overflow: hidden;
    margin-bottom: 0.75rem;
}

.progress-fill {
    height: 100%;
    background: linear-gradient(90deg, #2563eb, #60a5fa);
    border-radius: 9999px;
    transition: width 0.3s ease;
}

.working-sub {
    font-size: 0.8125rem;
    color: #64748b;
    margin: 0 0 1rem;
}

.link-btn {
    background: none;
    border: none;
    color: #64748b;
    font-size: 0.875rem;
    text-decoration: underline;
    cursor: pointer;
}

.link-btn:hover {
    color: #0f172a;
}

/* ── Result card ─────────────────────────────────────────── */
.result-card {
    background: #ffffff;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 20px 60px rgba(15, 23, 42, 0.12);
}

.result-toolbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 0.75rem;
    padding: 0.875rem 1.25rem;
    border-bottom: 1px solid #f1f5f9;
}

.toolbar-left,
.toolbar-right {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.tool-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.375rem;
    padding: 0.5rem 0.875rem;
    border: 1.5px solid #e2e8f0;
    border-radius: 9999px;
    background: #ffffff;
    color: #334155;
    font-size: 0.8125rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    user-select: none;
}

.tool-btn:hover {
    border-color: #2563eb;
    color: #2563eb;
}

.bg-label {
    font-size: 0.8125rem;
    color: #64748b;
    font-weight: 600;
}

.swatch {
    width: 26px;
    height: 26px;
    border-radius: 50%;
    border: 2px solid #e2e8f0;
    cursor: pointer;
    transition: transform 0.15s, border-color 0.15s;
    padding: 0;
}

.swatch.transparent {
    background: conic-gradient(#e2e8f0 25%, #ffffff 0 50%, #e2e8f0 0 75%, #ffffff 0);
    background-size: 10px 10px;
}

.swatch.\#ffffff { background: #ffffff; }
.swatch.\#111827 { background: #111827; }

.swatch.active {
    border-color: #2563eb;
    transform: scale(1.15);
}

.result-stage {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 320px;
    max-height: 480px;
    padding: 1.5rem;
    overflow: hidden;
}

.result-stage.checker {
    background: conic-gradient(#e5e7eb 25%, #ffffff 0 50%, #e5e7eb 0 75%, #ffffff 0);
    background-size: 20px 20px;
}

.result-img {
    max-width: 100%;
    max-height: 440px;
    object-fit: contain;
    user-select: none;
    filter: drop-shadow(0 8px 24px rgba(15, 23, 42, 0.15));
}

.result-actions {
    padding: 1.25rem 1.5rem 1.5rem;
    text-align: center;
    border-top: 1px solid #f1f5f9;
}

.download-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.625rem;
    background: #2563eb;
    color: #ffffff;
    font-size: 1.0625rem;
    font-weight: 700;
    padding: 0.875rem 2.25rem;
    border: none;
    border-radius: 9999px;
    cursor: pointer;
    transition: background 0.2s, transform 0.2s;
    box-shadow: 0 8px 24px rgba(37, 99, 235, 0.35);
}

.download-btn:hover {
    background: #1d4ed8;
    transform: translateY(-2px);
}

.result-note {
    margin: 0.75rem 0 0;
    font-size: 0.8125rem;
    color: #64748b;
}

/* ── Error banner ────────────────────────────────────────── */
.error-banner {
    margin-top: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    background: #fef2f2;
    border: 1px solid #fecaca;
    color: #b91c1c;
    border-radius: 12px;
    padding: 0.75rem 1rem;
    font-size: 0.875rem;
}

.error-close {
    background: none;
    border: none;
    color: #b91c1c;
    font-size: 1.25rem;
    line-height: 1;
    cursor: pointer;
    padding: 0 0.25rem;
}

@media (max-width: 640px) {
    .upload-card { padding: 2rem 1.25rem; }
    .upload-btn { font-size: 1.0625rem; padding: 0.875rem 1.75rem; }
    .result-toolbar { flex-direction: column; align-items: stretch; }
    .toolbar-left, .toolbar-right { justify-content: center; }
    .result-stage { min-height: 240px; }
}
</style>