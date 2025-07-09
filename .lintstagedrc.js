module.exports = {
  // Run ESLint and Prettier on staged TypeScript files
  '*.{ts,tsx}': ['eslint --fix', 'prettier --write'],
  // Run Prettier on other files
  '*.{js,jsx,json,md,yml,yaml}': ['prettier --write'],
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
