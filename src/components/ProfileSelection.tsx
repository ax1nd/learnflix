import React, { useState } from 'react';
import { Pencil, Plus, X, Check } from 'lucide-react';
import { LearnerProfile, SkillLevel } from '../types/index.js';
import { NetflixAvatar, NetflixAvatarType } from './NetflixAvatar.js';

interface ProfileSelectionProps {
  profiles: LearnerProfile[];
  onSelectProfile: (profile: LearnerProfile) => void;
  onAddProfile: (newProfile: LearnerProfile) => void;
  onUpdateProfile?: (updatedProfile: LearnerProfile) => void;
  onClose?: () => void;
  canClose?: boolean;
  onPlayTudum?: () => void;
}

export const ProfileSelection: React.FC<ProfileSelectionProps> = ({
  profiles,
  onSelectProfile,
  onAddProfile,
  onUpdateProfile,
  onClose,
  canClose = false,
  onPlayTudum,
}) => {
  const [isManaging, setIsManaging] = useState(false);
  const [editingProfile, setEditingProfile] = useState<LearnerProfile | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // New profile form state
  const [newName, setNewName] = useState('');
  const [newRole, setNewRole] = useState('Machine Learning Engineer');
  const [newGoal, setNewGoal] = useState('');
  const [newProficiency, setNewProficiency] = useState<SkillLevel>('Beginner');
  const [selectedAvatarType, setSelectedAvatarType] = useState<NetflixAvatarType>('cyan-smile');
  const [selectedTopics, setSelectedTopics] = useState<string[]>(['Artificial Intelligence & ML']);

  const allTopics = [
    'Artificial Intelligence & ML',
    'Data Structures & Algorithms',
    'Full Stack Development',
    'Cloud & DevOps',
    'Data Science & Analytics',
    'Cyber Security'
  ];

  const handleProfileClick = (profile: LearnerProfile) => {
    if (isManaging) {
      setEditingProfile(profile);
    } else {
      onSelectProfile(profile);
    }
  };

  const handleCreateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    const created: LearnerProfile = {
      id: `learner-${Date.now()}`,
      name: newName.trim(),
      avatarColor: 'from-red-600 to-black',
      avatarType: selectedAvatarType,
      targetRole: newRole.trim() || 'Software Engineer',
      learningGoal: newGoal.trim() || `Master skills for ${newRole}`,
      currentProficiency: newProficiency,
      preferredTopics: selectedTopics.length > 0 ? selectedTopics : ['Artificial Intelligence & ML'],
      completedCourses: [],
      inProgressCourses: [],
      currentSkills: {
        'Foundational Concepts': newProficiency === 'Beginner' ? 25 : 60,
        'Problem Solving': newProficiency === 'Beginner' ? 30 : 65,
      },
      targetSkills: {
        'Foundational Concepts': 90,
        'Problem Solving': 85,
        'System Architecture': 80,
      },
      assessmentHistory: [],
      isColdStart: true
    };

    onAddProfile(created);
    setShowAddModal(false);
    setNewName('');
    setNewGoal('');
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProfile || !onUpdateProfile) return;
    onUpdateProfile(editingProfile);
    setEditingProfile(null);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#141414] flex flex-col items-center justify-center p-4 md:p-8 select-none overflow-y-auto animate-in fade-in duration-300">
      
      {/* Optional Top Close Button if invoked as modal */}
      {canClose && onClose && (
        <button
          onClick={onClose}
          className="absolute top-6 right-8 text-[#808080] hover:text-white p-2 transition-colors cursor-pointer"
          aria-label="Back to dashboard"
        >
          <X className="w-6 h-6" />
        </button>
      )}

      {/* Main Title - Exact Netflix typography */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-normal text-white text-center tracking-normal mb-8 md:mb-12">
        {isManaging ? 'Manage Profiles:' : "Who's watching?"}
      </h1>

      {/* Avatars Row - Exact replicate of attached image */}
      <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 md:gap-8 max-w-5xl mx-auto mb-12">
        {profiles.map((profile) => {
          const avatarType = (profile.avatarType as NetflixAvatarType) || 'purple-glasses';

          return (
            <div
              key={profile.id}
              onClick={() => handleProfileClick(profile)}
              className="group flex flex-col items-center cursor-pointer transition-transform duration-200"
            >
              {/* Avatar Box with border on hover */}
              <div className="relative rounded overflow-hidden transition-all duration-150 group-hover:outline group-hover:outline-[3.5px] group-hover:outline-white">
                <NetflixAvatar type={avatarType} size="lg" />

                {/* Manage Pencil Overlay */}
                {isManaging && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center transition-opacity">
                    <div className="w-10 h-10 rounded-full border border-white/80 bg-black/40 flex items-center justify-center text-white">
                      <Pencil className="w-5 h-5" />
                    </div>
                  </div>
                )}
              </div>

              {/* Profile Name */}
              <span className="mt-3 text-sm sm:text-base text-[#808080] group-hover:text-white transition-colors text-center tracking-wide font-normal w-28 md:w-36 block truncate">
                {profile.name}
              </span>

              {/* Minimalist Subtitle */}
              <span className="text-[11px] text-neutral-500 text-center w-28 md:w-36 block truncate">
                {profile.isColdStart ? 'Cold-Start' : profile.targetRole.split(' ')[0]}
              </span>
            </div>
          );
        })}

        {/* Add Profile Tile (Exact Netflix Style) */}
        <div
          onClick={() => setShowAddModal(true)}
          className="group flex flex-col items-center cursor-pointer transition-transform duration-200"
        >
          <div className="w-28 h-28 md:w-36 md:h-36 rounded border-2 border-[#808080] hover:border-white flex items-center justify-center transition-colors group-hover:outline group-hover:outline-[3.5px] group-hover:outline-white bg-transparent">
            <Plus className="w-12 h-12 text-[#808080] group-hover:text-white transition-colors" />
          </div>
          <span className="mt-3 text-sm sm:text-base text-[#808080] group-hover:text-white transition-colors text-center tracking-wide font-normal">
            Add Profile
          </span>
          <span className="text-[11px] text-neutral-500">
            Custom
          </span>
        </div>
      </div>

      {/* Netflix Manage Profiles Outlined Button */}
      <div className="flex flex-col items-center gap-3">
        <button
          onClick={() => setIsManaging(!isManaging)}
          className={`uppercase tracking-[0.15em] text-xs sm:text-sm font-medium px-7 py-2 transition-all cursor-pointer ${
            isManaging 
              ? 'bg-white text-black hover:bg-neutral-200 font-bold'
              : 'border border-[#808080] text-[#808080] hover:border-white hover:text-white bg-transparent'
          }`}
        >
          {isManaging ? 'Done' : 'Manage Profiles'}
        </button>

        {onPlayTudum && (
          <button
            onClick={onPlayTudum}
            className="flex items-center gap-1.5 text-xs text-neutral-500 hover:text-[#E50914] transition cursor-pointer"
            title="Replay the quirky Netflix Tudum animation"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#E50914] animate-pulse" />
            <span>Play Tudum Intro</span>
          </button>
        )}
      </div>

      {/* Edit Profile Modal (When in manage mode) */}
      {editingProfile && (
        <div className="fixed inset-0 z-60 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#181818] border border-white/10 rounded-lg p-6 max-w-md w-full text-left shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-5">
              <h3 className="text-xl font-normal text-white">Edit Profile</h3>
              <button 
                onClick={() => setEditingProfile(null)}
                className="text-neutral-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4 text-xs">
              <div className="flex items-center gap-4 mb-4">
                <NetflixAvatar type={(editingProfile.avatarType as NetflixAvatarType) || 'purple-glasses'} size="md" />
                <div className="flex-1">
                  <label className="block text-neutral-400 mb-1">Name</label>
                  <input
                    type="text"
                    required
                    value={editingProfile.name}
                    onChange={(e) => setEditingProfile({ ...editingProfile, name: e.target.value })}
                    className="w-full bg-[#222222] border border-white/10 rounded px-3 py-2 text-white focus:outline-none focus:border-red-600 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-neutral-400 mb-1">Career Goal / Role</label>
                <input
                  type="text"
                  required
                  value={editingProfile.targetRole}
                  onChange={(e) => setEditingProfile({ ...editingProfile, targetRole: e.target.value })}
                  className="w-full bg-[#222222] border border-white/10 rounded px-3 py-2 text-white focus:outline-none focus:border-red-600 text-sm"
                />
              </div>

              <div>
                <label className="block text-neutral-400 mb-1">Current Proficiency</label>
                <select
                  value={editingProfile.currentProficiency}
                  onChange={(e) => setEditingProfile({ ...editingProfile, currentProficiency: e.target.value as SkillLevel })}
                  className="w-full bg-[#222222] border border-white/10 rounded px-3 py-2 text-white focus:outline-none focus:border-red-600 text-sm"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10 mt-6">
                <button
                  type="button"
                  onClick={() => setEditingProfile(null)}
                  className="px-4 py-2 border border-neutral-600 text-neutral-300 hover:border-white hover:text-white text-xs uppercase tracking-wider"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#E50914] text-white font-medium text-xs uppercase tracking-wider hover:bg-red-700"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Profile Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-60 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#181818] border border-white/10 rounded-lg p-6 max-w-lg w-full text-left shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-5">
              <h3 className="text-xl font-normal text-white">Add Profile</h3>
              <button 
                onClick={() => setShowAddModal(false)}
                className="text-neutral-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProfile} className="space-y-4 text-xs">
              <div>
                <label className="block text-neutral-300 mb-2">Choose Avatar Tile</label>
                <div className="flex items-center gap-3">
                  {(['purple-glasses', 'cyan-smile', 'green-smile', 'red-kid', 'blue-smile'] as NetflixAvatarType[]).map((type) => (
                    <div
                      key={type}
                      onClick={() => setSelectedAvatarType(type)}
                      className={`cursor-pointer rounded transition-all ${
                        selectedAvatarType === type ? 'outline outline-3 outline-white' : 'opacity-70 hover:opacity-100'
                      }`}
                    >
                      <NetflixAvatar type={type} size="sm" />
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-neutral-400 mb-1">Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Quinn"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full bg-[#222222] border border-white/10 rounded px-3 py-2 text-white focus:outline-none focus:border-red-600 text-sm"
                />
              </div>

              <div>
                <label className="block text-neutral-400 mb-1">Career Goal / Target Role</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. AI Researcher or Full Stack Engineer"
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                  className="w-full bg-[#222222] border border-white/10 rounded px-3 py-2 text-white focus:outline-none focus:border-red-600 text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-400 mb-1">Proficiency</label>
                  <select
                    value={newProficiency}
                    onChange={(e) => setNewProficiency(e.target.value as SkillLevel)}
                    className="w-full bg-[#222222] border border-white/10 rounded px-3 py-2 text-white focus:outline-none focus:border-red-600 text-sm"
                  >
                    <option value="Beginner">Beginner (Cold-Start)</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-neutral-400 mb-1.5">Primary Interest</label>
                <div className="grid grid-cols-2 gap-2">
                  {allTopics.map(t => (
                    <button
                      type="button"
                      key={t}
                      onClick={() => setSelectedTopics([t])}
                      className={`text-left px-2.5 py-1.5 rounded text-xs transition-colors border ${
                        selectedTopics.includes(t)
                          ? 'border-red-600 bg-red-950/40 text-white font-medium'
                          : 'border-white/5 bg-[#222222] text-neutral-400 hover:text-white'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10 mt-6">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-neutral-600 text-neutral-300 hover:border-white hover:text-white text-xs uppercase tracking-wider"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#E50914] text-white font-medium text-xs uppercase tracking-wider hover:bg-red-700"
                >
                  Continue
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
