import React, { useState } from 'react';
import { aiGuideData } from '../data/aiGuideData';

const UsageGuide = ({ onClose }) => {
  const [activeSection, setActiveSection] = useState('guide');
  const [activeTab, setActiveTab] = useState('overview');
  const [aiActiveTab, setAiActiveTab] = useState('basics');

  const guideTabs = [
    { id: 'overview', label: '快速入门' },
    { id: 'ai-config', label: 'AI 配置' },
    { id: 'characters', label: '人物设置' },
    { id: 'topics', label: '创建话题' },
    { id: 'conversation', label: '开始对话' },
  ];

  const aiTabs = [
    { id: 'basics', label: '基础技巧' },
    { id: 'advanced', label: '高级技巧' },
    { id: 'scenarios', label: '场景示例' },
    { id: 'mistakes', label: '常见误区' },
    { id: 'optimize', label: '一键优化' }
  ];

  const renderGuideContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="text-xl font-bold text-blue-800 mb-4">欢迎使用圆桌！</h3>
              <p className="text-blue-700 mb-4">
                圆桌是一个让不同时代、不同领域的伟人通过 AI 进行思想碰撞的平台。
              </p>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-lg">
                  <div className="text-3xl mb-2 flex justify-center">
                    <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <h4 className="font-bold text-gray-800 mb-2 text-center">选择人物</h4>
                  <p className="text-sm text-gray-600">从 74+ 位历史伟人中选择参与对话的角色</p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <div className="text-3xl mb-2 flex justify-center">
                    <svg className="w-8 h-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h4 className="font-bold text-gray-800 mb-2 text-center">配置 AI</h4>
                  <p className="text-sm text-gray-600">为每个人物选择 AI 服务商和模型</p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <div className="text-3xl mb-2 flex justify-center">
                    <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <h4 className="font-bold text-gray-800 mb-2 text-center">开始对话</h4>
                  <p className="text-sm text-gray-600">提出问题，让伟人们展开讨论</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">快速开始</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold mr-4 flex-shrink-0">1</div>
                  <div>
                    <h4 className="font-bold text-gray-800">配置 AI</h4>
                    <p className="text-gray-600 text-sm">点击设置图标，配置至少一个 AI 服务商（推荐 MiniMax 或通义千问）</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold mr-4 flex-shrink-0">2</div>
                  <div>
                    <h4 className="font-bold text-gray-800">选择人物</h4>
                    <p className="text-gray-600 text-sm">在右侧面板选择参与讨论的伟人角色</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold mr-4 flex-shrink-0">3</div>
                  <div>
                    <h4 className="font-bold text-gray-800">创建话题</h4>
                    <p className="text-gray-600 text-sm">输入一个讨论主题，如"人工智能的未来"</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold mr-4 flex-shrink-0">4</div>
                  <div>
                    <h4 className="font-bold text-gray-800">开始对话</h4>
                    <p className="text-gray-600 text-sm">在输入框提出问题，AI 角色会自动讨论</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'ai-config':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">配置 AI 服务商</h3>
              <p className="text-gray-600 mb-4">
                在开始对话前，您需要为每个人物配置 AI 服务商。每个角色可以有不同的 AI 配置。
              </p>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <h4 className="font-bold text-yellow-800 mb-2">推荐配置</h4>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• <strong>MiniMax</strong> - 性价比高，国内可直接访问</li>
                  <li>• <strong>通义千问 (Qwen)</strong> - 阿里出品，响应快速</li>
                  <li>• <strong>智谱 GLM</strong> - 清华大学技术背景，效果稳定</li>
                </ul>
              </div>

              <h4 className="font-bold text-gray-800 mb-3">配置步骤</h4>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold mr-4 flex-shrink-0">1</div>
                  <div>
                    <h4 className="font-bold text-gray-800">获取 API Key</h4>
                    <p className="text-gray-600 text-sm">访问 AI 服务商官网，注册账号并获取 API Key</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold mr-4 flex-shrink-0">2</div>
                  <div>
                    <h4 className="font-bold text-gray-800">打开设置</h4>
                    <p className="text-gray-600 text-sm">点击顶部的 ⚙️ 设置图标</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold mr-4 flex-shrink-0">3</div>
                  <div>
                    <h4 className="font-bold text-gray-800">添加配置</h4>
                    <p className="text-gray-600 text-sm">在 AI 配置区域，点击"添加配置"，选择服务商并粘贴 API Key</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold mr-4 flex-shrink-0">4</div>
                  <div>
                    <h4 className="font-bold text-gray-800">保存配置</h4>
                    <p className="text-gray-600 text-sm">点击保存，配置会自动保存到云端（需登录）</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">推荐 AI 模型</h3>
              <div className="space-y-3">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-bold text-gray-800">MiniMax</h4>
                  <p className="text-sm text-gray-600">推荐模型：abab6.5s-chat</p>
                  <p className="text-xs text-gray-500 mt-1">价格实惠，国内访问快</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-bold text-gray-800">通义千问 (Qwen)</h4>
                  <p className="text-sm text-gray-600">推荐模型：qwen-turbo</p>
                  <p className="text-xs text-gray-500 mt-1">阿里出品，响应快速</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-bold text-gray-800">智谱 GLM</h4>
                  <p className="text-sm text-gray-600">推荐模型：glm-4</p>
                  <p className="text-xs text-gray-500 mt-1">清华大学技术背景，效果稳定</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'characters':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">选择人物</h3>
              <p className="text-gray-600 mb-4">
                圆桌提供了 74+ 位历史伟人，涵盖商业、哲学、科学、文学、政治、科技等领域。
              </p>

              <h4 className="font-bold text-gray-800 mb-3">选择步骤</h4>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold mr-4 flex-shrink-0">1</div>
                  <div>
                    <h4 className="font-bold text-gray-800">打开人物面板</h4>
                    <p className="text-gray-600 text-sm">在右侧找到"选择人物"区域</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold mr-4 flex-shrink-0">2</div>
                  <div>
                    <h4 className="font-bold text-gray-800">筛选分类</h4>
                    <p className="text-gray-600 text-sm">点击分类标签（商业/哲学/科学/文学/政治/科技）筛选人物</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold mr-4 flex-shrink-0">3</div>
                  <div>
                    <h4 className="font-bold text-gray-800">勾选人物</h4>
                    <p className="text-gray-600 text-sm">勾选您希望参与讨论的人物（最多 8 人）</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold mr-4 flex-shrink-0">4</div>
                  <div>
                    <h4 className="font-bold text-gray-800">配置 AI</h4>
                    <p className="text-gray-600 text-sm">为每个人物配置 AI 服务商，或使用全局默认配置</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">人物与 AI 搭配建议</h3>
              <div className="space-y-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-bold text-green-800 mb-2">哲学讨论</h4>
                  <p className="text-sm text-green-700">推荐：孔子 + 柏拉图 + 亚里士多德</p>
                  <p className="text-xs text-green-600 mt-1">使用智谱 GLM 模型，推理能力强</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-bold text-blue-800 mb-2">商业谈判</h4>
                  <p className="text-sm text-blue-700">推荐：马云 + 乔布斯 + 巴菲特</p>
                  <p className="text-xs text-blue-600 mt-1">使用通义千问模型，创意丰富</p>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h4 className="font-bold text-yellow-800 mb-2">科技创新</h4>
                  <p className="text-sm text-yellow-700">推荐：爱因斯坦 + 图灵 + 马斯克</p>
                  <p className="text-xs text-yellow-600 mt-1">可混合使用多个模型</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="font-bold text-purple-800 mb-2">文学创作</h4>
                  <p className="text-sm text-purple-700">推荐：鲁迅 + 莎士比亚 + 托尔斯泰</p>
                  <p className="text-xs text-purple-600 mt-1">使用 MiniMax 模型，文采出众</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'topics':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">创建话题</h3>
              <p className="text-gray-600 mb-4">
                话题是讨论的核心，一个好的话题能让 AI 角色展开精彩的对话。
              </p>

              <h4 className="font-bold text-gray-800 mb-3">创建步骤</h4>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold mr-4 flex-shrink-0">1</div>
                  <div>
                    <h4 className="font-bold text-gray-800">点击新建话题</h4>
                    <p className="text-gray-600 text-sm">在右侧面板点击"新建话题"按钮</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold mr-4 flex-shrink-0">2</div>
                  <div>
                    <h4 className="font-bold text-gray-800">输入话题标题</h4>
                    <p className="text-gray-600 text-sm">输入一个清晰的话题，如"人工智能的未来发展"</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold mr-4 flex-shrink-0">3</div>
                  <div>
                    <h4 className="font-bold text-gray-800">添加描述（可选）</h4>
                    <p className="text-gray-600 text-sm">添加背景信息，帮助 AI 更好地理解话题</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold mr-4 flex-shrink-0">4</div>
                  <div>
                    <h4 className="font-bold text-gray-800">确认创建</h4>
                    <p className="text-gray-600 text-sm">点击确定，话题创建完成</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">好的话题示例</h3>
              <div className="space-y-3">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-bold text-gray-800">人工智能会取代人类工作吗？</h4>
                  <p className="text-xs text-gray-500 mt-1">适合讨论：技术发展、社会影响、职业未来</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-bold text-gray-800">儒家思想与现代管理</h4>
                  <p className="text-xs text-gray-500 mt-1">适合讨论：传统文化、企业管理、领导力</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-bold text-gray-800">如果爱因斯坦和马斯克对话</h4>
                  <p className="text-xs text-gray-500 mt-1">适合讨论：科技创新、物理学、未来趋势</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'conversation':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">开始对话</h3>

              <h4 className="font-bold text-gray-800 mb-3">对话步骤</h4>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center font-bold mr-4 flex-shrink-0">1</div>
                  <div>
                    <h4 className="font-bold text-gray-800">确保条件满足</h4>
                    <p className="text-gray-600 text-sm">已选择人物 + 已创建话题 + 已配置 AI</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center font-bold mr-4 flex-shrink-0">2</div>
                  <div>
                    <h4 className="font-bold text-gray-800">输入问题</h4>
                    <p className="text-gray-600 text-sm">在底部输入框提出问题</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center font-bold mr-4 flex-shrink-0">3</div>
                  <div>
                    <h4 className="font-bold text-gray-800">发送问题</h4>
                    <p className="text-gray-600 text-sm">点击发送按钮或按回车键</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center font-bold mr-4 flex-shrink-0">4</div>
                  <div>
                    <h4 className="font-bold text-gray-800">观看讨论</h4>
                    <p className="text-gray-600 text-sm">AI 角色会根据设定进行讨论</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">使用技巧</h3>
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-bold text-blue-800 mb-2 flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    一键优化
                  </h4>
                  <p className="text-sm text-blue-700">点击输入框旁边的星星按钮，AI 会自动优化您的问题，让回答更精准</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-bold text-green-800 mb-2 flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    图片输入
                  </h4>
                  <p className="text-sm text-green-700">点击相机图标可以上传图片，AI 会分析图片内容</p>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h4 className="font-bold text-yellow-800 mb-2 flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                    </svg>
                    语音输入
                  </h4>
                  <p className="text-sm text-yellow-700">点击麦克风图标可以语音输入（支持中文）</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">对话设置</h3>
              <p className="text-gray-600 mb-4">
                在设置中可以调整对话行为：
              </p>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li>• <strong>对话轮数</strong>：控制 AI 发言次数</li>
                <li>• <strong>发言间隔</strong>：控制每轮发言之间的等待时间</li>
                <li>• <strong>互动模式</strong>：开启后 AI 可以看到彼此的消息</li>
                <li>• <strong>角色称呼</strong>：开启后 AI 发言时会互相称呼名字</li>
              </ul>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const renderAIGuideContent = () => {
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

    switch (aiActiveTab) {
      case 'basics':
        return (
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
        );

      case 'advanced':
        return (
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
        );

      case 'scenarios':
        return (
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
        );

      case 'mistakes':
        return (
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
        );

      case 'optimize':
        return (
          <div>
            <div className="mb-6 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-6">
              <h3 className="text-2xl font-bold text-purple-800 mb-3 flex items-center">
                <svg className="w-7 h-7 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                一键优化功能
              </h3>
              <p className="text-purple-700 mb-4">
                不知道怎么提问更好？点击输入框旁的星星按钮，AI 会自动帮你优化问题！
              </p>
            </div>

            <div className="space-y-6">
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

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-blue-800 font-medium">
                  💡 提示：一键优化功能会分析你的问题，提供优化建议，并生成更清晰、更具体的版本。你可以直接使用优化后的版本，也可以参考建议手动修改。
                </p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] flex flex-col">
        {/* 头部 */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-6 rounded-t-2xl flex-shrink-0">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">📖 指南</h2>
              <p className="text-blue-100 text-sm mt-1">使用说明和 AI 对话技巧</p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* 顶级标签导航 - 使用指南 / AI对话指南 */}
        <div className="bg-gray-50 border-b border-gray-200 px-6 py-3 flex-shrink-0">
          <div className="flex space-x-2">
            <button
              onClick={() => setActiveSection('guide')}
              className={`px-6 py-2.5 rounded-lg font-medium transition-all ${
                activeSection === 'guide'
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-200'
              }`}
            >
              <span className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                使用指南
              </span>
            </button>
            <button
              onClick={() => setActiveSection('ai')}
              className={`px-6 py-2.5 rounded-lg font-medium transition-all ${
                activeSection === 'ai'
                  ? 'bg-purple-500 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-200'
              }`}
            >
              <span className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
                AI 对话指南
              </span>
            </button>
          </div>
        </div>

        {/* 次级标签导航 */}
        <div className="bg-white border-b border-gray-200 px-6 py-3 flex-shrink-0">
          <div className="flex space-x-2 overflow-x-auto">
            {(activeSection === 'guide' ? guideTabs : aiTabs).map((tab) => (
              <button
                key={tab.id}
                onClick={() => activeSection === 'guide' ? setActiveTab(tab.id) : setAiActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all whitespace-nowrap ${
                  (activeSection === 'guide' ? activeTab : aiActiveTab) === tab.id
                    ? (activeSection === 'guide' ? 'bg-blue-500' : 'bg-purple-500') + ' text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 内容区域 */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeSection === 'guide' ? renderGuideContent() : renderAIGuideContent()}
        </div>
      </div>
    </div>
  );
};

export default UsageGuide;
