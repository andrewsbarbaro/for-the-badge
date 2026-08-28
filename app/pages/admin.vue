the Ui should look more like this

<template>
    <div class="admin-portal">
        <!-- Particle background -->
        <div class="particle-container">
            <div v-for="i in 60" :key="i" :class="`particle-${(i % 3) + 1}`"></div>
        </div>
        <!-- Desktop Navigation -->
        <NavBar v-if="!isMobile" />
        
        <!-- Mobile Navigation -->
        <MobileNavBar v-if="isMobile" />
        
        <div class="portal-container" :class="{ 'mobile-view': isMobile }">
            <!-- Loading State -->
            <div v-if="isLoading" class="loading-state">
                <div class="spinner" />
                <p>Loading admin portal...</p>
            </div>

            <!-- Access Denied State - Only show this, no header -->
            <div v-else-if="accessDenied" class="access-denied">
                <div class="error-icon">
                    <svg
                        width="64"
                        height="64"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                    >
                        <path d="M12,1C5.93,1 1,5.93 1,12C1,18.07 5.93,23 12,23C18.07,23 23,18.07 23,12C23,5.93 18.07,1 12,1M15.59,16.59L14.17,18L12,15.83L9.83,18L8.41,16.59L10.58,14.41L8.41,12.24L9.83,10.82L12,13L14.17,10.83L15.59,12.24L13.41,14.41L15.59,16.59Z" />
                    </svg>
                </div>
                <h2>Access Denied</h2>
                <p>You don't have administrator privileges to access this portal.</p>
                <NuxtLink to="/app" class="btn-primary">
                    Return to App
                </NuxtLink>
            </div>

            <!-- Admin Portal Content - Only show when user has access -->
            <div v-else>
                <!-- Header Section -->
                <div class="portal-header">
                    <div class="header-content">
                        <div class="header-icon">
                            <svg
                                width="48"
                                height="48"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                            >
                                <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7C13.4,7 14.8,8.6 14.8,10V11.5C15.4,11.9 16,12.4 16,13V16C16,17.1 15.1,18 14,18H10C8.9,18 8,17.1 8,16V13C8,12.4 8.6,11.9 9.2,11.5V10C9.2,8.6 10.6,7 12,7M12,8.2C11.2,8.2 10.5,8.7 10.5,9.5V11.5H13.5V9.5C13.5,8.7 12.8,8.2 12,8.2Z" />
                            </svg>
                        </div>
                        <div class="header-text">
                            <h1>Admin Portal</h1>
                            <p>Manage user accounts, credits, and system operations</p>
                        </div>
                    </div>
                </div>

                <!-- Main Admin Content -->
                <div class="portal-content">
                    <!-- Action Cards -->
                    <div class="action-cards">
                        <div class="action-card" @click="showAccountManagement = true">
                            <div class="card-icon">
                                <svg
                                    width="32"
                                    height="32"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                >
                                    <path d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" />
                                </svg>
                            </div>
                            <div class="card-content">
                                <h3>Account Management</h3>
                                <p>View all accounts and adjust user credits</p>
                            </div>
                            <div class="card-arrow">
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                >
                                    <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
                                </svg>
                            </div>
                        </div>

                        <div class="action-card" @click="showBadgeApprovals = true">
                            <div class="card-icon">
                                <svg
                                    width="32"
                                    height="32"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                >
                                    <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M11,16.5L18,9.5L16.59,8.09L11,13.67L7.91,10.59L6.5,12L11,16.5Z" />
                                </svg>
                            </div>
                            <div class="card-content">
                                <h3>Badge Approvals</h3>
                                <p>Review and approve community badge submissions</p>
                            </div>
                            <div class="card-arrow">
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                >
                                    <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
                                </svg>
                            </div>
                        </div>

                        <div class="action-card" @click="openHomepagePlacements">
                            <div class="card-icon">
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M3,3H21V21H3V3M5,5V19H19V5H5M9,7H7V9H9V7M11,7H17V9H11V7M7,11H9V13H7V11M11,11H17V13H11V11M7,15H9V17H7V15M11,15H17V17H11V15Z" />
                                </svg>
                            </div>
                            <div class="card-content">
                                <h3>Badge Board Placements</h3>
                                <p>
                                    Review homepage pixel purchases
                                    <span v-if="pendingPlacements.length" class="pending-badge-count">{{ pendingPlacements.length }} pending</span>
                                </p>
                            </div>
                            <div class="card-arrow">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
                                </svg>
                            </div>
                        </div>

                        <div class="action-card" @click="showFeedbackManagement = true">
                            <div class="card-icon">
                                <svg
                                    width="32"
                                    height="32"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                >
                                    <path d="M9,22A1,1 0 0,1 8,21V18H4A2,2 0 0,1 2,16V4C2,2.89 2.9,2 4,2H20A2,2 0 0,1 22,4V16A2,2 0 0,1 20,18H13.9L10.2,21.71C10,21.9 9.75,22 9.5,22H9M10,16V19.08L13.08,16H20V4H4V16H10M6,7H18V9H6V7M6,11H15V13H6V11Z" />
                                </svg>
                            </div>
                            <div class="card-content">
                                <h3>Feedback Management</h3>
                                <p>View and manage user feedback submissions</p>
                            </div>
                            <div class="card-arrow">
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                >
                                    <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
                                </svg>
                            </div>
                        </div>

                    </div>

                    <!-- Account Management Panel -->
                    <div v-if="showAccountManagement" class="management-panel">
                        <div class="panel-header">
                            <div class="panel-title">
                                <h2>Account Management</h2>
                                <p v-if="accountStats" class="panel-subtitle">
                                    {{ accountStats.totalUsers.toLocaleString() }} total users
                                </p>
                            </div>
                            <button class="close-btn" @click="closeAccountManagement">
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                >
                                    <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
                                </svg>
                            </button>
                        </div>
                        <div v-if="accountStats" class="account-stats-grid">
                            <article class="account-stat-card">
                                <span class="stat-label">Total Users</span>
                                <strong class="stat-value">{{ accountStats.totalUsers.toLocaleString() }}</strong>
                                <span class="stat-meta">{{ accountStats.adminUsers.toLocaleString() }} admin accounts</span>
                            </article>
                            <article class="account-stat-card">
                                <span class="stat-label">Active (7 days)</span>
                                <strong class="stat-value">{{ accountStats.activeUsersLast7Days.toLocaleString() }}</strong>
                                <span class="stat-meta">{{ formatRatio(accountStats.activeUsersLast7Days, accountStats.totalUsers) }} of users active</span>
                            </article>
                            <article class="account-stat-card">
                                <span class="stat-label">New Users (7 days)</span>
                                <strong class="stat-value">{{ accountStats.newUsersLast7Days.toLocaleString() }}</strong>
                                <span :class="['stat-trend', accountGrowthTrend.className]">{{ accountGrowthTrend.label }}</span>
                            </article>
                            <article class="account-stat-card">
                                <span class="stat-label">PIN Enabled</span>
                                <strong class="stat-value">{{ accountStats.pinEnabledUsers.toLocaleString() }}</strong>
                                <span class="stat-meta">{{ formatRatio(accountStats.pinEnabledUsers, accountStats.totalUsers) }} adoption</span>
                            </article>
                        </div>

                        <div v-if="accountsLoading" class="panel-loading">
                            <div class="spinner" />
                            <p>Loading accounts...</p>
                        </div>

                        <div v-else-if="accountsError" class="panel-error">
                            <p>{{ accountsError }}</p>
                            <button class="btn-secondary" @click="loadAccounts">
                                Retry
                            </button>
                        </div>

                        <div v-else class="accounts-table">
                            <div class="table-header">
                                <span>Account Hash</span>
                                <span>Admin</span>
                                <span>PIN Enabled</span>
                                <span>Created</span>
                                <span>Updated</span>
                                <span>Last Accessed</span>
                            </div>

                            <div v-for="account in accounts" :key="account.id" class="table-row">
                                <span class="account-hash">{{ account.id?.substring(0, 16) }}...</span>
                                <span class="admin-status">
                                    <span v-if="account.isAdmin" class="admin-badge">Admin</span>
                                    <span v-else class="user-badge">User</span>
                                </span>
                                <span class="pin-status">
                                    <span v-if="account.pinEnabled" class="enabled-badge">Yes</span>
                                    <span v-else class="disabled-badge">No</span>
                                </span>
                                <span class="created">{{ formatDate(account.createdAt) }}</span>
                                <span class="updated">{{ account.updatedAt ? formatDate(account.updatedAt) : 'Never' }}</span>
                                <span class="last-accessed">{{ account.lastAccessed ? formatDate(account.lastAccessed) : 'Never' }}</span>
                            </div>

                            <!-- Load More Button -->
                            <div v-if="hasMoreAccounts" class="load-more-container">
                                <button 
                                    class="btn-secondary load-more-btn" 
                                    :disabled="loadingMoreAccounts"
                                    @click="loadMoreAccounts"
                                >
                                    <svg
                                        v-if="loadingMoreAccounts"
                                        width="16"
                                        height="16"
                                        class="spinning"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                    >
                                        <path d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z" />
                                    </svg>
                                    <svg
                                        v-else
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                    >
                                        <path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
                                    </svg>
                                    {{ loadingMoreAccounts ? 'Loading...' : 'Load More' }}
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- Badge Approvals Panel -->
                    <div v-if="showBadgeApprovals" class="management-panel">
                        <div class="panel-header">
                            <h2>Badge Approvals</h2>
                            <button class="close-btn" @click="showBadgeApprovals = false">
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                >
                                    <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
                                </svg>
                            </button>
                        </div>

                        <div v-if="badgesLoading" class="panel-loading">
                            <div class="spinner" />
                            <p>Loading pending badges...</p>
                        </div>

                        <div v-else-if="badgesError" class="panel-error">
                            <p>{{ badgesError }}</p>
                            <button class="btn-secondary" @click="loadPendingBadges">
                                Retry
                            </button>
                        </div>

                        <div v-else class="badges-content">
                            <div v-if="pendingBadges.length === 0" class="no-badges">
                                <svg
                                    width="48"
                                    height="48"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                >
                                    <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M11,16.5L18,9.5L16.59,8.09L11,13.67L7.91,10.59L6.5,12L11,16.5Z" />
                                </svg>
                                <h3>No Pending Badges</h3>
                                <p>All badge submissions have been reviewed.</p>
                            </div>

                            <div v-else>
                                <div class="badges-header">
                                    <h3>Pending Submissions ({{ pendingBadges.length }})</h3>
                                    <button class="btn-secondary" @click="loadPendingBadges">
                                        <svg
                                            width="16"
                                            height="16"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                        >
                                            <path d="M17.65,6.35C16.2,4.9 14.21,4 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20C15.73,20 18.84,17.45 19.73,14H17.65C16.83,16.33 14.61,18 12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6C13.66,6 15.14,6.69 16.22,7.78L13,11H20V4L17.65,6.35Z" />
                                        </svg>
                                        Refresh
                                    </button>
                                </div>

                                <div class="badges-grid">
                                    <div v-for="badge in pendingBadges" :key="badge.submissionId" class="badge-card">
                                        <div class="badge-preview-container">
                                            <!-- eslint-disable-next-line vue/no-v-html -->
                                            <div class="badge-svg" v-html="badge.svg" />
                                        </div>
                                        <div class="badge-details">
                                            <h4>{{ badge.name }}</h4>
                                            <p v-if="badge.description" class="badge-description">{{ badge.description }}</p>
                                            <p class="badge-meta">Submitted {{ formatDate(badge.submittedAt) }}</p>
                                        </div>
                                        <div class="badge-actions">
                                            <button
                                                class="btn-approve"
                                                :disabled="processingBadgeId === badge.submissionId"
                                                @click="handleApproveBadge(badge.submissionId)"
                                            >
                                                <svg
                                                    v-if="processingBadgeId === badge.submissionId && actionType === 'approve'"
                                                    width="16"
                                                    height="16"
                                                    class="spinning"
                                                    viewBox="0 0 24 24"
                                                    fill="currentColor"
                                                >
                                                    <path d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z" />
                                                </svg>
                                                <svg
                                                    v-else
                                                    width="16"
                                                    height="16"
                                                    viewBox="0 0 24 24"
                                                    fill="currentColor"
                                                >
                                                    <path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" />
                                                </svg>
                                                {{ processingBadgeId === badge.submissionId && actionType === 'approve' ? 'Approving...' : 'Approve' }}
                                            </button>
                                            <button
                                                class="btn-deny"
                                                :disabled="processingBadgeId === badge.submissionId"
                                                @click="handleDenyBadge(badge.submissionId)"
                                            >
                                                <svg
                                                    v-if="processingBadgeId === badge.submissionId && actionType === 'deny'"
                                                    width="16"
                                                    height="16"
                                                    class="spinning"
                                                    viewBox="0 0 24 24"
                                                    fill="currentColor"
                                                >
                                                    <path d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z" />
                                                </svg>
                                                <svg
                                                    v-else
                                                    width="16"
                                                    height="16"
                                                    viewBox="0 0 24 24"
                                                    fill="currentColor"
                                                >
                                                    <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
                                                </svg>
                                                {{ processingBadgeId === badge.submissionId && actionType === 'deny' ? 'Denying...' : 'Deny' }}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Badge Board Placements Panel -->
                    <div v-if="showHomepagePlacements" class="management-panel">
                        <div class="panel-header">
                            <h2>Badge Board Placements</h2>
                            <button class="close-btn" @click="showHomepagePlacements = false">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
                                </svg>
                            </button>
                        </div>

                        <div v-if="placementsLoading" class="panel-loading">
                            <div class="spinner" />
                            <p>Loading pending placements…</p>
                        </div>

                        <div v-else-if="pendingPlacements.length === 0" class="no-badges">
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M11,16.5L18,9.5L16.59,8.09L11,13.67L7.91,10.59L6.5,12L11,16.5Z" />
                            </svg>
                            <h3>No Pending Placements</h3>
                            <p>All paid placements have been reviewed.</p>
                        </div>

                        <div v-else class="placements-list">
                            <p class="placements-sla-note">⚠️ 12-hour approval SLA — buyers are waiting.</p>
                            <div v-for="p in pendingPlacements" :key="p.id" class="placement-review-card">
                                <div class="placement-badge-preview">
                                    <!-- eslint-disable-next-line vue/no-v-html -->
                                    <div v-html="p.badgeSvg" />
                                </div>
                                <div class="placement-meta">
                                    <strong>{{ p.ownerName }}</strong>
                                    <span v-if="p.linkUrl" class="placement-link">{{ p.linkUrl }}</span>
                                    <span class="placement-info">
                                        Grid: col {{ p.gridX }}, row {{ p.gridY }} · {{ p.gridWidth }}×{{ p.gridHeight }} cells · {{ p.pixelCount.toLocaleString() }} pixels
                                    </span>
                                    <span class="placement-info">Paid: ${{ (p.amountPaidCents / 100).toFixed(2) }}</span>
                                    <span class="placement-info">Purchased: {{ p.purchasedAt ? formatDate(p.purchasedAt) : 'Unknown' }}</span>
                                </div>
                                <div class="badge-actions">
                                    <button
                                        class="btn-approve"
                                        :disabled="processingPlacementId === p.id"
                                        @click="handleApprovePlacement(p.id)"
                                    >
                                        {{ processingPlacementId === p.id ? '…' : 'Approve' }}
                                    </button>
                                    <button
                                        class="btn-deny"
                                        :disabled="processingPlacementId === p.id"
                                        @click="handleDenyPlacement(p.id)"
                                    >
                                        {{ processingPlacementId === p.id ? '…' : 'Deny + Refund' }}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Feedback Management Panel -->
                    <div v-if="showFeedbackManagement" class="management-panel">
                        <div class="panel-header">
                            <h2>Feedback Management</h2>
                            <button class="close-btn" @click="showFeedbackManagement = false">
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                >
                                    <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
                                </svg>
                            </button>
                        </div>

                        <div v-if="feedbackLoading" class="panel-loading">
                            <div class="spinner" />
                            <p>Loading feedback...</p>
                        </div>

                        <div v-else-if="feedbackError" class="panel-error">
                            <p>{{ feedbackError }}</p>
                            <button class="btn-secondary" @click="loadFeedback">
                                Retry
                            </button>
                        </div>

                        <div v-else class="feedback-content">
                            <div v-if="feedbackList.length === 0" class="no-feedback">
                                <div class="empty-state">
                                    <svg
                                        width="48"
                                        height="48"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                    >
                                        <path d="M9,22A1,1 0 0,1 8,21V18H4A2,2 0 0,1 2,16V4C2,2.89 2.9,2 4,2H20A2,2 0 0,1 22,4V16A2,2 0 0,1 20,18H13.9L10.2,21.71C10,21.9 9.75,22 9.5,22H9M10,16V19.08L13.08,16H20V4H4V16H10M6,7H18V9H6V7M6,11H15V13H6V11Z" />
                                    </svg>
                                    <h3>No Feedback Yet</h3>
                                    <p>No user feedback has been submitted.</p>
                                </div>
                            </div>

                            <div v-else>
                                <div class="feedback-header">
                                    <h3>User Feedback ({{ feedbackList.length }}{{ hasMoreFeedback ? '+' : '' }})</h3>
                                    <button class="btn-secondary" @click="loadFeedback(true)">
                                        <svg
                                            width="16"
                                            height="16"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                        >
                                            <path d="M17.65,6.35C16.2,4.9 14.21,4 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20C15.73,20 18.84,17.45 19.73,14H17.65C16.83,16.33 14.61,18 12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6C13.66,6 15.14,6.69 16.22,7.78L13,11H20V4L17.65,6.35Z" />
                                        </svg>
                                        Refresh
                                    </button>
                                </div>

                                <div class="feedback-table">
                                    <div class="table-header">
                                        <span>Message</span>
                                        <span>Submitted</span>
                                        <span>Actions</span>
                                    </div>

                                    <div v-for="feedback in feedbackList" :key="feedback.id" class="table-row">
                                        <span class="feedback-message">{{ feedback.message }}</span>
                                        <span class="feedback-date">{{ formatDate(feedback.createdAt) }}</span>
                                        <span class="feedback-actions">
                                            <button
                                                class="btn-delete"
                                                :disabled="deletingFeedbackId === String(feedback.id)"
                                                @click="handleDeleteFeedback(feedback.id)"
                                            >
                                                <svg
                                                    v-if="deletingFeedbackId === String(feedback.id)"
                                                    width="16"
                                                    height="16"
                                                    class="spinning"
                                                    viewBox="0 0 24 24"
                                                    fill="currentColor"
                                                >
                                                    <path d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z" />
                                                </svg>
                                                <svg
                                                    v-else
                                                    width="16"
                                                    height="16"
                                                    viewBox="0 0 24 24"
                                                    fill="currentColor"
                                                >
                                                    <path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
                                                </svg>
                                                {{ deletingFeedbackId === String(feedback.id) ? 'Deleting...' : 'Delete' }}
                                            </button>
                                        </span>
                                    </div>
                                </div>
                                
                                <!-- Load More Button -->
                                <div v-if="hasMoreFeedback" class="load-more-container">
                                    <button 
                                        class="btn-secondary load-more-btn" 
                                        :disabled="loadingMoreFeedback"
                                        @click="loadMoreFeedback"
                                    >
                                        <svg
                                            v-if="loadingMoreFeedback"
                                            width="16"
                                            height="16"
                                            class="spinning"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                        >
                                            <path d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z" />
                                        </svg>
                                        <svg
                                            v-else
                                            width="16"
                                            height="16"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                        >
                                            <path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
                                        </svg>
                                        {{ loadingMoreFeedback ? 'Loading...' : 'Load More' }}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>

        <!-- Notification Modal -->
        <ConfirmationModal
            :show="notificationModalVisible"
            :title="notificationTitle"
            :message="notificationMessage"
            :showCancel="false"
            confirmText="OK"
            @confirm="notificationModalVisible = false"
            @close="notificationModalVisible = false"
        />
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import ConfirmationModal from "~/components/ConfirmationModal.vue";
import NavBar from "~/components/NavBar.vue";
import MobileNavBar from "~/components/MobileNavBar.vue";
import { isMobileDevice } from '~/utils/deviceDetection';

