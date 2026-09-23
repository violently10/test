import React, { useState, useRef } from 'react';
import { Volume2, VolumeX, ArrowRight, Sparkles } from 'lucide-react';
import { HomepageConfig, Product } from '../../types';

interface HeroSectionProps {
  config: HomepageConfig;
  keyPiece: Product | undefined;
  onSelectProduct: (product: Product) => void;
  onShopClick: () => void;
  onStoryClick: () => void;
  onSubscribeVip: (email: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  config,
  keyPiece,
  onSelectProduct,
  onShopClick,
  onStoryClick,
  onSubscribeVip
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorIntervalRef = useRef<number | null>(null);

  // Generative relaxing luxury ambient sound with Web Audio API
  const toggleAmbientSound = () => {
    if (isPlayingAudio) {
      if (oscillatorIntervalRef.current) {
        window.clearInterval(oscillatorIntervalRef.current);
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
        audioContextRef.current = null;
      }
      setIsPlayingAudio(false);
    } else {
      try {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = new AudioCtx();
        audioContextRef.current = ctx;

        // Play gentle resonant sine chord
        const playChime = (freq: number, gainVal: number, duration: number) => {
          if (!audioContextRef.current) return;
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, ctx.currentTime);

          gain.gain.setValueAtTime(0.001, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(gainVal, ctx.currentTime + 0.8);
          gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start();
          osc.stop(ctx.currentTime + duration);
        };

        playChime(329.63, 0.04, 4.0); // E4
        playChime(493.88, 0.03, 5.0); // B4

        oscillatorIntervalRef.current = window.setInterval(() => {
          const notes = [220, 261.63, 329.63, 392, 493.88, 587.33];
          const chosen = notes[Math.floor(Math.random() * notes.length)];
          playChime(chosen, 0.03, 4.5);
        }, 3800);

        setIsPlayingAudio(true);
      } catch {
        setIsPlayingAudio(false);
      }
    }
  };

  const handleVipSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      onSubscribeVip(emailInput.trim());
      setEmailInput('');
    }
  };

  return (
    <section id="hero-section" className="relative min-h-[92vh] w-full flex flex-col justify-between overflow-hidden pt-28 pb-10 px-4 md:px-10 lg:px-16">
      {/* Background Video & Cinematic Ambience */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster={config.heroPosterUrl}
          className="w-full h-full object-cover object-center opacity-35 scale-105 transition-transform duration-10000 ease-out"
        >
          <source src={config.heroVideoUrl} type="video/mp4" />
        </video>
        {/* Warm luxury overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#fcf9f2] via-[#fcf9f2]/75 to-[#fcf9f2]/90" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(233,193,118,0.18)_0%,transparent_60%)]" />
      </div>

      {/* Main Hero Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex-1 flex flex-col justify-center my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Typography & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start pt-6 lg:pt-0">
            {/* Edition & Ambient Audio Pill */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="px-3.5 py-1 rounded-full bg-[#ebe7dc] border border-black/5 text-[#5e584f] font-jakarta text-[11px] font-medium tracking-[0.14em] uppercase">
                Edition 01 / Autumn-Winter
              </span>

              <button
                type="button"
                onClick={toggleAmbientSound}
                className="flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/70 backdrop-blur-md border border-black/5 text-[#5e584f] hover:text-[#1c1c18] font-jakarta text-[11px] font-medium tracking-wide transition-colors cursor-pointer"
                title="Toggle Atelier Acoustic Resonance"
              >
                {isPlayingAudio ? (
                  <>
                    <Volume2 className="w-3.5 h-3.5 text-[#775a19] animate-pulse" />
                    <span>Soundtrack: Ambient (Playing)</span>
                  </>
                ) : (
                  <>
                    <VolumeX className="w-3.5 h-3.5 opacity-60" />
                    <span>Soundtrack: Muted</span>
                  </>
                )}
              </button>
            </div>

            {/* Display Headline */}
            <h1 className="font-playfair text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal leading-[1.08] text-[#1c1c18] tracking-tight mb-6">
              {config.heroHeadline}
            </h1>

            {/* Narrative Subtitle */}
            <p className="font-jakarta text-base sm:text-lg text-[#5e584f] font-normal leading-relaxed max-w-xl mb-10">
              {config.heroSubtitle}
            </p>

            {/* Primary & Secondary Action CTAs */}
            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
              <button
                onClick={onShopClick}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#1c1c18] text-[#fcf9f2] font-jakarta text-xs uppercase tracking-[0.18em] font-medium hover:bg-[#775a19] transition-all duration-300 shadow-md cursor-pointer flex items-center justify-center gap-2 group"
              >
                <span>{config.heroPrimaryCtaLabel}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={onStoryClick}
                className="w-full sm:w-auto px-7 py-4 rounded-full bg-transparent hover:bg-black/5 border border-black/15 text-[#1c1c18] font-jakarta text-xs uppercase tracking-[0.18em] font-medium transition-all duration-300 cursor-pointer text-center"
              >
                {config.heroSecondaryCtaLabel}
              </button>
            </div>
          </div>

          {/* Right Column: Floating Key Piece Specimen Card */}
          {keyPiece && (
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div
                onClick={() => onSelectProduct(keyPiece)}
                className="group relative w-full max-w-sm rounded-3xl p-5 bg-[#f5f2ea]/90 backdrop-blur-xl border border-black/5 shadow-[0_20px_40px_rgba(0,0,0,0.06)] hover:shadow-[0_24px_50px_rgba(0,0,0,0.1)] transition-all duration-500 cursor-pointer transform hover:-translate-y-1"
              >
                {/* Floating Specimen Badge */}
                <div className="absolute top-8 left-8 z-10 flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/85 backdrop-blur-md border border-black/5 text-[#775a19] font-jakarta text-[10px] uppercase tracking-wider font-semibold shadow-sm">
                  <Sparkles className="w-3 h-3" />
                  <span>Key Piece</span>
                </div>

                {/* Imagery Showcase with Dual Hover Flip */}
                <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-[#ebe7dc]/60 mb-5">
                  <img
                    src={keyPiece.primaryImage}
                    alt={keyPiece.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                  {keyPiece.secondaryImage && (
                    <img
                      src={keyPiece.secondaryImage}
                      alt={`${keyPiece.title} detail`}
                      className="absolute inset-0 w-full h-full object-cover object-center opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                    />
                  )}
                  {/* Subtle highlight ring overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                {/* Card Specimen Info */}
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-playfair text-xl text-[#1c1c18] font-medium group-hover:text-[#775a19] transition-colors">
                      {keyPiece.title}
                    </h3>
                    <p className="font-jakarta text-xs text-[#5e584f] mt-0.5 tracking-wide">
                      {keyPiece.metal}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-baseline gap-1.5 justify-end">
                      {keyPiece.salePrice && (
                        <span className="text-xs text-[#5e584f] line-through font-mono-code">
                          ${keyPiece.regularPrice}
                        </span>
                      )}
                      <span className="font-mono-code text-base font-bold text-[#1c1c18]">
                        ${keyPiece.salePrice || keyPiece.regularPrice}
                      </span>
                    </div>
                    <span className="inline-block mt-1 font-jakarta text-[10px] tracking-wider uppercase text-[#775a19] font-semibold underline underline-offset-2">
                      Inspect Object →
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Bottom Bar: Brand Attributes & VIP Enrollment */}
      <div className="relative z-10 w-full max-w-7xl mx-auto pt-10 border-t border-black/5 mt-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          {/* Floating Feature Pills */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
            {config.floatingPills.map((pill, idx) => (
              <span
                key={idx}
                className="px-4 py-1.5 rounded-full bg-[#ebe7dc]/80 border border-black/5 text-[#4b4640] font-jakarta text-[11px] uppercase tracking-[0.14em] font-medium"
              >
                {pill}
              </span>
            ))}
          </div>

          {/* Quick VIP Newsletter Enrollment */}
          <form onSubmit={handleVipSubmit} className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-72">
              <input
                type="email"
                required
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="VIP List / Enter email..."
                className="w-full px-4 py-2.5 rounded-full bg-white/80 border border-black/10 focus:border-[#775a19] text-[#1c1c18] placeholder-[#7a746a] text-xs font-jakarta outline-none transition-all"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-full bg-[#1c1c18] text-[#fcf9f2] font-jakarta text-[11px] uppercase tracking-wider hover:bg-[#775a19] transition-colors cursor-pointer shrink-0 flex items-center gap-1.5"
            >
              <span>Join</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
