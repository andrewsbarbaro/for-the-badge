<template>
    <div class="home-page">
        <NavBar v-if="!isMobile" />
        <MobileNavBar v-if="isMobile" />

        <main class="board-main" id="badge-board">
            <HomepageGrid :stats="stats" />
        </main>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { isMobileDevice } from '~/utils/deviceDetection';
import HomepageGrid from '~/components/HomepageGrid.vue';

definePageMeta({ layout: false });

const route = useRoute();

const isMobile = computed(() => {
    if (import.meta.client) return isMobileDevice();
    return false;
});

const stats = ref({
    totalRequests: 0,
    uniqueVisitors: 0,
    countries: 0,
    pixelsSold: 0,
    totalPixels: 5000,
});

onMounted(async () => {
    if (route.query.referrer) {
        navigateTo(`/account?referrer=${route.query.referrer}`);
        return;
    }

    try {
        stats.value = await $fetch('/api/stats');
    } catch {}
});
</script>

<style scoped>
.home-page {
    height: 100dvh; /* dvh avoids mobile address-bar clipping */
    background: #fff;
    display: flex;
    flex-direction: column;
    overflow: hidden;
}

.board-main {
    flex: 1;
    min-height: 0;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    padding: 0;
}

/* On mobile both navbars are position:fixed — offset the board so nothing is hidden */
@media (max-width: 768px) {
    .home-page {
        padding-top: 52px;  /* fixed top bar */
        padding-bottom: 64px; /* fixed bottom nav */
        box-sizing: border-box;
    }
}
</style>
