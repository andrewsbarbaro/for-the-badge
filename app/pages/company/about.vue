<template>
    <div class="page">
        <NavBar v-if="!isMobile" />
        <MobileNavBar v-if="isMobile" />
        <div class="page-container">
            <div class="page-header">
                <h1>About For the Badge</h1>
                <p class="subtitle">A complete joke that somehow ended up in 3 million projects.</p>
            </div>

            <div class="page-content">
                <div class="section">
                    <h2>The Origin</h2>
                    <p>It started in 2014 as a joke. GitHub's "build passing" badge had become a status symbol — every serious project had one. So naturally, someone had to make the dumbest possible version of that. Badges like "built with love" and "made with science" were born.</p>
                    <p>The joke landed. Developers are a deeply irony-literate audience, and slapping a nonsense badge on a README turned out to be exactly the kind of low-stakes rebellion the open source community wanted. The site spread on its own, badge by badge.</p>
                </div>

                <div class="section">
                    <h2>What We Actually Do</h2>
                    <p>We make SVG badges. That's it. You copy a Markdown snippet, paste it in your README, and now your project has a badge that says "powered by electricity" or "for the badge." Your CI pipeline is unaffected. Your users are unaffected. Your README is slightly better.</p>
                    <p>Over 3 million GitHub projects use For the Badge. We remain genuinely surprised by this number every time we look at it.</p>
                </div>

                <div class="section">
                    <h2>Open Source</h2>
                    <p>The badge collection and this entire site are open source on GitHub. If you want to add a badge, fix a typo, or see how the sausage is made, the repo is right there.</p>
                    <p><a href="https://github.com/forthebadge/for-the-badge" target="_blank" rel="noopener noreferrer">github.com/forthebadge/for-the-badge</a></p>
                    <p>Pull requests are welcome. Absurdist badge ideas especially so.</p>
                </div>

                <!-- GitHub Contributors -->
                <div class="section">
                    <h2>GitHub Contributors</h2>
                    <p>These are the people who have actually committed code to this project. Real humans, real PRs.</p>

                    <div v-if="loadingContribs" class="contrib-loading">
                        <div class="spinner" />
                        <span>Loading contributors…</span>
                    </div>

                    <div v-else-if="contributors.length" class="contrib-grid">
                        <a
                            v-for="c in contributors"
                            :key="c.login"
                            :href="c.html_url"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="contrib-card"
                            :title="`${c.login} — ${c.contributions} commit${c.contributions !== 1 ? 's' : ''}`"
                        >
                            <img :src="c.avatar_url" :alt="c.login" class="contrib-avatar" loading="lazy">
                            <span class="contrib-login">{{ c.login }}</span>
                            <span class="contrib-count">{{ c.contributions }} commit{{ c.contributions !== 1 ? 's' : '' }}</span>
                        </a>
                    </div>

                    <p v-else class="contrib-empty">Could not load contributors right now.</p>
                </div>

                <div class="section">
                    <h2>Contact</h2>
                    <p>Questions, ideas, or just want to tell us your favourite badge? Email us at <a href="mailto:hello@forthebadge.com">hello@forthebadge.com</a>. We read everything. We respond when we get around to it.</p>
                    <p>For bugs and feature requests, <a href="https://github.com/forthebadge/for-the-badge/issues" target="_blank" rel="noopener noreferrer">open an issue on GitHub</a> — that's where things actually get fixed.</p>
                </div>
            </div>
        </div>
        <Footer />
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { isMobileDevice } from '~/utils/deviceDetection';

const isMobile = computed(() => import.meta.client ? isMobileDevice() : false);
definePageMeta({ layout: false });
useSeoMeta({ title: 'About — For the Badge' });

interface Contributor {
    login: string;
    id: number;
    avatar_url: string;
    html_url: string;
    contributions: number;
}

const contributors = ref<Contributor[]>([]);
const loadingContribs = ref(true);

onMounted(async () => {
    try {
        const data = await $fetch<{ contributors: Contributor[] }>('/api/github-contributors');
        contributors.value = data.contributors;
    } catch {
        /* show empty state */
    } finally {
        loadingContribs.value = false;
    }
});
</script>

<style scoped>
.page { min-height: 100vh; background: #fff; display: flex; flex-direction: column; }
.page-container { flex: 1; max-width: 720px; margin: 0 auto; padding: 6rem 2rem 4rem; width: 100%; box-sizing: border-box; }
.page-header { margin-bottom: 2.5rem; padding-bottom: 2rem; border-bottom: 2px solid #000; }
.page-header h1 { font-size: 2.5rem; font-weight: 800; color: #000; margin: 0 0 0.5rem; letter-spacing: -0.02em; }
.subtitle { font-size: 1rem; color: #666; margin: 0; }
.page-content { display: flex; flex-direction: column; gap: 2rem; }
.section { padding-bottom: 2rem; border-bottom: 1px solid #e8e8e8; }
.section:last-of-type { border-bottom: none; }
.section h2 { font-size: 1.125rem; font-weight: 700; color: #000; margin: 0 0 0.875rem; }
.section p { font-size: 0.9375rem; line-height: 1.7; color: #444; margin: 0 0 0.625rem; }
.section p:last-child { margin-bottom: 0; }
.section a { color: #000; font-weight: 600; text-underline-offset: 2px; }

/* Contributors */
.contrib-loading {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-size: 0.875rem;
    color: #888;
    padding: 1rem 0;
}

.spinner {
    width: 18px;
    height: 18px;
    border: 2px solid #e5e5e5;
    border-top-color: #000;
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
    flex-shrink: 0;
}

@keyframes spin { to { transform: rotate(360deg); } }

.contrib-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
    gap: 0.875rem;
    margin-top: 1rem;
}

.contrib-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.375rem;
    padding: 0.875rem 0.625rem;
    border: 1px solid #e8e8e8;
    border-radius: 8px;
    text-decoration: none;
    transition: border-color 0.15s, box-shadow 0.15s;
    text-align: center;
}

.contrib-card:hover {
    border-color: #000;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.07);
}

.contrib-avatar {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    display: block;
}

.contrib-login {
    font-size: 0.8125rem;
    font-weight: 700;
    color: #000;
    word-break: break-all;
}

.contrib-count {
    font-size: 0.7rem;
    color: #aaa;
    font-weight: 500;
}

.contrib-empty { font-size: 0.875rem; color: #aaa; margin-top: 0.5rem; }

@media (max-width: 768px) {
    .page-container { padding: 5rem 1.25rem 3rem; }
    .page-header h1 { font-size: 2rem; }
    .contrib-grid { grid-template-columns: repeat(auto-fill, minmax(100px, 1fr)); }
}
</style>
