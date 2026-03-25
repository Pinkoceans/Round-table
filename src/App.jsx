import React, { useState, useEffect, useRef } from 'react';
import { useForumStore } from './store';
import ChatPanel from './components/ChatPanel';
import SettingsPanel from './components/SettingsPanel';
import TopicCharacterPanel from './components/TopicCharacterPanel';
import AboutModal from './components/AboutModal';
import SupportModal from './components/SupportModal';
import LoginModal from './components/LoginModal';
import PhoneLoginModal from './components/PhoneLoginModal';
import UsageGuide from './components/UsageGuide';

function App() {
  const { 
    characters, 
    activeCharacters, 
    currentTopicId, 
    topics,
    apiConfigs,
    dialogSettings
  } = useForumStore();
  
  const [activeTab, setActiveTab] = useState('chat');
  const [hasTopics, setHasTopics] = useState(topics.length > 0);
  const [showAbout, setShowAbout] = useState(false);
  const [showSupport, setShowSupport] = useState(false);
  const [user, setUser] = useState(null);
  const [loginLoading, setLoginLoading] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showPhoneLogin, setShowPhoneLogin] = useState(false);
  const [showUsageGuide, setShowUsageGuide] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  // 点击外部关闭菜单
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    if (showMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showMenu]);
  
  // 初始化 Netlify Identity
  useEffect(() => {
    // 动态加载 Netlify Identity 脚本
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
          resolve(); // 即使失败也继续执行
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

  // 加载用户配置
  const loadUserConfig = async () => {
    if (!user) return;
    // 本地开发环境跳过云端同步
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
          // 恢复用户数据
          if (data.topics) localStorage.setItem('yuanzhuo_topics', JSON.stringify(data.topics));
          if (data.currentTopicId) localStorage.setItem('yuanzhuo_current_topic', JSON.stringify(data.currentTopicId));
          if (data.activeCharacters) localStorage.setItem('yuanzhuo_active_characters', JSON.stringify(data.activeCharacters));
          if (data.apiConfigs) localStorage.setItem('yuanzhuo_api_configs', JSON.stringify(data.apiConfigs));
          if (data.dialogSettings) localStorage.setItem('yuanzhuo_dialog_settings', JSON.stringify(data.dialogSettings));
          // 刷新页面以加载数据
          window.location.reload();
        }
      }
    } catch (e) {
      console.log('加载配置失败', e);
    }
  };

  // 保存用户配置
  const saveUserConfig = async () => {
    if (!user) return;
    // 本地开发环境跳过云端同步
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

  // 清除本地数据
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

    // 处理第三方登录
    if (window.netlifyIdentity) {
      setLoginLoading(true);
      // 使用 Netlify Identity 的 OAuth 提供商
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
        // 微信、支付宝、抖音等需要自定义 OAuth
        alert(`${provider}登录功能需要在 Netlify 后台配置 OAuth 应用`);
        setLoginLoading(false);
      }
    } else {
      // Netlify Identity 不可用时，提示使用手机号登录
      alert('Netlify Identity 未加载，请使用手机号登录');
      setShowLoginModal(false);
      setShowPhoneLogin(true);
      setLoginLoading(false);
    }
  };

  const handlePhoneLogin = (userData) => {
    // 手机号登录成功，模拟用户数据
    setUser(userData);
    setShowPhoneLogin(false);
    loadUserConfig();
  };

  const handleLogout = () => {
    if (window.confirm('确定要退出登录吗？退出后将清除本地数据。')) {
      window.netlifyIdentity.logout();
    }
  };
  
  // 监听数据变化，自动保存到云端
  useEffect(() => {
    if (user) {
      const timer = setTimeout(() => {
        saveUserConfig();
      }, 1000); // 1 秒延迟，避免频繁保存
      return () => clearTimeout(timer);
    }
  }, [topics, activeCharacters, apiConfigs, dialogSettings, user]);

  useEffect(() => {
    setHasTopics(topics.length > 0);
  }, [topics]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-gray-50 to-slate-200">
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-300/50 shadow-sm z-50 relative">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-700 to-gray-500 bg-clip-text text-transparent">圆桌</h1>
              <span className="text-sm text-gray-500">与伟人对话的思想平台</span>
            </div>
            
            <div className="flex items-center space-x-2">
              {/* 圆桌图标 */}
              <button
                onClick={() => setActiveTab('chat')}
                className={`p-2.5 rounded-lg transition-all ${
                  activeTab === 'chat'
                    ? 'bg-gray-800 text-white shadow-lg'
                    : 'bg-white/60 text-gray-600 hover:bg-white/80 hover:shadow-sm'
                }`}
                title="圆桌"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </button>
              
              {/* 设置图标 */}
              <button
                onClick={() => setActiveTab('settings')}
                className={`p-2.5 rounded-lg transition-all ${
                  activeTab === 'settings'
                    ? 'bg-gray-800 text-white shadow-lg'
                    : 'bg-white/60 text-gray-600 hover:bg-white/80 hover:shadow-sm'
                }`}
                title="设置"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
              
              {/* 汉堡菜单按钮 */}
              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setShowMenu(!showMenu)}
                  className="p-2.5 rounded-lg bg-white/60 text-gray-600 hover:bg-white/80 hover:shadow-sm transition-all"
                  title="菜单"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
                
                {/* 下拉菜单 */}
                {showMenu && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-gray-200 py-2 z-[10000]">
                    {/* 指南 */}
                    <button
                      onClick={() => {
                        setShowUsageGuide(true);
                        setShowMenu(false);
                      }}
                      className="w-full px-4 py-3 text-left text-gray-700 hover:bg-gray-50 flex items-center space-x-3"
                    >
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                      <span className="font-medium">指南</span>
                    </button>
                    
                    {/* 关于项目 */}
                    <button
                      onClick={() => {
                        setShowAbout(true);
                        setShowMenu(false);
                      }}
                      className="w-full px-4 py-3 text-left text-gray-700 hover:bg-gray-50 flex items-center space-x-3"
                    >
                      <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="font-medium">关于项目</span>
                    </button>
                    
                    {/* 支持我们 */}
                    <button
                      onClick={() => {
                        setShowSupport(true);
                        setShowMenu(false);
                      }}
                      className="w-full px-4 py-3 text-left text-gray-700 hover:bg-gray-50 flex items-center space-x-3"
                    >
                      <svg className="w-5 h-5 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                      <span className="font-medium">支持我们</span>
                    </button>
                    
                    <div className="border-t border-gray-200 my-2"></div>
                    
                    {/* 登录/登出 */}
                    {user ? (
                      <>
                        <div className="px-4 py-2 flex items-center space-x-3">
                          <img
                            src={user.user_metadata?.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.email)}&background=random`}
                            alt={user.email}
                            className="w-8 h-8 rounded-full border-2 border-gray-200"
                          />
                          <span className="text-sm text-gray-700 truncate">{user.email}</span>
                        </div>
                        <button
                          onClick={() => {
                            handleLogout();
                            setShowMenu(false);
                          }}
                          className="w-full px-4 py-3 text-left text-red-600 hover:bg-red-50 flex items-center space-x-3"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                          </svg>
                          <span className="font-medium">退出登录</span>
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => {
                          setShowLoginModal(true);
                          setShowMenu(false);
                        }}
                        className="w-full px-4 py-3 text-left text-gray-700 hover:bg-gray-50 flex items-center space-x-3"
                      >
                        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                        </svg>
                        <span className="font-medium">登录</span>
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {activeTab === 'chat' && (
          <div className={`grid gap-4 h-[calc(100vh-180px)] transition-all duration-300 ${
            hasTopics && currentTopicId
              ? 'grid-cols-1 lg:grid-cols-4'
              : 'grid-cols-1 lg:grid-cols-3'
          }`}>
            <div className={`overflow-hidden transition-all duration-300 ${
              hasTopics && currentTopicId
                ? 'lg:col-span-3'
                : 'lg:col-span-2'
            }`}>
              <ChatPanel />
            </div>

            <div className={`overflow-hidden transition-all duration-300 ${
              hasTopics && currentTopicId
                ? 'lg:col-span-1'
                : 'lg:col-span-1'
            }`}>
              <TopicCharacterPanel />
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="max-w-6xl mx-auto">
            <SettingsPanel />
          </div>
        )}
      </main>

      {/* 关于和支持模态框 */}
      {showAbout && (
        <AboutModal onClose={() => setShowAbout(false)} />
      )}

      {showSupport && (
        <SupportModal onClose={() => setShowSupport(false)} />
      )}

      {/* 登录方式选择模态框 */}
      {showLoginModal && (
        <LoginModal
          onClose={() => setShowLoginModal(false)}
          onLogin={handleLogin}
        />
      )}

      {/* 手机号登录模态框 */}
      {showPhoneLogin && (
        <PhoneLoginModal
          onClose={() => setShowPhoneLogin(false)}
          onLogin={handlePhoneLogin}
        />
      )}

      {/* 指南 */}
      {showUsageGuide && (
        <UsageGuide onClose={() => setShowUsageGuide(false)} />
      )}
    </div>
  );
}

export default App;
