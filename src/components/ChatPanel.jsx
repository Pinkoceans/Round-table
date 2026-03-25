import React, { useState, useRef, useEffect } from 'react';
import { useForumStore } from '../store';
import { callAI } from '../ai-service';
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
  } = useForumStore();
  
  const [inputValue, setInputValue] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showOptimize, setShowOptimize] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recognition, setRecognition] = useState(null);
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

  // 语音识别初始化
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
    <div className="bg-white/90 backdrop-blur-md rounded-xl border-2 border-gray-300 shadow-lg h-full flex flex-col">
      {/* 头部：话题信息 */}
      <div className="p-4 border-b border-gray-200 bg-gray-50">
        {currentTopic ? (
          <div>
            <h2 className="text-lg font-bold text-gray-800">{currentTopic.title}</h2>
            {currentTopic.description && (
              <p className="text-sm text-gray-500 mt-1">{currentTopic.description}</p>
            )}
          </div>
        ) : (
          <h2 className="text-lg font-bold text-gray-400">请先创建或选择一个话题</h2>
        )}
      </div>
      
      {/* 消息列表 */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50/50">
        {!currentTopic ? (
          <div className="text-center py-12">
            <p className="text-gray-400">在右侧创建一个话题开始讨论</p>
          </div>
        ) : currentTopic.messages.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400">暂无消息，开始提问吧</p>
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
      
      {/* 输入框和优化弹窗 */}
      <div className="p-4 border-t border-gray-200 bg-white space-y-3">
        {/* 工具栏：图片和语音 */}
        <InputToolbar
          onImageSelect={handleImageSelect}
          onVoiceInput={handleVoiceInput}
          isRecording={isRecording}
          onStopRecording={handleStopRecording}
        />

        {/* 输入框和发送按钮 */}
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder={currentTopic ? "输入你的问题..." : "请先创建话题"}
            disabled={!currentTopic || isGenerating || isRecording}
            className="flex-1 bg-gray-50 border-2 border-gray-300 rounded-lg px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-gray-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
          />
          <button
            onClick={handleOptimizePrompt}
            disabled={(!inputValue.trim() && !selectedImage) || !currentTopic || isGenerating}
            className="px-4 py-3 bg-yellow-400 hover:bg-yellow-500 disabled:bg-gray-300 text-white rounded-lg font-medium transition-all disabled:cursor-not-allowed flex items-center justify-center"
            title="一键优化问题"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </button>
          <button
            onClick={handleSendMessage}
            disabled={(!inputValue.trim() && !selectedImage) || !currentTopic || isGenerating}
            className="px-6 py-3 bg-gray-800 hover:bg-gray-700 disabled:bg-gray-400 text-white rounded-lg font-medium transition-all disabled:cursor-not-allowed"
          >
            发送
          </button>
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
