import React, { useState } from 'react';
import { aiGuideData } from '../data/aiGuideData';
import { t } from '../i18n';

const AIGuidePage = ({ onClose, language = 'zh' }) => {
  const [activeTab, setActiveTab] = useState('basics');

  const tabs = [
    { id: 'basics', label: t('guide.basicsTitle', language) },
    { id: 'advanced', label: t('guide.advancedTitle', language) },
    { id: 'scenarios', label: t('guide.scenariosTitle', language) },
    { id: 'mistakes', label: t('guide.mistakesTitle', language) },
    { id: 'optimize', label: t('guide.optimizeTitle', language) }
  ];

  const renderCard = (item) => (
    <div key={item.id} className="glass-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-gray-800">{item.title}</h3>
        <p className="text-gray-600">{item.description}</p>
        
        {item.badExample && (
          <div className="mb-3">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-sm font-medium text-gray-700">{t('guide.badQuestion', language)}</span>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-gray-700">
              {item.badExample}
            </div>
          </div>
        )}
        
        {item.goodExample && (
          <div className="mb-3">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-sm font-medium text-gray-700">{t('guide.goodQuestion', language)}</span>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-sm text-gray-700">
              {item.goodExample}
            </div>
          </div>
        )}
        
        {item.tips && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-blue-800 mb-2">{t('guide.tips', language)}</h4>
            <ul className="space-y-1">
              {item.tips.map((tip, index) => (
                <li key={index} className="text-sm text-blue-700 flex items-start">
                  <span className="mr-2">•</span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {item.examples && (
          <div className="space-y-3">
            <h4 className="font-semibold text-gray-800">{t('guide.examples', language)}</h4>
            {item.examples.map((example, index) => (
              <div key={index} className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <p className="text-sm text-gray-700 mb-2">{example.prompt}</p>
                <div className="text-xs text-green-600 font-medium">
                  {t('guide.effect', language)}：{example.effect}
                </div>
              </div>
            ))}
          </div>
        )}
        
        {item.mistake && (
          <div className="mt-4">
            <div className="text-sm text-gray-600 mb-2">
              <span className="font-medium">{t('guide.explanation', language)}：</span>
              {item.explanation}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="glass-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] flex flex-col">
          {/* 头部 - 固定 */}
          <div className="glass-white border-b border-gray-200 p-6 flex justify-between items-center flex-shrink-0">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">{t('guide.aiTitle', language)}</h2>
            <p className="text-gray-600">{t('guide.aiSubtitle', language)}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-2"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* 标签导航 - 固定 */}
        <div className="glass-white border-b border-gray-200 px-6 py-4 flex-shrink-0">
          <div className="flex space-x-2 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-lg font-medium transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 内容区域 - 可滚动 */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {activeTab === 'basics' && (
            <div>
              <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-blue-800 font-medium">
                  {t('guide.basicsIntro', language)}
                </p>
              </div>
              <div className="space-y-4">
                {aiGuideData.basics.map(renderCard)}
              </div>
            </div>
          )}

          {activeTab === 'advanced' && (
            <div>
              <div className="mb-6 bg-purple-50 border border-purple-200 rounded-lg p-4">
                <p className="text-purple-800 font-medium">
                  {t('guide.advancedIntro', language)}
                </p>
              </div>
              <div className="space-y-4">
                {aiGuideData.advanced.map(renderCard)}
              </div>
            </div>
          )}

          {activeTab === 'scenarios' && (
            <div>
              <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-green-800 font-medium">
                  {t('guide.scenariosIntro', language)}
                </p>
              </div>
              <div className="space-y-4">
                {aiGuideData.scenarios.map(renderCard)}
              </div>
            </div>
          )}

          {activeTab === 'mistakes' && (
            <div>
              <div className="mb-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-yellow-800 font-medium">
                  {t('guide.mistakesIntro', language)}
                </p>
              </div>
              <div className="space-y-4">
                {aiGuideData.mistakes.map(renderCard)}
              </div>
            </div>
          )}

          {activeTab === 'optimize' && (
            <div>
              <div className="mb-6 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-6">
                <h3 className="text-2xl font-bold text-purple-800 mb-3">
                  🌟 {t('guide.optimizeFeature', language)}
                </h3>
                <p className="text-purple-700 mb-4">
                  {t('guide.optimizeIntro', language)}
                </p>
              </div>

              <div className="space-y-6">
                {/* 使用方法 */}
                <div className="glass-white rounded-xl shadow-md p-6">
                  <h4 className="text-xl font-bold text-gray-800 mb-4">{t('guide.howToUse', language)}</h4>
                  <div className="space-y-3">
                    {aiGuideData.optimizeFeature.howToUse.map((step, index) => (
                      <div key={index} className="flex items-start">
                        <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold mr-3 flex-shrink-0">
                          {index + 1}
                        </div>
                        <p className="text-gray-700 pt-1">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 优化前后对比 */}
                <div className="glass-white rounded-xl shadow-md p-6">
                  <h4 className="text-xl font-bold text-gray-800 mb-4">{t('guide.optimizeExample', language)}</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <h5 className="font-semibold text-red-800 mb-2">{t('guide.beforeOptimize', language)}</h5>
                      <p className="text-gray-700">{aiGuideData.optimizeFeature.example.original}</p>
                    </div>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <h5 className="font-semibold text-green-800 mb-2">{t('guide.afterOptimize', language)}</h5>
                      <p className="text-gray-800">{aiGuideData.optimizeFeature.example.optimized}</p>
                    </div>
                  </div>
                </div>

                {/* 功能优势 */}
                <div className="glass-white rounded-xl shadow-md p-6">
                  <h4 className="text-xl font-bold text-gray-800 mb-4">{t('guide.benefits', language)}</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    {aiGuideData.optimizeFeature.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-start">
                        <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center mr-3 flex-shrink-0 text-sm">
                          ✓
                        </div>
                        <p className="text-gray-700">{benefit}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 提示 */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-blue-800 font-medium">
                    💡 {t('guide.optimizeHint', language)}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIGuidePage;
