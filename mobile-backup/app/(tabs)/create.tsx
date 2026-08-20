import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, Platform, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Colors, Typography, Spacing, Radii } from '../../src/theme';
import { Button } from '../../src/components/ui/Button';
import { useStore } from '../../src/store/useStore';

export default function CreateTab() {
  const [activeTab, setActiveTab] = useState<'standard' | 'poll'>('standard');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [pollOptions, setPollOptions] = useState<string[]>(['', '']);
  const [selectedSpaceId, setSelectedSpaceId] = useState<string | null>(null);
  
  const allSpaces = useStore(state => state.spaces);
  const spaces = allSpaces.filter(s => s.isJoined);
  const addPost = useStore(state => state.addPost);

  const handlePublish = async () => {
    if (!title || !selectedSpaceId) return;
    if (activeTab === 'standard' && !content) return;
    if (activeTab === 'poll' && pollOptions.filter(o => o.trim() !== '').length < 2) return;
    
    await addPost({
      title,
      content,
      spaceId: selectedSpaceId,
      image: null,
      postType: activeTab,
      pollOptions: activeTab === 'poll' 
        ? pollOptions.filter(o => o.trim() !== '').map(text => ({ id: Math.random().toString(36).slice(2), text, votes: 0 }))
        : undefined
    });
    
    setTitle('');
    setContent('');
    setPollOptions(['', '']);
    setSelectedSpaceId(null);
    router.push('/(tabs)');
  };

  const updatePollOption = (index: number, value: string) => {
    const newOptions = [...pollOptions];
    newOptions[index] = value;
    setPollOptions(newOptions);
  };

  const addPollOption = () => {
    if (pollOptions.length < 6) {
      setPollOptions([...pollOptions, '']);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView style={styles.keyboardView} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>Create</Text>
          <Button size="sm" disabled={!title || !selectedSpaceId || (activeTab === 'standard' && !content) || (activeTab === 'poll' && pollOptions.filter(o => o.trim() !== '').length < 2)} onPress={handlePublish}>
            Publish
          </Button>
        </View>
        
        <View style={styles.tabsContainer}>
          <TouchableOpacity style={activeTab === 'standard' ? styles.tabActive : styles.tabInactive} onPress={() => setActiveTab('standard')}>
            <Text style={activeTab === 'standard' ? styles.tabTextActive : styles.tabTextInactive}>Post</Text>
          </TouchableOpacity>
          <TouchableOpacity style={activeTab === 'poll' ? styles.tabActive : styles.tabInactive} onPress={() => setActiveTab('poll')}>
            <Text style={activeTab === 'poll' ? styles.tabTextActive : styles.tabTextInactive}>Poll</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
          <Text style={styles.label}>Select Space</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.spaceSelector}>
            {spaces.length === 0 ? (
              <Text style={styles.emptyText}>Join a space first!</Text>
            ) : (
              spaces.map(space => (
                <Button key={space.id} variant={selectedSpaceId === space.id ? 'primary' : 'outline'} size="sm" style={styles.spaceChip} onPress={() => setSelectedSpaceId(space.id)}>
                  {space.title}
                </Button>
              ))
            )}
          </ScrollView>

          <TextInput style={styles.titleInput} placeholder={activeTab === 'poll' ? "Ask a question..." : "An interesting title..."} placeholderTextColor={Colors.onSurfaceVariant} value={title} onChangeText={setTitle} maxLength={100} />
          
          {activeTab === 'standard' ? (
            <TextInput style={styles.contentInput} placeholder="Share your thoughts, links, or context..." placeholderTextColor={Colors.outline} value={content} onChangeText={setContent} multiline textAlignVertical="top" />
          ) : (
            <View style={styles.pollContainer}>
              <TextInput style={styles.contentInputPollDesc} placeholder="Add context (optional)..." placeholderTextColor={Colors.outline} value={content} onChangeText={setContent} multiline />
              {pollOptions.map((opt, idx) => (
                <TextInput key={idx} style={styles.pollInput} placeholder={`Option ${idx + 1}`} placeholderTextColor={Colors.onSurfaceVariant} value={opt} onChangeText={(val) => updatePollOption(idx, val)} />
              ))}
              {pollOptions.length < 6 && (
                <Button variant="ghost" onPress={addPollOption} style={{ alignSelf: 'flex-start', marginTop: 8 }}>+ Add Option</Button>
              )}
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.background },
  keyboardView: { flex: 1 },
  headerContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: Spacing.md, height: 64, borderBottomWidth: 1, borderBottomColor: Colors.outline },
  headerTitle: { color: Colors.onBackground, fontFamily: Typography.fonts.display, fontSize: 20, fontWeight: 'bold' },
  tabsContainer: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: Colors.outline },
  tabActive: { paddingHorizontal: Spacing.md, paddingVertical: Spacing.sm, borderBottomWidth: 2, borderBottomColor: Colors.primary },
  tabTextActive: { color: Colors.primary, fontFamily: Typography.fonts.body, fontSize: 16, fontWeight: 'bold' },
  tabInactive: { paddingHorizontal: Spacing.md, paddingVertical: Spacing.sm },
  tabTextInactive: { color: Colors.onSurfaceVariant, fontFamily: Typography.fonts.body, fontSize: 16 },
  container: { flex: 1, backgroundColor: Colors.background },
  scrollContent: { padding: Spacing.md, gap: Spacing.md },
  label: { color: Colors.onSurfaceVariant, fontFamily: Typography.fonts.body, fontSize: 14, marginBottom: Spacing.xs },
  spaceSelector: { marginBottom: Spacing.md },
  spaceChip: { marginRight: Spacing.sm },
  titleInput: { color: Colors.onSurface, fontFamily: Typography.fonts.display, fontSize: 24, fontWeight: 'bold', marginBottom: Spacing.md },
  contentInput: { color: Colors.onSurface, fontFamily: Typography.fonts.body, fontSize: 18, minHeight: 200, lineHeight: 26 },
  contentInputPollDesc: { color: Colors.onSurface, fontFamily: Typography.fonts.body, fontSize: 16, minHeight: 60, marginBottom: Spacing.md },
  emptyText: { color: Colors.error, fontFamily: Typography.fonts.body },
  pollContainer: { gap: Spacing.sm },
  pollInput: { backgroundColor: Colors.surface, color: Colors.onSurface, padding: 16, borderRadius: Radii.md, fontSize: 16, borderWidth: 1, borderColor: Colors.outline },
});
