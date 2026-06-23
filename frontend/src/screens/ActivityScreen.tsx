import { View, Text, FlatList, RefreshControl } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { fetchActivity } from "../services/analytics.service";
import ActivityItem from "../components/ActivityItem";
import SkeletonCard from "../components/SkeletonCard";

export default function ActivityScreen() {
  const { data, isLoading, refetch, isRefetching } = useQuery(["activity"], fetchActivity, { refetchOnWindowFocus: false });
  const activity = data?.data?.activity || [];

  return (
    <View className="flex-1 bg-background px-md py-lg">
      <Text className="text-[24px] font-bold text-text mb-1">Activity</Text>
      <Text className="text-caption text-text-muted mb-6">Recent likes, replies, and follows in one concise stream.</Text>

      {isLoading ? (
        <>
          <SkeletonCard />
          <SkeletonCard />
        </>
      ) : activity.length === 0 ? (
        <View className="flex-1 justify-center items-center">
          <Text className="text-body text-text-muted">No recent activity to show.</Text>
        </View>
      ) : (
        <FlatList
          data={activity}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ActivityItem
              type={item.type}
              actor={item.actorName}
              threadTitle={item.threadTitle}
              excerpt={item.excerpt}
            />
          )}
          refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={refetch} tintColor="#BF1A1A" colors={["#BF1A1A"]} />}
        />
      )}
    </View>
  );
}
