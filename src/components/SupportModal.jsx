import React from 'react';
import { useForumStore } from '../store';
import { t } from '../i18n';
import { APP_CONFIG } from '../config';

function SupportModal({ onClose }) {
  const { language } = useForumStore();
  
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl p-6 max-w-4xl w-full border border-gray-200">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-1">{t('support.title', language)}</h2>
            <p className="text-sm text-gray-500">{t('support.thanks', language)}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-all"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => window.open(APP_CONFIG.GITHUB_REPO, '_blank')}
            className="group p-4 bg-gradient-to-br from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 border-2 border-gray-200 hover:border-gray-400 rounded-xl transition-all duration-200"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </div>
              <h4 className="font-semibold text-gray-800 mb-1">{t('support.github', language)}</h4>
              <p className="text-xs text-gray-600 mb-2">GitHub Star</p>
              <span className="text-xs text-blue-600 font-medium group-hover:text-blue-700">
                {t('action.go', language) || '前往'} →
              </span>
            </div>
          </button>

          <button
            onClick={() => {
              const shareData = {
                title: '圆桌 - 与伟人对话的思想平台',
                text: '圆桌是一个创新的多角色 AI 对话模拟平台，让不同时代、不同领域的伟人通过 AI 进行思想碰撞！',
                url: window.location.href
              };
              
              if (navigator.share) {
                navigator.share(shareData);
              } else {
                navigator.clipboard.writeText(shareData.url);
                alert('链接已复制到剪贴板，快去分享给朋友吧！');
              }
            }}
            className="group p-4 bg-gradient-to-br from-blue-50 to-indigo-100 hover:from-blue-100 hover:to-indigo-200 border-2 border-blue-200 hover:border-blue-400 rounded-xl transition-all duration-200"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
              </div>
              <h4 className="font-semibold text-gray-800 mb-1">{t('support.share', language)}</h4>
              <p className="text-xs text-gray-600 mb-2">{t('support.shareHint', language) || '分享给更多朋友'}</p>
              <span className="text-xs text-blue-600 font-medium group-hover:text-blue-700">
                {t('action.share', language) || '分享'} →
              </span>
            </div>
          </button>

          <button
            onClick={() => {
              const subject = encodeURIComponent('圆桌项目建议');
              const body = encodeURIComponent(
                '你好！我对圆桌项目有一些建议：\n\n' +
                '--------------------------------\n' +
                '建议类型：功能建议 / 问题反馈 / 其他\n' +
                '--------------------------------\n\n' +
                '请在这里详细描述你的建议：\n\n\n\n' +
                '--------------------------------\n' +
                '（邮件由圆桌应用自动生成）'
              );
              window.open(`mailto:${APP_CONFIG.FEEDBACK_EMAIL}?subject=${subject}&body=${body}`, '_blank');
            }}
            className="group p-4 bg-gradient-to-br from-green-50 to-emerald-100 hover:from-green-100 hover:to-emerald-200 border-2 border-green-200 hover:border-green-400 rounded-xl transition-all duration-200"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="font-semibold text-gray-800 mb-1">{t('support.feedback', language)}</h4>
              <p className="text-xs text-gray-600 mb-2">{t('support.feedbackHint', language) || '帮助项目变得更好'}</p>
              <span className="text-xs text-blue-600 font-medium group-hover:text-blue-700">
                {t('action.submit', language)} →
              </span>
            </div>
          </button>
        </div>
        
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            {t('support.description', language)}
          </p>
        </div>
      </div>
    </div>
  );
}

export default SupportModal;
