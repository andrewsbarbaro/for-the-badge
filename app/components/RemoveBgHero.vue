<template>
    <section class="removebg-hero">
        <!-- Decorative background layers -->
        <div class="hero-bg" aria-hidden="true">
            <div class="hero-glow" />
            <div class="hero-grid" />
        </div>

        <!-- Floating demo cards (desktop only): photo → cut-out -->
        <div class="float-card float-photo" aria-hidden="true">
            <div class="demo-photo">
                <div class="demo-sky" />
                <div class="demo-sun" />
                <div class="demo-mountain m1" />
                <div class="demo-mountain m2" />
                <div class="demo-person" />
            </div>
            <span class="float-label">before</span>
        </div>
        <div class="float-scissors" aria-hidden="true">
            <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="currentColor"
            >
                <path d="M9.64,7.64C10.45,6.84 11.6,6.5 12.66,6.73C14.5,7.13 15.7,8.88 15.41,10.74C15.24,11.8 14.68,12.71 13.87,13.32L21.41,20.86L20,22.27L12.45,14.73C11.65,15.07 10.76,15.16 9.88,14.96L7.5,17.36C6.9,17.96 5.96,17.96 5.36,17.36C4.76,16.76 4.76,15.82 5.36,15.22L7.73,12.85C7.08,11.35 7.32,9.63 8.5,8.5L10.5,10.5L12.5,8.5L11,7L9.64,7.64M12,8.5A1.5,1.5 0 0,0 10.5,10A1.5,1.5 0 0,0 12,11.5A1.5,1.5 0 0,0 13.5,10A1.5,1.5 0 0,0 12,8.5Z" />
            </svg>
        </div>
        <div class="float-card float-cutout" aria-hidden="true">
            <div class="demo-cutout">
                <div class="demo-person solid" />
            </div>
            <span class="float-label">after</span>
        </div>

        <div class="hero-container">
            <!-- Shutdown announcement -->
            <div class="announce-card" role="note">
                <span class="announce-badge">
                    <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                    >
                        <path d="M12,2L15.09,8.26L22,9.27L17,14.14L18.18,21.02L12,17.77L5.82,21.02L7,14.14L2,9.27L8.91,8.26L12,2Z" />
                    </svg>
                    New
                </span>
                <p>remove.bg is shutting down — so we built you a new home. Free, unlimited, forever.</p>
            </div>

            <h1 class="hero-title">
                <span class="title-line">Remove Image Background</span>
                <span class="title-line highlight">100% Automatically and Free</span>
            </h1>

            <p class="hero-subtitle">
                The same one-click magic you loved — now from the folks who make badges.
                No credits. No watermarks. No sign-up.
            </p>

            <!-- Privacy, front and center -->
            <div class="privacy-banner">
                <span class="privacy-lock">
                    <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                    >
                        <path d="M12,17A2,2 0 0,0 14,15C14,13.89 13.1,13 12,13A2,2 0 0,0 10,15A2,2 0 0,0 12,17M18,8A2,2 0 0,1 20,10V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V10C4,8.89 4.9,8 6,8H7V6A5,5 0 0,1 12,1A5,5 0 0,1 17,6V8H18M12,3A3,3 0 0,0 9,6V8H15V6A3,3 0 0,0 12,3Z" />
                    </svg>
                </span>
                <p>
                    <strong>Private by design.</strong>
                    The AI runs entirely in <em>your</em> browser — your photos never
                    leave your device, never touch a server, never get stored.
                </p>
            </div>

            <!-- The tool itself, front and center -->
            <BgRemover />

            <ul class="trust-row">
                <li>
                    <span class="trust-icon">
                        <svg
                            width="15"
                            height="15"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                        >
                            <path d="M17,17H7V14L3,18L7,22V19H19V13H17M7,7H17V10L21,6L17,2V5H5V11H7V7Z" />
                        </svg>
                    </span>
                    On-device AI
                </li>
                <li>
                    <span class="trust-icon">
                        <svg
                            width="15"
                            height="15"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                        >
                            <path d="M12,17A2,2 0 0,0 14,15C14,13.89 13.1,13 12,13A2,2 0 0,0 10,15A2,2 0 0,0 12,17M18,8A2,2 0 0,1 20,10V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V10C4,8.89 4.9,8 6,8H7V6A5,5 0 0,1 12,1A5,5 0 0,1 17,6V8H18M12,3A3,3 0 0,0 9,6V8H15V6A3,3 0 0,0 12,3Z" />
                        </svg>
                    </span>
                    Zero uploads
                </li>
                <li>
                    <span class="trust-icon">
                        <svg
                            width="15"
                            height="15"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                        >
                            <path d="M11.83,9L15,12.16C15,12.11 15,12.05 15,12A3,3 0 0,0 12,9C11.94,9 11.89,9 11.83,9M7.53,9.8L9.08,11.35C9.03,11.56 9,11.77 9,12A3,3 0 0,0 12,15C12.22,15 12.44,14.97 12.65,14.92L14.2,16.47C13.53,16.8 12.79,17 12,17A5,5 0 0,1 7,12C7,11.21 7.2,10.47 7.53,9.8M2,4.27L4.28,6.55L4.73,7C3.08,8.3 1.78,10 1,12C2.73,16.39 7,19.5 12,19.5C13.55,19.5 15.03,19.2 16.38,18.66L16.81,19.08L19.73,22L21,20.73L3.27,3M12,7A5,5 0 0,1 17,12C17,12.64 16.87,13.26 16.64,13.82L19.57,16.75C21.07,15.5 22.27,13.86 23,12C21.27,7.61 17,4.5 12,4.5C10.6,4.5 9.26,4.75 8,5.2L10.17,7.35C10.74,7.13 11.35,7 12,7Z" />
                        </svg>
                    </span>
                    No tracking
                </li>
                <li>
                    <span class="trust-icon">
                        <svg
                            width="15"
                            height="15"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                        >
                            <path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" />
                        </svg>
                    </span>
                    Full-resolution PNG
                </li>
                <li>
                    <span class="trust-icon">
                        <svg
                            width="15"
                            height="15"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                        >
                            <path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" />
                        </svg>
                    </span>
                    No account
                </li>
            </ul>

            <p class="badge-plug">
                Still here for badges?
                <NuxtLink to="/generator">Launch the badge generator</NuxtLink>
                or
                <NuxtLink to="/badges">browse the collection</NuxtLink>.
            </p>
        </div>
    </section>
