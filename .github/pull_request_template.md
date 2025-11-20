## Pull Request Checklist

### Description
<!-- Briefly describe the changes in this PR -->

### Type of Change
- [ ] 🐛 Bug fix (non-breaking change which fixes an issue)
- [ ] ✨ New feature (non-breaking change which adds functionality)
- [ ] 💥 Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] 📚 Documentation update
- [ ] 🧪 Test improvements
- [ ] 🔧 Refactoring (no functional changes)

### Testing
- [ ] All existing tests pass (`npm test`)
- [ ] New tests added for new functionality
- [ ] TypeScript compilation passes (`npm run type-check`)
- [ ] Linting passes (`npm run lint`)
- [ ] Build succeeds (`npm run build`)

### Production Branch Requirements
If this PR targets the `production` branch:
- [ ] This is a critical hotfix or planned release
- [ ] All tests pass in CI/CD pipeline
- [ ] Code has been reviewed and approved
- [ ] Changes have been tested in a staging environment

### Screenshots (if applicable)
<!-- Add screenshots to help explain your changes -->

### Additional Notes
<!-- Add any additional notes, concerns, or context about this PR -->

---

**Note**: PRs to the `production` branch require all CI checks to pass and cannot be merged until the automated protection workflow succeeds.