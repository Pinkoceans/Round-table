const VoiceStatus = {
  IDLE: 'idle',
  RECORDING: 'recording',
  PROCESSING: 'processing',
  SPEAKING: 'speaking'
};

const LanguageMap = {
  zh: 'zh-CN',
  en: 'en-US',
  ja: 'ja-JP'
};

// 语音配置
const VoiceConfig = {
  // 中文语音
  'zh-CN': {
    male: [
      { name: 'zh-CN-Yunxi', label: '云希（男声）' },
      { name: 'zh-CN-Yunjian', label: '云健（男声）' },
      { name: 'zh-CN-Yunyang', label: '云扬（男声）' }
    ],
    female: [
      { name: 'zh-CN-Xiaoxiao', label: '晓晓（女声）' },
      { name: 'zh-CN-Xiaoyi', label: '晓伊（女声）' },
      { name: 'zh-CN-Xiaochen', label: '晓辰（女声）' }
    ]
  },
  // 英文语音
  'en-US': {
    male: [
      { name: 'en-US-Guy', label: 'Guy（Male）' },
      { name: 'en-US-Tony', label: 'Tony（Male）' }
    ],
    female: [
      { name: 'en-US-Jenny', label: 'Jenny（Female）' },
      { name: 'en-US-Aria', label: 'Aria（Female）' }
    ]
  },
  // 日文语音
  'ja-JP': {
    male: [
      { name: 'ja-JP-Keita', label: '圭太（男性）' }
    ],
    female: [
      { name: 'ja-JP-Nanami', label: '七海（女性）' },
      { name: 'ja-JP-Aoi', label: '葵（女性）' }
    ]
  }
};

class VoiceService {
  constructor() {
    this.recognition = null;
    this.status = VoiceStatus.IDLE;
    this.isSupported = false;
    this.currentLanguage = 'zh-CN';
    this.onStatusChange = null;
    this.onResult = null;
    this.onError = null;
    this.interimTranscript = '';
    
    // TTS 相关
    this.synthesis = null;
    this.isTTSSupported = false;
    this.currentVoice = null;
    this.voiceGender = 'female'; // 'male' | 'female'
    this.speakingCallbacks = new Map(); // messageId -> callback
    
    // 音频分析相关
    this.audioContext = null;
    this.analyser = null;
    this.audioSource = null;
    this.frequencyData = null;
    this.volumeCallback = null;
    this.animationFrameId = null;
    this.isAnalyzing = false;
    
    this.init();
  }

  init() {
    if (typeof window !== 'undefined') {
      // 初始化语音识别
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      
      if (SpeechRecognition) {
        this.recognition = new SpeechRecognition();
        this.isSupported = true;
        this.setupRecognition();
      } else {
        this.isSupported = false;
        console.warn('浏览器不支持语音识别');
      }
      
      // 初始化语音合成
      this.synthesis = window.speechSynthesis;
      this.isTTSSupported = !!this.synthesis;
      
      if (this.isTTSSupported) {
        // 等待语音列表加载
        if (this.synthesis.getVoices().length === 0) {
          this.synthesis.onvoiceschanged = () => {
            this.loadVoices();
          };
        } else {
          this.loadVoices();
        }
      }
    }
  }

  loadVoices() {
    if (!this.synthesis) return;
    
    const voices = this.synthesis.getVoices();
    // 设置默认语音
    this.setDefaultVoice();
  }

  setDefaultVoice() {
    const voices = this.getVoicesByLanguage(this.currentLanguage);
    if (voices.length > 0) {
      // 优先选择女性语音
      const femaleVoices = voices.filter(v => v.gender === 'female');
      this.currentVoice = femaleVoices.length > 0 ? femaleVoices[0] : voices[0];
    }
  }

  setupRecognition() {
    if (!this.recognition) return;

    this.recognition.continuous = true;
    this.recognition.interimResults = true;
    this.recognition.lang = this.currentLanguage;
    this.recognition.maxAlternatives = 1;

    this.recognition.onstart = () => {
      this.setStatus(VoiceStatus.RECORDING);
      this.interimTranscript = '';
    };

    this.recognition.onresult = (event) => {
      let finalTranscript = '';
      let interimTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript;
        } else {
          interimTranscript += transcript;
        }
      }

