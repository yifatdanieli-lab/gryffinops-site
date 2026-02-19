import React, { useState, useRef } from 'react';
import { TEAM_MEMBERS, GRYFFINOPS_BANNER_URL } from './constants';
import { TeamMember } from './types';
import ProfileModal from './components/ProfileModal';
import MagicCursor from './components/MagicCursor';

const App: React.FC = () => {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const startExperience = async () => {
    if (!audioRef.current) return;

    try {
      await audioRef.current.play();
      setIsMusicPlaying(true);
    } catch (e) {}

    setHasStarted(true);
  };

  const toggleSound = () => {
    if (!audioRef.current) return;

    if (isMusicPlaying) {
      audioRef.current.pause();
      setIsMusicPlaying(false);
    } else {
      audioRef.current.play();
      setIsMusicPlaying(true);
    }
  };

  const Portrait: React.FC<{ member: TeamMember; index: number }> = ({ member, index }) => {
    const [imgError, setImgError] = React.useState(false);

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
    <div className="min-h-screen relative flex flex-col items-center bg-[#050505] overflow-y-auto pb-20 sm:pb-32">
      <MagicCursor />

      {/* START OVERLAY (unchanged) */}
      {!hasStarted && (
        <div
          onClick={startExperience}
          className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-[100] cursor-pointer"
        >
          <div className="text-center text-[#f3e5ab]">
            <div className="text-6xl mb-6 animate-pulse">♪</div>
            <div className="font-hp tracking-widest uppercase text-lg">
              Tap to Enter the Experience
            </div>
          </div>
        </div>
      )}

      {/* DESKTOP SOUND BUTTON (unchanged) */}
      <div
        onClick={toggleSound}
        className="hidden sm:flex fixed top-6 right-6 z-50 cursor-pointer"
      >
        <div className="relative flex items-center justify-center w-20 h-20 rounded-full bg-black/60 shadow-[0_0_20px_rgba(0,0,0,0.8)]">
          <span className={`text-5xl ${isMusicPlaying ? 'text-white animate-note' : 'text-[#888]'}`}>
            ♪
          </span>

          {!isMusicPlaying && (
            <div className="absolute w-full h-[3px] bg-red-500 rotate-45"></div>
          )}
        </div>
      </div>

      <audio
        ref={audioRef}
        loop
        src="https://raw.githubusercontent.com/yifatdanieli-lab/marketing-ops-team-assets/main/team/musicmarketingops.mp3"
        preload="auto"
      />

      {/* DESKTOP BANNER */}
      <div className="hidden sm:block w-full relative z-10 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.9)]">
        <img
          src={GRYFFINOPS_BANNER_URL}
          alt="GryffinOps"
          className="w-full h-auto min-h-[40vh] object-cover animate-float"
        />
      </div>

      {/* MOBILE BANNER */}
      <div className="sm:hidden w-full relative z-10 overflow-hidden">
        <img
          src="/banner-mobile.jpg"
          alt="GryffinOps Mobile"
          className="w-full h-auto object-cover"
        />
      </div>

      {/* MOBILE SOUND BUTTON (unchanged) */}
      <div className="sm:hidden w-full bg-[#050505] flex justify-end pr-6 py-2">
        <div
          onClick={toggleSound}
          className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[#ffffff20] cursor-pointer"
        >
          <span className={`text-4xl ${isMusicPlaying ? 'text-[#ffd700] animate-note' : 'text-[#aaa]'}`}>
            ♪
          </span>

          {!isMusicPlaying && (
            <div className="absolute w-full h-[3px] bg-red-500 rotate-45"></div>
          )}
        </div>
      </div>

      {/* TEAM SECTION */}
      <main className="w-full max-w-7xl px-6 flex-grow relative z-10 flex flex-col items-center 
                       mt-4 sm:mt-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 
                        gap-y-16 sm:gap-y-32 
                        gap-x-6 sm:gap-x-20 
                        w-full">
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
          50% { transform: translateY(-6px); }
          100% { transform: translateY(0px); }
        }

        .animate-note {
          animation: note 2.5s ease-in-out infinite;
        }
        `}
      </style>
    </div>
  );
};

export default App;
