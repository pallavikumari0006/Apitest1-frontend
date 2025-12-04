// src/utils/envs.js
export const environments = {
  dev: {
    API_BASE: "http://localhost:5000",
    TOKEN: "dev-token-123",
  },
  staging: {
    API_BASE: "https://staging.api.example.com",
    TOKEN: "staging-token-456",
  },
  production: {
    API_BASE: "https://api.example.com",
    TOKEN: "prod-token-789",
  },
}
