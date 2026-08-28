<template>
    <div class="badges-page">
        <!-- Desktop Navigation -->
        <NavBar v-if="!isMobile" />

        <!-- Mobile Navigation -->
        <MobileNavBar v-if="isMobile" />


        <div class="badges-container">
            <!-- Filter Buttons -->
            <div v-if="!isLoadingBadges && !badgesError" class="filter-buttons">
                <button
                    :class="['filter-btn', { active: showOfficial }]"
                    @click="showOfficial = !showOfficial"
                >
                    <div class="filter-icon official-icon">
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                        >
                            <path d="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z" />
                        </svg>
                    </div>
                    <div class="filter-text">
                        <span class="filter-label">Official</span>
                        <span class="filter-description">Curated collection</span>
                    </div>
                    <span class="badge-count">{{ allBadges.length }}</span>
                </button>
                <button
                    :class="['filter-btn', { active: showCommunity }]"
                    @click="showCommunity = !showCommunity"
                >
                    <div class="filter-icon community-icon">
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                        >
                            <path d="M12,5.5A3.5,3.5 0 0,1 15.5,9A3.5,3.5 0 0,1 12,12.5A3.5,3.5 0 0,1 8.5,9A3.5,3.5 0 0,1 12,5.5M5,8C5.56,8 6.08,8.15 6.53,8.42C6.38,9.85 6.8,11.27 7.66,12.38C7.16,13.34 6.16,14 5,14A3,3 0 0,1 2,11A3,3 0 0,1 5,8M19,8A3,3 0 0,1 22,11A3,3 0 0,1 19,14C17.84,14 16.84,13.34 16.34,12.38C17.2,11.27 17.62,9.85 17.47,8.42C17.92,8.15 18.44,8 19,8M5.5,18.25C5.5,16.18 8.41,14.5 12,14.5C15.59,14.5 18.5,16.18 18.5,18.25V20H5.5V18.25M0,20V18.5C0,17.11 1.89,15.94 4.45,15.6C3.86,16.28 3.5,17.22 3.5,18.25V20H0M24,20H20.5V18.25C20.5,17.22 20.14,16.28 19.55,15.6C22.11,15.94 24,17.11 24,18.5V20Z" />
                        </svg>
                    </div>
                    <div class="filter-text">
                        <span class="filter-label">Community</span>
                        <span class="filter-description">User submissions</span>
                    </div>
                    <span class="badge-count">{{ communityBadges.length }}</span>
                </button>
            </div>

            <div v-if="isLoadingBadges" class="loading-state">
                <div class="spinner" />
                <p>Loading badges...</p>
            </div>

            <div v-else-if="badgesError" class="error-state">
                <svg
                    width="64"
                    height="64"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                >
                    <path d="M13,14H11V10H13M13,18H11V16H13M1,21H23L12,2L1,21Z" />
                </svg>
                <h2>Error Loading Badges</h2>
                <p>{{ badgesError }}</p>
            </div>



            <div v-else>
                <!-- Community Loading State -->
                <div v-if="showCommunity && isLoadingCommunityBadges && !showOfficial" class="loading-state">
                    <div class="spinner" />
                    <p>Loading community badges...</p>
                </div>
                <div v-else-if="showCommunity && communityBadgesError && !showOfficial" class="error-state">
                    <p>{{ communityBadgesError }}</p>
                </div>
                <div v-else-if="showCommunity && !showOfficial && communityBadges.length === 0 && !isLoadingCommunityBadges" class="empty-community">
                    <p>No community badges yet. Be the first to create one!</p>
                </div>

                <!-- Unified Badges Grid -->
                <div class="badges-grid unified-grid">
                    <!-- Official Badges -->
                    <div
                        v-for="badge in sortedOfficialBadges"
                        v-show="showOfficial"
                        :key="'official-' + badge.path"
                        class="badge-card"
                    >
                        <div class="badge-type-indicator verified">
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                            >
                                <path d="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z" />
                            </svg>
                        </div>
                        <div class="badge-image">
                            <img :src="badge.path" :alt="badge.name">
                        </div>
                        <div class="badge-info">
                            <p class="badge-name">
                                {{ badge.name }}
                            </p>
                            <div class="badge-actions">
                                <button class="action-btn" title="Download SVG" @click="downloadBadge(badge)">
                                    <svg
                                        width="18"
                                        height="18"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                    >
                                        <path d="M5,20H19V18H5M19,9H15V3H9V9H5L12,16L19,9Z" />
                                    </svg>
                                </button>
                                <button class="action-btn" title="Copy Markdown" @click="copyBadgeMarkdown(badge)">
                                    <svg
                                        width="18"
                                        height="18"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                    >
                                        <path d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z" />
                                    </svg>
                                </button>
                                <button class="action-btn" title="Copy URL" @click="copyBadgeURL(badge)">
                                    <svg
                                        width="18"
                                        height="18"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                    >
                                        <path d="M10.59,13.41C11,13.8 11,14.44 10.59,14.83C10.2,15.22 9.56,15.22 9.17,14.83C7.22,12.88 7.22,9.71 9.17,7.76L12.71,4.22C14.66,2.27 17.83,2.27 19.78,4.22C21.73,6.17 21.73,9.34 19.78,11.29L18.29,12.78C18.3,11.96 18.17,11.14 17.89,10.36L18.36,9.88C19.54,8.71 19.54,6.81 18.36,5.64C17.19,4.46 15.29,4.46 14.12,5.64L10.59,9.17C9.41,10.34 9.41,12.24 10.59,13.41M13.41,9.17C13.8,8.78 14.44,8.78 14.83,9.17C16.78,11.12 16.78,14.29 14.83,16.24L11.29,19.78C9.34,21.73 6.17,21.73 4.22,19.78C2.27,17.83 2.27,14.66 4.22,12.71L5.71,11.22C5.7,12.04 5.83,12.86 6.11,13.65L5.64,14.12C4.46,15.29 4.46,17.19 5.64,18.36C6.81,19.54 8.71,19.54 9.88,18.36L13.41,14.83C14.59,13.66 14.59,11.76 13.41,10.59C13,10.2 13,9.56 13.41,9.17Z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- Community Badges -->
                    <div
                        v-for="badge in sortedCommunityBadges"
                        v-show="showCommunity && !isLoadingCommunityBadges"
                        :key="'community-' + badge.id"
                        :data-badge-id="'community-' + badge.id"
                        class="badge-card"
                    >
                        <div class="badge-type-indicator community">
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                            >
                                <path d="M12,5.5A3.5,3.5 0 0,1 15.5,9A3.5,3.5 0 0,1 12,12.5A3.5,3.5 0 0,1 8.5,9A3.5,3.5 0 0,1 12,5.5M5,8C5.56,8 6.08,8.15 6.53,8.42C6.38,9.85 6.8,11.27 7.66,12.38C7.16,13.34 6.16,14 5,14A3,3 0 0,1 2,11A3,3 0 0,1 5,8M19,8A3,3 0 0,1 22,11A3,3 0 0,1 19,14C17.84,14 16.84,13.34 16.34,12.38C17.2,11.27 17.62,9.85 17.47,8.42C17.92,8.15 18.44,8 19,8M5.5,18.25C5.5,16.18 8.41,14.5 12,14.5C15.59,14.5 18.5,16.18 18.5,18.25V20H5.5V18.25M0,20V18.5C0,17.11 1.89,15.94 4.45,15.6C3.86,16.28 3.5,17.22 3.5,18.25V20H0M24,20H20.5V18.25C20.5,17.22 20.14,16.28 19.55,15.6C22.11,15.94 24,17.11 24,18.5V20Z" />
                            </svg>
                        </div>
                        <div class="badge-image">
                            <!-- eslint-disable-next-line vue/no-v-html -->
                            <div class="badge-svg" v-html="badge.svg" />
                        </div>
                        <div class="badge-info">
                            <p class="badge-name">
                                {{ badge.name }}
                            </p>
                            <div class="badge-actions">
                                <button class="action-btn" title="Download SVG" @click="downloadCommunityBadge(badge)">
                                    <svg
                                        width="18"
                                        height="18"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                    >
                                        <path d="M5,20H19V18H5M19,9H15V3H9V9H5L12,16L19,9Z" />
                                    </svg>
                                </button>
                                <button class="action-btn" title="Copy Markdown" @click="copyCommunityBadgeMarkdown(badge)">
                                    <svg
                                        width="18"
                                        height="18"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                    >
                                        <path d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z" />
                                    </svg>
                                </button>
                                <button class="action-btn" title="Copy API URL" @click="copyCommunityBadgeAPIURL(badge)">
                                    <svg
                                        width="18"
                                        height="18"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                    >
                                        <path d="M10.59,13.41C11,13.8 11,14.44 10.59,14.83C10.2,15.22 9.56,15.22 9.17,14.83C7.22,12.88 7.22,9.71 9.17,7.76L12.71,4.22C14.66,2.27 17.83,2.27 19.78,4.22C21.73,6.17 21.73,9.34 19.78,11.29L18.29,12.78C18.3,11.96 18.17,11.14 17.89,10.36L18.36,9.88C19.54,8.71 19.54,6.81 18.36,5.64C17.19,4.46 15.29,4.46 14.12,5.64L10.59,9.17C9.41,10.34 9.41,12.24 10.59,13.41M13.41,9.17C13.8,8.78 14.44,8.78 14.83,9.17C16.78,11.12 16.78,14.29 14.83,16.24L11.29,19.78C9.34,21.73 6.17,21.73 4.22,19.78C2.27,17.83 2.27,14.66 4.22,12.71L5.71,11.22C5.7,12.04 5.83,12.86 6.11,13.65L5.64,14.12C4.46,15.29 4.46,17.19 5.64,18.36C6.81,19.54 8.71,19.54 9.88,18.36L13.41,14.83C14.59,13.66 14.59,11.76 13.41,10.59C13,10.2 13,9.56 13.41,9.17Z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <Footer />

        <!-- Toast Notification -->
        <Toast
            :show="toast.show"
            :message="toast.message"
            :type="toast.type"
            @close="toast.show = false"
        />
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";

