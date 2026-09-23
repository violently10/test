import React from 'react';

interface NotificationToastProps {
  toast: { message: string; icon?: string } | null;
}

export const NotificationToast: React.FC<NotificationToastProps> = ({ toast }) => {
  if (!toast) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce-short">
      <div className="flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-[#141312] text-[#fcf9f2] border border-[#3d3832] shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
        <span className="material-symbols-outlined text-[#e9c176] text-xl">
          {toast.icon || 'check_circle'}
        </span>
        <span className="font-jakarta text-xs font-medium text-white tracking-wide">
          {toast.message}
        </span>
      </div>
    </div>
  );
};
