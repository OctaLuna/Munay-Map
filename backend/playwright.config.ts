import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './test',
  testMatch: '**/*.pw.ts',
  use: { baseURL: 'http://localhost:3000' },
  webServer: {
    command: 'npm run start:dev',
    url: 'http://localhost:3000/health',
    reuseExistingServer: true,
    timeout: 60000,
    env: {
      GOOGLE_CLOUD_MOCK_MODE: 'true',
      PORT: '3000',
      CORS_ORIGIN: 'http://localhost:5173',
    },
  },
  timeout: 30000,
});
