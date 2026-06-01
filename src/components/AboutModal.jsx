import React, { useState } from 'react';
import { useForumStore } from '../store';
import { t } from '../i18n';
import { currentTheme, darkBase } from '../theme/accent-themes';

function AboutModal({ onClose }) {
  const { language } = useForumStore();

  const accent = currentTheme.accent;
  const accentText = currentTheme.accentText;

  const providers = [
    { name: 'OpenAI', color: '#3b82f6' },
    { name: 'Anthropic', color: '#10b981' },
    { name: 'Google', color: '#ef4444' },
    { name: 'xAI (Grok)', color: '#a855f7' },
    { name: 'DeepSeek', color: '#f59e0b' },
    { name: t('provider.qwen', language), color: '#6366f1' },
    { name: 'Moonshot', color: '#ec4899' },
    { name: t('provider.glm', language), color: '#14b8a6' },
    { name: t('provider.wenxin', language), color: '#f97316' },
    { name: t('provider.spark', language), color: '#06b6d4' },
    { name: 'MiniMax', color: '#84cc16' },
    { name: t('provider.doubao', language), color: '#10b981' },
  ];

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-black border border-white/10 rounded-2xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-2xl">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-sm tracking-[0.2em] font-light text-white mb-1">
              {t('nav.roundtable', language)}
            </h2>
            <p className="text-xs text-white/30">{t('about.description', language)}</p>
          </div>
          <button
            onClick={onClose}
            className="text-white/40 hover:text-white transition-all"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-6">
          {/* about.intro */}
          <section>
            <h3 className="text-xs tracking-wide text-white/50 mb-3 flex items-center">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: accent }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {t('about.intro', language)}
            </h3>
            <p className="text-xs text-white/40 leading-relaxed">
              {t('about.description', language)}
            </p>
          </section>

          {/* about.features */}
          <section>
            <h3 className="text-xs tracking-wide text-white/50 mb-3 flex items-center">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: accent }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
              {t('about.features', language)}
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white/[0.03] border border-white/10 rounded-xl p-3">
                <h4 className="text-white/60 text-xs mb-1 tracking-wide">
                  {t('about.wiseMen', language, { count: 74 })}
                </h4>
                <p className="text-xs text-white/30">{t('about.wiseMenDesc', language, { categories: 6 })}</p>
              </div>
              <div className="bg-white/[0.03] border border-white/10 rounded-xl p-3">
                <h4 className="text-white/60 text-xs mb-1 tracking-wide">
                  {t('about.aiProviders', language, { count: 12 })}
                </h4>
                <p className="text-xs text-white/30">{t('about.aiProvidersDesc', language, { models: 48 })}</p>
              </div>
              <div className="bg-white/[0.03] border border-white/10 rounded-xl p-3">
                <h4 className="text-white/60 text-xs mb-1 tracking-wide">
                  {t('about.multiCharacter', language)}
                </h4>
                <p className="text-xs text-white/30">{t('about.multiCharacterDesc', language)}</p>
              </div>
              <div className="bg-white/[0.03] border border-white/10 rounded-xl p-3">
                <h4 className="text-white/60 text-xs mb-1 tracking-wide">
                  {t('about.topicManagement', language)}
                </h4>
                <p className="text-xs text-white/30">{t('about.topicManagementDesc', language)}</p>
              </div>
            </div>
          </section>

          {/* 支持的 AI 厂商 */}
          <section>
            <h3 className="text-xs tracking-wide text-white/50 mb-3 flex items-center">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: accent }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              {t('about.supportedProviders', language)}
            </h3>
            <div className="grid grid-cols-3 gap-2 text-xs text-white/40">
              {providers.map((provider) => (
                <div key={provider.name} className="flex items-center">
                  <span className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: provider.color }}></span>
                  {provider.name}
                </div>
              ))}
            </div>
          </section>

          {/* 版本信息 */}
          <section className="border-t border-white/10 pt-4">
            <div className="flex items-center justify-between text-xs text-white/20">
              <span>{t('about.version', language)}: 1.0.0</span>
              <span>{t('about.updateDate', language)}: 2026.03</span>
            </div>
          </section>
        </div>

        <div className="mt-6 pt-4 border-t border-white/10 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white text-xs rounded-xl transition-all tracking-wide"
          >
            {t('action.close', language)}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AboutModal;
