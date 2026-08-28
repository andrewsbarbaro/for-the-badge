<template>
    <div class="page">
        <!-- Desktop Navigation -->
        <NavBar v-if="!isMobile" />

        <!-- Mobile Navigation -->
        <MobileNavBar v-if="isMobile" />

        <div class="page-container">
            <div class="page-header">
                <h1>My Badges</h1>
                <p class="subtitle">Badges saved to your account</p>
            </div>

            <div class="page-content">
                <section class="section badges-section">
                    <!-- Loading -->
                    <div v-if="isLoading" class="loading-state">
                        <div class="spinner" />
                        <p>Loading your badges...</p>
                    </div>

                    <!-- Empty -->
                    <div v-else-if="badges.length === 0" class="empty-state">
                        <div class="empty-icon">
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                                <line x1="9" y1="9" x2="15" y2="9" />
                                <line x1="9" y1="15" x2="15" y2="15" />
                            </svg>
                        </div>
                        <h2>No badges yet</h2>
                        <p>Start by creating your first badge in the generator</p>
                        <NuxtLink to="/generator" class="btn-create">Create Badge</NuxtLink>
                    </div>

                    <!-- Badges Grid -->
                    <div v-else class="badges-grid">
                        <div v-for="badge in badges" :key="badge.id" class="badge-item">
                            <div class="badge-preview-wrapper">
                                <!-- eslint-disable-next-line vue/no-v-html -->
                                <div class="badge-preview" v-html="sanitizeSvg(badge.svg)" />
                            </div>
                            <div class="badge-info">
                                <div class="badge-header">
                                    <h3>{{ badge.name }}</h3>
                                    <span v-if="badge.submissionStatus" :class="['status-badge', `status-${badge.submissionStatus}`]">
                                        <svg v-if="badge.submissionStatus === 'pending'" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M16.2,16.2L11,13V7H12.5V12.2L17,14.7L16.2,16.2Z" /></svg>
                                        <svg v-if="badge.submissionStatus === 'approved'" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M11,16.5L18,9.5L16.59,8.09L11,13.67L7.91,10.59L6.5,12L11,16.5Z" /></svg>
                                        <svg v-if="badge.submissionStatus === 'denied'" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12,2C17.53,2 22,6.47 22,12C22,17.53 17.53,22 12,22C6.47,22 2,17.53 2,12C2,6.47 6.47,2 12,2M15.59,7L12,10.59L8.41,7L7,8.41L10.59,12L7,15.59L8.41,17L12,13.41L15.59,17L17,15.59L13.41,12L17,8.41L15.59,7Z" /></svg>
                                        <span v-if="badge.submissionStatus === 'pending'">Pending</span>
                                        <span v-if="badge.submissionStatus === 'approved'">Approved</span>
                                        <span v-if="badge.submissionStatus === 'denied'">Denied</span>
                                    </span>
                                </div>
                                <p v-if="badge.description" class="badge-description">{{ badge.description }}</p>
                                <p class="badge-date">{{ formatDate(badge.createdAt) }}</p>
                            </div>
                            <div class="badge-actions">
                                <button v-if="badge.submissionStatus === 'approved'" class="action-btn view-btn" title="View Badge" @click="viewApprovedBadge(badge)">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17M12,4.5C7,4.5 2.73,7.61 1,12C2.73,16.39 7,19.5 12,19.5C17,19.5 21.27,16.39 23,12C21.27,7.61 17,4.5 12,4.5Z" /></svg>
                                </button>
                                <button class="action-btn" title="Copy API URL" @click="copyURL(badge)">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M10.59,13.41C11,13.8 11,14.44 10.59,14.83C10.2,15.22 9.56,15.22 9.17,14.83C7.22,12.88 7.22,9.71 9.17,7.76L12.71,4.22C14.66,2.27 17.83,2.27 19.78,4.22C21.73,6.17 21.73,9.34 19.78,11.29L18.29,12.78C18.3,11.96 18.17,11.14 17.89,10.36L18.36,9.88C19.54,8.71 19.54,6.81 18.36,5.64C17.19,4.46 15.29,4.46 14.12,5.64L10.59,9.17C9.41,10.34 9.41,12.24 10.59,13.41M13.41,9.17C13.8,8.78 14.44,8.78 14.83,9.17C16.78,11.12 16.78,14.29 14.83,16.24L11.29,19.78C9.34,21.73 6.17,21.73 4.22,19.78C2.27,17.83 2.27,14.66 4.22,12.71L5.71,11.22C5.7,12.04 5.83,12.86 6.11,13.65L5.64,14.12C4.46,15.29 4.46,17.19 5.64,18.36C6.81,19.54 8.71,19.54 9.88,18.36L13.41,14.83C14.59,13.66 14.59,11.76 13.41,10.59C13,10.2 13,9.56 13.41,9.17Z" /></svg>
                                </button>
                                <button class="action-btn" title="Edit" @click="editBadge(badge)">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M3,17.25V21h3.75L17.81,9.94l-3.75-3.75L3,17.25Z" /><path d="M20.71,7.04c.39-.39.39-1.02,0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41,0l-1.83,1.83l3.75,3.75L20.71,7.04Z" /></svg>
                                </button>
                                <button class="action-btn" title="Download" @click="downloadBadge(badge)">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M5,20H19V18H5M19,9H15V3H9V9H5L12,16L19,9Z" /></svg>
                                </button>
                                <button class="action-btn" title="Copy Markdown" @click="copyMarkdown(badge)">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z" /></svg>
                                </button>
                                <button class="action-btn delete-btn" title="Delete" @click="deleteBadge(badge.id)">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" /></svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>

        <Footer />

        <!-- Confirmation Modal -->
        <ConfirmationModal
            :show="showDeleteModal"
            title="Delete Badge"
            :message="deleteModalMessage"
            confirmText="Delete"
            cancelText="Cancel"
            :showCancel="true"
            @confirm="confirmDelete"
            @cancel="showDeleteModal = false"
            @close="showDeleteModal = false"
        />

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
import { ref, onMounted, computed } from "vue";
import { isMobileDevice } from "~/utils/deviceDetection";

