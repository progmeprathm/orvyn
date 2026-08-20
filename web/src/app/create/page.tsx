'use client';
import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { Button } from '../../components/ui/Button';
import { useRouter } from 'next/navigation';
import { PenTool, Image as ImageIcon } from 'lucide-react';

export default function CreatePage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedSpaceId, setSelectedSpaceId] = useState<string | null>(null);
  
  const allSpaces = useStore(state => state.spaces);
  const spaces = allSpaces.filter(s => s.isJoined);
  const addPost = useStore(state => state.addPost);
  const router = useRouter();

  const handlePublish = async () => {
    if (!title || !content || !selectedSpaceId) return;
    
    await addPost({
      title,
      content,
      spaceId: selectedSpaceId,
      image: null
    });
    
    router.push('/');
  };

  return (
    <div className="animate-fade-in">
      <header style={{
        paddingBottom: '24px',
        marginBottom: '32px',
        borderBottom: '1px solid var(--outline)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <h1 style={{ margin: 0, fontSize: '28px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <PenTool size={28} color="var(--primary)" /> Draft Post
        </h1>
        <Button 
          size="md" 
          disabled={!title || !content || !selectedSpaceId}
          onClick={handlePublish}
        >
          Publish Now
        </Button>
      </header>

      <div style={{ marginBottom: '32px' }}>
        <label style={{ display: 'block', color: 'var(--on-surface-variant)', marginBottom: '12px', fontSize: '15px', fontWeight: '500' }}>Publishing to Space</label>
        <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '8px' }}>
          {spaces.length === 0 ? (
            <div style={{ padding: '16px', background: 'rgba(239, 68, 68, 0.1)', color: 'var(--error)', borderRadius: '12px', border: '1px solid var(--error)' }}>
              You must join a space before you can post!
            </div>
          ) : (
            spaces.map(space => (
              <button
                key={space.id}
                onClick={() => setSelectedSpaceId(space.id)}
                style={{ 
                  flexShrink: 0,
                  padding: '12px 24px',
                  borderRadius: '9999px',
                  background: selectedSpaceId === space.id ? 'var(--primary-glow)' : 'var(--surface)',
                  border: `1px solid ${selectedSpaceId === space.id ? 'var(--primary)' : 'var(--outline)'}`,
                  color: selectedSpaceId === space.id ? 'var(--on-primary)' : 'var(--on-surface)',
                  transition: 'all 0.2s ease',
                  fontWeight: '500'
                }}
              >
                {space.title}
              </button>
            ))
          )}
        </div>
      </div>

      <div style={{ 
        background: 'var(--surface-dim)', 
        border: '1px solid var(--outline)', 
        borderRadius: '24px', 
        padding: '32px',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px'
      }}>
        <input
          placeholder="An interesting title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{
            width: '100%',
            background: 'transparent',
            border: 'none',
            outline: 'none',
            color: 'var(--on-surface)',
            fontSize: '32px',
            fontFamily: 'var(--font-display)',
            fontWeight: 'bold',
          }}
        />
        
        <textarea
          placeholder="Share your thoughts with the community..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          style={{
            width: '100%',
            minHeight: '240px',
            background: 'transparent',
            border: 'none',
            outline: 'none',
            color: 'var(--on-surface-variant)',
            fontSize: '18px',
            fontFamily: 'var(--font-body)',
            resize: 'vertical',
            lineHeight: '1.6'
          }}
        />

        <div style={{ borderTop: '1px solid var(--outline)', paddingTop: '24px', display: 'flex', gap: '16px' }}>
          <button style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary)', background: 'var(--primary-glow)', padding: '12px 20px', borderRadius: '12px', fontWeight: 'bold' }}>
            <ImageIcon size={20} /> Attach Image
          </button>
        </div>
      </div>

    </div>
  );
}
