import { defineEventHandler, createError, getQuery, setHeader } from "h3";
import { isImageUrl } from "../../utils/icons";

interface BadgeConfig {
    panels: number;
    primaryLabel: string;
    secondaryLabel: string;
    tertiaryLabel ?: string;
    primaryBGColor: string;
    primaryTextColor: string;
    secondaryBGColor: string;
    secondaryTextColor: string;
    tertiaryBGColor ?: string;
    tertiaryTextColor ?: string;
    primaryFontSize ?: number;
    secondaryFontSize ?: number;
    tertiaryFontSize ?: number;
    primaryFontWeight ?: number;
    secondaryFontWeight ?: number;
    tertiaryFontWeight ?: number;
    primaryLetterSpacing ?: number;
    secondaryLetterSpacing ?: number;
    tertiaryLetterSpacing ?: number;
    primaryFontFamily ?: string;
    secondaryFontFamily ?: string;
    tertiaryFontFamily ?: string;
    primaryTextTransform ?: string;
    secondaryTextTransform ?: string;
    tertiaryTextTransform ?: string;
    // Icon configuration
    primaryIcon ?: string;
    primaryIconColor ?: string;
    primaryIconSize ?: number;
    primaryIconPosition ?: "left" | "right";
    secondaryIcon ?: string;
    secondaryIconColor ?: string;
    secondaryIconSize ?: number;
    secondaryIconPosition ?: "left" | "right";
    tertiaryIcon ?: string;
    tertiaryIconColor ?: string;
    tertiaryIconSize ?: number;
    tertiaryIconPosition ?: "left" | "right";
    // Badge styling
    scale ?: number;
    borderRadius ?: number;
    // Text decorations
    primaryTextDecoration ?: string;
    primaryFontStyle ?: string;
    secondaryTextDecoration ?: string;
    secondaryFontStyle ?: string;
    tertiaryTextDecoration ?: string;
    tertiaryFontStyle ?: string;
    // Text styling advanced
    primaryTextShadowColor ?: string;
    primaryTextShadowOffsetX ?: number;
    primaryTextShadowOffsetY ?: number;
    primaryTextShadowBlur ?: number;
    primaryTextRotation ?: number;
    primaryTextOpacity ?: number;
    primaryFontVariant ?: string;
    secondaryTextShadowColor ?: string;
    secondaryTextShadowOffsetX ?: number;
    secondaryTextShadowOffsetY ?: number;
    secondaryTextShadowBlur ?: number;
    secondaryTextRotation ?: number;
    secondaryTextOpacity ?: number;
    secondaryFontVariant ?: string;
    tertiaryTextShadowColor ?: string;
    tertiaryTextShadowOffsetX ?: number;
    tertiaryTextShadowOffsetY ?: number;
    tertiaryTextShadowBlur ?: number;
    tertiaryTextRotation ?: number;
    tertiaryTextOpacity ?: number;
    tertiaryFontVariant ?: string;
}

// Default values for badge styling
const DEFAULTS = {
    primaryFontSize: 12,
    secondaryFontSize: 12,
    tertiaryFontSize: 12,
    primaryFontWeight: 600,
    secondaryFontWeight: 900,
    tertiaryFontWeight: 500,
    primaryLetterSpacing: 2,
    secondaryLetterSpacing: 2,
    tertiaryLetterSpacing: 2,
    primaryFontFamily: "Roboto",
    secondaryFontFamily: "Montserrat",
    tertiaryFontFamily: "Roboto",
    primaryTextTransform: "uppercase",
    secondaryTextTransform: "uppercase",
    tertiaryTextTransform: "uppercase",
    scale: 1,
    borderRadius: 0,
    primaryTextDecoration: "none",
    primaryFontStyle: "normal",
    secondaryTextDecoration: "none",
    secondaryFontStyle: "normal",
    tertiaryTextDecoration: "none",
    tertiaryFontStyle: "normal",
    primaryTextShadowColor: "transparent",
    primaryTextShadowOffsetX: 0,
    primaryTextShadowOffsetY: 0,
    primaryTextShadowBlur: 0,
    primaryTextRotation: 0,
    primaryTextOpacity: 1,
    primaryFontVariant: "normal",
    secondaryTextShadowColor: "transparent",
    secondaryTextShadowOffsetX: 0,
    secondaryTextShadowOffsetY: 0,
    secondaryTextShadowBlur: 0,
    secondaryTextRotation: 0,
    secondaryTextOpacity: 1,
    secondaryFontVariant: "normal",
    tertiaryTextShadowColor: "transparent",
    tertiaryTextShadowOffsetX: 0,
    tertiaryTextShadowOffsetY: 0,
    tertiaryTextShadowBlur: 0,
    tertiaryTextRotation: 0,
    tertiaryTextOpacity: 1,
    tertiaryFontVariant: "normal",
};

function getTransformedText(text : string, transform ?: string) : string
{
    const normalizedTransform = transform || "uppercase";
    switch (normalizedTransform)
    {
        case "uppercase":
            return text.toUpperCase();
        case "lowercase":
            return text.toLowerCase();
        case "capitalize":
            return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
        default:
            return text;
    }
}

function buildTextStyle(
    textTransform : string,
    textDecoration ?: string,
    fontStyle ?: string
) : string
{
    const styles : string[] = [];
    
    if (textTransform && textTransform !== "none")
    {
        styles.push(`text-transform: ${textTransform}`);
    }
    
    if (textDecoration && textDecoration !== "none")
    {
        styles.push(`text-decoration: ${textDecoration}`);
    }
    
    if (fontStyle && fontStyle !== "normal")
    {
        styles.push(`font-style: ${fontStyle}`);
    }
    
    return styles.length > 0 ? styles.join("; ") : "";
}