// Auth check
const { isAuthenticated, isAdmin } = useAuth();
const { getAccounts, getFeedback, deleteFeedback } = useAdminService();
const { getPendingBadges, approveBadge, denyBadge } = useAdminBadgeService();
const { getErrorMessage } = useErrorHandler();

// Mobile detection based on user agent
const isMobile = computed(() => {
    if (import.meta.client) {
        return isMobileDevice();
    }
    return false;
});

// Reactive state
const isLoading = ref(true);
const accessDenied = computed(() => !isAuthenticated.value || !isAdmin.value);
const showAccountManagement = ref(false);
const showBadgeApprovals = ref(false);
const showFeedbackManagement = ref(false);
const showHomepagePlacements = ref(false);

// Account management state
const accounts = ref([]);
const accountStats = ref(null);
const accountsLoading = ref(false);
const accountsError = ref(null);
const accountsCursor = ref(null);
const hasMoreAccounts = ref(false);
const loadingMoreAccounts = ref(false);
const accountGrowthTrend = computed(() =>
{
    if (!accountStats.value) {
        return { label: "", className: "trend-neutral" };
    }

    const current = accountStats.value.newUsersLast7Days;
    const previous = accountStats.value.newUsersPrevious7Days;

    if (previous === 0) {
        if (current === 0) {
            return { label: "No change vs previous 7d", className: "trend-neutral" };
        }

        return { label: "↑ New signups vs none last week", className: "trend-up" };
    }

    const deltaPercent = Math.round(((current - previous) / previous) * 100);

    if (deltaPercent > 0) {
        return { label: `↑ ${deltaPercent}% vs previous 7d`, className: "trend-up" };
    }
    if (deltaPercent < 0) {
        return { label: `↓ ${Math.abs(deltaPercent)}% vs previous 7d`, className: "trend-down" };
    }

    return { label: "No change vs previous 7d", className: "trend-neutral" };
});

