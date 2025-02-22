// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  eslint.configs.recommended,  // Reglas recomendadas por ESLint
  tseslint.configs.strict,     // Reglas estrictas de TypeScript
  tseslint.configs.stylistic,  // Reglas de estilo
  {
    ignores: ['build/', 'dist/', 'node_modules/'], // Ignorar carpetas de salida
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module', // Usar ES Modules
    },
    linterOptions: {
      reportUnusedDisableDirectives: true, // Reporta reglas deshabilitadas no usadas
    },
    rules: {
      'no-console': 'warn', // Advertencia en lugar de error para console.log
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }], // Ignorar variables con prefijo "_"
      '@typescript-eslint/explicit-function-return-type': 'off', // No obligar a definir tipo de retorno en funciones
      'no-undef': 'off', // Evitar falsos positivos en TypeScript
    }
  }
);
