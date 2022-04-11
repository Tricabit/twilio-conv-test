const get = (key: string, def: string) => process.env[key] ?? def;

export const config = {
  URI: get("URI", "mongodb://localhost:27017"),
  USERS_DATABASE: get("USERS_DATABASE", "twilio-convo-test"),
  CONVERSATIONS_COLLECTION: get("CONVERSATION_COLLECTION", "conversations"),
  USERS_COLLECTION: get("USERS_COLLECTION", "users"),
  JWT_KEY: get("JWT_KEY", "weakjwtkey"),
  JWT_EXPIRATION: get("JWT_EXPIRATION", "1y"),
  FRONTEND_URL: get("NEXT_PUBLIC_FRONTEND_URL", ""),
  TWILIO_ACCOUNT_SID: get("TWILIO_ACCOUNT_SID", ""),
  TWILIO_API_KEY: get("TWILIO_API_KEY", ""),
  TWILIO_API_SECRET: get("TWILIO_API_SECRET", ""),
  TWILIO_CHAT_SERVICE_SID: get("TWILIO_CHAT_SERVICE_SID", ""),
  TWILIO_SYNC_SERVICE_SID: get("TWILIO_SYNC_SERVICE_SID", ""),
  TIWLIO_AUTH_TOKEN: get("TIWLIO_AUTH_TOKEN", ""),
  TWILIO_FCM_CREDENTIAL_SID: get("TWILIO_FCM_CREDENTIAL_SID", ""),
};