// Feedback management state
const feedbackList = ref([]);
const feedbackLoading = ref(false);
const feedbackError = ref(null);
const deletingFeedbackId = ref(null);
const feedbackCursor = ref(null);
const hasMoreFeedback = ref(false);
const loadingMoreFeedback = ref(false);

// Badge approvals state
const pendingBadges = ref([]);
const badgesLoading = ref(false);
const badgesError = ref(null);
const processingBadgeId = ref(null);
const actionType = ref(null);

// Homepage placement review state
const pendingPlacements = ref([]);
const placementsLoading = ref(false);
const processingPlacementId = ref(null);


// Notification state
const notificationModalVisible = ref(false);
const notificationTitle = ref("");
const notificationMessage = ref("");

// Check admin access on mount
onMounted(() =>
{
    isLoading.value = false;
});

// Account management methods
const loadAccounts = async (reset = true) =>
{
    try
    {
        if (reset) {
            accountsLoading.value = true;
            accountsError.value = null;
            accountsCursor.value = null;
        } else {
            loadingMoreAccounts.value = true;
        }

        const response = await getAccounts({
            cursor: reset ? undefined : accountsCursor.value,
            perPage: 50,
            includeStats: reset,
        });

        const incoming = response.data || [];
        if (response.stats) {
            accountStats.value = response.stats;
        }

        if (reset) {
            accounts.value = incoming;
        } else {
            // Prevent accidental duplicates (e.g. double-click, slow network, retry)
            const existingIds = new Set(accounts.value.map((a) => a.id));
            for (const acct of incoming) {
                if (!existingIds.has(acct.id)) {
                    accounts.value.push(acct);
                    existingIds.add(acct.id);
                }
            }
        }

        accountsCursor.value = response.next;
        hasMoreAccounts.value = !!response.next;
    }
    catch (error)
    {
        console.error("Failed to load accounts:", error);
        accountsError.value = getErrorMessage(error, "Failed to load accounts");
    }
    finally
    {
        accountsLoading.value = false;
        loadingMoreAccounts.value = false;
    }
};

