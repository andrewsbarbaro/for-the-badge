<template>
    <div class="home-page">
        <!-- Desktop Navigation -->
        <NavBar v-if="!isMobile" />

        <!-- Mobile Navigation -->
        <MobileNavBar v-if="isMobile" />

        <!-- Hero Section -->
        <HeroSection />

        <!-- Open Source Section -->
        <section class="opensource-section">
            <!-- Git contribution graph decorations - varied patterns like GitHub -->
            <div class="git-graph git-graph-1">
                <div
                    v-for="(intensity, i) in [4, 3, 0, 2, 4, 0, 3, 2, 4, 1, 0, 3, 0, 2, 1, 4, 3, 0, 2, 0]"
                    :key="'g1-'+i"
                    class="git-cell"
                    :class="intensity ? 'intensity-' + intensity : 'empty'"
                />
            </div>
            <div class="git-graph git-graph-2">
                <div
                    v-for="(intensity, i) in [0, 2, 3, 0, 1, 4, 2, 0, 3]"
                    :key="'g2-'+i"
                    class="git-cell"
                    :class="intensity ? 'intensity-' + intensity : 'empty'"
                />
            </div>
            <div class="git-graph git-graph-3">
                <div
                    v-for="(intensity, i) in [1, 0, 4, 2, 0, 3, 0, 1, 4, 0, 2, 3, 1, 0, 0, 4, 2, 0, 3, 1, 0, 4, 0, 2]"
                    :key="'g3-'+i"
                    class="git-cell"
                    :class="intensity ? 'intensity-' + intensity : 'empty'"
                />
            </div>
            <div class="git-graph git-graph-4">
                <div
                    v-for="(intensity, i) in [0, 3, 4, 1, 0, 2, 0, 4, 3, 0, 1, 2, 0, 3, 0, 4, 1, 2, 0, 3]"
                    :key="'g4-'+i"
                    class="git-cell"
                    :class="intensity ? 'intensity-' + intensity : 'empty'"
                />
            </div>
            <div class="git-graph git-graph-5">
                <div
                    v-for="(intensity, i) in [2, 0, 1, 4, 0, 3, 2, 0, 4, 1, 3, 0]"
                    :key="'g5-'+i"
                    class="git-cell"
                    :class="intensity ? 'intensity-' + intensity : 'empty'"
                />
            </div>
            <div class="git-graph git-graph-6">
                <div
                    v-for="(intensity, i) in [3, 1, 0, 4, 2, 0, 0, 3, 1, 4, 0, 2, 3, 0, 1, 4, 0, 2, 0, 3, 1, 0, 4, 2, 0, 3, 0, 1]"
                    :key="'g6-'+i"
                    class="git-cell"
                    :class="intensity ? 'intensity-' + intensity : 'empty'"
                />
            </div>
            <div class="git-graph git-graph-7">
                <div
                    v-for="(intensity, i) in [0, 4, 0, 2, 3, 0, 1, 4, 0, 2, 0, 3, 1, 0, 4, 0]"
                    :key="'g7-'+i"
                    class="git-cell"
                    :class="intensity ? 'intensity-' + intensity : 'empty'"
                />
            </div>
            <div class="git-graph git-graph-8">
                <div
                    v-for="(intensity, i) in [2, 3, 0, 1, 0, 4, 2, 0, 3, 1, 4, 0, 0, 2, 3, 0, 1, 4, 0, 2]"
                    :key="'g8-'+i"
                    class="git-cell"
                    :class="intensity ? 'intensity-' + intensity : 'empty'"
                />
            </div>
            <div class="git-graph git-graph-9">
                <div
                    v-for="(intensity, i) in [0, 1, 3, 0, 4, 2, 0, 1, 0, 3, 4, 0]"
                    :key="'g9-'+i"
                    class="git-cell"
                    :class="intensity ? 'intensity-' + intensity : 'empty'"
                />
            </div>
            <div class="git-graph git-graph-10">
                <div
                    v-for="(intensity, i) in [4, 0, 2, 0, 3, 1, 4, 0, 0, 2, 3, 0, 1, 4, 2, 0]"
                    :key="'g10-'+i"
                    class="git-cell"
                    :class="intensity ? 'intensity-' + intensity : 'empty'"
                />
            </div>

            <div class="section-container">
                <div class="opensource-content">
                    <div class="opensource-icon">
                        <svg
                            width="48"
                            height="48"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                        >
                            <path d="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z" />
                        </svg>
                    </div>
                    <h2 class="opensource-title">
                        Open Source & Community Driven
                    </h2>
                    <p class="opensource-description">
                        For the Badge is proudly open source. Help us improve by contributing code, reporting bugs, or suggesting new badge designs.
                    </p>
                    <div class="opensource-actions">
                        <a
                            href="https://github.com/forthebadge/for-the-badge"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="opensource-btn primary"
                        >
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                            >
                                <path d="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z" />
                            </svg>
                            View on GitHub
                        </a>
                        <a
                            href="https://github.com/forthebadge/for-the-badge/issues/new/choose"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="opensource-btn secondary"
                        >
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                            >
                                <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M11,7V13H13V7H11M11,15V17H13V15H11Z" />
                            </svg>
                            Open an Issue
                        </a>
                    </div>
                </div>
            </div>
        </section>

        <!-- How It Works Section -->
        <section class="process-section">
            <div class="section-container">
                <div class="process-grid">
                    <div class="process-step">
                        <div class="step-icon">
                            <svg
                                width="32"
                                height="32"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                            >
                                <path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
                            </svg>
                        </div>
                        <h3>Design</h3>
                        <p>Choose from our collection or create your own custom badge design</p>
                    </div>
                    <div class="process-step">
                        <div class="step-icon">
                            <svg
                                width="32"
                                height="32"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                            >
                                <path d="M17.45,15.18L22,7.31V19L22,21H2V3H4V15.54L9.5,6L16,9.78L20.24,2.45L21.97,3.45L16.74,12.5L10.23,8.75L4.31,19H6.57L10.96,11.44L17.45,15.18Z" />
                            </svg>
                        </div>
                        <h3>Customize</h3>
                        <p>Adjust colors, text, and styling to match your project perfectly</p>
                    </div>
                    <div class="process-step">
                        <div class="step-icon">
                            <svg
                                width="32"
                                height="32"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                            >
                                <path d="M5,20H19V18H5M19,9H15V3H9V9H5L12,16L19,9Z" />
                            </svg>
                        </div>
                        <h3>Export</h3>
                        <p>Download as SVG or copy markdown for instant use in your README</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Badge Generation Methods Section -->
        <section class="methods-section">
            <div class="section-container">
                <h2 class="section-title">
                    Two Ways to Generate Badges
                </h2>
                <p class="section-subtitle">
                    Choose what works best for you
                </p>
                <div class="methods-grid">
                    <!-- Visual Generator -->
                    <div class="method-card">
                        <div class="method-icon">
                            <svg
                                width="48"
                                height="48"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                            >
                                <path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13M19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3Z" />
                            </svg>
                        </div>
                        <h3>Visual Generator</h3>
                        <p>Use our interactive designer to create custom badges with a beautiful UI. Perfect for one-off designs and experimentation.</p>
                        <ul class="features-list">
                            <li>Real-time preview</li>
                            <li>Interactive controls</li>
                            <li>Save to your account</li>
                            <li>Icon library included</li>
                        </ul>
                        <NuxtLink to="/generator" class="method-btn">
                            Launch Designer
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                            >
                                <path d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z" />
                            </svg>
                        </NuxtLink>
                    </div>
                    <!-- REST API -->
                    <div class="method-card">
                        <div class="method-icon api-icon">
                            <svg
                                width="48"
                                height="48"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                            >
                                <path d="M3,6H21V8H3V6M3,16H21V18H3V16M3,11H21V13H3V11Z" />
                            </svg>
                        </div>
                        <h3>REST API</h3>
                        <p>Integrate badge generation directly into your applications. Perfect for automation, CI/CD pipelines, and dynamic badge creation.</p>
                        <ul class="features-list">
                            <li>Simple query parameters</li>
                            <li>No authentication needed</li>
                            <li>Highly cacheable</li>
                            <li>Full customization</li>
                        </ul>
                        <NuxtLink to="/api" class="method-btn">
                            View API Docs
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                            >
                                <path d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z" />
                            </svg>
                        </NuxtLink>
                    </div>
                </div>
            </div>
        </section>

        <!-- Featured Badges Section -->
        <section class="featured-section">
            <div class="section-container">
                <h2 class="section-title">
                    Featured Badges
                </h2>
                <p class="section-subtitle">
                    Hand-picked selection of our most popular badges
                </p>

                <div class="badges-grid">
                    <div
                        v-for="badge in featuredBadges"
                        :key="badge.name"
                        class="badge-card"
                    >
                        <div class="badge-image-wrapper">
                            <img :src="badge.path" :alt="badge.name">
                        </div>
                        <div class="badge-actions">
                            <button
                                class="action-btn"
                                title="Download SVG"
                                @click="downloadBadge(badge)"
                            >
                                <svg
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                >
                                    <path d="M5,20H19V18H5M19,9H15V3H9V9H5L12,16L19,9Z" />
                                </svg>
                            </button>
                            <button
                                class="action-btn"
                                title="Copy Markdown"
                                @click="copyBadgeMarkdown(badge)"
                            >
                                <svg
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                >
                                    <path d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div class="section-cta">
                    <NuxtLink to="/badges" class="btn-text">
                        View All Badges
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                        >
                            <path d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z" />
                        </svg>
                    </NuxtLink>
                </div>
            </div>
        </section>

        <!-- Stats Section -->
        <section class="stats-section">
            <div class="stats-container">
                <div class="big-stat-display">
                    <div class="stat-number-large" data-target="3000000">
                        3,000,000
                    </div>
                </div>

                <h3 class="stats-title">
                    PROJECTS USING FOR THE BADGE
                </h3>

                <div class="mini-stats">
                    <div class="mini-stat">
                        <div class="mini-number" data-target="100000">
                            100,000
                        </div>
                        <div class="mini-label">
                            Monthly Visitors
                        </div>
                    </div>
                    <div class="mini-stat-divider" />
                    <div class="mini-stat">
                        <div class="mini-number" data-target="185">
                            185
                        </div>
                        <div class="mini-label">
                            Countries Worldwide
                        </div>
                    </div>
                </div>

                <div class="stats-story-section">
                    <p class="stats-story">
                        Since 2014, thousands of people use For the Badge every month to style projects, communicate with others, or simply express emotion. It all started because of an obsession with two words: "build passing". It all ended with this: badges, for badges' sake.
                    </p>
                </div>
            </div>
        </section>

        <Footer />

        <!-- Toast Notification -->
        <Toast
            :show="toast.show"
            :message="toast.message"
            :type="toast.type"
            @close="toast.show = false"
        />
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted } from "vue";

