import React from 'react';
import { useForumStore } from '../store';
import { t } from '../i18n';
import { APP_CONFIG } from '../config';

const LoginModal = ({ onClose, onLogin }) => {
  const { language } = useForumStore();
  
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
    },
  ];

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 transform transition-all">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-gray-800">{t('login.title', language)}</h3>
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
              <button
                key={method.name}
                onClick={method.action}
                className={`w-full flex items-center justify-center space-x-3 px-6 py-4 border-2 border-gray-200 rounded-xl transition-all duration-200 ${method.color} bg-white hover:shadow-lg`}
              >
                <span className={method.textColor}>{method.icon}</span>
                <span className="text-lg font-medium text-gray-700">{t('login.github', language)}</span>
              </button>
            ))}
          </div>

          <div className="border-t border-gray-200 pt-6">
            <p className="text-sm text-gray-500 text-center mb-4">
              {t('login.or', language)}
            </p>
            <button
              onClick={() => onLogin('phone')}
              className="w-full flex items-center justify-center space-x-3 px-6 py-4 border-2 border-gray-200 rounded-xl transition-all duration-200 hover:bg-gray-50 hover:border-gray-300"
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              <span className="text-lg font-medium text-gray-700">{t('login.phone', language)}</span>
            </button>
          </div>

          <p className="text-xs text-gray-400 text-center mt-6">
            {t('login.agreeTerms', language)} {APP_CONFIG.PROJECT_NAME}{t('login.terms', language)}{t('login.privacy', language)}
          </p>
        </div>
      </div>
    </>
  );
};

export default LoginModal;
