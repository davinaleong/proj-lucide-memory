# Branch Protection Configuration for GitHub

To enable branch protection for the `production` branch, configure these settings in your GitHub repository:

## Repository Settings → Branches → Add Rule

### Branch Name Pattern
```
production
```

### Protection Rules to Enable

#### ✅ Required Status Checks
- **Require status checks to pass before merging**: ✓
- **Require branches to be up to date before merging**: ✓
- **Status checks that are required**:
  - `test-and-validate (20.x)`
  - `test-and-validate (22.x)`
  - `production-ready`

#### ✅ Required Pull Request Reviews
- **Require a pull request before merging**: ✓
- **Require approvals**: 1 (minimum)
- **Dismiss stale pull request approvals when new commits are pushed**: ✓
- **Require review from code owners**: ✓ (if CODEOWNERS file exists)

#### ✅ Additional Restrictions
- **Restrict pushes that create files**: ✓
- **Require signed commits**: ✓ (recommended)
- **Require linear history**: ✓ (prevents merge commits)
- **Do not allow bypassing the above settings**: ✓
- **Allow force pushes**: ❌ (disabled for safety)
- **Allow deletions**: ❌ (disabled for safety)

## Workflow Permissions

The workflow requires these GitHub token permissions:
- `contents: read` (default)
- `actions: read` (default)
- `pull-requests: read` (default)

## Emergency Access

For emergency hotfixes, repository administrators can:
1. Temporarily disable branch protection
2. Make emergency commits
3. Re-enable protection immediately

## Workflow Features

- **Multi-Node Testing**: Tests on Node.js 20.x and 22.x
- **Complete Validation**: Type checking, linting, testing, and building
- **Fast Feedback**: Parallel job execution for efficiency
- **Clear Reporting**: Detailed status reporting for each step
- **Artifact Validation**: Ensures build produces expected output

## Setup Instructions

1. Push this workflow to your repository
2. Create a `production` branch if it doesn't exist
3. Configure branch protection rules in GitHub Settings
4. Test with a pull request to the `production` branch

## Commands to Create Production Branch

```bash
# From your main branch
git checkout -b production
git push -u origin production
```