import { isMobileDevice } from "~/utils/deviceDetection";

const route = useRoute();

interface Badge {
    name: string;
    path: string;
}

const toast = ref({
    show: false,
    message: "",
    type: "success" as "success" | "error" | "info" | "warning",
});

// Mobile detection based on user agent
const isMobile = computed(() =>
{
    if (import.meta.client)
    {
        return isMobileDevice();
    }

    return false;
});

const featuredBadges = ref<Badge[]>([
    { name: "Built with Love", path: "/featured/featured-built-with-love.svg" },
    { name: "Compatibility Betamax", path: "/featured/featured-compatibility-betamax.svg" },
    { name: "Contains Cat Gifs", path: "/featured/featured-contains-cat-gifs.svg" },
    { name: "Fuck It Ship It", path: "/featured/featured-fuck-it-ship-it.svg" },
    { name: "Gluten Free", path: "/featured/featured-gluten-free.svg" },
    { name: "Made with Crayons", path: "/featured/featured-made-with-crayons.svg" },
    { name: "Oooo Kill Em", path: "/featured/featured-oooo-kill-em.svg" },
    { name: "Powered by Electricity", path: "/featured/featured-powered-by-electricity.svg" },
    { name: "Uses Badges", path: "/featured/featured-uses-badges.svg" },
    { name: "Uses HTML", path: "/featured/featured-uses-html.svg" },
]);

