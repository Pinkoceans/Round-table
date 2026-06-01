import React, { useState, useEffect } from 'react';
import { voiceService } from '../services/voiceService';
import { edgeTTSService, EDGE_VOICES } from '../services/edgeTTSService';
import { useForumStore } from '../store';
import { t } from '../i18n';

function VoiceSettings({ isOpen, onClose, language }) {
  const { voiceConfigs, setVoiceConfig } = useForumStore();
  const [activeEngine, setActiveEngine] = useState(voiceConfigs.global?.engine || 'browser');
  const [browserVoices, setBrowserVoices] = useState([]);
  const [currentBrowserVoice, setCurrentBrowserVoice] = useState(null);
  const [currentEdgeVoice, setCurrentEdgeVoice] = useState(voiceConfigs.global?.edge?.voice || 'zh-CN-XiaoxiaoNeural');
  const [rate, setRate] = useState(voiceConfigs.global?.[activeEngine]?.rate || 1.0);
  const [pitch, setPitch] = useState(voiceConfigs.global?.[activeEngine]?.pitch || 1.0);
  const [volume, setVolume] = useState(voiceConfigs.global?.[activeEngine]?.volume || 1.0);
  const [isTTSSupported, setIsTTSSupported] = useState(false);
  const [testText, setTestText] = useState('');

  const engines = [
    { id: 'browser', label: '浏览器原生', description: '使用系统自带语音' },
    { id: 'edge', label: 'Edge TTS', description: '微软高质量在线语音' },
  ];

  useEffect(() => {
    if (isOpen) {
      checkSupport();
      loadBrowserVoices();
      // 设置测试文本
      const texts = {
        zh: '你好，我是你的AI助手，很高兴为你服务。',
        en: 'Hello, I am your AI assistant. Nice to meet you.',
        ja: 'こんにちは、AIアシスタントです。よろしくお願いします。'
      };
      setTestText(texts[language] || texts.zh);
    }
  }, [isOpen, language]);

  const checkSupport = () => {
    setIsTTSSupported(voiceService.checkTTSSupport());
  };

  const loadBrowserVoices = () => {
    const voices = voiceService.getAvailableVoices();
    setBrowserVoices(voices);
    setCurrentBrowserVoice(voiceService.getCurrentVoice());
  };

  const handleEngineChange = (engine) => {
    setActiveEngine(engine);
    const config = voiceConfigs.global?.[engine] || {};
    setRate(config.rate || 1.0);
    setPitch(config.pitch || 1.0);
    setVolume(config.volume || 1.0);
    if (engine === 'edge') {
      setCurrentEdgeVoice(config.voice || 'zh-CN-XiaoxiaoNeural');
    }
  };

  const handleBrowserVoiceChange = (voiceName) => {
    voiceService.setVoice(voiceName);
    setCurrentBrowserVoice(voiceService.getCurrentVoice());
  };

  const handleEdgeVoiceChange = (voiceName) => {
    setCurrentEdgeVoice(voiceName);
    edgeTTSService.setVoice(voiceName);
  };

  const handleRateChange = (value) => {
    setRate(value);
    if (activeEngine === 'browser') {
      voiceService.setRate?.(value);
    } else {
      edgeTTSService.setRate(value);
    }
  };

  const handlePitchChange = (value) => {
    setPitch(value);
    if (activeEngine === 'browser') {
      voiceService.setPitch?.(value);
    } else {
      edgeTTSService.setPitch(value);
    }
  };

  const handleVolumeChange = (value) => {
    setVolume(value);
    if (activeEngine === 'browser') {
      voiceService.setVolume?.(value);
    } else {
      edgeTTSService.setVolume(value);
    }
  };

  const handleSave = () => {
    const config = {
      global: {
        engine: activeEngine,
        browser: {
          voice: currentBrowserVoice?.name || null,
          rate,
          pitch,
          volume,
        },
        edge: {
          voice: currentEdgeVoice,
          rate,
          pitch,
          volume,
        },
      },
    };
    setVoiceConfig(config);
    onClose();
  };

  const handleTestVoice = async () => {
    if (activeEngine === 'browser') {
      voiceService.speak(testText, {
        rate,
        pitch,
        volume,
      });
    } else if (activeEngine === 'edge') {
      await edgeTTSService.speak(testText, {
        voice: currentEdgeVoice,
        rate,
        pitch,
        volume,
      });
    }
  };

  const getCurrentLanguageVoices = () => {
    const langMap = { zh: 'zh-CN', en: 'en-US', ja: 'ja-JP' };
    const lang = langMap[language] || 'zh-CN';
    return EDGE_VOICES[lang] || EDGE_VOICES['zh-CN'];
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="bg-black border border-white/10 rounded-2xl w-full max-w-lg mx-4 shadow-2xl max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 flex-shrink-0">
          <h2 className="text-sm tracking-[0.2em] font-light text-white">
            VOICE SETTINGS
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-white/40 hover:text-white/80 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-5 space-y-6 overflow-y-auto flex-1">
          {!isTTSSupported && activeEngine === 'browser' && (
            <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl">
              <p className="text-xs text-amber-400">
                您的浏览器不支持语音合成，建议切换到 Edge TTS
              </p>
            </div>
          )}

          {/* Engine Selection */}
          <div>
            <label className="block text-[10px] text-white/40 mb-3 tracking-[0.2em] uppercase">
              Voice Engine
            </label>
            <div className="grid grid-cols-2 gap-3">
              {engines.map((engine) => (
                <button
                  key={engine.id}
                  onClick={() => handleEngineChange(engine.id)}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    activeEngine === engine.id
                      ? 'bg-white/10 border-white/30 text-white'
                      : 'bg-white/[0.02] border-white/[0.06] text-white/50 hover:bg-white/5 hover:border-white/10'
                  }`}
                >
                  <div className="text-xs font-medium mb-1">{engine.label}</div>
                  <div className="text-[10px] text-white/30">{engine.description}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Voice Selection */}
          <div>
            <label className="block text-[10px] text-white/40 mb-3 tracking-[0.2em] uppercase">
              Voice
            </label>
            {activeEngine === 'browser' ? (
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {browserVoices.length === 0 ? (
                  <p className="text-xs text-white/30 py-2">暂无可用语音</p>
                ) : (
                  browserVoices.map((voice) => (
                    <button
                      key={voice.name}
                      onClick={() => handleBrowserVoiceChange(voice.name)}
                      className={`w-full text-left py-2.5 px-4 rounded-xl text-xs transition-all ${
                        currentBrowserVoice?.name === voice.name
                          ? 'bg-white/10 text-white border border-white/20'
                          : 'bg-white/[0.02] text-white/50 hover:bg-white/5 border border-transparent'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{voice.label}</span>
                        {currentBrowserVoice?.name === voice.name && (
                          <svg className="w-4 h-4 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                    </button>
                  ))
                )}
              </div>
            ) : (
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {getCurrentLanguageVoices().map((voice) => (
                  <button
                    key={voice.name}
                    onClick={() => handleEdgeVoiceChange(voice.name)}
                    className={`w-full text-left py-2.5 px-4 rounded-xl text-xs transition-all ${
                      currentEdgeVoice === voice.name
                        ? 'bg-white/10 text-white border border-white/20'
                        : 'bg-white/[0.02] text-white/50 hover:bg-white/5 border border-transparent'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <span>{voice.label}</span>
                        <span className="text-white/30 ml-2">{voice.style}</span>
                      </div>
                      {currentEdgeVoice === voice.name && (
                        <svg className="w-4 h-4 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Rate Control */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-[10px] text-white/40 tracking-[0.2em] uppercase">Speed</label>
              <span className="text-xs text-white/60">{rate.toFixed(1)}x</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="2.0"
              step="0.1"
              value={rate}
              onChange={(e) => handleRateChange(parseFloat(e.target.value))}
              className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-white/50"
            />
            <div className="flex justify-between text-[10px] text-white/20 mt-1">
              <span>慢</span>
              <span>正常</span>
              <span>快</span>
            </div>
          </div>

          {/* Pitch Control */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-[10px] text-white/40 tracking-[0.2em] uppercase">Pitch</label>
              <span className="text-xs text-white/60">{pitch.toFixed(1)}</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="1.5"
              step="0.1"
              value={pitch}
              onChange={(e) => handlePitchChange(parseFloat(e.target.value))}
              className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-white/50"
            />
            <div className="flex justify-between text-[10px] text-white/20 mt-1">
              <span>低</span>
              <span>正常</span>
              <span>高</span>
            </div>
          </div>

          {/* Volume Control */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-[10px] text-white/40 tracking-[0.2em] uppercase">Volume</label>
              <span className="text-xs text-white/60">{Math.round(volume * 100)}%</span>
            </div>
            <input
              type="range"
              min="0.1"
              max="1.0"
              step="0.1"
              value={volume}
              onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
              className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-white/50"
            />
          </div>

          {/* Test Text Input */}
          <div>
            <label className="block text-[10px] text-white/40 mb-2 tracking-[0.2em] uppercase">
              Test Text
            </label>
            <textarea
              value={testText}
              onChange={(e) => setTestText(e.target.value)}
              rows={2}
              className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3 text-xs text-white/70 placeholder-white/20 focus:outline-none focus:border-white/20 transition-colors resize-none"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-white/10 flex gap-3 flex-shrink-0">
          <button
            onClick={handleTestVoice}
            className="flex-1 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 text-xs rounded-xl transition-all flex items-center justify-center gap-2 tracking-wide"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
            </svg>
            Preview
          </button>
          <button
            onClick={handleSave}
            className="flex-1 py-3 bg-white/10 hover:bg-white/20 text-white text-xs rounded-xl transition-all tracking-wide"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default VoiceSettings;
