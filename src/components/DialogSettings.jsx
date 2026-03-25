import React from 'react';
import { useForumStore } from '../store';

function DialogSettings({ onClose }) {
  const { dialogSettings, setDialogSettings } = useForumStore();

  const handleChange = (key, value) => {
    setDialogSettings({ [key]: value });
  };

  return (
    <div className="bg-white rounded-xl border-2 border-gray-200 shadow-lg h-full flex flex-col">
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-800">对话设置</h2>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 transition-all"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* 每轮最高发言次数 */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-gray-700 block">
            每轮最高发言次数
          </label>
          <div className="flex items-center space-x-3">
            <input
              type="number"
              min="1"
              max="10"
              value={dialogSettings.maxTurns}
              onChange={(e) => handleChange('maxTurns', parseInt(e.target.value) || 1)}
              className="w-24 px-4 py-2.5 border-2 border-gray-200 rounded-lg text-sm font-medium text-gray-800 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
            />
            <span className="text-sm text-gray-500">次</span>
          </div>
          <p className="text-xs text-gray-500">
            限制每个 AI 每轮最多发言次数，防止 AI 垄断对话（1-10 次）
          </p>
        </div>

        {/* 每轮最低发言次数 */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-gray-700 block">
            每轮最低发言次数
          </label>
          <div className="flex items-center space-x-3">
            <input
              type="number"
              min="0"
              max="5"
              value={dialogSettings.minTurns}
              onChange={(e) => handleChange('minTurns', parseInt(e.target.value) || 0)}
              className="w-24 px-4 py-2.5 border-2 border-gray-200 rounded-lg text-sm font-medium text-gray-800 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
            />
            <span className="text-sm text-gray-500">次</span>
          </div>
          <p className="text-xs text-gray-500">
            确保每个 AI 都参与讨论，至少发言次数（0-5 次）
          </p>
        </div>

        {/* 发言间隔时间 */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-gray-700 block">
            发言间隔时间
          </label>
          <div className="flex items-center space-x-3">
            <input
              type="number"
              min="0"
              max="10"
              value={dialogSettings.delay}
              onChange={(e) => handleChange('delay', parseInt(e.target.value) || 0)}
              className="w-24 px-4 py-2.5 border-2 border-gray-200 rounded-lg text-sm font-medium text-gray-800 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
            />
            <span className="text-sm text-gray-500">秒</span>
          </div>
          <p className="text-xs text-gray-500">
            模拟真人思考时间，让对话更自然（0-10 秒）
          </p>
        </div>

        <div className="border-t border-gray-200 pt-6 space-y-4">
          {/* 互动模式 */}
          <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                </svg>
                <label className="text-sm font-medium text-gray-700">
                  互动模式
                </label>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                AI 可以看到并回应其他 AI 的发言
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={dialogSettings.interactive}
                onChange={(e) => handleChange('interactive', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          {/* 角色称呼 */}
          <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <label className="text-sm font-medium text-gray-700">
                  角色称呼
                </label>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                AI 发言时会称呼其他角色的名字
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={dialogSettings.useNames}
                onChange={(e) => handleChange('useNames', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
            </label>
          </div>
        </div>

        {/* 重置按钮 */}
        <div className="pt-4 border-t border-gray-200">
          <button
            onClick={() => {
              setDialogSettings({
                maxTurns: 3,
                minTurns: 1,
                delay: 2,
                interactive: true,
                useNames: true,
              });
            }}
            className="w-full py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-lg transition-all"
          >
            重置为默认值
          </button>
        </div>

        {/* 使用说明 */}
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-gray-800 mb-2 flex items-center">
            <svg className="w-4 h-4 mr-1.5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            使用建议
          </h3>
          <ul className="text-xs text-gray-600 space-y-1">
            <li>• 互动模式开启后，AI 之间可以互相讨论</li>
            <li>• 最高发言次数防止 AI 垄断对话</li>
            <li>• 最低发言次数确保每个 AI 都参与</li>
            <li>• 适当增加间隔时间让对话更自然</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default DialogSettings;
