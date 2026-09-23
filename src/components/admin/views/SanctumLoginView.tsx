import React, { useState } from 'react';
import { Lock, KeyRound, Eye, EyeOff, ShieldCheck, ArrowLeft, Sparkles, Fingerprint } from 'lucide-react';

interface SanctumLoginViewProps {
  onLogin: (password: string) => boolean;
  onReturnStorefront: () => void;
  onShowToast: (msg: string, icon?: string) => void;
}

export const SanctumLoginView: React.FC<SanctumLoginViewProps> = ({
  onLogin,
  onReturnStorefront,
  onShowToast
}) => {
  const [username, setUsername] = useState('sarah.vandenberg');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberDevice, setRememberDevice] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [fido2Modal, setFido2Modal] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLogin(password);
    }, 600);
  };

  const handleAutoFill = () => {
    setUsername('sarah.vandenberg');
    setPassword('admin123');
    onShowToast('Curator credentials loaded: admin123', 'key');
  };

  const handleFido2Auth = () => {
    setFido2Modal(false);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLogin('admin123');
      onShowToast('Hardware FIDO2 Security Key verified.', 'fingerprint');
    }, 800);
  };

  return (
    <div className="min-h-screen w-full bg-[#141312] text-[#fcf9f2] flex flex-col justify-between p-6 relative overflow-hidden select-none">
      
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#e9c176]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header */}
      <div className="relative z-10 max-w-7xl w-full mx-auto flex items-center justify-between">
        <button
          onClick={onReturnStorefront}
          className="flex items-center gap-2 text-xs font-jakarta text-[#9c9589] hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Storefront</span>
        </button>

        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#1b1917] border border-[#2d2a26] text-[10px] font-mono-code text-[#7a746a]">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span>TLS 1.3 CIPHER ACTIVE · STRICT PERIMETER</span>
        </div>
      </div>

      {/* Center Authentication Console */}
      <div className="relative z-10 w-full max-w-md mx-auto my-auto py-12">
        <div className="p-8 sm:p-10 rounded-3xl bg-[#181615]/90 backdrop-blur-xl border border-[#2d2a26] shadow-[0_25px_60px_rgba(0,0,0,0.5)]">
          
          {/* Emblem & Header */}
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-[#211f1e] border border-[#3d3832] mx-auto mb-4 flex items-center justify-center text-[#e9c176] shadow-inner">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="7" />
                <line strokeWidth="1.75" x1="16" x2="21" y1="16" y2="21" />
                <circle cx="11" cy="11" fill="currentColor" r="2.5" stroke="none" />
              </svg>
            </div>

            <h1 className="font-playfair text-2xl font-normal text-white">
              Atelier Sanctum
            </h1>
            <p className="font-mono-code text-[11px] text-[#7a746a] mt-1 tracking-wider uppercase">
              Curator Cryptographic Gateway
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Username / Token */}
            <div>
              <label className="block text-xs font-jakarta text-[#9c9589] mb-1.5">
                Curator Identity Token
              </label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-[#1f1d1b] border border-[#2d2a26] text-xs font-mono-code text-white outline-none focus:border-[#e9c176]"
              />
            </div>

            {/* Master Passphrase */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-jakarta text-[#9c9589]">
                  Master Secret Passphrase
                </label>
                <button
                  type="button"
                  onClick={handleAutoFill}
                  className="text-[10px] font-mono-code text-[#e9c176] hover:underline cursor-pointer"
                >
                  [Auto-fill: admin123]
                </button>
              </div>

              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter master passphrase..."
                  className="w-full px-4 py-3 rounded-xl bg-[#1f1d1b] border border-[#2d2a26] text-xs font-mono-code text-white outline-none focus:border-[#e9c176]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#7a746a] hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Device */}
            <div className="flex items-center justify-between text-xs font-jakarta pt-1">
              <label className="flex items-center gap-2 text-[#9c9589] cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberDevice}
                  onChange={(e) => setRememberDevice(e.target.checked)}
                  className="rounded bg-[#1f1d1b] border-[#3d3832] text-[#e9c176]"
                />
                <span>Trust this workstation (30 days)</span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 px-6 rounded-xl bg-[#e9c176] hover:bg-[#c5a059] text-[#141312] font-jakarta text-xs uppercase tracking-[0.16em] font-semibold transition-all duration-300 shadow-md flex items-center justify-center gap-2 cursor-pointer mt-2 disabled:opacity-50"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full border-2 border-[#141312] border-t-transparent animate-spin" />
                  <span>Verifying Ring Signatures...</span>
                </div>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Authenticate & Unlock Vault</span>
                </>
              )}
            </button>

            {/* Secondary Hardware Key CTA */}
            <div className="pt-2 text-center">
              <button
                type="button"
                onClick={() => setFido2Modal(true)}
                className="inline-flex items-center gap-1.5 text-xs text-[#7a746a] hover:text-[#e9c176] transition-colors cursor-pointer"
              >
                <Fingerprint className="w-3.5 h-3.5" />
                <span>Use Hardware Security Token (FIDO2)</span>
              </button>
            </div>

          </form>

        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 max-w-7xl w-full mx-auto text-center text-[10px] font-mono-code text-[#6b645b]">
        THE Q SANCTUM ARCHIVE · ZURICH · PARIS · TOKYO · ALL CONNECTIONS LOGGED
      </div>

      {/* Hardware FIDO2 Modal */}
      {fido2Modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-sm rounded-2xl bg-[#181615] border border-[#3d3832] p-6 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#24211d] text-[#e9c176] flex items-center justify-center mx-auto border border-[#3d3832] animate-pulse">
              <Fingerprint className="w-8 h-8" />
            </div>

            <h3 className="font-playfair text-lg text-white font-medium">
              Insert or Tap Security Key
            </h3>
            <p className="font-jakarta text-xs text-[#9c9589] leading-relaxed">
              Touch your registered YubiKey or biometric enclave sensor to complete cryptographic challenge.
            </p>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setFido2Modal(false)}
                className="flex-1 py-2.5 rounded-xl bg-[#211f1e] text-xs font-jakarta text-[#9c9589] hover:text-white cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleFido2Auth}
                className="flex-1 py-2.5 rounded-xl bg-[#e9c176] hover:bg-[#c5a059] text-xs font-jakarta font-semibold text-[#141312] cursor-pointer"
              >
                Touch Key (Simulate)
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
