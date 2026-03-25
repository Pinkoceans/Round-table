import React, { useState } from 'react';
import { aiGuideData } from '../data/aiGuideData';

const AIGuidePage = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState('basics');

  const tabs = [
    { id: 'basics', label: '基础技巧' },
    { id: 'advanced', label: '高级技巧' },
    { id: 'scenarios', label: '场景示例' },
    { id: 'mistakes', label: '常见误区' },
    { id: 'optimize', label: '一键优化' }
  ];

  const renderCard = (item) => (
    <div key={item.id} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-gray-800">{item.title}</h3>
        <p className="text-gray-600">{item.description}</p>
        
        {item.badExample && (
          <div className="mb-3">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-sm font-medium text-gray-700">不好的提问</span>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-gray-700">
              {item.badExample}
            </div>
          </div>
        )}
        
        {item.goodExample && (
          <div className="mb-3">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-sm font-medium text-gray-700">好的提问</span>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-sm text-gray-700">
              {item.goodExample}
            </div>
          </div>
        )}
        
        {item.tips && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-blue-800 mb-2">技巧要点</h4>
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
            <h4 className="font-semibold text-gray-800">示例问题</h4>
            {item.examples.map((example, index) => (
              <div key={index} className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <p className="text-sm text-gray-700 mb-2">{example.prompt}</p>
                <div className="text-xs text-green-600 font-medium">
                  效果：{example.effect}
                </div>
              </div>
            ))}
          </div>
        )}
        
        {item.mistake && (
          <div className="mt-4">
            <div className="text-sm text-gray-600 mb-2">
              <span className="font-medium">说明：</span>
              {item.explanation}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] flex flex-col">
        {/* 头部 - 固定 */}
        <div className="bg-white border-b border-gray-200 p-6 flex justify-between items-center flex-shrink-0">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">AI 对话指南</h2>
            <p className="text-gray-600">学会与 AI 更好地对话，获得更优质的回答</p>
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
        <div className="bg-white border-b border-gray-200 px-6 py-4 flex-shrink-0">
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
                  基础技巧是与 AI 对话的基本功，掌握这些技巧可以让你的提问质量提升 80%！
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
                  高级技巧可以让你获得专家级的回答，适合深度交流和复杂问题！
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
                  看看不同场景下如何提问，直接套用模板即可获得优质回答！
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
                  避开这些常见误区，让你的提问效率翻倍！
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
                  🌟 一键优化功能
                </h3>
                <p className="text-purple-700 mb-4">
                  不知道怎么提问更好？点击输入框旁的星星按钮，AI 会自动帮你优化问题！
                </p>
              </div>

              <div className="space-y-6">
                {/* 使用方法 */}
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h4 className="text-xl font-bold text-gray-800 mb-4">使用方法</h4>
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
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h4 className="text-xl font-bold text-gray-800 mb-4">优化示例</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <h5 className="font-semibold text-red-800 mb-2">优化前</h5>
                      <p className="text-gray-700">{aiGuideData.optimizeFeature.example.original}</p>
                    </div>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <h5 className="font-semibold text-green-800 mb-2">优化后</h5>
                      <p className="text-gray-800">{aiGuideData.optimizeFeature.example.optimized}</p>
                    </div>
                  </div>
                </div>

                {/* 功能优势 */}
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h4 className="text-xl font-bold text-gray-800 mb-4">功能优势</h4>
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
                    💡 提示：一键优化功能会分析你的问题，提供优化建议，并生成更清晰、更具体的版本。你可以直接使用优化后的版本，也可以参考建议手动修改。
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
