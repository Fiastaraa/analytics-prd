import { useMemo } from "react";
import { View, Text, FlatList, RefreshControl } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { FontAwesome5 } from "@expo/vector-icons";
import { fetchDashboard } from "../services/analytics.service";
import MetricCard from "../components/MetricCard";
import SkeletonCard from "../components/SkeletonCard";

const metrics = [
  { key: "threads", label: "Total threads", icon: <FontAwesome5 name="feather-alt" size={20} color="#BF1A1A" /> },
  { key: "likes", label: "Total likes", icon: <FontAwesome5 name="heart" size={20} color="#BF1A1A" /> },
  { key: "replies", label: "Total replies", icon: <FontAwesome5 name="comment" size={20} color="#BF1A1A" /> },
  { key: "followers", label: "Followers", icon: <FontAwesome5 name="users" size={20} color="#BF1A1A" /> },
];

export default function HomeScreen() {
  const { data, isLoading, refetch, isRefetching } = useQuery(["dashboard"], fetchDashboard, { refetchOnWindowFocus: false });

  const trendLabel = useMemo(() => {
    if (!data?.data?.weeklyTrend?.length) return "No trend data";
    const last = data.data.weeklyTrend[data.data.weeklyTrend.length - 1]?.engagement || 0;
    return `${last} engagements this week`;
  }, [data]);

  const renderMetric = ({ item }: { item: typeof metrics[0] }) => {
    const value = data?.data ? String(data.data[item.key]) : "0";
    return (
      <MetricCard label={item.label} value={value} icon={item.icon} trendLabel={trendLabel} trendPositive={true} />
    );
  };

  return (
    <View className="flex-1 bg-background px-md py-lg">
      <Text className="text-[24px] font-bold text-text mb-1">Dashboard</Text>
      <Text className="text-caption text-text-muted mb-6">Quick insight into your content performance and audience growth.</Text>

      {isLoading ? (
        <>
          <SkeletonCard />
          <SkeletonCard />
        </>
      ) : (
        <FlatList
          data={metrics}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          keyExtractor={(item) => item.key}
          renderItem={renderMetric}
          refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={refetch} tintColor="#BF1A1A" colors={["#BF1A1A"]} />}
          ListFooterComponent={() => (
            <View className="mt-6 bg-primary rounded-card p-4">
              <Text className="text-white text-heading-md mb-2">Weekly engagement trend</Text>
              <Text className="text-white text-body">{trendLabel}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}
