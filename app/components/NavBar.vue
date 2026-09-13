<template>
    <nav v-if="!isMobileDevice" class="navbar">
        <div class="nav-container">
            <NuxtLink to="/" class="nav-brand" aria-label="For the Badge Home">
                <img
                    src="/logo_black.svg"
                    alt="For the Badge Logo"
                    class="logo"
                >
            </NuxtLink>

            <div
                class="nav-links"
                :class="{ active: mobileMenuOpen }"
            >
                <!-- Unauthenticated users -->
                <template v-if="!isLoggedIn">
                    <NuxtLink to="/awards" class="nav-link awards-link">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M20.2,2H19.5H18C17.1,2 16,3 16,4H8C8,3 6.9,2 6,2H4.5H3.8H2V11C2,12 3,13 4,13H6.2C6.6,15 7.9,16.7 11,17V19.1C8.8,19.3 8,20.4 8,21.7V22H16V21.7C16,20.4 15.2,19.3 13,19.1V17C16.1,16.7 17.4,15 17.8,13H20C21,13 22,12 22,11V2H20.2M4,11V4H6V6V11C5.1,11 4.3,11 4,11M20,11C19.7,11 18.9,11 18,11V6V4H20V11Z" />
                        </svg>
                        <span class="awards-text">
                            <span class="awards-title">Developer Awards</span>
                            <span class="awards-sub-badge">2026 Winners</span>
                        </span>
                    </NuxtLink>
                    <NuxtLink
                        to="/"
                        class="nav-link"
                    >Home</NuxtLink>
                    <NuxtLink
                        to="/generator"
                        class="nav-link"
                    >Generator</NuxtLink>
                    <NuxtLink
                        to="/badges"
                        class="nav-link"
                    >View All Badges</NuxtLink>
                    <NuxtLink
                        to="/remove-background"
                        class="nav-link removebg-link"
                    >Remove BG<span class="nav-new-badge">New</span></NuxtLink>
                    <NuxtLink
                        to="/api"
                        class="nav-link"
                    >API</NuxtLink>
                    <NuxtLink
                        to="/donors"
                        class="nav-link"
                    >Donate</NuxtLink>
                    <NuxtLink
                        to="/login"
                        class="nav-link"
                    >Sign In</NuxtLink>
                    <NuxtLink
                        to="/account"
                        class="nav-cta-plain"
                    >
                        Get Account
                    </NuxtLink>
                </template>

                <!-- Authenticated users -->
                <template v-else>
                    <NuxtLink to="/awards" class="nav-link awards-link">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M20.2,2H19.5H18C17.1,2 16,3 16,4H8C8,3 6.9,2 6,2H4.5H3.8H2V11C2,12 3,13 4,13H6.2C6.6,15 7.9,16.7 11,17V19.1C8.8,19.3 8,20.4 8,21.7V22H16V21.7C16,20.4 15.2,19.3 13,19.1V17C16.1,16.7 17.4,15 17.8,13H20C21,13 22,12 22,11V2H20.2M4,11V4H6V6V11C5.1,11 4.3,11 4,11M20,11C19.7,11 18.9,11 18,11V6V4H20V11Z" />
                        </svg>
                        <span class="awards-text">
                            <span class="awards-title">Developer Awards</span>
                            <span class="awards-sub-badge">2026 Winners</span>
                        </span>
                    </NuxtLink>
                    <NuxtLink
                        to="/generator"
                        class="nav-link"
                    >
                        Generator
                    </NuxtLink>
                    <NuxtLink
                        to="/my-badges"
                        class="nav-link"
                    >
                        My Badges
                    </NuxtLink>
                    <NuxtLink
                        to="/badges"
                        class="nav-link"
                    >
                        View All Badges
                    </NuxtLink>
                    <NuxtLink
                        to="/remove-background"
                        class="nav-link removebg-link"
                    >
                        Remove BG<span class="nav-new-badge">New</span>
                    </NuxtLink>
                    <NuxtLink
                        to="/api"
                        class="nav-link"
                    >
                        API
                    </NuxtLink>
                    <NuxtLink
                        to="/donors"
                        class="nav-link"
                    >
                        Donate
                    </NuxtLink>
                    <div class="nav-user-info">
                        <div class="nav-dropdown">
                            <button class="nav-user-btn" @click="showUserMenu = !showUserMenu">
                                <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                >
                                    <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M7.07,18.28C7.5,17.38 10.12,16.5 12,16.5C13.88,16.5 16.5,17.38 16.93,18.28C15.57,19.36 13.86,20 12,20C10.14,20 8.43,19.36 7.07,18.28M18.36,16.83C16.93,15.09 13.46,14.5 12,14.5C10.54,14.5 7.07,15.09 5.64,16.83C4.62,15.5 4,13.82 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,13.82 19.38,15.5 18.36,16.83M12,6C10.06,6 8.5,7.56 8.5,9.5C8.5,11.44 10.06,13 12,13C13.94,13 15.5,11.44 15.5,9.5C15.5,7.56 13.94,6 12,6Z" />
                                </svg>
                                <svg
                                    width="12"
                                    height="12"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    style="margin-left: 0.25rem;"
                                >
                                    <path d="M7,10L12,15L17,10H7Z" />
                                </svg>
                            </button>
                            <div class="nav-dropdown-menu" :class="{ active: showUserMenu }">
                                <NuxtLink :to="`/account/${userAccountId}`" class="nav-dropdown-item" @click="showUserMenu = false">
                                    <svg
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                    >
                                        <path d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" />
                                    </svg>
                                    Manage Account
                                </NuxtLink>
                                <NuxtLink
                                    v-if="isUserAdmin"
                                    to="/admin"
                                    class="nav-dropdown-item admin-portal-link"
                                    @click="showUserMenu = false"
                                >
                                    <svg
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                    >
                                        <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7C13.4,7 14.8,8.6 14.8,10V11.5C15.4,11.9 16,12.4 16,13V16C16,17.1 15.1,18 14,18H10C8.9,18 8,17.1 8,16V13C8,12.4 8.6,11.9 9.2,11.5V10C9.2,8.6 10.6,7 12,7M12,8.2C11.2,8.2 10.5,8.7 10.5,9.5V11.5H13.5V9.5C13.5,8.7 12.8,8.2 12,8.2Z" />
                                    </svg>
                                    Admin Portal
                                </NuxtLink>
                                <div v-if="isUserAdmin" class="nav-dropdown-divider" />
                                <button class="nav-dropdown-item" @click="handleSignOut">
                                    <svg
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                    >
                                        <path d="M16,17V14H9V10H16V7L21,12L16,17M14,2A2,2 0 0,1 16,4V6H14V4H5V20H14V18H16V20A2,2 0 0,1 14,22H5A2,2 0 0,1 3,20V4A2,2 0 0,1 5,2H14Z" />
                                    </svg>
                                    Sign Out
                                </button>
                            </div>
                        </div>
                    </div>
                </template>
            </div>

            <button
                class="mobile-toggle"
                :class="{ active: mobileMenuOpen }"
                @click="mobileMenuOpen = !mobileMenuOpen"
            >
                <span />
                <span />
                <span />
            </button>
        </div>
    </nav>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { isMobileDevice as checkMobile } from '~/utils/deviceDetection';