// Redirect to account generation page if referrer query parameter is present
if (route.query.referrer)
{
    navigateTo(`/account?referrer=${route.query.referrer}`);
}

function downloadBadge(badge : Badge)
{
    const a = document.createElement("a");
    a.href = badge.path;
    a.download = badge.name.toLowerCase().replace(/\s+/g, "-") + ".svg";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    toast.value = {
        show: true,
        message: "Badge downloaded!",
        type: "success",
    };
}

function copyBadgeMarkdown(badge : Badge)
{
    const md = `[![forthebadge](${badge.path})](https://forthebadge.com)`;
    navigator.clipboard.writeText(md).then(() =>
    {
        toast.value = {
            show: true,
            message: "Markdown copied to clipboard!",
            type: "success",
        };
    }).catch(() =>
    {
        toast.value = {
            show: true,
            message: "Failed to copy markdown",
            type: "error",
        };
    });
}

definePageMeta({ layout: false });

// Animate stats when they enter the viewport
onMounted(() =>
{
    if (typeof window === "undefined")
    {
        return;
    }

    const formatNumber = (n : number) => n.toLocaleString("en-US");
    let largeCounterInterval : number | null = null;

    // Continuous counter for large stat
    const startContinuousCounter = (el : HTMLElement, baseTarget : number) =>
    {
        let currentValue = baseTarget;
        el.textContent = formatNumber(currentValue);

        largeCounterInterval = window.setInterval(() =>
        {
            currentValue += 1;
            el.textContent = formatNumber(currentValue);
        }, 3000); // Increment every 3 seconds
    };

    // One-time animation for mini stats
    const animate = (el : HTMLElement, target : number, duration = 1500) =>
    {
        const start = 0;
        const startTime = performance.now();

        const step = (now : number) =>
        {
            const progress = Math.min((now - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
            const value = Math.floor(start + (target - start) * eased);
            el.textContent = formatNumber(value);
            if (progress < 1)
            {
                requestAnimationFrame(step);
            }
        };
        requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver((entries, obs) =>
    {
        entries.forEach((entry) =>
        {
            if (entry.isIntersecting)
            {
                const numberEl = entry.target as HTMLElement;
                const target = Number(numberEl.dataset.target || "0");

                if (!numberEl.dataset.animated)
                {
                    if (numberEl.classList.contains("stat-number-large"))
                    {
                        // Continuous counter for main stat
                        startContinuousCounter(numberEl, target);
                    }
                    else
                    {
                        // One-time animation for mini stats
                        animate(numberEl, target);
                    }
                    numberEl.dataset.animated = "true";
                }
                obs.unobserve(numberEl);
            }
        });
    }, { threshold: 0.4 });

    document.querySelectorAll<HTMLElement>(".stat-number-large, .mini-number").forEach((el) => observer.observe(el));

    // Cleanup on unmount
    onUnmounted(() =>
    {
        if (largeCounterInterval)
        {
            clearInterval(largeCounterInterval);
        }
    });
});
</script>

<style scoped>
.home-page {
    min-height: 100vh;
    background: #ffffff;
}

/* Featured Section */
.featured-section {
    padding: 8rem 2rem;
    background: #ffffff;
}

.section-container {
    max-width: 1400px;
    margin: 0 auto;
}

.section-title {
    font-size: clamp(2.5rem, 5vw, 3.5rem);
    font-weight: 800;
    text-align: center;
    margin-bottom: 1rem;
    letter-spacing: -0.02em;
    color: #000000;
}

.section-subtitle {
    text-align: center;
    font-size: 1.125rem;
    color: #666666;
    margin-bottom: 5rem;
    font-weight: 400;
}

.badges-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 2rem;
    margin-bottom: 4rem;
}

.badge-card {
    background: #ffffff;
    border-radius: 12px;
    padding: 2rem;
    border: 1px solid #e5e5e5;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.badge-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.08);
    border-color: #000000;
}

.badge-image-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 60px;
    margin-bottom: 1.5rem;
}

.badge-image-wrapper img {
    max-width: 100%;
    height: auto;
}

.badge-actions {
    display: flex;
    gap: 0.5rem;
    justify-content: center;
}

.action-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border: 1.5px solid #e5e5e5;
    border-radius: 8px;
    background: transparent;
    cursor: pointer;
    transition: all 0.2s;
    color: #666666;
}

