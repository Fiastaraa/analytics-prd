import React from 'react';
import { View, Text, ViewStyle, StyleSheet } from 'react-native';
import { Colors } from '../constants/colors';

type StatCardProps = {
  label: string;
  value: string;
  style?: ViewStyle;
};

const StatCard: React.FC<StatCardProps> = ({ label, value, style }) => {
  return (
    <View style={[styles.card, style]}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.primaryBg,
    borderRadius: 16,
    padding: 16,
    marginRight: 12,
    minWidth: 100,
  },
  label: {
    fontSize: 13,
    fontWeight: '500',
    color: Colors.primary,
  },
  value: {
    marginTop: 8,
    fontSize: 22,
    fontWeight: '600',
    color: Colors.text,
  },
});

export default StatCard;
