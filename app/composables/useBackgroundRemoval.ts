import { ref, readonly } from "vue";

export type RemovalStatus = "idle" | "loading" | "processing" | "done" | "error";

/**
 * Client-side AI background removal, powered by @imgly/background-removal.
 * Runs an ISNet segmentation model fully in the browser (ONNX Runtime Web) —
 * no image ever leaves the user's device. The model weights (~40 MB) are
 * fetched from imgly's CDN on first use and cached by the browser.
 */
export function useBackgroundRemoval()
{
    const status = ref<RemovalStatus>("idle");
    const progress = ref(0); // 0–100
    const error = ref<string | null>(null);

    let modulePromise : Promise<typeof import("@imgly/background-removal")> | null = null;

    const loadModule = () =>
    {
        if (!modulePromise)
        {
            modulePromise = import(/* webpackChunkName: "bg-removal" */ "@imgly/background-removal");
        }

        return modulePromise;
    };

    const remove = async (source : Blob) : Promise<Blob> =>
    {
        if (!import.meta.client)
        {
            throw new Error("Background removal only runs in the browser");
        }

        status.value = "loading";
        progress.value = 0;
        error.value = null;

        try
        {
            const { removeBackground } = await loadModule();

            const result = await removeBackground(source, {
                // Self-hosted assets (see scripts/fetch-bg-removal-assets.mjs) —
                // no runtime dependency on imgly's CDN. Must be absolute:
                // the library passes this straight to `new URL(path, publicPath)`.
                publicPath: new URL("/imgly/bg-removal/", window.location.origin).toString(),
                device: "cpu",
                model: "small", // isnet_quint8 — fast, ~44 MB, great quality for web use
                // Free, unlimited, full-resolution output — no "HD" upsell here.
                output: {
                    format: "image/png",
                    quality: 1,
                },
                progress: (key : string, current : number, total : number) =>
                {
                    // Keys look like "fetch:isnet_quint8" (model download) and
                    // "compute:inference" (actual removal).
                    const fraction = total > 0 ? current / total : 0;
                    if (key.startsWith("fetch:"))
                    {
                        status.value = "loading";
                        // Model download maps to 0–70% of the bar
                        progress.value = Math.round(fraction * 70);
                    }
                    else
                    {
                        status.value = "processing";
                        // Inference maps to 70–100%
                        progress.value = 70 + Math.round(fraction * 30);
                    }
                },
            });

            progress.value = 100;
            status.value = "done";

            return result;
        }
        catch (e)
        {
            status.value = "error";
            error.value = e instanceof Error
                ? e.message
                : "Something went wrong while removing the background.";
            throw e;
        }
    };

    const reset = () =>
    {
        status.value = "idle";
        progress.value = 0;
        error.value = null;
    };

    // Warm up the wasm runtime + model as soon as the user shows intent.
    const preload = () =>
    {
        if (import.meta.client)
        {
            loadModule().catch(() =>
            {
                /* preload is best-effort */
            });
        }
    };

    return {
        status: readonly(status),
        progress: readonly(progress),
        error: readonly(error),
        remove,
        reset,
        preload,
    };
}