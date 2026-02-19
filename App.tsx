import React, { useState, useRef, useEffect } from 'react';
import { TEAM_MEMBERS, GRYFFINOPS_BANNER_URL } from './constants';
import { TeamMember } from './types';
import ProfileModal from './components/ProfileModal';
import MagicCursor from './components/MagicCursor';

const App: React.FC = () => {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const tryPlay = async () => {
      if (!audioRef.current) return;

      try {
        await audioRef.current.play();
        setIsMusicPlaying(true);
        removeListeners();
      } catch (e) {
        // אם הדפדפן חסם, ננסה שוב באינטראקציה הבאה
      }
    };

    const removeListeners = () => {
      window.removeEventListener('pointerdown', tryPlay);
      window.removeEventListener('touchstart', tryPlay);
      window.removeEventListener('keydown', tryPlay);
    };

    window.addEventListener('pointerdown', tryPlay);
    window.addEventListener('touchstart', tryPlay);
    window.addEventListener('keydown', tryPlay);
  }, []);

  const Portrait: React.FC<{ member: TeamMember; index: number }> = ({ member, index }) => {
    const [imgError, setImgError] = useState(false);

    return (
      <div
        onClick={() => setSelectedMember(member)}
        className="group cursor-pointer relative animate-portrait opacity-0"
        style={{ animationDelay: `${index * 0.1}s` }}
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
              <div className="w-full h-full bg-gradient-to-br from-[#332211] to-[#110d08]" />
            )}
          </div>

          <div className="mt-5 text-center">
            <h3 className="font-hp text-xl text-[#f3e5ab] uppercase tracking-wider">
              {member.name}
            </h3>
            <p className="font-parchment text-[10px] text-[#d3a625] italic tracking-widest uppercase mt-1 opacity-90">
              {member.role}
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen relative flex flex-col items-center bg-[#050505] overflow-y-auto pb-32">
      <MagicCursor />

      {/* DESKTOP MUSIC ICON */}
      <div className="hidden sm:flex fixed top-6 right-6 z-50 pointer-events-none">
        <div className={`relative flex items-center justify-center w-20 h-20 rounded-full 
          ${isMusicPlaying ? 'bg-[#f3e5ab]/25 animate-ring' : 'bg-[#ffffff15]'}
        `}>
          <span className={`text-5xl ${isMusicPlaying ? 'text-[#f3e5ab] animate-note' : 'text-[#888]'}`}>
            ♪
          </span>
        </div>
      </div>

      {/* MOBILE MUSIC ICON – positioned on black banner */}
      <div className="sm:hidden fixed top-4 right-4 z-50 pointer-events-none">
        <div className={`relative flex items-center justify-center w-16 h-16 rounded-full 
          ${isMusicPlaying ? 'bg-[#ffd700]/30 animate-ring' : 'bg-[#ffffff20]'}
        `}>
          <span className={`text-5xl ${isMusicPlaying ? 'text-[#ffd700] animate-note' : 'text-[#aaa]'}`}>
            ♪
          </span>
        </div>
      </div>

      <audio
        ref={audioRef}
        loop
        src="https://raw.githubusercontent.com/yifatdanieli-lab/marketing-ops-team-assets/main/team/musicmarketingops.mp3"
        preload="auto"
      />

      <div className="w-full relative z-10 mb-24 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.9)]">
        <img
          src={GRYFFINOPS_BANNER_URL}
          alt="GryffinOps"
          className="w-full h-auto min-h-[40vh] object-cover animate-float"
        />
      </div>

      <main className="w-full max-w-7xl px-6 flex-grow relative z-10 flex flex-col items-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-20 gap-y-32 w-full">
          {TEAM_MEMBERS.map((member, index) => (
            <Portrait key={member.id} member={member} index={index} />
          ))}
        </div>
      </main>

      <ProfileModal member={selectedMember} onClose={() => setSelectedMember(null)} />

      <style>
        {`
        @keyframes note {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
          100% { transform: translateY(0px); }
        }

        @keyframes ring {
          0% { box-shadow: 0 0 0 0 rgba(255,215,0,0.6); }
          70% { box-shadow: 0 0 0 15px rgba(255,215,0,0); }
          100% { box-shadow: 0 0 0 0 rgba(255,215,0,0); }
        }

        .animate-note {
          animation: note 2.5s ease-in-out infinite;
        }

        .animate-ring {
          animation: ring 2.5s infinite;
        }
        `}
      </style>
    </div>
  );
};

export default App;
