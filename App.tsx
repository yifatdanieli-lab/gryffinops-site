
import React, { useState, useRef } from 'react';
import { TEAM_MEMBERS, GRYFFINOPS_BANNER_URL } from './constants';
import { TeamMember } from './types';
import ProfileModal from './components/ProfileModal';
import MagicCursor from './components/MagicCursor';

const App: React.FC = () => {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isMusicPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => {
          console.error('Audio playback failed:', e);
          // If it fails, we try to reset and play again
          audioRef.current!.load();
          audioRef.current!.play().catch(err => console.error('Retry failed:', err));
        });
      }
      setIsMusicPlaying(!isMusicPlaying);
    }
  };

  const Portrait: React.FC<{ member: TeamMember, index: number }> = ({ member, index }) => {
    const [imgError, setImgError] = useState(false);

    return (
      <div 
        onClick={() => setSelectedMember(member)}
        className="group cursor-pointer relative animate-portrait opacity-0"
        style={{
          animationDelay: `${index * 0.1}s`,
        }}
      >
        <div className="relative bg-[#1a110a] p-4 rounded-sm border-8 border-[#4a3728] shadow-[0_20px_40px_rgba(0,0,0,0.6)] transition-all duration-700 group-hover:scale-105 group-hover:-translate-y-4 group-hover:shadow-[0_0_50px_rgba(243,229,171,0.25)] border-double">
          <div className="aspect-[4/5] overflow-hidden relative rounded-sm bg-[#110d08]">
            {!imgError ? (
              <img 
                src={member.imageUrl} 
                alt={member.name}
                onError={() => setImgError(true)}
                className="w-full h-full object-cover transition-all duration-1000 transform group-hover:scale-110"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#332211] to-[#110d08] text-[#f3e5ab]/20 relative">
                <svg className="w-16 h-16 opacity-10" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/></svg>
                <div className="absolute bottom-4 font-hp text-[10px] tracking-widest uppercase">Invisible Cloak</div>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-30" />
          </div>

          <div className="mt-5 text-center">
            <h3 className="font-hp text-xl text-[#f3e5ab] group-hover:text-white transition-colors drop-shadow-[0_2px_4px_rgba(0,0,0,1)] uppercase tracking-wider">{member.name}</h3>
            <p className="font-parchment text-[10px] text-[#d3a625] italic tracking-widest uppercase mt-1 opacity-90">{member.role}</p>
          </div>

          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#f3e5ab]/20 m-[-6px]" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#f3e5ab]/20 m-[-6px]" />
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen relative flex flex-col items-center bg-[#050505] overflow-y-auto pb-32">
      <MagicCursor />
      
      <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,#1a110a_0%,#050505_100%)]" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] opacity-15" />
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-5 animate-pulse" />
      </div>

      <div className="fixed top-8 right-8 z-50">
        <button 
          onClick={toggleMusic}
          className="bg-black/40 backdrop-blur-md border border-[#f3e5ab]/20 text-[#f3e5ab] p-3 rounded-full hover:border-[#f3e5ab] transition-all shadow-2xl flex items-center gap-3 group"
        >
          {isMusicPlaying ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /></svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5L6 9H2v6h4l5 4V5zM15.536 8.464a5 5 0 010 7.072M17.828 6.172a9 9 0 010 12.728" /></svg>
          )}
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 whitespace-nowrap text-[10px] font-hp uppercase tracking-widest px-0 group-hover:px-2">
            {isMusicPlaying ? 'Silencio' : 'Sonorus'}
          </span>
        </button>
        <audio 
          ref={audioRef} 
          loop 
          src="https://raw.githubusercontent.com/yifatdanieli-lab/marketing-ops-team-assets/main/team/musicmarketingops.mp3" 
          preload="auto"
        />
      </div>

      {/* Hero Banner Section - Full Page Width */}
      <div className="w-full relative z-10 mb-24 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.9)]">
        <img 
          src={GRYFFINOPS_BANNER_URL} 
          alt="GryffinOps" 
          className="w-full h-auto min-h-[40vh] object-cover animate-float"
        />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#050505] to-transparent" />
      </div>

      {/* Main Team Section */}
      <main className="w-full max-w-7xl px-6 flex-grow relative z-10 flex flex-col items-center">
        
        <div className="flex items-center justify-center gap-12 mb-32 opacity-80 w-full">
          <div className="h-[1px] flex-grow max-w-[200px] bg-gradient-to-r from-transparent to-[#f3e5ab]/30" />
          <h2 className="font-hp text-3xl text-center text-[#f3e5ab] uppercase tracking-[0.6em] whitespace-nowrap">
            GryffinOps
          </h2>
          <div className="h-[1px] flex-grow max-w-[200px] bg-gradient-to-l from-transparent to-[#f3e5ab]/30" />
        </div>

        <div className="perspective-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-x-20 gap-y-32 w-full">
          {TEAM_MEMBERS.map((member, index) => (
            <Portrait key={member.id} member={member} index={index} />
          ))}
        </div>
      </main>

      <footer className="w-full mt-64 border-t border-[#f3e5ab]/10 py-24 px-6 bg-black/80 backdrop-blur-xl flex flex-col items-center relative z-10">
        <div className="font-hp text-[#f3e5ab]/20 text-xs tracking-[1em] mb-6 uppercase">Mischief Managed</div>
        <div className="font-parchment italic text-[#d3a625] text-sm opacity-60 tracking-[0.2em]">
          ESTABLISHED IN THE YEAR OF THE OWL &bull; GLOBAL OPS GUILD
        </div>
      </footer>

      <ProfileModal 
        member={selectedMember} 
        onClose={() => setSelectedMember(null)} 
      />
    </div>
  );
};

export default App;
