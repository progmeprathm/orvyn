'use client';
import React, { useEffect } from 'react';
import { useStore } from '../store/useStore';
import { Card } from '../components/ui/Card';
import { Avatar } from '../components/ui/Avatar';
import Link from 'next/link';
import { Heart, MessageSquare } from 'lucide-react';

export default function Home() {
  const posts = useStore(state => state.posts);
  const likePost = useStore(state => state.likePost);
  const fetchSpaces = useStore(state => state.fetchSpaces);
  const fetchPosts = useStore(state => state.fetchPosts);

  useEffect(() => {
    fetchSpaces();
    fetchPosts();
  }, []);

  return (
    <div className="animate-fade-in">
      <header style={{
        paddingBottom: '24px',
        marginBottom: '24px',
        borderBottom: '1px solid var(--outline)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '28px' }}>Your Feed</h1>
          <p style={{ margin: 0, color: 'var(--on-surface-variant)', fontSize: '15px' }}>See what's happening in your spaces.</p>
        </div>
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {posts.map(post => (
          <Card key={post.id} variant="glass">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
              <Link href="/profile" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Avatar url={post.authorAvatar} size={48} />
                <div>
                  <div style={{ fontWeight: '600', fontSize: '16px' }}>{post.authorName}</div>
                  <div style={{ fontSize: '13px', color: 'var(--primary)' }}>{post.timeContext}</div>
                </div>
              </Link>
            </div>
            
            <h2 style={{ fontSize: '20px', margin: '0 0 12px 0' }}>{post.title}</h2>
            <p style={{ color: 'var(--on-surface-variant)', lineHeight: '1.6', margin: '0 0 20px 0', fontSize: '16px' }}>{post.content}</p>
            
            <div style={{ display: 'flex', gap: '24px', borderTop: '1px solid var(--outline)', paddingTop: '16px' }}>
              <button 
                onClick={() => likePost(post.id)}
                style={{ 
                  background: 'none', 
                  color: post.isLikedByMe ? 'var(--secondary)' : 'var(--on-surface-variant)', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '8px',
                  fontWeight: post.isLikedByMe ? '600' : 'normal',
                  transition: 'all 0.2s ease'
                }}
              >
                <Heart size={20} fill={post.isLikedByMe ? 'currentColor' : 'none'} style={{ filter: post.isLikedByMe ? 'drop-shadow(0 0 8px var(--secondary-glow))' : 'none' }} />
                <span>{post.likes}</span>
              </button>
              
              <button style={{ 
                background: 'none', 
                color: 'var(--on-surface-variant)', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px',
              }}>
                <MessageSquare size={20} />
                <span>{post.comments}</span>
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
