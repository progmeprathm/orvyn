import { Avatar } from '../ui/Avatar';
import { MessageSquare, Heart } from 'lucide-react';
import { Post } from '../../store/useStore';

interface PostCardProps {
  post: Post;
  onClick?: (postId: string) => void;
}

export function PostCard({ post, onClick }: PostCardProps) {
  return (
    <article 
      onClick={() => onClick?.(post.id)}
      className="p-6 hover:bg-surface/30 transition-colors cursor-pointer"
    >
      <div className="flex gap-4">
        <Avatar url={post.authorAvatar || null} size={48} />
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-bold hover:underline cursor-pointer">{post.authorUsername || 'Anonymous'}</span>
            <span className="text-textSecondary text-sm">·</span>
            <span className="text-textSecondary text-sm hover:underline cursor-pointer">s/{post.spaceId}</span>
          </div>
          <p className="text-base leading-relaxed text-textPrimary/90 mb-4">{post.content}</p>
          
          <div className="flex items-center gap-6 text-textSecondary">
            <button 
              onClick={(e) => { e.stopPropagation(); /* Handle like */ }}
              className={`flex items-center gap-2 transition-colors group ${post.isLikedByMe ? 'text-primary' : 'hover:text-primary'}`}
            >
              <Heart className={`w-5 h-5 ${post.isLikedByMe ? 'fill-primary text-primary' : 'group-hover:fill-primary/20'}`} />
              <span className="text-sm">{post.likes}</span>
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); /* Navigate to comments */ }}
              className="flex items-center gap-2 hover:text-primary transition-colors"
            >
              <MessageSquare className="w-5 h-5" />
              <span className="text-sm">{post.comments}</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
