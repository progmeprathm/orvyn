import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Sparkles, ArrowRight, Globe2, Users, Layers } from 'lucide-react';
import { useSessionStore } from '../store/useSessionStore';

export default function Landing() {
  const { isAuthenticated } = useSessionStore();

  return (
    <div className="min-h-screen bg-background selection:bg-primary/30 flex flex-col relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Navigation */}
      <nav className="w-full px-6 py-6 md:px-12 flex justify-between items-center z-10 sticky top-0 bg-background/50 backdrop-blur-md border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <span className="font-display text-2xl font-bold tracking-tight">Orvyn</span>
        </div>
        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <Link to="/dashboard">
              <Button variant="primary" className="rounded-full px-6">
                Go to Dashboard
              </Button>
            </Link>
          ) : (
            <>
              <Link to="/login" className="hidden md:block text-textSecondary hover:text-textPrimary font-medium transition-colors">
                Log in
              </Link>
              <Link to="/signup">
                <Button variant="primary" className="rounded-full px-6">
                  Get Started
                </Button>
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 text-center z-10 pt-20 pb-32">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surfaceElevated border border-white/10 mb-8 animate-in slide-in-from-bottom-4 fade-in duration-700">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-sm font-medium text-textSecondary">The next generation community platform</span>
        </div>
        
        <h1 className="font-display text-5xl md:text-7xl font-extrabold tracking-tight max-w-4xl mb-8 leading-[1.1] animate-in slide-in-from-bottom-8 fade-in duration-1000 delay-100 fill-mode-both">
          Discover where your <br className="hidden md:block" />
          <span className="bg-gradient-to-r from-primary via-blue-400 to-primary bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
            passions collide.
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-textSecondary max-w-2xl mb-12 animate-in slide-in-from-bottom-8 fade-in duration-1000 delay-200 fill-mode-both">
          Join thousands of micro-communities, express yourself through immersive profiles, and dive into a feed curated specifically for what you love.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 animate-in slide-in-from-bottom-8 fade-in duration-1000 delay-300 fill-mode-both">
          {isAuthenticated ? (
            <Link to="/dashboard">
              <Button variant="primary" size="lg" className="rounded-full px-8 text-lg group">
                Enter your Dashboard
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          ) : (
            <>
              <Link to="/signup">
                <Button variant="primary" size="lg" className="rounded-full px-8 text-lg group">
                  Join Orvyn today
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="secondary" size="lg" className="rounded-full px-8 text-lg">
                  Log into your account
                </Button>
              </Link>
            </>
          )}
        </div>
      </main>

      {/* Features Grid */}
      <section className="px-6 md:px-12 py-24 bg-surface/50 border-t border-white/5 z-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="glass-card p-8 rounded-3xl hover:-translate-y-2 transition-transform duration-300">
            <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center mb-6">
              <Globe2 className="w-7 h-7 text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-textPrimary">Micro-Communities</h3>
            <p className="text-textSecondary leading-relaxed">
              Find your niche. From indie game development to vintage watch collecting, there's a space for every interest.
            </p>
          </div>

          <div className="glass-card p-8 rounded-3xl hover:-translate-y-2 transition-transform duration-300 delay-100">
            <div className="w-14 h-14 rounded-2xl bg-blue-500/20 flex items-center justify-center mb-6">
              <Users className="w-7 h-7 text-blue-400" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-textPrimary">Immersive Profiles</h3>
            <p className="text-textSecondary leading-relaxed">
              Express your true self. Customize your digital identity and showcase your contributions to your favorite spaces.
            </p>
          </div>

          <div className="glass-card p-8 rounded-3xl hover:-translate-y-2 transition-transform duration-300 delay-200">
            <div className="w-14 h-14 rounded-2xl bg-purple-500/20 flex items-center justify-center mb-6">
              <Layers className="w-7 h-7 text-purple-400" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-textPrimary">Dynamic Feed</h3>
            <p className="text-textSecondary leading-relaxed">
              Never miss a beat. A unified, chronological timeline that brings the best content from all your communities into one place.
            </p>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-textSecondary/50 text-sm z-10 border-t border-white/5 bg-background">
        &copy; {new Date().getFullYear()} Orvyn. All rights reserved.
      </footer>
    </div>
  );
}
