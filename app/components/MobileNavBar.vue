<template>
    <div class="mobile-nav-wrapper">
        <!-- Top Bar -->
        <header class="mobile-top-bar">
            <NuxtLink to="/" class="top-bar-logo">
                <img src="/logo_black.svg" alt="For the Badge" class="logo-img">
            </NuxtLink>

            <button class="top-bar-menu" @click="showMenu = true" aria-label="Open menu">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z" />
                </svg>
            </button>
        </header>

        <!-- Bottom Navigation (Authenticated) -->
        <nav v-if="isLoggedIn" class="mobile-bottom-nav">
            <NuxtLink to="/generator" class="nav-item" :class="{ active: currentRoute === '/generator' }">
                <svg class="nav-icon" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
                </svg>
                <span class="nav-label">Generator</span>
            </NuxtLink>

            <NuxtLink to="/my-badges" class="nav-item" :class="{ active: currentRoute === '/my-badges' }">
                <svg class="nav-icon" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20C6.47,20 4,17.53 4,12C4,6.47 6.47,4 12,4C17.53,4 20,6.47 20,12C20,17.53 17.53,20 12,20M9.5,13C8.12,13 7,11.88 7,10.5C7,9.12 8.12,8 9.5,8C10.88,8 12,9.12 12,10.5C12,11.88 10.88,13 9.5,13M14.5,13C13.12,13 12,11.88 12,10.5C12,9.12 13.12,8 14.5,8C15.88,8 17,9.12 17,10.5C17,11.88 15.88,13 14.5,13Z" />
                </svg>
                <span class="nav-label">Badges</span>
            </NuxtLink>

            <NuxtLink to="/badges" class="nav-item" :class="{ active: currentRoute === '/badges' }">
                <svg class="nav-icon" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20M11,17H13V11H11V17M11,9H13V7H11V9Z" />
                </svg>
                <span class="nav-label">All Badges</span>
            </NuxtLink>

            <NuxtLink :to="`/account/${userAccountId}`" class="nav-item" :class="{ active: currentRoute.startsWith('/account') }">
                <svg class="nav-icon" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" />
                </svg>
                <span class="nav-label">Account</span>
            </NuxtLink>
        </nav>

        <!-- Bottom Navigation (Unauthenticated) -->
        <nav v-else class="mobile-bottom-nav">
            <NuxtLink to="/" class="nav-item" :class="{ active: currentRoute === '/' }">
                <svg class="nav-icon" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z" />
                </svg>
                <span class="nav-label">Home</span>
            </NuxtLink>

            <NuxtLink to="/generator" class="nav-item" :class="{ active: currentRoute === '/generator' }">
                <svg class="nav-icon" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
                </svg>
                <span class="nav-label">Generator</span>
            </NuxtLink>

            <NuxtLink to="/login" class="nav-item" :class="{ active: currentRoute === '/login' }">
                <svg class="nav-icon" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                </svg>
                <span class="nav-label">Sign In</span>
            </NuxtLink>

            <NuxtLink to="/account" class="nav-item" :class="{ active: currentRoute === '/account' }">
                <svg class="nav-icon" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" />
                </svg>
                <span class="nav-label">Sign Up</span>
            </NuxtLink>
        </nav>

        <!-- Menu Slide-up (Authenticated) -->
        <Transition name="menu">
            <div v-if="showMenu && isLoggedIn" class="menu-overlay" @click="showMenu = false">
                <div class="menu-sheet" @click.stop>
                    <div class="menu-handle"></div>
                    
                    <!-- User Info -->
                    <div class="menu-user-section">
                        <div class="menu-avatar">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" />
                            </svg>
                        </div>
                        <div class="menu-user-info">
                            <div class="menu-account-id">{{ formattedAccountId }}</div>
                        </div>
                    </div>

                    <!-- Menu Items -->
                    <div class="menu-items">
                        <NuxtLink to="/" class="menu-item" @click="showMenu = false">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z" />
                            </svg>
                            <span>Home</span>
                            <svg class="menu-arrow" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
                            </svg>
                        </NuxtLink>

                        <NuxtLink to="/generator" class="menu-item" @click="showMenu = false">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
                            </svg>
                            <span>Generator</span>
                            <svg class="menu-arrow" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
                            </svg>
                        </NuxtLink>

                        <NuxtLink to="/my-badges" class="menu-item" @click="showMenu = false">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20C6.47,20 4,17.53 4,12C4,6.47 6.47,4 12,4C17.53,4 20,6.47 20,12C20,17.53 17.53,20 12,20M9.5,13C8.12,13 7,11.88 7,10.5C7,9.12 8.12,8 9.5,8C10.88,8 12,9.12 12,10.5C12,11.88 10.88,13 9.5,13M14.5,13C13.12,13 12,11.88 12,10.5C12,9.12 13.12,8 14.5,8C15.88,8 17,9.12 17,10.5C17,11.88 15.88,13 14.5,13Z" />
                            </svg>
                            <span>Badges</span>
                        </NuxtLink>

                        <NuxtLink to="/api" class="menu-item" @click="showMenu = false">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M3,6H21V8H3V6M3,16H21V18H3V16M3,11H21V13H3V11Z" />
                            </svg>
                            <span>API Docs</span>
                            <svg class="menu-arrow" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
                            </svg>
                        </NuxtLink>

                        <NuxtLink to="/awards" class="menu-item awards" @click="showMenu = false">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M20.2,2H19.5H18C17.1,2 16,3 16,4H8C8,3 6.9,2 6,2H4.5H3.8H2V11C2,12 3,13 4,13H6.2C6.6,15 7.9,16.7 11,17V19.1C8.8,19.3 8,20.4 8,21.7V22H16V21.7C16,20.4 15.2,19.3 13,19.1V17C16.1,16.7 17.4,15 17.8,13H20C21,13 22,12 22,11V2H20.2M4,11V4H6V6V11C5.1,11 4.3,11 4,11M20,11C19.7,11 18.9,11 18,11V6V4H20V11Z" />
                            </svg>
                            <span class="awards-menu-text">
                                <span class="awards-menu-title">Developer Awards</span>
                                <span class="awards-menu-badge">2026 Winners</span>
                            </span>
                            <svg class="menu-arrow" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
                            </svg>
                        </NuxtLink>

                        <NuxtLink :to="`/account/${userAccountId}`" class="menu-item" @click="showMenu = false">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12,15C7.58,15 4,16.79 4,19V21H20V19C20,16.79 16.42,15 12,15M8,9A4,4 0 0,0 12,13A4,4 0 0,0 16,9M11.5,2C11.2,2 11,2.21 11,2.5V5.5H10V3C10,3 7.75,3.86 7.75,6.75C7.75,6.75 7,6.89 7,8H17C16.95,6.89 16.25,6.75 16.25,6.75C16.25,3.86 14,3 14,3V5.5H13V2.5C13,2.21 12.81,2 12.5,2H11.5Z" />
                            </svg>
                            <span>Manage Account</span>
                            <svg class="menu-arrow" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
                            </svg>
                        </NuxtLink>

                        <NuxtLink v-if="isUserAdmin" to="/admin" class="menu-item admin" @click="showMenu = false">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7C13.4,7 14.8,8.6 14.8,10V11.5C15.4,11.9 16,12.4 16,13V16C16,17.1 15.1,18 14,18H10C8.9,18 8,17.1 8,16V13C8,12.4 8.6,11.9 9.2,11.5V10C9.2,8.6 10.6,7 12,7M12,8.2C11.2,8.2 10.5,8.7 10.5,9.5V11.5H13.5V9.5C13.5,8.7 12.8,8.2 12,8.2Z" />
                            </svg>
                            <span>Admin Portal</span>
                            <svg class="menu-arrow" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
                            </svg>
                        </NuxtLink>

                        <button class="menu-item" @click="openFeedback">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M21 11.5C21.0034 12.8199 20.6951 14.1219 20.1 15.3C19.3944 16.7118 18.3098 17.8992 16.9674 18.7293C15.6251 19.5594 14.0782 19.9994 12.5 20C11.1801 20.0035 9.87812 19.6951 8.7 19.1L3 21L4.9 15.3C4.30493 14.1219 3.99656 12.8199 4 11.5C4.00061 9.92176 4.44061 8.37488 5.27072 7.03258C6.10083 5.69028 7.28825 4.60573 8.7 3.90003C9.87812 3.30496 11.1801 2.99659 12.5 3.00003H13C15.0843 3.11502 17.053 3.99479 18.5291 5.47089C20.0052 6.94699 20.885 8.91568 21 11V11.5Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
                            </svg>
                            <span>Send Feedback</span>
                        </button>

                        <div class="menu-divider"></div>

                        <button class="menu-item logout" @click="handleSignOut">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M16,17V14H9V10H16V7L21,12L16,17M14,2A2,2 0 0,1 16,4V6H14V4H5V20H14V18H16V20A2,2 0 0,1 14,22H5A2,2 0 0,1 3,20V4A2,2 0 0,1 5,2H14Z" />
                            </svg>
                            <span>Sign Out</span>
                        </button>
                    </div>
                </div>
            </div>
        </Transition>

        <!-- Menu Slide-up (Unauthenticated) -->
        <Transition name="menu">
            <div v-if="showMenu && !isLoggedIn" class="menu-overlay" @click="showMenu = false">
                <div class="menu-sheet" @click.stop>
                    <div class="menu-handle"></div>
                    
                    <!-- Logo Section -->
                    <div class="menu-logo-section">
                        <div class="menu-logo-badge">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                            </svg>
                        </div>
                        <h3>For the Badge</h3>
                        <p>Badge Creation Service</p>
                    </div>

                    <!-- Menu Items -->
                    <div class="menu-items">
                        <NuxtLink to="/" class="menu-item" @click="showMenu = false">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z" />
                            </svg>
                            <span>Home</span>
                            <svg class="menu-arrow" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
                            </svg>
                        </NuxtLink>

                        <NuxtLink to="/generator" class="menu-item" @click="showMenu = false">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
                            </svg>
                            <span>Badge Generator</span>
                            <svg class="menu-arrow" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
                            </svg>
                        </NuxtLink>

                        <NuxtLink to="/badges" class="menu-item" @click="showMenu = false">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M5,3H19A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5A2,2 0 0,1 3,19V5A2,2 0 0,1 5,3M7,7V9H17V7H7M7,11V13H17V11H7M7,15V17H14V15H7Z" />
                            </svg>
                            <span>Browse Badges</span>
                            <svg class="menu-arrow" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
                            </svg>
                        </NuxtLink>

                        <NuxtLink to="/api" class="menu-item" @click="showMenu = false">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M3,6H21V8H3V6M3,16H21V18H3V16M3,11H21V13H3V11Z" />
                            </svg>
                            <span>API Docs</span>
                            <svg class="menu-arrow" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
                            </svg>
                        </NuxtLink>

                        <NuxtLink to="/awards" class="menu-item awards" @click="showMenu = false">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12,15L9.18,16.5L9.82,13.32L7.32,11.18L10.53,10.82L12,8L13.47,10.82L16.68,11.18L14.18,13.32L14.82,16.5M20,12C20,14.76 19.1,17.33 17.61,19.43L15,17.5C16.26,15.96 17,14.06 17,12C17,9.94 16.26,8.04 15,6.5L17.61,4.57C19.1,6.67 20,9.24 20,12M8,12C8,9.94 8.74,8.04 10,6.5L7.39,4.57C5.9,6.67 5,9.24 5,12C5,14.76 5.9,17.33 7.39,19.43L10,17.5C8.74,15.96 8,14.06 8,12M12,2C6.48,2 2,6.48 2,12C2,17.52 6.48,22 12,22C17.52,22 22,17.52 22,12C22,6.48 17.52,2 12,2Z" />
                            </svg>
                            <span class="awards-menu-text">
                                <span class="awards-menu-title">Developer Awards</span>
                                <span class="awards-menu-badge">2026 Winners</span>
                            </span>
                            <svg class="menu-arrow" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
                            </svg>
                        </NuxtLink>

                        <button class="menu-item" @click="openFeedback">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M21 11.5C21.0034 12.8199 20.6951 14.1219 20.1 15.3C19.3944 16.7118 18.3098 17.8992 16.9674 18.7293C15.6251 19.5594 14.0782 19.9994 12.5 20C11.1801 20.0035 9.87812 19.6951 8.7 19.1L3 21L4.9 15.3C4.30493 14.1219 3.99656 12.8199 4 11.5C4.00061 9.92176 4.44061 8.37488 5.27072 7.03258C6.10083 5.69028 7.28825 4.60573 8.7 3.90003C9.87812 3.30496 11.1801 2.99659 12.5 3.00003H13C15.0843 3.11502 17.053 3.99479 18.5291 5.47089C20.0052 6.94699 20.885 8.91568 21 11V11.5Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
                            </svg>
                            <span>Send Feedback</span>
                        </button>

                        <NuxtLink to="/account" class="menu-item" @click="showMenu = false">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" />
                            </svg>
                            <span>Sign In / Sign Up</span>
                            <svg class="menu-arrow" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
                            </svg>
                        </NuxtLink>
                    </div>
                </div>
            </div>
        </Transition>

        <!-- Feedback Modal -->
        <FeedbackModal
            :show="showFeedbackModal"
            @close="closeFeedbackModal"
            @submit="handleFeedbackSubmit"
        />
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const showMenu = ref(false);
const showFeedbackModal = ref(false);

