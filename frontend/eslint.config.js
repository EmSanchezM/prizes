import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import { configureVueProject, defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'

// Some components still use plain JavaScript <script> blocks
configureVueProject({ scriptLangs: ['ts', 'js'] })

const isProduction = process.env.NODE_ENV === 'production'

export default defineConfigWithVueTs(
  {
    name: 'app/files-to-ignore',
    ignores: ['dist/**']
  },
  js.configs.recommended,
  pluginVue.configs['flat/essential'],
  vueTsConfigs.recommended,
  {
    name: 'app/rules',
    rules: {
      'no-console': isProduction ? 'warn' : 'off',
      'no-debugger': isProduction ? 'warn' : 'off',
      'vue/multi-word-component-names': 'off',
      'vue/no-reserved-component-names': 'off',
      'prefer-const': 'warn',
      // typescript-eslint 8 promoted these to errors; keep them as warnings like before
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn'
    }
  }
)
