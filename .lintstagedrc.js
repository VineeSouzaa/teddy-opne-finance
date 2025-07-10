module.exports = {
  // Run ESLint on staged TypeScript files
  '*.{ts,tsx}': ['eslint --fix'],
  // Run tests if test files are changed
  '*.{ts,tsx}': filenames => {
    const testFiles = filenames.filter(
      filename => filename.includes('.spec.') || filename.includes('.test.'),
    )
    if (testFiles.length > 0) {
      return 'npm run test'
    }
    return []
  },
}