const loadMoreAccounts = async () =>
{
    if (!hasMoreAccounts.value || loadingMoreAccounts.value) {
        return;
    }

    // Set this synchronously so rapid double-clicks can't enqueue duplicate requests.
    loadingMoreAccounts.value = true;
    await loadAccounts(false);
};

const closeAccountManagement = () =>
{
    showAccountManagement.value = false;
};

// Badge approval methods
const loadPendingBadges = async () =>
{
    try
    {
        badgesLoading.value = true;
        badgesError.value = null;
        pendingBadges.value = await getPendingBadges();
    }
    catch (error)
    {
        console.error("Failed to load pending badges:", error);
        badgesError.value = getErrorMessage(error, "Failed to load pending badges");
    }
    finally
    {
        badgesLoading.value = false;
    }
};

const handleApproveBadge = async (submissionId) =>
{
    try
    {
        processingBadgeId.value = submissionId;
        actionType.value = 'approve';
        await approveBadge({ submissionId });
        await loadPendingBadges(); // Refresh the list
        showNotification("Success", "Badge approved successfully!");
    }
    catch (error)
    {
        console.error("Failed to approve badge:", error);
        showNotification("Error", getErrorMessage(error, "Failed to approve badge"));
    }
    finally
    {
        processingBadgeId.value = null;
        actionType.value = null;
    }
};

const handleDenyBadge = async (submissionId) =>
{
    try
    {
        processingBadgeId.value = submissionId;
        actionType.value = 'deny';
        await denyBadge({ submissionId });
        await loadPendingBadges(); // Refresh the list
        showNotification("Success", "Badge denied successfully!");
    }
    catch (error)
    {
        console.error("Failed to deny badge:", error);
        showNotification("Error", getErrorMessage(error, "Failed to deny badge"));
    }
    finally
    {
        processingBadgeId.value = null;
        actionType.value = null;
    }
};

