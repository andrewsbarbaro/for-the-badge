<template>
    <div class="success-page">
        <NavBar v-if="!isMobile" />
        <MobileNavBar v-if="isMobile" />

        <div class="success-container">
            <template v-if="pending">
                <div class="state-card loading-card">
                    <div class="spinner" />
                    <p>Confirming your purchase…</p>
                </div>
            </template>

            <template v-else-if="placement && (placement.status === 'active' || placement.status === 'pending_approval')">
                <div class="state-card success-card">
                    <!-- Confetti dots -->
                    <div class="confetti-dots">
                        <div v-for="i in 20" :key="i" class="confetti-dot" :style="confettiStyle(i)" />
                    </div>

                    <div class="success-icon">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                        </svg>
                    </div>

                    <h1>Payment confirmed!</h1>
                    <p class="success-subtext" v-if="placement.status === 'pending_approval'">
                        Your badge is under review — we guarantee approval within <strong>12 hours</strong>.
                        Once approved it will appear permanently on the Badge Board.
                    </p>
                    <p class="success-subtext" v-else>
                        Your badge is now permanently displayed on the For the Badge homepage.
                        It will never be removed.
                    </p>

                    <div class="placement-details">
                        <div class="detail-row">
                            <span class="detail-label">Owner</span>
                            <span class="detail-value">{{ placement.ownerName }}</span>
                        </div>
                        <div class="detail-row">
                            <span class="detail-label">Space</span>
                            <span class="detail-value">{{ placement.gridWidth }}×{{ placement.gridHeight }} cells ({{ placement.pixelCount.toLocaleString() }} pixels)</span>
                        </div>
                        <div class="detail-row">
                            <span class="detail-label">Paid</span>
                            <span class="detail-value">${{ (placement.amountPaidCents / 100).toFixed(2) }}</span>
                        </div>
                        <div class="detail-row">
                            <span class="detail-label">Position</span>
                            <span class="detail-value">Column {{ placement.gridX }}, Row {{ placement.gridY }}</span>
                        </div>
                    </div>

                    <p class="ownership-note">
                        This pixel space is permanently yours. Revenue from purchases goes directly to
                        hosting costs and funding developer awards. Thank you for supporting For the Badge!
                    </p>

                    <div class="success-actions">
                        <NuxtLink to="/" class="btn-primary">View on homepage →</NuxtLink>
                        <NuxtLink to="/generator" class="btn-secondary">Create another badge</NuxtLink>
                    </div>
                </div>
            </template>

            <template v-else-if="placement && placement.status === 'pending'">
                <!-- Stripe payment not yet confirmed via webhook -->
                <div class="state-card pending-card">
                    <div class="spinner" />
                    <h2>Almost there!</h2>
                    <p>Confirming payment with Stripe — this usually takes a few seconds.</p>
                    <p class="retry-note">This page will update automatically.</p>
                </div>
            </template>

            <template v-else>
                <div class="state-card error-card">
                    <h2>Something went wrong</h2>
                    <p>We couldn't find your placement. If you were charged, please contact us at <a href="mailto:support@forthebadge.com">support@forthebadge.com</a> with your Stripe receipt.</p>
                    <NuxtLink to="/" class="btn-primary">Go home</NuxtLink>
                </div>
            </template>
        </div>

        <Footer />
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { isMobileDevice } from '~/utils/deviceDetection';

definePageMeta({ layout: false });

const route = useRoute();
const isMobile = computed(() => import.meta.client ? isMobileDevice() : false);

const sessionId = route.query.session_id as string | undefined;

const pending = ref(true);
const placement = ref<any>(null);
let pollTimer: ReturnType<typeof setInterval> | null = null;

async function checkSession() {
    if (!sessionId) {
        pending.value = false;
        return;
    }
    try {
        const data = await $fetch(`/api/homepage/session?session_id=${sessionId}`);
        placement.value = data;
        pending.value = false;

        if (data.status === 'pending') {
            // Webhook not fired yet — poll every 2s
            if (!pollTimer) {
                pollTimer = setInterval(checkSession, 2000);
            }
        } else if (pollTimer) {
            clearInterval(pollTimer);
            pollTimer = null;
        }
    } catch {
        pending.value = false;
    }
}

