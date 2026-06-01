import React, { useState, useEffect } from 'react';
import { voiceService, VoiceStatus } from '../services/voiceService';

function VoicePlayButton({ text, messageId, language }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    setIsSupported(voiceService.checkTTSSupport());
    
    // 注册播放状态回调
    if (messageId) {
      voiceService.onSpeakingStatus(messageId, (status) => {
        if (status === 'start') {
          setIsPlaying(true);
        } else if (status === 'end' || status === 'error') {
          setIsPlaying(false);
        }
      });
    }

    return () => {
      if (messageId) {
        voiceService.offSpeakingStatus(messageId);
      }
    };
  }, [messageId]);

  const handlePlay = () => {
    if (isPlaying) {
      voiceService.stopSpeaking();
      setIsPlaying(false);
    } else {
      const success = voiceService.speak(text, { 
        messageId,
        lang: language === 'zh' ? 'zh-CN' : language === 'en' ? 'en-US' : 'ja-JP'
      });
      if (success) {
        setIsPlaying(true);
      }
    }
  };

  if (!isSupported) return null;

  return (
    <button
      onClick={handlePlay}
      className={`inline-flex items-center justify-center w-7 h-7 rounded-full transition-all ${
        isPlaying 
          ? 'bg-blue-500 text-white animate-pulse' 
          : 'bg-white/10 text-white/60 hover:bg-white/20 hover:text-white'
      }`}
      title={isPlaying ? '停止播放' : '播放语音'}
    >
      {isPlaying ? (
        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
          <rect x="6" y="4" width="4" height="16" rx="1" />
          <rect x="14" y="4" width="4" height="16" rx="1" />
        </svg>
      ) : (
        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M8 5v14l11-7z" />
        </svg>
      )}
    </button>
  );
}

export default VoicePlayButton;
