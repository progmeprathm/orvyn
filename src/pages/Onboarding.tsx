import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { useSessionStore } from '../store/useSessionStore';
import { Sparkles, ArrowRight, MessageSquare, ShieldCheck, Zap } from 'lucide-react';

export default function Onboarding() {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [loadingMsg, setLoadingMsg] = useState('');
  const navigate = useNavigate();
  const { profile } = useSessionStore();

  useEffect(() => {
    if (profile?.displayName) setName(profile.displayName);
  }, [profile]);

  const handleNext = () => setStep(s => s + 1);

  // Step 4 Simulation
  useEffect(() => {
    if (step === 4) {
      setLoadingMsg('Syncing secure vault...');
      const timers = [
        setTimeout(() => setLoadingMsg('Analyzing active chats...'), 1500),
        setTimeout(() => setLoadingMsg('Generating your catch-up summary...'), 3000),
        setTimeout(() => setLoadingMsg('Done.'), 4500)
      ];
      return () => timers.forEach(clearTimeout);
    }
  }, [step]);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
      {/* Ambient background for Sidekick (Step 2+) */}
      {step >= 2 && (
        <div className="absolute bottom-[-20%] left-1/2 -translate-x-1/2 w-[80%] h-[50%] bg-green-500/10 blur-[150px] rounded-full animate-pulse pointer-events-none transition-opacity duration-1000" />
      )}

      <div className="max-w-2xl w-full z-10">
        
        {/* Step 1: Welcome Screen */}
        {step === 1 && (
          <div className="animate-in fade-in zoom-in duration-1000 fill-mode-both">
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">
              Welcome to your digital home.
            </h1>
            <p className="text-xl text-textSecondary mb-12">
              A place built for you, not for algorithms. Let's set up your keys.
            </p>
            <Button onClick={handleNext} variant="primary" size="lg" className="rounded-full px-8">
              Begin Setup
            </Button>
          </div>
        )}

        {/* Step 2: Sidekick Wake-up */}
        {step === 2 && (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-both">
            <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-[0_0_30px_rgba(74,222,128,0.3)] animate-pulse">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold mb-4">Hi! I'm your Sidekick.</h2>
            <p className="text-lg text-textSecondary mb-8 max-w-lg mx-auto leading-relaxed">
              Think of me as your assistant, your memory organizer, and your creative editor. I live entirely on your device, which means what we chat about stays between us.
            </p>
            <div className="max-w-xs mx-auto">
              <label className="block text-sm font-medium text-textSecondary mb-2">To get started, what should I call you?</label>
              <input 
                type="text" 
                value={name} 
                onChange={e => setName(e.target.value)}
                className="w-full bg-surface border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary mb-6 text-center text-lg"
                placeholder="Your Name"
              />
              <Button onClick={handleNext} variant="primary" className="w-full" disabled={!name}>
                Nice to meet you
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: The First Connection */}
        {step === 3 && (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-both">
            <h2 className="text-3xl font-bold mb-4">Let's clear up some clutter.</h2>
            <p className="text-lg text-textSecondary mb-10 max-w-lg mx-auto">
              Pick an app you use every day, and let's pull your updates here so you don't have to bounce around.
            </p>
            
            <div className="grid gap-4 max-w-md mx-auto mb-10">
              {['Discord', 'X (Twitter)', 'Instagram'].map((app) => (
                <button 
                  key={app}
                  onClick={handleNext}
                  className="flex items-center justify-between p-4 rounded-2xl bg-surfaceElevated border border-white/5 hover:border-primary/50 hover:bg-surfaceStrong transition-all group"
                >
                  <span className="font-bold text-lg">{app}</span>
                  <div className="flex items-center gap-2 text-sm text-textSecondary group-hover:text-primary transition-colors">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Connect Securely</span>
                  </div>
                </button>
              ))}
            </div>
            
            <button onClick={handleNext} className="text-textSecondary hover:text-textPrimary text-sm font-medium">
              I'll do this later
            </button>
          </div>
        )}

        {/* Step 4: The Magic Moment */}
        {step === 4 && (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-both text-left max-w-lg mx-auto">
            {loadingMsg !== 'Done.' ? (
              <div className="flex flex-col items-center justify-center text-center py-20">
                <div className="w-12 h-12 border-4 border-green-500/20 border-t-green-500 rounded-full animate-spin mb-6" />
                <p className="text-lg font-medium text-textPrimary animate-pulse">{loadingMsg}</p>
                <p className="text-sm text-textSecondary mt-2">Connecting to your device vault...</p>
              </div>
            ) : (
              <div className="animate-in zoom-in-95 duration-500">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
                    <Zap className="w-6 h-6 text-green-400" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">All set, {name}.</h2>
                    <p className="text-textSecondary">I just looked through your active chats.</p>
                  </div>
                </div>
                
                <div className="bg-surfaceElevated border border-white/10 rounded-2xl p-6 mb-8 relative">
                  <div className="absolute top-0 left-6 -translate-y-1/2 bg-background px-2 text-xs font-bold text-green-400 uppercase tracking-widest">
                    Sidekick Summary
                  </div>
                  <p className="mb-4 text-textPrimary/90">While you were onboarding, your main group had a big conversation about shifting project deadlines. Here's what you missed:</p>
                  <ul className="space-y-3">
                    <li className="flex gap-3">
                      <MessageSquare className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm text-textSecondary">Sarah pushed the frontend milestone to Thursday.</span>
                    </li>
                    <li className="flex gap-3">
                      <MessageSquare className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm text-textSecondary">Mike needs someone to review the API changes.</span>
                    </li>
                    <li className="flex gap-3">
                      <MessageSquare className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm text-textSecondary">Team sync is rescheduled for 2 PM tomorrow.</span>
                    </li>
                  </ul>
                </div>

                <Button onClick={() => navigate('/dashboard')} variant="primary" className="w-full group">
                  Enter Orvyn
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
