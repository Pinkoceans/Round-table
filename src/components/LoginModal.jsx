import React, { useState } from 'react';
import { APP_CONFIG } from '../config';
import GitHubLoginGuide from './GitHubLoginGuide';

const LoginModal = ({ onClose, onLogin }) => {
  const [showGitHubGuide, setShowGitHubGuide] = useState(false);
  const [showConfigHint, setShowConfigHint] = useState(null);
  
  const loginMethods = [
    {
      name: 'GitHub',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
        </svg>
      ),
      color: 'hover:bg-gray-800 hover:border-gray-800',
      textColor: 'text-gray-800',
      action: () => onLogin('github'),
      configured: false, // 设置为 false 显示配置提示
      guide: () => setShowGitHubGuide(true)
    },
    {
      name: '微信',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M8.5 10.5a1 1 0 100-2 1 1 0 000 2zm4 0a1 1 0 100-2 1 1 0 000 2zm-8 3.5c0-1.5 1.5-2.5 3-2.5.2 0 .4 0 .6.1.3-.9 1.2-1.6 2.4-1.6 1.5 0 2.5 1 2.5 2.5 0 .2 0 .4-.1.6.9.3 1.6 1.2 1.6 2.4 0 1.5-1 2.5-2.5 2.5-.2 0-.4 0-.6-.1-.3.9-1.2 1.6-2.4 1.6-1.5 0-2.5-1-2.5-2.5 0-.2 0-.4.1-.6-.9-.3-1.6-1.2-1.6-2.4z" />
        </svg>
      ),
      color: 'hover:bg-green-500 hover:border-green-500',
      textColor: 'text-green-500',
      action: () => onLogin('wechat'),
      configured: false,
      guide: () => setShowConfigHint('wechat')
    },
    {
      name: '支付宝',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
        </svg>
      ),
      color: 'hover:bg-blue-500 hover:border-blue-500',
      textColor: 'text-blue-500',
      action: () => onLogin('alipay'),
      configured: false,
      guide: () => setShowConfigHint('alipay')
    },
    {
      name: '抖音',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
        </svg>
      ),
      color: 'hover:bg-black hover:border-black',
      textColor: 'text-black',
      action: () => onLogin('douyin'),
      configured: false,
      guide: () => setShowConfigHint('douyin')
    },
    {
      name: 'Google',
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
        </svg>
      ),
      color: 'hover:bg-red-500 hover:border-red-500',
      textColor: 'text-red-500',
      action: () => onLogin('google'),
      configured: false,
      guide: () => setShowConfigHint('google')
    }
  ];

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 transform transition-all">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-gray-800">选择登录方式</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="space-y-3 mb-6">
            {loginMethods.map((method) => (
              <div key={method.name} className="relative">
                <button
                  onClick={method.configured ? method.action : method.guide}
                  className={`w-full flex items-center justify-center space-x-3 px-6 py-4 border-2 border-gray-200 rounded-xl transition-all duration-200 ${
                    method.configured 
                      ? `${method.color} bg-white hover:shadow-lg cursor-pointer`
                      : 'bg-gray-50 hover:bg-gray-100 cursor-not-allowed'
                  }`}
                >
                  <span className={method.textColor}>{method.icon}</span>
                  <span className="text-lg font-medium text-gray-700">{method.name}登录</span>
                  {!method.configured && (
                    <span className="ml-2 px-2 py-1 text-xs bg-yellow-100 text-yellow-700 rounded">
                      需配置
                    </span>
                  )}
                </button>
                {!method.configured && (
                  <div className="absolute -top-2 -right-2">
                    <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs cursor-help" title="点击查看配置指南">
                      ?
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="border-t border-gray-200 pt-6">
            <p className="text-sm text-gray-500 text-center mb-4">
              或使用手机号登录
            </p>
            <button
              onClick={() => onLogin('phone')}
              className="w-full flex items-center justify-center space-x-3 px-6 py-4 border-2 border-gray-200 rounded-xl transition-all duration-200 hover:bg-gray-50 hover:border-gray-300"
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              <span className="text-lg font-medium text-gray-700">手机号登录</span>
            </button>
          </div>

          <p className="text-xs text-gray-400 text-center mt-6">
            登录即表示您同意我们的{APP_CONFIG.PROJECT_NAME}服务条款和隐私政策
          </p>
        </div>
      </div>

      {/* GitHub 配置指南 */}
      {showGitHubGuide && (
        <GitHubLoginGuide onClose={() => setShowGitHubGuide(false)} />
      )}

      {/* 其他登录方式配置提示 */}
      {showConfigHint && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              {showConfigHint === 'wechat' && '微信登录配置'}
              {showConfigHint === 'alipay' && '支付宝登录配置'}
              {showConfigHint === 'douyin' && '抖音登录配置'}
              {showConfigHint === 'google' && 'Google 登录配置'}
            </h3>
            
            <div className="space-y-4 mb-6">
              <p className="text-gray-700">
                {showConfigHint === 'wechat' && '微信登录需要使用第三方身份云服务（如 Authing）或自建 OAuth 服务器。'}
                {showConfigHint === 'alipay' && '支付宝登录需要在支付宝开放平台创建应用，并实现自定义 OAuth 流程。'}
                {showConfigHint === 'douyin' && '抖音登录需要在抖音开放平台创建应用，并实现自定义 OAuth 流程。'}
                {showConfigHint === 'google' && 'Google 登录需要在 Google Cloud Console 创建 OAuth 2.0 客户端，并在 Netlify 后台配置。'}
              </p>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-2">💡 推荐方案</h4>
                <p className="text-sm text-blue-700">
                  {showConfigHint === 'wechat' && '使用 Authing 身份云可以快速集成微信登录，无需自建服务器。'}
                  {showConfigHint === 'alipay' && '参考官方文档实现 OAuth 2.0 流程，或使用第三方服务。'}
                  {showConfigHint === 'douyin' && '参考抖音开放平台文档，实现 OAuth 2.0 授权流程。'}
                  {showConfigHint === 'google' && '在 Netlify 后台的 Identity → External providers 中配置 Google OAuth。'}
                </p>
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowConfigHint(null)}
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                关闭
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginModal;
