import { View } from "react-native";

export default function SkeletonCard() {
  return (
    <View className="bg-cream-dark rounded-card p-4 mb-3">
      <View className="h-5 bg-[#E8E0CE] rounded-md mb-3" />
      <View className="h-8 bg-[#E8E0CE] rounded-md mb-2" />
      <View className="h-3 bg-[#E8E0CE] rounded-md w-3/4" />
    </View>
  );
}