// Auth composables
const {
    isAuthenticated: isLoggedIn,
    isAdmin: isUserAdmin,
    accountId: userAccountId,
    formattedAccountId,
    credits,
    logout,
} = useAuth();

// Current route
const currentRoute = computed(() => route.path);

// Format credits for display
const userCredits = computed(() => {
    return credits.value.toFixed(2);
});

// Sign out handler
const handleSignOut = async () => {
    showMenu.value = false;
    await logout();
    navigateTo('/');
};

// Feedback handlers
const openFeedback = () => {
    showMenu.value = false;
    showFeedbackModal.value = true;
};

const closeFeedbackModal = () => {
    showFeedbackModal.value = false;
};

const handleFeedbackSubmit = async (feedbackData) => {
    try {
        const response = await $fetch('/api/feedback', {
            method: 'POST',
            body: {
                message: feedbackData.message
            }
        });
        
        console.log('Feedback submitted successfully:', response);
        // Don't close modal here - let the modal show success state first
        
    } catch (error) {
        console.error('Error submitting feedback:', error);
        // Handle error appropriately (show error message to user)
        throw error; // Re-throw so the loading state is handled properly
    }
};
</script>

<style scoped>
.mobile-nav-wrapper {
    position: relative;
}

/* Top Bar */
.mobile-top-bar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 52px;
    background: #000;
    border-bottom: 1px solid #222;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 1rem;
    z-index: 100;
}

