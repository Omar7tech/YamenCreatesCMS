## Project Enhancement Requirements

Enhance the existing Projects system (categories and project listing already implemented).

---

### Project Sections

- Create a new model and migration: `ProjectSection`.
- Each `ProjectSection` belongs to a `Project` (one-to-many relationship).
- Add a Filament Relation Manager inside the Project resource to manage sections.

---

### Section Types (Enum)

Create an enum class `SectionType` with the following values:

- Text Only  
- Left Image and Text  
- Right Image and Text  
- Image Gallery (can contain multiple images)

- Store the section type in the `project_sections` migration.

---

### Content Handling

- Any section that contains text must use a Rich Editor.
- Ensure the editor output is well-designed, clean, and matches the branding.

---

### Images

- All images must be handled using Spatie Media Library.
- Apply proper conversions and optimizations for performance, consistent with existing implementation.

---

### Project Behavior

- Add new fields to the `projects` table:
  - `is_internal` (boolean, default = true)
  - `external_url` (nullable)

- Behavior:
  - If `is_internal = false`:
    - The project opens an external URL.
    - Show the `external_url` input using conditional visibility (e.g., `visibleJs()` in Filament).
    - The `external_url` field must be required in Filament when `is_internal` is false.
  - If `is_internal = true`:
    - The project opens its internal page using slug.
    - The `external_url` field should be hidden and not required.

---

### Update Projects Migration

Modify the existing `projects` table migration to include:

- `is_internal`
  - Type: boolean
  - Default: true

- `external_url`
  - Type: string (or text if preferred)
  - Nullable

---

### Frontend

- Build dynamic project pages that render sections based on their type.
- The design must match the existing website style (same as Spirit).
- Keep it responsive, clean, and minimal.

---

### Work Page Updates

- Update project cards to support:
  - External links when `is_internal = false`
  - Internal routing when `is_internal = true`

---

### General Notes

- Do not modify existing category/project structure.
- Follow best practices in Laravel and React.
- Ensure high performance and no errors.