import { View, Text, FlatList, RefreshControl } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { fetchThreads } from "../services/analytics.service";
import ThreadItem from "../components/ThreadItem";
import SkeletonCard from "../components/SkeletonCard";

export default function AnalyticsScreen() {
  const { data, isLoading, refetch, isRefetching } = useQuery(["threads"], fetchThreads, { refetchOnWindowFocus: false });
  const threads = data?.data?.threads || [];

  return (
    <View className="flex-1 bg-background px-md py-lg">
      <Text className="text-[24px] font-bold text-text mb-1">Analytics</Text>
      <Text className="text-caption text-text-muted mb-6">Top threads sorted by engagement to help you prioritize your best content.</Text>

      {isLoading ? (
        <>
          <SkeletonCard />
          <SkeletonCard />
        </>
      ) : threads.length === 0 ? (
        <View className="flex-1 justify-center items-center">
          <Text className="text-body text-text-muted">No thread analytics available yet.</Text>
        </View>
      ) : (
        <FlatList
          data={threads}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ThreadItem title={item.title} content={item.content} likes={item.likes.length} replies={item.replies.length} />
          )}
          refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={refetch} tintColor="#BF1A1A" colors={["#BF1A1A"]} />}
        />
      )}
    </View>
  );
}
