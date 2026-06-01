import React from 'react';
import { useForumStore } from '../store';
import { t } from '../i18n';
import { currentTheme, darkBase } from '../theme/accent-themes';

function DialogSettings({ onClose }) {
  const { dialogSettings, setDialogSettings, language } = useForumStore();

  const handleChange = (key, value) => {
    setDialogSettings({ [key]: value });
  };

  const accent = currentTheme.accent;
  const accentText = currentTheme.accentText;
  const accentBg = currentTheme.statusActiveBg;
  const accentBorderLight = currentTheme.accentBorder;

  const inputClass = `w-24 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[${accent}] transition-all`;

  return (
    <div
      className="rounded-2xl border border-white/10 shadow-2xl h-full flex flex-col"
      style={{ background: darkBase.bgCard }}
    >
      <div className="p-4 border-b border-white/10 flex items-center justify-between">
        <h2 className="text-sm tracking-[0.2em] font-light text-white">
          {t('dialog.settings', language)}
        </h2>
        <button
          onClick={onClose}
          className="text-white/40 hover:text-white transition-all"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* 每轮最高发言次数 */}
        <div className="space-y-3">
          <label className="text-xs text-white/50 tracking-wide block">
            {t('dialogSettings.maxTurns', language)}
          </label>
          <div className="flex items-center space-x-3">
            <input
              type="number"
              min="1"
              max="10"
              value={dialogSettings.maxTurns}
              onChange={(e) => handleChange('maxTurns', parseInt(e.target.value) || 1)}
              className="w-24 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none transition-all"
              style={{ focusBorderColor: accent }}
            />
            <span className="text-xs text-white/30">{t('dialogSettings.times', language)}</span>
          </div>
          <p className="text-xs text-white/20">
            {t('dialogSettings.maxTurnsDesc', language)}
          </p>
        </div>

        {/* 每轮最低发言次数 */}
        <div className="space-y-3">
          <label className="text-xs text-white/50 tracking-wide block">
            {t('dialogSettings.minTurns', language)}
          </label>
          <div className="flex items-center space-x-3">
            <input
              type="number"
              min="0"
              max="5"
              value={dialogSettings.minTurns}
              onChange={(e) => handleChange('minTurns', parseInt(e.target.value) || 0)}
              className="w-24 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none transition-all"
            />
            <span className="text-xs text-white/30">{t('dialogSettings.times', language)}</span>
          </div>
          <p className="text-xs text-white/20">
            {t('dialogSettings.minTurnsDesc', language)}
          </p>
        </div>

        {/* 发言间隔时间 */}
        <div className="space-y-3">
          <label className="text-xs text-white/50 tracking-wide block">
            {t('dialogSettings.interval', language)}
          </label>
          <div className="flex items-center space-x-3">
            <input
              type="number"
              min="0"
              max="10"
              value={dialogSettings.delay}
              onChange={(e) => handleChange('delay', parseInt(e.target.value) || 0)}
              className="w-24 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none transition-all"
            />
            <span className="text-xs text-white/30">{t('dialogSettings.seconds', language)}</span>
          </div>
          <p className="text-xs text-white/20">
            {t('dialogSettings.intervalDesc', language)}
          </p>
        </div>

        <div className="border-t border-white/10 pt-6 space-y-4">
          {/* 互动模式 */}
          <div
            className="flex items-center justify-between p-4 rounded-xl border border-white/10 transition-all hover:border-white/20"
            style={{ background: accentBg }}
          >
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: accent }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                </svg>
                <label className="text-xs text-white/70 tracking-wide">
                  {t('dialogSettings.interactiveMode', language)}
                </label>
              </div>
              <p className="text-xs text-white/30 mt-1">
                {t('dialogSettings.interactiveModeDesc', language)}
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={dialogSettings.interactive}
                onChange={(e) => handleChange('interactive', e.target.checked)}
                className="sr-only peer"
              />
              <div
                className="w-10 h-5 bg-white/10 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white/50 after:border-white/20 after:border after:rounded-full after:h-4 after:w-4 after:transition-all"
                style={{ peerCheckedBackground: accent }}
              ></div>
            </label>
          </div>

          {/* 角色称呼 */}
          <div
            className="flex items-center justify-between p-4 rounded-xl border border-white/10 transition-all hover:border-white/20"
            style={{ background: accentBg }}
          >
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: accent }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <label className="text-xs text-white/70 tracking-wide">
                  {t('dialogSettings.useNames', language)}
                </label>
              </div>
              <p className="text-xs text-white/30 mt-1">
                {t('dialogSettings.useNamesDesc', language)}
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={dialogSettings.useNames}
                onChange={(e) => handleChange('useNames', e.target.checked)}
                className="sr-only peer"
              />
              <div
                className="w-10 h-5 bg-white/10 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white/50 after:border-white/20 after:border after:rounded-full after:h-4 after:w-4 after:transition-all"
                style={{ backgroundColor: dialogSettings.useNames ? accent : undefined }}
              ></div>
            </label>
          </div>
        </div>

        {/* 重置按钮 */}
        <div className="pt-4 border-t border-white/10">
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
            className="w-full py-2.5 bg-white/5 hover:bg-white/10 text-white/50 hover:text-white text-xs tracking-wide rounded-xl transition-all"
          >
            {t('dialogSettings.reset', language)}
          </button>
        </div>

        {/* 使用说明 */}
        <div
          className="rounded-xl p-4 border border-white/10"
          style={{ background: 'rgba(255, 255, 255, 0.02)' }}
        >
          <h3 className="text-xs tracking-wide text-white/50 mb-2 flex items-center">
            <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: accent }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {t('dialogSettings.usageTips', language)}
          </h3>
          <ul className="text-xs text-white/30 space-y-1">
            <li>• {t('dialogSettings.tip1', language)}</li>
            <li>• {t('dialogSettings.tip2', language)}</li>
            <li>• {t('dialogSettings.tip3', language)}</li>
            <li>• {t('dialogSettings.tip4', language)}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default DialogSettings;