// Homepage placement review methods
const loadPendingPlacements = async () =>
{
    placementsLoading.value = true;
    try
    {
        const { $csrfFetch } = useNuxtApp();
        const data = await $csrfFetch('/api/admin/homepage/pending');
        pendingPlacements.value = data.placements;
    }
    catch (error)
    {
        console.error('Failed to load pending placements:', error);
        showNotification('Error', 'Failed to load pending placements');
    }
    finally
    {
        placementsLoading.value = false;
    }
};

const openHomepagePlacements = async () =>
{
    showHomepagePlacements.value = true;
    await loadPendingPlacements();
};

const handleApprovePlacement = async (placementId) =>
{
    processingPlacementId.value = placementId;
    try
    {
        const { $csrfFetch } = useNuxtApp();
        await $csrfFetch('/api/admin/homepage/approve', { method: 'POST', body: { placementId } });
        pendingPlacements.value = pendingPlacements.value.filter(p => p.id !== placementId);
        showNotification('Approved', 'Placement is now live on the Badge Board.');
    }
    catch (error)
    {
        showNotification('Error', getErrorMessage(error, 'Failed to approve placement'));
    }
    finally
    {
        processingPlacementId.value = null;
    }
};

const handleDenyPlacement = async (placementId) =>
{
    if (!confirm('Deny this placement? Remember to issue the Stripe refund manually.')) return;
    processingPlacementId.value = placementId;
    try
    {
        const { $csrfFetch } = useNuxtApp();
        await $csrfFetch('/api/admin/homepage/deny', { method: 'POST', body: { placementId } });
        pendingPlacements.value = pendingPlacements.value.filter(p => p.id !== placementId);
        showNotification('Denied', 'Placement denied. Issue refund via Stripe dashboard.');
    }
    catch (error)
    {
        showNotification('Error', getErrorMessage(error, 'Failed to deny placement'));
    }
    finally
    {
        processingPlacementId.value = null;
    }
};

// Feedback management methods
const loadFeedback = async (reset = true) =>
{
    try
    {
        if (reset) {
            feedbackLoading.value = true;
            feedbackError.value = null;
            feedbackCursor.value = null;
        } else {
            loadingMoreFeedback.value = true;
        }

        const response = await getFeedback({ 
            cursor: reset ? undefined : feedbackCursor.value,
            perPage: 50 
        });
        
        if (reset) {
            feedbackList.value = response.data || [];
        } else {
            feedbackList.value.push(...(response.data || []));
        }
        
        feedbackCursor.value = response.next;
        hasMoreFeedback.value = !!response.next;
    }
    catch (error)
    {
        console.error("Failed to load feedback:", error);
        feedbackError.value = getErrorMessage(error, "Failed to load feedback");
    }
    finally
    {
        feedbackLoading.value = false;
        loadingMoreFeedback.value = false;
    }
};

const loadMoreFeedback = async () =>
{
    if (hasMoreFeedback.value && !loadingMoreFeedback.value) {
        await loadFeedback(false);
    }
};

const handleDeleteFeedback = async (feedbackId) =>
{
    try
    {
        // Ensure the feedback ID is converted to string
        const feedbackIdStr = String(feedbackId);
        deletingFeedbackId.value = feedbackIdStr;
        await deleteFeedback(feedbackIdStr);
        await loadFeedback(true); // Refresh the list
        showNotification("Success", "Feedback deleted successfully!");
    }
    catch (error)
    {
        console.error("Failed to delete feedback:", error);
        showNotification("Error", getErrorMessage(error, "Failed to delete feedback"));
    }
    finally
    {
        deletingFeedbackId.value = null;
    }
};


// Utility methods
const showNotification = (title, message) =>
{
    notificationTitle.value = title;
    notificationMessage.value = message;
    notificationModalVisible.value = true;
};

const formatDate = (dateString) =>
{
    return new Date(dateString).toLocaleDateString();
};
const formatRatio = (value, total) =>
{
    if (!total) {
        return "0%";
    }

    return `${Math.round((value / total) * 100)}%`;
};

// Watch for account management panel to load accounts
watch(showAccountManagement, (newValue) =>
{
    if (newValue && accounts.value.length === 0)
    {
        loadAccounts(true);
    }
});

// Watch for badge approvals panel to load pending badges
watch(showBadgeApprovals, (newValue) =>
{
    if (newValue)
    {
        loadPendingBadges();
    }
});

// Watch for feedback management panel to load feedback
watch(showFeedbackManagement, (newValue) =>
{
    if (newValue)
    {
        loadFeedback(true);
    }
});


// Set page meta
definePageMeta({ name: "Admin Portal" });
</script>

<style scoped>
/* Particle Background */
.admin-portal {
  min-height: 100vh;
  background-color: #f8fafb;
  position: relative;
  overflow-x: hidden;
}

.particle-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.particle-1, .particle-2, .particle-3 {
  position: absolute;
  background: rgba(0, 0, 0, 0.08);
  border-radius: 50%;
  animation: float-up 15s infinite linear;
}

.particle-1 {
  width: 4px;
  height: 4px;
  animation-duration: 12s;
}

.particle-2 {
  width: 6px;
  height: 6px;
  animation-duration: 15s;
  background: rgba(0, 0, 0, 0.06);
}

.particle-3 {
  width: 8px;
  height: 8px;
  animation-duration: 18s;
  background: rgba(0, 0, 0, 0.04);
}

/* Generate random positions */
.particle-1:nth-child(1) { left: 10%; animation-delay: 0s; }
.particle-1:nth-child(4) { left: 20%; animation-delay: -2s; }
.particle-1:nth-child(7) { left: 30%; animation-delay: -4s; }
.particle-1:nth-child(10) { left: 40%; animation-delay: -6s; }
.particle-1:nth-child(13) { left: 50%; animation-delay: -8s; }
.particle-1:nth-child(16) { left: 60%; animation-delay: -10s; }
.particle-1:nth-child(19) { left: 70%; animation-delay: -12s; }
.particle-1:nth-child(22) { left: 80%; animation-delay: -14s; }
.particle-1:nth-child(25) { left: 90%; animation-delay: -16s; }
.particle-1:nth-child(28) { left: 5%; animation-delay: -18s; }
.particle-1:nth-child(31) { left: 15%; animation-delay: -20s; }
.particle-1:nth-child(34) { left: 25%; animation-delay: -22s; }
.particle-1:nth-child(37) { left: 35%; animation-delay: -24s; }
.particle-1:nth-child(40) { left: 45%; animation-delay: -26s; }
.particle-1:nth-child(43) { left: 55%; animation-delay: -28s; }
.particle-1:nth-child(46) { left: 65%; animation-delay: -30s; }
.particle-1:nth-child(49) { left: 75%; animation-delay: -32s; }
.particle-1:nth-child(52) { left: 85%; animation-delay: -34s; }
.particle-1:nth-child(55) { left: 95%; animation-delay: -36s; }
.particle-1:nth-child(58) { left: 12%; animation-delay: -38s; }