import { isMobileDevice } from "~/utils/deviceDetection";

interface Badge {
    name: string;
    path: string;
    filename: string;
}

// Mobile detection based on user agent
const isMobile = computed(() =>
{
    if (import.meta.client)
    {
        return isMobileDevice();
    }

    return false;
});

// Dynamically loaded badges
const allBadges = ref<Badge[]>([]);
const communityBadges = ref<any[]>([]);
const isLoadingBadges = ref(true);
const isLoadingCommunityBadges = ref(true);
const badgesError = ref<string | null>(null);
const communityBadgesError = ref<string | null>(null);

// Filter states - both visible by default
const showOfficial = ref(true);
const showCommunity = ref(true);

const badgeService = useBadgeService();

// Load badges on mount
onMounted(async () =>
{
    try
    {
        const response = await $fetch("/api/badges/list");
        if (response.success && response.badges)
        {
            allBadges.value = response.badges;
        }
        else
        {
            badgesError.value = response.error || "Failed to load badges";
        }
    }
    catch (error)
    {
        console.error("Error fetching badges:", error);
        badgesError.value = "Failed to load badges";
    }
    finally
    {
        isLoadingBadges.value = false;
    }

    // Load community badges
    try
    {
        communityBadges.value = await badgeService.getCommunityBadges();
    }
    catch (error)
    {
        console.error("Error fetching community badges:", error);
        communityBadgesError.value = "Failed to load community badges";
    }
    finally
    {
        isLoadingCommunityBadges.value = false;
    }

    // Scroll to badge if hash is present
    if (import.meta.client && window.location.hash)
    {
        // Wait a bit for Vue to render the badges
        setTimeout(() =>
        {
            const badgeId = window.location.hash.substring(1); // Remove the #
            const element = document.querySelector(`[data-badge-id="${badgeId}"]`);
            if (element)
            {
                element.scrollIntoView({ behavior: "smooth", block: "center" });
                // Add a highlight effect
                element.classList.add("highlight-badge");
                setTimeout(() =>
                {
                    element.classList.remove("highlight-badge");
                }, 2000);
            }
        }, 500);
    }
});

