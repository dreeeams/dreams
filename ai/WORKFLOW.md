# Workflow — Shipping Discipline

## Branch Discipline

- Stay on the current branch. Do not create new branches unless explicitly asked.
- Understand what the branch is for before making changes on it.
- Do not mix concerns across branches. A UI branch does not get backend refactors.

## When to Ship

- The change does what was asked.
- It does not break anything else.
- It handles the obvious edge cases.
- It looks right on mobile and desktop.
- Ship it. Do not gold-plate.

## When to Refactor

- When existing code actively blocks the current task.
- When duplication has reached 3+ instances and a shared abstraction is clearly warranted.
- When a function exceeds ~50 lines and has distinct logical sections.
- **Never refactor speculatively.** Never refactor "while you are in there." Refactors are deliberate, scoped, and separate from feature work.

## When to Simplify

- When you are adding configuration for something that has one value.
- When you are creating a wrapper that adds no logic.
- When you are building an abstraction used by one consumer.
- When the "clean" version is harder to read than the "messy" version.
- Delete it. Inline it. Flatten it.

## Anti-Overengineering Checklist

Before submitting any change, verify:

- [ ] No new files were created that could have been avoided.
- [ ] No new dependencies were added without justification.
- [ ] No abstractions were introduced for single-use cases.
- [ ] No "future-proofing" was done for requirements that do not exist.
- [ ] No types, interfaces, or configs were created that mirror existing ones.
- [ ] The change can be explained in one sentence.

## Commit Mindset

- Each commit is one logical unit.
- Commit message describes what changed and why, not how.
- Do not commit generated files, build artifacts, or env files.
- Do not amend published commits.

## Communication

- State what you are about to do before doing it.
- If a task is ambiguous, ask. Do not assume.
- If a change has trade-offs, state them. Let the user decide.
- If you made a mistake, say so. Then fix it.
