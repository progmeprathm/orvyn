'use client';
import React from 'react';
import { useStore } from '../../store/useStore';
import { Card } from '../../components/ui/Card';
import Link from 'next/link';
import { ArrowRight, Users, Sparkles } from 'lucide-react';

export default function ExplorePage() {
  const spaces = useStore(state => state.spaces);
  
  const trendingSpaces = spaces.slice(0, 3);
  const recommendedSpaces = spaces.slice(2, 5);

  return (
    <div className="animate-fade-in">
      <header style={{
        paddingBottom: '24px',
        marginBottom: '24px',
      }}>
        <h1 style={{ margin: 0, fontSize: '28px' }}>Explore Spaces</h1>
        <p style={{ margin: 0, color: 'var(--on-surface-variant)', fontSize: '15px' }}>Discover communities built around your interests.</p>
      </header>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', alignItems: 'flex-end' }}>
        <h2 style={{ fontSize: '20px', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Sparkles size={20} color="var(--primary)" /> Trending Now
        </h2>
        <span style={{ color: 'var(--primary)', fontSize: '14px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
          See all <ArrowRight size={16} />
        </span>
      </div>

      <div style={{ display: 'flex', gap: '20px', overflowX: 'auto', paddingBottom: '24px', marginBottom: '24px' }}>
        {trendingSpaces.map((space, i) => (
          <Link key={space.id} href={`/spaces/${space.id}`} style={{ flexShrink: 0, width: '280px' }}>
            <Card variant="glass" style={{ height: '200px', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
              {/* Decorative Mesh background for trending cards */}
              <div style={{
                position: 'absolute',
                top: 0, left: 0, right: 0, bottom: 0,
                background: `linear-gradient(135deg, ${i % 2 === 0 ? 'var(--primary-glow)' : 'var(--secondary-glow)'} 0%, transparent 100%)`,
                opacity: 0.2,
                zIndex: 0
              }} />
              
              <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', height: '100%' }}>
                <h3 style={{ fontSize: '18px', marginBottom: '8px', lineHeight: '1.3' }}>{space.title}</h3>
                <p style={{ color: 'var(--on-surface-variant)', fontSize: '14px', flex: 1, overflow: 'hidden', lineHeight: '1.5' }}>{space.desc}</p>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--primary)', fontSize: '13px', fontWeight: 'bold', marginTop: '16px' }}>
                  <Users size={16} /> {space.memberCount.toLocaleString()} Members
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ fontSize: '20px', margin: 0 }}>Recommended for You</h2>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {recommendedSpaces.map(space => (
          <Link key={space.id} href={`/spaces/${space.id}`}>
            <div style={{ 
              display: 'flex', 
              gap: '20px', 
              padding: '16px', 
              backgroundColor: 'var(--surface)', 
              border: '1px solid var(--outline)',
              borderRadius: '20px',
              alignItems: 'center',
              transition: 'all 0.3s ease',
            }}
            onMouseOver={(e) => e.currentTarget.style.borderColor = 'var(--primary)'}
            onMouseOut={(e) => e.currentTarget.style.borderColor = 'var(--outline)'}
            >
              <div style={{ width: '80px', height: '80px', borderRadius: '16px', background: 'linear-gradient(135deg, var(--surface-bright), var(--primary-container))', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Compass size={32} color="var(--on-primary)" opacity={0.8} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 'bold', fontSize: '18px', marginBottom: '6px' }}>{space.title}</div>
                <div style={{ fontSize: '14px', color: 'var(--on-surface-variant)', lineHeight: '1.5', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{space.desc}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>

    </div>
  );
}
