import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('rounded-3xl border border-black/10 bg-white shadow-sm', className)}>{children}</div>;
}

export function Button({
  children,
  className,
  variant = 'default',
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'default' | 'outline' | 'ghost' | 'secondary';
}) {
  const styles = {
    default: 'bg-black text-white',
    outline: 'border border-black/15 bg-white text-black',
    ghost: 'bg-transparent text-black',
    secondary: 'bg-black/5 text-black',
  };

  return (
    <button
      className={cn('rounded-2xl px-4 py-2 text-sm font-medium transition hover:opacity-90 disabled:opacity-50', styles[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
}

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={cn('w-full rounded-2xl border border-black/10 px-3 py-2 text-sm', props.className)} />;
}

export function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={cn('w-full rounded-2xl border border-black/10 px-3 py-2 text-sm', props.className)} />;
}
