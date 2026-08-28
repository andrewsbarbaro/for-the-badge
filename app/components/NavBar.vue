<template>
    <nav class="navbar">
        <div class="nav-inner">
            <NuxtLink to="/" class="nav-brand" aria-label="For the Badge">
                <img src="/logo_black.svg" alt="For the Badge" class="nav-logo">
            </NuxtLink>

            <div class="nav-links">
                <NuxtLink to="/generator" class="nav-link">Generator</NuxtLink>
                <NuxtLink to="/badges" class="nav-link">Badges</NuxtLink>
                <NuxtLink to="/api" class="nav-link">API</NuxtLink>
                <NuxtLink to="/awards" class="nav-link">Awards</NuxtLink>

                <template v-if="isLoggedIn">
                    <div class="nav-user" @click="showMenu = !showMenu" @keydown.enter="showMenu = !showMenu" tabindex="0">
                        <span class="nav-user-dot" />
                        <span class="nav-user-label">Account</span>
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M7,10L12,15L17,10H7Z" /></svg>

                        <div v-if="showMenu" class="nav-dropdown" @click.stop>
                            <NuxtLink :to="`/account/${userAccountId}`" class="drop-item" @click="showMenu = false">Manage Account</NuxtLink>
                            <NuxtLink to="/my-badges" class="drop-item" @click="showMenu = false">My Badges</NuxtLink>
                            <NuxtLink to="/my-board" class="drop-item" @click="showMenu = false">My Board Spaces</NuxtLink>
                            <NuxtLink v-if="isUserAdmin" to="/admin" class="drop-item" @click="showMenu = false">Admin</NuxtLink>
                            <div class="nav-dropdown-divider" />
                            <button class="drop-item drop-signout" @click="handleSignOut">Sign Out</button>
                        </div>
                    </div>
                </template>

                <template v-else>
                    <NuxtLink to="/login" class="nav-link">Sign In</NuxtLink>
                    <NuxtLink to="/account" class="nav-cta">Get Account</NuxtLink>
                </template>
            </div>
        </div>
    </nav>
</template>

<script setup>
import { ref } from "vue";

const { isAuthenticated: isLoggedIn, isAdmin: isUserAdmin, accountId: userAccountId } = useAuth();
const { clear: clearSession } = useUserSession();

const showMenu = ref(false);

async function handleSignOut() {
    showMenu.value = false;
    await clearSession();
    navigateTo("/");
}
</script>

<style scoped>
.navbar {
    position: sticky;
    top: 0;
    z-index: 100;
    background: #000;
    border-bottom: 1px solid #222;
}

.nav-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 2rem;
    height: 52px;
    max-width: 1600px;
    margin: 0 auto;
}

.nav-brand {
    display: flex;
    align-items: center;
    text-decoration: none;
    flex-shrink: 0;
}

.nav-logo {
    height: 22px;
    width: auto;
    display: block;
    filter: invert(1);
}

.nav-links {
    display: flex;
    align-items: center;
    gap: 0.125rem;
}

.nav-link {
    color: rgba(255,255,255,0.6);
    text-decoration: none;
    font-size: 0.8125rem;
    font-weight: 500;
    padding: 0.375rem 0.75rem;
    border-radius: 4px;
    transition: color 0.15s, background 0.15s;
    white-space: nowrap;
    letter-spacing: 0.01em;
}

.nav-link:hover,
.nav-link.router-link-active {
    color: #fff;
    background: rgba(255,255,255,0.08);
}

.nav-link.router-link-exact-active {
    color: #fff;
    background: rgba(255,255,255,0.12);
}

.nav-user {
    display: flex;
    align-items: center;
    gap: 0.375rem;
    color: rgba(255,255,255,0.7);
    font-size: 0.8125rem;
    font-weight: 500;
    padding: 0.375rem 0.75rem;
    border-radius: 4px;
    cursor: pointer;
    position: relative;
    user-select: none;
    transition: color 0.15s, background 0.15s;
}

.nav-user:hover { color: #fff; background: rgba(255,255,255,0.08); }

.nav-user-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #4ade80;
    flex-shrink: 0;
}

.nav-user-label { white-space: nowrap; }

.nav-dropdown {
    position: absolute;
    top: calc(100% + 6px);
    right: 0;
    background: #111;
    border: 1px solid #333;
    border-radius: 8px;
    padding: 0.375rem;
    min-width: 160px;
    display: flex;
    flex-direction: column;
    gap: 1px;
    box-shadow: 0 8px 32px rgba(0,0,0,0.5);
}

.drop-item {
    display: block;
    padding: 0.5rem 0.875rem;
    color: rgba(255,255,255,0.75);
    font-size: 0.8125rem;
    font-weight: 500;
    text-decoration: none;
    border-radius: 5px;
    transition: background 0.12s, color 0.12s;
    background: none;
    border: none;
    text-align: left;
    cursor: pointer;
    width: 100%;
    font-family: inherit;
}

.drop-item:hover { background: rgba(255,255,255,0.08); color: #fff; }

.nav-dropdown-divider { height: 1px; background: rgba(255,255,255,0.08); margin: 0.25rem 0.375rem; }

.drop-signout { color: rgba(255,100,100,0.8); }
.drop-signout:hover { color: #ff6b6b; background: rgba(255,100,100,0.08); }

.nav-cta {
    margin-left: 0.5rem;
    background: #fff;
    color: #000;
    text-decoration: none;
    font-size: 0.8125rem;
    font-weight: 700;
    padding: 0.4rem 0.875rem;
    border-radius: 5px;
    white-space: nowrap;
    transition: opacity 0.15s;
}

.nav-cta:hover { opacity: 0.88; }

@media (max-width: 768px) {
    .nav-inner { padding: 0 1rem; }

    .nav-link:not(.nav-link:last-child),
    .nav-user { display: none; }

    .nav-links {
        gap: 0.25rem;
    }
}
</style>
