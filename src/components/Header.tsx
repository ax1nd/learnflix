import React, { useState } from 'react';
import { Search, ChevronDown, Bell } from 'lucide-react';
import { LearnerProfile } from '../types/index.js';
import { NetflixAvatar, NetflixAvatarType } from './NetflixAvatar.js';

interface HeaderProps {
  currentProfile: LearnerProfile;
  profiles: LearnerProfile[];
  onSelectProfile: (profile: LearnerProfile) => void;
  onOpenProfileSelector: () => void;
  activeTab: 'browse' | 'path' | 'skills' | 'evaluation';
  setActiveTab: (tab: 'browse' | 'path' | 'skills' | 'evaluation') => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onTriggerTudum?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentProfile,
  profiles,
  onSelectProfile,
  onOpenProfileSelector,
  activeTab,
  setActiveTab,
  searchQuery,
  setSearchQuery,
  onTriggerTudum,
}) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#141414]/95 backdrop-blur-md border-b border-white/5 px-4 md:px-12 py-3 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8">
        
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-8 shrink-0">
          <button 
            onClick={() => setActiveTab('browse')}
            className="text-2xl md:text-3xl font-black tracking-tighter text-[#E50914] hover:opacity-90 transition-opacity cursor-pointer focus:outline-none"
          >
            LEARNFLIX
          </button>

          {/* Zone 2: Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-6 text-sm text-[#e5e5e5]">
            <button
              onClick={() => setActiveTab('browse')}
              className={`whitespace-nowrap transition-colors cursor-pointer hover:text-white ${
                activeTab === 'browse' ? 'text-white font-bold' : 'text-[#b3b3b3]'
              }`}
            >
              Browse
            </button>
            <button
              onClick={() => setActiveTab('path')}
              className={`whitespace-nowrap transition-colors cursor-pointer hover:text-white ${
                activeTab === 'path' ? 'text-white font-bold' : 'text-[#b3b3b3]'
              }`}
            >
              Learning Path
            </button>
            <button
              onClick={() => setActiveTab('skills')}
              className={`whitespace-nowrap transition-colors cursor-pointer hover:text-white ${
                activeTab === 'skills' ? 'text-white font-bold' : 'text-[#b3b3b3]'
              }`}
            >
              Skill Radar & Quiz
            </button>
            <button
              onClick={() => setActiveTab('evaluation')}
              className={`whitespace-nowrap transition-colors cursor-pointer hover:text-white ${
                activeTab === 'evaluation' ? 'text-white font-bold' : 'text-[#b3b3b3]'
              }`}
            >
              ML Evaluation
            </button>
          </nav>
        </div>

        {/* Zone 3: Search, Notifications, & Profile */}
        <div className="flex items-center gap-5 shrink-0">
          
          {/* Netflix Expandable Search Input */}
          <div className="relative flex items-center">
            {isSearchOpen ? (
              <div className="flex items-center bg-black/80 border border-white/40 rounded px-2.5 py-1 transition-all">
                <Search className="w-4 h-4 text-neutral-400 mr-2" />
                <input
                  type="text"
                  placeholder="Titles, skills, providers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  onBlur={() => {
                    if (!searchQuery) setIsSearchOpen(false);
                  }}
                  className="bg-transparent text-xs text-white placeholder-neutral-500 focus:outline-none w-36 sm:w-56"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="text-neutral-400 hover:text-white text-xs ml-1"
                  >
                    ×
                  </button>
                )}
              </div>
            ) : (
              <button
                onClick={() => setIsSearchOpen(true)}
                className="text-neutral-300 hover:text-white transition-colors cursor-pointer p-1"
                title="Search catalog"
              >
                <Search className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Tudum Intro Button */}
          {onTriggerTudum && (
            <button
              onClick={onTriggerTudum}
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#E50914]/15 hover:bg-[#E50914] text-[#E50914] hover:text-white border border-[#E50914]/40 hover:border-transparent text-xs font-black tracking-wider transition-all cursor-pointer group"
              title="Experience the quirky Netflix Tudum animation!"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#E50914] group-hover:bg-white animate-pulse" />
              <span>TUDUM</span>
            </button>
          )}

          {/* User Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-2 group cursor-pointer focus:outline-none"
              title="Switch Profile"
            >
              <div className="rounded overflow-hidden group-hover:outline group-hover:outline-2 group-hover:outline-white transition-all">
                <NetflixAvatar 
                  type={(currentProfile.avatarType as NetflixAvatarType) || 'purple-glasses'} 
                  size="sm" 
                />
              </div>
              <ChevronDown className={`w-3.5 h-3.5 text-neutral-400 transition-transform ${showProfileMenu ? 'rotate-180 text-white' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            {showProfileMenu && (
              <div 
                className="absolute right-0 mt-3 w-56 bg-[#181818] border border-white/10 rounded shadow-2xl py-2 z-50 text-xs"
                onMouseLeave={() => setShowProfileMenu(false)}
              >
                <div className="px-3 py-2 border-b border-white/10">
                  <span className="text-[10px] text-neutral-400 uppercase tracking-wider block">Active Learner</span>
                  <p className="font-bold text-white text-sm truncate">{currentProfile.name}</p>
                  <p className="text-[11px] text-[#E50914] truncate">{currentProfile.targetRole}</p>
                </div>

                <div className="py-1">
                  <span className="px-3 py-1 text-[10px] text-neutral-500 uppercase tracking-wider block">Switch Profile</span>
                  {profiles.map(p => (
                    <button
                      key={p.id}
                      onClick={() => {
                        onSelectProfile(p);
                        setShowProfileMenu(false);
                      }}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 text-left hover:bg-white/10 transition-colors ${
                        p.id === currentProfile.id ? 'bg-white/5 font-semibold text-white' : 'text-neutral-300'
                      }`}
                    >
                      <NetflixAvatar 
                        type={(p.avatarType as NetflixAvatarType) || 'purple-glasses'} 
                        size="sm" 
                      />
                      <div className="truncate flex-1">
                        <span className="block truncate text-xs">{p.name}</span>
                        <span className="block text-[10px] text-neutral-500 truncate">{p.targetRole}</span>
                      </div>
                    </button>
                  ))}
                </div>

                <div className="border-t border-white/10 pt-1">
                  {onTriggerTudum && (
                    <button
                      onClick={() => {
                        setShowProfileMenu(false);
                        onTriggerTudum();
                      }}
                      className="w-full flex items-center justify-between px-3 py-2 text-left text-neutral-300 hover:text-white hover:bg-white/10 transition-colors text-xs cursor-pointer"
                    >
                      <span>Replay Tudum Intro</span>
                      <span className="text-[10px] font-black text-[#E50914]">TA-DUM</span>
                    </button>
                  )}
                  <button
                    onClick={() => {
                      onOpenProfileSelector();
                      setShowProfileMenu(false);
                    }}
                    className="w-full text-center px-3 py-2 text-neutral-300 hover:text-white hover:bg-white/10 transition-colors font-medium text-xs cursor-pointer"
                  >
                    Manage Profiles
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>

      </div>

      {/* Mobile Navigation Row */}
      <div className="flex md:hidden items-center justify-between gap-2 overflow-x-auto pt-2.5 border-t border-white/5 text-xs no-scrollbar">
        <button
          onClick={() => setActiveTab('browse')}
          className={`px-2.5 py-1 rounded whitespace-nowrap ${activeTab === 'browse' ? 'text-white font-bold bg-white/10' : 'text-[#b3b3b3]'}`}
        >
          Browse
        </button>
        <button
          onClick={() => setActiveTab('path')}
          className={`px-2.5 py-1 rounded whitespace-nowrap ${activeTab === 'path' ? 'text-white font-bold bg-white/10' : 'text-[#b3b3b3]'}`}
        >
          Path
        </button>
        <button
          onClick={() => setActiveTab('skills')}
          className={`px-2.5 py-1 rounded whitespace-nowrap ${activeTab === 'skills' ? 'text-white font-bold bg-white/10' : 'text-[#b3b3b3]'}`}
        >
          Radar & Quiz
        </button>
        <button
          onClick={() => setActiveTab('evaluation')}
          className={`px-2.5 py-1 rounded whitespace-nowrap ${activeTab === 'evaluation' ? 'text-white font-bold bg-white/10' : 'text-[#b3b3b3]'}`}
        >
          ML Metrics
        </button>
      </div>
    </header>
  );
};
