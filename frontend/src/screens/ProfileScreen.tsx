import { useQuery } from "@tanstack/react-query";
import { View, Text, Image, Pressable, RefreshControl, FlatList } from "react-native";
import { removeToken } from "../utils/storage";
import { fetchProfile } from "../services/profile.service";
import useAuthInterceptor from "../hooks/useAuthInterceptor";
import Button from "../components/Button";

export default function ProfileScreen() {
  useAuthInterceptor();
  const { data, isLoading, refetch, isRefetching } = useQuery(["profile"], fetchProfile, { refetchOnWindowFocus: false });
  const profile = data?.data?.profile;

  const handleLogout = async () => {
    await removeToken();
  };

  return (
    <View className="flex-1 bg-background px-md py-lg">
      <View className="bg-surface border border-cream-dark rounded-card p-4 shadow-card mb-6 items-center">
        {profile?.avatar ? (
          <Image source={{ uri: profile.avatar }} className="w-24 h-24 rounded-avatar mb-4" />
        ) : (
          <View className="w-24 h-24 rounded-avatar bg-pink justify-center items-center mb-4">
            <Text className="text-white font-bold text-[24px]">{profile?.name?.slice(0, 2).toUpperCase()}</Text>
          </View>
        )}
        <Text className="text-heading-lg text-text mb-1">{profile?.name || "Creator"}</Text>
        <Text className="text-body text-text-muted mb-4">{profile?.bio || "Analytics companion for your creator journey."}</Text>
        <View className="flex-row gap-4">
          <View>
            <Text className="text-caption text-text-muted">Followers</Text>
            <Text className="text-[20px] font-bold text-text">{profile?.followerCount ?? 0}</Text>
          </View>
          <View>
            <Text className="text-caption text-text-muted">Following</Text>
            <Text className="text-[20px] font-bold text-text">{profile?.followingCount ?? 0}</Text>
          </View>
        </View>
      </View>

      <FlatList
        data={[{ id: "logout" }]}
        keyExtractor={(item) => item.id}
        renderItem={() => (
          <Button label="Logout" onPress={handleLogout} secondary />
        )}
        refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={refetch} tintColor="#BF1A1A" colors={["#BF1A1A"]} />}
        ListEmptyComponent={() => null}
      />
    </View>
  );
}
