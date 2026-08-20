'use client';
import React from 'react';
import { useStore } from '../../store/useStore';
import { Avatar } from '../../components/ui/Avatar';
import { Button } from '../../components/ui/Button';
import { MapPin, Link as LinkIcon, Calendar, Edit3 } from 'lucide-react';

export default function ProfilePage() {
  const user = useStore(state => state.currentUser);
  const joinedSpacesCount = useStore(state => state.spaces.filter(s => s.isJoined).length);
  const myPostsCount = useStore(state => state.posts.filter(p => p.authorUsername === user?.username).length);

  if (!user) return null;

  return (
    <div className="animate-fade-in">
      <div style={{ position: 'relative', marginBottom: '64px' }}>
        {/* Cover Photo */}
        <div style={{ 
          height: '200px', 
          borderRadius: '24px', 
          background: 'linear-gradient(135deg, var(--primary-container), var(--secondary-container))',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at center, transparent, var(--background))', opacity: 0.8 }} />
        </div>
        
        {/* Avatar positioned over cover */}
        <div style={{ position: 'absolute', bottom: '-40px', left: '32px' }}>
          <Avatar url={user.avatar} size={100} style={{ border: '4px solid var(--background)' }} />
        </div>
        
        <div style={{ position: 'absolute', bottom: '-20px', right: '32px' }}>
          <Button variant="secondary" size="md"><Edit3 size={16} /> Edit Profile</Button>
        </div>
      </div>

      <div style={{ padding: '0 32px' }}>
        <h1 style={{ margin: '0 0 4px 0', fontSize: '28px' }}>{user.name}</h1>
        <div style={{ color: 'var(--primary)', fontSize: '16px', marginBottom: '16px', fontWeight: '500' }}>{user.username}</div>
        
        <p style={{ color: 'var(--on-surface)', fontSize: '16px', lineHeight: '1.6', maxWidth: '600px', marginBottom: '24px' }}>{user.bio}</p>
        
        <div style={{ display: 'flex', gap: '24px', color: 'var(--on-surface-variant)', fontSize: '14px', marginBottom: '32px' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><MapPin size={16} /> San Francisco, CA</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><LinkIcon size={16} /> orvyn.app</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Calendar size={16} /> Joined Aug 2026</span>
        </div>

        {/* Stats Dashboard */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(3, 1fr)', 
          gap: '16px',
          marginBottom: '48px'
        }}>
          {[
            { label: 'Followers', value: user.followers.toLocaleString() },
            { label: 'Following', value: user.following.toLocaleString() },
            { label: 'Spaces', value: joinedSpacesCount.toLocaleString() }
          ].map(stat => (
            <div key={stat.label} style={{ 
              background: 'var(--glass-bg)',
              border: '1px solid var(--glass-border)',
              borderRadius: '20px',
              padding: '24px',
              textAlign: 'center',
              backdropFilter: 'blur(10px)'
            }}>
              <div style={{ fontSize: '28px', fontWeight: 'bold', color: 'var(--on-surface)', marginBottom: '4px' }}>{stat.value}</div>
              <div style={{ color: 'var(--on-surface-variant)', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{stat.label}</div>
            </div>
          ))}
        </div>

        <div style={{ borderBottom: '1px solid var(--outline)', marginBottom: '24px', display: 'flex' }}>
          <div style={{ padding: '16px 24px', color: 'var(--on-surface)', borderBottom: '2px solid var(--primary)', fontWeight: 'bold' }}>My Posts ({myPostsCount})</div>
          <div style={{ padding: '16px 24px', color: 'var(--on-surface-variant)' }}>Likes</div>
          <div style={{ padding: '16px 24px', color: 'var(--on-surface-variant)' }}>Replies</div>
        </div>

        <div style={{ textAlign: 'center', color: 'var(--on-surface-variant)', padding: '64px 0', background: 'var(--surface-dim)', borderRadius: '24px', border: '1px dashed var(--outline)' }}>
          {myPostsCount === 0 ? "You haven't posted yet." : "Your posts will appear here."}
        </div>
      </div>
    </div>
  );
}
