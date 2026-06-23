import React, { useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  RefreshControl,
  StyleSheet,
} from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { SafeAreaView } from 'react-native-safe-area-context';

import { fetchActivityFeed, ActivityItem as ActivityType } from '../api/analytics.api';
import ActivityItem from '../components/ActivityItem';
import SkeletonCard from '../components/SkeletonCard';
import EmptyState from '../components/EmptyState';
import { Colors } from '../constants/colors';

const ActivityScreen = () => {
  const {
    data: activity,
    isLoading,
    isRefetching,
    refetch,
  } = useQuery<ActivityType[]>({
    queryKey: ['activityFeed'],
    queryFn: fetchActivityFeed,
  });

  const onRefresh = useCallback(async () => {
    await refetch();
  }, [refetch]);

  const renderItem = useCallback(
    ({ item }: { item: ActivityType }) => <ActivityItem item={item} />,
    []
  );

  const keyExtractor = useCallback(
    (item: ActivityType, index: number) => `${item.actor.username}-${item.type}-${index}`,
    []
  );

  if (isLoading) {
    return (
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>Recent Activity</Text>
        </View>
        <View style={styles.skeletonContainer}>
          {[1, 2, 3, 4].map((i) => (
            <SkeletonCard key={i} height={90} style={styles.skeletonItem} />
          ))}
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <FlatList
        data={activity ?? []}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        ListHeaderComponent={
          <View style={styles.headerContainer}>
            <Text style={styles.headerTitle}>Recent Activity</Text>
          </View>
        }
        ListEmptyComponent={
          <EmptyState
            icon="bell"
            title="No recent activity"
            description="When someone likes, replies, or follows you, it'll appear here."
          />
        }
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={onRefresh}
            tintColor={Colors.primary}
            colors={[Colors.primary]}
          />
        }
        removeClippedSubviews
        maxToRenderPerBatch={10}
        windowSize={10}
        initialNumToRender={10}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  headerContainer: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 4,
    marginBottom: 12,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: Colors.text,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 32,
  },
  skeletonContainer: {
    paddingHorizontal: 20,
  },
  skeletonItem: {
    borderRadius: 16,
    marginBottom: 12,
  },
});

export default ActivityScreen;