const searchQuery = ref("");

const toast = ref({
    show: false,
    message: "",
    type: "success" as "success" | "error" | "info" | "warning",
});

const filteredBadges = computed(() =>
{
    if (!searchQuery.value.trim())
    {
        return allBadges.value;
    }

    const query = searchQuery.value.toLowerCase();

    return allBadges.value.filter((badge) => badge.name.toLowerCase().includes(query)
        || badge.filename.toLowerCase().includes(query)
    );
});

const filteredCommunityBadges = computed(() =>
{
    if (!searchQuery.value.trim())
    {
        return communityBadges.value;
    }

    const query = searchQuery.value.toLowerCase();

    return communityBadges.value.filter((badge) => badge.name.toLowerCase().includes(query)
        || (badge.description && badge.description.toLowerCase().includes(query))
    );
});

const sortedOfficialBadges = computed(() =>
{
    return [...filteredBadges.value].sort((a, b) => a.name.localeCompare(b.name));
});

const sortedCommunityBadges = computed(() =>
{
    return [...filteredCommunityBadges.value].sort((a, b) => a.name.localeCompare(b.name));
});

const totalResults = computed(() =>
{
    return filteredBadges.value.length + filteredCommunityBadges.value.length;
});

function downloadBadge(badge : Badge)
{
    const a = document.createElement("a");
    a.href = badge.path;
    a.download = badge.filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    toast.value = {
        show: true,
        message: "Badge downloaded!",
        type: "success",
    };
}

function copyBadgeMarkdown(badge : Badge)
{
    const md = `[![forthebadge](${badge.path})](https://forthebadge.com)`;
    navigator.clipboard.writeText(md).then(() =>
    {
        toast.value = {
            show: true,
            message: "Markdown copied to clipboard!",
            type: "success",
        };
    }).catch(() =>
    {
        toast.value = {
            show: true,
            message: "Failed to copy markdown",
            type: "error",
        };
    });
}

