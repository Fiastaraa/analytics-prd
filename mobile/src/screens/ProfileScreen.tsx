import React from 'react';
import {
  View,
  Text,
  Pressable,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQueryClient } from '@tanstack/react-query';

import { useAuth } from '../context/AuthContext';
import { Colors } from '../constants/colors';

type SettingRowProps = {
  icon: keyof typeof Feather.glyphMap;
  label: string;
  onPress: () => void;
};

const SettingRow: React.FC<SettingRowProps> = ({ icon, label, onPress }) => (
  <Pressable
    style={({ pressed }) => [styles.settingRow, pressed && styles.settingRowPressed]}
    onPress={onPress}
  >
    <View style={styles.settingIconWrap}>
      <Feather name={icon} size={18} color={Colors.primary} />
    </View>
    <Text style={styles.settingLabel}>{label}</Text>
    <Feather name="chevron-right" size={18} color={Colors.textMuted} />
  </Pressable>
);

const ProfileScreen = () => {
  const { user, signOut } = useAuth();
  const queryClient = useQueryClient();

  const handleSettingPress = (name: string) => {
    Alert.alert(name, 'This feature is available on the web app.');
  };

  const handleLogout = async () => {
    Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Sign Out',
        style: 'destructive',
        onPress: async () => {
          queryClient.clear();
          await signOut();
        },
      },
    ]);
  };

  const avatarInitials = user?.username
    ? user.username.slice(0, 2).toUpperCase()
    : 'CR';

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Avatar + user info ── */}
        <View style={styles.profileSection}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarText}>{avatarInitials}</Text>
          </View>
          <Text style={styles.fullName}>{user?.full_name ?? 'Creator'}</Text>
          <Text style={styles.username}>@{user?.username ?? 'username'}</Text>
          {user?.bio ? (
            <Text style={styles.bio} numberOfLines={3}>
              {user.bio}
            </Text>
          ) : null}

          {/* Stats strip */}
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{user?.email ?? '—'}</Text>
              <Text style={styles.statLabel}>Email</Text>
            </View>
          </View>
        </View>

        {/* ── Settings Card ── */}
        <View style={styles.sectionLabel}>
          <Text style={styles.sectionLabelText}>ACCOUNT</Text>
        </View>
        <View style={styles.settingsCard}>
          <SettingRow
            icon="edit"
            label="Edit Profile"
            onPress={() => handleSettingPress('Edit Profile')}
          />
          <View style={styles.divider} />
          <SettingRow
            icon="sliders"
            label="Preferences"
            onPress={() => handleSettingPress('Preferences')}
          />
          <View style={styles.divider} />
          <SettingRow
            icon="lock"
            label="Privacy"
            onPress={() => handleSettingPress('Privacy')}
          />
        </View>

        {/* ── Logout Button ── */}
        <Pressable
          style={({ pressed }) => [styles.logoutBtn, pressed && { opacity: 0.8 }]}
          onPress={handleLogout}
        >
          <Feather name="log-out" size={18} color={Colors.primary} style={styles.logoutIcon} />
          <Text style={styles.logoutText}>SIGN OUT</Text>
        </Pressable>

        <Text style={styles.versionText}>Creator Analytics Hub v1.0.0</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 40,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  avatarCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.pink,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
    // Shadow
    shadowColor: Colors.pinkDark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 6,
  },
  avatarText: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  fullName: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 4,
  },
  username: {
    fontSize: 14,
    color: Colors.textMuted,
    marginBottom: 10,
  },
  bio: {
    fontSize: 13,
    color: Colors.textMuted,
    textAlign: 'center',
    lineHeight: 18,
    maxWidth: '80%',
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingTop: 16,
    width: '100%',
    justifyContent: 'center',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.text,
  },
  statLabel: {
    fontSize: 11,
    color: Colors.textMuted,
    marginTop: 2,
  },
  sectionLabel: {
    marginBottom: 8,
  },
  sectionLabelText: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.textMuted,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  settingsCard: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    overflow: 'hidden',
    marginBottom: 24,
    shadowColor: '#2A1A1A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  settingRowPressed: {
    backgroundColor: Colors.background,
  },
  settingIconWrap: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: Colors.primaryBg,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  settingLabel: {
    flex: 1,
    fontSize: 15,
    color: Colors.text,
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginHorizontal: 16,
  },
  logoutBtn: {
    flexDirection: 'row',
    backgroundColor: Colors.primaryBg,
    borderWidth: 1,
    borderColor: Colors.pinkDark,
    borderRadius: 12,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  logoutIcon: {
    marginRight: 8,
  },
  logoutText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.primary,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  versionText: {
    textAlign: 'center',
    fontSize: 12,
    color: Colors.textMuted,
  },
});

export default ProfileScreen;
