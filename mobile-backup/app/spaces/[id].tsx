import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Typography, Spacing, Radii } from '../../src/theme';
import { Button } from '../../src/components/ui/Button';
import { useStore } from '../../src/store/useStore';
import { Card } from '../../src/components/ui/Card';
import { supabase } from '../../src/lib/supabase';

type Room = {
  id: string;
  title: string;
};

export default function SpaceDetail() {
  const { id } = useLocalSearchParams();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [activeRoomId, setActiveRoomId] = useState<string | null>(null);
  
  const space = useStore(state => state.spaces.find(s => s.id === id));
  
  // Filter posts by space and active room
  const posts = useStore(state => state.posts.filter(p => 
    p.spaceId === id && (!activeRoomId || p.roomId === activeRoomId)
  ));
  
  const joinSpace = useStore(state => state.joinSpace);
  const leaveSpace = useStore(state => state.leaveSpace);

  useEffect(() => {
    if (id) {
      supabase.from('rooms').select('*').eq('space_id', id).order('created_at').then(({ data }) => {
        if (data && data.length > 0) {
          setRooms(data);
          setActiveRoomId(data[0].id);
        }
      });
    }
  }, [id]);

  if (!space) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.emptyText}>Space not found.</Text>
        <Button size="sm" onPress={() => router.back()}>Go Back</Button>
      </SafeAreaView>
    );
  }

  const handleJoinToggle = () => {
    if (space.isJoined) {
      leaveSpace(space.id);
    } else {
      joinSpace(space.id);
    }
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.coverImagePlaceholder}>
        <Text style={{color: Colors.onSurfaceVariant}}>Space Cover</Text>
      </View>
      <SafeAreaView style={styles.content}>
        <View style={styles.header}>
          <View style={styles.titleRow}>
            <Text style={styles.title}>{space.title}</Text>
            <Button 
              variant={space.isJoined ? "secondary" : "primary"}
              size="sm" 
              onPress={handleJoinToggle}
            >
              {space.isJoined ? "Joined" : "Join"}
            </Button>
          </View>
          <Text style={styles.memberCount}>{space.memberCount.toLocaleString()} Members</Text>
          <Text style={styles.description}>{space.desc}</Text>
        </View>
        
        {/* Rooms Horizontal List */}
        {rooms.length > 0 && (
          <View style={styles.roomsContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: Spacing.lg }}>
              {rooms.map(room => (
                <TouchableOpacity 
                  key={room.id}
                  style={[styles.roomChip, activeRoomId === room.id && styles.roomChipActive]}
                  onPress={() => setActiveRoomId(room.id)}
                >
                  <Text style={[styles.roomText, activeRoomId === room.id && styles.roomTextActive]}>
                    # {room.title.toLowerCase()}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}
        
        <ScrollView style={styles.feed} contentContainerStyle={{paddingBottom: 40}}>
           {posts.length === 0 ? (
             <Text style={styles.emptyText}>No posts yet. Be the first!</Text>
           ) : (
             posts.map(post => (
               <Card key={post.id} style={{marginBottom: Spacing.md}}>
                 <Text style={{color: Colors.onSurface, fontWeight: 'bold', marginBottom: Spacing.xs}}>{post.title}</Text>
                 <Text style={{color: Colors.onSurfaceVariant}}>{post.content}</Text>
               </Card>
             ))
           )}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  coverImagePlaceholder: { height: 150, backgroundColor: Colors.surfaceVariant, alignItems: 'center', justifyContent: 'center' },
  content: { flex: 1, marginTop: -40 },
  header: { padding: Spacing.lg, backgroundColor: Colors.background, borderTopLeftRadius: Spacing.xl, borderTopRightRadius: Spacing.xl },
  titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  title: { flex: 1, color: Colors.onBackground, fontFamily: Typography.fonts.display, fontSize: Typography.sizes.headlineSm, fontWeight: 'bold', marginRight: Spacing.md },
  memberCount: { color: Colors.onSurfaceVariant, fontFamily: Typography.fonts.body, fontSize: Typography.sizes.labelMd, marginTop: Spacing.xs },
  description: { color: Colors.onSurface, fontFamily: Typography.fonts.body, fontSize: Typography.sizes.bodyMd, marginTop: Spacing.sm, lineHeight: 22 },
  roomsContainer: { paddingVertical: Spacing.md, borderBottomWidth: 1, borderBottomColor: Colors.outlineVariant },
  roomChip: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: Colors.surface, marginRight: Spacing.sm, borderWidth: 1, borderColor: Colors.outline },
  roomChipActive: { backgroundColor: Colors.primaryContainer, borderColor: Colors.primary },
  roomText: { color: Colors.onSurfaceVariant, fontFamily: Typography.fonts.body, fontWeight: '600' },
  roomTextActive: { color: Colors.primary },
  feed: { flex: 1, padding: Spacing.lg },
  emptyText: { color: Colors.onSurfaceVariant, fontFamily: Typography.fonts.body, textAlign: 'center', marginTop: Spacing.xl }
});
