/**
 * Edge TTS Service - 微软 Edge 浏览器在线语音合成
 * 支持 100+ 种高质量语音，无需 API Key
 */

// Edge TTS 支持的语音列表
const EDGE_VOICES = {
  'zh-CN': [
    { name: 'zh-CN-XiaoxiaoNeural', label: '晓晓（女声）', gender: 'female', style: '活泼自然' },
    { name: 'zh-CN-XiaoyiNeural', label: '晓伊（女声）', gender: 'female', style: '温柔甜美' },
    { name: 'zh-CN-YunjianNeural', label: '云健（男声）', gender: 'male', style: '成熟稳重' },
    { name: 'zh-CN-YunxiNeural', label: '云希（男声）', gender: 'male', style: '年轻活力' },
    { name: 'zh-CN-YunyangNeural', label: '云扬（男声）', gender: 'male', style: '新闻播报' },
    { name: 'zh-CN-XiaochenNeural', label: '晓辰（女声）', gender: 'female', style: '知性优雅' },
    { name: 'zh-CN-XiaohanNeural', label: '晓涵（女声）', gender: 'female', style: '温暖亲切' },
    { name: 'zh-CN-XiaomengNeural', label: '晓梦（女声）', gender: 'female', style: '梦幻轻柔' },
  ],
  'en-US': [
    { name: 'en-US-AriaNeural', label: 'Aria（女声）', gender: 'female', style: '自然流畅' },
    { name: 'en-US-JennyNeural', label: 'Jenny（女声）', gender: 'female', style: '清晰明亮' },
    { name: 'en-US-GuyNeural', label: 'Guy（男声）', gender: 'male', style: '沉稳专业' },
    { name: 'en-US-DavisNeural', label: 'Davis（男声）', gender: 'male', style: '新闻播报' },
    { name: 'en-US-AmberNeural', label: 'Amber（女声）', gender: 'female', style: '活泼可爱' },
  ],
  'ja-JP': [
    { name: 'ja-JP-NanamiNeural', label: '七海（女声）', gender: 'female', style: '自然温柔' },
    { name: 'ja-JP-KeitaNeural', label: '圭太（男声）', gender: 'male', style: '年轻活力' },
    { name: 'ja-JP-AoiNeural', label: '葵（女声）', gender: 'female', style: '活泼可爱' },
  ],
};

// 所有语音的扁平列表
const ALL_VOICES = Object.entries(EDGE_VOICES).flatMap(([lang, voices]) =>
  voices.map(v => ({ ...v, lang }))
);

class EdgeTTSService {
  constructor() {
    this.currentVoice = 'zh-CN-XiaoxiaoNeural';
    this.rate = 1.0;
    this.pitch = 1.0;
    this.volume = 1.0;
    this.currentLanguage = 'zh-CN';
    this.audio = null;
    this.isPlaying = false;
    this.onStatusChange = null;
  }

  // 获取所有可用语音
  getVoices(language = this.currentLanguage) {
    return EDGE_VOICES[language] || EDGE_VOICES['zh-CN'];
  }

  // 获取所有语音（不分语言）
  getAllVoices() {
    return ALL_VOICES;
  }

  // 设置语音
  setVoice(voiceName) {
    this.currentVoice = voiceName;
    const voice = ALL_VOICES.find(v => v.name === voiceName);
    if (voice) {
      this.currentLanguage = voice.lang;
    }
  }

  // 获取当前语音
  getCurrentVoice() {
    return ALL_VOICES.find(v => v.name === this.currentVoice);
  }

  // 设置语速 (0.5 - 2.0)
  setRate(rate) {
    this.rate = Math.max(0.5, Math.min(2.0, rate));
  }

  // 设置音调 (0.5 - 1.5)
  setPitch(pitch) {
    this.pitch = Math.max(0.5, Math.min(1.5, pitch));
  }

  // 设置音量 (0.1 - 1.0)
  setVolume(volume) {
    this.volume = Math.max(0.1, Math.min(1.0, volume));
  }

  // 生成 SSML
  generateSSML(text, voice, rate, pitch) {
    // 转义 XML 特殊字符
    const escapedText = text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');

    return `<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="${voice.lang}">
      <voice name="${voice.name}">
        <prosody rate="${(rate * 100 - 100).toFixed(0)}%" pitch="${(pitch * 100 - 100).toFixed(0)}%">
          ${escapedText}
        </prosody>
      </voice>
    </speak>`;
  }

  // 播放文本
  async speak(text, options = {}) {
    const voiceName = options.voice || this.currentVoice;
    const rate = options.rate || this.rate;
    const pitch = options.pitch || this.pitch;
    const volume = options.volume || this.volume;

    const voice = ALL_VOICES.find(v => v.name === voiceName) || ALL_VOICES[0];

    try {
      // 停止当前播放
      this.stop();

      this.isPlaying = true;
      if (this.onStatusChange) this.onStatusChange('speaking');

      // 使用 Edge TTS API
      const ssml = this.generateSSML(text, voice, rate, pitch);

      // 调用 Edge TTS 服务
      const response = await fetch('https://speech.platform.bing.com/consumer/speech/synthesize/readaloud/edge/v1', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/ssml+xml',
          'X-Microsoft-OutputFormat': 'audio-24khz-48kbitrate-mono-mp3',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        },
        body: ssml,
      });

      if (!response.ok) {
        throw new Error(`Edge TTS 请求失败: ${response.status}`);
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);

      this.audio = new Audio(audioUrl);
      this.audio.volume = volume;

      this.audio.onended = () => {
        this.isPlaying = false;
        URL.revokeObjectURL(audioUrl);
        if (this.onStatusChange) this.onStatusChange('idle');
      };

      this.audio.onerror = (error) => {
        console.error('Edge TTS 播放错误:', error);
        this.isPlaying = false;
        URL.revokeObjectURL(audioUrl);
        if (this.onStatusChange) this.onStatusChange('error');
      };

      await this.audio.play();
      return true;
    } catch (error) {
      console.error('Edge TTS 错误:', error);
      this.isPlaying = false;
      if (this.onStatusChange) this.onStatusChange('error');
      return false;
    }
  }

  // 停止播放
  stop() {
    if (this.audio) {
      this.audio.pause();
      this.audio.currentTime = 0;
      this.audio = null;
    }
    this.isPlaying = false;
    if (this.onStatusChange) this.onStatusChange('idle');
  }

  // 暂停播放
  pause() {
    if (this.audio) {
      this.audio.pause();
    }
  }

  // 恢复播放
  resume() {
    if (this.audio) {
      this.audio.play();
    }
  }

  // 检查是否正在播放
  isSpeaking() {
    return this.isPlaying;
  }

  // 获取支持的语音性别选项
  getVoiceGenders() {
    return [
      { value: 'female', label: '女声' },
      { value: 'male', label: '男声' },
    ];
  }
}

const edgeTTSService = new EdgeTTSService();

export { edgeTTSService, EDGE_VOICES };