.top-bar-logo {
    display: flex;
    align-items: center;
}

.logo-img {
    height: 20px;
    width: auto;
    filter: invert(1);
}

.top-bar-menu {
    background: none;
    border: none;
    padding: 0.5rem;
    color: rgba(255,255,255,0.7);
    cursor: pointer;
    transition: color 0.12s;
}

.top-bar-menu:hover { color: #fff; }

/* Bottom Navigation */
.mobile-bottom-nav {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 64px;
    background: white;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: space-around;
    align-items: center;
    z-index: 100;
    box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05);
}

.nav-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.25rem;
    padding: 0.5rem 1rem;
    color: #9ca3af;
    text-decoration: none;
    transition: color 0.12s, background 0.12s;
    flex: 1;
}

.nav-icon {
    transition: all 0.2s;
}

.nav-label {
    font-size: 0.75rem;
    font-weight: 600;
    transition: all 0.2s;
}

.nav-item.active {
    color: #000000;
}

.nav-item.active .nav-icon {
    transform: scale(1.1);
}

.nav-item:active {
    transform: scale(0.95);
}

/* Menu Overlay */
.menu-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 200;
    display: flex;
    align-items: flex-end;
}

.menu-sheet {
    width: 100%;
    background: white;
    border-radius: 24px 24px 0 0;
    padding: 1rem;
    max-height: 80vh;
    overflow-y: auto;
}

