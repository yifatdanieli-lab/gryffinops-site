import React, { useState } from 'react';
import { TeamMember } from '../types';

interface ProfileModalProps {
  member: TeamMember | null;
  onClose: () => void;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ member, onClose }) => {
  const [imgError, setImgError] = useState(false);
  if (!member) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-lg animate-in fade-in duration-300">
      <div
        className="relative w-full max-w-4xl bg-[#f4e4bc] text-[#2c1810] rounded-sm shadow-[0_0_100px_rgba(0,0,0,0.8)] overflow-hidden border-[12px] border-[#4a3728]"
        style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/natural-paper.png")' }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-6 text-4xl hover:scale-125 transition-transform font-hp z-20 text-[#4a3728]"
        >
          ×
        </button>

        <div className="flex flex-col md:flex-row gap-8 p-8 md:p-12 max-h-[90vh] overflow-y-auto custom-scrollbar">
          {/* Portrait */}
          <div className="w-full md:w-1/3 flex flex-col items-center">
            <div className="relative group w-full aspect-[4/5]">
              {/* Colored glow behind the portrait */}
              <div
                className="absolute inset-0 blur-2xl opacity-40"
                style={{ backgroundColor: member.colorHex }}
              />

              {!imgError ? (
                <div className="relative z-10 w-full h-full">
                  <img
                    src={member.imageUrl}
                    alt={member.name}
                    onError={() => setImgError(true)}
                    className="w-full h-full object-cover rounded-sm border-4 border-[#4a3728] shadow-2xl"
                  />

                  {/* Subtle color tint overlay ON the image (only in modal) */}
                  <div
                    className="absolute inset-0 rounded-sm"
                    style={{
                      background: `linear-gradient(
                        180deg,
                        ${member.colorHex} 0%,
                        transparent 60%
                      )`,
                      opacity: 0.12,
                      mixBlendMode: 'multiply',
                      pointerEvents: 'none',
                    }}
                  />
                </div>
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-[#2c1e14] border-4 border-[#4a3728] relative z-10 text-[#f3e5ab]/20">
                  <svg className="w-20 h-20" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
                  </svg>
                </div>
              )}
            </div>

            {/* Specialties pills */}
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {member.specialties.map((s) => (
                <div
                  key={s}
                  className="px-4 py-2 rounded-full text-white font-hp text-[11px] tracking-widest border-2 shadow-lg uppercase transition-all duration-500 hover:scale-110"
                  style={{
                    backgroundColor: member.colorHex,
                    borderColor: 'rgba(211,166,37,0.7)',
                  }}
                >
                  {s}
                </div>
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="w-full md:w-2/3 font-parchment">
            <h2 className="text-5xl md:text-6xl font-hp mb-2 text-[#2c1810] tracking-tight">
              {member.name}
            </h2>

            <h3
              className="text-xl italic text-[#8b4513] mb-8 border-l-4 pl-4"
              style={{ borderLeftColor: member.colorHex }}
            >
              {member.role} - <span className="text-[#5d4037]">{member.subRole}</span>
            </h3>

            <div className="space-y-10">
              <section className="relative">
                <h4 className="text-lg font-bold border-b border-[#8b4513]/30 mb-4 uppercase tracking-[0.2em] text-[#4a3728]">
                  The Legend
                </h4>
                <p className="text-xl leading-relaxed text-[#3e2723] first-letter:text-4xl first-letter:font-hp first-letter:mr-1">
                  {member.description}
                </p>
                <div className="absolute -bottom-8 right-0 opacity-5 rotate-12">
                  <img
                    src="https://raw.githubusercontent.com/yifatdanieli-lab/marketing-ops-team-assets/main/team/titlenobg.png"
                    className="w-40 grayscale invert"
                    alt=""
                  />
                </div>
              </section>

              <section>
                <h4 className="text-lg font-bold border-b border-[#8b4513]/30 mb-4 uppercase tracking-[0.2em] text-[#4a3728]">
                  Enchanted Tasks
                </h4>
                <ul className="grid grid-cols-1 gap-4">
                  {member.projects.map((project) => (
                    <li
                      key={project.id}
                      className="bg-[#4a3728]/5 p-5 rounded-sm hover:bg-[#4a3728]/10 transition-colors"
                      style={{ borderLeft: `4px solid ${member.colorHex}` }}
                    >
                      <span className="font-bold block text-lg text-[#2c1810] mb-1">
                        {project.name}
                      </span>
                      <span className="text-base opacity-75">{project.description}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