.particle-2:nth-child(2) { left: 15%; animation-delay: -1s; }
.particle-2:nth-child(5) { left: 25%; animation-delay: -3s; }
.particle-2:nth-child(8) { left: 35%; animation-delay: -5s; }
.particle-2:nth-child(11) { left: 45%; animation-delay: -7s; }
.particle-2:nth-child(14) { left: 55%; animation-delay: -9s; }
.particle-2:nth-child(17) { left: 65%; animation-delay: -11s; }
.particle-2:nth-child(20) { left: 75%; animation-delay: -13s; }
.particle-2:nth-child(23) { left: 85%; animation-delay: -15s; }
.particle-2:nth-child(26) { left: 95%; animation-delay: -17s; }
.particle-2:nth-child(29) { left: 8%; animation-delay: -19s; }
.particle-2:nth-child(32) { left: 18%; animation-delay: -21s; }
.particle-2:nth-child(35) { left: 28%; animation-delay: -23s; }
.particle-2:nth-child(38) { left: 38%; animation-delay: -25s; }
.particle-2:nth-child(41) { left: 48%; animation-delay: -27s; }
.particle-2:nth-child(44) { left: 58%; animation-delay: -29s; }
.particle-2:nth-child(47) { left: 68%; animation-delay: -31s; }
.particle-2:nth-child(50) { left: 78%; animation-delay: -33s; }
.particle-2:nth-child(53) { left: 88%; animation-delay: -35s; }
.particle-2:nth-child(56) { left: 98%; animation-delay: -37s; }
.particle-2:nth-child(59) { left: 22%; animation-delay: -39s; }

.particle-3:nth-child(3) { left: 12%; animation-delay: -1.5s; }
.particle-3:nth-child(6) { left: 22%; animation-delay: -3.5s; }
.particle-3:nth-child(9) { left: 32%; animation-delay: -5.5s; }
.particle-3:nth-child(12) { left: 42%; animation-delay: -7.5s; }
.particle-3:nth-child(15) { left: 52%; animation-delay: -9.5s; }
.particle-3:nth-child(18) { left: 62%; animation-delay: -11.5s; }
.particle-3:nth-child(21) { left: 72%; animation-delay: -13.5s; }
.particle-3:nth-child(24) { left: 82%; animation-delay: -15.5s; }
.particle-3:nth-child(27) { left: 92%; animation-delay: -17.5s; }
.particle-3:nth-child(30) { left: 2%; animation-delay: -19.5s; }
.particle-3:nth-child(33) { left: 17%; animation-delay: -21.5s; }
.particle-3:nth-child(36) { left: 27%; animation-delay: -23.5s; }
.particle-3:nth-child(39) { left: 37%; animation-delay: -25.5s; }
.particle-3:nth-child(42) { left: 47%; animation-delay: -27.5s; }
.particle-3:nth-child(45) { left: 57%; animation-delay: -29.5s; }
.particle-3:nth-child(48) { left: 67%; animation-delay: -31.5s; }
.particle-3:nth-child(51) { left: 77%; animation-delay: -33.5s; }
.particle-3:nth-child(54) { left: 87%; animation-delay: -35.5s; }
.particle-3:nth-child(57) { left: 97%; animation-delay: -37.5s; }
.particle-3:nth-child(60) { left: 7%; animation-delay: -39.5s; }

@keyframes float-up {
  0% {
    transform: translateY(100vh) rotate(0deg);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translateY(-100px) rotate(360deg);
    opacity: 0;
  }
}

.portal-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 8rem 2rem 4rem;
  min-height: 100vh;
  position: relative;
  z-index: 2;
}

/* Header Section */
.portal-header {
  margin-bottom: 3rem;
}

.header-content {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  position: relative;
  z-index: 3;
}

.header-icon {
  background: #000000;
  border-radius: 12px;
  padding: 1rem;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}

.header-text h1 {
  color: #1f2937;
  font-size: 2.5rem;
  font-weight: 800;
  margin: 0 0 0.5rem 0;
}

.header-text p {
  color: #4b5563;
  font-size: 1.1rem;
  margin: 0;
}

/* Loading and Error States */
.loading-state, .access-denied {
  text-align: center;
  padding: 4rem 2rem;
  color: #1f2937;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  margin: 2rem;
  position: relative;
  z-index: 3;
}

.access-denied .error-icon {
  color: #ef4444;
  margin-bottom: 1rem;
}

.access-denied h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.access-denied p {
  font-size: 1.1rem;
  margin-bottom: 2rem;
  opacity: 0.9;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top: 4px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Action Cards */
.action-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.action-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 1rem;
  position: relative;
  z-index: 3;
}

.action-card:hover {
  transform: translateY(-4px);
  background: rgba(255, 255, 255, 1);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
}

