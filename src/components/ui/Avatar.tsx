

interface AvatarProps {
  url?: string | null;
  size?: number;
  className?: string;
}

export function Avatar({ url, size = 40, className = '' }: AvatarProps) {
  return (
    <div 
      className={`rounded-full overflow-hidden bg-surfaceElevated flex-shrink-0 border border-white/10 ${className}`}
      style={{ width: size, height: size }}
    >
      {url ? (
        <img src={url} alt="Avatar" className="w-full h-full object-cover" />
      ) : (
        <div className="w-full h-full bg-surfaceElevated/50" />
      )}
    </div>
  );
}
