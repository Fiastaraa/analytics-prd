import { View, Text } from "react-native";
import { memo } from "react";

type ActivityItemProps = {
  type: "like" | "reply" | "follow";
  actor: string;
  threadTitle?: string;
  excerpt?: string;
};

function ActivityItem({ type, actor, threadTitle, excerpt }: ActivityItemProps) {
  const actionLabel = type === "like" ? "liked" : type === "reply" ? "replied to" : "followed you";

  return (
    <View className="bg-surface border border-cream-dark rounded-[12px] p-3 mb-3 shadow-card flex-row">
      <View className="w-10 h-10 rounded-avatar bg-pink justify-center items-center mr-3">
        <Text className="text-white font-bold">{actor.slice(0, 2).toUpperCase()}</Text>
      </View>
      <View className="flex-1">
        <Text className="text-body text-text mb-1">
          <Text className="font-semibold">{actor}</Text> {actionLabel}
          {threadTitle ? ` "${threadTitle}"` : ""}
        </Text>
        {excerpt ? (
          <View className="bg-background border-l-4 border-pink-dark px-2 py-1 rounded-sm">
            <Text className="text-caption italic text-text-muted">{excerpt}</Text>
          </View>
        ) : null}
      </View>
    </View>
  );
}

export default memo(ActivityItem);