interface BadgeData {
    id: string;
    name: string;
    description?: string;
    [key: string]: any;
}

const badgeService = useBadgeService();
const badges = ref<BadgeData[]>([]);
const isLoading = ref(true);
const showDeleteModal = ref(false);
const badgeToDelete = ref<BadgeData | null>(null);
const toast = ref({ show: false, message: "", type: "success" as "success" | "error" | "info" | "warning" });

const isMobile = computed(() => import.meta.client ? isMobileDevice() : false);

const deleteModalMessage = computed(() => {
    if (badgeToDelete.value?.submissionStatus === "approved") {
        return "Are you sure you want to delete this badge? This will remove it from the community view and cannot be undone.";
    }
    return "Are you sure you want to delete this badge? This action cannot be undone.";
});

onMounted(async () => {
    try {
        const fetchedBadges = await badgeService.getBadges();
        badges.value = fetchedBadges;
    } catch (error) {
        console.error("Error fetching badges:", error);
    } finally {
        isLoading.value = false;
    }
});

function sanitizeSvg(svg: string): string { return svg; }

function formatDate(date: string | Date): string {
    const d = new Date(date);
    return d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
}

function downloadBadge(badge: BadgeData): void {
    const blob = new Blob([badge.svg], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${badge.name.toLowerCase().replace(/\s+/g, "-")}.svg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function copyMarkdown(badge: BadgeData): void {
    let md: string;
    if (badge.submissionStatus === "approved") {
        const url = `${window.location.origin}/api/badges/community/${badge.id}.svg`;
        md = `[![forthebadge](${url})](https://forthebadge.com)`;
    } else {
        const base64 = btoa(unescape(encodeURIComponent(badge.svg)));
        md = `[![forthebadge](data:image/svg+xml;base64,${base64})](https://forthebadge.com)`;
    }
    navigator.clipboard.writeText(md).then(() => {
        toast.value = { show: true, message: "Markdown copied to clipboard!", type: "success" };
    }).catch(() => {
        toast.value = { show: true, message: "Failed to copy markdown", type: "error" };
    });
}

function copyURL(badge: BadgeData): void {
    const parser = new DOMParser();
    const svgDoc = parser.parseFromString(badge.svg, "image/svg+xml");
    const textElements = svgDoc.querySelectorAll("text");

    if (textElements.length >= 2) {
        const primaryLabel = textElements[0].textContent || "";
        const secondaryLabel = textElements[1].textContent || "";
        const params = new URLSearchParams({ panels: textElements.length === 3 ? "3" : "2", primaryLabel, secondaryLabel });

        const svgContent = badge.svg;
        const metadataMatch = svgContent.match(/<!--(.+?)-->/);
        let iconMetadata: any = null;
        if (metadataMatch) { try { iconMetadata = JSON.parse(metadataMatch[1]); } catch (e) {} }

        if (textElements.length === 3 && textElements[2].textContent) params.append("tertiaryLabel", textElements[2].textContent);

        const rects = svgDoc.querySelectorAll("rect");
        const paths = svgDoc.querySelectorAll("path");
        if (rects.length >= 2) {
            params.append("primaryBGColor", rects[0].getAttribute("fill") || "");
            params.append("secondaryBGColor", rects[1].getAttribute("fill") || "");
            if (rects.length === 3) params.append("tertiaryBGColor", rects[2].getAttribute("fill") || "");
        } else if (paths.length >= 2) {
            params.append("primaryBGColor", paths[0].getAttribute("fill") || "");
            params.append("secondaryBGColor", paths[1].getAttribute("fill") || "");
            if (paths.length === 3) params.append("tertiaryBGColor", paths[2].getAttribute("fill") || "");
        }

        if (textElements.length >= 2) {
            params.append("primaryTextColor", textElements[0].getAttribute("fill") || "");
            params.append("primaryFontSize", textElements[0].getAttribute("font-size") || "");
            params.append("primaryFontWeight", textElements[0].getAttribute("font-weight") || "");
            params.append("primaryLetterSpacing", textElements[0].getAttribute("letter-spacing") || "");
            const primaryFontFamily = textElements[0].getAttribute("font-family")?.split(",")[0].trim() || "";
            if (primaryFontFamily) params.append("primaryFontFamily", primaryFontFamily);
            const primaryStyle = textElements[0].getAttribute("style") || "";
            const primaryTransformMatch = primaryStyle.match(/text-transform:\s*([^;]+)/);
            if (primaryTransformMatch) params.append("primaryTextTransform", primaryTransformMatch[1].trim());

            params.append("secondaryTextColor", textElements[1].getAttribute("fill") || "");
            params.append("secondaryFontSize", textElements[1].getAttribute("font-size") || "");
            params.append("secondaryFontWeight", textElements[1].getAttribute("font-weight") || "");
            params.append("secondaryLetterSpacing", textElements[1].getAttribute("letter-spacing") || "");
            const secondaryFontFamily = textElements[1].getAttribute("font-family")?.split(",")[0].trim() || "";
            if (secondaryFontFamily) params.append("secondaryFontFamily", secondaryFontFamily);
            const secondaryStyle = textElements[1].getAttribute("style") || "";
            const secondaryTransformMatch = secondaryStyle.match(/text-transform:\s*([^;]+)/);
            if (secondaryTransformMatch) params.append("secondaryTextTransform", secondaryTransformMatch[1].trim());

            if (textElements.length === 3) {
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

        if (textElements.length >= 1) {
            const primaryTextDec = textElements[0].getAttribute('text-decoration');
            if (primaryTextDec && primaryTextDec !== 'none') params.append('primaryTextDecoration', primaryTextDec);
            const primaryFontSt = textElements[0].getAttribute('font-style');
            if (primaryFontSt && primaryFontSt !== 'normal') params.append('primaryFontStyle', primaryFontSt);
        }
        if (textElements.length >= 2) {
            const secondaryTextDec = textElements[1].getAttribute('text-decoration');
            if (secondaryTextDec && secondaryTextDec !== 'none') params.append('secondaryTextDecoration', secondaryTextDec);
            const secondaryFontSt = textElements[1].getAttribute('font-style');
            if (secondaryFontSt && secondaryFontSt !== 'normal') params.append('secondaryFontStyle', secondaryFontSt);
        }
        if (textElements.length === 3) {
            const tertiaryTextDec = textElements[2].getAttribute('text-decoration');
            if (tertiaryTextDec && tertiaryTextDec !== 'none') params.append('tertiaryTextDecoration', tertiaryTextDec);
            const tertiaryFontSt = textElements[2].getAttribute('font-style');
            if (tertiaryFontSt && tertiaryFontSt !== 'normal') params.append('tertiaryFontStyle', tertiaryFontSt);
        }

        for (let i = 0; i < textElements.length; i++) {
            const prefix = i === 0 ? 'primary' : i === 1 ? 'secondary' : 'tertiary';
            const textEl = textElements[i];
            const filter = textEl.getAttribute('filter');
            if (filter && filter.includes('Shadow')) {
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
                        if (feGaussianBlur) { const blur = feGaussianBlur.getAttribute('stdDeviation'); if (blur && parseFloat(blur) !== 0) params.append(`${prefix}TextShadowBlur`, blur); }
                        if (feFlood) { const color = feFlood.getAttribute('flood-color'); if (color && color !== 'transparent') params.append(`${prefix}TextShadowColor`, color); }
                    }
                }
            }
            const transform = textEl.getAttribute('transform');
            if (transform && transform.includes('rotate')) {
                const rotateMatch = transform.match(/rotate\(([\d.-]+)/);
                if (rotateMatch) { const rotation = parseFloat(rotateMatch[1]); if (rotation !== 0) params.append(`${prefix}TextRotation`, rotation.toString()); }
            }
            const opacity = textEl.getAttribute('fill-opacity');
            if (opacity && parseFloat(opacity) !== 1) params.append(`${prefix}TextOpacity`, opacity);
            const fontVariant = textEl.getAttribute('font-variant');
            if (fontVariant && fontVariant !== 'normal') params.append(`${prefix}FontVariant`, fontVariant);
        }

        const svgElement = svgDoc.documentElement;
        const rectElements = svgDoc.querySelectorAll('rect');
        const pathElements = svgDoc.querySelectorAll('path');
        if (rectElements.length > 0) {
            const rx = rectElements[0].getAttribute('rx');
            if (rx && parseInt(rx) > 0) params.append('borderRadius', rx);
        } else if (pathElements.length > 0) {
            const firstPath = pathElements[0];
            const d = firstPath.getAttribute('d');
            if (d) { const match = d.match(/^M\s+([\d.]+)\s+0/); if (match && match[1]) { const borderRadius = parseFloat(match[1]); if (borderRadius > 0) params.append('borderRadius', borderRadius.toString()); } }
        }
        const viewBox = svgElement.getAttribute('viewBox');
        const width = svgElement.getAttribute('width');
        if (viewBox && width) {
            const vbWidth = parseFloat(viewBox.split(' ')[2]);
            const actualWidth = parseFloat(width);
            if (vbWidth > 0) { const scale = actualWidth / vbWidth; if (Math.abs(scale - 1) > 0.01) params.append('scale', scale.toFixed(2)); }
        }

        if (iconMetadata) {
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
        } else {
            const gElements = svgDoc.querySelectorAll('g[transform]');
            const iconGroups: any[] = [];
            gElements.forEach((g) => {
                const transform = g.getAttribute('transform') || '';
                const pathElement = g.querySelector('path');
                if (pathElement && transform.includes('scale')) {
                    const scaleMatch = transform.match(/scale\(([\d.]+)\)/);
                    const translateMatch = transform.match(/translate\(([\d.]+),\s*([\d.]+)\)/);
                    if (scaleMatch && translateMatch) {
                        const scale = parseFloat(scaleMatch[1]);
                        const x = parseFloat(translateMatch[1]);
                        const iconSize = Math.round(scale * 24);
                        const fill = pathElement.getAttribute('fill') || '';
                        iconGroups.push({ x, size: iconSize, color: fill });
                    }
                }
            });
            if (iconGroups.length > 0) {
                iconGroups.forEach((icon) => {
                    const { x, size, color } = icon;
                    const panelWidth = textElements.length === 3 ? svgDoc.documentElement.viewBox.baseVal.width / 3 : svgDoc.documentElement.viewBox.baseVal.width / 2;
                    if (x < panelWidth) {
                        params.append('primaryIconSize', size.toString());
                        params.append('primaryIconColor', color);
                        const textX = parseFloat(textElements[0].getAttribute('x') || '0');
                        params.append('primaryIconPosition', x < textX ? 'left' : 'right');
                    } else if (textElements.length === 2 || (textElements.length === 3 && x < panelWidth * 2)) {
                        params.append('secondaryIconSize', size.toString());
                        params.append('secondaryIconColor', color);
                        const textX = parseFloat(textElements[1].getAttribute('x') || '0');
                        params.append('secondaryIconPosition', x < textX ? 'left' : 'right');
                    } else if (textElements.length === 3) {
                        params.append('tertiaryIconSize', size.toString());
                        params.append('tertiaryIconColor', color);
                        const textX = parseFloat(textElements[2].getAttribute('x') || '0');
                        params.append('tertiaryIconPosition', x < textX ? 'left' : 'right');
                    }
                });
            }
        }

        const apiUrl = `${window.location.origin}/api/badges/generate?${params.toString()}`;
        navigator.clipboard.writeText(apiUrl).then(() => {
            toast.value = { show: true, message: "API URL copied to clipboard!", type: "success" };
        }).catch(() => {
            toast.value = { show: true, message: "Failed to copy API URL", type: "error" };
        });
    } else {
        toast.value = { show: true, message: "Failed to extract badge parameters", type: "error" };
    }
}

function viewApprovedBadge(badge: BadgeData): void { navigateTo(`/badges#community-${badge.id}`); }

function deleteBadge(badgeId: string): void {
    const badge = badges.value.find((b) => b.id === badgeId);
    if (badge) { badgeToDelete.value = badge; showDeleteModal.value = true; }
}

async function confirmDelete(): Promise<void> {
    if (!badgeToDelete.value) return;
    try {
        await badgeService.deleteBadge(badgeToDelete.value.id);
        badges.value = badges.value.filter((b) => b.id !== badgeToDelete.value?.id);
        toast.value = { show: true, message: "Badge deleted successfully", type: "success" };
    } catch (error) {
        console.error("Error deleting badge:", error);
        toast.value = { show: true, message: "Failed to delete badge. Please try again.", type: "error" };
    } finally {
        showDeleteModal.value = false;
        badgeToDelete.value = null;
    }
}

function editBadge(badge: BadgeData): void {
    const parser = new DOMParser();
    const svgDoc = parser.parseFromString(badge.svg, "image/svg+xml");
    const rects = svgDoc.querySelectorAll("rect");
    const texts = svgDoc.querySelectorAll("text");
    const params = new URLSearchParams();

    const svgContent = badge.svg;
    const metadataMatch = svgContent.match(/<!--(.+?)-->/);
    let iconMetadata: any = null;
    if (metadataMatch) { try { iconMetadata = JSON.parse(metadataMatch[1]); } catch (e) { console.warn("Failed to parse icon metadata:", e); } }

    let panelIndex = 0;
    rects.forEach((rect) => {
        const fill = rect.getAttribute("fill");
        if (fill && panelIndex < 3) {
            const panelName = panelIndex === 0 ? "primary" : panelIndex === 1 ? "secondary" : "tertiary";
            params.append(`${panelName}BGColor`, fill);
            panelIndex++;
        }
    });

    let textIndex = 0;
    texts.forEach((text) => {
        const panelName = textIndex === 0 ? "primary" : textIndex === 1 ? "secondary" : "tertiary";
        const fill = text.getAttribute("fill");
        const fontSize = text.getAttribute("font-size");
        const fontFamily = text.getAttribute("font-family")?.replace(", sans-serif", "") || "Roboto";
        const fontWeight = text.getAttribute("font-weight") || "600";
        const letterSpacing = text.getAttribute("letter-spacing") || "2";
        const textContent = text.textContent || "";
        if (fill) params.append(`${panelName}TextColor`, fill);
        if (fontSize) params.append(`${panelName}FontSize`, fontSize);
        if (fontFamily) params.append(`${panelName}FontFamily`, fontFamily);
        if (fontWeight) params.append(`${panelName}FontWeight`, fontWeight);
        if (letterSpacing) params.append(`${panelName}LetterSpacing`, letterSpacing);
        params.append(`${panelName}Label`, textContent);
        const style = text.getAttribute('style') || '';
        const textTransformMatch = style.match(/text-transform:\s*([^;]+)/);
        if (textTransformMatch) params.append(`${panelName}TextTransform`, textTransformMatch[1].trim());
        const textDec = text.getAttribute('text-decoration');
        if (textDec && textDec !== 'none') params.append(`${panelName}TextDecoration`, textDec);
        const fontSt = text.getAttribute('font-style');
        if (fontSt && fontSt !== 'normal') params.append(`${panelName}FontStyle`, fontSt);
        const filter = text.getAttribute('filter');
        if (filter && filter.includes('Shadow')) {
            const filterId = filter.match(/#(\w+Shadow)/)?.[1];
            if (filterId) {
                const filterDef = svgDoc.querySelector(`#${filterId}`);
                if (filterDef) {
                    const feOffset = filterDef.querySelector('feOffset');
                    const feGaussianBlur = filterDef.querySelector('feGaussianBlur');
                    const feFlood = filterDef.querySelector('feFlood');
                    if (feOffset) { const dx = feOffset.getAttribute('dx'); const dy = feOffset.getAttribute('dy'); if (dx && parseFloat(dx) !== 0) params.append(`${panelName}TextShadowOffsetX`, dx); if (dy && parseFloat(dy) !== 0) params.append(`${panelName}TextShadowOffsetY`, dy); }
                    if (feGaussianBlur) { const blur = feGaussianBlur.getAttribute('stdDeviation'); if (blur && parseFloat(blur) !== 0) params.append(`${panelName}TextShadowBlur`, blur); }
                    if (feFlood) { const color = feFlood.getAttribute('flood-color'); if (color && color !== 'transparent') params.append(`${panelName}TextShadowColor`, color); }
                }
            }
        }
        const transform = text.getAttribute('transform');
        if (transform && transform.includes('rotate')) {
            const rotateMatch = transform.match(/rotate\(([\d.-]+)/);
            if (rotateMatch) { const rotation = parseFloat(rotateMatch[1]); if (rotation !== 0) params.append(`${panelName}TextRotation`, rotation.toString()); }
        }
        const opacity = text.getAttribute('fill-opacity');
        if (opacity && parseFloat(opacity) !== 1) params.append(`${panelName}TextOpacity`, opacity);
        const fontVariant = text.getAttribute('font-variant');
        if (fontVariant && fontVariant !== 'normal') params.append(`${panelName}FontVariant`, fontVariant);
        textIndex++;
    });

    params.append("panels", Math.min(textIndex, 3).toString());

    const svgElement = svgDoc.documentElement;
    const pathElements = svgDoc.querySelectorAll('path');
    if (rects.length > 0 && rects[0].hasAttribute('rx')) {
        const rx = rects[0].getAttribute('rx');
        if (rx && parseInt(rx) > 0) params.append('borderRadius', rx);
    } else if (pathElements.length > 0) {
        const firstPath = pathElements[0];
        const d = firstPath.getAttribute('d');
        if (d) { const match = d.match(/^M\s+([\d.]+)\s+0/); if (match && match[1]) { const borderRadius = parseFloat(match[1]); if (borderRadius > 0) params.append('borderRadius', borderRadius.toString()); } }
    }
    const viewBox = svgElement.getAttribute('viewBox');
    const width = svgElement.getAttribute('width');
    if (viewBox && width) {
        const vbWidth = parseFloat(viewBox.split(' ')[2]);
        const actualWidth = parseFloat(width);
        if (vbWidth > 0) { const scale = actualWidth / vbWidth; if (Math.abs(scale - 1) > 0.01) params.append('scale', scale.toFixed(2)); }
    }

    if (iconMetadata) {
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

    navigateTo(`/generator?${params.toString()}`);
}

definePageMeta({ layout: false });
</script>

<style scoped>
.page { min-height: 100vh; background: #fff; display: flex; flex-direction: column; }
.page-container { flex: 1; max-width: 1100px; margin: 0 auto; padding: 6rem 2rem 4rem; width: 100%; box-sizing: border-box; }
.page-header { margin-bottom: 2.5rem; padding-bottom: 2rem; border-bottom: 2px solid #000; }
.page-header h1 { font-size: 2.5rem; font-weight: 800; color: #000; margin: 0 0 0.5rem; letter-spacing: -0.02em; }
.subtitle { font-size: 1rem; color: #666; margin: 0; }
.page-content { display: flex; flex-direction: column; gap: 2rem; }
.section { padding-bottom: 2rem; border-bottom: 1px solid #e8e8e8; }
.section:last-of-type { border-bottom: none; }

.badges-section { border-bottom: none; }

/* Loading */
.loading-state { display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 300px; gap: 1rem; }
.spinner { width: 32px; height: 32px; border: 2px solid #e5e5e5; border-top-color: #000; border-radius: 50%; animation: spin 0.8s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }
.loading-state p { font-size: 0.9375rem; color: #666; margin: 0; }

/* Empty */
.empty-state { display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 300px; gap: 1rem; text-align: center; }
.empty-icon { width: 80px; height: 80px; display: flex; align-items: center; justify-content: center; background: #f5f5f5; border-radius: 8px; color: #aaa; }
.empty-state h2 { font-size: 1.25rem; font-weight: 700; color: #000; margin: 0; }
.empty-state p { font-size: 0.9375rem; color: #666; margin: 0; }
.btn-create { margin-top: 0.5rem; padding: 0.625rem 1.5rem; background: #000; color: #fff; border-radius: 4px; font-weight: 700; font-size: 0.875rem; text-decoration: none; display: inline-block; }
.btn-create:hover { opacity: 0.85; }

/* Badges Grid */
.badges-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1.25rem; }

.badge-item { border: 1px solid #e8e8e8; border-radius: 6px; overflow: hidden; display: flex; flex-direction: column; background: #fff; transition: border-color 0.15s; }
.badge-item:hover { border-color: #000; }

.badge-preview-wrapper { background: #fafafa; padding: 1.5rem; display: flex; align-items: center; justify-content: center; min-height: 72px; border-bottom: 1px solid #e8e8e8; }
.badge-preview { max-width: 100%; height: auto; }
.badge-preview :deep(svg) { max-width: 100%; height: auto; }

.badge-info { padding: 1rem 1.125rem; flex: 1; }
.badge-header { display: flex; align-items: center; justify-content: space-between; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 0.375rem; }
.badge-info h3 { font-size: 0.9375rem; font-weight: 700; color: #000; margin: 0; word-break: break-word; }
.badge-description { font-size: 0.8125rem; color: #666; margin: 0 0 0.25rem; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.badge-date { font-size: 0.75rem; color: #999; margin: 0; }

.status-badge { display: inline-flex; align-items: center; gap: 0.25rem; padding: 0.25rem 0.5rem; border-radius: 3px; font-size: 0.6875rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em; white-space: nowrap; }
.status-pending { background: #fef3c7; color: #92400e; }
.status-approved { background: #d1fae5; color: #065f46; }
.status-denied { background: #fee2e2; color: #991b1b; }

.badge-actions { display: flex; gap: 0.375rem; padding: 0.75rem 1rem; border-top: 1px solid #e8e8e8; background: #fafafa; }
.action-btn { flex: 1; display: flex; align-items: center; justify-content: center; padding: 0.5rem; background: #fff; border: 1px solid #e8e8e8; border-radius: 4px; cursor: pointer; color: #000; transition: all 0.15s; }
.action-btn:hover { background: #000; color: #fff; border-color: #000; }
.delete-btn:hover { background: #dc2626; border-color: #dc2626; }
.view-btn:hover { background: #059669; border-color: #059669; }

@media (max-width: 768px) {
    .page-container { padding: 5rem 1.25rem 3rem; }
    .page-header h1 { font-size: 2rem; }
    .badges-grid { grid-template-columns: 1fr; }
}
</style>
