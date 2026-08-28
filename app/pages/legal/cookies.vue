<template>
    <div class="page">
        <NavBar v-if="!isMobile" />
        <MobileNavBar v-if="isMobile" />
        <div class="page-container">
            <div class="page-header">
                <h1>Cookie Policy</h1>
                <p class="subtitle">Short version: we use one cookie. It's for logging in. That's it.</p>
            </div>
            <div class="page-content">
                <div class="section">
                    <h2>What We Use</h2>
                    <p>We use a single session cookie to keep you logged in if you have an account. It expires when your session ends or after a period of inactivity. No persistent tracking, no cross-site anything.</p>
                    <p>Cookie name: <code>nuxt-session</code>. Purpose: authentication. That's the whole list.</p>
                </div>

                <div class="section">
                    <h2>What We Don't Use</h2>
                    <p>No analytics cookies. No advertising cookies. No third-party tracking of any kind. We don't use Google Analytics, Meta Pixel, or any other behavioral tracking tools. We don't know which cat videos you watched before visiting this page, and we have no interest in finding out.</p>
                </div>

                <div class="section">
                    <h2>If You Block Cookies</h2>
                    <p>The badge browser and generator work fine without cookies — you just won't be able to stay logged into an account. If you don't have an account, cookies are irrelevant to you entirely.</p>
                </div>

                <div class="section">
                    <h2>Questions</h2>
                    <p>If you have questions about this policy, email <a href="mailto:hello@forthebadge.com">hello@forthebadge.com</a>. We'll respond when we get around to it.</p>
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
useSeoMeta({ title: 'Cookie Policy — For the Badge' });
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
.section code { font-family: 'Monaco', 'Menlo', monospace; font-size: 0.875rem; background: #f4f4f4; padding: 0.1em 0.4em; border-radius: 3px; }
@media (max-width: 768px) { .page-container { padding: 5rem 1.25rem 3rem; } .page-header h1 { font-size: 2rem; } }
</style>