</template>

<script setup lang="ts">
// BgRemover is auto-imported by Nuxt
</script>

<style scoped>
.removebg-hero {
    position: relative;
    background: #f8fafc;
    padding: 7.5rem 2rem 5.5rem;
    display: flex;
    justify-content: center;
    overflow: hidden;
}

/* ── Decorative background ───────────────────────────────── */
.hero-bg {
    position: absolute;
    inset: 0;
    pointer-events: none;
}

.hero-glow {
    position: absolute;
    inset: 0;
    background:
        radial-gradient(ellipse 60% 45% at 50% -5%, rgba(37, 99, 235, 0.12), transparent 70%),
        radial-gradient(ellipse 35% 30% at 12% 30%, rgba(96, 165, 250, 0.10), transparent 70%),
        radial-gradient(ellipse 35% 30% at 88% 30%, rgba(96, 165, 250, 0.10), transparent 70%);
}

/* Faint checkerboard — the universal symbol of transparency */
.hero-grid {
    position: absolute;
    inset: 0;
    background: conic-gradient(rgba(37, 99, 235, 0.05) 25%, transparent 0 50%, rgba(37, 99, 235, 0.05) 0 75%, transparent 0);
    background-size: 28px 28px;
    mask-image: radial-gradient(ellipse 75% 60% at 50% 0%, black, transparent 75%);
    -webkit-mask-image: radial-gradient(ellipse 75% 60% at 50% 0%, black, transparent 75%);
}

