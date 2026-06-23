import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Colors } from '../constants/colors';

type MetricCardProps = {
  icon: keyof typeof Feather.glyphMap;
  label: string;
  value: string | number;
  trendText?: string;
  trendUp?: boolean;
};

const MetricCard: React.FC<MetricCardProps> = React.memo(
  ({ icon, label, value, trendText, trendUp }) => {
    return (
      <View style={styles.card}>
        <View style={styles.topRow}>
          <Text style={styles.label}>{label}</Text>
          <Feather name={icon} size={20} color={Colors.primary} />
        </View>

        <Text style={styles.value}>{value}</Text>

        {trendText ? (
          <View
            style={[
              styles.badge,
              { backgroundColor: trendUp ? Colors.successBg : Colors.primaryBg },
            ]}
          >
            <Text
              style={[
                styles.badgeText,
                { color: trendUp ? Colors.success : Colors.primary },
              ]}
            >
              {trendUp ? `↑ ${trendText}` : `↓ ${trendText}`}
            </Text>
          </View>
        ) : null}
      </View>
    );
  }
);

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: Colors.surface,
    borderColor: Colors.border,
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
    shadowColor: '#2A1A1A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  label: {
    fontSize: 11,
    color: Colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    fontWeight: '500',
  },
  value: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 8,
  },
  badge: {
    alignSelf: 'flex-start',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '500',
  },
});

export default MetricCard;
