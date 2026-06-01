import React, { useState } from 'react';
import { useForumStore } from '../store';
import { t } from '../i18n';
import { currentTheme } from '../theme/accent-themes';

function MemoryPanel({ isOpen, onClose, language }) {
  const { memories, deleteMemory, getMemoryById } = useForumStore();
  const [selectedMemory, setSelectedMemory] = useState(null);

  const accent = currentTheme.accent;

  if (!isOpen) return null;

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString(
      language === 'zh' ? 'zh-CN' : language === 'ja' ? 'ja-JP' : 'en-US',
      {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }
    );
  };

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="bg-black border border-white/10 rounded-2xl w-full max-w-2xl mx-4 shadow-2xl max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <h2 className="text-sm tracking-[0.2em] font-light text-white">
            SAVED MEMORIES
          </h2>
          <button
            onClick={onClose}
            className="text-white/40 hover:text-white transition-colors text-xs tracking-wide"
          >
            CLOSE
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {memories.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-white/30 text-sm">No memories saved yet</p>
              <p className="text-white/20 text-xs mt-2">
                End a conversation to save it as a memory
              </p>
            </div>
          ) : selectedMemory ? (
            /* Memory Detail View */
            <div className="space-y-4">
              <button
                onClick={() => setSelectedMemory(null)}
                className="text-white/40 hover:text-white text-xs transition-colors tracking-wide"
              >
                ← BACK TO LIST
              </button>

              <div className="border border-white/10 rounded-xl p-4">
                <h3 className="text-white text-sm font-light mb-2 tracking-wide">
                  {selectedMemory.title}
                </h3>
                <p className="text-white/40 text-xs mb-4">
                  {formatDate(selectedMemory.createdAt)}
                </p>

                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {selectedMemory.messages.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`p-3 rounded-lg border ${
                        msg.isUser
                          ? 'bg-white/[0.05] border-white/20'
                          : 'bg-white/[0.02] border-white/10'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs text-white/60">
                          {msg.characterName || (msg.isUser ? 'You' : 'AI')}
                        </span>
                      </div>
                      <p className="text-white/80 text-sm">{msg.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* Memory List */
            <div className="space-y-3">
              {memories.map((memory) => (
                <div
                  key={memory.id}
                  className="border border-white/10 rounded-xl p-4 hover:border-white/20 transition-colors cursor-pointer group"
                  onClick={() => setSelectedMemory(memory)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3
                        className="text-white text-sm font-light group-hover:transition-colors tracking-wide"
                        style={{ color: undefined }}
                        onMouseEnter={(e) => e.target.style.color = accent}
                        onMouseLeave={(e) => e.target.style.color = 'white'}
                      >
                        {memory.title}
                      </h3>
                      <p className="text-white/30 text-xs mt-1">
                        {formatDate(memory.createdAt)}
                      </p>
                      <p className="text-white/20 text-xs mt-2 line-clamp-2">
                        {memory.summary}
                      </p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteMemory(memory.id);
                      }}
                      className="ml-4 text-red-400/40 hover:text-red-400 transition-colors text-xs tracking-wide"
                    >
                      DELETE
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MemoryPanel;
