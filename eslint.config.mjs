import { defineConfig } from 'eslint/config';

export default defineConfig({
  // Combine environments for both Jest and Cypress, along with general settings
  env: {
    browser: true,
    es2021: true,
    node: true, // Cypress tests can run in a Node.js environment
    'jest/globals': true, // This allows Jest globals such as 'describe' and 'test'
  },

  // Base configuration applies to all files
  extends: 'eslint:recommended',

  // Apply overrides for specific file patterns
  overrides: [
    // Overrides for Jest test files
    {
      files: ["**/*.test.js", "**/*.spec.js"], // Targeting Jest test files
      plugins: ["jest"], // Using the Jest ESLint plugin
      extends: ["plugin:jest/recommended"], // Use recommended settings for Jest
      rules: {
        // You can override or specify additional rules specific to Jest test files here
        "jest/prefer-expect-assertions": "off", // Example rule
      },
    },
    // Overrides for Cypress test files
    {
      files: ['**/*.cy.js'], // Targeting Cypress test files
      env: {
        'cypress/globals': true, // Enables global variables provided by Cypress
      },
      plugins: ['cypress'], // Using the Cypress ESLint plugin
      extends: ['plugin:cypress/recommended'], // Use recommended settings for Cypress
      rules: {
        // Custom rules for Cypress files
        'cypress/no-unnecessary-waiting': 'off', // Example: Disabling a specific Cypress rule
        'no-unused-vars': 'off', // Example: Disabling the no-unused-vars rule for Cypress tests
      },
    },
  ],

  // Use the latest ECMAScript version and module system
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },

  // Global rules that apply to all files can be defined here
  rules: {
    // Example global rule
    // 'some-global-rule': 'off',
  },
});
