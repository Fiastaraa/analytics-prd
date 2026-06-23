import { ActivityIndicator, Pressable, Text } from "react-native";
import { ReactNode } from "react";

type ButtonProps = {
  label: string;
  onPress: () => void;
  loading?: boolean;
  secondary?: boolean;
  icon?: ReactNode;
};

export default function Button({ label, onPress, loading, secondary, icon }: ButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={loading}
      className={`h-13 rounded-button justify-center items-center px-4 ${
        secondary ? "bg-primary-bg border border-pink-dark" : "bg-primary"
      }`}
      style={{ minHeight: 52 }}
    >
      {loading ? (
        <ActivityIndicator color="#FFFFFF" />
      ) : (
        <Text className={`${secondary ? "text-primary" : "text-white"} text-base font-semibold uppercase`}>
          {label}
        </Text>
      )}
    </Pressable>
  );
}
