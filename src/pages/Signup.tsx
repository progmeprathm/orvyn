import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { AuthUseCases } from '../application/authUseCases';
import { useSessionStore } from '../store/useSessionStore';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const navigate = useNavigate();
  const setSession = useSessionStore(state => state.setSession);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !name || !username) return;
    
    setIsLoading(true);
    setError(null);
    try {
      const session = await AuthUseCases.signup(email, password, name, username);
      setSession(session.user, session.profile);
      navigate('/onboarding');
    } catch (err: any) {
      setError(err.message || "Failed to sign up.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="glass-card w-full max-w-md p-10">
        <div className="text-center mb-10">
          <h1 className="font-display text-3xl font-bold text-textPrimary">Create Account</h1>
          <p className="text-textSecondary mt-2 text-sm">Find your people.</p>
        </div>

        <form onSubmit={handleSignup} className="flex flex-col gap-4">
          {error && (
            <div className="bg-error/10 text-error p-4 rounded-xl text-sm border border-error/20">
              {error}
            </div>
          )}
          
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-surface border border-border text-textPrimary px-5 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary w-full"
            required
          />
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="bg-surface border border-border text-textPrimary px-5 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary w-full"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-surface border border-border text-textPrimary px-5 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary w-full"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-surface border border-border text-textPrimary px-5 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary w-full"
            required
          />
          
          <Button type="submit" size="lg" isLoading={isLoading} className="mt-2 w-full">
            Sign Up
          </Button>
        </form>

        <div className="mt-8 text-center text-textSecondary text-sm">
          Already have an account?{' '}
          <button onClick={() => navigate('/login')} className="text-primary hover:underline font-medium">
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
}
