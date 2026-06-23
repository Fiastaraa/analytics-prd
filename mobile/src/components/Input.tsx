import React from 'react';
import { Text, TextInput, TextInputProps, StyleSheet, View } from 'react-native';
import { Colors } from '../constants/colors';

type InputProps = TextInputProps & {
  label: string;
};

const Input: React.FC<InputProps> = ({ label, ...rest }) => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        placeholderTextColor={Colors.textMuted}
        {...rest}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: { marginBottom: 14 },
  label: {
    fontSize: 13,
    fontWeight: '500',
    color: Colors.textMuted,
    marginBottom: 6,
  },
  input: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.surface,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 14,
    color: Colors.text,
  },
});

export default Input;