      this.interimTranscript = interimTranscript;

      if (finalTranscript && this.onResult) {
        this.onResult(finalTranscript);
      }
    };

    this.recognition.onerror = (event) => {
      console.error('语音识别错误:', event.error);
      this.setStatus(VoiceStatus.IDLE);
      
      if (this.onError) {
        let errorMessage = '语音识别出错';
        switch (event.error) {
          case 'no-speech':
            errorMessage = '未检测到语音输入';
            break;
          case 'audio-capture':
            errorMessage = '未找到麦克风设备';
            break;
          case 'not-allowed':
            errorMessage = '麦克风权限被拒绝';
            break;
          case 'network':
            errorMessage = '网络错误，请检查连接';
            break;
          case 'aborted':
            errorMessage = '语音识别被中止';
            break;
          default:
            errorMessage = `语音识别错误: ${event.error}`;
        }
        this.onError(errorMessage);
      }
    };

    this.recognition.onend = () => {
      if (this.status === VoiceStatus.RECORDING) {
        this.setStatus(VoiceStatus.IDLE);
      }
    };
  }

  setStatus(status) {
    this.status = status;
    if (this.onStatusChange) {
      this.onStatusChange(status);
    }
  }

  setLanguage(languageCode) {
    const mappedLanguage = LanguageMap[languageCode] || 'zh-CN';
    this.currentLanguage = mappedLanguage;
    if (this.recognition) {
      this.recognition.lang = mappedLanguage;
    }
    // 更新TTS语音
    this.setDefaultVoice();
  }

  // ========== TTS 方法 ==========
  
  // 获取指定语言的所有语音
  getVoicesByLanguage(lang = this.currentLanguage) {
    if (!this.synthesis) return [];
    
    const voices = this.synthesis.getVoices();
    const langPrefix = lang.split('-')[0];
    
    return voices
      .filter(voice => voice.lang.startsWith(langPrefix))
      .map(voice => ({
        name: voice.name,
        voice: voice,
        lang: voice.lang,
        gender: this.inferGender(voice.name),
        label: voice.name
      }));
  }

  // 推断语音性别
  inferGender(voiceName) {
    const lowerName = voiceName.toLowerCase();
    // 常见的男性语音标识
    const maleIndicators = ['male', 'man', 'boy', 'guy', 'yun', '云'];
    // 常见的女性语音标识
    const femaleIndicators = ['female', 'woman', 'girl', 'xia', '晓'];
    
    for (const indicator of maleIndicators) {
      if (lowerName.includes(indicator)) return 'male';
    }
    for (const indicator of femaleIndicators) {
      if (lowerName.includes(indicator)) return 'female';
    }
    
    return 'female'; // 默认女性
  }

  // 获取可用的语音性别选项
  getVoiceGenders() {
    return [
      { value: 'female', label: '女声' },
      { value: 'male', label: '男声' }
    ];
  }

  // 设置语音性别
  setVoiceGender(gender) {
    this.voiceGender = gender;
    const voices = this.getVoicesByLanguage(this.currentLanguage);
    const genderVoices = voices.filter(v => v.gender === gender);
    if (genderVoices.length > 0) {
      this.currentVoice = genderVoices[0];
    }
  }

  // 获取当前可用的语音列表
  getAvailableVoices() {
    return this.getVoicesByLanguage(this.currentLanguage);
  }

  // 设置特定语音
  setVoice(voiceName) {
    const voices = this.getVoicesByLanguage(this.currentLanguage);
    const selectedVoice = voices.find(v => v.name === voiceName);
    if (selectedVoice) {
      this.currentVoice = selectedVoice;
      this.voiceGender = selectedVoice.gender;
    }
  }

  // 获取当前语音
  getCurrentVoice() {
    return this.currentVoice;
  }

  // 获取当前性别
  getCurrentGender() {
    return this.voiceGender;
  }

  // 设置语速
  setRate(rate) {
    this.rate = Math.max(0.5, Math.min(2.0, rate));
  }

  // 设置音调
  setPitch(pitch) {
    this.pitch = Math.max(0.5, Math.min(1.5, pitch));
  }

  // 设置音量
  setVolume(volume) {
    this.volume = Math.max(0.1, Math.min(1.0, volume));
  }

  // 播放文本语音
  speak(text, options = {}) {
    if (!this.isTTSSupported || !this.synthesis) {
      console.warn('浏览器不支持语音合成');
      return false;
    }

    // 停止当前播放
    this.stopSpeaking();

    const utterance = new SpeechSynthesisUtterance(text);
    
    // 设置语音
    if (options.voice && options.voice.voice) {
      utterance.voice = options.voice.voice;
    } else if (this.currentVoice && this.currentVoice.voice) {
      utterance.voice = this.currentVoice.voice;
    }
    
    // 设置语言
    utterance.lang = options.lang || this.currentLanguage;
    
    // 设置语速 (0.5 - 2.0)
    utterance.rate = options.rate || this.rate || 1;
    
    // 设置音调 (0.5 - 1.5)
    utterance.pitch = options.pitch || this.pitch || 1;
    
    // 设置音量 (0.1 - 1.0)
    utterance.volume = options.volume || this.volume || 1;

    // 事件回调
    const messageId = options.messageId;
    
    utterance.onstart = () => {
      this.setStatus(VoiceStatus.SPEAKING);
      // 启动音频分析
      this.startAudioAnalysis();
      if (messageId && this.speakingCallbacks.has(messageId)) {
        this.speakingCallbacks.get(messageId)('start');
      }
    };

    utterance.onend = () => {
      this.setStatus(VoiceStatus.IDLE);
      // 停止音频分析
      this.stopAudioAnalysis();
      if (messageId && this.speakingCallbacks.has(messageId)) {
        this.speakingCallbacks.get(messageId)('end');
      }
    };

    utterance.onerror = (event) => {
      console.error('语音合成错误:', event.error);
      this.setStatus(VoiceStatus.IDLE);
      // 停止音频分析
      this.stopAudioAnalysis();
      if (messageId && this.speakingCallbacks.has(messageId)) {
        this.speakingCallbacks.get(messageId)('error');
      }
    };

    this.synthesis.speak(utterance);
    return true;
  }

  // 停止播放
  stopSpeaking() {
    if (this.synthesis) {
      this.synthesis.cancel();
      this.setStatus(VoiceStatus.IDLE);
    }
  }

  // 暂停播放
  pauseSpeaking() {
    if (this.synthesis) {
      this.synthesis.pause();
    }
  }

  // 恢复播放
  resumeSpeaking() {
    if (this.synthesis) {
      this.synthesis.resume();
    }
  }

  // 检查是否在播放
  isSpeaking() {
    return this.synthesis ? this.synthesis.speaking : false;
  }

  // 注册播放状态回调
  onSpeakingStatus(messageId, callback) {
    this.speakingCallbacks.set(messageId, callback);
  }

  // 移除播放状态回调
  offSpeakingStatus(messageId) {
    this.speakingCallbacks.delete(messageId);
  }

  // ========== 音频分析方法 ==========

  // 初始化音频分析器（用于获取语音波形数据）
  initAudioAnalyser() {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (!this.analyser) {
      this.analyser = this.audioContext.createAnalyser();
      this.analyser.fftSize = 256;
      this.analyser.smoothingTimeConstant = 0.8;
      this.frequencyData = new Uint8Array(this.analyser.frequencyBinCount);
    }
  }

  // 开始音频分析
  startAudioAnalysis() {
    if (this.isAnalyzing) return;
    this.initAudioAnalyser();
    this.isAnalyzing = true;
    this.analyzeAudio();
  }

  // 停止音频分析
  stopAudioAnalysis() {
    this.isAnalyzing = false;
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

  // 音频分析循环
  analyzeAudio() {
    if (!this.isAnalyzing || !this.analyser) return;

    this.analyser.getByteFrequencyData(this.frequencyData);

    // 计算平均音量 (0-1)
    let sum = 0;
    for (let i = 0; i < this.frequencyData.length; i++) {
      sum += this.frequencyData[i];
    }
    const average = sum / this.frequencyData.length;
    const normalizedVolume = average / 255;

    // 获取低频、中频、高频的能量
    const bass = this.getFrequencyRange(0, 10) / 255;
    const mid = this.getFrequencyRange(10, 50) / 255;
    const treble = this.getFrequencyRange(50, this.frequencyData.length) / 255;

    if (this.volumeCallback) {
      this.volumeCallback({
        volume: normalizedVolume,
        bass,
        mid,
        treble,
        frequencyData: this.frequencyData,
        isSpeaking: this.isSpeaking()
      });
    }

    this.animationFrameId = requestAnimationFrame(() => this.analyzeAudio());
  }

  // 获取频率范围内的平均能量
  getFrequencyRange(start, end) {
    let sum = 0;
    const count = Math.min(end, this.frequencyData.length) - start;
    for (let i = start; i < Math.min(end, this.frequencyData.length); i++) {
      sum += this.frequencyData[i];
    }
    return count > 0 ? sum / count : 0;
  }

  // 注册音量回调
  onVolumeChange(callback) {
    this.volumeCallback = callback;
  }

  // 移除音量回调
  offVolumeChange() {
    this.volumeCallback = null;
  }

  // 获取当前音量数据（同步方法）
  getCurrentVolume() {
    if (!this.analyser || !this.frequencyData) return 0;
    this.analyser.getByteFrequencyData(this.frequencyData);
    let sum = 0;
    for (let i = 0; i < this.frequencyData.length; i++) {
      sum += this.frequencyData[i];
    }
    return (sum / this.frequencyData.length) / 255;
  }

  // ========== 语音识别方法 ==========

  start(options = {}) {
    if (!this.isSupported) {
      const error = '您的浏览器不支持语音识别，请使用 Chrome 或 Edge 浏览器';
      if (this.onError) {
        this.onError(error);
      }
      return false;
    }

    if (this.status === VoiceStatus.RECORDING) {
      return false;
    }

    if (options.language) {
      this.setLanguage(options.language);
    }

    if (options.onStatusChange) {
      this.onStatusChange = options.onStatusChange;
    }

    if (options.onResult) {
      this.onResult = options.onResult;
    }

    if (options.onError) {
      this.onError = options.onError;
    }

    try {
      this.recognition.start();
      return true;
    } catch (error) {
      console.error('启动语音识别失败:', error);
      this.setStatus(VoiceStatus.IDLE);
      if (this.onError) {
        this.onError('启动语音识别失败，请重试');
      }
      return false;
    }
  }

  stop() {
    if (this.recognition && this.status === VoiceStatus.RECORDING) {
      try {
        this.recognition.stop();
        this.setStatus(VoiceStatus.IDLE);
      } catch (error) {
        console.error('停止语音识别失败:', error);
      }
    }
  }

  abort() {
    if (this.recognition) {
      try {
        this.recognition.abort();
        this.setStatus(VoiceStatus.IDLE);
      } catch (error) {
        console.error('中止语音识别失败:', error);
      }
    }
  }

  getStatus() {
    return this.status;
  }

  getInterimTranscript() {
    return this.interimTranscript;
  }

  checkSupport() {
    return this.isSupported;
  }

  checkTTSSupport() {
    return this.isTTSSupported;
  }

  getSupportedLanguages() {
    return [
      { code: 'zh', name: '中文', recognitionCode: 'zh-CN' },
      { code: 'en', name: 'English', recognitionCode: 'en-US' },
      { code: 'ja', name: '日本語', recognitionCode: 'ja-JP' }
    ];
  }

  destroy() {
    this.stop();
    this.stopSpeaking();
    this.stopAudioAnalysis();
    this.recognition = null;
    this.synthesis = null;
    this.onStatusChange = null;
    this.onResult = null;
    this.onError = null;
    this.speakingCallbacks.clear();
    this.volumeCallback = null;
    if (this.audioContext) {
      this.audioContext.close();
      this.audioContext = null;
    }
  }
}

const voiceService = new VoiceService();

export { voiceService, VoiceStatus };
