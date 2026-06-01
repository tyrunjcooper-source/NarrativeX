# Creating and Managing Branches in Git

## Overview
Branches allow you to work on different features or fixes independently. Git branches are lightweight pointers to specific commits, enabling parallel development.

---

## Key Commands and Usage

### 1. **git branch** — List, Create, and Delete Branches

#### List branches
```bash
# List local branches
git branch

# List remote branches
git branch -r

# List all branches (local and remote)
git branch -a
```

#### Create a new branch
```bash
# Create a new branch from current HEAD
git branch feature/user-auth

# Create a new branch from a specific commit or branch
git branch feature/payment main
```

#### Delete a branch
```bash
# Delete a local branch (safe, prevents deletion of unmerged work)
git branch -d feature/old-feature

# Force delete a local branch
git branch -D feature/old-feature

# Delete a remote branch
git push origin --delete feature/old-feature
```

#### Rename a branch
```bash
# Rename current branch
git branch -m new-branch-name

# Rename another branch
git branch -m old-name new-name
```

---

### 2. **git checkout** — Switch Branches

#### Switch to an existing branch
```bash
# Checkout an existing branch
git checkout feature/user-auth
```

#### Create and switch to a new branch (shorthand)
```bash
# Create and immediately switch to a new branch
git checkout -b feature/new-payment-system

# Create from a specific branch
git checkout -b feature/new-feature main
```

#### Switch back to previous branch
```bash
# Go back to the branch you were on before
git checkout -
```

---

### 3. **git merge** — Combine Branch Changes

#### Basic merge
```bash
# Switch to the target branch first
git checkout main

# Merge another branch into current branch
git merge feature/user-auth
```

#### Merge strategies

```bash
# Fast-forward merge (if possible)
git merge feature/user-auth

# Create a merge commit even if fast-forward is possible
git merge --no-ff feature/user-auth

# Squash commits before merging
git merge --squash feature/user-auth
git commit -m "Add user authentication feature"

# Abort a merge if conflicts occur
git merge --abort
```

#### Handling merge conflicts
```bash
# After resolving conflicts in files:
git add .
git commit -m "Resolve merge conflicts"
```

#### Example workflow
```bash
# Create and work on a feature branch
git checkout -b feature/user-auth
# ... make changes ...
git add .
git commit -m "Add login functionality"

# Switch back to main and merge
git checkout main
git pull origin main  # Get latest changes
git merge feature/user-auth

# Push merged changes
git push origin main
```

---

### 4. **git rebase** — Reapply Commits on Top of Another Branch

#### Basic rebase
```bash
# Reapply current branch commits on top of main
git rebase main
```

#### Interactive rebase (rewrite history)
```bash
# Open interactive rebase for last 3 commits
git rebase -i HEAD~3
# In the editor, you can:
# pick   - use commit
# reword - use commit but edit message
# squash - use commit but meld into previous
# fixup  - like squash but discard log message
# drop   - remove commit
```

#### Rebase onto a different branch
```bash
# Rebase feature branch onto main
git checkout feature/new-feature
git rebase main
```

#### Continue or abort a rebase
```bash
# After resolving conflicts:
git add .
git rebase --continue

# Abort the entire rebase
git rebase --abort
```

#### Example workflow
```bash
# Create feature branch from main
git checkout -b feature/payment main

# Make several commits
git add payment.js
git commit -m "Add payment validation"

# Main branch received new commits, rebase your work on top
git rebase main

# If conflicts occur, resolve them and continue
git rebase --continue

# Force push to update remote branch (use with caution!)
git push origin feature/payment -f
```

---

## merge vs. rebase

| Aspect | merge | rebase |
|--------|-------|--------|
| **History** | Preserves complete history | Rewrites history (linear) |
| **Commits** | Creates merge commit | Reapplies commits on top |
| **Use case** | Public/shared branches | Personal/feature branches |
| **Safety** | Safer for shared branches | Can disrupt team workflows |
| **Result** | Non-linear history | Cleaner, linear history |

---

## Complete Workflow Example

```bash
# 1. Create a feature branch
git checkout -b feature/dark-mode

# 2. Make changes and commit
echo "/* Dark mode styles */" > theme.css
git add theme.css
git commit -m "Add dark mode CSS"

# 3. Make more changes
echo "body { background: #1a1a1a; }" >> theme.css
git add theme.css
git commit -m "Update dark mode colors"

# 4. Switch to main and update
git checkout main
git pull origin main

# 5. Option A: Merge (creates merge commit)
git merge feature/dark-mode
git push origin main

# Option B: Rebase then merge (cleaner history)
git checkout feature/dark-mode
git rebase main
git checkout main
git merge feature/dark-mode  # Fast-forward
git push origin main

# 6. Cleanup - delete the feature branch
git branch -d feature/dark-mode
git push origin --delete feature/dark-mode
```

---

## Best Practices

✅ **Do:**
- Use descriptive branch names: `feature/user-login`, `bugfix/header-alignment`
- Keep branches focused on a single feature or fix
- Regularly sync with main: `git rebase main` or `git merge main`
- Delete branches after merging
- Use `git pull` with `--rebase` for cleaner history: `git pull --rebase`

❌ **Don't:**
- Force push to shared/public branches (`git push -f`)
- Keep long-lived branches out of sync with main
- Rebase commits that have been pushed to shared branches
- Use unclear branch names like `fix`, `test`, or `temp`

---

This foundation covers the essential Git branch operations. For more advanced scenarios, consult the [Git documentation](https://git-scm.com/docs).