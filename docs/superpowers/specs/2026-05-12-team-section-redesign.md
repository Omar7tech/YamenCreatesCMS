# Team Section Redesign

**Date:** 2026-05-12  
**Status:** Approved  
**Approach:** Pill-Shaped Cards with Role Circles (Based on Reference Design)

## Overview

Redesign the TeamSection component to match the provided reference design exactly. Features single-column pill-shaped cards with role abbreviation circles, purple glowing borders, and alternating layouts.

## Design Goals

- Match reference screenshot design exactly on desktop
- Pill/capsule-shaped cards with rounded borders
- Strong purple glow effect on borders
- Role circles with abbreviations (CEO, SWE, CD, BD, etc.)
- Alternating left/right circle positioning
- Dark card backgrounds with high contrast text
- Clean single-column layout
- Mobile: responsive adaptation (standard stacked layout)

## Layout & Structure

### Container
- Max-width: 4xl (narrower for single column design)
- Padding: `px-5 md:px-10 lg:px-20 py-32`
- Vertical spacing: Generous between cards

### Header Section
- Centered alignment with max-width 3xl
- Title: "Meet Our Team" - Large responsive typography (text-4xl → text-7xl)
- Subtitle: "The creative minds behind every project" - Muted color (text-foreground/60)
- Bottom margin: mb-16

### Layout System
- **Desktop (lg):** Single column, full-width cards (max-w-4xl)
- **Mobile:** Same single column, adjusted sizing
- Vertical gap between cards: `space-y-6 md:space-y-8`

## Card Design

### Structure
Each card is a horizontal pill-shaped container with:
1. Dark background (`bg-zinc-900` or similar dark gray)
2. Purple glowing border (2px, rounded-full)
3. Two-section layout:
   - Role circle (left OR right, alternates per card)
   - Text content (name + position)

### Card Shape & Border
- Border radius: `rounded-full` (pill shape)
- Border: `border-2 border-purple-500`
- Shadow/Glow: `shadow-[0_0_30px_rgba(168,85,247,0.6)]` - Strong purple glow
- Background: `bg-zinc-900` or `bg-[#1a1a1a]` (dark charcoal)
- Padding: `p-4 md:p-6` inside the pill

### Role Circle
- Size: 64px × 64px on desktop, 48px on mobile
- Background: Dark (matching card or slightly lighter)
- Border: `border-2 border-purple-500` with subtle glow
- Content: Role abbreviation (CEO, SWE, CD, BD)
- Typography: 
  - Font size: `text-xl md:text-2xl`
  - Font weight: `font-bold`
  - Color: White
  - Centered horizontally and vertically
- Border radius: `rounded-full`
- Position: Alternates - even index (0,2,4) on LEFT, odd index (1,3,5) on RIGHT

### Layout Pattern (Alternating)
**Even cards (index 0, 2, 4...):**
```
[Circle] [Name + Position]
```
Flex direction: `flex-row`
Circle on left, text on right

**Odd cards (index 1, 3, 5...):**
```
[Name + Position] [Circle]
```
Flex direction: `flex-row-reverse`
Circle on right, text on left

### Purple Glow System
All cards have the same strong purple glow:
- Border: `border-2 border-purple-500`
- Shadow: `shadow-[0_0_30px_rgba(168,85,247,0.6)]`
- Consistent across all cards (no depth layering)

### Card States

**Default:**
- Strong purple border and glow
- Dark background
- High contrast text

**Hover:**
- Glow intensifies: `shadow-[0_0_40px_rgba(168,85,247,0.8)]`
- Slight scale: `scale-[1.02]`
- Border brightens: `border-purple-400`
- Transition: 300ms ease

## Typography & Content

### Name
- Size: `text-2xl md:text-3xl lg:text-4xl`
- Weight: `font-bold`
- Color: `text-white`
- Letter spacing: Tight (`tracking-tight`)
- Line height: `leading-tight`

### Position
- Size: `text-sm md:text-base`
- Weight: `font-normal`
- Color: `text-gray-400` or `text-zinc-400`
- Positioned directly below name with minimal spacing (mt-1)

### Description
- **Not displayed in this design** - only name and position shown
- Remove description from card layout

### Content Container
- Flex column layout: `flex flex-col justify-center`
- Spacing from circle: `ml-6` (when circle on left) or `mr-6` (when circle on right)
- Text alignment: Left aligned for both layouts

## Animations & Interactions

### Scroll Animations (GSAP + ScrollTrigger)

**Title Animation:**
- Trigger: 80% viewport
- Effect: Fade in + Y-axis (30px → 0)
- Scrub: 1
- Duration: Smooth scroll-linked

