import { View, Text } from "react-native";
import { memo } from "react";
import { FontAwesome5 } from "@expo/vector-icons";

type ThreadItemProps = {
  title: string;
  content: string;
  likes: number;
  replies: number;
};

function ThreadItemInner({ title, content, likes, replies }: ThreadItemProps) {
  return (
    <View className="bg-surface border border-cream-dark rounded-[12px] p-4 mb-3 shadow-card">
      <Text className="text-heading-md text-text mb-2" numberOfLines={1}>
        {title}
      </Text>
      <Text className="text-body text-text-muted mb-3" numberOfLines={2}>
        {content}
      </Text>
      <View className="flex-row items-center gap-4">
        <View className="flex-row items-center gap-2">
          <FontAwesome5 name="heart" size={14} color="#BF1A1A" />
          <Text className="text-[13px] text-text-muted">{likes}</Text>
        </View>
        <View className="flex-row items-center gap-2">
          <FontAwesome5 name="comments" size={14} color="#BF1A1A" />
          <Text className="text-[13px] text-text-muted">{replies}</Text>
        </View>
      </View>
    </View>
  );
}

export default memo(ThreadItemInner);