function copyBadgeURL(badge : Badge)
{
    const url = `${window.location.origin}${badge.path}`;
    navigator.clipboard.writeText(url).then(() =>
    {
        toast.value = {
            show: true,
            message: "URL copied to clipboard!",
            type: "success",
        };
    }).catch(() =>
    {
        toast.value = {
            show: true,
            message: "Failed to copy URL",
            type: "error",
        };
    });
}

function downloadCommunityBadge(badge : any)
{
    const blob = new Blob([badge.svg], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${badge.name.toLowerCase().replace(/\s+/g, "-")}.svg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast.value = {
        show: true,
        message: "Badge downloaded!",
        type: "success",
    };
}

function copyCommunityBadgeMarkdown(badge : any)
{
    // Use the hosted URL instead of base64 for markdown
    const url = `${window.location.origin}/api/badges/community/${badge.id}.svg`;
    const md = `[![forthebadge](${url})](https://forthebadge.com)`;
    navigator.clipboard.writeText(md).then(() =>
    {
        toast.value = {
            show: true,
            message: "Markdown copied to clipboard!",
            type: "success",
        };
    }).catch(() =>
    {
        toast.value = {
            show: true,
            message: "Failed to copy markdown",
            type: "error",
        };
    });
}

function copyCommunityBadgeAPIURL(badge : any)
{
    // Extract badge parameters from SVG to construct API URL
    const parser = new DOMParser();
    const svgDoc = parser.parseFromString(badge.svg, "image/svg+xml");
    const textElements = svgDoc.querySelectorAll("text");

    if (textElements.length >= 2)
    {
        const primaryLabel = textElements[0].textContent || "";
        const secondaryLabel = textElements[1].textContent || "";

        const params = new URLSearchParams({
            panels: textElements.length === 3 ? "3" : "2",
            primaryLabel,
            secondaryLabel,
        });
        
        // Extract icon metadata from SVG comment
        const svgContent = badge.svg;
        const metadataMatch = svgContent.match(/<!--(.+?)-->/);
        let iconMetadata : any = null;
        if (metadataMatch)
        {
            try
            {
                iconMetadata = JSON.parse(metadataMatch[1]);
            }
            catch (e)
            {
                // Metadata parsing failed - likely old badge or non-JSON comment
            }
        }

        // Add tertiary label if 3-panel badge
        if (textElements.length === 3 && textElements[2].textContent)
        {
            params.append("tertiaryLabel", textElements[2].textContent);
        }

        // Extract colors from rect or path elements
        // When borderRadius > 0, the generator uses path elements instead of rect
        const rects = svgDoc.querySelectorAll("rect");
        const paths = svgDoc.querySelectorAll("path");
        
        if (rects.length >= 2)
        {
            params.append("primaryBGColor", rects[0].getAttribute("fill") || "");
            params.append("secondaryBGColor", rects[1].getAttribute("fill") || "");
            if (rects.length === 3)
            {
                params.append("tertiaryBGColor", rects[2].getAttribute("fill") || "");
            }
        }
        else if (paths.length >= 2)
        {
            // Extract background colors from path elements (used when borderRadius > 0)
            params.append("primaryBGColor", paths[0].getAttribute("fill") || "");
            params.append("secondaryBGColor", paths[1].getAttribute("fill") || "");
            if (paths.length === 3)
            {
                params.append("tertiaryBGColor", paths[2].getAttribute("fill") || "");
            }
        }

        // Extract all text properties for each panel
        if (textElements.length >= 2)
        {
            // Primary text properties
            params.append("primaryTextColor", textElements[0].getAttribute("fill") || "");
            params.append("primaryFontSize", textElements[0].getAttribute("font-size") || "");
            params.append("primaryFontWeight", textElements[0].getAttribute("font-weight") || "");
            params.append("primaryLetterSpacing", textElements[0].getAttribute("letter-spacing") || "");
            const primaryFontFamily = textElements[0].getAttribute("font-family")?.split(",")[0].trim() || "";
            if (primaryFontFamily) params.append("primaryFontFamily", primaryFontFamily);
            
            // Extract text-transform from style attribute
            const primaryStyle = textElements[0].getAttribute("style") || "";
            const primaryTransformMatch = primaryStyle.match(/text-transform:\s*([^;]+)/);
            if (primaryTransformMatch) params.append("primaryTextTransform", primaryTransformMatch[1].trim());

            // Secondary text properties
            params.append("secondaryTextColor", textElements[1].getAttribute("fill") || "");
            params.append("secondaryFontSize", textElements[1].getAttribute("font-size") || "");
            params.append("secondaryFontWeight", textElements[1].getAttribute("font-weight") || "");
            params.append("secondaryLetterSpacing", textElements[1].getAttribute("letter-spacing") || "");
            const secondaryFontFamily = textElements[1].getAttribute("font-family")?.split(",")[0].trim() || "";
            if (secondaryFontFamily) params.append("secondaryFontFamily", secondaryFontFamily);
            
            const secondaryStyle = textElements[1].getAttribute("style") || "";
            const secondaryTransformMatch = secondaryStyle.match(/text-transform:\s*([^;]+)/);
            if (secondaryTransformMatch) params.append("secondaryTextTransform", secondaryTransformMatch[1].trim());

            // Tertiary text properties (if 3-panel)
            if (textElements.length === 3)
            {
                params.append("tertiaryTextColor", textElements[2].getAttribute("fill") || "");
                params.append("tertiaryFontSize", textElements[2].getAttribute("font-size") || "");
                params.append("tertiaryFontWeight", textElements[2].getAttribute("font-weight") || "");
                params.append("tertiaryLetterSpacing", textElements[2].getAttribute("letter-spacing") || "");
                const tertiaryFontFamily = textElements[2].getAttribute("font-family")?.split(",")[0].trim() || "";
                if (tertiaryFontFamily) params.append("tertiaryFontFamily", tertiaryFontFamily);
                
                const tertiaryStyle = textElements[2].getAttribute("style") || "";
                const tertiaryTransformMatch = tertiaryStyle.match(/text-transform:\s*([^;]+)/);
            if (tertiaryTransformMatch) params.append("tertiaryTextTransform", tertiaryTransformMatch[1].trim());
            }
        }
        
        // Extract text decorations if present
        if (textElements.length >= 1)
        {
            const primaryTextDec = textElements[0].getAttribute('text-decoration');
            if (primaryTextDec && primaryTextDec !== 'none') {
                params.append('primaryTextDecoration', primaryTextDec);
            }
            const primaryFontSt = textElements[0].getAttribute('font-style');
            if (primaryFontSt && primaryFontSt !== 'normal') {
                params.append('primaryFontStyle', primaryFontSt);
            }
        }
        
        if (textElements.length >= 2)
        {
            const secondaryTextDec = textElements[1].getAttribute('text-decoration');
            if (secondaryTextDec && secondaryTextDec !== 'none') {
                params.append('secondaryTextDecoration', secondaryTextDec);
            }
            const secondaryFontSt = textElements[1].getAttribute('font-style');
            if (secondaryFontSt && secondaryFontSt !== 'normal') {
                params.append('secondaryFontStyle', secondaryFontSt);
            }
        }
        
        if (textElements.length === 3)
        {
            const tertiaryTextDec = textElements[2].getAttribute('text-decoration');
            if (tertiaryTextDec && tertiaryTextDec !== 'none') {
                params.append('tertiaryTextDecoration', tertiaryTextDec);
            }
            const tertiaryFontSt = textElements[2].getAttribute('font-style');
            if (tertiaryFontSt && tertiaryFontSt !== 'normal') {
                params.append('tertiaryFontStyle', tertiaryFontSt);
            }
        }
        
        // Extract advanced text styling
        for (let i = 0; i < textElements.length; i++) {
            const prefix = i === 0 ? 'primary' : i === 1 ? 'secondary' : 'tertiary';
            const textEl = textElements[i];
            
            // Text shadow (from filter attribute)
            const filter = textEl.getAttribute('filter');
            if (filter && filter.includes('Shadow')) {
                // Extract filter definition from defs
                const filterId = filter.match(/#(\w+Shadow)/)?.[1];
                if (filterId) {
                    const filterDef = svgDoc.querySelector(`#${filterId}`);
                    if (filterDef) {
                        const feOffset = filterDef.querySelector('feOffset');
                        const feGaussianBlur = filterDef.querySelector('feGaussianBlur');
                        const feFlood = filterDef.querySelector('feFlood');
                        
                        if (feOffset) {
                            const dx = feOffset.getAttribute('dx');
                            const dy = feOffset.getAttribute('dy');
                            if (dx && parseFloat(dx) !== 0) params.append(`${prefix}TextShadowOffsetX`, dx);
                            if (dy && parseFloat(dy) !== 0) params.append(`${prefix}TextShadowOffsetY`, dy);
                        }
                        if (feGaussianBlur) {
                            const blur = feGaussianBlur.getAttribute('stdDeviation');
                            if (blur && parseFloat(blur) !== 0) params.append(`${prefix}TextShadowBlur`, blur);
                        }
                        if (feFlood) {
                            const color = feFlood.getAttribute('flood-color');
                            if (color && color !== 'transparent') params.append(`${prefix}TextShadowColor`, color);
                        }
                    }
                }
            }
            
            // Text rotation (from transform attribute)
            const transform = textEl.getAttribute('transform');
            if (transform && transform.includes('rotate')) {
                const rotateMatch = transform.match(/rotate\(([\d.-]+)/);
                if (rotateMatch) {
                    const rotation = parseFloat(rotateMatch[1]);
                    if (rotation !== 0) params.append(`${prefix}TextRotation`, rotation.toString());
                }
            }
            
            // Text opacity (from fill-opacity attribute)
            const opacity = textEl.getAttribute('fill-opacity');
            if (opacity && parseFloat(opacity) !== 1) {
                params.append(`${prefix}TextOpacity`, opacity);
            }
            
            // Font variant (small-caps)
            const fontVariant = textEl.getAttribute('font-variant');
            if (fontVariant && fontVariant !== 'normal') {
                params.append(`${prefix}FontVariant`, fontVariant);
            }
        }
        
        // Extract badge styling from SVG attributes
        const svgElement = svgDoc.documentElement;
        // Check for borderRadius - can be in rect rx attribute or path elements
        const rectElements = svgDoc.querySelectorAll('rect');
        const pathElements = svgDoc.querySelectorAll('path');
        
        if (rectElements.length > 0 && rectElements[0].hasAttribute('rx')) {
            const rx = rectElements[0].getAttribute('rx');
            if (rx && parseInt(rx) > 0) {
                params.append('borderRadius', rx);
            }
        } else if (pathElements.length > 0) {
            // When borderRadius > 0, the generator uses path elements instead of rect
            // Extract borderRadius from the path's d attribute (format: "M {borderRadius} 0 L...")
            const firstPath = pathElements[0];
            const d = firstPath.getAttribute('d');
            if (d) {
                const match = d.match(/^M\s+([\d.]+)\s+0/);
                if (match && match[1]) {
                    const borderRadius = parseFloat(match[1]);
                    if (borderRadius > 0) {
                        params.append('borderRadius', borderRadius.toString());
                    }
                }
            }
        }
        
        // Extract scale from viewBox vs width comparison
        const viewBox = svgElement.getAttribute('viewBox');
        const width = svgElement.getAttribute('width');
        if (viewBox && width) {
            const vbWidth = parseFloat(viewBox.split(' ')[2]);
            const actualWidth = parseFloat(width);
            if (vbWidth > 0) {
                const scale = actualWidth / vbWidth;
                if (Math.abs(scale - 1) > 0.01) {
                    params.append('scale', scale.toFixed(2));
                }
            }
        }
        
        // Add icon parameters from metadata (preferred source)
        if (iconMetadata)
        {
            if (iconMetadata.primaryIcon) params.append("primaryIcon", iconMetadata.primaryIcon);
            if (iconMetadata.primaryIconColor) params.append("primaryIconColor", iconMetadata.primaryIconColor);
            if (iconMetadata.primaryIconSize) params.append("primaryIconSize", iconMetadata.primaryIconSize.toString());
            if (iconMetadata.primaryIconPosition) params.append("primaryIconPosition", iconMetadata.primaryIconPosition);
            
            if (iconMetadata.secondaryIcon) params.append("secondaryIcon", iconMetadata.secondaryIcon);
            if (iconMetadata.secondaryIconColor) params.append("secondaryIconColor", iconMetadata.secondaryIconColor);
            if (iconMetadata.secondaryIconSize) params.append("secondaryIconSize", iconMetadata.secondaryIconSize.toString());
            if (iconMetadata.secondaryIconPosition) params.append("secondaryIconPosition", iconMetadata.secondaryIconPosition);
            
            if (iconMetadata.tertiaryIcon) params.append("tertiaryIcon", iconMetadata.tertiaryIcon);
            if (iconMetadata.tertiaryIconColor) params.append("tertiaryIconColor", iconMetadata.tertiaryIconColor);
            if (iconMetadata.tertiaryIconSize) params.append("tertiaryIconSize", iconMetadata.tertiaryIconSize.toString());
            if (iconMetadata.tertiaryIconPosition) params.append("tertiaryIconPosition", iconMetadata.tertiaryIconPosition);
        }
        else
        {
            // Fallback: Extract icon information from SVG if metadata is not available
            // (icons are in <g> elements with transform attribute)
            const gElements = svgDoc.querySelectorAll('g[transform]');
            const iconGroups: any[] = [];
            
            gElements.forEach((g) => {
                const transform = g.getAttribute('transform') || '';
                const pathElement = g.querySelector('path');
                
                if (pathElement && transform.includes('scale')) {
                    // Extract scale factor to determine icon size
                    const scaleMatch = transform.match(/scale\(([\d.]+)\)/);
                    const translateMatch = transform.match(/translate\(([\d.]+),\s*([\d.]+)\)/);
                    
                    if (scaleMatch && translateMatch) {
                        const scale = parseFloat(scaleMatch[1]);
                        const x = parseFloat(translateMatch[1]);
                        const iconSize = Math.round(scale * 24); // Icons use 24x24 viewBox
                        const fill = pathElement.getAttribute('fill') || '';
                        
                        iconGroups.push({ x, size: iconSize, color: fill });
                    }
                }
            });

            // Match icons to panels based on x position
            if (iconGroups.length > 0) {
                iconGroups.forEach((icon) => {
                    const { x, size, color } = icon;
                    
                    // Determine which panel this icon belongs to based on x position
                    const panelWidth = textElements.length === 3 ? svgDoc.documentElement.viewBox.baseVal.width / 3 : svgDoc.documentElement.viewBox.baseVal.width / 2;
                    
                    if (x < panelWidth) {
                        // Primary panel
                        params.append('primaryIconSize', size.toString());
                        params.append('primaryIconColor', color);
                        const textX = parseFloat(textElements[0].getAttribute('x') || '0');
                        params.append('primaryIconPosition', x < textX ? 'left' : 'right');
                    } else if (textElements.length === 2 || (textElements.length === 3 && x < panelWidth * 2)) {
                        // Secondary panel
                        params.append('secondaryIconSize', size.toString());
                        params.append('secondaryIconColor', color);
                        const textX = parseFloat(textElements[1].getAttribute('x') || '0');
                        params.append('secondaryIconPosition', x < textX ? 'left' : 'right');
                    } else if (textElements.length === 3) {
                        // Tertiary panel
                        params.append('tertiaryIconSize', size.toString());
                        params.append('tertiaryIconColor', color);
                        const textX = parseFloat(textElements[2].getAttribute('x') || '0');
                        params.append('tertiaryIconPosition', x < textX ? 'left' : 'right');
                    }
                });
            }
        }

        const apiUrl = `${window.location.origin}/api/badges/generate?${params.toString()}`;

        navigator.clipboard.writeText(apiUrl).then(() =>
        {
            toast.value = {
                show: true,
                message: "API URL copied to clipboard!",
                type: "success",
            };
        }).catch(() =>
        {
            toast.value = {
                show: true,
                message: "Failed to copy API URL",
                type: "error",
            };
        });
    }
    else
    {
        toast.value = {
            show: true,
            message: "Failed to extract badge parameters",
            type: "error",
        };
    }
}

definePageMeta({ layout: false });
</script>

<style scoped>
.badges-page {
    min-height: 100vh;
    background: #fff;
}

/* Minimal search bar — full width, no hero text */
.badges-search-bar {
    padding: 1.25rem 2rem;
    border-bottom: 1px solid #e8e8e8;
    background: #fff;
    display: flex;
    flex-direction: column;
    gap: 0.375rem;
}

/* Search Wrapper Styling */
.search-wrapper {
    position: relative;
    width: 100%;
    max-width: 600px;
    margin: 0;
    border: 2px solid #e5e5e5;
    border-radius: 12px;
    transition: border-color 0.2s;
}

.search-wrapper:focus-within {
    border-color: #000;
}

.search-icon {
    position: absolute;
    left: 1.5rem;
    top: 50%;
    transform: translateY(-50%);
    color: rgba(0, 0, 0, 0.4);
    z-index: 2;
}

.search-input {
    width: 100%;
    padding: 0 1.5rem 0 4rem;
    height: 44px;
    border: none;
    border-radius: 12px;
    font-size: 1rem;
    outline: none;
    background: #ffffff;
    color: #000000;
    box-sizing: border-box;
}

.search-input:focus {
    border-color: #000;
    outline: none;
}

.search-input::placeholder {
    color: rgba(0, 0, 0, 0.4);
}

.results-count {
    margin-top: 1rem;
    color: #6b7280;
    font-size: 1rem;
    text-align: center;
}

/* Badges Container */
.badges-container {
    max-width: 1600px;
    margin: 0 auto;
    padding: 4rem 2rem;
}

/* Filter Buttons */
.filter-buttons {
    display: flex;
    gap: 1rem;
    justify-content: center;
    margin-bottom: 3rem;
    flex-wrap: wrap;
}

.filter-btn {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem 1.5rem;
    border: 2px solid #e5e5e5;
    border-radius: 12px;
    background: #ffffff;
    color: #000000;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
}

.filter-icon {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    transition: all 0.2s ease;
}

.filter-icon.official-icon {
    background: #3b82f6;
    color: #ffffff;
}

.filter-icon.community-icon {
    background: #10b981;
    color: #ffffff;
}

.filter-text {
    display: flex;
    flex-direction: column;
    gap: 0.125rem;
    flex: 1;
    text-align: left;
}

.filter-label {
    font-size: 1rem;
    font-weight: 700;
    color: #000000;
    line-height: 1.2;
}

.filter-description {
    font-size: 0.75rem;
    font-weight: 500;
    color: #666666;
    line-height: 1.2;
}

.filter-btn:hover {
    border-color: #000000;
    color: #000000;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.filter-btn.active {
    background: #000000;
    border-color: #000000;
}

.filter-btn.active .filter-label,
.filter-btn.active .filter-description {
    color: #ffffff;
}

.filter-btn.active:hover {
    background: #333333;
    border-color: #333333;
}

.badge-count {
    background: rgba(255, 255, 255, 1);
    color: #000000;
    padding: 0.25rem 0.625rem;
    border-radius: 12px;
    font-size: 0.8125rem;
    font-weight: 700;
}

.filter-btn.active .badge-count {
    background: rgba(255, 255, 255, 1);
    color: #000000;
}

.loading-state,
.error-state,
.no-results {
    text-align: center;
    padding: 6rem 2rem;
    color: #666666;
}

.loading-state .spinner {
    width: 50px;
    height: 50px;
    border: 4px solid #e5e5e5;
    border-top-color: #000000;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin: 0 auto 2rem;
}

@keyframes spin {
    to { transform: rotate(360deg); }
}

.loading-state p {
    font-size: 1.125rem;
    color: #666666;
}

.error-state svg {
    color: #ef4444;
    margin-bottom: 2rem;
}

.error-state h2 {
    font-size: 2rem;
    color: #333333;
    margin-bottom: 0.5rem;
}

.error-state p {
    font-size: 1.125rem;
    color: #ef4444;
}

.no-results svg {
    margin-bottom: 2rem;
    opacity: 0.3;
}

.no-results h2 {
    font-size: 2rem;
    color: #333333;
    margin-bottom: 0.5rem;
}

.no-results p {
    font-size: 1.125rem;
}

/* Badge Type Info */
.badge-type-info {
    display: flex;
    gap: 1rem;
    justify-content: center;
    margin-bottom: 3rem;
    flex-wrap: wrap;
}

.info-card {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1rem 1.5rem;
    background: #ffffff;
    border: 2px solid #e5e5e5;
    border-radius: 12px;
    transition: all 0.2s ease;
}

.info-card:hover {
    border-color: #000000;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.info-icon {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
}

.info-text {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
}

.info-text strong {
    font-size: 0.9375rem;
    font-weight: 700;
    color: #000000;
}

.info-text span {
    font-size: 0.8125rem;
    color: #666666;
}

.badges-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
    gap: 2rem;
}

.badge-card {
    background: #ffffff;
    border-radius: 8px;
    padding: 2rem;
    border: 1px solid #e5e5e5;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.15s;
    position: relative;
}

.badge-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.08);
    border-color: #000000;
}