function buildTextShadowFilter(
    shadowColor : string,
    offsetX : number,
    offsetY : number,
    blur : number,
    filterId : string
) : string
{
    if (shadowColor === "transparent" || (offsetX === 0 && offsetY === 0 && blur === 0))
    {
        return "";
    }
    
    return `<filter id="${filterId}" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur in="SourceAlpha" stdDeviation="${blur}" />
        <feOffset dx="${offsetX}" dy="${offsetY}" result="offsetblur" />
        <feFlood flood-color="${shadowColor}" />
        <feComposite in2="offsetblur" operator="in" />
        <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
        </feMerge>
    </filter>`;
}

function buildTextAttributes(
    x : number,
    y : number,
    fontSize : number,
    fontFamily : string,
    fill : string,
    letterSpacing : number,
    fontWeight : number,
    textTransform : string,
    textDecoration : string,
    fontStyle : string,
    rotation : number,
    opacity : number,
    fontVariant : string,
    shadowFilterId : string
) : string
{
    const style = buildTextStyle(textTransform, textDecoration, fontStyle);
    const rotationTransform = rotation !== 0 ? ` transform="rotate(${rotation} ${x} ${y})"` : "";
    const filter = shadowFilterId ? ` filter="url(#${shadowFilterId})"` : "";
    const fontVariantAttr = fontVariant !== "normal" ? ` font-variant="${fontVariant}"` : "";
    
    return `x="${x}" y="${y}" dy="0.35em" font-size="${fontSize}" font-family="${fontFamily}, sans-serif" fill="${fill}" text-anchor="middle" letter-spacing="${letterSpacing}" font-weight="${fontWeight}" fill-opacity="${opacity}"${fontVariantAttr}${rotationTransform}${filter}${style ? ` style="${style}"` : ""}`;
}

function calculateTextWidth(
    text : string,
    fontSize : number,
    fontWeight : number = 600,
    letterSpacing : number = 2,
    fontFamily : string = "Roboto"
) : number
{
    // More accurate text width calculation based on font metrics
    // This approximates browser rendering with per-character width estimation
    
    // Base character width ratios (relative to font size)
    let charWidthRatio = 0.6; // Default ratio
    
    // Adjust for font weight
    if (fontWeight >= 900)
    {
        charWidthRatio = 0.68; // Extra bold
    }
    else if (fontWeight >= 700)
    {
        charWidthRatio = 0.64; // Bold
    }
    else if (fontWeight >= 600)
    {
        charWidthRatio = 0.62; // Semi-bold
    }
    
    // Adjust for font family (Montserrat is wider than Roboto)
    if (fontFamily === "Montserrat")
    {
        charWidthRatio *= 1.08;
    }
    
    // Account for variable character widths
    // Uppercase letters and some characters are wider
    let totalCharWidth = 0;
    for (let i = 0; i < text.length; i++)
    {
        const char = text[i];
        let charWidth = charWidthRatio;
        
        // Wide characters (W, M, etc.)
        if (/[WMwm]/.test(char))
        {
            charWidth *= 1.3;
        }
        // Narrow characters (I, l, i, etc.)
        else if (/[Iil1!|]/.test(char))
        {
            charWidth *= 0.5;
        }
        // Medium-wide characters
        else if (/[A-Z]/.test(char))
        {
            charWidth *= 1.0;
        }
        // Lowercase letters (generally narrower)
        else if (/[a-z]/.test(char))
        {
            charWidth *= 0.85;
        }
        // Space
        else if (char === " ")
        {
            charWidth *= 0.5;
        }
        
        totalCharWidth += charWidth * fontSize;
    }
    
    // Add letter spacing (SVG applies spacing after each character)
    const spacingWidth = text.length * (letterSpacing || 0);
    
    // Add a small buffer for rendering variations
    const buffer = fontSize * 0.1;
    
    return totalCharWidth + spacingWidth + buffer;
}

