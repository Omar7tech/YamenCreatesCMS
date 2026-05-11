# Team Section Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign TeamSection component to match reference screenshot with pill-shaped cards, role circles, and purple glowing borders.

**Architecture:** Single-column layout with alternating left/right role circles. Each card is a dark pill-shaped container with strong purple glow. Role abbreviations derived from position field. GSAP ScrollTrigger for entrance animations.

**Tech Stack:** React, TypeScript, Tailwind CSS, GSAP, ScrollTrigger

---

## File Structure

**Modified:**
- `resources/js/sections/home/TeamSection.tsx` - Complete redesign of component structure and styling

**Created:**
- None (single file modification)

## Implementation Tasks

### Task 1: Add Role Abbreviation Helper Function

**Files:**
- Modify: `resources/js/sections/home/TeamSection.tsx:1-17`

- [ ] **Step 1: Add helper function above component**

Add this function before the TeamSection component:

```typescript
/**
 * Extracts role abbreviation from position string
 * Examples: "Chief Executive Officer" → "CEO", "Software Engineer" → "SWE"
 */
function getRoleAbbreviation(position: string): string {
    const words = position.trim().split(/\s+/);
    
    if (words.length >= 2) {
        // Multi-word: take first letter of each word
        return words.map(word => word[0]).join('').toUpperCase();
    }
    
    // Single word: take first 2-3 letters
    return position.slice(0, 3).toUpperCase();
}
```

- [ ] **Step 2: Verify helper function with examples**

Manually test the logic:
- "Chief Executive Officer" should return "CEO"
- "Software Engineer" should return "SWE"
- "Creative Director" should return "CD"
- "Designer" should return "DES"

- [ ] **Step 3: Commit**

```bash
git add resources/js/sections/home/TeamSection.tsx
git commit -m "feat(team): add role abbreviation helper function"
```

### Task 2: Update Component Structure and Layout

**Files:**
- Modify: `resources/js/sections/home/TeamSection.tsx:82-147`

- [ ] **Step 1: Replace container and header**

Replace the return statement JSX (lines 82-147) with:

```typescript
    return (
        <div ref={sectionRef} className="px-5 md:px-10 lg:px-20 py-32">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-16 text-center max-w-3xl mx-auto space-y-4">
                    <h2
                        ref={titleRef}
                        className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground"
                    >
                        Meet Our Team
                    </h2>
                    <p
                        ref={subtitleRef}
                        className="text-base md:text-lg text-foreground/60"
                    >
                        The creative minds behind every project
                    </p>
                </div>

                {/* Cards */}
                <div className="space-y-6 md:space-y-8">
                    {team.map((member, index) => {
                        const isCircleLeft = index % 2 === 0;
                        const roleAbbr = getRoleAbbreviation(member.position);

                        return (
                            <div
                                key={member.id}
                                ref={(el) => {
                                    cardsRef.current[index] = el;
                                }}
                                className={`
                                    flex ${isCircleLeft ? 'flex-row' : 'flex-row-reverse'} 
                                    items-center gap-4 md:gap-6
                                    p-4 md:p-6
                                    rounded-full
                                    border-2 border-purple-500
                                    bg-zinc-900
                                    shadow-[0_0_30px_rgba(168,85,247,0.6)]
                                    hover:shadow-[0_0_40px_rgba(168,85,247,0.8)]
                                    hover:scale-[1.02]
                                    hover:border-purple-400
                                    transition-all duration-300
                                    group
                                `}
                            >
                                {/* Role Circle */}
                                <div className="flex-shrink-0">
                                    <div 
                                        className="
                                            w-12 h-12 md:w-16 md:h-16 lg:w-16 lg:h-16
                                            rounded-full
                                            border-2 border-purple-500
                                            bg-zinc-800
                                            flex items-center justify-center
                                            shadow-[0_0_15px_rgba(168,85,247,0.4)]
                                            group-hover:scale-110
                                            transition-transform duration-200
                                        "
                                    >
                                        <span className="text-lg md:text-xl lg:text-2xl font-bold text-white">
                                            {roleAbbr}
                                        </span>
                                    </div>
                                </div>

                                {/* Text Content */}
                                <div className="flex flex-col justify-center min-w-0 flex-1">
                                    <h3 className="text-xl md:text-2xl lg:text-4xl font-bold text-white tracking-tight leading-tight">
                                        {member.name}
                                    </h3>
                                    <p className="text-xs md:text-sm lg:text-base text-zinc-400 mt-1">
                                        {member.position}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
```

- [ ] **Step 2: Test in browser**

Start dev server if not running:
```bash
npm run dev
```

Navigate to home page and scroll to team section. Verify:
- Cards are pill-shaped with purple glowing borders
- Role circles alternate left/right
- Abbreviations display correctly
- Dark backgrounds with white text

- [ ] **Step 3: Commit**

```bash
git add resources/js/sections/home/TeamSection.tsx
git commit -m "feat(team): update card layout to pill-shaped design with role circles"
```

### Task 3: Update GSAP Animations

**Files:**
- Modify: `resources/js/sections/home/TeamSection.tsx:24-78`

- [ ] **Step 1: Update card animation effects**

