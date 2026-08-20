import React, { useState } from 'react';
import { View, StyleSheet, TextInput, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Colors, Spacing, Radius } from '../../src/theme';
import { Button } from '../../src/components/ui/Button';
import { Text } from '../../src/components/ui/Text';
import { ErrorState } from '../../src/components/ui/ErrorState';
import { AuthUseCases } from '../../src/application/authUseCases';
import { useSessionStore } from '../../src/store/useSessionStore';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const setSession = useSessionStore(state => state.setSession);

  const handleLogin = async () => {
    if (!email || !password) return;
    setIsLoading(true);
    setError(null);
    try {
      const session = await AuthUseCases.login(email, password);
      setSession(session.user, session.profile);
      router.replace('/(tabs)');
    } catch (err: any) {
      setError(err.message || "Failed to sign in.");
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
        <View style={styles.content}>
          <View style={styles.header}>
            <Text variant="h1" color={Colors.textPrimary}>Welcome back</Text>
            <Text variant="body" color={Colors.textSecondary} style={styles.subtitle}>Sign in to your account to continue</Text>
          </View>

          <View style={styles.form}>
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
            
            <Button size="lg" onPress={handleLogin} isLoading={isLoading}>
              Sign In
            </Button>
          </View>

          <View style={styles.footer}>
            <Text color={Colors.textSecondary}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => router.push('/(auth)/signup')}>
              <Text color={Colors.primary} variant="label">Sign up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.background },
  container: { flex: 1, justifyContent: 'center' },
  content: { padding: Spacing.xl },
  header: { marginBottom: Spacing.xxxl },
  subtitle: { marginTop: Spacing.xs },
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
