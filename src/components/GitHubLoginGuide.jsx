import React, { useState } from 'react';

const GitHubLoginGuide = ({ onClose }) => {
  const [clientId, setClientId] = useState('');
  const [clientSecret, setClientSecret] = useState('');

  const steps = [
    {
      title: '创建 GitHub OAuth App',
      content: (
        <div className="space-y-3">
          <p className="text-gray-700">
            1. 访问 <a href="https://github.com/settings/developers" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">GitHub Developer Settings</a>
          </p>
          <p className="text-gray-700">
            2. 点击 "New OAuth App" 按钮
          </p>
          <p className="text-gray-700">
            3. 填写应用信息：
          </p>
          <ul className="list-disc list-inside ml-4 text-gray-600">
            <li>Application name: 圆桌</li>
            <li>Homepage URL: 您的 Netlify 站点 URL</li>
            <li>Authorization callback URL: https://your-site.netlify.app/.netlify/identity</li>
          </ul>
        </div>
      )
    },
    {
      title: '获取 Client ID 和 Secret',
      content: (
        <div className="space-y-3">
          <p className="text-gray-700">
            创建成功后，您会看到 Client ID 和 Client Secret
          </p>
          <p className="text-gray-700">
            点击 "Generate a new client secret" 生成密钥
          </p>
        </div>
      )
    },
    {
      title: '在 Netlify 配置',
      content: (
        <div className="space-y-3">
          <p className="text-gray-700">
            1. 访问 Netlify 控制台
          </p>
          <p className="text-gray-700">
            2. 进入 Site settings → Identity
          </p>
          <p className="text-gray-700">
            3. 点击 "Enable Identity"（如果尚未启用）
          </p>
          <p className="text-gray-700">
            4. 滚动到 "External providers" 部分
          </p>
          <p className="text-gray-700">
            5. 点击 GitHub → "Install provider"
          </p>
          <p className="text-gray-700">
            6. 填入 Client ID 和 Client Secret
          </p>
          <p className="text-gray-700">
            7. 点击 Save
          </p>
        </div>
      )
    }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-gray-800">GitHub 登录配置指南</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-6">
          {steps.map((step, index) => (
            <div key={index} className="border-l-4 border-blue-500 pl-4">
              <h4 className="text-lg font-semibold text-gray-800 mb-3">
                {step.title}
              </h4>
              {step.content}
            </div>
          ))}

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
            <h4 className="font-semibold text-blue-800 mb-2">💡 提示</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• 配置完成后需要等待几分钟生效</li>
              <li>• 确保回调 URL 完全匹配（包括 https）</li>
              <li>• 测试时使用无痕模式避免缓存问题</li>
            </ul>
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              关闭
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GitHubLoginGuide;