// Mobile detection - check at script level to prevent flash
const isMobileDevice = ref(false);

if (import.meta.client) {
    isMobileDevice.value = checkMobile();
}

// Mobile menu state
const mobileMenuOpen = ref(false);
const showUserMenu = ref(false);

// Auth composables
const {
    isAuthenticated: isLoggedIn,
    isAdmin: isUserAdmin,
    accountId: userAccountId,
    credits,
    logout,
} = useAuth();

// Format credits for display
const userCredits = computed(() =>
{
    // Display whole number of credits
    return Math.floor(credits.value);
});

// Sign out handler
const handleSignOut = async () =>
{
    showUserMenu.value = false;
    await logout();
};

// Close dropdown when clicking outside
if (import.meta.client)
{
    onMounted(() =>
    {
        document.addEventListener("click", (e) =>
        {
            if (!e.target.closest(".nav-dropdown"))
            {
                showUserMenu.value = false;
            }
        });
    });
}
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 2rem;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 12px;
  z-index: 1000;
  padding: 0.5rem 1.25rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
  width: 100%;
  max-width: 1200px;
  min-width: fit-content;
}

.nav-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.5rem;
  margin: 0;
  padding: 0;
  min-width: fit-content;
}

.nav-brand {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.5rem;
  font-weight: 800;
  color: #333;
  text-decoration: none;
}

.logo {
  width: 10rem;
  height: auto;
}

