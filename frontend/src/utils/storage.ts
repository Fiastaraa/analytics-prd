import * as SecureStore from "expo-secure-store";

const TOKEN_KEY = "creator_analytics_token";

export async function saveToken(token: string) {
  await SecureStore.setItemAsync(TOKEN_KEY, token, { service: TOKEN_KEY });
}

export async function getToken() {
  return SecureStore.getItemAsync(TOKEN_KEY, { service: TOKEN_KEY });
}

export async function removeToken() {
  await SecureStore.deleteItemAsync(TOKEN_KEY, { service: TOKEN_KEY });
}
