<template>
    <div class="page">
        <NavBar v-if="!isMobile" />
        <MobileNavBar v-if="isMobile" />
        <div class="page-container">
            <div class="page-header">
                <h1>Contact</h1>
                <p class="subtitle">We exist. You can reach us.</p>
            </div>
            <div class="page-content">
                <div class="section">
                    <h2>Email</h2>
                    <p>For general questions, partnership inquiries, badge suggestions, or existential feedback about the nature of joke badges: <a href="mailto:hello@forthebadge.com">hello@forthebadge.com</a></p>
                    <p>We read every email. Response time is "whenever we get around to it," which is usually within a few days but occasionally isn't.</p>
                </div>

                <div class="section">
                    <h2>Bugs and Feature Requests</h2>
                    <p>Found something broken? Have a badge idea? GitHub Issues is the right place.</p>
                    <p><a href="https://github.com/for-the-badge/for-the-badge/issues" target="_blank" rel="noopener">github.com/for-the-badge/for-the-badge/issues</a></p>
                    <p>Opening an issue means other people can find it, pile on with "me too," and someone might even fix it.</p>
                </div>

                <div class="section">
                    <h2>Privacy</h2>
                    <p>For data requests, GDPR inquiries, or anything privacy-related: <a href="mailto:privacy@forthebadge.com">privacy@forthebadge.com</a></p>
                </div>

                <div class="section">
                    <h2>What We're Not</h2>
                    <p>We're not a 24/7 support operation. We're not a large company with a ticketing system. We're a small team running a badge site that started as a joke in 2014. We'll help when we can, but managing expectations is important.</p>
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
useSeoMeta({ title: 'Contact — For the Badge' });
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