.card-icon {
  background: #000000;
  border-radius: 12px;
  padding: 1rem;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.card-content {
  flex: 1;
  color: #1f2937;
}

.card-content h3 {
  font-size: 1.3rem;
  font-weight: 700;
  margin: 0 0 0.5rem 0;
}

.card-content p {
  font-size: 0.95rem;
  opacity: 0.9;
  margin: 0;
}

.card-arrow {
  color: #6b7280;
  transition: transform 0.3s ease;
}

.action-card:hover .card-arrow {
  transform: translateX(4px);
}

/* Management Panels */
.management-panel {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  margin-bottom: 2rem;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.panel-header {
  background: #000000;
  color: white;
  padding: 1.5rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.panel-header h2 {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0;
}

.panel-title {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.panel-subtitle {
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
}

.close-btn {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 8px;
  transition: background 0.2s ease;
}

.close-btn:hover {
  background: rgba(255, 255, 255, 0.2);
}

.panel-loading, .panel-error {
  padding: 3rem 2rem;
  text-align: center;
  color: #374151;
}

.panel-error p {
  color: #dc2626;
  margin-bottom: 1rem;
}

/* Refund Processing Error Alert */
.refund-error-alert {
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 12px;
  padding: 1rem 1.5rem;
  margin: 0 2rem 1.5rem 2rem;
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  animation: slideDown 0.3s ease;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.refund-error-alert .error-icon {
  color: #dc2626;
  flex-shrink: 0;
  padding-top: 2px;
}

.refund-error-alert .error-content {
  flex: 1;
}

.refund-error-alert .error-content strong {
  display: block;
  color: #991b1b;
  margin-bottom: 0.25rem;
  font-size: 0.95rem;
}

.refund-error-alert .error-content p {
  color: #dc2626;
  margin: 0;
  font-size: 0.875rem;
  line-height: 1.5;
}

.refund-error-alert .close-error-btn {
  background: none;
  border: none;
  color: #dc2626;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 6px;
  transition: background 0.2s ease;
  flex-shrink: 0;
}

.refund-error-alert .close-error-btn:hover {
  background: rgba(220, 38, 38, 0.1);
}
.account-stats-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1rem;
  padding: 1.25rem 2rem 0;
}

.account-stat-card {
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.stat-label {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: #6b7280;
  font-weight: 700;
}

.stat-value {
  font-size: 1.5rem;
  line-height: 1.1;
  color: #111827;
}

.stat-meta,
.stat-trend {
  font-size: 0.8rem;
  color: #6b7280;
}

.trend-up {
  color: #059669;
}

.trend-down {
  color: #dc2626;
}

.trend-neutral {
  color: #6b7280;
}

/* Accounts Table */
.accounts-table {
  padding: 2rem;
}

.table-header {
  display: grid;
  grid-template-columns: 3fr 1fr 1fr 1.5fr 1.5fr 1.5fr;
  gap: 1rem;
  padding: 1rem 0;
  font-weight: 600;
  color: #374151;
  border-bottom: 2px solid #e5e7eb;
}

.table-row {
  display: grid;
  grid-template-columns: 3fr 1fr 1fr 1.5fr 1.5fr 1.5fr;
  gap: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid #f3f4f6;
  align-items: center;
}

.account-hash {
  font-family: monospace;
  font-weight: 600;
  color: #1f2937;
  font-size: 0.875rem;
}

.credits {
  font-weight: 600;
  color: #059669;
}

.refund-count {
  font-weight: 600;
  color: #dc2626;
}

.created, .updated, .last-accessed {
  color: #6b7280;
  font-size: 0.875rem;
}

.admin-badge {
  background: #fef3c7;
  color: #92400e;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
}

.user-badge {
  background: #dbeafe;
  color: #1e40af;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
}

.enabled-badge {
  background: #dcfce7;
  color: #166534;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
}

.disabled-badge {
  background: #fef2f2;
  color: #dc2626;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
}

/* Form Elements */
.refund-form {
  padding: 2rem;
  max-width: 500px;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.5rem;
}

.form-input {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.2s ease;
}

.form-input:focus {
  outline: none;
  border-color: #000000;
  box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.1);
}

/* Buttons */
.btn-primary, .btn-secondary, .btn-edit, .btn-save, .btn-cancel {
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
}

.btn-primary {
  background: #000000;
  color: white;
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
}

.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.btn-secondary {
  background: #f3f4f6;
  color: #374151;
  border: 1px solid #d1d5db;
}

.btn-secondary:hover {
  background: #e5e7eb;
}

.empty-state svg {
  color: #d1d5db;
  margin-bottom: 1rem;
}

.empty-state h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.5rem;
}

.empty-state p {
  font-size: 1rem;
  margin: 0;
}

.spinning {
  animation: spin 1s linear infinite;
}

/* Badge Approvals Styles */
.badges-content {
  padding: 2rem;
}

.no-badges {
  text-align: center;
  padding: 3rem 2rem;
  color: #6b7280;
}

.no-badges svg {
  color: #d1d5db;
  margin-bottom: 1rem;
}

.no-badges h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.5rem;
}

.no-badges p {
  font-size: 1rem;
  margin: 0;
}

.badges-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #e5e7eb;
}

.badges-header h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #374151;
  margin: 0;
}

.badges-header .btn-secondary {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
}

.badges-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.badge-card {
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 1.5rem;
  transition: all 0.2s ease;
}

.badge-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.badge-preview-container {
  background: #f9fafb;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 80px;
}

.badge-svg {
  max-width: 100%;
  height: auto;
}

.badge-details {
  margin-bottom: 1rem;
}

.badge-details h4 {
  font-size: 1rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 0.5rem 0;
}

.badge-description {
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0 0 0.5rem 0;
  line-height: 1.4;
}

.badge-meta {
  font-size: 0.75rem;
  color: #9ca3af;
  margin: 0;
}

.badge-actions {
  display: flex;
  gap: 0.5rem;
}

.btn-approve,
.btn-deny {
  flex: 1;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-size: 0.875rem;
}

.btn-approve {
  background: #10b981;
  color: white;
}

.btn-approve:hover:not(:disabled) {
  background: #059669;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
}

.btn-deny {
  background: #ef4444;
  color: white;
}

.btn-deny:hover:not(:disabled) {
  background: #dc2626;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
}

.btn-approve:disabled,
.btn-deny:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

