import React from 'react';

const OptimizePrompt = ({ onClose, onApply, originalText }) => {
  const optimized = generateOptimizedPrompt(originalText);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-gray-800">✨ 对话优化建议</h3>
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
          <h4 className="text-sm font-semibold text-gray-700 mb-2">你的问题</h4>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <p className="text-gray-700">{originalText}</p>
          </div>
        </div>

        {/* 优化建议 */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">优化建议</h4>
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
          <h4 className="text-sm font-semibold text-gray-700 mb-2">优化后的问题</h4>
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
            取消
          </button>
          <button
            onClick={() => onApply(optimized.text)}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
          >
            使用优化版本
          </button>
        </div>
      </div>
    </div>
  );
};

// 生成优化提示的函数
const generateOptimizedPrompt = (text) => {
  const tips = [];
  let optimized = text;

  // 检查是否具体
  if (text.length < 20) {
    tips.push('问题比较简短，建议提供更多背景信息和具体要求');
  }

  // 检查是否有明确的目标
  if (!text.includes('请') && !text.includes('怎么') && !text.includes('如何')) {
    tips.push('可以明确表达你的需求，例如"请解释..."、"如何..."');
  }

  // 检查是否指定了格式
  if (!text.includes('列表') && !text.includes('步骤') && !text.includes('例子')) {
    tips.push('可以指定回答格式，如"分点说明"、"举例说明"、"用表格呈现"等');
  }

  // 检查是否提供了上下文
  if (!text.includes('我是') && !text.includes('我的') && !text.includes('作为')) {
    tips.push('可以提供你的身份或使用场景，让回答更有针对性');
  }

  // 如果没有建议
  if (tips.length === 0) {
    tips.push('问题已经很清晰了！以下是一些可能的优化方向：');
    tips.push('可以要求 AI 从特定角度回答，如"从初学者角度"、"从专业角度"');
    tips.push('可以指定回答的详细程度，如"简单说明"、"详细解释"');
  }

  // 生成优化版本（示例）
  optimized = `我是一名学习者，${text}。请详细解释这个问题，分步骤说明，并提供具体的例子帮助我理解。`;

  return {
    text: optimized,
    tips
  };
};

export default OptimizePrompt;
