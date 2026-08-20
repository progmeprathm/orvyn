import { FileQuestion } from 'lucide-react';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  message: string;
  action?: React.ReactNode;
}

export function EmptyState({ 
  icon = <FileQuestion className="w-10 h-10 text-textSecondary/50" />, 
  title, 
  message, 
  action 
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center h-full w-full min-h-[300px]">
      <div className="w-20 h-20 rounded-full bg-surface/50 flex items-center justify-center mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-textPrimary mb-2">{title}</h3>
      <p className="text-textSecondary max-w-md mb-6">{message}</p>
      {action && (
        <div className="mt-2">
          {action}
        </div>
      )}
    </div>
  );
}
