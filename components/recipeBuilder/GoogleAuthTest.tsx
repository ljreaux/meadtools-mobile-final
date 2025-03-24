import React, { useState } from "react";
import { View, ActivityIndicator, Alert } from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import SectionCard from "./SectionCard";
import { Text } from "../ui/text";
import { Button } from "../ui/button";

// Google OAuth credentials
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID!; // ✅ Use Web Client ID
const NEXTAUTH_URL = "https://meadtools.com/api/auth/callback/google"; // Your Next.js API URL

// Ensure WebBrowser session is handled properly
WebBrowser.maybeCompleteAuthSession();

const GoogleAuthTest = () => {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Generate a proper redirect URI (for both Expo Go and standalone builds)
  const redirectUri = Linking.createURL("/oauth2redirect/google");

  // Function to handle Google Sign-In via Web Browser
  const signInWithGoogle = async () => {
    try {
      setLoading(true);
      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}
        &redirect_uri=${encodeURIComponent(redirectUri)}
        &response_type=code
        &scope=openid%20profile%20email
        &access_type=offline`;

      const result = await WebBrowser.openAuthSessionAsync(
        authUrl,
        redirectUri
      );

      if (result.type === "success" && result.url) {
        const code = new URL(result.url).searchParams.get("code");
        if (code) {
          console.log("Authorization Code:", code);

          // Exchange the code for a JWT from NextAuth
          const response = await axios.post(NEXTAUTH_URL, { code });

          if (response.data?.accessToken) {
            await SecureStore.setItemAsync(
              "authToken",
              response.data.accessToken
            );
            setToken(response.data.accessToken);
            console.log("JWT received:", response.data.accessToken);
          } else {
            console.error("Failed to retrieve JWT from NextAuth");
          }
        }
      } else {
        console.warn("Google sign-in was canceled or failed.");
      }
    } catch (error) {
      console.error("Google Auth Error:", error);
      Alert.alert(
        "Authentication Error",
        "Something went wrong with Google login."
      );
    } finally {
      setLoading(false);
    }
  };

  // Function to fetch protected API data using the stored JWT
  const fetchProtectedData = async () => {
    try {
      const storedToken = await SecureStore.getItemAsync("authToken");
      if (!storedToken) {
        Alert.alert("No Token", "Please sign in first.");
        return;
      }

      const response = await axios.get(
        "https://meadtools.com/api/auth/account-info",
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      );

      console.log("Protected Data:", response.data);
    } catch (error) {
      console.error("Error fetching protected data:", error);
      Alert.alert("Error", "Failed to fetch protected data.");
    }
  };

  return (
    <SectionCard>
      <View>
        <Text style={{ fontSize: 20, marginBottom: 20 }}>Google Auth Test</Text>
        {loading ? (
          <ActivityIndicator size="large" color="blue" />
        ) : (
          <Button onPress={signInWithGoogle}>
            <Text>Sign in with Google</Text>
          </Button>
        )}
        {token && (
          <>
            <Text style={{ marginTop: 20 }}>
              JWT: {token.substring(0, 20)}...
            </Text>
            <Button onPress={fetchProtectedData}>
              <Text>Fetch Protected Data</Text>
            </Button>
          </>
        )}
      </View>
    </SectionCard>
  );
};

export default GoogleAuthTest;
