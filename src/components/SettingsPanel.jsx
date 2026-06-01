import React, { useState, useEffect, useRef } from 'react';
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
    dialogSettings,
    setDialogSettings,
    language,
  } = useForumStore();

  const [showAddConfigModal, setShowAddConfigModal] = useState(false);
  const [editingConfig, setEditingConfig] = useState(null);
  const [showCharacterSelector, setShowCharacterSelector] = useState(false);
  const [selectedConfigForAssign, setSelectedConfigForAssign] = useState(null);
  const [animatingCards, setAnimatingCards] = useState(new Set());
  const [saveStatus, setSaveStatus] = useState(null);
  const prevConfigsLengthRef = useRef(0);

  const [configFormData, setConfigFormData] = useState({
    name: '',
    provider: 'openai',
    apiKey: '',
    model: 'gpt-5.4-thinking',
    temperature: 0.7,
  });

  useEffect(() => {
    if (apiConfigs.length > prevConfigsLengthRef.current) {
      const newConfig = apiConfigs[apiConfigs.length - 1];
      setAnimatingCards(prev => new Set([...prev, newConfig.id]));
      setTimeout(() => {
        setAnimatingCards(prev => {
          const next = new Set(prev);
          next.delete(newConfig.id);
          return next;
        });
      }, 500);
    }
    prevConfigsLengthRef.current = apiConfigs.length;
  }, [apiConfigs]);

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

    setSaveStatus('saving');

    setTimeout(() => {
      if (editingConfig) {
        updateAPIConfig(editingConfig.id, config);
        setSaveStatus('success');
        setTimeout(() => {
          alert(t('settings.configUpdated', language));
          setSaveStatus(null);
        }, 300);
      } else {
        addAPIConfig(config);
        setSaveStatus('success');
        setTimeout(() => {
          alert(t('settings.configAdded', language));
          setSaveStatus(null);
        }, 300);
      }

      setShowAddConfigModal(false);
      setEditingConfig(null);
    }, 500);
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

  const inputClass = "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-white/20 transition-colors";
  const selectClass = "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white/20 transition-colors cursor-pointer";
  const cardClass = "bg-white/[0.03] border border-white/10 rounded-2xl p-5 hover:border-white/20 transition-all";
  const btnPrimaryClass = "px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs rounded-xl transition-all tracking-wide";
  const btnDangerClass = "px-5 py-2.5 bg-red-500/20 hover:bg-red-500/30 text-red-300 text-xs rounded-xl transition-all tracking-wide";

  return (
    <div className="max-w-4xl mx-auto pb-32">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-sm tracking-[0.2em] font-light text-white">SETTINGS</h2>
        <button
          onClick={handleOpenAddConfig}
          className={btnPrimaryClass}
        >
          {t('topic.new', language)}
        </button>
      </div>

      {apiConfigs.length === 0 ? (
        <div className="text-center py-12 border border-white/10 rounded-2xl bg-white/[0.02]">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/5 flex items-center justify-center">
            <svg className="w-8 h-8 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <p className="text-white/40 text-sm mb-2">{t('settings.noConfigs', language)}</p>
          <p className="text-white/20 text-xs">{t('settings.oneClickConfig', language)}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {apiConfigs.map((config, index) => {
            const assignedCount = getAssignedCharactersCount(config.id);
            const isNew = animatingCards.has(config.id);
            return (
              <div
                key={config.id}
                className={`${cardClass} ${isNew ? 'opacity-0 animate-fade-in' : ''}`}
                style={{ animationDelay: isNew ? `${index * 0.05}s` : '0s' }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-sm font-light text-white flex items-center tracking-wide">
                      {config.name}
                      <span className="ml-3 px-3 py-1 bg-white/5 text-white/50 text-xs rounded-full border border-white/10">
                        {config.provider}
                      </span>
                    </h3>
                    <p className="text-xs text-white/30 mt-2">
                      {t('settings.configModel', language)}: <span className="text-white/50">{config.model}</span>
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-white/30 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                      {t('settings.assignedCount', language)}: <span className="text-white/50">{assignedCount}</span> {t('settings.characters', language)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => handleOpenAssign(config)}
                    className={btnPrimaryClass}
                  >
                    {t('settings.batchAssign', language)}
                  </button>
                  <button
                    onClick={() => handleOpenEditConfig(config)}
                    className="px-5 py-2.5 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white text-xs rounded-xl transition-all tracking-wide"
                  >
                    {t('action.edit', language)}
                  </button>
                  <button
                    onClick={() => handleDeleteConfig(config)}
                    className={btnDangerClass}
                  >
                    {t('action.delete', language)}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {showAddConfigModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-black border border-white/10 rounded-2xl p-6 max-w-md w-full shadow-2xl">
            <h3 className="text-sm tracking-[0.2em] font-light text-white mb-6">
              {editingConfig ? t('action.edit', language) : t('topic.new', language)} API CONFIG
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-xs text-white/50 mb-2 tracking-wide">
                  {t('settings.configName', language)}
                </label>
                <input
                  type="text"
                  value={configFormData.name}
                  onChange={(e) => setConfigFormData({ ...configFormData, name: e.target.value })}
                  placeholder={t('settings.placeholder.name', language)}
                  className={inputClass}
                />
              </div>

              <div>
                <label className="block text-xs text-white/50 mb-2 tracking-wide">
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
                  className={selectClass}
                >
                  {providers.map((p) => (
                    <option key={p.id} value={p.id} className="bg-black text-white">{p.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs text-white/50 mb-2 tracking-wide">
                  {t('settings.apiKey', language)}
                </label>
                <input
                  type="password"
                  value={configFormData.apiKey}
                  onChange={(e) => setConfigFormData({ ...configFormData, apiKey: e.target.value })}
                  placeholder={t('settings.placeholder.apiKey', language)}
                  className={inputClass}
                />
              </div>

              <div>
                <label className="block text-xs text-white/50 mb-2 tracking-wide">
                  {t('settings.model', language)}
                </label>
                <select
                  value={configFormData.model}
                  onChange={(e) => setConfigFormData({ ...configFormData, model: e.target.value })}
                  className={selectClass}
                >
                  {models[configFormData.provider]?.map((m) => (
                    <option key={m.id} value={m.id} className="bg-black text-white">{m.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs text-white/50 mb-2 tracking-wide">
                  {t('settings.temperature', language)}: <span className="text-white/70">{configFormData.temperature}</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="2"
                  step="0.1"
                  value={configFormData.temperature}
                  onChange={(e) => setConfigFormData({ ...configFormData, temperature: parseFloat(e.target.value) })}
                  className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-white/50"
                />
                <p className="text-xs text-white/20 mt-1">
                  {t('settings.temperatureHint', language) || '越低越确定（0），越高越随机（2）'}
                </p>
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  onClick={handleSaveConfig}
                  disabled={!configFormData.name.trim() || !configFormData.apiKey.trim() || saveStatus === 'saving'}
                  className={`flex-1 px-4 py-3 text-white rounded-xl text-xs tracking-wide transition-all disabled:cursor-not-allowed flex items-center justify-center gap-2 ${
                    saveStatus === 'success'
                      ? 'bg-emerald-500/20 text-emerald-300'
                      : saveStatus === 'saving'
                      ? 'bg-white/5 text-white/30'
                      : 'bg-white/10 hover:bg-white/20'
                  }`}
                >
                  {saveStatus === 'saving' ? (
                    <>
                      <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      <span>保存中...</span>
                    </>
                  ) : saveStatus === 'success' ? (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>已保存</span>
                    </>
                  ) : (
                    t('action.save', language)
                  )}
                </button>
                <button
                  onClick={() => {
                    setShowAddConfigModal(false);
                    setEditingConfig(null);
                  }}
                  className="px-4 py-3 text-white/30 hover:text-white/60 text-xs rounded-xl transition-all tracking-wide"
                >
                  {t('action.cancel', language)}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showCharacterSelector && (
        <CharacterSelectorModal
          config={selectedConfigForAssign}
          characters={characters}
          onAssign={handleAssignToCharacters}
          onClose={handleCloseCharacterSelector}
        />
      )}

      <div className="mt-8 pt-6 border-t border-white/10">
        <h2 className="text-sm tracking-[0.2em] font-light text-white mb-6">DIALOG SETTINGS</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className={cardClass}>
            <label className="text-xs text-white/50 block mb-3 tracking-wide">
              {t('dialog.turnsLabel', language)}
            </label>
            <select
              value={dialogSettings.maxTurns}
              onChange={(e) => handleDialogSettingChange('maxTurns', parseInt(e.target.value))}
              className={selectClass}
            >
              {[1,2,3,4,5,6,7,8,9,10].map(num => (
                <option key={num} value={num} className="bg-black text-white">{num} {t('dialog.turns', language)}</option>
              ))}
            </select>
            <p className="text-xs text-white/20 mt-3">
              {t('dialog.turnsHint', language)}
            </p>
          </div>

          <div className={cardClass}>
            <label className="text-xs text-white/50 block mb-3 tracking-wide">
              {t('dialog.minTurns', language)}
            </label>
            <select
              value={dialogSettings.minTurns}
              onChange={(e) => handleDialogSettingChange('minTurns', parseInt(e.target.value))}
              className={selectClass}
            >
              <option value={0} className="bg-black text-white">0 {t('dialog.minTurnsOptional', language)}</option>
              {[1,2,3,4,5].map(num => (
                <option key={num} value={num} className="bg-black text-white">{num} {t('dialog.minTurnsOptional', language).split('（')[0]}</option>
              ))}
            </select>
            <p className="text-xs text-white/20 mt-3">
              {t('dialog.minTurnsHint', language)}
            </p>
          </div>

          <div className={cardClass}>
            <label className="text-xs text-white/50 block mb-3 tracking-wide">
              {t('dialog.interval', language)}
            </label>
            <select
              value={dialogSettings.delay}
              onChange={(e) => handleDialogSettingChange('delay', parseInt(e.target.value))}
              className={selectClass}
            >
              <option value={0} className="bg-black text-white">0 {t('dialog.intervalImmediate', language)}</option>
              {[1,2,3,4,5,6,7,8,9,10].map(num => (
                <option key={num} value={num} className="bg-black text-white">{num} {t('dialog.interval', language).split('时间')[0]}</option>
              ))}
            </select>
            <p className="text-xs text-white/20 mt-3">
              {t('dialog.intervalHint', language)}
            </p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className={`${cardClass} flex items-center justify-between`}>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <svg className="w-4 h-4 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                </svg>
                <label className="text-xs text-white/50 tracking-wide">
                  {t('dialog.interactiveMode', language)}
                </label>
              </div>
              <p className="text-xs text-white/20 mt-1">
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
              <div className="w-10 h-5 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white/50 after:border-white/20 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-white/30"></div>
            </label>
          </div>

          <div className={`${cardClass} flex items-center justify-between`}>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <svg className="w-4 h-4 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <label className="text-xs text-white/50 tracking-wide">
                  {t('dialog.useNames', language)}
                </label>
              </div>
              <p className="text-xs text-white/20 mt-1">
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
              <div className="w-10 h-5 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white/50 after:border-white/20 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-white/30"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

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
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-black border border-white/10 rounded-2xl p-6 max-w-4xl w-full max-h-[80vh] overflow-hidden flex flex-col shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm tracking-[0.2em] font-light text-white">
            选择角色配置 "<span className="text-white/70">{config?.name}</span>"
          </h3>
          <button
            onClick={onClose}
            className="text-white/30 hover:text-white/60 transition-all p-2 rounded-xl hover:bg-white/5"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-white/30">
              已选择：<span className="text-white/50 font-medium">{selectedIds.length}</span> 个角色
            </span>
            <div className="space-x-2">
              <button
                onClick={selectAll}
                className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white text-xs rounded-xl transition-all tracking-wide"
              >
                全选
              </button>
              <button
                onClick={deselectAll}
                className="px-3 py-1.5 bg-white/5 hover:bg-white/10 text-white/50 text-xs rounded-xl transition-all tracking-wide"
              >
                清空
              </button>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-2">
            {Object.entries(categories).map(([key, name]) => (
              <button
                key={key}
                onClick={() => setSelectedCategory(key)}
                className={`px-3 py-2 rounded-xl text-xs tracking-wide transition-all ${
                  selectedCategory === key
                    ? 'bg-white/20 text-white'
                    : 'bg-white/5 text-white/40 hover:bg-white/10'
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
              className={`p-4 rounded-xl border cursor-pointer transition-all ${
                selectedIds.includes(character.id)
                  ? 'bg-white/10 border-white/30'
                  : 'bg-white/[0.02] border-white/10 hover:border-white/20'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-white/70 text-sm font-light truncate flex-1 tracking-wide">
                  {character.name}
                </h4>
                <div className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 ml-2 transition-all ${
                  selectedIds.includes(character.id)
                    ? 'bg-white/30 border-white/30'
                    : 'border-white/20'
                }`}>
                  {selectedIds.includes(character.id) && (
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
              </div>
              <p className="text-xs text-white/30 truncate">{character.identity}</p>
              {character.apiConfig && (
                <p className="text-xs text-emerald-400/60 mt-2 truncate">
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
            className="flex-1 px-4 py-3 bg-white/10 hover:bg-white/20 disabled:bg-white/5 disabled:text-white/20 text-white rounded-xl text-xs tracking-wide transition-all disabled:cursor-not-allowed"
          >
            确认配置 ({selectedIds.length} 个角色)
          </button>
          <button
            onClick={onClose}
            className="px-4 py-3 text-white/30 hover:text-white/60 rounded-xl text-xs tracking-wide transition-all"
          >
            取消
          </button>
        </div>
      </div>
    </div>
  );
}

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
