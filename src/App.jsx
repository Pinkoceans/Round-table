import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useForumStore } from './store';
import { languages, t } from './i18n';
import { callAI } from './ai-service';
import { voiceService, VoiceStatus } from './services/voiceService';
import SettingsPanel from './components/SettingsPanel';
import AboutModal from './components/AboutModal';
import SupportModal from './components/SupportModal';
import LoginModal from './components/LoginModal';
import PhoneLoginModal from './components/PhoneLoginModal';
import UsageGuide from './components/UsageGuide';
import UnifiedParticleSphere from './components/UnifiedParticleSphere';
import VoiceSettings from './components/VoiceSettings';
import MemoryPanel from './components/MemoryPanel';
import TransitionAnimation from './components/TransitionAnimation';
import VoicePlayButton from './components/VoicePlayButton';


function App() {
  const { 
    characters, 
    activeCharacters, 
    currentTopicId, 
    topics,
    apiConfigs,
    dialogSettings,
    language,
    setLanguage,
    initStorage,
    saveMemory,
    memories,
    addMessage,
    createTopic,
    switchTopic
  } = useForumStore();
  
  useEffect(() => {
    initStorage();
  }, [initStorage]);
  
  const [activeTab, setActiveTab] = useState('home');
  const [previousTab, setPreviousTab] = useState('home');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [hasTopics, setHasTopics] = useState(topics.length > 0);
  const [showAbout, setShowAbout] = useState(false);
  const [showSupport, setShowSupport] = useState(false);
  const [showTopicPanel, setShowTopicPanel] = useState(true);
  const [sidebarAnimating, setSidebarAnimating] = useState(false);
  const [user, setUser] = useState(null);
  const [loginLoading, setLoginLoading] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showPhoneLogin, setShowPhoneLogin] = useState(false);
  const [showUsageGuide, setShowUsageGuide] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [showVoiceSettings, setShowVoiceSettings] = useState(false);
  const [showMemoryPanel, setShowMemoryPanel] = useState(false);
  const [showCharacterSelect, setShowCharacterSelect] = useState(false);
  const [characterSearchQuery, setCharacterSearchQuery] = useState('');
  const [showTransition, setShowTransition] = useState(false);
  const [particleMode, setParticleMode] = useState('home');
  const [inputMessage, setInputMessage] = useState('');
  const [showChatHistory, setShowChatHistory] = useState(false);
  const [showSaveMemory, setShowSaveMemory] = useState(false);
  const [showLastMessage, setShowLastMessage] = useState(false);
  const [lastMessageData, setLastMessageData] = useState(null);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const messageTimerRef = useRef(null);
  const [memoryTitle, setMemoryTitle] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [voiceStatus, setVoiceStatus] = useState(VoiceStatus.IDLE);
  const menuRef = useRef(null);
  const languageDropdownRef = useRef(null);
  const messagesEndRef = useRef(null);

  const hasValidConfig = apiConfigs.length > 0 && activeCharacters.some(id => {
    const char = characters.find(c => c.id === id);
    return char?.apiConfig?.apiKey;
  });

  // 初始化语音服务
  useEffect(() => {
    voiceService.onStatusChange = (status) => {
      setVoiceStatus(status);
    };
    return () => {
      voiceService.onStatusChange = null;
    };
  }, []);

  // 自动滚动到最新消息
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // 当有新消息时，显示并设置自动消失
  useEffect(() => {
    if (messages.length > 0) {
      const lastMsg = messages[messages.length - 1];
      setLastMessageData(lastMsg);
      setShowLastMessage(true);
      
      // 清除之前的定时器
      if (messageTimerRef.current) {
        clearTimeout(messageTimerRef.current);
      }
      
      // 3秒后自动消失
      messageTimerRef.current = setTimeout(() => {
        setShowLastMessage(false);
        setLastMessageData(null);
      }, 4000);
    }
    
    return () => {
      if (messageTimerRef.current) {
        clearTimeout(messageTimerRef.current);
      }
    };
  }, [messages]);

  // 获取当前话题的消息
  useEffect(() => {
    const currentTopic = topics.find(t => t.id === currentTopicId);
    if (currentTopic) {
      setMessages(currentTopic.messages || []);
    } else {
      setMessages([]);
    }
  }, [topics, currentTopicId]);

  const handleTabChange = useCallback((newTab) => {
    if (newTab === activeTab || isTransitioning) return;
    
    // 如果是人物选项，切换显示3D粒子选择器
    if (newTab === 'characters') {
      setShowCharacterSelect(true);
      setActiveTab('characters');
      return;
    }
    
    // 从characters切换到其他页面时，关闭3D选择器
    if (activeTab === 'characters') {
      setShowCharacterSelect(false);
    }
    
    setIsTransitioning(true);
    setPreviousTab(activeTab);
    
    setTimeout(() => {
      setActiveTab(newTab);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 400);
    }, 150);
  }, [activeTab, isTransitioning]);

  const handleToggleSidebar = useCallback(() => {
    setSidebarAnimating(true);
    setShowTopicPanel(prev => !prev);
    setTimeout(() => {
      setSidebarAnimating(false);
    }, 400);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
      if (languageDropdownRef.current && !languageDropdownRef.current.contains(event.target)) {
        setShowLanguageDropdown(false);
      }
    };

    if (showMenu || showLanguageDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showMenu, showLanguageDropdown]);
  
  useEffect(() => {
    const handleToggleTopicPanel = () => {
      handleToggleSidebar();
    };

    window.addEventListener('toggleTopicPanel', handleToggleTopicPanel);
    return () => {
      window.removeEventListener('toggleTopicPanel', handleToggleTopicPanel);
    };
  }, [handleToggleSidebar]);
  
  useEffect(() => {
    const loadIdentityScript = () => {
      if (window.netlifyIdentity) {
        return Promise.resolve();
      }
      
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'https://identity.netlify.com/v1/netlify-identity-widget.js';
        script.async = true;
        script.onload = resolve;
        script.onerror = (err) => {
          console.warn('Netlify Identity 脚本加载失败，登录功能将不可用', err);
          resolve();
        };
        document.head.appendChild(script);
      });
    };
    
    loadIdentityScript().then(() => {
      if (window.netlifyIdentity) {
        window.netlifyIdentity.on('init', (user) => {
          setUser(user);
          if (user) {
            loadUserConfig();
          }
        });
        window.netlifyIdentity.on('login', (user) => {
          setUser(user);
          window.netlifyIdentity.close();
          loadUserConfig();
        });
        window.netlifyIdentity.on('logout', () => {
          setUser(null);
          clearLocalData();
        });
        window.netlifyIdentity.init();
      } else {
        console.warn('Netlify Identity 不可用，将使用本地登录模式');
      }
    });
  }, []);

  const loadUserConfig = async () => {
    if (!user) return;
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      console.log('本地开发环境，使用本地存储');
      return;
    }
    
    try {
      const token = await user.jwt();
      const res = await fetch('/.netlify/functions/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ action: 'load' })
      });
      
      if (res.ok) {
        const { data } = await res.json();
        if (data) {
          if (data.topics) localStorage.setItem('yuanzhuo_topics', JSON.stringify(data.topics));
          if (data.currentTopicId) localStorage.setItem('yuanzhuo_current_topic', JSON.stringify(data.currentTopicId));
          if (data.activeCharacters) localStorage.setItem('yuanzhuo_active_characters', JSON.stringify(data.activeCharacters));
          if (data.apiConfigs) localStorage.setItem('yuanzhuo_api_configs', JSON.stringify(data.apiConfigs));
          if (data.dialogSettings) localStorage.setItem('yuanzhuo_dialog_settings', JSON.stringify(data.dialogSettings));
          window.location.reload();
        }
      }
    } catch (e) {
      console.log('加载配置失败', e);
    }
  };

  const saveUserConfig = async () => {
    if (!user) return;
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      console.log('本地开发环境，仅使用本地存储');
      return;
    }
    
    try {
      const token = await user.jwt();
      const config = {
        topics: JSON.parse(localStorage.getItem('yuanzhuo_topics') || '[]'),
        currentTopicId: JSON.parse(localStorage.getItem('yuanzhuo_current_topic') || 'null'),
        activeCharacters: JSON.parse(localStorage.getItem('yuanzhuo_active_characters') || '[]'),
        apiConfigs: JSON.parse(localStorage.getItem('yuanzhuo_api_configs') || '[]'),
        dialogSettings: JSON.parse(localStorage.getItem('yuanzhuo_dialog_settings') || '{}')
      };
      
      await fetch('/.netlify/functions/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ 
          action: 'save', 
          data: config 
        })
      });
    } catch (e) {
      console.log('保存配置失败', e);
    }
  };

  const clearLocalData = () => {
    localStorage.removeItem('yuanzhuo_topics');
    localStorage.removeItem('yuanzhuo_current_topic');
    localStorage.removeItem('yuanzhuo_active_characters');
    localStorage.removeItem('yuanzhuo_api_configs');
    localStorage.removeItem('yuanzhuo_dialog_settings');
    window.location.reload();
  };

  const handleLogin = (provider) => {
    if (provider === 'phone') {
      setShowLoginModal(false);
      setShowPhoneLogin(true);
      return;
    }

    if (window.netlifyIdentity) {
      setLoginLoading(true);
      const providers = {
        github: 'github',
        google: 'google',
        gitlab: 'gitlab',
        bitbucket: 'bitbucket',
        facebook: 'facebook'
      };

      if (providers[provider]) {
        window.netlifyIdentity.open({ provider: providers[provider] });
      } else {
        alert(`${provider}登录功能需要在 Netlify 后台配置 OAuth 应用`);
        setLoginLoading(false);
      }
    } else {
      alert('Netlify Identity 未加载，请使用手机号登录');
      setShowLoginModal(false);
      setShowPhoneLogin(true);
      setLoginLoading(false);
    }
  };

  const handlePhoneLogin = (userData) => {
    setUser(userData);
    setShowPhoneLogin(false);
    loadUserConfig();
  };

  const handleLogout = () => {
    if (window.confirm('确定要退出登录吗？退出后将清除本地数据。')) {
      window.netlifyIdentity.logout();
    }
  };
  
  useEffect(() => {
    if (user) {
      const timer = setTimeout(() => {
        saveUserConfig();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [topics, activeCharacters, apiConfigs, dialogSettings, user]);

  useEffect(() => {
    setHasTopics(topics.length > 0);
  }, [topics]);

  // 获取当前AI模型信息
  const getCurrentAIModel = () => {
    if (apiConfigs.length > 0) {
      const config = apiConfigs[0];
      return {
        provider: config.provider || 'AI',
        model: config.model || 'Ready'
      };
    }
    return { provider: 'AI', model: 'Ready' };
  };

  const currentAIModel = getCurrentAIModel();

  // 波形动画组件
  const WaveformIcon = () => (
    <svg className="w-4 h-4 text-white/60" viewBox="0 0 24 24" fill="currentColor">
      <rect x="4" y="8" width="2" height="8" rx="1">
        <animate attributeName="height" values="8;12;8" dur="0.8s" repeatCount="indefinite" />
        <animate attributeName="y" values="8;6;8" dur="0.8s" repeatCount="indefinite" />
      </rect>
      <rect x="8" y="6" width="2" height="12" rx="1">
        <animate attributeName="height" values="12;6;12" dur="0.6s" repeatCount="indefinite" />
        <animate attributeName="y" values="6;9;6" dur="0.6s" repeatCount="indefinite" />
      </rect>
      <rect x="12" y="4" width="2" height="16" rx="1">
        <animate attributeName="height" values="16;8;16" dur="0.7s" repeatCount="indefinite" />
        <animate attributeName="y" values="4;8;4" dur="0.7s" repeatCount="indefinite" />
      </rect>
      <rect x="16" y="6" width="2" height="12" rx="1">
        <animate attributeName="height" values="12;6;12" dur="0.5s" repeatCount="indefinite" />
        <animate attributeName="y" values="6;9;6" dur="0.5s" repeatCount="indefinite" />
      </rect>
      <rect x="20" y="8" width="2" height="8" rx="1">
        <animate attributeName="height" values="8;12;8" dur="0.9s" repeatCount="indefinite" />
        <animate attributeName="y" values="8;6;8" dur="0.9s" repeatCount="indefinite" />
      </rect>
    </svg>
  );

  // 发送消息并获取AI回复
  const handleSendMessage = async () => {
    const text = inputMessage.trim();
    if (!text || isLoading) return;

    // 如果没有话题，先创建一个
    let topicId = currentTopicId;
    if (!topicId) {
      const newTopic = createTopic(text.substring(0, 30), text);
      topicId = newTopic.id;
    }

    // 添加用户消息
    const userMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      senderName: 'User',
      timestamp: Date.now(),
    };
    addMessage(userMessage);
    setInputMessage('');

    // 获取当前话题的所有消息作为对话历史
    const currentTopic = topics.find(t => t.id === topicId);
    const conversationHistory = currentTopic ? [...currentTopic.messages, userMessage] : [userMessage];

    // 为每个活跃角色调用AI
    const activeChars = characters.filter(c => activeCharacters.includes(c.id));
    if (activeChars.length === 0) {
      console.warn('没有选中的角色');
      return;
    }

    setIsLoading(true);

    for (const character of activeChars) {
      if (!character.apiConfig?.apiKey) {
        console.warn(`${character.name} 没有配置API Key`);
        continue;
      }

      try {
        const response = await callAI(
          character,
          conversationHistory,
          character.apiConfig,
          conversationHistory,
          dialogSettings
        );

        const aiMessage = {
          id: `${Date.now()}_${character.id}`,
          role: 'assistant',
          content: response,
          senderName: character.name,
          characterId: character.id,
          timestamp: Date.now(),
        };

        addMessage(aiMessage);

        // 自动播放语音
        const cleanText = response.replace(/[（(].*?[）)]/g, '').trim();
        if (cleanText) {
          voiceService.speak(cleanText, {
            messageId: aiMessage.id,
            lang: language === 'zh' ? 'zh-CN' : language === 'en' ? 'en-US' : 'ja-JP'
          });
        }
      } catch (error) {
        console.error(`${character.name} 回复失败:`, error);
        const errorMessage = {
          id: `${Date.now()}_error_${character.id}`,
          role: 'assistant',
          content: `抱歉，我暂时无法回应。错误: ${error.message}`,
          senderName: character.name,
          characterId: character.id,
          timestamp: Date.now(),
          isError: true,
        };
        addMessage(errorMessage);
      }
    }

    setIsLoading(false);
  };

  // 语音输入
  const handleVoiceInput = () => {
    if (voiceStatus === VoiceStatus.RECORDING) {
      voiceService.stop();
    } else {
      voiceService.start({
        language,
        onResult: (text) => {
          setInputMessage(prev => prev + text);
        },
        onError: (error) => {
          console.error('语音识别错误:', error);
        }
      });
    }
  };

  // 处理标签切换，添加过渡动画
  const handleTabChangeWithTransition = (newTab) => {
    if (newTab === 'characters' && activeTab !== 'characters') {
      // 立即切换粒子模式到 characters
      setParticleMode('characters');
      
      // 显示过渡动画
      setShowTransition(true);
      
      // 延迟后切换到 characters 页面
      setTimeout(() => {
        setActiveTab('characters');
      }, 1500); // 1.5秒动画时间
      
      // 动画结束后关闭过渡
      setTimeout(() => {
        setShowTransition(false);
      }, 2500);
    } else if (newTab !== 'characters' && activeTab === 'characters') {
      // 从 characters 切换出去，立即切换粒子模式
      setParticleMode('home');
      setActiveTab(newTab);
    } else {
      setActiveTab(newTab);
      setParticleMode(newTab === 'characters' ? 'characters' : 'home');
    }
  };

  // 保存记忆
  const handleSaveMemory = () => {
    if (!memoryTitle.trim()) return;
    
    // 获取当前话题的消息
    const currentTopic = topics.find(t => t.id === currentTopicId);
    if (currentTopic && currentTopic.messages) {
      saveMemory(
        memoryTitle,
        currentTopic.messages,
        activeCharacters.map(id => characters.find(c => c.id === id)?.name).filter(Boolean)
      );
    }
    
    setMemoryTitle('');
    setShowSaveMemory(false);
  };

  return (
    <div className="min-h-screen bg-black overflow-hidden relative font-sans">
      {/* 统一的3D粒子系统 */}
      <div className="fixed inset-0 flex items-center justify-center" style={{ zIndex: 1 }}>
        <div className="w-full h-full">
          <UnifiedParticleSphere 
            mode={particleMode}
            searchQuery={characterSearchQuery}
            onSelectCharacter={(char) => {
              console.log('App.jsx: onSelectCharacter called with', char?.name);
              setSelectedCharacter(prev => {
                const newVal = prev?.id === char.id ? null : char;
                console.log('App.jsx: selectedCharacter changed from', prev?.name, 'to', newVal?.name);
                return newVal;
              });
            }}
          />
        </div>
      </div>
      
      {/* 人物信息卡片 - HTML覆盖层 */}
      {activeTab === 'characters' && selectedCharacter && (
        <div 
          className="fixed z-[10000] pointer-events-auto"
          style={{
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <div 
            className="bg-black/95 border border-white/50 rounded-xl px-6 py-4 shadow-2xl cursor-pointer hover:bg-black/90 transition-colors"
            style={{ 
              minWidth: '240px', 
              maxWidth: '280px',
              backdropFilter: 'blur(10px)',
            }}
            onClick={() => setSelectedCharacter(null)}
          >
            <div className="text-white font-bold text-lg mb-2">{selectedCharacter.name}</div>
            <div className="text-white/80 text-sm mb-3">{selectedCharacter.identity}</div>
            <div className="text-white/70 text-sm leading-relaxed mb-4">
              {selectedCharacter.background || selectedCharacter.personality || 'No description'}
            </div>
            <div className="flex items-center gap-2 pt-3 border-t border-white/25">
              <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: '#FF8E53' }} />
              <span className="text-white/60 text-sm">
                {selectedCharacter.category || 'Unknown'}
              </span>
              {activeCharacters.includes(selectedCharacter.id) && (
                <span className="text-emerald-400 text-sm ml-auto font-semibold">Selected</span>
              )}
            </div>
          </div>
        </div>
      )}
      
      {/* Character Selection UI Overlay - 只在characters模式显示 */}
      {activeTab === 'characters' && (
        <>
          {/* 搜索框 */}
          <div className="fixed top-20 left-0 right-0 z-50 flex justify-center px-4 pointer-events-auto">
            <div className="relative w-full max-w-md">
              <input
                type="text"
                value={characterSearchQuery}
                onChange={(e) => setCharacterSearchQuery(e.target.value)}
                placeholder="Search characters..."
                className="w-full bg-white/10 border border-white/20 rounded-full px-5 py-3 text-sm text-white placeholder-white/50 focus:outline-none focus:border-white/40 transition-colors"
              />
              <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

        </>
      )}
      
      {/* Main Content Area */}
      <main className="relative z-10 h-screen flex flex-col">
        {/* Top Navigation Bar - Reference Style */}
        <header className="flex items-center justify-center px-6 py-5">
          <nav className="flex items-center space-x-8">
            {[
              { id: 'home', label: 'HOME' },
              { id: 'characters', label: 'CHARACTERS' },
              { id: 'settings', label: 'SETTINGS' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => handleTabChangeWithTransition(item.id)}
                className={`text-xs tracking-[0.2em] font-light transition-all ${
                  activeTab === item.id
                    ? 'text-white'
                    : 'text-white/40 hover:text-white/70'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </header>

        {/* AI Status Indicator - Hidden in settings */}
        {activeTab !== 'settings' && (
          <div className="flex items-center justify-center py-4">
            <div className="flex items-center space-x-3">
              <WaveformIcon />
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
              <span className="text-sm text-white/80 font-light tracking-wide">
                {currentAIModel.model}
              </span>
            </div>
          </div>
        )}

        {/* Content Area */}
        <div className="flex-1 overflow-hidden relative">
          {/* Home Chat UI - 全屏沉浸式，与3D粒子融合 */}
          {activeTab === 'home' && (
            <div className="h-full flex flex-col">
              {/* Messages Area - 居中显示最新消息 */}
              <div className="flex-1 flex items-center justify-center px-4 relative">
                {/* 空状态提示 */}
                {messages.length === 0 && !showLastMessage && (
                  <div className="text-center">
                    <p className="text-white/20 text-xs tracking-[0.3em] mb-2">
                      {activeCharacters.length === 0 
                        ? 'SELECT CHARACTERS FIRST' 
                        : 'START CONVERSATION'}
                    </p>
                    <p className="text-white/10 text-[10px] tracking-wide">
                      {activeCharacters.length > 0 && `${activeCharacters.length} characters ready`}
                    </p>
                  </div>
                )}
                
                {/* 最新消息 - 居中显示，4秒后消失 */}
                {showLastMessage && lastMessageData && (
                  <div className="animate-fade-in transition-all duration-500 w-full flex justify-center">
                    {lastMessageData.role === 'assistant' && (
                      <div className="flex flex-col items-start w-full max-w-[70%]">
                        {/* 角色名称 - 悬浮在消息上方 */}
                        <div className="flex items-center gap-2 mb-2 ml-1">
                          <span className="text-xs text-white/50 font-medium tracking-wide">
                            {lastMessageData.senderName}
                          </span>
                          <VoicePlayButton 
                            text={lastMessageData.content} 
                            messageId={lastMessageData.id}
                            language={language}
                          />
                        </div>
                        {/* 消息气泡 - 微信风格，半透明背景 */}
                        <div 
                          className="bg-white/[0.06] backdrop-blur-sm border border-white/10 rounded-2xl rounded-tl-md px-4 py-3 transition-all hover:bg-white/[0.08]"
                          style={{
                            boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                          }}
                        >
                          <p className="text-[15px] text-white/90 leading-[1.6] font-normal" style={{ letterSpacing: '0.01em' }}>
                            {lastMessageData.content}
                          </p>
                        </div>
                      </div>
                    )}
                    
                    {lastMessageData.role === 'user' && (
                      <div className="flex justify-end w-full">
                        <div className="max-w-[70%]">
                          {/* 消息气泡 - 微信风格，蓝色背景 */}
                          <div 
                            className="bg-[#4a6fa5] rounded-2xl rounded-tr-md px-4 py-3 transition-all hover:bg-[#5578b0]"
                            style={{
                              boxShadow: '0 2px 8px rgba(74,111,165,0.3)',
                            }}
                          >
                            <p className="text-[15px] text-white leading-[1.6] font-normal" style={{ letterSpacing: '0.01em' }}>
                              {lastMessageData.content}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
                
                {/* 加载中动画 */}
                {isLoading && (
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl rounded-tl-sm px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div className="flex gap-1">
                          <div className="w-1.5 h-1.5 bg-white/30 rounded-full animate-bounce" />
                          <div className="w-1.5 h-1.5 bg-white/30 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }} />
                          <div className="w-1.5 h-1.5 bg-white/30 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }} />
                        </div>
                        <span className="text-[10px] text-white/30 tracking-[0.2em]">THINKING</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* 对话记录按钮 */}
              {messages.length > 0 && (
                <div className="flex justify-center py-2">
                  <button 
                    onClick={() => setShowChatHistory(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-all"
                  >
                    <svg className="w-4 h-4 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    <span className="text-[10px] text-white/50 tracking-[0.15em] uppercase">Chat History</span>
                    <span className="text-[10px] text-white/30">({messages.length})</span>
                  </button>
                </div>
              )}

              {/* Input Area - 底部悬浮，半透明融合 */}
              <div className="px-4 pb-6 pt-2">
                <div className="max-w-xl mx-auto">
                  <div className="relative flex items-center">
                    {/* 语音输入按钮 */}
                    <button
                      onClick={handleVoiceInput}
                      className={`absolute left-3 w-8 h-8 flex items-center justify-center rounded-full transition-all ${
                        voiceStatus === VoiceStatus.RECORDING
                          ? 'bg-red-500/20 text-red-400 animate-pulse'
                          : 'bg-white/5 text-white/40 hover:bg-white/10 hover:text-white/60'
                      }`}
                    >
                      {voiceStatus === VoiceStatus.RECORDING ? (
                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                          <rect x="6" y="4" width="4" height="16" rx="2" />
                          <rect x="14" y="4" width="4" height="16" rx="2" />
                        </svg>
                      ) : (
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                        </svg>
                      )}
                    </button>
                    <input
                      type="text"
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      placeholder={voiceStatus === VoiceStatus.RECORDING ? 'Listening...' : 'Say something...'}
                      className="w-full bg-white/[0.03] border border-white/[0.08] rounded-full pl-12 pr-12 py-3.5 text-sm text-white/80 placeholder-white/20 focus:outline-none focus:border-white/20 focus:bg-white/[0.05] transition-all"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          handleSendMessage();
                        }
                      }}
                      disabled={isLoading}
                    />
                    <button 
                      onClick={handleSendMessage}
                      disabled={!inputMessage.trim() || isLoading}
                      className="absolute right-3 w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 disabled:bg-transparent disabled:text-white/10 transition-all"
                    >
                      {isLoading ? (
                        <svg className="w-3.5 h-3.5 text-white/30 animate-spin" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                      ) : (
                        <svg className="w-3.5 h-3.5 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                      )}
                    </button>
                  </div>
                  
                  {/* 底部快捷操作 */}
                  <div className="flex items-center justify-center gap-6 mt-3">
                    <button 
                      onClick={() => setShowMemoryPanel(true)}
                      className="text-[10px] text-white/30 hover:text-white/50 transition-colors tracking-[0.15em] uppercase"
                    >
                      Memories
                    </button>
                    <span className="text-white/10">|</span>
                    <button 
                      onClick={() => setShowVoiceSettings(true)}
                      className="text-[10px] text-white/30 hover:text-white/50 transition-colors tracking-[0.15em] uppercase"
                    >
                      Voice
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Settings Page - 全屏覆盖，不显示Home UI */}
          {activeTab === 'settings' && (
            <div className="absolute inset-0 bg-black/80 backdrop-blur-md z-50 overflow-auto">
              <div className="max-w-4xl mx-auto px-6 py-8 pb-32">
                <SettingsPanel />
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Chat History Modal - WeChat/QQ Style */}
      {showChatHistory && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="bg-[#1a1a2e] border border-white/10 rounded-2xl w-full max-w-lg mx-4 flex flex-col" style={{ height: '70vh' }}>
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
              <h2 className="text-sm tracking-[0.2em] font-light text-white">
                CHAT HISTORY
              </h2>
              <button
                onClick={() => setShowChatHistory(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
              >
                <svg className="w-4 h-4 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Messages List */}
            <div className="flex-1 overflow-auto px-4 py-4 space-y-4">
              {messages.map((msg, index) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.role === 'assistant' && (
                    <div className="flex items-start gap-2 max-w-[80%]">
                      {/* Avatar */}
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center flex-shrink-0">
                        <span className="text-[10px] text-white font-medium">
                          {msg.senderName?.charAt(0) || 'AI'}
                        </span>
                      </div>
                      {/* Message Bubble */}
                      <div>
                        <div className="text-[10px] text-white/40 mb-1">{msg.senderName}</div>
                        <div className="bg-white/10 rounded-2xl rounded-tl-sm px-4 py-2.5">
                          <p className="text-sm text-white/90 leading-relaxed">
                            {msg.content}
                          </p>
                        </div>
                        <div className="text-[9px] text-white/20 mt-1">
                          {new Date(msg.timestamp).toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {msg.role === 'user' && (
                    <div className="flex items-start gap-2 max-w-[80%] flex-row-reverse">
                      {/* Avatar */}
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center flex-shrink-0">
                        <span className="text-[10px] text-white font-medium">Me</span>
                      </div>
                      {/* Message Bubble */}
                      <div>
                        <div className="bg-[#4a6fa5] rounded-2xl rounded-tr-sm px-4 py-2.5">
                          <p className="text-sm text-white leading-relaxed">
                            {msg.content}
                          </p>
                        </div>
                        <div className="text-[9px] text-white/20 mt-1 text-right">
                          {new Date(msg.timestamp).toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Save Memory Modal */}
      {showSaveMemory && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="bg-black border border-white/10 rounded-2xl w-full max-w-md mx-4 p-6">
            <h2 className="text-sm tracking-[0.2em] font-light text-white mb-4">
              SAVE MEMORY
            </h2>
            <input
              type="text"
              value={memoryTitle}
              onChange={(e) => setMemoryTitle(e.target.value)}
              placeholder="Enter memory title..."
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-white/20 transition-colors mb-4"
              autoFocus
            />
            <div className="flex gap-3">
              <button
                onClick={() => setShowSaveMemory(false)}
                className="flex-1 py-3 text-xs text-white/50 hover:text-white/80 transition-colors"
              >
                CANCEL
              </button>
              <button
                onClick={handleSaveMemory}
                className="flex-1 py-3 bg-white/10 hover:bg-white/20 text-white text-xs rounded-xl transition-colors"
              >
                SAVE
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Memory Panel */}
      <MemoryPanel 
        isOpen={showMemoryPanel}
        onClose={() => setShowMemoryPanel(false)}
        language={language}
      />

      {/* Modals */}
      {showAbout && (
        <AboutModal onClose={() => setShowAbout(false)} />
      )}

      {showSupport && (
        <SupportModal onClose={() => setShowSupport(false)} />
      )}

      {showLoginModal && (
        <LoginModal
          onClose={() => setShowLoginModal(false)}
          onLogin={handleLogin}
        />
      )}

      {showPhoneLogin && (
        <PhoneLoginModal
          onClose={() => setShowPhoneLogin(false)}
          onLogin={handlePhoneLogin}
        />
      )}

      {showUsageGuide && (
        <UsageGuide onClose={() => setShowUsageGuide(false)} />
      )}

      {showVoiceSettings && (
        <VoiceSettings 
          isOpen={showVoiceSettings}
          onClose={() => setShowVoiceSettings(false)}
          language={language}
        />
      )}

    </div>
  );
}

export default App;
