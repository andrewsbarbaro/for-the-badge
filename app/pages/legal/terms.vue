<template>
    <div class="page">
        <NavBar v-if="!isMobile" />
        <MobileNavBar v-if="isMobile" />
        <div class="page-container">
            <div class="page-header">
                <h1>Terms of Service</h1>
                <p class="subtitle">Plain English. No lawyers harmed in the writing of this document.</p>
            </div>
            <div class="page-content">
                <div class="section">
                    <h2>Use the Badges</h2>
                    <p>All badges on For the Badge are free to use. Personal, commercial, open source — doesn't matter. You don't need to ask permission, and you don't need to credit us for standard badges (though a mention is always appreciated).</p>
                    <p>Copy the Markdown, paste it in your README, ship it. That's the whole deal.</p>
                </div>

                <div class="section">
                    <h2>Don't Be Evil</h2>
                    <p>Don't use this site or its assets for anything illegal. Don't use badge imagery to spread hate, harass people, or make the internet worse. If you do, we'll remove your access and feel righteous about it.</p>
                    <p>We're a small team running a joke site. We're not equipped to be anyone's content moderation department, but we'll act when something is obviously wrong.</p>
                </div>

                <div class="section">
                    <h2>Homepage Placements</h2>
                    <p>Homepage placements (sponsored badges featured on the front page) are a permanent purchase — no subscriptions, no renewals. Pay once, stay up.</p>
                    <p>That said, we reserve the right to remove placements that violate these terms, promote illegal content, or that we deem harmful. We'll reach out first in most cases. This right exists so we're not legally stuck displaying something terrible forever.</p>
                </div>

                <div class="section">
                    <h2>API</h2>
                    <p>The API is fair use. Build something cool with it. Don't hammer it with thousands of requests per second — that's a DDoS, not an integration. If your use case requires high volume, email us and we'll figure something out.</p>
                </div>

                <div class="section">
                    <h2>Disclaimer</h2>
                    <p>For the Badge is provided as-is. We do our best to keep it running, but we make no guarantees of uptime, permanence, or that any given badge will make your project look cooler. Use at your own discretion.</p>
                    <p>Questions? <a href="mailto:hello@forthebadge.com">hello@forthebadge.com</a></p>
                </div>
            </div>
        </div>
        <Footer />
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { isMobileDevice } from '~/utils/deviceDetection';
const isMobile = computed(() => import.meta.client ? isMobileDevice() : false);
definePageMeta({ layout: false });
useSeoMeta({ title: 'Terms of Service — For the Badge' });
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
@media (max-width: 768px) { .page-container { padding: 5rem 1.25rem 3rem; } .page-header h1 { font-size: 2rem; } }
</style>