/* ── Floating demo cards ─────────────────────────────────── */
.float-card {
    position: absolute;
    top: 220px;
    width: 148px;
    border-radius: 16px;
    background: #ffffff;
    padding: 8px;
    box-shadow: 0 16px 48px rgba(15, 23, 42, 0.14);
    animation: floaty 7s ease-in-out infinite;
    display: none;
}

@media (min-width: 1280px) {
    .float-card { display: block; }
}

.float-photo {
    left: max(2rem, calc(50% - 620px));
    transform: rotate(-6deg);
}

.float-cutout {
    right: max(2rem, calc(50% - 620px));
    transform: rotate(5deg);
    animation-delay: -3.5s;
}

@keyframes floaty {
    0%, 100% { translate: 0 0; }
    50% { translate: 0 -14px; }
}

.float-scissors {
    position: absolute;
    top: 288px;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background: #2563eb;
    color: #ffffff;
    align-items: center;
    justify-content: center;
    box-shadow: 0 10px 24px rgba(37, 99, 235, 0.4);
    display: none;
}

@media (min-width: 1440px) {
    /* midway between the left card's inner edge and the hero container */
    .float-scissors { display: flex; left: calc(50% - 448px); }
}

.float-label {
    display: block;
    text-align: center;
    font-size: 0.6875rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: #94a3b8;
    padding: 6px 0 2px;
}

/* Tiny CSS-only landscape photo */
.demo-photo,
.demo-cutout {
    position: relative;
    width: 100%;
    aspect-ratio: 1;
    border-radius: 10px;
    overflow: hidden;
}