.action-btn:hover {
    background: #000000;
    border-color: #000000;
    color: #ffffff;
    transform: scale(1.05);
}

.section-cta {
    text-align: center;
}

.btn-text {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 1.125rem;
    font-weight: 500;
    color: #000000;
    text-decoration: none;
    transition: all 0.2s;
}

.btn-text:hover {
    gap: 1rem;
}

/* Methods Section */
.methods-section {
    padding: 8rem 2rem;
    background: #fafafa;
}

.methods-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 2rem;
}

.method-card {
    background: #ffffff;
    border: 1px solid #e5e5e5;
    border-radius: 12px;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
}

.method-icon {
    width: 56px;
    height: 56px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 12px;
    background: #f3f4f6;
    color: #000;
    margin-bottom: 0.5rem;
}

.api-icon {
    background: #e8f4ff;
    color: #1976D2;
}

.features-list {
    margin: 0.5rem 0 0.75rem 1.25rem;
    color: #555;
}

.method-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.25rem;
    border: 1px solid #000;
    border-radius: 8px;
    color: #000;
    text-decoration: none;
    font-weight: 600;
    width: fit-content;
}

.method-btn:hover {
    background: #000;
    color: #fff;
}

@media (max-width: 900px) {
    .methods-grid {
        grid-template-columns: 1fr;
    }
}

