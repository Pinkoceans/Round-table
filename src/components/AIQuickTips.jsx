import React, { useState } from 'react';
import { aiGuideData } from '../data/aiGuideData';

const AIQuickTips = ({ onSelectTemplate }) => {
  const [showTips, setShowTips] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);

  return (
    <div className="relative">
      {/* 帮助按钮 */}
      <button
        onClick={() => setShowTips(!showTips)}
        className="p-2 text-gray-400 hover:text-blue-500 transition-colors"
        title="提问技巧"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </button>

      {/* 技巧提示弹窗 */}
      {showTips && (
        <div className="absolute right-0 bottom-full mb-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-200 p-4 z-50">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-bold text-gray-800">💡 提问小技巧</h3>
            <button
              onClick={() => setShowTips(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="space-y-2 mb-4">
            {aiGuideData.quickTips.map((tip, index) => (
              <div key={index} className="text-sm text-gray-700 flex items-start">
                <span className="mr-2 text-blue-500">•</span>
                {tip}
              </div>
            ))}
          </div>

          <button
            onClick={() => {
              setShowTips(false);
              setShowTemplates(true);
            }}
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium"
          >
            📋 查看问题模板
          </button>
        </div>
      )}

      {/* 模板选择弹窗 */}
      {showTemplates && (
        <TemplateSelector onClose={() => setShowTemplates(false)} onSelect={onSelectTemplate} />
      )}
    </div>
  );
};

// 模板选择器组件
const TemplateSelector = ({ onClose, onSelect }) => {
  const [selectedCategory, setSelectedCategory] = useState('学习');

  return (
    <div className="absolute right-0 bottom-full mb-2 w-96 bg-white rounded-xl shadow-2xl border border-gray-200 p-4 z-50 max-h-96 overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-gray-800">📋 问题模板</h3>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* 分类选择 */}
      <div className="flex space-x-2 mb-3 overflow-x-auto">
        {aiGuideData.templates.map((template) => (
          <button
            key={template.category}
            onClick={() => setSelectedCategory(template.category)}
            className={`px-3 py-1 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
              selectedCategory === template.category
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {template.category}
          </button>
        ))}
      </div>

      {/* 问题列表 */}
      <div className="space-y-2">
        {aiGuideData.templates
          .find(t => t.category === selectedCategory)
          ?.questions.map((question, index) => (
            <button
              key={index}
              onClick={() => {
                onSelect(question);
                onClose();
              }}
              className="w-full text-left p-3 bg-gray-50 hover:bg-blue-50 border border-gray-200 hover:border-blue-300 rounded-lg transition-all text-sm text-gray-700"
            >
              {question}
            </button>
          ))}
      </div>

      <p className="text-xs text-gray-500 mt-3 text-center">
        点击模板即可使用，可以根据需要修改内容
      </p>
    </div>
  );
};

export default AIQuickTips;
