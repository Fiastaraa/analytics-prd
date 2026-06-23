import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Colors } from '../constants/colors';
import { TopThread } from '../api/analytics.api';

type ThreadItemProps = {
  item: TopThread;
};

const ThreadItem: React.FC<ThreadItemProps> = React.memo(({ item }) => {
  return (
    <View style={styles.card}>
      {/* Content */}
      <Text numberOfLines={2} style={styles.content}>
        {item.content}
      </Text>

      {/* Metrics Row */}
      <View style={styles.metricsRow}>
        <View style={styles.metricItem}>
          <Feather name="heart" size={16} color={Colors.primary} />
          <Text style={styles.metricText}>{item.total_likes}</Text>
        </View>

        <View style={styles.metricItem}>
          <Feather name="message-square" size={16} color={Colors.primary} />
          <Text style={styles.metricText}>{item.total_replies}</Text>
        </View>

        <View style={[styles.metricItem, styles.metricRight]}>
          <Feather name="trending-up" size={14} color={Colors.primary} />
          <Text style={styles.metricText}>{item.total_engagement} eng.</Text>
        </View>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderColor: Colors.border,
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 12,
    shadowColor: '#2A1A1A',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  content: {
    fontSize: 14,
    lineHeight: 20,
    color: Colors.text,
    marginBottom: 12,
  },
  metricsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metricItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  metricRight: {
    marginLeft: 'auto',
    marginRight: 0,
  },
  metricText: {
    fontSize: 13,
    color: Colors.textMuted,
    marginLeft: 5,
  },
});

export default ThreadItem;
