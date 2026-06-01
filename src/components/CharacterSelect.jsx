import React, { useState } from 'react';
import { useForumStore, CHARACTER_CATEGORIES, CATEGORY_NAMES } from '../store';

function CharacterSelect({ isOpen, onClose, language }) {
  const { characters, activeCharacters, toggleCharacter } = useForumStore();
  const [selectedCategory, setSelectedCategory] = useState(CHARACTER_CATEGORIES.ALL);

  if (!isOpen) return null;

  const filteredCharacters = selectedCategory === CHARACTER_CATEGORIES.ALL
    ? characters
    : characters.filter(c => c.category === selectedCategory);

  const categories = Object.values(CHARACTER_CATEGORIES);

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="bg-black border border-white/10 rounded-2xl w-full max-w-4xl mx-4 shadow-2xl max-h-[85vh] flex flex-col">
        {/* Header - Minimal Style */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
          <h2 className="text-xs tracking-[0.2em] font-light text-white">
            SELECT CHARACTERS
          </h2>
          <button
            onClick={onClose}
            className="text-xs text-white/40 hover:text-white/80 transition-colors tracking-wide"
          >
            CLOSE
          </button>
        </div>

        {/* Category Filter - Minimal Pills */}
        <div className="flex items-center gap-3 px-6 py-4 border-b border-white/10 overflow-x-auto">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`text-xs tracking-wide transition-all ${
                selectedCategory === category
                  ? 'text-white'
                  : 'text-white/30 hover:text-white/60'
              }`}
            >
              {CATEGORY_NAMES[category].toUpperCase()}
            </button>
          ))}
        </div>

        {/* Character Grid - Minimal Cards */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {filteredCharacters.map((character) => {
              const isActive = activeCharacters.includes(character.id);
              return (
                <button
                  key={character.id}
                  onClick={() => toggleCharacter(character.id)}
                  className={`relative p-5 rounded-xl border text-left transition-all ${
                    isActive
                      ? 'border-white/30 bg-white/[0.03]'
                      : 'border-white/5 bg-transparent hover:border-white/10'
                  }`}
                >
                  {/* Status Dot */}
                  <div className="absolute top-4 right-4">
                    <div className={`w-1.5 h-1.5 rounded-full ${
                      isActive ? 'bg-emerald-400' : 'bg-white/10'
                    }`} />
                  </div>

                  {/* Character Info - Minimal */}
                  <h3 className="text-white text-sm font-light tracking-wide mb-1">
                    {character.name}
                  </h3>
                  <p className="text-white/30 text-xs mb-3">
                    {character.identity}
                  </p>
                  <p className="text-white/20 text-xs line-clamp-2 leading-relaxed">
                    {character.personality}
                  </p>

                  {/* Selected Indicator - Minimal */}
                  {isActive && (
                    <div className="mt-4 flex items-center gap-2">
                      <svg className="w-3 h-3 text-white/40" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-white/40 text-xs tracking-wide">SELECTED</span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer - Minimal */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-white/10">
          <span className="text-white/20 text-xs tracking-wide">
            {activeCharacters.length} SELECTED
          </span>
          <button
            onClick={onClose}
            className="text-xs text-white/40 hover:text-white/80 transition-colors tracking-wide"
          >
            DONE
          </button>
        </div>
      </div>
    </div>
  );
}

export default CharacterSelect;