/* Badge Type Indicator */
.badge-type-indicator {
    position: absolute;
    bottom: 0.5rem;
    right: 0.5rem;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
    opacity: 0.3;
    transition: all 0.2s ease;
}

.badge-type-indicator svg {
    width: 12px;
    height: 12px;
}

.badge-type-indicator.verified {
    background: #3b82f6;
    color: #ffffff;
}

.badge-type-indicator.community {
    background: #10b981;
    color: #ffffff;
}

.badge-card:hover .badge-type-indicator {
    opacity: 0.6;
}

/* Highlight animation for scrolled-to badge */
.highlight-badge {
    animation: highlightPulse 2s ease-in-out;
}

@keyframes highlightPulse {
    0%, 100% {
        box-shadow: 0 12px 32px rgba(0, 0, 0, 0.08);
        transform: translateY(0);
    }
    50% {
        box-shadow: 0 16px 48px rgba(59, 130, 246, 0.3);
        transform: translateY(-2px);
    }
}

.badge-image {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 60px;
    margin-bottom: 1.5rem;
}

.badge-image img,
.badge-image .badge-svg {
    max-width: 100%;
    height: auto;
}

.badge-svg {
    display: flex;
    align-items: center;
    justify-content: center;
}

.badge-svg svg {
    max-width: 100%;
    height: auto;
}

.badge-info {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.badge-name {
    font-size: 0.875rem;
    color: #666666;
    text-align: center;
    min-height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.badge-actions {
    display: flex;
    gap: 0.5rem;
    justify-content: center;
}

.action-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border: 1.5px solid #e5e5e5;
    border-radius: 8px;
    background: transparent;
    cursor: pointer;
    transition: all 0.2s;
    color: #666666;
}

.action-btn:hover {
    background: #000000;
    border-color: #000000;
    color: #ffffff;
    transform: scale(1.05);
}

.action-btn:active {
    transform: scale(0.95);
}

@media (max-width: 768px) {
    .badges-page {
        padding-bottom: 5rem;
    }

    .badges-container {
        padding: 3rem 1rem 5rem;
    }

    .badges-grid {
        grid-template-columns: 1fr;
        gap: 1.5rem;
    }

    .badge-card {
        padding: 1.5rem;
    }

    .badge-image {
        min-height: 50px;
        margin-bottom: 1rem;
    }

    .badge-name {
        min-height: auto;
        font-size: 0.8125rem;
    }

    .action-btn {
        width: 36px;
        height: 36px;
    }
}
</style>