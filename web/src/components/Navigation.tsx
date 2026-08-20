'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Compass, PlusSquare, Activity, User, Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';

export const Navigation = () => {
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Explore', path: '/explore', icon: Compass },
    { name: 'Create', path: '/create', icon: PlusSquare },
    { name: 'Activity', path: '/activity', icon: Activity },
    { name: 'Profile', path: '/profile', icon: User },
  ];

  if (isMobile) {
    // Mobile Floating Pill Navigation
    return (
      <div style={{
        position: 'fixed',
        bottom: '24px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '90%',
        maxWidth: '400px',
        zIndex: 100,
      }}>
        <nav style={{
          background: 'var(--glass-bg)',
          backdropFilter: 'blur(16px)',
          border: '1px solid var(--glass-border)',
          borderRadius: '9999px',
          display: 'flex',
          justifyContent: 'space-between',
          padding: '12px 24px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
        }}>
          {navItems.map(item => {
            const isActive = pathname === item.path;
            const Icon = item.icon;
            return (
              <Link key={item.name} href={item.path} style={{
                color: isActive ? 'var(--primary)' : 'var(--on-surface-variant)',
                transition: 'all 0.2s',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4px'
              }}>
                <Icon size={24} strokeWidth={isActive ? 2.5 : 2} style={{ filter: isActive ? 'drop-shadow(0 0 8px var(--primary-glow))' : 'none' }} />
              </Link>
            )
          })}
        </nav>
      </div>
    );
  }

  // Desktop Sidebar Navigation
  return (
    <nav style={{
      position: 'fixed',
      left: 0,
      top: 0,
      bottom: 0,
      width: '280px',
      borderRight: '1px solid var(--outline)',
      background: 'var(--surface-dim)',
      padding: '32px 24px',
      display: 'flex',
      flexDirection: 'column',
      zIndex: 100,
    }}>
      <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '48px', color: 'var(--primary)' }}>
        <Sparkles size={32} />
        <h1 style={{ margin: 0, fontSize: '28px', background: 'linear-gradient(to right, var(--primary), var(--secondary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Orvyn
        </h1>
      </Link>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {navItems.map(item => {
          const isActive = pathname === item.path;
          const Icon = item.icon;
          return (
            <Link key={item.name} href={item.path} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              padding: '16px',
              borderRadius: '16px',
              color: isActive ? 'var(--on-primary)' : 'var(--on-surface-variant)',
              background: isActive ? 'linear-gradient(135deg, var(--primary), var(--primary-container))' : 'transparent',
              fontWeight: isActive ? 'bold' : '500',
              fontSize: '18px',
              transition: 'all 0.2s ease',
              boxShadow: isActive ? '0 4px 14px var(--primary-glow)' : 'none'
            }}
            className={!isActive ? "hover-nav-item" : ""}
            >
              <Icon size={24} />
              {item.name}
            </Link>
          )
        })}
      </div>
      
      {/* Quick inject hover style for sidebar items */}
      <style>{`
        .hover-nav-item:hover {
          background: var(--surface-bright) !important;
          color: var(--on-surface) !important;
        }
      `}</style>
    </nav>
  );
};
