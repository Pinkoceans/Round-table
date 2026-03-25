import React, { useState } from 'react';

function AboutModal({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl p-6 max-w-2xl w-full border border-gray-200 max-h-[80vh] overflow-y-auto">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-1">圆桌</h2>
            <p className="text-sm text-gray-500">与伟人对话的思想平台</p>
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

        <div className="space-y-6">
          {/* 项目介绍 */}
          <section>
            <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
              <svg className="w-5 h-5 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              项目介绍
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              圆桌是一个创新的多角色 AI 对话模拟平台，让不同时代、不同领域的伟人通过 AI 进行思想碰撞。
              你可以在这里创建话题，选择历史或现代的伟大人物，让他们使用最新的 AI 模型进行对话讨论，
              体验跨越时空的思想交流。
            </p>
          </section>

          {/* 核心功能 */}
          <section>
            <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
              <svg className="w-5 h-5 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
              核心功能
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gray-50 rounded-lg p-3">
                <h4 className="font-medium text-gray-800 text-sm mb-1">🎭 74 位智者</h4>
                <p className="text-xs text-gray-600">涵盖 6 大领域：商业、哲学、科学、文学、政治、科技</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <h4 className="font-medium text-gray-800 text-sm mb-1">🤖 12 家 AI</h4>
                <p className="text-xs text-gray-600">支持 48 个最新 AI 模型，包括 GPT-5.4、Claude 等</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <h4 className="font-medium text-gray-800 text-sm mb-1">💬 多角色对话</h4>
                <p className="text-xs text-gray-600">多个角色同时参与讨论，各有独特风格</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <h4 className="font-medium text-gray-800 text-sm mb-1">📝 话题管理</h4>
                <p className="text-xs text-gray-600">创建和管理多个话题，保存精彩讨论</p>
              </div>
            </div>
          </section>

          {/* 支持的 AI 厂商 */}
          <section>
            <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
              <svg className="w-5 h-5 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              支持的 AI 厂商
            </h3>
            <div className="grid grid-cols-3 gap-2 text-xs text-gray-600">
              <div className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                OpenAI
              </div>
              <div className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                Anthropic
              </div>
              <div className="flex items-center">
                <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                Google
              </div>
              <div className="flex items-center">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                xAI (Grok)
              </div>
              <div className="flex items-center">
                <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
                DeepSeek
              </div>
              <div className="flex items-center">
                <span className="w-2 h-2 bg-indigo-500 rounded-full mr-2"></span>
                阿里 Qwen
              </div>
              <div className="flex items-center">
                <span className="w-2 h-2 bg-pink-500 rounded-full mr-2"></span>
                Moonshot
              </div>
              <div className="flex items-center">
                <span className="w-2 h-2 bg-teal-500 rounded-full mr-2"></span>
                智谱 GLM
              </div>
              <div className="flex items-center">
                <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                百度文心
              </div>
              <div className="flex items-center">
                <span className="w-2 h-2 bg-cyan-500 rounded-full mr-2"></span>
                讯飞星火
              </div>
              <div className="flex items-center">
                <span className="w-2 h-2 bg-lime-500 rounded-full mr-2"></span>
                MiniMax
              </div>
              <div className="flex items-center">
                <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></span>
                字节豆包
              </div>
            </div>
          </section>

          {/* 版本信息 */}
          <section className="border-t border-gray-200 pt-4">
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>版本：1.0.0</span>
              <span>更新日期：2026.03</span>
            </div>
          </section>
        </div>

        <div className="mt-6 pt-4 border-t border-gray-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-800 hover:bg-gray-700 text-white text-sm rounded-lg transition-all"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  );
}

export default AboutModal;