/* Homepage placement review */
.placements-list { padding: 1.5rem; display: flex; flex-direction: column; gap: 1rem; }
.placements-sla-note { font-size: 0.875rem; font-weight: 600; color: #dc2626; margin: 0 0 0.5rem; }
.placement-review-card { border: 1px solid #e5e7eb; border-radius: 10px; padding: 1rem; display: flex; flex-direction: column; gap: 0.75rem; background: #fff; }
.placement-badge-preview { padding: 0.5rem; background: #f9fafb; border-radius: 6px; display: flex; align-items: center; }
.placement-badge-preview :deep(svg) { max-width: 100%; height: auto; display: block; }
.placement-meta { display: flex; flex-direction: column; gap: 0.2rem; }
.placement-meta strong { font-size: 0.9375rem; color: #000; }
.placement-link { font-size: 0.8125rem; color: #6b7280; word-break: break-all; }
.placement-info { font-size: 0.8125rem; color: #9ca3af; }
.pending-badge-count { margin-left: 0.5rem; background: #ef4444; color: #fff; font-size: 0.7rem; font-weight: 700; padding: 0.125rem 0.4rem; border-radius: 100px; }

/* Feedback Management Styles */
.feedback-content {
  padding: 2rem;
}

.no-feedback {
  text-align: center;
  padding: 3rem 2rem;
  color: #6b7280;
}

.no-feedback .empty-state svg {
  color: #d1d5db;
  margin-bottom: 1rem;
}

.no-feedback .empty-state h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.5rem;
}

.no-feedback .empty-state p {
  font-size: 1rem;
  margin: 0;
}

.feedback-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #e5e7eb;
}

.feedback-header h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #374151;
  margin: 0;
}

.feedback-header .btn-secondary {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
}

.feedback-table {
  width: 100%;
}

.feedback-table .table-header {
  display: grid;
  grid-template-columns: 3fr 1.5fr 1fr;
  gap: 1rem;
  padding: 1rem 0;
  font-weight: 600;
  color: #374151;
  border-bottom: 2px solid #e5e7eb;
}

.feedback-table .table-row {
  display: grid;
  grid-template-columns: 3fr 1.5fr 1fr;
  gap: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid #f3f4f6;
  align-items: center;
}

.feedback-message {
  color: #1f2937;
  font-size: 0.9rem;
  line-height: 1.4;
  max-width: 100%;
  overflow-wrap: break-word;
}

.feedback-date {
  color: #6b7280;
  font-size: 0.875rem;
  white-space: nowrap;
}

.feedback-actions {
  display: flex;
  justify-content: flex-end;
}

.btn-delete {
  background: #dc2626;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.75rem;
}

.btn-delete:hover:not(:disabled) {
  background: #b91c1c;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(220, 38, 38, 0.3);
}

.btn-delete:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

/* Load More Button */
.load-more-container {
  display: flex;
  justify-content: center;
  padding: 2rem 0 1rem;
  border-top: 1px solid #f3f4f6;
  margin-top: 1rem;
}

.load-more-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  font-size: 0.875rem;
}

.load-more-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

/* Button Styles */
.btn-primary {
  background: #000000;
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 12px;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
}

.btn-secondary {
  background: #f3f4f6;
  color: #374151;
  border: none;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
}

.btn-secondary:hover {
  background: #e5e7eb;
  transform: translateY(-1px);
}

/* Developer Awards Styles */
.awards-content {
  padding: 2rem;
}

.no-awards {
  text-align: center;
  padding: 3rem 2rem;
  color: #6b7280;
}

.awards-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #e5e7eb;
  flex-wrap: wrap;
  gap: 1rem;
}

.awards-header h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #374151;
  margin: 0;
}

.awards-filters {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.status-filter {
  padding: 0.5rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 0.875rem;
  background: white;
  cursor: pointer;
}

.awards-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.award-submission-card {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.2s ease;
}

.award-submission-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.submission-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  cursor: pointer;
}

.submission-info h4 {
  font-size: 1.125rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 0.25rem 0;
}

.applicant-name {
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0 0 0.5rem 0;
}

.status-badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: capitalize;
}

.status-pending {
  background: #fef3c7;
  color: #92400e;
}

.status-winner {
  background: #dcfce7;
  color: #166534;
}

.status-runner-up {
  background: #dbeafe;
  color: #1e40af;
}

.status-rejected {
  background: #fee2e2;
  color: #991b1b;
}

.expand-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 8px;
  transition: all 0.2s ease;
  color: #6b7280;
}

.expand-btn:hover {
  background: #f3f4f6;
  color: #374151;
}

.expand-btn svg {
  transition: transform 0.2s ease;
}

.submission-details {
  padding: 0 1.5rem 1.5rem;
  border-top: 1px solid #f3f4f6;
}

.detail-section {
  margin-top: 1.5rem;
}

.detail-section h5 {
  font-size: 0.875rem;
  font-weight: 700;
  color: #374151;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin: 0 0 0.75rem 0;
}

.detail-section p {
  font-size: 0.9375rem;
  line-height: 1.6;
  color: #1f2937;
  margin: 0.5rem 0;
}

.detail-section .long-text {
  white-space: pre-wrap;
  word-break: break-word;
}

.detail-section a {
  color: #2563eb;
  text-decoration: none;
  word-break: break-all;
}

.detail-section a:hover {
  text-decoration: underline;
}

.admin-notes-input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-family: inherit;
  font-size: 0.9375rem;
  resize: vertical;
}

.admin-notes-input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.submission-actions {
  display: flex;
  gap: 0.75rem;
  margin-top: 1.5rem;
  flex-wrap: wrap;
}

.btn-status {
  flex: 1;
  min-width: 140px;
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
  color: white;
}

.btn-status:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.btn-winner {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
}

.btn-winner:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
}

.btn-runner-up {
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
}

.btn-runner-up:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.btn-pending {
  background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
}

.btn-pending:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(245, 158, 11, 0.3);
}

.btn-reject {
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
}

.btn-reject:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
}

/* Responsive Design */
.portal-container.mobile-view {
  padding: 72px 1rem 80px; /* Account for mobile nav bars */
}

@media (max-width: 768px) {
  /* Ensure particles work well on mobile */
  .particle-container {
    overflow: hidden;
  }
  
  .portal-container {
    padding: 72px 1rem 80px;
  }

  .header-content {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
    padding: 1.5rem;
  }

  .header-text h1 {
    font-size: 2rem;
  }

  .action-cards {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .action-card {
    padding: 1.5rem;
  }

  .table-header, .table-row {
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }

  .table-header {
    display: none;
  }

  .table-row {
    background: #f9fafb;
    border-radius: 8px;
    padding: 1rem;
    margin-bottom: 1rem;
    border: none;
    display: block;
  }

  .table-row > span {
    display: block;
    margin-bottom: 0.5rem;
  }

  .table-row > span:before {
    content: attr(data-label);
    font-weight: 600;
    color: #6b7280;
    margin-right: 0.5rem;
  }

  /* Management panels on mobile */
  .management-panel {
    margin: 1rem;
    border-radius: 12px;
  }
  
  .panel-header {
    padding: 1rem 1.5rem;
  }
  
  .panel-header h2 {
    font-size: 1.25rem;
  }
  
  .account-stats-grid {
    grid-template-columns: 1fr;
    padding: 1rem 1.5rem 0;
  }
  .accounts-table, .refund-requests, .feedback-content {
    padding: 1.5rem;
  }

  /* Feedback table mobile responsive styles */
  .feedback-table .table-header {
    display: none;
  }

  .feedback-table .table-row {
    grid-template-columns: 1fr;
    background: #f9fafb;
    border-radius: 8px;
    padding: 1rem;
    margin-bottom: 1rem;
    border: none;
    display: block;
    gap: 0;
  }

  .feedback-table .table-row > span {
    display: block;
    margin-bottom: 0.75rem;
  }

  .feedback-message {
    background: #fff;
    padding: 0.75rem;
    border-radius: 6px;
    border: 1px solid #e5e7eb;
    font-size: 0.875rem;
  }

  .feedback-date {
    font-size: 0.75rem;
    color: #9ca3af;
    margin-bottom: 1rem;
  }

  .feedback-date::before {
    content: "Submitted: ";
    font-weight: 600;
    color: #6b7280;
  }

  .feedback-actions {
    justify-content: stretch;
  }

  .btn-delete {
    width: 100%;
    justify-content: center;
    padding: 0.75rem;
    font-size: 0.875rem;
  }
}
</style>