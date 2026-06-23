import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../constants/colors';

type SectionHeaderProps = {
  title: string;
  description?: string;
};

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, description }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {description ? <Text style={styles.description}>{description}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginBottom: 16 },
  title: { fontSize: 20, fontWeight: '600', color: Colors.text },
  description: { marginTop: 4, fontSize: 13, color: Colors.textMuted },
});

export default SectionHeader;
