import { View, Text } from "react-native";
import { ReactNode } from "react";

type MetricCardProps = {
  label: string;
  value: string;
  icon: ReactNode;
  trendLabel: string;
  trendPositive?: boolean;
};

export default function MetricCard({ label, value, icon, trendLabel, trendPositive }: MetricCardProps) {
  return (
    <View className="bg-surface border border-cream-dark rounded-card p-4 shadow-card">
      <View className="flex-row items-center justify-between mb-3"> 
        {icon}
      </View>
      <Text className="text-caption text-text-muted uppercase mb-2">{label}</Text>
      <Text className="text-[28px] font-bold text-text">{value}</Text>
      <View className={`mt-3 rounded-badge px-2 py-1 ${trendPositive ? "bg-success-bg" : "bg-primary-bg"}`}>
        <Text className={`text-[11px] font-semibold ${trendPositive ? "text-success" : "text-primary"}`}>{trendLabel}</Text>
      </View>
    </View>
  );
}
