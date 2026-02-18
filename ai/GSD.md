# GSD — Get Stuff Done Methodology

## Core Rule

Never start coding without a plan. Typing is the last step, not the first.

## Phases

### 1. Analyze

- Read the relevant code. All of it. Not just the file you think matters.
- Understand the data flow. Where does state live? What triggers what?
- Identify constraints: existing patterns, shared types, guarded files.
- Map the blast radius. What else could break?

### 2. Plan

- Define the exact changes needed, file by file.
- Identify edge cases before touching code:
  - What if the value is null/undefined?
  - What if the network fails?
  - What if the user navigates away mid-action?
  - What if the locale is missing a translation key?
- If the plan involves more than 3 files, write it out explicitly before proceeding.

### 3. Implement

- One logical change at a time. Do not mix refactors with features.
- Follow existing patterns in the codebase. Consistency beats personal preference.
- Test as you go. Do not write 200 lines then hope it works.
- If something feels wrong, stop. Re-read the plan.

### 4. Validate

- Confirm the change works for the stated goal.
- Confirm nothing else broke.
- Confirm mobile and both locales (EN/ES) if UI was touched.
- Confirm no new TypeScript errors, no new console warnings.

## Atomic Mindset

- Each change should be independently shippable.
- If you cannot describe the change in one sentence, it is too big. Split it.
- Never bundle unrelated fixes into a single action.

## When Stuck

- Re-read the error message. Fully.
- Check the actual file, not your assumption of what it contains.
- Reduce to the smallest reproduction.
- If blocked for more than 2 attempts, step back and reassess the approach.
