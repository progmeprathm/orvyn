'use client';
import React, { use } from 'react';
import { useStore } from '../../../store/useStore';
import { Button } from '../../../components/ui/Button';
import { Card } from '../../../components/ui/Card';
import { Avatar } from '../../../components/ui/Avatar';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Users, Shield, Hash, MessageSquare, Heart } from 'lucide-react';

export default function SpaceDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  
  const space = useStore(state => state.spaces.find(s => s.id === id));
  const posts = useStore(state => state.posts.filter(p => p.spaceId === id));
  const likePost = useStore(state => state.likePost);
  const joinSpace = useStore(state => state.joinSpace);
  const leaveSpace = useStore(state => state.leaveSpace);

  if (!space) {
    return (
      <div className="animate-fade-in" style={{ padding: '64px', textAlign: 'center' }}>
        <p style={{ color: 'var(--error)', fontSize: '20px', marginBottom: '24px' }}>Space not found in the cosmos.</p>
        <Button onClick={() => router.back()}>Go Back</Button>
      </div>
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
    <div className="animate-fade-in">
      <button onClick={() => router.back()} style={{ background: 'none', color: 'var(--on-surface-variant)', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
        <ArrowLeft size={20} /> Back
      </button>

      <div style={{ 
        height: '240px', 
        borderRadius: '24px',
        background: `linear-gradient(45deg, var(--surface-bright), var(--primary-container))`, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        marginBottom: '32px'
      }}>
        {/* Dynamic Abstract Pattern */}
        <div style={{ position: 'absolute', inset: 0, opacity: 0.2, background: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px)' }} />
        <Hash size={80} color="var(--on-primary)" opacity={0.5} />
      </div>
      
      <div style={{ padding: '0 16px' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
          <div>
            <h1 style={{ margin: '0 0 8px 0', fontSize: '32px' }}>{space.title}</h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', color: 'var(--on-surface-variant)', fontSize: '15px' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Users size={16} color="var(--primary)" /> {space.memberCount.toLocaleString()} Members</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Shield size={16} /> Public Space</span>
            </div>
          </div>
          <Button 
            variant={space.isJoined ? "secondary" : "primary"}
            size="lg" 
            onClick={handleJoinToggle}
            style={{ padding: '12px 32px' }}
          >
            {space.isJoined ? "Joined" : "Join Space"}
          </Button>
        </div>
        
        <p style={{ lineHeight: '1.6', fontSize: '16px', color: 'var(--on-surface)', marginBottom: '40px', maxWidth: '800px', background: 'var(--surface-dim)', padding: '24px', borderRadius: '16px', border: '1px solid var(--outline)' }}>
          {space.desc}
        </p>
        
        <div style={{ display: 'flex', borderBottom: '1px solid var(--outline)', marginBottom: '32px' }}>
          <div style={{ padding: '16px 24px', color: 'var(--primary)', borderBottom: '2px solid var(--primary)', fontWeight: 'bold' }}>Feed</div>
          <div style={{ padding: '16px 24px', color: 'var(--on-surface-variant)' }}>Rooms</div>
          <div style={{ padding: '16px 24px', color: 'var(--on-surface-variant)' }}>About</div>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
           {posts.length === 0 ? (
             <div style={{ textAlign: 'center', color: 'var(--on-surface-variant)', padding: '64px 0', background: 'var(--surface-dim)', borderRadius: '24px' }}>
               <Hash size={48} opacity={0.2} style={{ marginBottom: '16px' }} />
               <div>No posts yet. Be the first to spark a conversation!</div>
             </div>
           ) : (
             posts.map(post => (
               <Card key={post.id} variant="elevated">
                 <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                    <Avatar url={post.authorAvatar} size={40} />
                    <div>
                      <div style={{ fontWeight: '600', fontSize: '15px' }}>{post.authorName}</div>
                      <div style={{ fontSize: '13px', color: 'var(--on-surface-variant)' }}>{post.authorUsername}</div>
                    </div>
                 </div>
                 <h2 style={{ fontSize: '18px', margin: '0 0 8px 0' }}>{post.title}</h2>
                 <p style={{ color: 'var(--on-surface-variant)', lineHeight: '1.5', margin: '0 0 16px 0' }}>{post.content}</p>
                 
                 <div style={{ display: 'flex', gap: '20px', borderTop: '1px solid var(--outline)', paddingTop: '16px' }}>
                    <button 
                      onClick={() => likePost(post.id)}
                      style={{ 
                        background: 'none', 
                        color: post.isLikedByMe ? 'var(--secondary)' : 'var(--on-surface-variant)', 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '6px',
                        fontWeight: post.isLikedByMe ? '600' : 'normal'
                      }}
                    >
                      <Heart size={18} fill={post.isLikedByMe ? 'currentColor' : 'none'} />
                      <span>{post.likes}</span>
                    </button>
                    <button style={{ background: 'none', color: 'var(--on-surface-variant)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <MessageSquare size={18} />
                      <span>{post.comments}</span>
                    </button>
                 </div>
               </Card>
             ))
           )}
        </div>
      </div>
    </div>
  );
}
