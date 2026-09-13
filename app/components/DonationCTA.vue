<template>
    <div :class="['donation-cta', variant]">
        <div class="cta-content">
            <div class="cta-icon">
                <svg
                    v-if="variant === 'heart'"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                >
                    <path d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z" />
                </svg>
                <svg
                    v-else
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                >
                    <path d="M12,2L15.09,8.26L22,9.27L17,14.14L18.18,21.02L12,17.77L5.82,21.02L7,14.14L2,9.27L8.91,8.26L12,2Z" />
                </svg>
            </div>
            <div class="cta-text">
                <h3 class="cta-title">
                    {{ title }}
                </h3>
                <p class="cta-description">
                    {{ description }}
                </p>
            </div>
            <NuxtLink
                to="/donors"
                class="cta-button"
            >
                {{ buttonText }}
                <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                >
                    <path d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z" />
                </svg>
            </NuxtLink>
        </div>
    </div>
</template>

<script setup lang="ts">
interface Props {
    variant ?: "heart" | "star";
    title ?: string;
    description ?: string;
    buttonText ?: string;
}

withDefaults(defineProps<Props>(), {
    variant: "heart",
    title: "Support For the Badge",
    description: "Help us keep the service free, fast, and tracking-free for everyone.",
    buttonText: "Donate",
});
</script>

<style scoped>
.donation-cta {
    background: #ffffff;
    border: 2px solid #e5e5e5;
    border-radius: 12px;
    padding: 2rem;
    transition: all 0.3s;
}

.donation-cta.heart {
    border-color: #FF6B6B;
    background: linear-gradient(135deg, #FFF5F5 0%, #ffffff 100%);
}

.donation-cta.star {
    border-color: #FFD700;
    background: linear-gradient(135deg, #FFFEF7 0%, #ffffff 100%);
}

.donation-cta:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.08);
}

.cta-content {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    flex-wrap: wrap;
}

.cta-icon {
    flex-shrink: 0;
    width: 56px;
    height: 56px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.heart .cta-icon {
    background: #FF6B6B;
    color: #ffffff;
}

.star .cta-icon {
    background: #FFD700;
    color: #000000;
}

.cta-text {
    flex: 1;
    min-width: 200px;
}

.cta-title {
    font-size: 1.25rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    color: #000000;
}

.cta-description {
    font-size: 0.9375rem;
    color: #666666;
    line-height: 1.5;
    margin: 0;
}

.cta-button {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.5rem;
    background: #000000;
    color: #ffffff;
    font-weight: 600;
    font-size: 1rem;
    border-radius: 8px;
    text-decoration: none;
    transition: all 0.2s;
    white-space: nowrap;
}

.cta-button:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

/* Responsive */
@media (max-width: 768px) {
    .donation-cta {
        padding: 1.5rem;
    }

    .cta-content {
        flex-direction: column;
        text-align: center;
    }

    .cta-button {
        width: 100%;
        justify-content: center;
    }
}
</style>