import React, { useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { LineChart } from 'react-native-chart-kit';
import { Feather } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

import { fetchDashboardSummary, DashboardSummary } from '../api/analytics.api';
import { useAuth } from '../context/AuthContext';
import MetricCard from '../components/MetricCard';
import SkeletonCard from '../components/SkeletonCard';
import { Colors } from '../constants/colors';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const formatNumber = (n: number) => {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return `${n}`;
};

const HomeScreen = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const {
    data: summary,
    isLoading,
    isRefetching,
    refetch,
  } = useQuery<DashboardSummary>({ queryKey: ['dashboardSummary'], queryFn: fetchDashboardSummary });

  const onRefresh = useCallback(async () => {
    await refetch();
  }, [refetch]);

  // Placeholder weekly trend data — 7 data points
  const trendLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const trendData = summary
    ? [
        Math.round((summary.total_likes + summary.total_replies) * 0.55),
        Math.round((summary.total_likes + summary.total_replies) * 0.62),
        Math.round((summary.total_likes + summary.total_replies) * 0.7),
        Math.round((summary.total_likes + summary.total_replies) * 0.78),
        Math.round((summary.total_likes + summary.total_replies) * 0.88),
        Math.round((summary.total_likes + summary.total_replies) * 0.94),
        summary.total_likes + summary.total_replies,
      ]
    : [30, 45, 55, 70, 80, 90, 100];

  const avatarInitials = user?.username
    ? user.username.slice(0, 2).toUpperCase()
    : 'CR';

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={onRefresh}
            tintColor={Colors.primary}
            colors={[Colors.primary]}
          />
        }
      >
        {/* ─── Header Row ─── */}
        <View style={styles.headerRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.greeting}>Hello, @{user?.username ?? 'creator'}!</Text>
            <Text style={styles.greetingSub}>Here is your performance overview.</Text>
          </View>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{avatarInitials}</Text>
          </View>
        </View>

        {/* ─── Quick Insight Banner ─── */}
        <View style={styles.insightCard}>
          <View style={{ flex: 1 }}>
            <Text style={styles.insightLabel}>QUICK INSIGHT</Text>
            <Text style={styles.insightText}>Your engagement is up this week! 🚀</Text>
          </View>
          <Feather name="trending-up" size={28} color="#FFFFFF" />
        </View>

        {/* ─── 2×2 Metric Grid ─── */}
        <Text style={styles.sectionTitle}>Analytics Summary</Text>

        {isLoading ? (
          <View style={styles.skeletonGrid}>
            <SkeletonCard height={110} style={styles.skeletonHalf} />
            <SkeletonCard height={110} style={styles.skeletonHalf} />
            <SkeletonCard height={110} style={[styles.skeletonHalf, { marginTop: 12 }]} />
            <SkeletonCard height={110} style={[styles.skeletonHalf, { marginTop: 12 }]} />
          </View>
        ) : (
          <View style={styles.metricGrid}>
            <MetricCard
              icon="users"
              label="Followers"
              value={formatNumber(summary?.total_followers ?? 0)}
              trendText="12%"
              trendUp
            />
            <MetricCard
              icon="message-square"
              label="Threads"
              value={formatNumber(summary?.total_threads ?? 0)}
              trendText="5%"
              trendUp
            />
            <MetricCard
              icon="heart"
              label="Likes"
              value={formatNumber(summary?.total_likes ?? 0)}
              trendText="24%"
              trendUp
            />
            <MetricCard
              icon="corner-up-left"
              label="Replies"
              value={formatNumber(summary?.total_replies ?? 0)}
              trendText="8%"
              trendUp
            />
          </View>
        )}

        {/* ─── Weekly Trend Chart ─── */}
        <View style={styles.chartHeader}>
          <Text style={styles.sectionTitle}>Weekly Trend</Text>
          <Text style={styles.viewDetails}>View Details</Text>
        </View>

        <View style={styles.chartCard}>
          <LineChart
            data={{
              labels: trendLabels,
              datasets: [{ data: trendData }],
            }}
            width={SCREEN_WIDTH - 80}
            height={180}
            yAxisLabel=""
            yAxisSuffix=""
            withInnerLines={false}
            withOuterLines={false}
            chartConfig={{
              backgroundColor: Colors.surface,
              backgroundGradientFrom: Colors.surface,
              backgroundGradientTo: Colors.surface,
              decimalPlaces: 0,
              color: () => Colors.primary,
              labelColor: () => Colors.textMuted,
              propsForDots: {
                r: '4',
                strokeWidth: '2',
                stroke: Colors.primary,
                fill: Colors.surface,
              },
            }}
            bezier
            style={{ borderRadius: 12 }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scroll: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 32,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  greeting: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.text,
  },
  greetingSub: {
    fontSize: 13,
    color: Colors.textMuted,
    marginTop: 2,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.pink,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  insightCard: {
    backgroundColor: Colors.primary,
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  insightLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.75)',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  insightText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 12,
  },
  metricGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 28,
  },
  skeletonGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 28,
  },
  skeletonHalf: {
    width: '47%',
    borderRadius: 16,
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  viewDetails: {
    fontSize: 13,
    color: Colors.primary,
    fontWeight: '600',
  },
  chartCard: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#2A1A1A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
});

export default HomeScreen;
