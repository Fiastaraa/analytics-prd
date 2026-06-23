import { useState } from "react";
import { View, Text, TextInput, Pressable, KeyboardAvoidingView, Platform, Alert } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import { login } from "../services/auth.service";
import useAuthInterceptor from "../hooks/useAuthInterceptor";
import Button from "../components/Button";

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

export default function LoginScreen({ navigation }: Props) {
  const [email, setEmail] = useState("creator@example.com");
  const [password, setPassword] = useState("password123");
  const [loading, setLoading] = useState(false);

  useAuthInterceptor();

  const handleLogin = async () => {
    setLoading(true);
    try {
      await login(email, password);
      navigation.replace("Main");
    } catch (error) {
      Alert.alert("Login failed", "Please check your email and password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} className="flex-1 bg-background px-md py-lg">
      <View className="flex-1 justify-center">
        <Text className="text-[24px] font-bold text-text mb-2">Creator Analytics Hub</Text>
        <Text className="text-caption text-text-muted mb-8">Sign in to review your creator performance and engagement trends.</Text>
        <View className="bg-surface border border-cream-dark rounded-card p-4 shadow-card">
          <Text className="text-caption text-text-muted uppercase mb-2">Email</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            placeholderTextColor="#7A5555"
            keyboardType="email-address"
            autoCapitalize="none"
            className="bg-background rounded-input px-3 py-3 mb-4 text-text"
          />
          <Text className="text-caption text-text-muted uppercase mb-2">Password</Text>
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Password"
            placeholderTextColor="#7A5555"
            secureTextEntry
            className="bg-background rounded-input px-3 py-3 mb-6 text-text"
          />
          <Button label="Sign In" onPress={handleLogin} loading={loading} />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