.menu-handle {
    width: 40px;
    height: 4px;
    background: #d1d5db;
    border-radius: 2px;
    margin: 0 auto 1.5rem;
}

/* User Section */
.menu-user-section {
    display: flex;
    gap: 1rem;
    align-items: center;
    padding: 1rem;
    background: linear-gradient(135deg, #000000 0%, #000000 100%);
    border-radius: 16px;
    margin-bottom: 1rem;
    color: white;
}

/* Logo Section (Unauthenticated) */
.menu-logo-section {
    text-align: center;
    padding: 1.5rem 1rem;
    margin-bottom: 1rem;
}

.menu-logo-badge {
    width: 64px;
    height: 64px;
    background: linear-gradient(135deg, #000000 0%, #000000 100%);
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 1rem;
    color: white;
}

.menu-logo-section h3 {
    font-size: 1.5rem;
    font-weight: 800;
    color: #1f2937;
    margin: 0 0 0.25rem;
}

.menu-logo-section p {
    font-size: 0.875rem;
    color: #6b7280;
    margin: 0;
}

.menu-avatar {
    width: 56px;
    height: 56px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
}

.menu-user-info {
    flex: 1;
}

.menu-account-id {
    font-size: 1rem;
    font-weight: 700;
    font-family: monospace;
    margin-bottom: 0.25rem;
}

.menu-credits {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.875rem;
    opacity: 0.9;
}

/* Menu Items */
.menu-items {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.menu-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1rem;
    background: #f9fafb;
    border: none;
    border-radius: 12px;
    text-decoration: none;
    color: #1f2937;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    width: 100%;
    text-align: left;
    letter-spacing: 0.01em;
}

.menu-item:active {
    transform: scale(0.98);
    background: #f3f4f6;
}

.menu-item svg {
    color: #6b7280;
    flex-shrink: 0;
}

.menu-item span {
    flex: 1;
}

.menu-arrow {
    opacity: 0.5;
}

.menu-item.admin {
    background: linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(185, 28, 28, 0.1) 100%);
    color: #dc2626;
    border-left: 3px solid #dc2626;
}

.menu-item.admin svg {
    color: #dc2626;
}

.menu-item.awards {
    background: linear-gradient(135deg, rgba(251, 191, 36, 0.1) 0%, rgba(217, 119, 6, 0.1) 100%);
    color: #d97706;
    border-left: 3px solid #f59e0b;
}

.menu-item.awards svg {
    color: #f59e0b;
}

.awards-menu-text {
    display: inline-flex;
    flex-direction: row;
    align-items: center;
    gap: 0.5rem;
}

.awards-menu-title {
    font-weight: 800;
}

.awards-menu-badge {
    width: fit-content;
    font-size: 0.65rem;
    font-weight: 900;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    padding: 0.15rem 0.4rem;
    border-radius: 999px;
    background: rgba(251, 191, 36, 0.18);
    border: 1px solid rgba(245, 158, 11, 0.25);
    color: #b45309;
}

.menu-item.logout {
    background: transparent;
    color: #ef4444;
}

.menu-item.logout svg {
    color: #ef4444;
}

.menu-divider {
    height: 1px;
    background: #e5e7eb;
    margin: 0.5rem 0;
}

/* Transitions */
.menu-enter-active,
.menu-leave-active {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.menu-enter-from,
.menu-leave-to {
    opacity: 0;
}

.menu-enter-from .menu-sheet,
.menu-leave-to .menu-sheet {
    transform: translateY(100%);
}
</style>
