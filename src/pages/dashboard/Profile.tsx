import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import { Avatar } from '../../components/ui/Avatar';
import { Button } from '../../components/ui/Button';
import { PostCard } from '../../components/shared/PostCard';
import { LoadingOverlay } from '../../components/system/LoadingOverlay';
import { ErrorState } from '../../components/system/ErrorState';
import { EmptyState } from '../../components/system/EmptyState';
import { Settings, MoreVertical, MessageSquare, UserPlus, FileQuestion, ShieldAlert } from 'lucide-react';

export default function Profile() {
  const { username } = useParams<{ username: string }>();
  const { 
    currentUser, 
    viewedProfile, 
    isProfileLoading, 
    profileError, 
    fetchProfileByUsername, 
    posts 
  } = useStore();

  const [activeTab, setActiveTab] = useState<'posts' | 'replies' | 'likes'>('posts');
  const [isBlocked, setIsBlocked] = useState(false);

  useEffect(() => {
    if (username) {
      fetchProfileByUsername(username);
      setIsBlocked(false); // Reset mock block state
    }
  }, [username, fetchProfileByUsername]);

  if (isProfileLoading) {
    return <LoadingOverlay fullScreen message="Loading profile..." />;
  }

  if (profileError) {
    return <ErrorState title="Profile Error" message={profileError} onRetry={() => username && fetchProfileByUsername(username)} />;
  }

  if (!viewedProfile) {
    return <EmptyState title="User Not Found" message="This account doesn't exist or may have been deleted." />;
  }

  const isOwnProfile = currentUser?.id === viewedProfile.id;
  const userPosts = posts.filter(p => p.authorUsername === viewedProfile.username);

  const handleBlockToggle = () => {
    setIsBlocked(!isBlocked);
    // In a real app, this would call an API and update global state
  };

  if (isBlocked) {
    return (
      <div className="w-full flex items-center justify-center min-h-screen">
        <EmptyState 
          icon={<ShieldAlert className="w-10 h-10 text-red-500/50" />}
          title={`You blocked @${viewedProfile.username}`} 
          message="You cannot see their content. Unblock them to view their profile." 
          action={<Button onClick={handleBlockToggle} variant="secondary">Unblock</Button>}
        />
      </div>
    );
  }

  return (
    <div className="w-full">
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border p-4 px-6 flex items-center h-[72px]">
        <h2 className="font-display text-xl font-bold">{viewedProfile.name}</h2>
      </header>

      <div className="relative">
        <div className="h-48 bg-gradient-to-r from-primary/40 to-primaryHover/20" />
        <div className="px-6 pb-6">
          <div className="flex justify-between items-end -mt-16 mb-4">
            <Avatar url={viewedProfile.avatar} size={128} className="border-4 border-background" />
            
            <div className="flex gap-2 mb-2">
              {isOwnProfile ? (
                <>
                  <Button variant="secondary">Edit Profile</Button>
                  <Button variant="ghost" className="px-3"><Settings className="w-5 h-5" /></Button>
                </>
              ) : (
                <>
                  <Button variant="ghost" className="px-3"><MessageSquare className="w-5 h-5" /></Button>
                  <Button variant="primary" className="flex items-center gap-2">
                    <UserPlus className="w-4 h-4" /> Follow
                  </Button>
                  <Button variant="ghost" className="px-3" onClick={handleBlockToggle}>
                    <MoreVertical className="w-5 h-5" />
                  </Button>
                </>
              )}
            </div>
          </div>
          
          <div className="mb-6">
            <h1 className="text-2xl font-bold">{viewedProfile.name}</h1>
            <p className="text-textSecondary text-lg">@{viewedProfile.username}</p>
            {viewedProfile.bio && <p className="mt-4 text-base">{viewedProfile.bio}</p>}
          </div>

          <div className="flex gap-6 text-sm mb-8">
            <div className="flex items-center gap-2">
              <span className="font-bold text-textPrimary">{viewedProfile.followers}</span>
              <span className="text-textSecondary">Followers</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-textPrimary">{viewedProfile.following}</span>
              <span className="text-textSecondary">Following</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="border-b border-border flex">
        <button 
          onClick={() => setActiveTab('posts')}
          className={`flex-1 font-bold py-4 ${activeTab === 'posts' ? 'text-primary border-b-2 border-primary' : 'text-textSecondary hover:bg-surface/50'}`}
        >
          Posts ({userPosts.length})
        </button>
        <button 
          onClick={() => setActiveTab('replies')}
          className={`flex-1 font-bold py-4 ${activeTab === 'replies' ? 'text-primary border-b-2 border-primary' : 'text-textSecondary hover:bg-surface/50'}`}
        >
          Replies
        </button>
        <button 
          onClick={() => setActiveTab('likes')}
          className={`flex-1 font-bold py-4 ${activeTab === 'likes' ? 'text-primary border-b-2 border-primary' : 'text-textSecondary hover:bg-surface/50'}`}
        >
          Likes
        </button>
      </div>

      <div className="divide-y divide-border">
        {activeTab === 'posts' && (
          userPosts.length === 0 ? (
            <EmptyState 
              icon={<FileQuestion className="w-10 h-10 text-textSecondary/50" />}
              title="No posts yet" 
              message={`@${viewedProfile.username} hasn't posted anything.`} 
            />
          ) : (
            userPosts.map(post => <PostCard key={post.id} post={post} />)
          )
        )}
        
        {activeTab === 'replies' && (
          <EmptyState title="No replies" message="This feature is coming soon." />
        )}

        {activeTab === 'likes' && (
          <EmptyState title="No likes" message="This feature is coming soon." />
        )}
      </div>
    </div>
  );
}