function generateSVG(config : BadgeConfig) : string
{
    const scale = config.scale || DEFAULTS.scale;
    const borderRadius = config.borderRadius || DEFAULTS.borderRadius;
    
    const primaryFontSize = config.primaryFontSize || DEFAULTS.primaryFontSize;
    const secondaryFontSize = config.secondaryFontSize || DEFAULTS.secondaryFontSize;
    const tertiaryFontSize = config.tertiaryFontSize || DEFAULTS.tertiaryFontSize;
    const primaryFontWeight = config.primaryFontWeight || DEFAULTS.primaryFontWeight;
    const secondaryFontWeight = config.secondaryFontWeight || DEFAULTS.secondaryFontWeight;
    const tertiaryFontWeight = config.tertiaryFontWeight || DEFAULTS.tertiaryFontWeight;
    const primaryLetterSpacing = config.primaryLetterSpacing || DEFAULTS.primaryLetterSpacing;
    const secondaryLetterSpacing = config.secondaryLetterSpacing || DEFAULTS.secondaryLetterSpacing;
    const tertiaryLetterSpacing = config.tertiaryLetterSpacing || DEFAULTS.tertiaryLetterSpacing;
    const primaryFontFamily = config.primaryFontFamily || DEFAULTS.primaryFontFamily;
    const secondaryFontFamily = config.secondaryFontFamily || DEFAULTS.secondaryFontFamily;
    const tertiaryFontFamily = config.tertiaryFontFamily || DEFAULTS.tertiaryFontFamily;
    
    // Text decorations
    const primaryTextDecoration = config.primaryTextDecoration || DEFAULTS.primaryTextDecoration;
    const primaryFontStyle = config.primaryFontStyle || DEFAULTS.primaryFontStyle;
    const secondaryTextDecoration = config.secondaryTextDecoration || DEFAULTS.secondaryTextDecoration;
    const secondaryFontStyle = config.secondaryFontStyle || DEFAULTS.secondaryFontStyle;
    const tertiaryTextDecoration = config.tertiaryTextDecoration || DEFAULTS.tertiaryTextDecoration;
    const tertiaryFontStyle = config.tertiaryFontStyle || DEFAULTS.tertiaryFontStyle;
    
    // Advanced text styling
    const primaryTextShadowColor = config.primaryTextShadowColor || DEFAULTS.primaryTextShadowColor;
    const primaryTextShadowOffsetX = config.primaryTextShadowOffsetX ?? DEFAULTS.primaryTextShadowOffsetX;
    const primaryTextShadowOffsetY = config.primaryTextShadowOffsetY ?? DEFAULTS.primaryTextShadowOffsetY;
    const primaryTextShadowBlur = config.primaryTextShadowBlur ?? DEFAULTS.primaryTextShadowBlur;
    const primaryTextRotation = config.primaryTextRotation ?? DEFAULTS.primaryTextRotation;
    const primaryTextOpacity = config.primaryTextOpacity ?? DEFAULTS.primaryTextOpacity;
    const primaryFontVariant = config.primaryFontVariant || DEFAULTS.primaryFontVariant;
    
    const secondaryTextShadowColor = config.secondaryTextShadowColor || DEFAULTS.secondaryTextShadowColor;
    const secondaryTextShadowOffsetX = config.secondaryTextShadowOffsetX ?? DEFAULTS.secondaryTextShadowOffsetX;
    const secondaryTextShadowOffsetY = config.secondaryTextShadowOffsetY ?? DEFAULTS.secondaryTextShadowOffsetY;
    const secondaryTextShadowBlur = config.secondaryTextShadowBlur ?? DEFAULTS.secondaryTextShadowBlur;
    const secondaryTextRotation = config.secondaryTextRotation ?? DEFAULTS.secondaryTextRotation;
    const secondaryTextOpacity = config.secondaryTextOpacity ?? DEFAULTS.secondaryTextOpacity;
    const secondaryFontVariant = config.secondaryFontVariant || DEFAULTS.secondaryFontVariant;
    
    const tertiaryTextShadowColor = config.tertiaryTextShadowColor || DEFAULTS.tertiaryTextShadowColor;
    const tertiaryTextShadowOffsetX = config.tertiaryTextShadowOffsetX ?? DEFAULTS.tertiaryTextShadowOffsetX;
    const tertiaryTextShadowOffsetY = config.tertiaryTextShadowOffsetY ?? DEFAULTS.tertiaryTextShadowOffsetY;
    const tertiaryTextShadowBlur = config.tertiaryTextShadowBlur ?? DEFAULTS.tertiaryTextShadowBlur;
    const tertiaryTextRotation = config.tertiaryTextRotation ?? DEFAULTS.tertiaryTextRotation;
    const tertiaryTextOpacity = config.tertiaryTextOpacity ?? DEFAULTS.tertiaryTextOpacity;
    const tertiaryFontVariant = config.tertiaryFontVariant || DEFAULTS.tertiaryFontVariant;

    // Icon configuration
    const primaryIconSize = config.primaryIconSize || 16;
    const secondaryIconSize = config.secondaryIconSize || 16;
    const tertiaryIconSize = config.tertiaryIconSize || 16;
    const primaryIconPosition = config.primaryIconPosition || "left";
    const secondaryIconPosition = config.secondaryIconPosition || "left";
    const tertiaryIconPosition = config.tertiaryIconPosition || "left";

    // Transform text first, then calculate width on the transformed text
    const transformedPrimaryText = getTransformedText(config.primaryLabel, config.primaryTextTransform);
    const transformedSecondaryText = getTransformedText(config.secondaryLabel, config.secondaryTextTransform);
    const transformedTertiaryText
    = config.panels === 3 ? getTransformedText(config.tertiaryLabel || "", config.tertiaryTextTransform) : "";

    // Calculate text widths, adding space for icons if present
    const primaryIconPadding = config.primaryIcon ? primaryIconSize + 8 : 0;
    const secondaryIconPadding = config.secondaryIcon ? secondaryIconSize + 8 : 0;
    const tertiaryIconPadding = config.tertiaryIcon ? tertiaryIconSize + 8 : 0;

    const primaryWidth
    = calculateTextWidth(transformedPrimaryText, primaryFontSize, primaryFontWeight, primaryLetterSpacing, primaryFontFamily) + 20 + primaryIconPadding;
    const secondaryWidth
    = calculateTextWidth(transformedSecondaryText, secondaryFontSize, secondaryFontWeight, secondaryLetterSpacing, secondaryFontFamily) + 20 + secondaryIconPadding;
    const tertiaryWidth
    = config.panels === 3
        ? calculateTextWidth(transformedTertiaryText, tertiaryFontSize, tertiaryFontWeight, tertiaryLetterSpacing, tertiaryFontFamily) + 20 + tertiaryIconPadding
        : 0;

    const totalWidth = primaryWidth + secondaryWidth + (config.panels === 3 ? tertiaryWidth : 0);
    const badgeHeight = 35;
    
    // Apply scale
    const scaledWidth = totalWidth * scale;
    const scaledHeight = badgeHeight * scale;

    // Build configuration metadata as JSON
    // Use the same fallback logic as rendering: iconColor || textColor
    const metadata = {
        panels: config.panels,
        primaryIcon: config.primaryIcon,
        primaryIconColor: config.primaryIcon ? (config.primaryIconColor || config.primaryTextColor) : undefined,
        primaryIconSize: config.primaryIcon ? (config.primaryIconSize || 16) : undefined,
        primaryIconPosition: config.primaryIcon ? (config.primaryIconPosition || "left") : undefined,
        secondaryIcon: config.secondaryIcon,
        secondaryIconColor: config.secondaryIcon ? (config.secondaryIconColor || config.secondaryTextColor) : undefined,
        secondaryIconSize: config.secondaryIcon ? (config.secondaryIconSize || 16) : undefined,
        secondaryIconPosition: config.secondaryIcon ? (config.secondaryIconPosition || "left") : undefined,
        tertiaryIcon: config.tertiaryIcon,
        tertiaryIconColor: config.tertiaryIcon ? (config.tertiaryIconColor || config.tertiaryTextColor) : undefined,
        tertiaryIconSize: config.tertiaryIcon ? (config.tertiaryIconSize || 16) : undefined,
        tertiaryIconPosition: config.tertiaryIcon ? (config.tertiaryIconPosition || "left") : undefined,
    };

    // Remove undefined values
    Object.keys(metadata).forEach(key => metadata[key as keyof typeof metadata] === undefined && delete metadata[key as keyof typeof metadata]);

    let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${scaledWidth}" height="${scaledHeight}" viewBox="0 0 ${totalWidth} ${badgeHeight}">`;
    
    // Add scale group if scale is not 1
    const needsScaleGroup = scale !== 1;
    
    // Add metadata as a comment for easy extraction
    if (Object.keys(metadata).length > 1) { // More than just 'panels'
        svg += `<!--${JSON.stringify(metadata)}-->`;
    }
    
    // Add SVG filters for text shadows
    const primaryShadowFilter = buildTextShadowFilter(primaryTextShadowColor, primaryTextShadowOffsetX, primaryTextShadowOffsetY, primaryTextShadowBlur, "primaryShadow");
    const secondaryShadowFilter = buildTextShadowFilter(secondaryTextShadowColor, secondaryTextShadowOffsetX, secondaryTextShadowOffsetY, secondaryTextShadowBlur, "secondaryShadow");
    const tertiaryShadowFilter = buildTextShadowFilter(tertiaryTextShadowColor, tertiaryTextShadowOffsetX, tertiaryTextShadowOffsetY, tertiaryTextShadowBlur, "tertiaryShadow");
    
    if (primaryShadowFilter || secondaryShadowFilter || tertiaryShadowFilter)
    {
        svg += "<defs>";
        if (primaryShadowFilter) svg += primaryShadowFilter;
        if (secondaryShadowFilter) svg += secondaryShadowFilter;
        if (tertiaryShadowFilter) svg += tertiaryShadowFilter;
        svg += "</defs>";
    }

    // Primary panel with left corners rounded
    if (borderRadius > 0)
    {
        svg += `<path d="M ${borderRadius} 0 L ${primaryWidth} 0 L ${primaryWidth} ${badgeHeight} L ${borderRadius} ${badgeHeight} Q 0 ${badgeHeight} 0 ${badgeHeight - borderRadius} L 0 ${borderRadius} Q 0 0 ${borderRadius} 0 Z" fill="${config.primaryBGColor}" />`;
    }
    else
    {
        svg += `<rect width="${primaryWidth}" height="${badgeHeight}" fill="${config.primaryBGColor}" />`;
    }

    // Secondary panel
    if (config.panels === 2)
    {
        // Right corners rounded when 2 panels
        if (borderRadius > 0)
        {
            svg += `<path d="M ${primaryWidth} 0 L ${primaryWidth + secondaryWidth - borderRadius} 0 Q ${primaryWidth + secondaryWidth} 0 ${primaryWidth + secondaryWidth} ${borderRadius} L ${primaryWidth + secondaryWidth} ${badgeHeight - borderRadius} Q ${primaryWidth + secondaryWidth} ${badgeHeight} ${primaryWidth + secondaryWidth - borderRadius} ${badgeHeight} L ${primaryWidth} ${badgeHeight} Z" fill="${config.secondaryBGColor}" />`;
        }
        else
        {
            svg += `<rect x="${primaryWidth}" width="${secondaryWidth}" height="${badgeHeight}" fill="${config.secondaryBGColor}" />`;
        }
    }
    else
    {
        // No rounding when 3 panels
        svg += `<rect x="${primaryWidth}" width="${secondaryWidth}" height="${badgeHeight}" fill="${config.secondaryBGColor}" />`;
    }

    // Tertiary panel (if applicable) with right corners rounded
    if (config.panels === 3)
    {
        if (borderRadius > 0)
        {
            svg += `<path d="M ${primaryWidth + secondaryWidth} 0 L ${primaryWidth + secondaryWidth + tertiaryWidth - borderRadius} 0 Q ${primaryWidth + secondaryWidth + tertiaryWidth} 0 ${primaryWidth + secondaryWidth + tertiaryWidth} ${borderRadius} L ${primaryWidth + secondaryWidth + tertiaryWidth} ${badgeHeight - borderRadius} Q ${primaryWidth + secondaryWidth + tertiaryWidth} ${badgeHeight} ${primaryWidth + secondaryWidth + tertiaryWidth - borderRadius} ${badgeHeight} L ${primaryWidth + secondaryWidth} ${badgeHeight} Z" fill="${config.tertiaryBGColor}" />`;
        }
        else
        {
            svg += `<rect x="${primaryWidth + secondaryWidth}" width="${tertiaryWidth}" height="${badgeHeight}" fill="${config.tertiaryBGColor}" />`;
        }
    }

    // Primary icon and text
    if (config.primaryIcon)
    {
        const iconData = isImageUrl(config.primaryIcon) ? null : getIcon(config.primaryIcon);
        const primaryIconSrc = iconData ? iconData.path : (isImageUrl(config.primaryIcon) ? config.primaryIcon : null);
        if (primaryIconSrc)
        {
            const iconColor = config.primaryIconColor || config.primaryTextColor;
            const textOffset = primaryIconPosition === "left" ? (primaryIconSize + 4) / 2 : -(primaryIconSize + 4) / 2;
            const textWidth = calculateTextWidth(transformedPrimaryText, primaryFontSize, primaryFontWeight, primaryLetterSpacing, primaryFontFamily);
            const baseIconX = primaryIconPosition === "left"
                ? (primaryWidth / 2) - (textWidth / 2) - primaryIconSize - 4
                : (primaryWidth / 2) + (textWidth / 2) + 4;
            // Add minimum 10px padding from panel edges
            const iconX = primaryIconPosition === "left"
                ? Math.max(10, baseIconX)
                : Math.min(primaryWidth - primaryIconSize - 10, baseIconX);

            svg += generateIconSVG(primaryIconSrc, iconX, 17.5, primaryIconSize, iconColor);
            const primaryShadowFilterId = primaryShadowFilter ? "primaryShadow" : "";
            const primaryAttrs = buildTextAttributes(
                (primaryWidth / 2) + textOffset, 17.5, primaryFontSize, primaryFontFamily,
                config.primaryTextColor, primaryLetterSpacing, primaryFontWeight,
                config.primaryTextTransform || DEFAULTS.primaryTextTransform,
                primaryTextDecoration, primaryFontStyle,
                primaryTextRotation, primaryTextOpacity, primaryFontVariant, primaryShadowFilterId
            );
            svg += `<text ${primaryAttrs}>${transformedPrimaryText}</text>`;
        }
        else
        {
            const primaryShadowFilterId = primaryShadowFilter ? "primaryShadow" : "";
            const primaryAttrs = buildTextAttributes(
                primaryWidth / 2, 17.5, primaryFontSize, primaryFontFamily,
                config.primaryTextColor, primaryLetterSpacing, primaryFontWeight,
                config.primaryTextTransform || DEFAULTS.primaryTextTransform,
                primaryTextDecoration, primaryFontStyle,
                primaryTextRotation, primaryTextOpacity, primaryFontVariant, primaryShadowFilterId
            );
            svg += `<text ${primaryAttrs}>${transformedPrimaryText}</text>`;
        }
    }
    else
    {
        const primaryShadowFilterId = primaryShadowFilter ? "primaryShadow" : "";
        const primaryAttrs = buildTextAttributes(
            primaryWidth / 2, 17.5, primaryFontSize, primaryFontFamily,
            config.primaryTextColor, primaryLetterSpacing, primaryFontWeight,
            config.primaryTextTransform || DEFAULTS.primaryTextTransform,
            primaryTextDecoration, primaryFontStyle,
            primaryTextRotation, primaryTextOpacity, primaryFontVariant, primaryShadowFilterId
        );
        svg += `<text ${primaryAttrs}>${transformedPrimaryText}</text>`;
    }

    // Secondary icon and text
    if (config.secondaryIcon)
    {
        const secondaryIconDataRaw = isImageUrl(config.secondaryIcon) ? null : getIcon(config.secondaryIcon);
        const secondaryIconSrc = secondaryIconDataRaw ? secondaryIconDataRaw.path : (isImageUrl(config.secondaryIcon) ? config.secondaryIcon : null);
        if (secondaryIconSrc)
        {
            const iconColor = config.secondaryIconColor || config.secondaryTextColor;
            const textOffset = secondaryIconPosition === "left" ? (secondaryIconSize + 4) / 2 : -(secondaryIconSize + 4) / 2;
            const textWidth = calculateTextWidth(transformedSecondaryText, secondaryFontSize, secondaryFontWeight, secondaryLetterSpacing, secondaryFontFamily);
            const baseIconX = secondaryIconPosition === "left"
                ? (secondaryWidth / 2) - (textWidth / 2) - secondaryIconSize - 4
                : (secondaryWidth / 2) + (textWidth / 2) + 4;
            // Add minimum 10px padding from panel edges
            const iconX = primaryWidth + (secondaryIconPosition === "left"
                ? Math.max(10, baseIconX)
                : Math.min(secondaryWidth - secondaryIconSize - 10, baseIconX));

            svg += generateIconSVG(secondaryIconSrc, iconX, 17.5, secondaryIconSize, iconColor);
            const secondaryShadowFilterId = secondaryShadowFilter ? "secondaryShadow" : "";
            const secondaryAttrs = buildTextAttributes(
                primaryWidth + (secondaryWidth / 2) + textOffset, 17.5, secondaryFontSize, secondaryFontFamily,
                config.secondaryTextColor, secondaryLetterSpacing, secondaryFontWeight,
                config.secondaryTextTransform || DEFAULTS.secondaryTextTransform,
                secondaryTextDecoration, secondaryFontStyle,
                secondaryTextRotation, secondaryTextOpacity, secondaryFontVariant, secondaryShadowFilterId
            );
            svg += `<text ${secondaryAttrs}>${transformedSecondaryText}</text>`;
        }
        else
        {
            const secondaryShadowFilterId = secondaryShadowFilter ? "secondaryShadow" : "";
            const secondaryAttrs = buildTextAttributes(
                primaryWidth + secondaryWidth / 2, 17.5, secondaryFontSize, secondaryFontFamily,
                config.secondaryTextColor, secondaryLetterSpacing, secondaryFontWeight,
                config.secondaryTextTransform || DEFAULTS.secondaryTextTransform,
                secondaryTextDecoration, secondaryFontStyle,
                secondaryTextRotation, secondaryTextOpacity, secondaryFontVariant, secondaryShadowFilterId
            );
            svg += `<text ${secondaryAttrs}>${transformedSecondaryText}</text>`;
        }
    }
    else
    {
        const secondaryShadowFilterId = secondaryShadowFilter ? "secondaryShadow" : "";
        const secondaryAttrs = buildTextAttributes(
            primaryWidth + secondaryWidth / 2, 17.5, secondaryFontSize, secondaryFontFamily,
            config.secondaryTextColor, secondaryLetterSpacing, secondaryFontWeight,
            config.secondaryTextTransform || DEFAULTS.secondaryTextTransform,
            secondaryTextDecoration, secondaryFontStyle,
            secondaryTextRotation, secondaryTextOpacity, secondaryFontVariant, secondaryShadowFilterId
        );
        svg += `<text ${secondaryAttrs}>${transformedSecondaryText}</text>`;
    }

    // Tertiary icon and text (if applicable)
    if (config.panels === 3)
    {
        if (config.tertiaryIcon)
        {
            const tertiaryIconDataRaw = isImageUrl(config.tertiaryIcon) ? null : getIcon(config.tertiaryIcon);
            const tertiaryIconSrc = tertiaryIconDataRaw ? tertiaryIconDataRaw.path : (isImageUrl(config.tertiaryIcon) ? config.tertiaryIcon : null);
            if (tertiaryIconSrc)
            {
                const iconColor = config.tertiaryIconColor || config.tertiaryTextColor;
                const textOffset = tertiaryIconPosition === "left" ? (tertiaryIconSize + 4) / 2 : -(tertiaryIconSize + 4) / 2;
                const textWidth = calculateTextWidth(transformedTertiaryText, tertiaryFontSize, tertiaryFontWeight, tertiaryLetterSpacing, tertiaryFontFamily);
                const baseIconX = tertiaryIconPosition === "left"
                    ? (tertiaryWidth / 2) - (textWidth / 2) - tertiaryIconSize - 4
                    : (tertiaryWidth / 2) + (textWidth / 2) + 4;
                // Add minimum 10px padding from panel edges
                const iconX = primaryWidth + secondaryWidth + (tertiaryIconPosition === "left"
                    ? Math.max(10, baseIconX)
                    : Math.min(tertiaryWidth - tertiaryIconSize - 10, baseIconX));

                svg += generateIconSVG(tertiaryIconSrc, iconX, 17.5, tertiaryIconSize, iconColor);
                const tertiaryShadowFilterId = tertiaryShadowFilter ? "tertiaryShadow" : "";
                const tertiaryAttrs = buildTextAttributes(
                    primaryWidth + secondaryWidth + (tertiaryWidth / 2) + textOffset, 17.5, tertiaryFontSize, tertiaryFontFamily,
                    config.tertiaryTextColor, tertiaryLetterSpacing, tertiaryFontWeight,
                    config.tertiaryTextTransform || DEFAULTS.tertiaryTextTransform,
                    tertiaryTextDecoration, tertiaryFontStyle,
                    tertiaryTextRotation, tertiaryTextOpacity, tertiaryFontVariant, tertiaryShadowFilterId
                );
                svg += `<text ${tertiaryAttrs}>${transformedTertiaryText}</text>`;
            }
            else
            {
                const tertiaryShadowFilterId = tertiaryShadowFilter ? "tertiaryShadow" : "";
                const tertiaryAttrs = buildTextAttributes(
                    primaryWidth + secondaryWidth + tertiaryWidth / 2, 17.5, tertiaryFontSize, tertiaryFontFamily,
                    config.tertiaryTextColor, tertiaryLetterSpacing, tertiaryFontWeight,
                    config.tertiaryTextTransform || DEFAULTS.tertiaryTextTransform,
                    tertiaryTextDecoration, tertiaryFontStyle,
                    tertiaryTextRotation, tertiaryTextOpacity, tertiaryFontVariant, tertiaryShadowFilterId
                );
                svg += `<text ${tertiaryAttrs}>${transformedTertiaryText}</text>`;
            }
        }
        else
        {
            const tertiaryShadowFilterId = tertiaryShadowFilter ? "tertiaryShadow" : "";
            const tertiaryAttrs = buildTextAttributes(
                primaryWidth + secondaryWidth + tertiaryWidth / 2, 17.5, tertiaryFontSize, tertiaryFontFamily,
                config.tertiaryTextColor, tertiaryLetterSpacing, tertiaryFontWeight,
                config.tertiaryTextTransform || DEFAULTS.tertiaryTextTransform,
                tertiaryTextDecoration, tertiaryFontStyle,
                tertiaryTextRotation, tertiaryTextOpacity, tertiaryFontVariant, tertiaryShadowFilterId
            );
            svg += `<text ${tertiaryAttrs}>${transformedTertiaryText}</text>`;
        }
    }

    svg += "</svg>";

    return svg;
}

