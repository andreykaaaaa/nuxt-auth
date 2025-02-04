// @ts-check
import antfu from '@antfu/eslint-config';

export default antfu(
  {
    typescript: true,
    vue: true,

    stylistic: {
      indent: 2,
      semi: true
    },

    rules: {
      'no-new-func': 'off',
      'no-eval': 'off',
      'antfu/no-import-node-modules-by-path': 'off',
      'ts/no-require-imports': 'off',
      'ts/no-use-before-define': 'off',
      'ts/no-unused-expressions': 'off',
      'ts/ban-ts-comment': 'off',
      'ts/consistent-type-definitions': ['error', 'type'],
      'antfu/if-newline': 'off',
      'no-async-promise-executor': 'off',
      'no-console': 'off',
      'node/prefer-global/process': 'off',
      'unicorn/prefer-number-properties': 'off',
      'style/no-extra-boolean-cast': 'off',
      'style/quotes': ['error', 'single'],
      'style/comma-dangle': ['error', 'never'],
      'style/semi': ['error', 'always'],
      'style/template-curly-spacing': ['error', 'never'],
      'style/brace-style': ['error', '1tbs'],
      'style/object-curly-spacing': ['error', 'always', {
        arraysInObjects: true,
        objectsInObjects: true
      }],
      'style/member-delimiter-style': ['error', {
        multiline: {
          delimiter: 'semi',
          requireLast: true
        },
        singleline: {
          delimiter: 'semi',
          requireLast: false
        },
        overrides: {
          interface: {
            multiline: {
              delimiter: 'semi',
              requireLast: true
            }
          }
        }
      }]
    },

    ignores: [
      '**/.vitepress/cache/',
      '**/.vitepress/dist/'
    ]
  },
  {
    files: ['**/*.vue'],

    rules: {
      'antfu/top-level-function': 'off',
      'vue/comma-dangle': 'off',
      'vue/attributes-order': 'off',
      'vue/custom-event-name-casing': 'off',
      'vue/no-multiple-template-root': 'off',
      'vue/multi-word-component-names': 'off',
      'vue/no-side-effects-in-computed-properties': 'off',
      'vue/require-default-prop': 'off',
      'vue/no-v-html': 'off',
      'vue/mustache-interpolation-spacing': ['error', 'always'],
      'vue/first-attribute-linebreak': ['error', {
        singleline: 'beside',
        multiline: 'below'
      }],
      'vue/max-attributes-per-line': ['error', {
        singleline: 1,
        multiline: 1
      }],
      'vue/html-closing-bracket-newline': ['error', {
        singleline: 'never',
        multiline: 'always'
      }],
      'vue/html-self-closing': ['error', {
        html: {
          void: 'always',
          normal: 'always',
          component: 'always'
        }
      }]
    }
  },
  {
    files: ['**/*.ts'],

    rules: {
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-invalid-void-type': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-dynamic-delete': 'off',
      '@typescript-eslint/unified-signatures': 'off',
      '@typescript-eslint/no-useless-constructor': 'off'
    }
  }
);
