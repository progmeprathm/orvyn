import { Loader2 } from 'lucide-react';

interface LoadingOverlayProps {
  message?: string;
  fullScreen?: boolean;
}

export function LoadingOverlay({ message = 'Loading...', fullScreen = false }: LoadingOverlayProps) {
  const containerClass = fullScreen 
    ? "fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm"
    : "flex flex-col items-center justify-center p-8 h-full w-full min-h-[200px]";

  return (
    <div className={containerClass}>
      <Loader2 className="w-8 h-8 text-primary animate-spin mb-4" />
      {message && <p className="text-textSecondary font-medium animate-pulse">{message}</p>}
    </div>
  );
}
