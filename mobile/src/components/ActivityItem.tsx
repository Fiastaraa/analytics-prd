import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Alert } from 'react-native';
import { Colors } from '../constants/colors';
import { ActivityItem as ActivityType } from '../api/analytics.api';

type ActivityItemProps = {
  item: ActivityType;
};

const getInitials = (username: string) => {
  if (!username) return '??';
  return username.slice(0, 2).toUpperCase();
};

const isNewActivity = (createdAt: string) => {
  try {
    const diffMs = new Date().getTime() - new Date(createdAt).getTime();
    const diffHours = diffMs / (1000 * 60 * 60);
    return diffHours > 0 && diffHours < 1;
  } catch {
    return false;
  }
};

const formatTimeAgo = (createdAt: string) => {
  try {
    const diffMs = new Date().getTime() - new Date(createdAt).getTime();
    const mins = Math.floor(diffMs / (1000 * 60));
    if (mins < 1) return 'Just now';
    if (mins < 60) return `${mins}m ago`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  } catch {
    return 'some time ago';
  }
};

const ActivityItem: React.FC<ActivityItemProps> = React.memo(({ item }) => {
  const [isFollowed, setIsFollowed] = useState(false);
  const initials = getInitials(item.actor.username);
  const showNewDot = isNewActivity(item.created_at);
  const timeDisplay = formatTimeAgo(item.created_at);

  const handleFollowBack = () => {
    setIsFollowed(true);
    Alert.alert('Success', `You followed back @${item.actor.username}`);
  };

  let actionText = '';
  if (item.type === 'LIKE') actionText = 'liked your thread';
  else if (item.type === 'REPLY') actionText = 'replied to your thread';
  else if (item.type === 'FOLLOW') actionText = 'started following you';

  return (
    <View style={styles.container}>
      {/* Avatar Column */}
      <View style={styles.avatarContainer}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{initials}</Text>
        </View>
        {showNewDot && <View style={styles.newDot} />}
      </View>

      {/* Content Column */}
      <View style={styles.contentCol}>
        {/* Action row */}
        <View style={styles.actionRow}>
          <Text style={styles.actionText} numberOfLines={2}>
            <Text style={styles.username}>@{item.actor.username}</Text>
            {'  '}{actionText}
          </Text>
          <Text style={styles.timestamp}>{timeDisplay}</Text>
        </View>

        {/* LIKE: italic snippet */}
        {item.type === 'LIKE' && item.thread_content ? (
          <Text style={styles.snippet} numberOfLines={1}>
            "{item.thread_content}"
          </Text>
        ) : null}

        {/* REPLY: quote bubble */}
        {item.type === 'REPLY' && item.reply_content ? (
          <View style={styles.quoteBubble}>
            <Text style={styles.quoteText}>{item.reply_content}</Text>
          </View>
        ) : null}

        {/* FOLLOW: follow back button */}
        {item.type === 'FOLLOW' ? (
          <Pressable
            onPress={handleFollowBack}
            disabled={isFollowed}
            style={[styles.followBtn, isFollowed && styles.followBtnDisabled]}
          >
            <Text style={[styles.followBtnText, isFollowed && styles.followBtnTextDisabled]}>
              {isFollowed ? 'Followed' : 'Follow Back'}
            </Text>
          </Pressable>
        ) : null}
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    shadowColor: '#2A1A1A',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  avatarContainer: {
    width: 40,
    height: 40,
    marginRight: 12,
    position: 'relative',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.pink,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  newDot: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.primary,
    borderWidth: 2,
    borderColor: Colors.surface,
  },
  contentCol: {
    flex: 1,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  actionText: {
    flex: 1,
    fontSize: 13,
    color: Colors.text,
    lineHeight: 18,
    marginRight: 8,
  },
  username: {
    fontWeight: '700',
    color: Colors.text,
  },
  timestamp: {
    fontSize: 11,
    color: Colors.textMuted,
    flexShrink: 0,
  },
  snippet: {
    fontStyle: 'italic',
    fontSize: 12,
    color: Colors.textMuted,
    lineHeight: 17,
  },
  quoteBubble: {
    backgroundColor: Colors.background,
    borderLeftWidth: 3,
    borderLeftColor: Colors.pink,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 4,
    marginTop: 4,
  },
  quoteText: {
    fontStyle: 'italic',
    fontSize: 12,
    color: Colors.text,
    lineHeight: 17,
  },
  followBtn: {
    alignSelf: 'flex-start',
    marginTop: 6,
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 12,
    backgroundColor: 'transparent',
  },
  followBtnDisabled: {
    borderColor: Colors.textMuted,
    opacity: 0.6,
  },
  followBtnText: {
    fontSize: 12,
    fontWeight: '500',
    color: Colors.primary,
  },
  followBtnTextDisabled: {
    color: Colors.textMuted,
  },
});

export default ActivityItem;
