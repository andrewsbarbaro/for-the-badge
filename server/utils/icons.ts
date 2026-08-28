import * as simpleIcons from "simple-icons";
import type { IconData } from "~/shared/types/icon";

/**
 * Get icon data by slug from Simple Icons
 * @param slug - The icon slug (e.g., "react", "github", "typescript")
 * @returns Icon data including SVG path and default color, or null if not found
 */
export function getIcon(slug : string) : IconData | null
{
    try
    {
        // Simple Icons uses camelCase for slugs internally (e.g., "siReact")
        const iconKey = `si${slug.charAt(0).toUpperCase()}${slug.slice(1).toLowerCase()}` as keyof typeof simpleIcons;
        const icon = simpleIcons[iconKey];

        if (!icon)
        {
            return null;
        }

        return {
            slug: icon.slug,
            title: icon.title,
            hex: icon.hex,
            path: icon.path,
        };
    }
    catch (error)
    {
        console.error(`Error fetching icon "${slug}":`, error);
        return null;
    }
}

/**
 * Search for icons by query string
 * @param query - Search term
 * @param limit - Maximum number of results (default 50)
 * @returns Array of matching icon data
 */
export function searchIcons(query : string, limit : number = 50) : IconData[]
{
    if (!query || query.trim().length === 0)
    {
        return [];
    }

    const normalizedQuery = query.toLowerCase().trim();
    const results : IconData[] = [];

    // Iterate through all Simple Icons
    for (const key of Object.keys(simpleIcons))
    {
        if (!key.startsWith("si"))
        {
            continue;
        }

        const icon = simpleIcons[key as keyof typeof simpleIcons];
        
        if (typeof icon !== "object" || !("title" in icon) || !("slug" in icon))
        {
            continue;
        }

        // Match against title or slug
        if (
            icon.title.toLowerCase().includes(normalizedQuery)
            || icon.slug.toLowerCase().includes(normalizedQuery)
        )
        {
            results.push({
                slug: icon.slug,
                title: icon.title,
                hex: icon.hex,
                path: icon.path,
            });

            if (results.length >= limit)
            {
                break;
            }
        }
    }

    return results;
}

/**
 * Get list of popular/featured icons
 * @param count - Number of icons to return
 * @returns Array of popular icon data
 */
export function getPopularIcons(count : number = 20) : IconData[]
{
    // List of commonly used icons for badges
    const popularSlugs = [
        "react", "vue", "angular", "svelte",
        "typescript", "javascript", "python", "java", "rust", "go",
        "nodejs", "npm", "yarn", "pnpm",
        "github", "gitlab", "bitbucket",
        "docker", "kubernetes",
        "aws", "googlecloud", "azure",
        "webpack", "vite", "rollup",
        "jest", "vitest", "cypress",
        "eslint", "prettier",
        "mongodb", "postgresql", "redis",
    ];

    const icons : IconData[] = [];

    for (const slug of popularSlugs.slice(0, count))
    {
        const icon = getIcon(slug);
        if (icon)
        {
            icons.push(icon);
        }
    }

    return icons;
}

/**
 * Generate SVG element for icon to be embedded in badge
 * @param iconPath - SVG path data from Simple Icons
 * @param x - X position
 * @param y - Y position (centered vertically)
 * @param size - Icon size (default 16)
 * @param color - Icon fill color (default white)
 * @returns SVG group element as string
 */
export function isImageUrl(s: string): boolean
{
    return s.startsWith("http://") || s.startsWith("https://") || s.startsWith("data:");
}

export function generateIconSVG(
    iconPath : string,
    x : number,
    y : number,
    size : number = 16,
    color : string = "#FFFFFF"
) : string
{
    // Custom image URL (png, jpg, gif, svg, data URI)
    if (isImageUrl(iconPath))
    {
        const top = y - size / 2;
        return `<image href="${iconPath}" x="${x}" y="${top}" width="${size}" height="${size}" preserveAspectRatio="xMidYMid meet"/>`;
    }

    // Simple Icons SVG path — 24×24 viewBox scaled to desired size
    const scale = size / 24;
    const translateY = y - (size / 2);
    return `<g transform="translate(${x}, ${translateY}) scale(${scale})">
        <path d="${iconPath}" fill="${color}" />
    </g>`;
}
