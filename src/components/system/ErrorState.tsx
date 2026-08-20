import { AlertTriangle } from 'lucide-react';
import { Button } from '../ui/Button';

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  fullScreen?: boolean;
}

export function ErrorState({ 
  title = 'Something went wrong', 
  message = 'We encountered an error while loading this content.', 
  onRetry,
  fullScreen = false
}: ErrorStateProps) {
  const containerClass = fullScreen 
    ? "fixed inset-0 z-50 flex flex-col items-center justify-center bg-background p-6"
    : "flex flex-col items-center justify-center p-8 h-full w-full min-h-[300px] text-center";

  return (
    <div className={containerClass}>
      <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mb-6">
        <AlertTriangle className="w-8 h-8 text-red-500" />
      </div>
      <h2 className="text-xl font-bold text-textPrimary mb-2">{title}</h2>
      <p className="text-textSecondary max-w-md mb-8">{message}</p>
      
      {onRetry && (
        <Button onClick={onRetry} variant="primary">
          Try Again
        </Button>
      )}
    </div>
  );
}
