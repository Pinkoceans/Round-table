import React from 'react';
import { t } from '../i18n';

const OptimizePrompt = ({ onClose, onApply, originalText, language }) => {
  const optimized = generateOptimizedPrompt(originalText, language);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="glass-white rounded-2xl shadow-2xl max-w-2xl w-full p-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-gray-800">✨ {t('optimize.title', language)}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* 原始问题 */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">{t('optimize.yourQuestion', language)}</h4>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <p className="text-gray-700">{originalText}</p>
          </div>
        </div>

        {/* 优化建议 */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">{t('optimize.suggestions', language)}</h4>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <ul className="space-y-2 text-sm text-blue-800">
              {optimized.tips.map((tip, index) => (
                <li key={index} className="flex items-start">
                  <span className="mr-2 text-blue-500">•</span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 优化后的问题 */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">{t('optimize.optimized', language)}</h4>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-gray-800">{optimized.text}</p>
          </div>
        </div>

        {/* 操作按钮 */}
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
          >
            {t('optimize.cancel', language)}
          </button>
          <button
            onClick={() => onApply(optimized.text)}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
          >
            {t('optimize.use', language)}
          </button>
        </div>
      </div>
    </div>
  );
};

// 生成优化提示的函数
const generateOptimizedPrompt = (text, language) => {
  const tips = [];
  let optimized = text;

  // 检查是否具体
  if (text.length < 20) {
    tips.push(t('optimize.tip1', language));
  }

  // 检查是否有明确的目标
  if (!text.includes('请') && !text.includes('怎么') && !text.includes('如何')) {
    tips.push(t('optimize.tip2', language));
  }

  // 检查是否指定了格式
  if (!text.includes('列表') && !text.includes('步骤') && !text.includes('例子')) {
    tips.push(t('optimize.tip3', language));
  }

  // 检查是否提供了上下文
  if (!text.includes('我是') && !text.includes('我的') && !text.includes('作为')) {
    tips.push(t('optimize.tip4', language));
  }

  // 如果没有建议
  if (tips.length === 0) {
    tips.push(t('optimize.tip5', language));
    tips.push(t('optimize.tip6', language));
    tips.push(t('optimize.tip7', language));
  }

  // 生成优化版本（示例）
  optimized = t('optimize.optimizedTemplate', language, { text });

  return {
    text: optimized,
    tips
  };
};

export default OptimizePrompt;