.demo-photo { background: linear-gradient(180deg, #7dd3fc 0%, #bae6fd 55%, #86efac 56%, #4ade80 100%); }

.demo-sun {
    position: absolute;
    top: 12%;
    right: 14%;
    width: 22%;
    aspect-ratio: 1;
    border-radius: 50%;
    background: #fde047;
    box-shadow: 0 0 16px rgba(253, 224, 71, 0.8);
}

.demo-mountain {
    position: absolute;
    bottom: 30%;
    width: 60%;
    aspect-ratio: 1;
    background: #64748b;
    transform: rotate(45deg);
    border-radius: 8px;
}

.demo-mountain.m1 { left: -18%; }
.demo-mountain.m2 { left: 22%; bottom: 34%; background: #94a3b8; }

.demo-person {
    position: absolute;
    bottom: 6%;
    left: 50%;
    translate: -50% 0;
    width: 26%;
    height: 44%;
    background: #1e293b;
    border-radius: 999px 999px 6px 6px;
}

.demo-person::before {
    content: '';
    position: absolute;
    top: -34%;
    left: 50%;
    translate: -50% 0;
    width: 72%;
    aspect-ratio: 1;
    border-radius: 50%;
    background: #1e293b;
}

/* Cut-out: same subject floating on transparency */
.demo-cutout {
    background: conic-gradient(#e2e8f0 25%, #ffffff 0 50%, #e2e8f0 0 75%, #ffffff 0);
    background-size: 16px 16px;
}

.demo-person.solid {
    bottom: 14%;
    filter: drop-shadow(0 6px 12px rgba(15, 23, 42, 0.25));
    animation: bob 3.5s ease-in-out infinite;
}

@keyframes bob {
    0%, 100% { translate: -50% 0; }
    50% { translate: -50% -6px; }
}

/* ── Content ─────────────────────────────────────────────── */
.hero-container {
    position: relative;
    max-width: 760px;
    width: 100%;
    text-align: center;
    z-index: 1;
}

/* Announcement */
.announce-card {
    display: inline-flex;
    align-items: center;
    gap: 0.75rem;
    background: rgba(255, 251, 235, 0.85);
    backdrop-filter: blur(8px);
    border: 1.5px solid #fcd34d;
    border-radius: 9999px;
    padding: 0.4375rem 1.25rem 0.4375rem 0.4375rem;
    margin-bottom: 2.25rem;
    box-shadow: 0 4px 16px rgba(245, 158, 11, 0.12);
    animation: slideDown 0.5s ease-out;
}

@keyframes slideDown {
    from { opacity: 0; transform: translateY(-12px); }
    to { opacity: 1; transform: translateY(0); }
}

.announce-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.375rem;
    background: linear-gradient(135deg, #f59e0b, #fbbf24);
    color: #ffffff;
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    padding: 0.375rem 0.75rem;
    border-radius: 9999px;
    white-space: nowrap;
}

.announce-card p {
    margin: 0;
    font-size: 0.875rem;
    font-weight: 500;
    color: #92400e;
    text-align: left;
}

/* Title */
.hero-title {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    font-size: clamp(2rem, 5vw, 3.375rem);
    font-weight: 800;
    line-height: 1.12;
    letter-spacing: -0.025em;
    color: #0f172a;
    margin: 0 0 1.25rem;
}

.hero-title .highlight {
    background: linear-gradient(120deg, #2563eb 0%, #60a5fa 50%, #2563eb 100%);
    background-size: 200% 200%;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: gradientShift 6s ease infinite;
}

@keyframes gradientShift {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
}

.hero-subtitle {
    font-size: clamp(1rem, 2vw, 1.125rem);
    color: #475569;
    line-height: 1.65;
    max-width: 520px;
    margin: 0 auto 1.5rem;
}

/* Privacy banner — the headline feature */
.privacy-banner {
    display: flex;
    align-items: center;
    gap: 0.875rem;
    max-width: 560px;
    margin: 0 auto 2.5rem;
    padding: 0.875rem 1.25rem;
    background: rgba(236, 253, 245, 0.8);
    backdrop-filter: blur(8px);
    border: 1.5px solid #6ee7b7;
    border-radius: 16px;
    text-align: left;
    box-shadow: 0 4px 20px rgba(16, 185, 129, 0.10);
}

.privacy-lock {
    flex-shrink: 0;
    width: 40px;
    height: 40px;
    border-radius: 12px;
    background: linear-gradient(135deg, #059669, #34d399);
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 6px 16px rgba(5, 150, 105, 0.3);
}

.privacy-banner p {
    margin: 0;
    font-size: 0.875rem;
    line-height: 1.55;
    color: #065f46;
}

.privacy-banner strong {
    color: #064e3b;
}

/* Trust row */
.trust-row {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.5rem;
    list-style: none;
    padding: 0;
    margin: 2rem 0 0;
}

.trust-row li {
    display: inline-flex;
    align-items: center;
    gap: 0.4375rem;
    font-size: 0.8125rem;
    font-weight: 600;
    color: #475569;
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 9999px;
    padding: 0.4375rem 0.875rem;
    box-shadow: 0 1px 3px rgba(15, 23, 42, 0.05);
    transition: border-color 0.2s, transform 0.2s;
}

.trust-row li:hover {
    border-color: #93c5fd;
    transform: translateY(-1px);
}

.trust-icon {
    display: inline-flex;
    color: #2563eb;
}

.badge-plug {
    margin: 2.75rem 0 0;
    font-size: 0.9375rem;
    color: #64748b;
}

.badge-plug a {
    color: #2563eb;
    font-weight: 600;
    text-decoration: none;
}

.badge-plug a:hover {
    text-decoration: underline;
}

@media (max-width: 640px) {
    .removebg-hero {
        padding: 5.5rem 1rem 3.5rem;
    }

    .announce-card {
        flex-direction: column;
        gap: 0.5rem;
        border-radius: 20px;
        padding: 0.75rem 1.25rem;
    }

    .announce-card p {
        text-align: center;
    }

    .privacy-banner {
        flex-direction: column;
        text-align: center;
        padding: 1.25rem;
    }
}

@media (prefers-reduced-motion: reduce) {
    .float-card,
    .demo-person.solid,
    .hero-title .highlight,
    .announce-card {
        animation: none;
    }
}
</style>