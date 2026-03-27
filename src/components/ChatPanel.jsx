import React, { useState, useRef, useEffect } from 'react';
import { useForumStore } from '../store';
import { callAI } from '../ai-service';
import { t } from '../i18n';
import OptimizePrompt from './OptimizePrompt';
import InputToolbar from './InputToolbar';

function ChatPanel() {
  const {
    characters,
    activeCharacters,
    topics,
    currentTopicId,
    addMessage,
    aiConfig,
    language,
  } = useForumStore();
  
  const [inputValue, setInputValue] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showOptimize, setShowOptimize] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recognition, setRecognition] = useState(null);
  const [showCharacterSelector, setShowCharacterSelector] = useState(false);
  const [showMessageSelector, setShowMessageSelector] = useState(false);
  const messagesEndRef = useRef(null);

  const currentTopic = topics.find((t) => t.id === currentTopicId);
  const activeChars = characters.filter((c) => activeCharacters.includes(c.id));

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentTopic?.messages]);

  const handleSendMessage = async () => {
    if ((!inputValue.trim() && !selectedImage) || !currentTopic) return;

    // 构建消息内容（包含图片）
    let messageContent = inputValue.trim();
    if (selectedImage) {
      messageContent = selectedImage ? `[图片] ${messageContent}` : messageContent;
    }

    const userMessage = {
      id: Date.now().toString(),
      characterId: 'user',
      characterName: '你',
      content: messageContent,
      image: selectedImage,
      timestamp: Date.now(),
      isUser: true,
    };

    addMessage(userMessage);
    const userQuestion = inputValue.trim();
    setInputValue('');
    setSelectedImage(null);
    setIsGenerating(true);

    const messages = [{ role: 'user', content: userQuestion }];

    console.log('发送消息，激活的角色:', activeChars);
    console.log('全局 AI 配置:', aiConfig);
    console.log('各角色配置:', activeChars.map(c => ({ name: c.name, hasConfig: !!c.apiConfig })));

    try {
      const promises = activeChars.map(async (character, index) => {
        const charConfig = character.apiConfig || aiConfig;
        
        console.log(`${character.name} 的配置:`, charConfig);
        
        if (!charConfig || !charConfig.apiKey) {
          const errorMessage = {
            id: (Date.now() + Math.random()).toString(),
            characterId: character.id,
            characterName: character.name,
            content: '[未配置 API Key，请在设置中配置]',
            timestamp: Date.now(),
            isUser: false,
          };
          addMessage(errorMessage);
          return;
        }

        try {
          console.log(`开始调用 ${character.name} 的 AI 服务...`);
          const response = await callAI(character, messages, charConfig);
          console.log(`${character.name} 响应成功:`, response.substring(0, 50) + '...');
          
          const aiMessage = {
            id: (Date.now() + Math.random()).toString(),
            characterId: character.id,
            characterName: character.name,
            content: response,
            timestamp: Date.now() + index * 1000,
            isUser: false,
          };
          addMessage(aiMessage);
        } catch (error) {
          console.error(`${character.name} 调用失败:`, error);
          const errorMessage = {
            id: (Date.now() + Math.random()).toString(),
            characterId: character.id,
            characterName: character.name,
            content: `[调用失败] ${error.message}`,
            timestamp: Date.now(),
            isUser: false,
          };
          addMessage(errorMessage);
        }
      });

      await Promise.all(promises);
    } catch (error) {
      console.error('发送消息失败:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleOptimizePrompt = () => {
    if (!inputValue.trim()) return;
    setShowOptimize(true);
  };

  const handleApplyOptimization = (optimizedText) => {
    setInputValue(optimizedText);
    setShowOptimize(false);
  };

  // 处理图片选择
  const handleImageSelect = (imageData) => {
    setSelectedImage(imageData);
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
  };

  // 点击外部关闭选择器
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showCharacterSelector || showMessageSelector) {
        setShowCharacterSelector(false);
        setShowMessageSelector(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [showCharacterSelector, showMessageSelector]);

  // 打开角色选择器
  const handleOpenCharacterMention = () => {
    setShowCharacterSelector(true);
  };

  // 选择角色后插入@
  const handleSelectCharacter = (character) => {
    const mentionText = `@${character.name} `;
    setInputValue((prev) => prev + mentionText);
    setShowCharacterSelector(false);
  };

  // 打开消息选择器
  const handleOpenMessageQuote = () => {
    setShowMessageSelector(true);
  };

  // 选择消息后插入引用
  const handleSelectMessage = (message) => {
    const quoteText = `「引用 ${message.characterName}：${message.content.substring(0, 50)}${message.content.length > 50 ? '...' : ''}」\n`;
    setInputValue((prev) => quoteText + prev);
    setShowMessageSelector(false);
  };

  // 处理图片选择
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = true;
      recognitionInstance.lang = 'zh-CN';

      recognitionInstance.onresult = (event) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        setInputValue((prev) => prev + transcript);
      };

      recognitionInstance.onerror = (event) => {
        console.error('语音识别错误:', event.error);
        setIsRecording(false);
      };

      recognitionInstance.onend = () => {
        setIsRecording(false);
      };

      setRecognition(recognitionInstance);
    }
  }, []);

  // 开始语音输入
  const handleVoiceInput = () => {
    if (!recognition) {
      alert('您的浏览器不支持语音识别，请使用 Chrome 或 Edge 浏览器');
      return;
    }

    if (isRecording) {
      recognition.stop();
      setIsRecording(false);
    } else {
      recognition.start();
      setIsRecording(true);
    }
  };

  // 停止录音
  const handleStopRecording = () => {
    if (recognition) {
      recognition.stop();
      setIsRecording(false);
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* 头部：话题信息 */}
      <div className="p-4 flex items-center justify-between">
        {/* 话题面板切换按钮 - 左边 */}
        <button
          onClick={() => {
            const event = new CustomEvent('toggleTopicPanel');
            window.dispatchEvent(event);
          }}
          className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-all mr-3"
          title={t('topic.management', language)}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M8 14h.01M8 18h.01M12 10h4M12 14h4M12 18h4" />
          </svg>
        </button>
        
        <div className="flex-1">
          {currentTopic ? (
            <div>
              <h2 className="text-lg font-bold text-gray-800">{currentTopic.title}</h2>
              {currentTopic.description && (
                <p className="text-sm text-gray-500 mt-1">{currentTopic.description}</p>
              )}
            </div>
          ) : (
            <h2 className="text-lg font-bold text-gray-400">{t('chat.noTopic', language)}</h2>
          )}
        </div>
      </div>
      
      {/* 消息列表 */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 [&::-webkit-scrollbar]:hidden">
        {!currentTopic ? (
          <div className="text-center py-12">
            <p className="text-gray-400">{t('chat.createTopicHint', language)}</p>
          </div>
        ) : currentTopic.messages.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400">{t('chat.noMessages', language)}</p>
          </div>
        ) : (
          currentTopic.messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 break-words whitespace-normal word-break ${
                  message.isUser
                    ? 'bg-gray-800 text-white'
                    : 'bg-white border-2 border-gray-300 text-gray-800'
                }`}
              >
                <div className="text-xs font-medium mb-1 opacity-80">
                  {message.characterName}
                </div>
                {message.image && (
                  <div className="mb-2">
                    <img src={message.image} alt="上传的图片" className="max-w-full h-48 object-cover rounded-lg" />
                  </div>
                )}
                <div className="text-sm break-words whitespace-normal word-break">{message.content}</div>
                <div className={`text-xs mt-1 ${
                  message.isUser ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  {new Date(message.timestamp).toLocaleTimeString()}
                </div>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>
      
      {/* 输入框 - Trae IDE 风格 */}
      <div className="p-0">
        <div className="max-w-5xl mx-auto">
          {/* 主输入框 */}
          <div className="relative rounded-xl overflow-hidden shadow-sm hover:shadow-md focus-within:shadow-lg transition-all duration-300 border border-gray-200 bg-white">
            {/* 输入区域 */}
            <div className="px-4 py-3">
              <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                placeholder={currentTopic ? t('dialog.input.placeholder', language) : t('dialog.noTopic', language)}
                disabled={!currentTopic || isGenerating || isRecording}
                rows={2}
                className="w-full bg-transparent border-0 text-gray-800 placeholder-gray-400 text-sm resize-none focus:outline-none focus:ring-0 disabled:opacity-50 disabled:cursor-not-allowed text-center"
                style={{ minHeight: '60px', maxHeight: '120px' }}
              />
            </div>
            
            {/* 底部工具栏 */}
            <div className="flex items-center justify-between px-3 py-2">
              {/* 左侧工具按钮 */}
              <div className="flex items-center gap-1">
                {/* @ 按钮 - 提及角色 */}
                <button
                  onClick={handleOpenCharacterMention}
                  disabled={!currentTopic || isGenerating}
                  className="p-1.5 text-gray-500 hover:text-blue-500 hover:bg-blue-50 rounded transition-all disabled:opacity-50 disabled:cursor-not-allowed font-bold text-base"
                  title="提及角色"
                >
                  @
                </button>
                
                {/* # 按钮 - 引用对话 */}
                <button
                  onClick={handleOpenMessageQuote}
                  disabled={!currentTopic || isGenerating}
                  className="p-1.5 text-gray-500 hover:text-blue-500 hover:bg-blue-50 rounded transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  title="引用对话"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </button>
                
                {/* 图片按钮 */}
                <button
                  onClick={() => document.getElementById('image-upload').click()}
                  disabled={!currentTopic || isGenerating || isRecording}
                  className="p-1.5 text-gray-500 hover:text-blue-500 hover:bg-blue-50 rounded transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  title={t('chat.uploadImage', language) || '上传图片'}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </button>
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageSelect(e.target.files[0])}
                  className="hidden"
                />
              </div>
              
              {/* 右侧区域 */}
              <div className="flex items-center gap-2">
                {/* 优化按钮 */}
                <button
                  onClick={handleOptimizePrompt}
                  disabled={(!inputValue.trim() && !selectedImage) || !currentTopic || isGenerating}
                  className="p-1.5 text-amber-500 hover:bg-amber-50 rounded transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  title={t('action.optimize', language)}
                >
                  {/* 十字星 + 右上角小十字星 */}
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    {/* 大十字星 */}
                    <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
                    {/* 右上角小十字星 */}
                    <path d="M18 2L18.76 4.76L21.52 5.52L18.76 6.28L18 9.04L17.24 6.28L14.48 5.52L17.24 4.76L18 2Z" opacity="0.6"/>
                  </svg>
                </button>
                
                {/* 语音按钮 */}
                <button
                  onClick={isRecording ? handleStopRecording : handleVoiceInput}
                  disabled={!currentTopic || isGenerating}
                  className={`p-1.5 rounded transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                    isRecording 
                      ? 'text-red-500 bg-red-50' 
                      : 'text-gray-500 hover:text-blue-500 hover:bg-blue-50'
                  }`}
                  title={t('chat.voiceInput', language) || '语音输入'}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                </button>
                
                {/* 发送按钮 - 蓝色 */}
                <button
                  onClick={handleSendMessage}
                  disabled={(!inputValue.trim() && !selectedImage) || !currentTopic || isGenerating}
                  className="w-9 h-9 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:from-gray-300 disabled:to-gray-400 text-white rounded-lg font-medium transition-all disabled:cursor-not-allowed flex items-center justify-center shadow-md hover:shadow-lg"
                  title={t('dialog.send', language)}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                  </svg>
                </button>
              </div>
            </div>
            
            {/* 图片预览 */}
            {selectedImage && (
              <div className="px-4 pb-3">
                <div className="relative inline-block">
                  <img src={selectedImage} alt="Selected" className="h-20 w-auto rounded-lg border border-gray-200" />
                  <button
                    onClick={() => setSelectedImage(null)}
                    className="absolute -top-2 -right-2 p-1 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-md transition-all"
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </div>
          
          {/* 录音状态提示 */}
          {isRecording && (
            <div className="mt-3 flex items-center justify-center gap-2 text-red-500">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium">{t('chat.recording', language)}</span>
            </div>
          )}
          
          {/* 角色选择器弹窗 */}
          {showCharacterSelector && (
            <div 
              className="absolute bottom-full left-0 right-0 mb-2 bg-white rounded-lg shadow-xl border border-gray-200 max-h-60 overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-2 border-b border-gray-100">
                <p className="text-sm font-medium text-gray-700">选择要提及的角色</p>
              </div>
              <div className="p-2 space-y-1">
                {activeChars.map((character) => (
                  <button
                    key={character.id}
                    onClick={() => handleSelectCharacter(character)}
                    className="w-full text-left px-3 py-2 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-xs font-bold">
                        {character.name.charAt(0)}
                      </div>
                      <span className="text-sm text-gray-800">{character.name}</span>
                      <span className="text-xs text-gray-500">{character.identity}</span>
                    </div>
                  </button>
                ))}
                {activeChars.length === 0 && (
                  <p className="text-sm text-gray-500 text-center py-4">暂无活跃角色</p>
                )}
              </div>
            </div>
          )}
          
          {/* 消息选择器弹窗 */}
          {showMessageSelector && (
            <div 
              className="absolute bottom-full left-0 right-0 mb-2 bg-white rounded-lg shadow-xl border border-gray-200 max-h-60 overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-2 border-b border-gray-100">
                <p className="text-sm font-medium text-gray-700">选择要引用的对话</p>
              </div>
              <div className="p-2 space-y-1">
                {currentTopic?.messages.slice(-10).reverse().map((message) => (
                  <button
                    key={message.id}
                    onClick={() => handleSelectMessage(message)}
                    className="w-full text-left px-3 py-2 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <div className="flex items-start gap-2">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 ${
                        message.isUser ? 'bg-gray-600' : 'bg-blue-500'
                      }`}>
                        {message.isUser ? '你' : message.characterName.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-medium text-gray-700">{message.characterName}</span>
                          <span className="text-xs text-gray-400">{new Date(message.timestamp).toLocaleTimeString()}</span>
                        </div>
                        <p className="text-xs text-gray-600 truncate">{message.content}</p>
                      </div>
                    </div>
                  </button>
                ))}
                {(!currentTopic || currentTopic.messages.length === 0) && (
                  <p className="text-sm text-gray-500 text-center py-4">暂无对话记录</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 优化弹窗 */}
      {showOptimize && (
        <OptimizePrompt
          onClose={() => setShowOptimize(false)}
          onApply={handleApplyOptimization}
          originalText={inputValue}
        />
      )}
    </div>
  );
}

export default ChatPanel;