**Subtitle Animation:**
- Trigger: 80% viewport
- Effect: Fade in + Y-axis (20px → 0)
- Scrub: 1
- Delay: Slight offset from title

**Card Animations:**
- Trigger: Individual card enters 90% viewport
- Effect: 
  - Opacity: 0 → 1
  - Y-axis: 60px → 0
  - Scale: 0.95 → 1
- Scrub: 1
- Stagger: Natural (each card animates as it enters)

### Hover Interactions

**Card Hover:**
- Glow intensifies: `shadow-[0_0_40px_rgba(168,85,247,0.8)]`
- Scale: `scale-[1.02]`
- Border brightens: `border-purple-400`
- Transition: All 300ms ease

**Role Circle Hover:**
- Slight scale: `scale-110`
- Glow intensifies slightly
- Transition: 200ms ease

**Cursor:**
- Default cursor (maintains professional feel)

### Performance Considerations
- Use `will-change: transform, opacity` on cards during scroll
- Remove `will-change` after animations complete
- GSAP context cleanup on unmount
- Consider reducing animations on mobile for performance

## Responsive Behavior

### Desktop (lg+)
- Single column layout, max-width 4xl
- Full-size role circles (64px)
- Larger text (text-4xl for names)
- Maximum glow intensity
- Alternating circle positions work perfectly

### Tablet (md)
- Same single column layout
- Medium role circles (56px)
- Medium text (text-3xl for names)
- Full glow effect maintained

### Mobile (sm)
- Same single column layout
- Smaller role circles (48px)
- Smaller text (text-2xl for names)
- Maintain alternating pattern or consider all left-aligned for consistency
- Slightly reduced glow for performance: `shadow-[0_0_20px_rgba(168,85,247,0.5)]`
- Consider disabling hover scale effects on touch devices

## Technical Implementation Notes

### Component Structure
```
TeamSection
├── Section container (ref for GSAP context)
├── Header
│   ├── Title (ref)
│   └── Subtitle (ref)
└── Cards container (space-y-6/8)
    └── Card components (refs array)
        ├── Pill wrapper (rounded-full border + glow)
        ├── Flex container (alternating direction)
        │   ├── Role Circle
        │   │   └── Abbreviation text
        │   └── Text Content
        │       ├── Name
        │       └── Position
```

### Data Requirements
Need to derive role abbreviation from position:
```typescript
interface TeamMember {
    id: number;
    name: string;
    position: string;
    description?: string; // Not displayed
}
```

### Role Abbreviation Logic
Extract abbreviation from position field:
- "Chief Executive Officer" → "CEO"
- "Software Engineer" → "SWE"  
- "Creative Director" → "CD"
- "Business Development Manager" → "BD"

Logic:
1. Split position by spaces
2. Take first letter of each word
3. Uppercase
4. Fallback: First 2-3 letters of position if single word

### Alternating Layout Logic
Determine circle position by index:
```typescript
const isCircleLeft = index % 2 === 0;
const flexDirection = isCircleLeft ? 'flex-row' : 'flex-row-reverse';
```

### Card Class Pattern
```typescript
className={`
  flex ${flexDirection} items-center gap-6
  p-4 md:p-6
  rounded-full
  border-2 border-purple-500
  bg-zinc-900
  shadow-[0_0_30px_rgba(168,85,247,0.6)]
  hover:shadow-[0_0_40px_rgba(168,85,247,0.8)]
  hover:scale-[1.02]
  hover:border-purple-400
  transition-all duration-300
`}
```

## Design Principles Applied

1. **Reference-driven:** Matches provided screenshot design exactly
2. **High contrast:** Dark backgrounds with white text for strong visual impact
3. **Purple theme integration:** Strong glowing borders tie into site color scheme
4. **Alternating rhythm:** Circle position alternates for visual interest
5. **Single-column focus:** Forces attention on each team member individually
6. **Consistency:** Matches site's existing GSAP animation patterns
7. **Accessibility:** Proper contrast ratios, semantic HTML, keyboard navigable
8. **Performance:** Optimized animations, responsive considerations

## Success Criteria

- **Desktop:** Matches reference screenshot exactly
  - Pill-shaped cards with rounded-full borders
  - Strong purple glowing borders
  - Role circles with abbreviations
  - Alternating circle positions
  - Dark backgrounds with high contrast text
- **Mobile:** Responsive adaptation maintains design intent
- Purple theme integrated naturally
- Smooth animations that enhance experience
- Fully responsive across devices
- Maintains site performance standards

## Out of Scope

- Team member photos/full avatars (only role abbreviations)
- Social media links
- Modal/expanded card views
- Filtering or sorting functionality
- Backend/API changes
- Description field display (only name + position)
