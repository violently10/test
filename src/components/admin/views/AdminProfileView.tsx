import React, { useState } from 'react';
import {
  ShieldCheck,
  KeyRound,
  Lock,
  Smartphone,
  Eye,
  EyeOff,
  CheckCircle2,
  Server,
  Fingerprint,
  RefreshCw,
  Clock,
  AlertCircle
} from 'lucide-react';
import { AuditLogEntry } from '../../../types';

interface AdminProfileViewProps {
  auditLog: AuditLogEntry[];
  onShowToast: (message: string, icon?: string) => void;
}

export const AdminProfileView: React.FC<AdminProfileViewProps> = ({
  auditLog,
  onShowToast
}) => {
  // Passphrase Rotation State
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [isRotating, setIsRotating] = useState(false);
  const [rotationSuccess, setRotationSuccess] = useState(false);
  const [sessionTimeout, setSessionTimeout] = useState('30');

  // Dynamic Password Strength Calculation
  const calculateStrength = (pass: string) => {
    if (!pass) return { score: 0, label: 'Unset', color: 'bg-zinc-700' };
    let score = 0;
    if (pass.length >= 8) score += 25;
    if (pass.length >= 12) score += 25;
    if (/[A-Z]/.test(pass) && /[a-z]/.test(pass)) score += 25;
    if (/[0-9]/.test(pass) && /[^A-Za-z0-9]/.test(pass)) score += 25;

    if (score <= 25) return { score, label: 'Weak', color: 'bg-red-500' };
    if (score <= 50) return { score, label: 'Fair', color: 'bg-amber-500' };
    if (score <= 75) return { score, label: 'Strong', color: 'bg-yellow-400' };
    return { score: 100, label: 'Military-Grade Cryptographic', color: 'bg-emerald-400' };
  };

  const strength = calculateStrength(newPass);

  const handleRotatePassphrase = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPass) {
      onShowToast('Please provide your current master passphrase.', 'error');
      return;
    }
    if (newPass.length < 8) {
      onShowToast('New passphrase must be at least 8 characters.', 'error');
      return;
    }
    if (newPass !== confirmPass) {
      onShowToast('New passphrases do not match.', 'error');
      return;
    }

    setIsRotating(true);
    setTimeout(() => {
      setIsRotating(false);
      setRotationSuccess(true);
      setCurrentPass('');
      setNewPass('');
      setConfirmPass('');
      onShowToast('Master passphrase rotated and synced to hardware token.', 'verified_user');
      setTimeout(() => setRotationSuccess(false), 3000);
    }, 1200);
  };

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto text-[#fcf9f2]">
      
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="font-mono-code text-[11px] text-[#e9c176] uppercase tracking-widest">
            Cryptographic Governance
          </span>
          <span className="text-[#3d3832]">/</span>
          <span className="font-mono-code text-[11px] text-[#7a746a]">
            Tier-0 Root Sanctum
          </span>
        </div>
        <h1 className="font-playfair text-2xl sm:text-3xl font-normal text-white">
          Curator Profile & Security Governance
        </h1>
        <p className="font-jakarta text-xs text-[#9c9589] mt-0.5">
          Manage hardware credentials, session leases, and immutable audit telemetry.
        </p>
      </div>

      {/* Main Grid: Identity & Passphrase Rotation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Curator Identity Dossier (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Identity Card */}
          <div className="p-6 rounded-2xl bg-[#181615] border border-[#262422] space-y-6">
            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-[#211f1e] border-2 border-[#e9c176]/50">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCP4tFQ1ISoJJst5twV15CzkidNE2RlxOqDS4oSN8_sfgH_eJYCRPLqvRvAc21IEJZCx6foOy8J6T-yh9rDQsiLdvjdSfsF6UOIzk53tIPYtNjK20AUyiSoiTwaW0cDfmG-HVP8-WWINoN4N3kTxQoE90tXuVuWQPwUjTcB-50eZdGCW5a5nUuUzc1b4FtcvX57Q1ykIXhR-Re6xhJdEy3EDLt3RX9-MVQjkk4nKgIoy2ujJcKW37joQw"
                  alt="Curator Sarah"
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-playfair text-lg text-white font-medium">
                    Sarah Vandenberg
                  </h3>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-950/80 text-emerald-300 text-[9px] font-mono-code border border-emerald-800">
                    ACTIVE
                  </span>
                </div>
                <p className="font-mono-code text-xs text-[#e9c176]">
                  ID: Q-ADM-0019
                </p>
                <p className="font-jakarta text-[11px] text-[#7a746a] mt-0.5">
                  Atelier Director & Chief Curator
                </p>
              </div>
            </div>

            {/* Attributes */}
            <div className="space-y-3 pt-2 border-t border-[#262422] text-xs font-jakarta">
              <div className="flex justify-between">
                <span className="text-[#7a746a]">Username (Immutable):</span>
                <span className="font-mono-code text-white">sarah.vandenberg</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#7a746a]">Sanctum Email:</span>
                <span className="font-mono-code text-[#a8a196]">sarah@theq-atelier.ch</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#7a746a]">Access Tier:</span>
                <span className="font-mono-code text-[#e9c176] font-bold">Tier-0 Root Admin</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#7a746a]">Assigned Foundry:</span>
                <span className="text-white">Zurich Sanctum · Node #04</span>
              </div>
            </div>

            {/* Root Capabilities */}
            <div className="p-4 rounded-xl bg-[#1f1d1b] border border-[#2d2a26] space-y-2">
              <span className="font-mono-code text-[10px] uppercase tracking-widest text-[#7a746a] block">
                Privileged System Entitlements
              </span>
              <ul className="space-y-1.5 text-xs font-jakarta text-[#a8a196]">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Direct Postgres Ledger Read/Write</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Supabase S3 Object Purge Authority</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Cryptographic Provenance Cert Signing</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Bullion Escrow Release Authorization</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Session Telemetry */}
          <div className="p-6 rounded-2xl bg-[#181615] border border-[#262422] space-y-4">
            <span className="font-mono-code text-[10px] uppercase tracking-widest text-[#e9c176] block">
              Active Session Leases
            </span>

            <div className="flex items-center justify-between text-xs font-jakarta">
              <div className="flex items-center gap-2 text-[#a8a196]">
                <Server className="w-4 h-4 text-[#e9c176]" />
                <span>Primary Sanctum Node</span>
              </div>
              <span className="font-mono-code text-white">Zurich (185.120.44.12)</span>
            </div>

            <div className="flex items-center justify-between text-xs font-jakarta">
              <div className="flex items-center gap-2 text-[#a8a196]">
                <Clock className="w-4 h-4 text-[#e9c176]" />
                <span>Inactivity Auto-Lock</span>
              </div>
              <select
                value={sessionTimeout}
                onChange={(e) => setSessionTimeout(e.target.value)}
                className="px-2.5 py-1 rounded-lg bg-[#1f1d1b] border border-[#2d2a26] text-xs font-mono-code text-white outline-none cursor-pointer"
              >
                <option value="15">15 Minutes</option>
                <option value="30">30 Minutes</option>
                <option value="60">60 Minutes</option>
                <option value="120">2 Hours</option>
              </select>
            </div>
          </div>

        </div>

        {/* Right Column: Passphrase Rotation & Security Shield (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Passphrase Rotation Form */}
          <div className="p-6 rounded-2xl bg-[#181615] border border-[#262422] space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-mono-code text-[10px] uppercase tracking-widest text-[#e9c176]">
                  Passphrase Security
                </span>
                <h3 className="font-playfair text-xl text-white font-medium">
                  Rotate Master Sanctum Secret
                </h3>
              </div>
              <div className="w-9 h-9 rounded-xl bg-[#24211d] text-[#e9c176] flex items-center justify-center border border-[#3d3832]">
                <KeyRound className="w-4 h-4" />
              </div>
            </div>

            {rotationSuccess && (
              <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-800 text-emerald-300 text-xs font-jakarta flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Master secret successfully updated. All edge sessions re-encrypted.</span>
              </div>
            )}

            <form onSubmit={handleRotatePassphrase} className="space-y-4">
              {/* Current Password */}
              <div>
                <label className="block text-xs font-jakarta text-[#9c9589] mb-1">
                  Current Master Passphrase *
                </label>
                <div className="relative">
                  <input
                    type={showPass ? 'text' : 'password'}
                    required
                    value={currentPass}
                    onChange={(e) => setCurrentPass(e.target.value)}
                    placeholder="Enter current passphrase (default: admin123)..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#1f1d1b] border border-[#2d2a26] text-xs font-mono-code text-white outline-none focus:border-[#e9c176]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7a746a] hover:text-white"
                  >
                    {showPass ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* New Password */}
              <div>
                <label className="block text-xs font-jakarta text-[#9c9589] mb-1">
                  New Cryptographic Master Passphrase *
                </label>
                <input
                  type={showPass ? 'text' : 'password'}
                  required
                  value={newPass}
                  onChange={(e) => setNewPass(e.target.value)}
                  placeholder="Min 8 characters, numbers, and symbols..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#1f1d1b] border border-[#2d2a26] text-xs font-mono-code text-white outline-none focus:border-[#e9c176]"
                />

                {/* Password Strength Indicator */}
                {newPass && (
                  <div className="mt-2 space-y-1">
                    <div className="flex justify-between text-[10px] font-mono-code">
                      <span className="text-[#7a746a]">Entropy Strength:</span>
                      <span className="text-[#e9c176]">{strength.label}</span>
                    </div>
                    <div className="w-full h-1.5 bg-[#262422] rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-300 ${strength.color}`}
                        style={{ width: `${strength.score}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Confirm New Password */}
              <div>
                <label className="block text-xs font-jakarta text-[#9c9589] mb-1">
                  Confirm New Master Passphrase *
                </label>
                <input
                  type={showPass ? 'text' : 'password'}
                  required
                  value={confirmPass}
                  onChange={(e) => setConfirmPass(e.target.value)}
                  placeholder="Re-enter new passphrase..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#1f1d1b] border border-[#2d2a26] text-xs font-mono-code text-white outline-none focus:border-[#e9c176]"
                />
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  disabled={isRotating}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#e9c176] hover:bg-[#c5a059] text-[#141312] text-xs font-jakarta font-semibold transition-colors cursor-pointer shadow-md disabled:opacity-50"
                >
                  {isRotating ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Re-encrypting Master Ring...</span>
                    </>
                  ) : (
                    <>
                      <KeyRound className="w-4 h-4" />
                      <span>Commit Passphrase Rotation</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* 2FA & Perimeter Shield Panel */}
          <div className="p-6 rounded-2xl bg-[#181615] border border-[#262422] space-y-4">
            <span className="font-mono-code text-[10px] uppercase tracking-widest text-[#7a746a] block">
              Perimeter Shield & 2FA Enforcement
            </span>

            <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#1f1d1b] border border-[#2d2a26]">
              <div className="flex items-center gap-3">
                <Fingerprint className="w-5 h-5 text-[#e9c176]" />
                <div>
                  <h4 className="text-xs font-jakarta font-medium text-white">
                    Hardware FIDO2 Security Key
                  </h4>
                  <p className="text-[11px] text-[#7a746a]">YubiKey 5C NFC bound to Zurich vault</p>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded bg-[#24211d] text-[#e9c176] font-mono-code text-[10px]">
                ACTIVE
              </span>
            </div>

            <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#1f1d1b] border border-[#2d2a26]">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <div>
                  <h4 className="text-xs font-jakarta font-medium text-white">
                    Strict TLS 1.3 Cipher Suite
                  </h4>
                  <p className="text-[11px] text-[#7a746a]">ECDHE-RSA-AES256-GCM-SHA384</p>
                </div>
              </div>
              <span className="text-[11px] font-mono-code text-emerald-400">
                ENFORCED
              </span>
            </div>
          </div>

          {/* Audit Trail Preview */}
          <div className="p-6 rounded-2xl bg-[#181615] border border-[#262422] space-y-4">
            <span className="font-mono-code text-[10px] uppercase tracking-widest text-[#7a746a] block">
              Historical Ledger & Security Trail
            </span>

            <div className="space-y-2.5">
              {auditLog.map((log) => (
                <div
                  key={log.id}
                  className="p-3 rounded-xl bg-[#1f1d1b] border border-[#262422] flex items-center justify-between text-xs font-jakarta"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#e9c176]" />
                    <div>
                      <span className="text-white font-medium">{log.actor}</span>{' '}
                      <span className="text-[#a8a196]">{log.action}</span>
                    </div>
                  </div>
                  <span className="font-mono-code text-[10px] text-[#7a746a] shrink-0">
                    {log.timestamp}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