/* Process Section */
.process-section {
    padding: 8rem 2rem;
    background: #ffffff;
}

.process-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 4rem;
    max-width: 1100px;
    margin: 0 auto;
}

.process-step {
    text-align: center;
}

.step-icon {
    width: 80px;
    height: 80px;
    margin: 0 auto 2rem;
    border-radius: 16px;
    background: #000000;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ffffff;
}

.process-step h3 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: #000000;
}

.process-step p {
    font-size: 1rem;
    line-height: 1.6;
    color: #666666;
}

@media (max-width: 768px) {
    .home-page {
        padding-bottom: 5rem;
    }

    .featured-section,
    .process-section {
        padding: 4rem 1rem;
    }

    .section-title {
        font-size: 2rem;
        margin-bottom: 0.75rem;
    }

    .section-subtitle {
        font-size: 1rem;
        margin-bottom: 3rem;
        padding: 0 1rem;
    }

    .badges-grid {
        grid-template-columns: 1fr;
        gap: 1.5rem;
    }

    .badge-card {
        padding: 1.5rem;
    }

    .badge-image-wrapper {
        min-height: 50px;
        margin-bottom: 1rem;
    }

    .action-btn {
        width: 36px;
        height: 36px;
    }

    .btn-text {
        font-size: 1rem;
    }

    .process-section {
        padding: 4rem 1rem 5rem;
    }

    .process-grid {
        grid-template-columns: 1fr;
        gap: 3rem;
    }

    .step-icon {
        width: 64px;
        height: 64px;
        margin: 0 auto 1.5rem;
    }

    .process-step h3 {
        font-size: 1.25rem;
    }

    .process-step p {
        font-size: 0.9375rem;
    }
}

/* Open Source Section */
.opensource-section {
    padding: 6rem 2rem;
    background: #f5f5f5;
    position: relative;
    overflow: hidden;
}

/* Git contribution graph decorations */
.git-graph {
    position: absolute;
    display: grid;
    gap: 4px;
    pointer-events: none;
}

/* Left side graphs */
.git-graph-1 {
    top: 30px;
    left: 40px;
    grid-template-columns: repeat(5, 14px);
}

.git-graph-2 {
    top: 140px;
    left: 100px;
    grid-template-columns: repeat(3, 14px);
}

.git-graph-3 {
    bottom: 50px;
    left: 30px;
    grid-template-columns: repeat(4, 14px);
}

/* Right side graphs */
.git-graph-4 {
    top: 40px;
    right: 50px;
    grid-template-columns: repeat(5, 14px);
}

.git-graph-5 {
    top: 160px;
    right: 120px;
    grid-template-columns: repeat(4, 14px);
}

.git-graph-6 {
    bottom: 30px;
    right: 40px;
    grid-template-columns: repeat(4, 14px);
}

/* Additional scattered graphs */
.git-graph-7 {
    top: 45%;
    left: 60px;
    grid-template-columns: repeat(4, 14px);
}

.git-graph-8 {
    bottom: 120px;
    left: 150px;
    grid-template-columns: repeat(5, 14px);
}

.git-graph-9 {
    top: 35%;
    right: 30px;
    grid-template-columns: repeat(4, 14px);
}