export default defineEventHandler(async (event) =>
{
    try
    {
        const query = getQuery(event);

        // Parse and validate required parameters
        const panels = parseInt(query.panels as string, 10) || 2;
        const primaryLabel = (query.primaryLabel as string) || "";
        const secondaryLabel = (query.secondaryLabel as string) || "";
        const tertiaryLabel = (query.tertiaryLabel as string) || "";

        // Validate panels
        if (![2, 3].includes(panels))
        {
            throw createError({
                statusCode: 400,
                statusMessage: "Bad Request",
                data: {
                    type: "https://tools.ietf.org/html/rfc7231#section-6.5.1",
                    title: "Bad Request",
                    status: 400,
                    detail: "Panels must be either 2 or 3",
                },
            });
        }

        // Validate required labels
        if (!primaryLabel || !secondaryLabel)
        {
            throw createError({
                statusCode: 400,
                statusMessage: "Bad Request",
                data: {
                    type: "https://tools.ietf.org/html/rfc7231#section-6.5.1",
                    title: "Bad Request",
                    status: 400,
                    detail: "primaryLabel and secondaryLabel are required query parameters",
                },
            });
        }

        if (panels === 3 && !tertiaryLabel)
        {
            throw createError({
                statusCode: 400,
                statusMessage: "Bad Request",
                data: {
                    type: "https://tools.ietf.org/html/rfc7231#section-6.5.1",
                    title: "Bad Request",
                    status: 400,
                    detail: "tertiaryLabel is required when panels is 3",
                },
            });
        }

        // Build badge configuration
        const config : BadgeConfig = {
            panels,
            primaryLabel,
            secondaryLabel,
            tertiaryLabel: panels === 3 ? tertiaryLabel : undefined,
            primaryBGColor: (query.primaryBGColor as string) || "#31C4F3",
            primaryTextColor: (query.primaryTextColor as string) || "#FFFFFF",
            secondaryBGColor: (query.secondaryBGColor as string) || "#389AD5",
            secondaryTextColor: (query.secondaryTextColor as string) || "#FFFFFF",
            tertiaryBGColor: panels === 3 ? (query.tertiaryBGColor as string) || "#2674A4" : undefined,
            tertiaryTextColor: panels === 3 ? (query.tertiaryTextColor as string) || "#FFFFFF" : undefined,
            primaryFontSize: query.primaryFontSize ? parseInt(query.primaryFontSize as string, 10) : DEFAULTS.primaryFontSize,
            secondaryFontSize: query.secondaryFontSize ? parseInt(query.secondaryFontSize as string, 10) : DEFAULTS.secondaryFontSize,
            tertiaryFontSize: query.tertiaryFontSize ? parseInt(query.tertiaryFontSize as string, 10) : DEFAULTS.tertiaryFontSize,
            primaryFontWeight: query.primaryFontWeight ? parseInt(query.primaryFontWeight as string, 10) : DEFAULTS.primaryFontWeight,
            secondaryFontWeight: query.secondaryFontWeight ? parseInt(query.secondaryFontWeight as string, 10) : DEFAULTS.secondaryFontWeight,
            tertiaryFontWeight: query.tertiaryFontWeight ? parseInt(query.tertiaryFontWeight as string, 10) : DEFAULTS.tertiaryFontWeight,
            primaryLetterSpacing: query.primaryLetterSpacing ? parseInt(query.primaryLetterSpacing as string, 10) : DEFAULTS.primaryLetterSpacing,
            secondaryLetterSpacing: query.secondaryLetterSpacing ? parseInt(query.secondaryLetterSpacing as string, 10) : DEFAULTS.secondaryLetterSpacing,
            tertiaryLetterSpacing: query.tertiaryLetterSpacing ? parseInt(query.tertiaryLetterSpacing as string, 10) : DEFAULTS.tertiaryLetterSpacing,
            primaryFontFamily: (query.primaryFontFamily as string) || DEFAULTS.primaryFontFamily,
            secondaryFontFamily: (query.secondaryFontFamily as string) || DEFAULTS.secondaryFontFamily,
            tertiaryFontFamily: (query.tertiaryFontFamily as string) || DEFAULTS.tertiaryFontFamily,
            primaryTextTransform: (query.primaryTextTransform as string) || DEFAULTS.primaryTextTransform,
            secondaryTextTransform: (query.secondaryTextTransform as string) || DEFAULTS.secondaryTextTransform,
            tertiaryTextTransform: (query.tertiaryTextTransform as string) || DEFAULTS.tertiaryTextTransform,
            // Icon parameters
            primaryIcon: query.primaryIcon as string | undefined,
            primaryIconColor: query.primaryIconColor as string | undefined,
            primaryIconSize: query.primaryIconSize ? parseInt(query.primaryIconSize as string, 10) : undefined,
            primaryIconPosition: (query.primaryIconPosition as "left" | "right") || "left",
            secondaryIcon: query.secondaryIcon as string | undefined,
            secondaryIconColor: query.secondaryIconColor as string | undefined,
            secondaryIconSize: query.secondaryIconSize ? parseInt(query.secondaryIconSize as string, 10) : undefined,
            secondaryIconPosition: (query.secondaryIconPosition as "left" | "right") || "left",
            tertiaryIcon: query.tertiaryIcon as string | undefined,
            tertiaryIconColor: query.tertiaryIconColor as string | undefined,
            tertiaryIconSize: query.tertiaryIconSize ? parseInt(query.tertiaryIconSize as string, 10) : undefined,
            tertiaryIconPosition: (query.tertiaryIconPosition as "left" | "right") || "left",
            // Badge styling
            scale: query.scale ? parseFloat(query.scale as string) : DEFAULTS.scale,
            borderRadius: query.borderRadius ? parseInt(query.borderRadius as string, 10) : DEFAULTS.borderRadius,
            // Text decorations
            primaryTextDecoration: (query.primaryTextDecoration as string) || DEFAULTS.primaryTextDecoration,
            primaryFontStyle: (query.primaryFontStyle as string) || DEFAULTS.primaryFontStyle,
            secondaryTextDecoration: (query.secondaryTextDecoration as string) || DEFAULTS.secondaryTextDecoration,
            secondaryFontStyle: (query.secondaryFontStyle as string) || DEFAULTS.secondaryFontStyle,
            tertiaryTextDecoration: (query.tertiaryTextDecoration as string) || DEFAULTS.tertiaryTextDecoration,
            tertiaryFontStyle: (query.tertiaryFontStyle as string) || DEFAULTS.tertiaryFontStyle,
            // Advanced text styling
            primaryTextShadowColor: (query.primaryTextShadowColor as string) || DEFAULTS.primaryTextShadowColor,
            primaryTextShadowOffsetX: query.primaryTextShadowOffsetX ? parseFloat(query.primaryTextShadowOffsetX as string) : DEFAULTS.primaryTextShadowOffsetX,
            primaryTextShadowOffsetY: query.primaryTextShadowOffsetY ? parseFloat(query.primaryTextShadowOffsetY as string) : DEFAULTS.primaryTextShadowOffsetY,
            primaryTextShadowBlur: query.primaryTextShadowBlur ? parseFloat(query.primaryTextShadowBlur as string) : DEFAULTS.primaryTextShadowBlur,
            primaryTextRotation: query.primaryTextRotation ? parseFloat(query.primaryTextRotation as string) : DEFAULTS.primaryTextRotation,
            primaryTextOpacity: query.primaryTextOpacity ? parseFloat(query.primaryTextOpacity as string) : DEFAULTS.primaryTextOpacity,
            primaryFontVariant: (query.primaryFontVariant as string) || DEFAULTS.primaryFontVariant,
            secondaryTextShadowColor: (query.secondaryTextShadowColor as string) || DEFAULTS.secondaryTextShadowColor,
            secondaryTextShadowOffsetX: query.secondaryTextShadowOffsetX ? parseFloat(query.secondaryTextShadowOffsetX as string) : DEFAULTS.secondaryTextShadowOffsetX,
            secondaryTextShadowOffsetY: query.secondaryTextShadowOffsetY ? parseFloat(query.secondaryTextShadowOffsetY as string) : DEFAULTS.secondaryTextShadowOffsetY,
            secondaryTextShadowBlur: query.secondaryTextShadowBlur ? parseFloat(query.secondaryTextShadowBlur as string) : DEFAULTS.secondaryTextShadowBlur,
            secondaryTextRotation: query.secondaryTextRotation ? parseFloat(query.secondaryTextRotation as string) : DEFAULTS.secondaryTextRotation,
            secondaryTextOpacity: query.secondaryTextOpacity ? parseFloat(query.secondaryTextOpacity as string) : DEFAULTS.secondaryTextOpacity,
            secondaryFontVariant: (query.secondaryFontVariant as string) || DEFAULTS.secondaryFontVariant,
            tertiaryTextShadowColor: (query.tertiaryTextShadowColor as string) || DEFAULTS.tertiaryTextShadowColor,
            tertiaryTextShadowOffsetX: query.tertiaryTextShadowOffsetX ? parseFloat(query.tertiaryTextShadowOffsetX as string) : DEFAULTS.tertiaryTextShadowOffsetX,
            tertiaryTextShadowOffsetY: query.tertiaryTextShadowOffsetY ? parseFloat(query.tertiaryTextShadowOffsetY as string) : DEFAULTS.tertiaryTextShadowOffsetY,
            tertiaryTextShadowBlur: query.tertiaryTextShadowBlur ? parseFloat(query.tertiaryTextShadowBlur as string) : DEFAULTS.tertiaryTextShadowBlur,
            tertiaryTextRotation: query.tertiaryTextRotation ? parseFloat(query.tertiaryTextRotation as string) : DEFAULTS.tertiaryTextRotation,
            tertiaryTextOpacity: query.tertiaryTextOpacity ? parseFloat(query.tertiaryTextOpacity as string) : DEFAULTS.tertiaryTextOpacity,
            tertiaryFontVariant: (query.tertiaryFontVariant as string) || DEFAULTS.tertiaryFontVariant,
        };

        // Generate SVG
        const svg = generateSVG(config);

        // Set response headers for SVG
        setHeader(event, "Content-Type", "image/svg+xml; charset=utf-8");
        setHeader(event, "Cache-Control", "public, max-age=31536000, immutable");

        return svg;
    }
    catch (error)
    {
    // If it's already a createError, rethrow it
        if (error && typeof error === "object" && "statusCode" in error)
        {
            throw error;
        }

        console.error("Error generating badge:", error);
        throw createError({
            statusCode: 500,
            statusMessage: "Internal Server Error",
            data: {
                type: "https://tools.ietf.org/html/rfc7231#section-6.6.1",
                title: "Internal Server Error",
                status: 500,
                detail: "Failed to generate badge",
            },
        });
    }
});