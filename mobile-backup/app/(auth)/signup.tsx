import React, { useState } from 'react';
import { View, StyleSheet, TextInput, KeyboardAvoidingView, Platform, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Colors, Spacing, Radius } from '../../src/theme';
import { Button } from '../../src/components/ui/Button';
import { Text } from '../../src/components/ui/Text';
import { ErrorState } from '../../src/components/ui/ErrorState';
import { AuthUseCases } from '../../src/application/authUseCases';
import { useSessionStore } from '../../src/store/useSessionStore';

export default function SignupScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const setSession = useSessionStore(state => state.setSession);

  const handleSignup = async () => {
    if (!email || !password || !name || !username) return;
    
    setIsLoading(true);
    setError(null);
    try {
      const session = await AuthUseCases.signup(email, password, name, username);
      setSession(session.user, session.profile);
      router.replace('/(tabs)');
    } catch (err: any) {
      setError(err.message || 'Signup failed');
    } finally {
      setIsLoading(false);
    }
  };

  if (error) {
    return <ErrorState message={error} onRetry={() => setError(null)} />;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.container}>
        <ScrollView contentContainerStyle={styles.content}>
          <Text variant="h1" color={Colors.textPrimary} style={styles.title}>Create Account</Text>
          <Text variant="body" color={Colors.textSecondary} style={styles.subtitle}>Find your people.</Text>

          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              placeholderTextColor={Colors.textSecondary}
              value={name}
              onChangeText={setName}
            />
            <TextInput
              style={styles.input}
              placeholder="Username"
              placeholderTextColor={Colors.textSecondary}
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor={Colors.textSecondary}
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor={Colors.textSecondary}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            
            <Button size="lg" onPress={handleSignup} isLoading={isLoading}>
              Sign Up
            </Button>
          </View>

          <View style={styles.footer}>
            <Text color={Colors.textSecondary}>Already have an account? </Text>
            <TouchableOpacity onPress={() => router.back()}>
              <Text color={Colors.primary} variant="label">Sign in</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.background },
  container: { flex: 1 },
  content: { padding: Spacing.xl, paddingTop: Spacing.xl * 2 },
  title: { marginBottom: Spacing.xs },
  subtitle: { marginBottom: Spacing.xxxl },
  form: { gap: Spacing.md },
  input: { 
    backgroundColor: Colors.surface, 
    color: Colors.textPrimary, 
    padding: Spacing.lg, 
    borderRadius: Radius.large, 
    fontSize: 16, 
    borderWidth: 1, 
    borderColor: Colors.border,
    fontFamily: 'Inter'
  },
  footer: { flexDirection: 'row', justifyContent: 'center', marginTop: Spacing.xxxl }
});
