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

import { fetchTopThreads, TopThread } from '../api/analytics.api';
import { useAuth } from '../context/AuthContext';
import ThreadItem from '../components/ThreadItem';
import SkeletonCard from '../components/SkeletonCard';
import EmptyState from '../components/EmptyState';
import { Colors } from '../constants/colors';

const AnalyticsScreen = () => {
  const { user } = useAuth();

  const {
    data: threads,
    isLoading,
    isRefetching,
    refetch,
  } = useQuery<TopThread[]>({
    queryKey: ['topThreads'],
    queryFn: fetchTopThreads,
  });

  const onRefresh = useCallback(async () => {
    await refetch();
  }, [refetch]);

  const renderItem = useCallback(
    ({ item }: { item: TopThread }) => <ThreadItem item={item} />,
    []
  );

  const keyExtractor = useCallback((item: TopThread) => item.id, []);

  const ItemSeparator = useCallback(
    () => <View style={styles.separator} />,
    []
  );

  const avatarInitials = user?.username
    ? user.username.slice(0, 2).toUpperCase()
    : 'CR';

  if (isLoading) {
    return (
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Top Performing Threads</Text>
          <View style={styles.avatarSmall}>
            <Text style={styles.avatarSmallText}>{avatarInitials}</Text>
          </View>
        </View>
        <View style={styles.skeletonContainer}>
          {[1, 2, 3, 4, 5].map((i) => (
            <SkeletonCard key={i} height={90} style={styles.skeletonItem} />
          ))}
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <FlatList
        data={threads ?? []}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        ItemSeparatorComponent={null}
        ListHeaderComponent={
          <View>
            <View style={styles.header}>
              <Text style={styles.headerTitle}>Top Performing Threads</Text>
              <View style={styles.avatarSmall}>
                <Text style={styles.avatarSmallText}>{avatarInitials}</Text>
              </View>
            </View>
          </View>
        }
        ListEmptyComponent={
          <EmptyState
            icon="edit-2"
            title="No threads yet"
            description="Create your first post on the web app and it will appear here."
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
        // Performance props
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.primary,
    flex: 1,
    marginRight: 12,
  },
  avatarSmall: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.pink,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarSmallText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 32,
  },
  separator: {
    height: 0,
  },
  skeletonContainer: {
    paddingHorizontal: 20,
    gap: 12,
  },
  skeletonItem: {
    borderRadius: 12,
    marginBottom: 12,
  },
});

export default AnalyticsScreen;