.brand-name {
  background: linear-gradient(135deg, #1f2937 0%, #111827 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.nav-link {
  color: #6b7280;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.875rem;
  transition: all 0.3s ease;
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  position: relative;
  white-space: nowrap;
}

.nav-link:hover {
  color: #1f2937;
  background: rgba(31, 41, 55, 0.08);
}

.removebg-link {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  color: #2563eb;
  font-weight: 600;
}

.removebg-link:hover {
  color: #1d4ed8;
  background: rgba(37, 99, 235, 0.08);
}

.nav-new-badge {
  background: #2563eb;
  color: #ffffff;
  font-size: 0.5625rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  line-height: 1;
  padding: 0.1875rem 0.375rem;
  border-radius: 9999px;
}

.awards-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #d97706;
  font-weight: 600;
}

.awards-text {
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  gap: 0.4rem;
  line-height: 1;
}

.awards-title {
  font-weight: 700;
}

.awards-sub-badge {
  width: fit-content;
  font-size: 0.6rem;
  font-weight: 800;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  padding: 0.15rem 0.35rem;
  border-radius: 999px;
  background: linear-gradient(135deg, rgba(251, 191, 36, 0.18) 0%, rgba(245, 158, 11, 0.18) 100%);
  border: 1px solid rgba(245, 158, 11, 0.25);
  color: #b45309;
}

.awards-link svg {
  color: #f59e0b;
  filter: drop-shadow(0 1px 2px rgba(245, 158, 11, 0.3));
}

.awards-link:hover {
  color: #b45309;
  background: rgba(245, 158, 11, 0.1);
}

.awards-link:hover svg {
  color: #d97706;
}