.git-graph-10 {
    bottom: 100px;
    right: 140px;
    grid-template-columns: repeat(4, 14px);
}

.git-cell {
    width: 14px;
    height: 14px;
    border-radius: 3px;
}

.git-cell.empty {
    background: transparent;
}

.git-cell.intensity-1 {
    background: #9be9a8;
}

.git-cell.intensity-2 {
    background: #40c463;
}

.git-cell.intensity-3 {
    background: #30a14e;
}

.git-cell.intensity-4 {
    background: #216e39;
}

.opensource-content {
    max-width: 800px;
    margin: 0 auto;
    text-align: center;
    position: relative;
    z-index: 1;
}

.opensource-icon {
    width: 80px;
    height: 80px;
    margin: 0 auto 2rem;
    border-radius: 50%;
    background: #000000;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ffffff;
}

.opensource-title {
    font-size: 2.5rem;
    font-weight: 800;
    color: #000000;
    margin-bottom: 1rem;
}

.opensource-description {
    font-size: 1.125rem;
    line-height: 1.7;
    color: #555555;
    margin-bottom: 2.5rem;
}

.opensource-actions {
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
}

.opensource-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.875rem 1.5rem;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 600;
    text-decoration: none;
    transition: all 0.2s ease;
}

.opensource-btn.primary {
    background: #000000;
    color: #ffffff;
}

.opensource-btn.primary:hover {
    background: #333333;
    transform: translateY(-2px);
}

.opensource-btn.secondary {
    background: #ffffff;
    color: #000000;
    border: 2px solid #000000;
}

.opensource-btn.secondary:hover {
    background: #f0f0f0;
    transform: translateY(-2px);
}

.opensource-btn.tertiary {
    background: #ef4444;
    color: #ffffff;
}

.opensource-btn.tertiary:hover {
    background: #dc2626;
    transform: translateY(-2px);
}

@media (max-width: 768px) {
    .opensource-section {
        padding: 4rem 1.5rem;
    }

    .git-graph {
        display: none;
    }

    .opensource-title {
        font-size: 1.75rem;
    }

    .opensource-description {
        font-size: 1rem;
    }

    .opensource-actions {
        flex-direction: column;
        align-items: center;
    }

    .opensource-btn {
        width: 100%;
        max-width: 280px;
        justify-content: center;
    }
}

/* Stats */
.stats-section {
    background: #f5f5f5;
    padding: 8rem 2rem;
    text-align: center;
}

.stats-container {
    max-width: 900px;
    margin: 0 auto;
}

.stats-title {
    font-size: 0.875rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    color: #000000;
    margin-top: 2rem;
    margin-bottom: 2.5rem;
}

.big-stat-display {
    display: inline-block;
    background: #000000;
    border-radius: 50px;
    padding: 1.5rem 3.5rem;
    margin-bottom: 2.5rem;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.12);
}

.stat-number-large {
    font-size: clamp(2.5rem, 8vw, 4rem);
    font-weight: 800;
    color: #ffffff;
    letter-spacing: -0.02em;
    line-height: 1;
}

.stats-story-section {
    max-width: 700px;
    margin: 3rem auto 0;
    padding: 2rem 0;
}

.stats-story {
    color: #666666;
    font-size: 1rem;
    line-height: 1.8;
}

.mini-stats {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 3rem;
    margin-bottom: 2.5rem;
}

.mini-stat {
    text-align: center;
}

.mini-number {
    font-size: 2rem;
    font-weight: 800;
    color: #000000;
    letter-spacing: -0.02em;
    margin-bottom: 0.5rem;
}

.mini-label {
    font-size: 0.875rem;
    color: #666666;
    font-weight: 600;
}

.mini-stat-divider {
    width: 1px;
    height: 60px;
    background: #d1d5db;
}

@media (max-width: 768px) {
    .stats-section { padding: 4rem 1.5rem; }
    .big-stat-display {
        padding: 1.25rem 2.5rem;
        border-radius: 40px;
    }
    .stat-number-large { font-size: clamp(2rem, 10vw, 3rem); }
    .mini-stats {
        flex-direction: column;
        gap: 2rem;
    }
    .mini-stat-divider {
        width: 60px;
        height: 1px;
    }
    .mini-number { font-size: 1.75rem; }
}
</style>