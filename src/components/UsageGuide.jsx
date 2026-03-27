import React, { useState } from 'react';
import { useForumStore } from '../store';
import { t } from '../i18n';
import { aiGuideData } from '../data/aiGuideData';

const UsageGuide = ({ onClose }) => {
  const { language } = useForumStore();
  const [activeSection, setActiveSection] = useState('guide');
  const [activeTab, setActiveTab] = useState('overview');
  const [aiActiveTab, setAiActiveTab] = useState('basics');

  const guideTabs = [
    { id: 'overview', label: t('guide.quickStart', language) },
    { id: 'ai-config', label: t('guide.aiConfig', language) },
    { id: 'characters', label: t('guide.characters', language) },
    { id: 'topics', label: t('guide.topics', language) },
    { id: 'conversation', label: t('guide.conversation', language) },
  ];

  const aiTabs = [
    { id: 'basics', label: t('guide.basicsTitle', language) },
    { id: 'advanced', label: t('guide.advancedTitle', language) },
    { id: 'scenarios', label: t('guide.scenariosTitle', language) },
    { id: 'mistakes', label: t('guide.mistakesTitle', language) },
    { id: 'optimize', label: t('guide.optimizeTitle', language) }
  ];

  const renderGuideContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="text-xl font-bold text-blue-800 mb-4">{t('guide.welcome', language)}</h3>
              <p className="text-blue-700 mb-4">
                {t('guide.welcomeDesc', language)}
              </p>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-lg">
                  <div className="text-3xl mb-2 flex justify-center">
                    <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <h4 className="font-bold text-gray-800 mb-2 text-center">{t('guide.selectCharacters', language)}</h4>
                  <p className="text-sm text-gray-600">{t('guide.selectCharactersDesc', language)}</p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <div className="text-3xl mb-2 flex justify-center">
                    <svg className="w-8 h-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h4 className="font-bold text-gray-800 mb-2 text-center">{t('guide.configAI', language)}</h4>
                  <p className="text-sm text-gray-600">{t('guide.configAIDesc', language)}</p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <div className="text-3xl mb-2 flex justify-center">
                    <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <h4 className="font-bold text-gray-800 mb-2 text-center">{t('guide.startConversation', language)}</h4>
                  <p className="text-sm text-gray-600">{t('guide.startConversationDesc', language)}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">{t('guide.quickStartTitle', language)}</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold mr-4 flex-shrink-0">1</div>
                  <div>
                    <h4 className="font-bold text-gray-800">{t('guide.step1', language)}</h4>
                    <p className="text-gray-600 text-sm">{t('guide.step1Desc', language)}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold mr-4 flex-shrink-0">2</div>
                  <div>
                    <h4 className="font-bold text-gray-800">{t('guide.step2', language)}</h4>
                    <p className="text-gray-600 text-sm">{t('guide.step2Desc', language)}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold mr-4 flex-shrink-0">3</div>
                  <div>
                    <h4 className="font-bold text-gray-800">{t('guide.step3', language)}</h4>
                    <p className="text-gray-600 text-sm">{t('guide.step3Desc', language)}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold mr-4 flex-shrink-0">4</div>
                  <div>
                    <h4 className="font-bold text-gray-800">{t('guide.step4', language)}</h4>
                    <p className="text-gray-600 text-sm">{t('guide.step4Desc', language)}</p>
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
              <h3 className="text-xl font-bold text-gray-800 mb-4">{t('guide.configProvider', language)}</h3>
              <p className="text-gray-600 mb-4">
                {t('guide.configProviderDesc', language)}
              </p>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <h4 className="font-bold text-yellow-800 mb-2">{t('guide.recommendedConfig', language)}</h4>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• <strong>MiniMax</strong> - {t('guide.minimaxHint', language) || '性价比高，国内可直接访问'}</li>
                  <li>• <strong>OpenAI</strong> - {t('guide.openaiHint', language) || '质量最高，需要翻墙'}</li>
                  <li>• <strong>Claude</strong> - {t('guide.claudeHint', language) || '推理能力强'}</li>
                </ul>
              </div>

              <h4 className="font-bold text-gray-800 mb-3">{t('guide.configSteps', language)}</h4>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold mr-4 flex-shrink-0">1</div>
                  <div>
                    <h4 className="font-bold text-gray-800">{t('guide.getAPIKey', language)}</h4>
                    <p className="text-gray-600 text-sm">{t('guide.getAPIKeyDesc', language)}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold mr-4 flex-shrink-0">2</div>
                  <div>
                    <h4 className="font-bold text-gray-800">{t('guide.openSettings', language)}</h4>
                    <p className="text-gray-600 text-sm">{t('guide.openSettingsDesc', language)}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold mr-4 flex-shrink-0">3</div>
                  <div>
                    <h4 className="font-bold text-gray-800">{t('guide.addConfig', language)}</h4>
                    <p className="text-gray-600 text-sm">{t('guide.addConfigDesc', language)}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold mr-4 flex-shrink-0">4</div>
                  <div>
                    <h4 className="font-bold text-gray-800">{t('guide.saveConfig', language)}</h4>
                    <p className="text-gray-600 text-sm">{t('guide.saveConfigDesc', language)}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">{t('guide.recommendedModels', language)}</h3>
              <div className="space-y-3">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-bold text-gray-800">MiniMax</h4>
                  <p className="text-sm text-gray-600">{t('guide.minimaxModel', language) || '推荐模型：abab6.5s-chat'}</p>
                  <p className="text-xs text-gray-500 mt-1">{t('guide.minimaxAdvantage', language) || '价格实惠，国内访问快'}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-bold text-gray-800">OpenAI</h4>
                  <p className="text-sm text-gray-600">{t('guide.openaiModel', language) || '推荐模型：gpt-4o / gpt-4o-mini'}</p>
                  <p className="text-xs text-gray-500 mt-1">{t('guide.openaiAdvantage', language) || '质量最高，但需要翻墙'}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-bold text-gray-800">Claude</h4>
                  <p className="text-sm text-gray-600">{t('guide.claudeModel', language) || '推荐模型：claude-3-5-sonnet'}</p>
                  <p className="text-xs text-gray-500 mt-1">{t('guide.claudeAdvantage', language) || '推理能力强，适合复杂问题'}</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'characters':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">{t('guide.selectCharactersTitle', language)}</h3>
              <p className="text-gray-600 mb-4">
                {t('guide.selectCharactersIntro', language)}
              </p>

              <h4 className="font-bold text-gray-800 mb-3">{t('guide.selectSteps', language)}</h4>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold mr-4 flex-shrink-0">1</div>
                  <div>
                    <h4 className="font-bold text-gray-800">{t('guide.openPanel', language)}</h4>
                    <p className="text-gray-600 text-sm">{t('guide.openPanelDesc', language)}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold mr-4 flex-shrink-0">2</div>
                  <div>
                    <h4 className="font-bold text-gray-800">{t('guide.filterCategory', language)}</h4>
                    <p className="text-gray-600 text-sm">{t('guide.filterCategoryDesc', language)}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold mr-4 flex-shrink-0">3</div>
                  <div>
                    <h4 className="font-bold text-gray-800">{t('guide.checkCharacters', language)}</h4>
                    <p className="text-gray-600 text-sm">{t('guide.maxCharacters', language)}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold mr-4 flex-shrink-0">4</div>
                  <div>
                    <h4 className="font-bold text-gray-800">{t('guide.configAI', language)}</h4>
                    <p className="text-gray-600 text-sm">{t('guide.configAIForChars', language)}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">{t('guide.characterAIMatches', language)}</h3>
              <div className="space-y-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-bold text-green-800 mb-2">{t('guide.philosophyDiscussion', language)}</h4>
                  <p className="text-sm text-green-700">{t('guide.philosophyRecommend', language)}</p>
                  <p className="text-xs text-green-600 mt-1">{t('guide.claudeReasoning', language)}</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-bold text-blue-800 mb-2">{t('guide.businessNegotiation', language)}</h4>
                  <p className="text-sm text-blue-700">{t('guide.businessRecommend', language)}</p>
                  <p className="text-xs text-blue-600 mt-1">{t('guide.gpt5Creative', language)}</p>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h4 className="font-bold text-yellow-800 mb-2">{t('guide.techInnovation', language)}</h4>
                  <p className="text-sm text-yellow-700">{t('guide.techRecommend', language)}</p>
                  <p className="text-xs text-yellow-600 mt-1">{t('guide.mixedModels', language)}</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="font-bold text-purple-800 mb-2">{t('guide.literaryCreation', language)}</h4>
                  <p className="text-sm text-purple-700">{t('guide.literaryRecommend', language)}</p>
                  <p className="text-xs text-purple-600 mt-1">{t('guide.minimaxLiterary', language)}</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'topics':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">{t('guide.createTopicTitle', language)}</h3>
              <p className="text-gray-600 mb-4">
                {t('guide.createTopicIntro', language)}
              </p>

              <h4 className="font-bold text-gray-800 mb-3">{t('guide.createStepsTitle', language)}</h4>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold mr-4 flex-shrink-0">1</div>
                  <div>
                    <h4 className="font-bold text-gray-800">{t('guide.clickNewTopic', language)}</h4>
                    <p className="text-gray-600 text-sm">{t('guide.clickNewTopicDesc', language)}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold mr-4 flex-shrink-0">2</div>
                  <div>
                    <h4 className="font-bold text-gray-800">{t('guide.enterTitle', language)}</h4>
                    <p className="text-gray-600 text-sm">{t('guide.enterTitleDesc', language)}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold mr-4 flex-shrink-0">3</div>
                  <div>
                    <h4 className="font-bold text-gray-800">{t('guide.addDescription', language)}</h4>
                    <p className="text-gray-600 text-sm">{t('guide.addDescriptionDesc', language)}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold mr-4 flex-shrink-0">4</div>
                  <div>
                    <h4 className="font-bold text-gray-800">{t('guide.confirmCreate', language)}</h4>
                    <p className="text-gray-600 text-sm">{t('guide.confirmCreateDesc', language)}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">{t('guide.goodTopicExamples', language)}</h3>
              <div className="space-y-3">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-bold text-gray-800">{t('guide.topicExample1', language) || '人工智能会取代人类工作吗？'}</h4>
                  <p className="text-xs text-gray-500 mt-1">{t('guide.topicExample1Desc', language) || '适合讨论：技术发展、社会影响、职业未来'}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-bold text-gray-800">{t('guide.topicExample2', language) || '儒家思想与现代管理'}</h4>
                  <p className="text-xs text-gray-500 mt-1">{t('guide.topicExample2Desc', language) || '适合讨论：传统文化、企业管理、领导力'}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-bold text-gray-800">{t('guide.topicExample3', language) || '如果爱因斯坦和马斯克对话'}</h4>
                  <p className="text-xs text-gray-500 mt-1">{t('guide.topicExample3Desc', language) || '适合讨论：科技创新、物理学、未来趋势'}</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'conversation':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">{t('guide.startConversationTitle', language)}</h3>

              <h4 className="font-bold text-gray-800 mb-3">{t('guide.conversationSteps', language)}</h4>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center font-bold mr-4 flex-shrink-0">1</div>
                  <div>
                    <h4 className="font-bold text-gray-800">{t('guide.ensureReady', language)}</h4>
                    <p className="text-gray-600 text-sm">{t('guide.ensureReadyDesc', language)}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center font-bold mr-4 flex-shrink-0">2</div>
                  <div>
                    <h4 className="font-bold text-gray-800">{t('guide.enterQuestion', language)}</h4>
                    <p className="text-gray-600 text-sm">{t('guide.enterQuestionDesc', language)}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center font-bold mr-4 flex-shrink-0">3</div>
                  <div>
                    <h4 className="font-bold text-gray-800">{t('guide.sendQuestion', language)}</h4>
                    <p className="text-gray-600 text-sm">{t('guide.sendQuestionDesc', language)}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center font-bold mr-4 flex-shrink-0">4</div>
                  <div>
                    <h4 className="font-bold text-gray-800">{t('guide.watchDiscussion', language)}</h4>
                    <p className="text-gray-600 text-sm">{t('guide.watchDiscussionDesc', language)}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">{t('guide.usageTips', language)}</h3>
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-bold text-blue-800 mb-2 flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    {t('guide.oneClickOptimize', language)}
                  </h4>
                  <p className="text-sm text-blue-700">{t('guide.oneClickOptimizeDesc', language)}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-bold text-green-800 mb-2 flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {t('guide.imageInput', language)}
                  </h4>
                  <p className="text-sm text-green-700">{t('guide.imageInputDesc', language)}</p>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h4 className="font-bold text-yellow-800 mb-2 flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                    </svg>
                    {t('guide.voiceInputTitle', language)}
                  </h4>
                  <p className="text-sm text-yellow-700">{t('guide.voiceInputHint', language)}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">{t('guide.conversationSettings', language)}</h3>
              <p className="text-gray-600 mb-4">
                {t('guide.conversationSettingsIntro', language)}
              </p>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li>• <strong>{t('guide.turns', language)}</strong>：{t('guide.turnsDesc', language)}</li>
                <li>• <strong>{t('guide.interval', language)}</strong>：{t('guide.intervalDesc', language)}</li>
                <li>• <strong>{t('guide.interactiveMode', language)}</strong>：{t('guide.interactiveModeDesc', language)}</li>
                <li>• <strong>{t('guide.useNames', language)}</strong>：{t('guide.useNamesDesc', language)}</li>
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
              <h2 className="text-2xl font-bold">{t('guide.title', language)}</h2>
              <p className="text-blue-100 text-sm mt-1">{t('guide.usageGuideDesc', language) || '使用说明和 AI 对话技巧'}</p>
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

        {/* 顶级标签导航 - 使用指南 / AI 对话指南 */}
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
                {t('guide.usage', language)}
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
                {t('guide.ai', language)}
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
