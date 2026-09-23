import React from 'react';
import { X, Check, Bell, Shield, ArrowRight } from 'lucide-react';
import { AuditLogEntry } from '../types';

interface NotificationsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  auditLog: AuditLogEntry[];
}

export const NotificationsDrawer: React.FC<NotificationsDrawerProps> = ({
  isOpen,
  onClose,
  auditLog
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden select-none">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-xs" onClick={onClose} />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-sm bg-[#181615] text-[#fcf9f2] border-l border-[#262422] shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-6 border-b border-[#262422] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#24211d] text-[#e9c176] flex items-center justify-center border border-[#3d3832]">
                <Bell className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-playfair text-base text-white font-medium">
                  Atelier Telemetry
                </h3>
                <p className="font-mono-code text-[10px] text-[#7a746a]">
                  Live System & Specimen Alerts
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-[#211f1e] text-[#9c9589] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {auditLog.map((log) => (
              <div
                key={log.id}
                className="p-4 rounded-xl bg-[#1f1d1b] border border-[#2d2a26] space-y-1.5"
              >
                <div className="flex items-center justify-between text-[10px] font-mono-code text-[#e9c176]">
                  <span className="uppercase">{log.type} ALERT</span>
                  <span className="text-[#7a746a]">{log.timestamp}</span>
                </div>
                <p className="text-xs font-jakarta text-white font-medium leading-snug">
                  {log.actor} <span className="text-[#a8a196] font-normal">{log.action}</span>
                </p>
                <div className="flex items-center justify-between text-[10px] font-mono-code text-[#7a746a] pt-1">
                  <span>Target: {log.target}</span>
                  <span>{log.location}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-[#262422] bg-[#141312] text-center">
            <span className="text-[10px] font-mono-code text-[#6b645b]">
              All security events cryptographically logged
            </span>
          </div>

        </div>
      </div>
    </div>
  );
};
