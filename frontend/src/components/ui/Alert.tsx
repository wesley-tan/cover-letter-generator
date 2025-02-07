import { cn } from '../../utils/cn';
import { AlertCircle, CheckCircle2, XCircle } from 'lucide-react';

interface AlertProps {
  type?: 'success' | 'error' | 'info';
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export function Alert({ 
  type = 'info', 
  title, 
  children, 
  className 
}: AlertProps) {
  const icons = {
    success: CheckCircle2,
    error: XCircle,
    info: AlertCircle
  };

  const styles = {
    success: 'bg-green-50 text-green-800 border-green-200',
    error: 'bg-red-50 text-red-800 border-red-200',
    info: 'bg-blue-50 text-blue-800 border-blue-200'
  };

  const Icon = icons[type];

  return (
    <div
      role="alert"
      className={cn(
        'flex gap-3 rounded-lg border p-4',
        styles[type],
        className
      )}
    >
      <Icon className="h-5 w-5 shrink-0" />
      <div className="space-y-1">
        {title && (
          <h3 className="font-medium">
            {title}
          </h3>
        )}
        <div className="text-sm">
          {children}
        </div>
      </div>
    </div>
  );
} 