.nav-cta {
  background: linear-gradient(135deg, #1f2937 0%, #111827 100%);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.nav-cta:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
}

.nav-cta-plain {
  background: #1f2937;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  font-size: 0.875rem;
  white-space: nowrap;
}

.nav-cta-plain:hover {
  background: #374151;
  transform: translateY(-1px);
}

.analyze-btn {
  background: linear-gradient(135deg, #1f2937 0%, #111827 100%);
  color: white !important;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-weight: 500;
  text-decoration: none;
  font-size: 0.875rem;
  white-space: nowrap;
  border: none;
  cursor: pointer;
}

.analyze-btn:hover {
  background: linear-gradient(135deg, #111827 0%, #000000 100%);
  transform: translateY(-1px);
}

.viewer-btn {
  background: rgba(31, 41, 55, 0.1);
  color: #1f2937 !important;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-weight: 500;
  text-decoration: none;
  font-size: 0.875rem;
  white-space: nowrap;
  border: 1px solid rgba(31, 41, 55, 0.2);
}

.viewer-btn:hover {
  background: rgba(31, 41, 55, 0.15);
  border-color: rgba(31, 41, 55, 0.3);
  transform: translateY(-1px);
}

/* Authenticated User Interface */
.nav-user-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.nav-credits {
  background: linear-gradient(135deg, #1f2937 0%, #111827 100%);
  color: white;
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  text-decoration: none;
  cursor: pointer;
  white-space: nowrap;
}

.nav-dropdown {
  position: relative;
}

.nav-user-btn {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  background: rgba(31, 41, 55, 0.1);
  border: 1px solid rgba(31, 41, 55, 0.2);
  color: #1f2937;
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  font-size: 0.875rem;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.nav-user-btn:hover {
  background: rgba(31, 41, 55, 0.15);
  border-color: rgba(31, 41, 55, 0.3);
}

.nav-dropdown-menu {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  min-width: 200px;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-10px);
  transition: all 0.2s ease;
  z-index: 1000;
}

.nav-dropdown-menu.active {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.nav-dropdown-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  width: 100%;
  text-align: left;
  border: none;
  background: none;
  color: #374151;
  text-decoration: none;
  font-size: 0.875rem;
  transition: background-color 0.2s ease;
  cursor: pointer;
}

.nav-dropdown-item:hover {
  background: #f9fafb;
}

.nav-dropdown-item:first-child {
  border-top-left-radius: 7px;
  border-top-right-radius: 7px;
}

.nav-dropdown-item:last-child {
  border-bottom-left-radius: 7px;
  border-bottom-right-radius: 7px;
}

.nav-dropdown-item svg {
  color: #6b7280;
}

.admin-portal-link {
  background: linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(185, 28, 28, 0.1) 100%);
  color: #dc2626;
  border-left: 3px solid #dc2626;
}

.admin-portal-link:hover {
  background: linear-gradient(135deg, rgba(239, 68, 68, 0.15) 0%, rgba(185, 28, 28, 0.15) 100%);
}

.admin-portal-link svg {
  color: #dc2626;
}

.nav-dropdown-divider {
  height: 1px;
  background: #e5e7eb;
  margin: 0.5rem 0;
}

.awards-nav-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
}

.awards-countdown-badge {
  display: flex;
  gap: 0.15rem;
  padding: 0.125rem 0.25rem;
  background: linear-gradient(135deg, rgba(251, 191, 36, 0.12) 0%, rgba(245, 158, 11, 0.12) 100%);
  border-radius: 4px;
  border: 1px solid rgba(245, 158, 11, 0.15);
}

.awards-countdown-badge .countdown-value {
  font-size: 0.5625rem;
  font-weight: 600;
  color: #d97706;
  background: white;
  padding: 0.0625rem 0.25rem;
  border-radius: 2px;
  min-width: 22px;
  text-align: center;
  box-shadow: 0 0.5px 1px rgba(0, 0, 0, 0.08);
  white-space: nowrap;
  line-height: 1;
}

.nav-mobile-header {
  display: none;
}

.mobile-toggle {
  display: none;
  flex-direction: column;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  gap: 4px;
}

.mobile-toggle span {
  width: 25px;
  height: 3px;
  background: #333;
  transition: all 0.3s ease;
  border-radius: 2px;
}

.mobile-toggle.active span:nth-child(1) {
  transform: rotate(45deg) translate(6px, 6px);
}

.mobile-toggle.active span:nth-child(2) {
  opacity: 0;
}

.mobile-toggle.active span:nth-child(3) {
  transform: rotate(-45deg) translate(6px, -6px);
}

@media (max-width: 768px) {
  .navbar {
    top: 1rem;
    left: 1rem;
    right: 1rem;
    transform: none;
    max-width: none;
    width: auto;
  }
  
  .mobile-toggle {
    display: flex;
    z-index: 1002;
  }

  .nav-links {
    position: absolute;
    top: calc(100% + 1rem);
    left: 0;
    right: 0;
    background: rgba(255, 255, 255, 0.98);
    backdrop-filter: blur(20px);
    flex-direction: column;
    padding: 1.5rem;
    gap: 1rem;
    transform: translateY(-10px);
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    border-radius: 16px;
    border: 1px solid rgba(0, 0, 0, 0.08);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
    z-index: 1001;
  }

  .nav-links.active {
    transform: translateY(0);
    opacity: 1;
    visibility: visible;
  }

  /* Mobile nav links styling */
  .nav-link {
    padding: 0.75rem 0;
    margin: 0;
    display: flex;
    align-items: center;
    font-size: 1rem;
    color: #374151;
    border-bottom: 1px solid #f1f5f9;
  }

  .nav-link::after {
    display: none;
  }

  .nav-link:hover {
    color: #667eea;
  }

  .analyze-btn, .viewer-btn {
    margin: 0.5rem 0;
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    text-align: center;
    justify-content: center;
  }

  .nav-cta-plain {
    margin: 0.5rem 0;
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    text-align: center;
    justify-content: center;
  }

  .nav-user-info {
    flex-direction: column;
    width: 100%;
    gap: 1rem;
    align-items: stretch;
    border-top: 1px solid #f1f5f9;
    padding-top: 1rem;
    margin-top: 1rem;
  }

  .nav-credits {
    text-align: center;
    padding: 0.75rem 1rem;
    border-radius: 12px;
    font-size: 1rem;
    font-weight: 700;
  }

  .nav-dropdown-menu {
    position: static;
    opacity: 1;
    visibility: visible;
    transform: none;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    border: 1px solid rgba(102, 126, 234, 0.2);
    background: rgba(102, 126, 234, 0.03);
    border-radius: 12px;
    margin-top: 0.75rem;
    display: block;
  }

  .nav-dropdown-menu:not(.active) {
    display: none;
  }

  .nav-dropdown-menu.active {
    display: block;
  }

  .nav-dropdown-item {
    padding: 1rem;
    font-size: 1rem;
    border-bottom: 1px solid #e5e7eb;
    gap: 0.75rem;
  }

  .nav-dropdown-item:hover {
    background: rgba(102, 126, 234, 0.08);
    color: #667eea;
  }

  .nav-user-btn {
    justify-content: center;
    padding: 1rem;
    background: rgba(102, 126, 234, 0.08);
    border: 1px solid rgba(102, 126, 234, 0.3);
    border-radius: 12px;
    font-size: 1rem;
    color: #667eea;
    font-weight: 600;
  }

  .nav-user-btn:hover {
    background: rgba(102, 126, 234, 0.15);
    color: #5a67d8;
    border-color: rgba(102, 126, 234, 0.5);
  }
}
</style>