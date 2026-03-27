import React, { useState } from 'react';
import { useForumStore, CHARACTER_CATEGORIES, CATEGORY_NAMES } from '../store';
import { providers, models } from './SettingsPanel';
import { t } from '../i18n';

function CharacterPanel({ full = false }) {
  const [selectedCategory, setSelectedCategory] = useState(CHARACTER_CATEGORIES.ALL);
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [configuringCharacter, setConfiguringCharacter] = useState(null);
  const [bulkConfigOpen, setBulkConfigOpen] = useState(false);
  const [sortBy, setSortBy] = useState('popularity');
  const [configProvider, setConfigProvider] = useState('openai');
  const [configApiKey, setConfigApiKey] = useState('');
  const [configModel, setConfigModel] = useState('gpt-5.4-thinking');
  const [configName, setConfigName] = useState('');
  const [saveConfig, setSaveConfig] = useState(false);
  const [showAIConfigPanel, setShowAIConfigPanel] = useState(false);
  const [expandedView, setExpandedView] = useState(false);
  
  const { language } = useForumStore();
  
  const defaultModel = 'gpt-5.4-thinking';
  
  // 通知父组件展开状态变化
  React.useEffect(() => {
    const event = new CustomEvent('character-panel-expand', { detail: { expanded: expandedView } });
    window.dispatchEvent(event);
  }, [expandedView]);
  
  const { 
    characters, 
    activeCharacters, 
    toggleActiveCharacter,
    setCurrentCategory,
    getCharactersByCategory,
    setCharacterAPIConfig,
    apiConfigs,
    addAPIConfig,
  } = useForumStore();

  const [bulkProvider, setBulkProvider] = useState('openai');
  const [bulkApiKey, setBulkApiKey] = useState('');
  const [bulkModel, setBulkModel] = useState(defaultModel);

  const displayCharacters = getCharactersByCategory();

  const getCategoryNames = () => {
    if (full) {
      return CATEGORY_NAMES;
    }
    return {
      selected: '已选角色',
      ...CATEGORY_NAMES,
    };
  };

  const categoryNames = getCategoryNames();

  const getSortedCharacters = () => {
    let chars;
    if (selectedCategory === 'selected' && !full) {
      chars = characters.filter(c => activeCharacters.includes(c.id));
    } else {
      chars = displayCharacters;
    }
    
    return [...chars].sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name, 'zh-Hans-CN');
      }
      return parseInt(a.id) - parseInt(b.id);
    });
  };

  const sortedCharacters = getSortedCharacters();

  const getCategoryCount = (category) => {
    if (category === CHARACTER_CATEGORIES.ALL) {
      return characters.length;
    }
    return characters.filter(c => c.category === category).length;
  };

  const getActiveCount = (category) => {
    const chars = category === CHARACTER_CATEGORIES.ALL 
      ? characters 
      : characters.filter(c => c.category === category);
    return chars.filter(c => activeCharacters.includes(c.id)).length;
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentCategory(category);
  };

  const handleAddCharacter = (characterId) => {
    if (!activeCharacters.includes(characterId)) {
      toggleActiveCharacter(characterId);
    }
  };

  const handleRemoveCharacter = (characterId) => {
    if (activeCharacters.includes(characterId)) {
      toggleActiveCharacter(characterId);
    }
  };

  const handleOpenConfig = (character) => {
    setConfiguringCharacter(character);
    setShowAIConfigPanel(true);
  };

  const handleBackToCharacterSelect = () => {
    setShowAIConfigPanel(false);
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
    setShowAIConfigPanel(false);
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

  if (full) {
    return (
      <div className="bg-white/90 backdrop-blur-md rounded-xl p-6 border border-gray-200 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">{t('character.management', language) || '角色管理'}</h2>
        </div>

        <div className="mb-4 bg-white/60 rounded-lg p-4 border border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-gray-600 font-medium">
              {t('category.current', language) || CATEGORY_NAMES[selectedCategory]}: <span className="text-gray-800">{getActiveCount(selectedCategory)}/{getCategoryCount(selectedCategory)}</span> {t('character.activated', language) || '已激活'}
            </span>
            <div className="flex items-center space-x-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white border border-gray-300 rounded px-3 py-1.5 text-sm text-gray-700"
              >
                <option value="popularity">{t('character.sortByPopularity', language) || '按知名度排序'}</option>
                <option value="name">{t('character.sortByName', language) || '按名字排序'}</option>
              </select>
              <button
                onClick={handleSelectAll}
                className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-white text-sm rounded transition-all shadow-sm"
              >
                {t('character.selectAll', language)}
              </button>
              <button
                onClick={handleDeselectAll}
                className="px-3 py-1.5 bg-gray-500 hover:bg-gray-600 text-white text-sm rounded transition-all"
              >
                {t('character.clear', language) || '清空'}
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2">
            {Object.entries(CATEGORY_NAMES).map(([key, name]) => (
              <button
                key={key}
                onClick={() => handleCategoryChange(key)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedCategory === key
                    ? 'bg-gray-800 text-white shadow-md'
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-600'
                }`}
              >
                {name} ({getActiveCount(key)})
              </button>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-h-[450px] overflow-y-auto pr-2">
          {sortedCharacters.length === 0 ? (
            <p className="text-gray-400 text-sm col-span-full text-center py-8">该分类暂无角色</p>
          ) : (
            sortedCharacters.map((character) => {
              const isActive = activeCharacters.includes(character.id);
              const hasConfig = !!character.apiConfig;
              
              return (
                <div
                  key={character.id}
                  className={`relative rounded-lg p-4 border-2 transition-all hover:shadow-xl aspect-[3/4] flex flex-col ${
                    isActive
                      ? 'bg-gradient-to-br from-gray-700 to-gray-800 border-gray-600 text-white'
                      : 'bg-white border-gray-200 text-gray-800 hover:border-gray-400'
                  }`}
                >
                  <div className="mb-3">
                    <h3 className="text-lg font-bold truncate">{character.name}</h3>
                    <p className={`text-xs mt-1 truncate ${isActive ? 'text-gray-300' : 'text-gray-500'}`}>
                      {character.identity}
                    </p>
                  </div>
                  
                  <div className={`flex-1 text-xs space-y-2 overflow-hidden ${isActive ? 'text-gray-300' : 'text-gray-600'}`}>
                    <div>
                      <span className="opacity-60">性格</span>
                      <p className="mt-0.5 line-clamp-2">{character.personality}</p>
                    </div>
                    <div>
                      <span className="opacity-60">风格</span>
                      <p className="mt-0.5 line-clamp-2">{character.speakingStyle}</p>
                    </div>
                  </div>
                  
                  {hasConfig && (
                    <div className={`mt-3 text-xs p-2 rounded ${
                      isActive ? 'bg-gray-600/50 text-green-300' : 'bg-green-50 text-green-700'
                    }`}>
                      <p className="truncate font-medium">已配置 AI</p>
                      <p className="truncate opacity-80">{character.apiConfig.provider}</p>
                    </div>
                  )}
                  
                  <div className="mt-3">
                    {isActive ? (
                      <button
                        onClick={() => handleRemoveCharacter(character.id)}
                        className="w-full px-3 py-1.5 bg-red-600 hover:bg-red-500 text-white text-xs rounded transition-all"
                      >
                        移除
                      </button>
                    ) : (
                      <button
                        onClick={() => handleAddCharacter(character.id)}
                        className="w-full px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-white text-xs rounded transition-all shadow-sm"
                      >
                        添加
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-full overflow-hidden">
      <div className={`absolute inset-0 transition-transform duration-300 ease-in-out ${
        showAIConfigPanel ? '-translate-x-full' : 'translate-x-0'
      }`}>
        <div className="bg-white/90 backdrop-blur-md rounded-xl border-2 border-gray-200 shadow-lg h-full flex flex-col">
          <div className="px-4 pt-4 pb-2 flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-800">{t('character.select', language) || '角色选择'}</h2>
            <button
              onClick={() => setExpandedView(!expandedView)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                expandedView
                  ? 'bg-gray-800 text-white'
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
              }`}
            >
              {expandedView ? (t('action.collapse', language) || '收起') : (t('action.expand', language) || '展开')}
            </button>
          </div>
          
          <div className="px-4 mb-3 grid grid-cols-2 gap-1">
            {Object.entries(categoryNames).map(([key, name]) => {
              const count = key === 'selected' && !full
                ? activeCharacters.length
                : getActiveCount(key);
              
              return (
                <button
                  key={key}
                  onClick={() => handleCategoryChange(key)}
                  className={`px-2 py-1.5 rounded text-xs font-medium transition-all ${
                    selectedCategory === key
                      ? 'bg-gray-800 text-white shadow-sm'
                      : 'bg-gray-200 hover:bg-gray-300 text-gray-600'
                  }`}
                >
                  {t(`category.${key}`, language) || name} ({count})
                </button>
              );
            })}
          </div>
          
          <div className="px-4 mb-2 flex items-center justify-between">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-gray-300 rounded px-2 py-1 text-xs text-gray-700"
            >
              <option value="popularity">{t('character.sortByPopularity', language) || '按知名度'}</option>
              <option value="name">{t('character.sortByName', language) || '按字母'}</option>
            </select>
            <div className="flex items-center space-x-1">
              <button
                onClick={handleSelectAll}
                className="px-2 py-1 bg-gray-800 hover:bg-gray-700 text-white text-xs rounded transition-all"
              >
                全选
              </button>
              <button
                onClick={handleDeselectAll}
                className="px-2 py-1 bg-gray-500 hover:bg-gray-600 text-white text-xs rounded transition-all"
              >
                清空
              </button>
            </div>
          </div>
          
          <div className={`flex-1 overflow-y-auto px-4 ${
            expandedView ? 'py-4' : 'py-3'
          }`}>
            {sortedCharacters.length === 0 ? (
              <p className="text-gray-400 text-sm text-center py-8">该分类暂无角色</p>
            ) : (
              <div className={`grid gap-3 ${
                expandedView
                  ? 'grid-cols-2'
                  : 'grid-cols-1'
              }`}>
                {sortedCharacters.map((character) => {
                  const isActive = activeCharacters.includes(character.id);
                  const hasConfig = !!character.apiConfig;
                  
                  return (
                    <div
                      key={character.id}
                      className={`relative rounded-lg p-3 border-2 transition-all hover:shadow-md ${
                        isActive
                          ? 'bg-gradient-to-br from-gray-700 to-gray-800 border-gray-600 text-white'
                          : 'bg-white border-gray-200 hover:border-gray-400 text-gray-800'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center space-x-2 flex-1">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0 ${
                            isActive 
                              ? 'bg-gradient-to-br from-gray-500 to-gray-400' 
                              : 'bg-gradient-to-br from-gray-700 to-gray-600'
                          } shadow-sm`}>
                            {character.name.charAt(0)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-medium text-sm truncate flex items-center">
                              {character.name}
                              {hasConfig && (
                                <span className={`ml-1 text-xs ${
                                  isActive ? 'text-green-400' : 'text-green-600'
                                }`}>●</span>
                              )}
                            </h3>
                            <p className={`text-xs truncate ${
                              isActive ? 'text-gray-300' : 'text-gray-500'
                            }`}>{character.identity}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => toggleActiveCharacter(character.id)}
                          className={`flex-1 px-3 py-1.5 text-xs rounded transition-all ${
                            isActive
                              ? 'bg-red-600 hover:bg-red-500 text-white'
                              : 'bg-gray-800 hover:bg-gray-700 text-white'
                          }`}
                        >
                          {isActive ? '移除' : '添加'}
                        </button>
                        {isActive && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleOpenConfig(character);
                            }}
                            className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs rounded transition-all"
                          >
                            配置
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          
          <div className="px-4 pb-3 pt-2 border-t border-gray-200">
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-500">
                已选择：<span className="text-gray-800 font-medium">{activeCharacters.length}</span> 位角色
              </span>
              <span className="text-gray-400">
                共 {sortedCharacters.length} 位角色
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <div className={`absolute inset-0 transition-transform duration-300 ease-in-out ${
        showAIConfigPanel ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <AIConfigPanel
          character={configuringCharacter}
          onBack={handleBackToCharacterSelect}
          onSave={handleSaveAIConfig}
        />
      </div>
    </div>
  );
}

function AIConfigPanel({ character, onBack, onSave }) {
  const { apiConfigs } = useForumStore();
  const [configProvider, setConfigProvider] = useState(character?.apiConfig?.provider || 'openai');
  const [configApiKey, setConfigApiKey] = useState(character?.apiConfig?.apiKey || '');
  const [configModel, setConfigModel] = useState(character?.apiConfig?.model || 'gpt-5.4-thinking');
  const [configName, setConfigName] = useState('');
  const [saveConfig, setSaveConfig] = useState(false);

  const handleSave = () => {
    if (!configApiKey.trim() || !character) return;
    
    const config = {
      provider: configProvider,
      apiKey: configApiKey.trim(),
      model: configModel,
      temperature: 0.7,
    };
    
    if (saveConfig && configName.trim()) {
      onSave(config, configName.trim());
    } else {
      onSave(config);
    }
  };

  return (
    <div className="bg-white/90 backdrop-blur-md rounded-xl border-2 border-gray-200 shadow-lg h-full flex flex-col">
      <div className="px-4 pt-4 pb-3 border-b border-gray-200">
        <div className="flex items-center">
          <button
            onClick={onBack}
            className="mr-3 p-1 hover:bg-gray-100 rounded transition-all"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h2 className="text-lg font-bold text-gray-800">{t('settings.title', language) || 'AI 配置'}</h2>
        </div>
        <p className="text-xs text-gray-500 mt-1">{t('character.configureFor', language) || '为'} {character?.name} {t('character.configureAI', language) || '配置 AI 模型'}</p>
      </div>
      
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
        <div>
          <label className="block text-xs text-gray-500 mb-1">{t('settings.provider', language)}</label>
          <select
            value={configProvider}
            onChange={(e) => {
              setConfigProvider(e.target.value);
              setConfigModel(models[e.target.value]?.[0]?.id || '');
            }}
            className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm text-gray-800"
          >
            {providers.map((p) => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-xs text-gray-500 mb-1">{t('settings.apiKey', language)}</label>
          <input
            type="password"
            value={configApiKey}
            onChange={(e) => setConfigApiKey(e.target.value)}
            placeholder={`${providers.find(p => p.id === configProvider)?.name} ${t('settings.placeholder.apiKey', language) || 'API Key'}`}
            className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm text-gray-800"
          />
        </div>
        
        <div>
          <label className="block text-xs text-gray-500 mb-1">{t('settings.model', language)}</label>
          <select
            value={configModel}
            onChange={(e) => setConfigModel(e.target.value)}
            className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm text-gray-800"
          >
            {models[configProvider]?.map((m) => (
              <option key={m.id} value={m.id}>{m.name}</option>
            ))}
          </select>
        </div>
        
        <div className="pt-2">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={saveConfig}
              onChange={(e) => setSaveConfig(e.target.checked)}
              className="rounded border-gray-300 text-gray-800 focus:ring-gray-500"
            />
            <span className="text-xs text-gray-600">保存为配置（可重复使用）</span>
          </label>
          {saveConfig && (
            <input
              type="text"
              value={configName}
              onChange={(e) => setConfigName(e.target.value)}
              placeholder="配置名称（如：我的 OpenAI）"
              className="w-full mt-2 bg-white border border-gray-300 rounded px-3 py-2 text-sm text-gray-800"
            />
          )}
        </div>
        
        {apiConfigs.length > 0 && (
          <div className="pt-2">
            <p className="text-xs text-gray-500 mb-2">{t('settings.orUseExisting', language)}</p>
            <div className="space-y-1">
              {apiConfigs.map((config) => (
                <button
                  key={config.id}
                  onClick={() => {
                    setConfigProvider(config.provider);
                    setConfigApiKey(config.apiKey);
                    setConfigModel(config.model);
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
      
      <div className="px-4 pb-4 pt-3 border-t border-gray-200">
        <button
          onClick={handleSave}
          disabled={!configApiKey.trim()}
          className="w-full px-4 py-2.5 bg-gray-800 hover:bg-gray-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg transition-all shadow-md"
        >
          {t('settings.saveConfig', language)}
        </button>
      </div>
    </div>
  );
}

export default CharacterPanel;
