import React, { useState } from 'react';
import { useForumStore } from '../store';
import { t } from '../i18n';

function SettingsPanel() {
  const { 
    apiConfigs, 
    addAPIConfig, 
    updateAPIConfig, 
    deleteAPIConfig, 
    characters, 
    assignAPIConfigToMultipleCharacters,
    setCharacterAPIConfig,
    dialogSettings,
    setDialogSettings,
    language,
  } = useForumStore();
  
  const [showAddConfigModal, setShowAddConfigModal] = useState(false);
  const [editingConfig, setEditingConfig] = useState(null);
  const [assigningConfig, setAssigningConfig] = useState(null);
  const [showCharacterSelector, setShowCharacterSelector] = useState(false);
  const [selectedConfigForAssign, setSelectedConfigForAssign] = useState(null);
  
  const [configFormData, setConfigFormData] = useState({
    name: '',
    provider: 'openai',
    apiKey: '',
    model: 'gpt-5.4-thinking',
    temperature: 0.7,
  });

  const handleOpenAddConfig = () => {
    setConfigFormData({
      name: '',
      provider: 'openai',
      apiKey: '',
      model: 'gpt-5.4-thinking',
      temperature: 0.7,
    });
    setShowAddConfigModal(true);
  };

  const handleOpenEditConfig = (config) => {
    setConfigFormData({
      name: config.name,
      provider: config.provider,
      apiKey: config.apiKey,
      model: config.model,
      temperature: config.temperature || 0.7,
    });
    setEditingConfig(config);
    setShowAddConfigModal(true);
  };

  const handleSaveConfig = () => {
    if (!configFormData.name.trim() || !configFormData.apiKey.trim()) {
      alert(t('settings.fillConfigName', language));
      return;
    }

    const config = {
      name: configFormData.name.trim(),
      provider: configFormData.provider,
      apiKey: configFormData.apiKey.trim(),
      model: configFormData.model,
      temperature: configFormData.temperature,
    };

    if (editingConfig) {
      updateAPIConfig(editingConfig.id, config);
      alert(t('settings.configUpdated', language));
    } else {
      addAPIConfig(config);
      alert(t('settings.configAdded', language));
    }

    setShowAddConfigModal(false);
    setEditingConfig(null);
  };

  const handleDeleteConfig = (config) => {
    if (confirm(`${t('settings.confirmDelete', language)} "${config.name}"?`)) {
      deleteAPIConfig(config.id);
    }
  };

  const handleOpenAssign = (config) => {
    setSelectedConfigForAssign(config);
    setShowCharacterSelector(true);
  };

  const handleAssignToCharacters = (selectedCharacterIds) => {
    if (!selectedConfigForAssign || selectedCharacterIds.length === 0) {
      alert(t('settings.selectCharacter', language));
      return;
    }
    
    assignAPIConfigToMultipleCharacters(selectedCharacterIds, selectedConfigForAssign.id);
      alert(`${t('settings.assignedConfig', language)} ${selectedCharacterIds.length} ${t('settings.characters', language)} "${selectedConfigForAssign.name}"`);
      setShowCharacterSelector(false);
    setSelectedConfigForAssign(null);
  };

  const handleDialogSettingChange = (key, value) => {
    setDialogSettings({ [key]: value });
  };

  const handleCloseCharacterSelector = () => {
    setShowCharacterSelector(false);
    setSelectedConfigForAssign(null);
  };

  const getAssignedCharactersCount = (configId) => {
    return characters.filter(c => c.apiConfig?.id === configId).length;
  };

  return (
    <div className="bg-white/90 backdrop-blur-md rounded-xl p-6 border border-gray-200 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">{t('settings.title', language)}</h2>
        <button
          onClick={handleOpenAddConfig}
          className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white text-sm rounded-lg transition-all shadow-md"
        >
          {t('topic.new', language)}
        </button>
      </div>

      {apiConfigs.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">{t('settings.noConfigs', language)}</p>
          <p className="text-gray-400 text-sm">{t('settings.oneClickConfig', language)}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {apiConfigs.map((config) => {
            const assignedCount = getAssignedCharactersCount(config.id);
            return (
              <div
                key={config.id}
                className="bg-white/80 rounded-lg p-4 border border-gray-200 hover:border-gray-400 hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                      {config.name}
                      <span className="ml-2 px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded border border-gray-200">
                        {config.provider}
                      </span>
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {t('settings.configModel', language)}: {config.model}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-400">
                      {t('settings.assignedCount', language)}: {assignedCount} {t('settings.characters', language)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleOpenAssign(config)}
                    className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs rounded transition-all"
                  >
                    {t('settings.batchAssign', language)}
                  </button>
                  <button
                    onClick={() => handleOpenEditConfig(config)}
                    className="px-3 py-1.5 bg-gray-600 hover:bg-gray-700 text-white text-xs rounded transition-all"
                  >
                    {t('action.edit', language)}
                  </button>
                  <button
                    onClick={() => handleDeleteConfig(config)}
                    className="px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white text-xs rounded transition-all"
                  >
                    {t('action.delete', language)}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 添加/编辑配置模态框 */}
      {showAddConfigModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-xl p-6 max-w-md w-full border border-white/20">
            <h3 className="text-xl font-bold text-white mb-4">
              {editingConfig ? t('action.edit', language) : t('topic.new', language)} {t('settings.title', language)}
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  {t('settings.configName', language)}
                </label>
                <input
                  type="text"
                  value={configFormData.name}
                  onChange={(e) => setConfigFormData({ ...configFormData, name: e.target.value })}
                  placeholder={t('settings.placeholder.name', language)}
                  className="w-full bg-black/30 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  {t('settings.provider', language)}
                </label>
                <select
                  value={configFormData.provider}
                  onChange={(e) => {
                    setConfigFormData({ 
                      ...configFormData, 
                      provider: e.target.value,
                      model: models[e.target.value]?.[0]?.id || '' 
                    });
                  }}
                  className="w-full bg-black/30 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500"
                >
                  {providers.map((p) => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  {t('settings.apiKey', language)}
                </label>
                <input
                  type="password"
                  value={configFormData.apiKey}
                  onChange={(e) => setConfigFormData({ ...configFormData, apiKey: e.target.value })}
                  placeholder={t('settings.placeholder.apiKey', language)}
                  className="w-full bg-black/30 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  {t('settings.model', language)}
                </label>
                <select
                  value={configFormData.model}
                  onChange={(e) => setConfigFormData({ ...configFormData, model: e.target.value })}
                  className="w-full bg-black/30 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500"
                >
                  {models[configFormData.provider]?.map((m) => (
                    <option key={m.id} value={m.id}>{m.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  {t('settings.temperature', language)}: {configFormData.temperature}
                </label>
                <input
                  type="range"
                  min="0"
                  max="2"
                  step="0.1"
                  value={configFormData.temperature}
                  onChange={(e) => setConfigFormData({ ...configFormData, temperature: parseFloat(e.target.value) })}
                  className="w-full"
                />
                <p className="text-xs text-gray-400 mt-1">
                  {t('settings.temperatureHint', language) || '越低越确定（0），越高越随机（2）'}
                </p>
              </div>
              
              <div className="flex space-x-3 pt-4">
                <button
                  onClick={handleSaveConfig}
                  disabled={!configFormData.name.trim() || !configFormData.apiKey.trim()}
                  className="flex-1 px-4 py-3 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 text-white rounded-lg font-medium transition-all disabled:cursor-not-allowed"
                >
                  {t('action.save', language)}
                </button>
                <button
                  onClick={() => {
                    setShowAddConfigModal(false);
                    setEditingConfig(null);
                  }}
                  className="px-4 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-all"
                >
                  {t('action.cancel', language)}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 角色选择模态框 */}
      {showCharacterSelector && (
        <CharacterSelectorModal
          config={selectedConfigForAssign}
          characters={characters}
          onAssign={handleAssignToCharacters}
          onClose={handleCloseCharacterSelector}
        />
      )}

      {/* 对话设置部分 */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">{t('dialog.settings', language)}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* 每轮最高发言次数 */}
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <label className="text-sm font-medium text-gray-700 block mb-3">
              {t('dialog.turnsLabel', language)}
            </label>
            <select
              value={dialogSettings.maxTurns}
              onChange={(e) => handleDialogSettingChange('maxTurns', parseInt(e.target.value))}
              className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg text-sm font-medium text-gray-800 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all bg-white cursor-pointer"
            >
              {[1,2,3,4,5,6,7,8,9,10].map(num => (
                <option key={num} value={num}>{num} {t('dialog.turns', language)}</option>
              ))}
            </select>
            <p className="text-xs text-gray-500 mt-2">
              {t('dialog.turnsHint', language)}
            </p>
          </div>

          {/* 每轮最低发言次数 */}
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <label className="text-sm font-medium text-gray-700 block mb-3">
              {t('dialog.minTurns', language)}
            </label>
            <select
              value={dialogSettings.minTurns}
              onChange={(e) => handleDialogSettingChange('minTurns', parseInt(e.target.value))}
              className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg text-sm font-medium text-gray-800 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all bg-white cursor-pointer"
            >
              <option value={0}>0 {t('dialog.minTurnsOptional', language)}</option>
              {[1,2,3,4,5].map(num => (
                <option key={num} value={num}>{num} {t('dialog.minTurnsOptional', language).split('（')[0]}</option>
              ))}
            </select>
            <p className="text-xs text-gray-500 mt-2">
              {t('dialog.minTurnsHint', language)}
            </p>
          </div>

          {/* 发言间隔时间 */}
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <label className="text-sm font-medium text-gray-700 block mb-3">
              {t('dialog.interval', language)}
            </label>
            <select
              value={dialogSettings.delay}
              onChange={(e) => handleDialogSettingChange('delay', parseInt(e.target.value))}
              className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg text-sm font-medium text-gray-800 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all bg-white cursor-pointer"
            >
              <option value={0}>0 {t('dialog.intervalImmediate', language)}</option>
              {[1,2,3,4,5,6,7,8,9,10].map(num => (
                <option key={num} value={num}>{num} {t('dialog.interval', language).split('时间')[0]}</option>
              ))}
            </select>
            <p className="text-xs text-gray-500 mt-2">
              {t('dialog.intervalHint', language)}
            </p>
          </div>
        </div>

        {/* 开关设置 */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* 互动模式 */}
          <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                </svg>
                <label className="text-sm font-medium text-gray-700">
                  {t('dialog.interactiveMode', language)}
                </label>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {t('dialog.interactiveHint', language)}
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={dialogSettings.interactive}
                onChange={(e) => handleDialogSettingChange('interactive', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          {/* 角色称呼 */}
          <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <label className="text-sm font-medium text-gray-700">
                  {t('dialog.useNames', language)}
                </label>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {t('dialog.useNamesHint', language)}
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={dialogSettings.useNames}
                onChange={(e) => handleDialogSettingChange('useNames', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

// 角色选择模态框组件
function CharacterSelectorModal({ config, characters, onAssign, onClose }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedIds, setSelectedIds] = useState([]);

  const categories = {
    all: '全部',
    business: '投资商业',
    philosophy: '哲学思想',
    science: '科学技术',
    literature: '文学艺术',
    politics: '政治军事',
    tech: '现代科技',
  };

  const filteredCharacters = selectedCategory === 'all'
    ? characters
    : characters.filter(c => c.category === selectedCategory);

  const toggleSelect = (id) => {
    setSelectedIds(prev =>
      prev.includes(id)
        ? prev.filter(i => i !== id)
        : [...prev, id]
    );
  };

  const selectAll = () => {
    setSelectedIds(filteredCharacters.map(c => c.id));
  };

  const deselectAll = () => {
    setSelectedIds([]);
  };

  const handleAssign = () => {
    onAssign(selectedIds);
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-xl p-6 max-w-4xl w-full border border-white/20 max-h-[80vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-white">
            选择角色配置 "{config?.name}"
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-all"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-400">
              已选择：{selectedIds.length} 个角色
            </span>
            <div className="space-x-1">
              <button
                onClick={selectAll}
                className="px-2 py-1 bg-purple-600 hover:bg-purple-700 text-white text-xs rounded transition-all"
              >
                全选
              </button>
              <button
                onClick={deselectAll}
                className="px-2 py-1 bg-gray-600 hover:bg-gray-700 text-white text-xs rounded transition-all"
              >
                清空
              </button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-1">
            {Object.entries(categories).map(([key, name]) => (
              <button
                key={key}
                onClick={() => setSelectedCategory(key)}
                className={`px-2 py-1 rounded text-xs font-medium transition-all ${
                  selectedCategory === key
                    ? 'bg-purple-600 text-white'
                    : 'bg-black/30 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {name}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 pr-2 mb-4">
          {filteredCharacters.map((character) => (
            <div
              key={character.id}
              onClick={() => toggleSelect(character.id)}
              className={`p-3 rounded-lg border cursor-pointer transition-all ${
                selectedIds.includes(character.id)
                  ? 'bg-purple-600/30 border-purple-500'
                  : 'bg-black/30 border-white/10 hover:border-purple-500/50'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-white text-sm font-medium truncate flex-1">
                  {character.name}
                </h4>
                <div className={`w-5 h-5 rounded border flex items-center justify-center flex-shrink-0 ml-2 ${
                  selectedIds.includes(character.id)
                    ? 'bg-purple-600 border-purple-600'
                    : 'border-gray-500'
                }`}>
                  {selectedIds.includes(character.id) && (
                    <span className="text-white text-xs">✓</span>
                  )}
                </div>
              </div>
              <p className="text-xs text-gray-400 truncate">{character.identity}</p>
              {character.apiConfig && (
                <p className="text-xs text-green-400 mt-1 truncate">
                  已配置：{character.apiConfig.name}
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="flex space-x-3 pt-4 border-t border-white/10">
          <button
            onClick={handleAssign}
            disabled={selectedIds.length === 0}
            className="flex-1 px-4 py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white rounded-lg font-medium transition-all disabled:cursor-not-allowed"
          >
            确认配置 ({selectedIds.length} 个角色)
          </button>
          <button
            onClick={onClose}
            className="px-4 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-all"
          >
            取消
          </button>
        </div>
      </div>
    </div>
  );
}

// 导出提供商和模型数据（供其他组件使用）
export const providers = [
  { id: 'openai', name: 'OpenAI' },
  { id: 'anthropic', name: 'Anthropic (Claude)' },
  { id: 'google', name: 'Google (Gemini)' },
  { id: 'xai', name: 'xAI (Grok)' },
  { id: 'deepseek', name: 'DeepSeek' },
  { id: 'qwen', name: 'Qwen (阿里)' },
  { id: 'moonshot', name: 'Moonshot (Kimi)' },
  { id: 'zhipu', name: 'Zhipu (智谱)' },
  { id: 'baidu', name: 'Baidu (文心)' },
  { id: 'iflytek', name: 'iFlytek (讯飞)' },
  { id: 'minimax', name: 'MiniMax' },
  { id: 'doubao', name: 'Doubao (字节)' },
  { id: 'huggingface', name: 'Hugging Face (免费)' },
  { id: 'ollama', name: 'Ollama (本地免费)' },
  { id: 'groq', name: 'Groq (免费额度)' },
];

export const models = {
  openai: [
    { id: 'gpt-5.4-thinking', name: 'gpt-5.4-thinking' },
    { id: 'gpt-5.4', name: 'gpt-5.4' },
    { id: 'gpt-4.5', name: 'gpt-4.5' },
    { id: 'gpt-4o', name: 'gpt-4o' },
  ],
  anthropic: [
    { id: 'claude-opus-4.6', name: 'claude-opus-4.6' },
    { id: 'claude-opus-4.5', name: 'claude-opus-4.5' },
    { id: 'claude-3-7-sonnet', name: 'claude-3-7-sonnet' },
    { id: 'claude-3-5-sonnet', name: 'claude-3-5-sonnet' },
  ],
  google: [
    { id: 'gemini-3.1-pro', name: 'gemini-3.1-pro' },
    { id: 'gemini-3-pro', name: 'gemini-3-pro' },
    { id: 'gemini-2.0-flash', name: 'gemini-2.0-flash' },
    { id: 'gemini-2.0-flash-lite', name: 'gemini-2.0-flash-lite' },
  ],
  xai: [
    { id: 'grok-4.20-beta', name: 'grok-4.20-beta' },
    { id: 'grok-4.2-ultimate', name: 'grok-4.2-ultimate' },
    { id: 'grok-3', name: 'grok-3' },
    { id: 'grok-2', name: 'grok-2' },
  ],
  deepseek: [
    { id: 'deepseek-v4', name: 'deepseek-v4' },
    { id: 'deepseek-v3.2-thinking', name: 'deepseek-v3.2-thinking' },
    { id: 'deepseek-v3', name: 'deepseek-v3' },
    { id: 'deepseek-r1', name: 'deepseek-r1' },
  ],
  qwen: [
    { id: 'qwen3-max-thinking', name: 'qwen3-max-thinking' },
    { id: 'qwen-3.5', name: 'qwen-3.5' },
    { id: 'qwen3-32b', name: 'qwen3-32b' },
    { id: 'qwen3-14b', name: 'qwen3-14b' },
  ],
  moonshot: [
    { id: 'kimi-k2.5', name: 'kimi-k2.5' },
    { id: 'kimi-k2', name: 'kimi-k2' },
    { id: 'kimi-k1.5', name: 'kimi-k1.5' },
    { id: 'kimi-k1', name: 'kimi-k1' },
  ],
  zhipu: [
    { id: 'glm-5', name: 'glm-5' },
    { id: 'glm-5-turbo', name: 'glm-5-turbo' },
    { id: 'glm-4-plus', name: 'glm-4-plus' },
    { id: 'glm-4', name: 'glm-4' },
  ],
  baidu: [
    { id: 'ernie-4.5', name: 'ernie-4.5' },
    { id: 'ernie-4.0', name: 'ernie-4.0' },
    { id: 'ernie-3.5', name: 'ernie-3.5' },
    { id: 'ernie-speed', name: 'ernie-speed' },
  ],
  iflytek: [
    { id: 'spark-x2', name: 'spark-x2' },
    { id: 'spark-4.0', name: 'spark-4.0' },
    { id: 'spark-3.5', name: 'spark-3.5' },
    { id: 'spark-lite', name: 'spark-lite' },
  ],
  minimax: [
    { id: 'minimax-m2.7', name: 'minimax-m2.7' },
    { id: 'minimax-m2.5', name: 'minimax-m2.5' },
    { id: 'minimax-m2', name: 'minimax-m2' },
    { id: 'minimax-m1', name: 'minimax-m1' },
  ],
  doubao: [
    { id: 'doubao-2.0', name: 'doubao-2.0' },
    { id: 'doubao-1.5-vision-pro', name: 'doubao-1.5-vision-pro' },
    { id: 'doubao-seed-code', name: 'doubao-seed-code' },
    { id: 'doubao-1.0', name: 'doubao-1.0' },
  ],
  huggingface: [
    { id: 'mistralai/Mistral-7B-Instruct-v0.2', name: 'Mistral-7B-Instruct' },
    { id: 'meta-llama/Llama-2-7b-chat-hf', name: 'Llama-2-7B-Chat' },
    { id: 'Qwen/Qwen2.5-7B-Instruct', name: 'Qwen2.5-7B-Instruct' },
    { id: 'google/gemma-2b-it', name: 'Gemma-2B-It' },
  ],
  ollama: [
    { id: 'llama2', name: 'Llama 2' },
    { id: 'qwen2.5', name: 'Qwen 2.5' },
    { id: 'mistral', name: 'Mistral' },
    { id: 'gemma2', name: 'Gemma 2' },
    { id: 'deepseek-coder', name: 'DeepSeek Coder' },
  ],
  groq: [
    { id: 'llama3-70b-8192', name: 'Llama 3 70B' },
    { id: 'llama3-8b-8192', name: 'Llama 3 8B' },
    { id: 'mixtral-8x7b-32768', name: 'Mixtral 8x7B' },
    { id: 'gemma2-9b-it', name: 'Gemma 2 9B' },
  ],
};

export default SettingsPanel;