Replace the card animation section (inside the `cardsRef.current.forEach` block, lines 61-74) with:

```typescript
            // Cards animation with scale and fade
            cardsRef.current.forEach((card, index) => {
                if (!card) return;

                gsap.from(card, {
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 90%',
                        end: 'top 60%',
                        scrub: 1,
                    },
                    opacity: 0,
                    y: 60,
                    scale: 0.95,
                });
            });
```

- [ ] **Step 2: Test scroll animations**

Refresh browser and scroll up/down through team section. Verify:
- Cards fade in with upward motion
- Slight scale effect on entrance
- Smooth scroll-linked animation
- Title and subtitle animations still work

- [ ] **Step 3: Commit**

```bash
git add resources/js/sections/home/TeamSection.tsx
git commit -m "feat(team): update scroll animations with scale effect"
```

### Task 4: Add Mobile Optimizations

**Files:**
- Modify: `resources/js/sections/home/TeamSection.tsx:82-147`

- [ ] **Step 1: Add mobile-specific shadow classes**

Update the card's className to include responsive shadow:

Replace:
```typescript
shadow-[0_0_30px_rgba(168,85,247,0.6)]
```

With:
```typescript
shadow-[0_0_20px_rgba(168,85,247,0.5)] md:shadow-[0_0_30px_rgba(168,85,247,0.6)]
```

- [ ] **Step 2: Test on mobile viewport**

In browser dev tools, switch to mobile viewport (375px width). Verify:
- Cards remain readable
- Circles are appropriately sized (48px)
- Text doesn't overflow
- Glow is present but not overwhelming
- Alternating layout works or consider all left-aligned if needed

- [ ] **Step 3: Commit**

```bash
git add resources/js/sections/home/TeamSection.tsx
git commit -m "feat(team): add mobile-optimized shadow and responsive sizing"
```

### Task 5: Final Polish and Testing

**Files:**
- Modify: `resources/js/sections/home/TeamSection.tsx`

- [ ] **Step 1: Add touch device hover optimization**

Add this CSS class adjustment for better touch experience. Update the card's hover classes:

Replace:
```typescript
hover:shadow-[0_0_40px_rgba(168,85,247,0.8)]
hover:scale-[1.02]
```

With:
```typescript
md:hover:shadow-[0_0_40px_rgba(168,85,247,0.8)]
md:hover:scale-[1.02]
```

And for the role circle:

Replace:
```typescript
group-hover:scale-110
```

With:
```typescript
md:group-hover:scale-110
```

- [ ] **Step 2: Test all team members**

Verify each team member card:
- Role abbreviation is correct and readable
- Name displays without truncation
- Position text is legible
- Purple glow is consistent
- Alternating pattern works across all cards

Test with different numbers of team members (odd/even counts).

- [ ] **Step 3: Cross-browser testing**

Test in:
- Chrome/Edge (Chromium)
- Firefox
- Safari (if available)

Verify purple glows render correctly in all browsers.

- [ ] **Step 4: Performance check**

Open browser performance tools and scroll through team section. Verify:
- No layout shifts
- Smooth 60fps scrolling
- GSAP animations perform well
- No console errors

- [ ] **Step 5: Final commit**

```bash
git add resources/js/sections/home/TeamSection.tsx
git commit -m "feat(team): add touch device optimizations and final polish"
```

### Task 6: Verification Against Reference Screenshot

**Files:**
- Visual comparison only

- [ ] **Step 1: Compare with reference screenshot**

Open reference screenshot: `c:\Users\Omar\Desktop\Screenshot 2026-05-12 011419.png`

Compare side-by-side with live implementation. Verify:
- ✓ Pill-shaped cards with rounded-full borders
- ✓ Strong purple glowing borders
- ✓ Dark card backgrounds (zinc-900)
- ✓ Role circles with abbreviations
- ✓ Alternating circle positions (left/right)
- ✓ White bold names
- ✓ Gray positions below names
- ✓ Single column layout
- ✓ Generous vertical spacing

- [ ] **Step 2: Document any differences**

If any differences exist between reference and implementation, document them. Acceptable differences:
- Font family (using site's default fonts)
- Exact spacing values (as long as proportions match)
- Glow spread/intensity (minor variations)

Unacceptable differences requiring fixes:
- Layout structure
- Color scheme
- Border style
- Card shape

- [ ] **Step 3: Make final adjustments if needed**

If any unacceptable differences found, make corrections and commit:

```bash
git add resources/js/sections/home/TeamSection.tsx
git commit -m "fix(team): adjust [specific element] to match reference design"
```

## Implementation Complete

All tasks completed. The TeamSection now matches the reference screenshot with:
- Pill-shaped cards with purple glowing borders
- Role circles with abbreviations
- Alternating left/right layout
- Dark backgrounds with high contrast text
- Smooth GSAP scroll animations
- Responsive mobile adaptation

**Testing checklist:**
- [ ] Visual match with reference screenshot
- [ ] All team members display correctly
- [ ] Animations smooth and performant
- [ ] Responsive across mobile/tablet/desktop
- [ ] No console errors
- [ ] Cross-browser compatible
