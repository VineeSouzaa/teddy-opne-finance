// @ts-check
import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: ['eslint.config.mjs'],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  eslintPluginPrettierRecommended,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      sourceType: 'commonjs',
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    plugins: {
      'nestjs': {
        rules: {
        },
      }
    },
    rules: {
      // Auto-fix indentation and spacing
      'indent': ['error', 2, { 'SwitchCase': 1 }],
      'prettier/prettier': 'off',
      'no-trailing-spaces': 'error',
      'no-multiple-empty-lines': ['error', { 'max': 1, 'maxEOF': 0 }],
      'eol-last': 'error',
      
      // Remove dead code and unused variables
      'no-unused-vars': 'off', // Turn off base rule
      '@typescript-eslint/no-unused-vars': ['error', { 
        'argsIgnorePattern': '^_',
        'varsIgnorePattern': '^_',
        'caughtErrorsIgnorePattern': '^_'
      }],
      'no-unreachable': 'error',
      'no-unreachable-loop': 'error',
      
      // Remove unnecessary code
      'no-empty': 'error',
      'no-empty-function': 'warn',
      'no-useless-return': 'error',
      'no-useless-constructor': 'error',
      'no-useless-rename': 'error',
      'no-useless-concat': 'error',
      
      // Fix spacing and formatting
      'object-curly-spacing': ['error', 'always'],
      'array-bracket-spacing': ['error', 'never'],
      'comma-spacing': ['error', { 'before': false, 'after': true }],
      'key-spacing': ['error', { 'beforeColon': false, 'afterColon': true }],
      'keyword-spacing': ['error', { 'before': true, 'after': true }],
      'space-before-blocks': 'error',
      'space-before-function-paren': ['error', {
        'anonymous': 'always',
        'named': 'never',
        'asyncArrow': 'always'
      }],
      'space-in-parens': ['error', 'never'],
      'space-infix-ops': 'error',
      'space-unary-ops': ['error', { 'words': true, 'nonwords': false }],
      
      // Remove semicolons (only use base ESLint rule)
      'semi': ['error', 'never'],
      
      // Quote consistency (only use base ESLint rule)
      'quotes': ['error', 'single'],
      
      // Existing rules
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-floating-promises': 'warn',
      '@typescript-eslint/no-unsafe-argument': 'warn',
      
      // Hexagonal Architecture rules - Comprehensive import restrictions
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            // Domain layer restrictions
            {
              group: ['src/infrastructure/*'],
              message: 'Domain layer cannot import from Infrastructure layer',
            },
            {
              group: ['src/presentation/*'],
              message: 'Domain layer cannot import from Presentation layer',
            },
            {
              group: ['src/application/*'],
              message: 'Domain layer cannot import from Application layer',
            },
            
            // Application layer restrictions
            {
              group: ['src/presentation/*'],
              message: 'Application layer cannot import from Presentation layer',
            },
            {
              group: ['src/infrastructure/*'],
              message: 'Application layer cannot import from Infrastructure layer (use dependency injection)',
            },
            
            // Presentation layer restrictions
            {
              group: ['src/infrastructure/*'],
              message: 'Presentation layer cannot import from Infrastructure layer (use Application layer)',
            },
            
            // Infrastructure layer restrictions
            {
              group: ['src/presentation/*'],
              message: 'Infrastructure layer cannot import from Presentation layer',
            },
            {
              group: ['src/application/*'],
              message: 'Infrastructure layer cannot import from Application layer',
            },
          ],
        },
      ],
    },
  },
  // Layer-specific overrides for stricter enforcement
  {
    files: ['src/domain/**/*.ts'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['src/infrastructure/*', 'src/presentation/*', 'src/application/*'],
              message: 'Domain layer must be completely isolated from other layers',
            },
          ],
        },
      ],
    },
  },
  {
    files: ['src/application/**/*.ts'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['src/presentation/*', 'src/infrastructure/*'],
              message: 'Application layer can only import from Domain layer',
            },
          ],
        },
      ],
    },
  },
  {
    files: ['src/presentation/**/*.ts'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['src/infrastructure/*'],
              message: 'Presentation layer can only import from Application layer',
            },
          ],
        },
      ],
    },
  },
  {
    files: ['src/infrastructure/**/*.ts'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['src/presentation/*', 'src/application/*'],
              message: 'Infrastructure layer can only import from Domain layer',
            },
          ],
        },
      ],
    },
  },
);