function confettiStyle(i: number) {
    const colors = ['#000', '#555', '#aaa', '#333', '#888'];
    return {
        left: `${(i * 5.2) % 100}%`,
        top: `${(i * 7.3) % 60}%`,
        background: colors[i % colors.length],
        width: `${6 + (i % 4) * 3}px`,
        height: `${6 + (i % 4) * 3}px`,
        borderRadius: i % 2 === 0 ? '50%' : '2px',
        transform: `rotate(${i * 18}deg)`,
        opacity: 0.15 + (i % 5) * 0.12,
    };
}

onMounted(checkSession);

onUnmounted(() => {
    if (pollTimer) clearInterval(pollTimer);
});

useSeoMeta({
    title: 'Purchase Complete — For the Badge',
    robots: 'noindex',
});
</script>

<style scoped>
.success-page {
    min-height: 100vh;
    background: #f7f7f7;
    display: flex;
    flex-direction: column;
}

.success-container {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 6rem 1.5rem 3rem;
}

.state-card {
    background: #fff;
    border-radius: 16px;
    padding: 3rem 2.5rem;
    max-width: 520px;
    width: 100%;
    text-align: center;
    box-shadow: 0 4px 32px rgba(0,0,0,0.07);
    position: relative;
    overflow: hidden;
}

/* Confetti */
.confetti-dots {
    position: absolute;
    inset: 0;
    pointer-events: none;
}

.confetti-dot {
    position: absolute;
}

/* Success card */
.success-card {
    background-image: radial-gradient(circle, #f0f0f0 1px, transparent 1px);
    background-size: 20px 20px;
}

.success-icon {
    width: 72px;
    height: 72px;
    background: #000;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    margin: 0 auto 1.5rem;
    box-shadow: 0 4px 20px rgba(0,0,0,0.15);
}

.success-card h1 {
    font-size: 1.75rem;
    font-weight: 800;
    color: #000;
    margin: 0 0 0.75rem;
    letter-spacing: -0.02em;
}

.success-subtext {
    font-size: 1rem;
    color: #555;
    line-height: 1.6;
    margin: 0 0 2rem;
}

.placement-details {
    background: #f7f7f7;
    border-radius: 10px;
    padding: 1.25rem 1.5rem;
    margin-bottom: 1.5rem;
    text-align: left;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
}

.detail-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    font-size: 0.9375rem;
}

.detail-label {
    color: #999;
    font-weight: 500;
    flex-shrink: 0;
}

.detail-value {
    color: #000;
    font-weight: 700;
    text-align: right;
}

.ownership-note {
    font-size: 0.875rem;
    color: #555;
    line-height: 1.6;
    margin: 0 0 2rem;
    padding: 1rem;
    background: #f9f9f9;
    border-radius: 8px;
    border-left: 3px solid #000;
    text-align: left;
}

.success-actions {
    display: flex;
    gap: 0.75rem;
    justify-content: center;
    flex-wrap: wrap;
}

.btn-primary {
    display: inline-flex;
    align-items: center;
    gap: 0.375rem;
    background: #000;
    color: #fff;
    border: none;
    border-radius: 8px;
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    font-weight: 700;
    text-decoration: none;
    transition: opacity 0.15s;
}

.btn-primary:hover { opacity: 0.85; }

.btn-secondary {
    display: inline-flex;
    align-items: center;
    background: transparent;
    color: #000;
    border: 1.5px solid #ddd;
    border-radius: 8px;
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    font-weight: 600;
    text-decoration: none;
    transition: border-color 0.15s;
}

.btn-secondary:hover { border-color: #000; }

/* Loading state */
.loading-card, .pending-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
}

.spinner {
    width: 40px;
    height: 40px;
    border: 3px solid #e5e5e5;
    border-top-color: #000;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
}

@keyframes spin { to { transform: rotate(360deg); } }

.pending-card h2, .error-card h2 {
    font-size: 1.5rem;
    font-weight: 700;
    color: #000;
    margin: 0;
}

.retry-note {
    font-size: 0.875rem;
    color: #aaa;
}

/* Error */
.error-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
}

.error-card a { color: #000; font-weight: 600; }

@media (max-width: 480px) {
    .state-card { padding: 2rem 1.25rem; }
    .success-card h1 { font-size: 1.5rem; }
    .success-actions { flex-direction: column; }
    .btn-primary, .btn-secondary { width: 100%; justify-content: center; }
}
</style>
