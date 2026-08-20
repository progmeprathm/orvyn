import { useStore } from '../../store/useStore';
import { PostCard } from '../../components/shared/PostCard';

export default function Home() {
  const posts = useStore(state => state.posts);

  return (
    <div className="w-full">
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border p-4 px-6 flex items-center h-[72px]">
        <h2 className="font-display text-xl font-bold">Home</h2>
      </header>
      
      <div className="divide-y divide-border">
        {posts.length === 0 ? (
          <div className="p-8 text-center text-textSecondary">No posts yet. Follow some spaces!</div>
        ) : (
          posts.map(post => <PostCard key={post.id} post={post} />)
        )}
      </div>
    </div>
  );
}
