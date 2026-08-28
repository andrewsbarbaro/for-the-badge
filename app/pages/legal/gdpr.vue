<template>
    <div class="page">
        <NavBar v-if="!isMobile" />
        <MobileNavBar v-if="isMobile" />
        <div class="page-container">
            <div class="page-header">
                <h1>GDPR</h1>
                <p class="subtitle">Your data rights, in plain English.</p>
            </div>
            <div class="page-content">
                <div class="section">
                    <h2>What Data We Hold</h2>
                    <p>If you have an account: your account ID and any badges you've explicitly saved. That's the full extent of it. We don't collect names, emails, or behavioral data. If you don't have an account, we hold nothing about you.</p>
                </div>

                <div class="section">
                    <h2>Your Rights</h2>
                    <ul>
                        <li><strong>Access</strong> — You can ask what data we hold about you.</li>
                        <li><strong>Rectification</strong> — You can ask us to correct inaccurate data.</li>
                        <li><strong>Erasure</strong> — You can ask us to delete your data. Deleting your account handles this automatically.</li>
                        <li><strong>Restriction</strong> — You can ask us to limit how we process your data.</li>
                        <li><strong>Portability</strong> — You can request your saved badges exported as SVG files.</li>
                        <li><strong>Objection</strong> — You can object to how we use your data.</li>
                    </ul>
                    <p>To exercise any of these rights, email <a href="mailto:privacy@forthebadge.com">privacy@forthebadge.com</a>. We'll respond within 30 days.</p>
                </div>

                <div class="section">
                    <h2>Legal Basis for Processing</h2>
                    <p>We process account data to provide the service you signed up for (contract performance). We don't process data for advertising, profiling, or anything else.</p>
                </div>

                <div class="section">
                    <h2>Data Retention</h2>
                    <p>We keep your data for as long as your account is active. When you delete your account, your data is removed within 30 days.</p>
                </div>

                <div class="section">
                    <h2>Complaints</h2>
                    <p>If you're not satisfied with how we handle your data, you have the right to lodge a complaint with your local data protection authority. In the EU, you can find the relevant authority via the <a href="https://edpb.europa.eu/about-edpb/board/members_en" target="_blank" rel="noopener">European Data Protection Board</a>.</p>
                    <p>Please reach out to us first — we're reasonable and want to get it right.</p>
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
useSeoMeta({ title: 'GDPR — For the Badge' });
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
.section ul { margin: 0; padding-left: 1.5rem; display: flex; flex-direction: column; gap: 0.5rem; }
.section ul li { font-size: 0.9375rem; color: #444; line-height: 1.6; }
@media (max-width: 768px) { .page-container { padding: 5rem 1.25rem 3rem; } .page-header h1 { font-size: 2rem; } }
</style>
