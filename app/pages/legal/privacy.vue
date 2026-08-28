<template>
    <div class="privacy-page">
        <NavBar v-if="!isMobile" />
        <MobileNavBar v-if="isMobile" />

        <div class="privacy-container">
            <div class="privacy-header">
                <h1>Privacy Policy</h1>
                <p class="subtitle">Last updated: August 22, 2026</p>
                <p class="tldr">TL;DR: We don't sell your data. We barely collect any.</p>
            </div>

            <div class="privacy-content">
                <section class="privacy-section">
                    <h2>What we collect</h2>
                    <ul>
                        <li><strong>Account number</strong> — a randomly generated 16-digit ID when you create an account. We don't ask for your name or email.</li>
                        <li><strong>Saved badges</strong> — if you save a badge, the design data is stored encrypted on our servers.</li>
                        <li><strong>Homepage placements</strong> — if you purchase pixel space, we store your badge, display name, link URL, and payment reference.</li>
                        <li><strong>Session cookies</strong> — minimal, used only to keep you logged in.</li>
                        <li><strong>Basic server logs</strong> — IP addresses and request metadata, retained briefly for security and debugging.</li>
                    </ul>
                </section>

                <section class="privacy-section">
                    <h2>What we don't do</h2>
                    <ul class="no-list">
                        <li>Sell your data to anyone</li>
                        <li>Track your browsing habits</li>
                        <li>Run advertising or analytics that profile you</li>
                        <li>Share your information with third parties except as required for payments (Stripe) and hosting (Cloudflare)</li>
                    </ul>
                </section>

                <section class="privacy-section">
                    <h2>Payments</h2>
                    <p>Payment processing is handled by <strong>Stripe</strong>. We do not store your card details — Stripe does. Their privacy policy applies to payment data.</p>
                </section>

                <section class="privacy-section">
                    <h2>Your rights</h2>
                    <p>You can delete your account at any time from the account page. This removes all saved data associated with your account number. For homepage placements, purchased space is permanent per our terms, but you can update your badge and link at any time.</p>
                    <p>For any privacy-related requests, email us at <a href="mailto:privacy@forthebadge.com">privacy@forthebadge.com</a>.</p>
                </section>

                <section class="privacy-section">
                    <h2>Data security</h2>
                    <p>Saved badge data is encrypted at rest. Your account number is hashed before storage. We use Cloudflare's infrastructure, which includes DDoS protection and TLS everywhere.</p>
                </section>

                <section class="privacy-section disclaimer-section">
                    <h2>Disclaimer</h2>
                    <p>We are not responsible for the content of external sites linked from the homepage or elsewhere on this platform. Images and badges featured on the homepage are the property of their respective owners. For the Badge makes no claim of ownership over user-submitted content.</p>
                    <p>The homepage pixel space is sold as permanent display space. We reserve the right to remove content that violates our terms of service.</p>
                </section>

                <section class="privacy-section">
                    <h2>Changes to this policy</h2>
                    <p>If we make significant changes, we'll update the date at the top of this page. Continued use of the site after changes means you accept the updated policy.</p>
                </section>

                <div class="privacy-footer">
                    <p>Questions? <a href="/company/contact">Contact us</a> or email <a href="mailto:privacy@forthebadge.com">privacy@forthebadge.com</a></p>
                </div>
            </div>
        </div>

        <Footer />
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { isMobileDevice } from '~/utils/deviceDetection';

const isMobile = computed(() => {
    if (import.meta.client) return isMobileDevice();
    return false;
});

definePageMeta({ layout: false });

useSeoMeta({
    title: 'Privacy Policy — For the Badge',
    description: 'Our privacy policy. Short version: we collect almost nothing and never sell your data.',
});
</script>

<style scoped>
.privacy-page {
    min-height: 100vh;
    background: #ffffff;
}

.privacy-container {
    max-width: 720px;
    margin: 0 auto;
    padding: 6rem 2rem 4rem;
}

.privacy-header {
    margin-bottom: 3rem;
    padding-bottom: 2rem;
    border-bottom: 2px solid #000;
}

.privacy-header h1 {
    font-size: 2.5rem;
    font-weight: 800;
    color: #000;
    margin: 0 0 0.5rem;
    letter-spacing: -0.02em;
}

.privacy-header .subtitle {
    font-size: 0.875rem;
    color: #666;
    margin: 0 0 1rem;
}

.privacy-header .tldr {
    display: inline-block;
    background: #000;
    color: #fff;
    padding: 0.5rem 1rem;
    border-radius: 6px;
    font-size: 0.9375rem;
    font-weight: 600;
    margin: 0;
}

.privacy-content {
    display: flex;
    flex-direction: column;
    gap: 2.5rem;
}

.privacy-section {
    padding-bottom: 2.5rem;
    border-bottom: 1px solid #e5e5e5;
}

.privacy-section:last-of-type {
    border-bottom: none;
}

.privacy-section h2 {
    font-size: 1.25rem;
    font-weight: 700;
    color: #000;
    margin: 0 0 1rem;
    letter-spacing: -0.01em;
}

.privacy-section p {
    font-size: 1rem;
    line-height: 1.7;
    color: #444;
    margin: 0 0 0.75rem;
}

.privacy-section p:last-child {
    margin-bottom: 0;
}

.privacy-section ul {
    margin: 0;
    padding-left: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.625rem;
}

.privacy-section ul li {
    font-size: 1rem;
    line-height: 1.6;
    color: #444;
}

.no-list {
    list-style: none;
    padding-left: 0 !important;
}

.no-list li::before {
    content: "✗ ";
    color: #ef4444;
    font-weight: 700;
}

.privacy-section a {
    color: #000;
    font-weight: 600;
    text-decoration: underline;
    text-underline-offset: 3px;
}

.privacy-section a:hover {
    opacity: 0.7;
}

.disclaimer-section {
    background: #f9f9f9;
    border: 1px solid #e5e5e5;
    border-left: 3px solid #000;
    border-radius: 8px;
    padding: 1.5rem;
    margin: 0;
}

.disclaimer-section h2 {
    margin-bottom: 0.75rem;
}

.privacy-footer {
    text-align: center;
    padding: 2rem 0;
    font-size: 0.9375rem;
    color: #666;
}

.privacy-footer a {
    color: #000;
    font-weight: 600;
    text-decoration: underline;
    text-underline-offset: 3px;
}

@media (max-width: 768px) {
    .privacy-container {
        padding: 5rem 1.25rem 3rem;
    }

    .privacy-header h1 {
        font-size: 2rem;
    }
}
</style>
