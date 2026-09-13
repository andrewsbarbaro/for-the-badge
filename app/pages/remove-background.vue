<template>
    <div class="removebg-page">
        <!-- Desktop Navigation -->
        <NavBar v-if="!isMobile" />

        <!-- Mobile Navigation -->
        <MobileNavBar v-if="isMobile" />

        <!-- Hero + tool -->
        <RemoveBgHero />

        <!-- How it works -->
        <section class="how-section">
            <div class="section-container">
                <h2 class="section-title">
                    How it works
                </h2>
                <p class="section-subtitle">
                    Three steps. Five seconds. Zero Photoshop.
                </p>
                <div class="how-grid">
                    <div class="how-step">
                        <div class="how-icon">
                            <svg
                                width="32"
                                height="32"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                            >
                                <path d="M9,16V10H5L12,3L19,10H15V16H9M5,20V18H19V20H5Z" />
                            </svg>
                        </div>
                        <h3>1. Upload</h3>
                        <p>Drop in any photo — people, products, pets, logos. JPG, PNG or WebP, up to full resolution.</p>
                    </div>
                    <div class="how-step">
                        <div class="how-icon">
                            <svg
                                width="32"
                                height="32"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                            >
                                <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4M12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9Z" />
                            </svg>
                        </div>
                        <h3>2. AI does its thing</h3>
                        <p>A neural network segments your subject from the background — entirely on your device. Nothing is uploaded to a server.</p>
                    </div>
                    <div class="how-step">
                        <div class="how-icon">
                            <svg
                                width="32"
                                height="32"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                            >
                                <path d="M5,20H19V18H5M19,9H15V3H9V9H5L12,16L19,9Z" />
                            </svg>
                        </div>
                        <h3>3. Download</h3>
                        <p>Get a transparent PNG at full quality. Slap on a new background color right here if you want one.</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Why we're doing this -->
        <section class="why-section">
            <div class="section-container">
                <h2 class="section-title">
                    Why is this free?
                </h2>
                <p class="why-body">
                    Because remove.bg is shutting down, and the internet shouldn't lose one-click
                    background removal over it. Because we're For the Badge — giving developers
                    useful things for free is literally our whole deal. And because the AI runs
                    in <em>your</em> browser, on <em>your</em> hardware — so it costs us roughly
                    nothing to give you unlimited removals, at full resolution, with no watermark.
                </p>
                <p class="why-body">
                    No credits. No accounts. No upsell to "HD". That's the badge of honor.
                </p>
                <div class="why-actions">
                    <NuxtLink to="/generator" class="why-btn primary">Make a badge while you're here</NuxtLink>
                    <NuxtLink to="/badges" class="why-btn secondary">Browse badges</NuxtLink>
                </div>
            </div>
        </section>

        <Footer />
    </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

import { isMobileDevice } from "~/utils/deviceDetection";

definePageMeta({ layout: false });

useHead({
    title: "Remove Image Background — 100% Automatically & Free | For the Badge",
    meta: [
        {
            name: "description",
            content: "remove.bg is shutting down — For the Badge has you covered. Remove image backgrounds automatically, in full resolution, with transparent PNG output. Free, unlimited, and private: the AI runs entirely in your browser.",
        },
    ],
});

const isMobile = computed(() =>
{
    if (import.meta.client)
    {
        return isMobileDevice();
    }

    return false;
});
</script>

<style scoped>
.removebg-page {
    min-height: 100vh;
    background: #ffffff;
}

.section-container {
    max-width: 1100px;
    margin: 0 auto;
}

.section-title {
    font-size: clamp(2rem, 4vw, 2.75rem);
    font-weight: 800;
    text-align: center;
    letter-spacing: -0.02em;
    color: #0f172a;
    margin: 0 0 0.75rem;
}

.section-subtitle {
    text-align: center;
    font-size: 1.0625rem;
    color: #64748b;
    margin: 0 0 3.5rem;
}

/* How it works */
.how-section {
    padding: 5rem 2rem;
    background: #ffffff;
}

.how-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 2.5rem;
}

.how-step {
    text-align: center;
}

.how-icon {
    width: 72px;
    height: 72px;
    margin: 0 auto 1.5rem;
    border-radius: 18px;
    background: #2563eb;
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 10px 30px rgba(37, 99, 235, 0.25);
}

.how-step h3 {
    font-size: 1.25rem;
    font-weight: 700;
    color: #0f172a;
    margin: 0 0 0.75rem;
}

.how-step p {
    font-size: 0.9375rem;
    line-height: 1.65;
    color: #64748b;
    margin: 0;
}

/* Why free */
.why-section {
    padding: 5rem 2rem 6rem;
    background: #f8fafc;
    text-align: center;
}

.why-body {
    max-width: 680px;
    margin: 0 auto 1.25rem;
    font-size: 1.0625rem;
    line-height: 1.75;
    color: #475569;
}

.why-actions {
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
    margin-top: 2.5rem;
}

.why-btn {
    display: inline-flex;
    align-items: center;
    padding: 0.875rem 1.75rem;
    border-radius: 9999px;
    font-size: 1rem;
    font-weight: 600;
    text-decoration: none;
    transition: all 0.2s;
}

.why-btn.primary {
    background: #000000;
    color: #ffffff;
}

.why-btn.primary:hover {
    background: #1f2937;
    transform: translateY(-2px);
}

.why-btn.secondary {
    background: transparent;
    color: #000000;
    border: 2px solid #000000;
}

.why-btn.secondary:hover {
    background: #000000;
    color: #ffffff;
    transform: translateY(-2px);
}

@media (max-width: 768px) {
    .removebg-page {
        padding-bottom: 5rem; /* fixed mobile bottom nav */
    }

    .how-section,
    .why-section {
        padding: 3.5rem 1.25rem;
    }

    .section-subtitle {
        margin-bottom: 2.5rem;
    }
}
</style>