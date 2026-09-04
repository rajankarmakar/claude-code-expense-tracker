---
name: deploy
description: Deploy the expense tracker to staging - runs lint as the test gate, builds the production bundle, and pushes dist/ to the staging branch on origin. Use when the user asks to deploy, ship, or push to staging.
---

# Deploy to staging

Run these steps in order. Stop and report the failure if any step fails - never
continue to the next step, and never push a broken or unlinted build.

## 1. Test gate: lint

This repo has no test suite (see CLAUDE.md), so `npm run lint` is the test
gate.

```bash
npm run lint
```

If this fails, stop. Report the lint errors to the user and do not build or
deploy.

## 2. Build the production bundle

```bash
npm run build
```

This produces `dist/`. If the build fails, stop and report the error.

## 3. Push `dist/` to the `staging` branch

The `staging` branch's root is the contents of `dist/` (an orphan history,
independent of `main`). Use a temporary git worktree so the user's current
branch and working tree are never touched:

```bash
# From the repo root, with a clean dist/ from step 2:
rm -rf /tmp/deploy-staging-worktree

if git show-ref --verify --quiet refs/remotes/origin/staging; then
  git worktree add /tmp/deploy-staging-worktree staging
else
  git worktree add --detach /tmp/deploy-staging-worktree
  git -C /tmp/deploy-staging-worktree checkout --orphan staging
  git -C /tmp/deploy-staging-worktree rm -rf . >/dev/null
fi

# Sync build output into the worktree, removing anything no longer produced
rsync -a --delete --exclude .git dist/ /tmp/deploy-staging-worktree/

git -C /tmp/deploy-staging-worktree add -A
if ! git -C /tmp/deploy-staging-worktree diff --cached --quiet; then
  git -C /tmp/deploy-staging-worktree commit -m "Deploy: $(date -u +%Y-%m-%dT%H:%M:%SZ)"
  git -C /tmp/deploy-staging-worktree push origin staging
else
  echo "No changes to deploy - dist/ matches the current staging branch."
fi

git worktree remove /tmp/deploy-staging-worktree --force
```

Report back the staging branch's HEAD commit and confirm the push succeeded
(or that there was nothing new to deploy).

## Notes

- This pushes to a shared remote branch. Since the user asked for this skill
  specifically to do that, proceed without asking for confirmation each run -
  but do surface exactly what got pushed in your summary.
- Never use `--force` on the `staging` push. If it's rejected (e.g. someone
  else pushed to `staging` directly), stop and tell the user rather than
  overwriting it.
- Never touch `main` or the user's current branch/working tree - all of this
  happens in the isolated worktree at `/tmp/deploy-staging-worktree`.
