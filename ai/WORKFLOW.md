# Workflow — Shipping Discipline

## Branch Discipline

- Stay on the current branch. Do not create new branches unless explicitly asked.
- Understand what the branch is for before making changes on it.
- Do not mix concerns across branches. A UI branch does not get backend refactors.

## Multi-Session Continuity

- Every session starts by reading `CLAUDE.md` and the `/ai` context layer.
- Check `git log --oneline -10` to understand recent work before making changes.
- Check `git status` to detect uncommitted work from a prior session.
- Do not duplicate or revert work from a previous session unless asked.
- If the codebase state contradicts `CLAUDE.md`, trust the code. Flag the discrepancy.

## Parallel Agent Protocol

When multiple Claude agents work on the same repo:

- **Builder agent**: follows `/ai/BUILDER.md`. Ships features, updates copy, adds components.
- **Debugger agent**: follows `/ai/DEBUGGER.md`. Fixes errors, investigates failures, adds guardrails.
- Agents do not overlap. One agent does not refactor what another just built.
- Each agent commits its own work with clear, scoped commit messages.
- If agents conflict, the most recent pushed commit wins. Rebase, do not force-push.

## Definition of Done

A task is done when:

1. The stated goal is met. Not more, not less.
2. `npm run build` passes with zero errors.
3. Both locales render correctly (EN and ES).
4. Mobile (320px) and desktop behave as expected.
5. No regressions in unrelated sections.
6. Changes are committed and pushed to the correct branch.

## Progress Reporting

After completing a task, report:

- **What changed**: files modified/created, one line each.
- **Commit SHA**: the deployed commit hash.
- **Build status**: pass/fail.
- **What was NOT changed** (if relevant): anything intentionally left alone and why.

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
- **Never refactor speculatively.** Refactors are deliberate, scoped, and separate from feature work.

## Anti-Overengineering Checklist

Before submitting any change:

- [ ] No new files were created that could have been avoided.
- [ ] No new dependencies were added without justification.
- [ ] No abstractions were introduced for single-use cases.
- [ ] No "future-proofing" for requirements that do not exist.
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
