import React, { useState } from 'react';
import { useForumStore, CHARACTER_CATEGORIES, CATEGORY_NAMES } from '../store';
import { providers, models } from './SettingsPanel';
import { t } from '../i18n';

function TopicCharacterPanel() {
  const { 
    topics, 
    currentTopicId, 
    createTopic, 
    switchTopic, 
    deleteTopic,
    characters,
    activeCharacters,
    toggleActiveCharacter,
    setCharacterAPIConfig,
    apiConfigs,
    addAPIConfig,
    language,
  } = useForumStore();
  
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [showCharacterSelect, setShowCharacterSelect] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(CHARACTER_CATEGORIES.ALL);
  const [sortBy, setSortBy] = useState('popularity');
  const [showConfigPanel, setShowConfigPanel] = useState(false);
  const [configuringCharacter, setConfiguringCharacter] = useState(null);
  const [showBio, setShowBio] = useState(null);

  const handleCreateTopic = () => {
    if (!newTitle.trim()) return;
    createTopic(newTitle, newDescription);
    setNewTitle('');
    setNewDescription('');
  };

  const handleTopicClick = (topic) => {
    switchTopic(topic.id);
    setSelectedTopic(topic);
    setShowCharacterSelect(true);
  };

  const handleBackToTopics = () => {
    setShowCharacterSelect(false);
    setSelectedTopic(null);
  };

  const getSortedCharacters = () => {
    let chars;
    if (selectedCategory === 'selected') {
      chars = characters.filter(c => activeCharacters.includes(c.id));
    } else if (selectedCategory !== CHARACTER_CATEGORIES.ALL) {
      chars = characters.filter(c => c.category === selectedCategory);
    } else {
      chars = characters;
    }
    
    return [...chars].sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name, 'zh-Hans-CN');
      }
      return parseInt(a.id) - parseInt(b.id);
    });
  };

  const sortedCharacters = getSortedCharacters();

  const getActiveCount = (category) => {
    const chars = category === CHARACTER_CATEGORIES.ALL 
      ? characters 
      : characters.filter(c => c.category === category);
    return chars.filter(c => activeCharacters.includes(c.id)).length;
  };

  const getCategoryCount = (category) => {
    if (category === CHARACTER_CATEGORIES.ALL) {
      return characters.length;
    }
    return characters.filter(c => c.category === category).length;
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleToggleCharacter = (characterId) => {
    toggleActiveCharacter(characterId);
  };

  // 获取当前分类的角色（使用本地 selectedCategory 而不是 store 的 currentCategory）
  const getDisplayCharacters = () => {
    if (selectedCategory === CHARACTER_CATEGORIES.ALL) {
      return characters;
    }
    return characters.filter(c => c.category === selectedCategory);
  };

  const displayCharacters = getDisplayCharacters();

  const handleOpenConfig = (character) => {
    setConfiguringCharacter(character);
    setShowConfigPanel(true);
  };

  const handleBackToCharacterSelect = () => {
    setShowConfigPanel(false);
  };

  const handleSaveAIConfig = (config, configName = null) => {
    if (!configuringCharacter) return;
    
    if (configName) {
      addAPIConfig({
        name: configName,
        ...config,
      });
    }
    
    setCharacterAPIConfig(configuringCharacter.id, config);
    setShowConfigPanel(false);
    alert(`${configuringCharacter.name} 的 AI 配置已保存！${configName ? '并已添加到配置列表' : ''}`);
  };

  const handleSelectAll = () => {
    displayCharacters.forEach(character => {
      if (!activeCharacters.includes(character.id)) {
        toggleActiveCharacter(character.id);
      }
    });
  };

  const handleDeselectAll = () => {
    displayCharacters.forEach(character => {
      if (activeCharacters.includes(character.id)) {
        toggleActiveCharacter(character.id);
      }
    });
  };

  // 话题管理界面
  if (!showCharacterSelect) {
    return (
      <div className="h-full flex flex-col bg-gradient-to-b from-blue-50/50 to-white">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-4 pt-4">话题</h2>
        
        {/* 创建话题表单 */}
        <div className="mb-3 px-4">
          <div className="space-y-2">
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder={t('topic.placeholder.title', language)}
              className="w-full bg-white/50 border-0 rounded-lg px-3 py-2 text-gray-800 text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-300"
            />
            <textarea
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              placeholder={t('topic.placeholder.description', language)}
              rows={2}
              className="w-full bg-white/50 border-0 rounded-lg px-3 py-2 text-gray-800 text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-300 resize-none"
            />
            <button
              onClick={handleCreateTopic}
              disabled={!newTitle.trim()}
              className="w-full px-3 py-2 bg-gray-800 hover:bg-gray-700 disabled:bg-gray-400 text-white text-sm rounded-lg transition-all disabled:cursor-not-allowed font-medium"
            >
              {t('topic.create', language)}
            </button>
          </div>
        </div>
        
        {/* 话题列表 */}
        <div className="flex-1 overflow-y-auto px-4 space-y-2 [&::-webkit-scrollbar]:hidden">
          {topics.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-2">{t('topic.empty', language)}</p>
              <p className="text-gray-400 text-sm">{t('topic.createHint', language)}</p>
            </div>
          ) : (
            topics.map((topic) => (
              <div
                key={topic.id}
                className={`p-4 rounded-lg transition-all cursor-pointer ${
                  currentTopicId === topic.id
                    ? 'bg-gray-800 text-white'
                    : 'bg-white/50 hover:bg-white text-gray-800'
                }`}
                onClick={() => handleTopicClick(topic)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-medium">{topic.title}</h3>
                    {topic.description && (
                      <p className={`text-xs mt-1 line-clamp-2 ${
                        currentTopicId === topic.id ? 'text-gray-300' : 'text-gray-500'
                      }`}>
                        {topic.description}
                      </p>
                    )}
                    <p className={`text-xs mt-2 ${
                      currentTopicId === topic.id ? 'text-gray-400' : 'text-gray-400'
                    }`}>
                      {topic.messages.length} {t('topic.messages', language)}
                    </p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteTopic(topic.id);
                    }}
                    className={`text-xs transition-colors ${
                      currentTopicId === topic.id 
                        ? 'text-gray-400 hover:text-red-400' 
                        : 'text-gray-400 hover:text-red-500'
                    }`}
                  >
                    {t('action.delete', language)}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    );
  }

  // 角色选择界面
  if (showConfigPanel && configuringCharacter) {
    return (
      <div className="h-full flex flex-col bg-gradient-to-b from-blue-50/50 to-white">
        <div className="px-4 pt-4 pb-3">
          <div className="flex items-center">
            <button
              onClick={handleBackToCharacterSelect}
              className="mr-3 p-1 hover:bg-white/50 rounded transition-all"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{t('character.aiConfig', language)}</h2>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4 [&::-webkit-scrollbar]:hidden">
          <div>
            <label className="block text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-2">{t('settings.provider', language)}</label>
            <select
              value={configuringCharacter.apiConfig?.provider || 'openai'}
              onChange={(e) => {
                setConfiguringCharacter({
                  ...configuringCharacter,
                  apiConfig: {
                    ...configuringCharacter.apiConfig,
                    provider: e.target.value,
                  }
                });
              }}
              className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm text-gray-800"
            >
              {providers.map((p) => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-2">{t('settings.apiKey', language)}</label>
            <input
              type="password"
              value={configuringCharacter.apiConfig?.apiKey || ''}
              onChange={(e) => {
                setConfiguringCharacter({
                  ...configuringCharacter,
                  apiConfig: {
                    ...configuringCharacter.apiConfig,
                    apiKey: e.target.value,
                  }
                });
              }}
              placeholder={t('settings.inputApiKey', language)}
              className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm text-gray-800"
            />
          </div>
          
          <div>
            <label className="block text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-2">{t('settings.model', language)}</label>
            <select
              value={configuringCharacter.apiConfig?.model || 'gpt-5.4-thinking'}
              onChange={(e) => {
                setConfiguringCharacter({
                  ...configuringCharacter,
                  apiConfig: {
                    ...configuringCharacter.apiConfig,
                    model: e.target.value,
                  }
                });
              }}
              className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm text-gray-800"
            >
              {models[configuringCharacter.apiConfig?.provider || 'openai']?.map((m) => (
                <option key={m.id} value={m.id}>{m.name}</option>
              ))}
            </select>
          </div>
          
          {apiConfigs.length > 0 && (
            <div className="pt-2">
              <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-2">{t('settings.orUseExisting', language) || 'OR USE EXISTING'}</p>
              <div className="space-y-1">
                {apiConfigs.map((config) => (
                  <button
                    key={config.id}
                    onClick={() => {
                      setConfiguringCharacter({
                        ...configuringCharacter,
                        apiConfig: config,
                      });
                    }}
                    className="w-full text-left px-3 py-2 bg-gray-50 hover:bg-gray-100 rounded text-xs text-gray-700 transition-all"
                  >
                    {config.name} - {config.provider} ({config.model})
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
        
        <div className="px-4 pb-4 pt-3">
          <button
            onClick={() => {
              if (configuringCharacter.apiConfig?.apiKey) {
                handleSaveAIConfig(configuringCharacter.apiConfig);
              }
            }}
            disabled={!configuringCharacter.apiConfig?.apiKey}
            className="w-full px-4 py-2.5 bg-gray-800 hover:bg-gray-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg transition-all"
          >
            {t('settings.saveConfig', language)}
          </button>
        </div>
      </div>
    );
  }

  // 角色选择主界面
  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-blue-50/50 to-white">
      <div className="px-4 pt-4 pb-3 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider truncate">{t('character.select', language)}</h2>
            {selectedTopic && (
              <p className="text-[10px] text-gray-400 truncate mt-1">{t('topic.title', language)}: {selectedTopic.title}</p>
            )}
          </div>
          <button
            onClick={handleBackToTopics}
            className="ml-2 px-3 py-1.5 bg-white/50 hover:bg-white text-gray-700 text-xs rounded-lg transition-all flex-shrink-0"
          >
            {t('action.back', language)}
          </button>
        </div>
      </div>
      
      <div className="px-4 py-3 flex-shrink-0">
        <div className="grid grid-cols-4 gap-2 mb-3">
          <button
            onClick={() => handleCategoryChange('selected')}
            className={`px-2 py-2 rounded-lg text-xs font-medium transition-all ${
              selectedCategory === 'selected'
                ? 'bg-gray-800 text-white'
                : 'bg-white/50 hover:bg-white text-gray-700'
            }`}
            title={`${t('character.category.selected', language)} (${activeCharacters.length})`}
          >
            {t('character.category.selected', language)}
            <span className="text-[10px] opacity-70 ml-0.5">({activeCharacters.length})</span>
          </button>
          {Object.entries(CATEGORY_NAMES).map(([key, name]) => (
            <button
              key={key}
              onClick={() => handleCategoryChange(key)}
              className={`px-2 py-2 rounded-lg text-xs font-medium transition-all ${
                selectedCategory === key
                  ? 'bg-gray-800 text-white'
                  : 'bg-white/50 hover:bg-white text-gray-700'
              }`}
              title={name}
            >
              {t(`category.${key}`, language) || name}
            </button>
          ))}
        </div>
        
        <div className="flex items-center justify-between space-x-2">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-white/50 border-0 rounded-lg px-2 py-1.5 text-xs text-gray-700 flex-1"
          >
            <option value="popularity">{t('character.sort.popularity', language)}</option>
            <option value="name">{t('character.sort.name', language)}</option>
          </select>
          <button
            onClick={handleSelectAll}
            className="px-2 py-1.5 bg-gray-800 hover:bg-gray-700 text-white text-xs rounded-lg transition-all flex-1"
          >
            {t('character.selectAll', language)}
          </button>
          <button
            onClick={handleDeselectAll}
            className="px-2 py-1.5 bg-gray-500 hover:bg-gray-600 text-white text-xs rounded-lg transition-all flex-1"
          >
            {t('character.clear', language)}
          </button>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto px-4 py-2 [&::-webkit-scrollbar]:hidden">
        {sortedCharacters.length === 0 ? (
          <p className="text-gray-400 text-xs text-center py-4">{t('character.empty', language)}</p>
        ) : (
          <div className="space-y-2">
            {sortedCharacters.map((character) => {
              const isActive = activeCharacters.includes(character.id);
              const hasConfig = !!character.apiConfig;
              
              return (
                <div
                  key={character.id}
                  className={`flex items-center p-3 rounded-lg transition-all ${
                    isActive
                      ? 'bg-gray-800 text-white'
                      : 'bg-white/50 hover:bg-white text-gray-800'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0 ${
                    isActive 
                      ? 'bg-gradient-to-br from-gray-500 to-gray-400' 
                      : 'bg-gradient-to-br from-gray-700 to-gray-600'
                  }`}>
                    {character.name.charAt(0)}
                  </div>
                  
                  <div className="flex-1 min-w-0 ml-3">
                    <div className="flex items-center space-x-1">
                      <h3 className="font-medium text-xs truncate flex items-center">
                        {character.name}
                        {hasConfig && (
                          <span className={`text-xs ${
                            isActive ? 'text-green-400' : 'text-green-600'
                          }`}>●</span>
                        )}
                      </h3>
                    </div>
                    <p className={`text-xs truncate mt-0.5 ${
                      isActive ? 'text-gray-300' : 'text-gray-500'
                    }`}>{character.identity}</p>
                  </div>
                  
                  <button
                    onClick={() => setShowBio(character)}
                    className={`p-1.5 rounded-lg transition-all flex-shrink-0 ${
                      isActive
                        ? 'bg-gray-600 hover:bg-gray-500 text-white'
                        : 'bg-white/50 hover:bg-white text-gray-600'
                    }`}
                    title={t('character.bio', language)}
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </button>
                  
                  <button
                    onClick={() => handleToggleCharacter(character.id)}
                    className={`ml-2 px-3 py-1.5 text-xs rounded-lg transition-all flex-shrink-0 ${
                      isActive
                        ? 'bg-red-600 hover:bg-red-500 text-white'
                        : 'bg-gray-800 hover:bg-gray-700 text-white'
                    }`}
                  >
                    {isActive ? t('character.remove', language) : t('character.add', language)}
                  </button>
                  
                  {isActive && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenConfig(character);
                      }}
                      className="ml-2 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs rounded-lg transition-all flex-shrink-0"
                    >
                      {t('character.configure', language)}
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
      
      <div className="px-4 pb-3 pt-2 flex-shrink-0">
        <div className="flex items-center justify-between text-xs">
          <span className="text-gray-500">
            {t('character.category.selected', language)}: <span className="text-gray-800 font-medium">{activeCharacters.length}</span>
          </span>
          <span className="text-gray-400">
            {t('character.total', language)} {sortedCharacters.length}
          </span>
        </div>
      </div>

      {/* 角色简介模态框 */}
      {showBio && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full border border-gray-200 max-h-[80vh] overflow-y-auto">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-700 to-gray-600 flex items-center justify-center text-white font-bold text-lg">
                  {showBio.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">{showBio.name}</h3>
                  <p className="text-sm text-gray-500">{showBio.identity}</p>
                </div>
              </div>
              <button
                onClick={() => setShowBio(null)}
                className="text-gray-400 hover:text-gray-600 transition-all"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-1">{t('bio.personality', language)}</h4>
                <p className="text-sm text-gray-600">{showBio.personality}</p>
              </div>
              
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-1">{t('bio.speakingStyle', language)}</h4>
                <p className="text-sm text-gray-600">{showBio.speakingStyle}</p>
              </div>
              
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-1">{t('bio.background', language)}</h4>
                <p className="text-sm text-gray-600">{showBio.background}</p>
              </div>
              
              {showBio.status === 'deceased' && (
                <div className="text-xs text-gray-400">
                  {t('bio.historical', language)}
                </div>
              )}
            </div>
            
            <div className="mt-6 pt-4 border-t border-gray-200">
              <button
                onClick={() => setShowBio(null)}
                className="w-full px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white text-sm rounded-lg transition-all"
              >
                {t('action.close', language)}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TopicCharacterPanel;
