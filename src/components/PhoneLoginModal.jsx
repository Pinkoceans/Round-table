import React, { useState } from 'react';

const PhoneLoginModal = ({ onClose, onLogin }) => {
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [step, setStep] = useState('phone'); // 'phone' or 'code'
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);

  // 格式化手机号
  const formatPhone = (value) => {
    const v = value.replace(/\D/g, '').slice(0, 11);
    return v;
  };

  // 格式化验证码
  const formatCode = (value) => {
    const v = value.replace(/\D/g, '').slice(0, 6);
    return v;
  };

  // 发送验证码
  const sendCode = async () => {
    if (phone.length !== 11) {
      alert('请输入正确的手机号');
      return;
    }

    setLoading(true);
    try {
      // TODO: 调用短信发送 API
      console.log('发送验证码到:', phone);
      alert('验证码已发送（测试环境：123456）');
      setStep('code');
      
      // 倒计时
      setCountdown(60);
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (error) {
      alert('发送失败，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  // 验证并登录
  const verifyCode = async () => {
    if (code.length !== 6) {
      alert('请输入 6 位验证码');
      return;
    }

    setLoading(true);
    try {
      // TODO: 调用验证 API
      console.log('验证:', phone, code);
      
      // 测试：接受任何 6 位验证码
      if (code === '123456') {
        onLogin({
          email: `${phone}@phone.user`,
          user_metadata: {
            phone: phone,
            avatar_url: `https://ui-avatars.com/api/?name=${phone.slice(-4)}&background=random`
          },
          jwt: async () => 'mock-jwt-token'
        });
      } else {
        alert('验证码错误（测试验证码：123456）');
      }
    } catch (error) {
      alert('验证失败，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 transform transition-all">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-gray-800">
            {step === 'phone' ? '手机号登录' : '输入验证码'}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {step === 'phone' ? (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                中国大陆手机号
              </label>
              <div className="flex space-x-3">
                <div className="flex-1">
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(formatPhone(e.target.value))}
                    placeholder="请输入手机号"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    maxLength={11}
                  />
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                未注册的手机号登录后将自动创建账户
              </p>
            </div>

            <button
              onClick={sendCode}
              disabled={loading || phone.length !== 11}
              className={`w-full py-3 rounded-xl text-white font-medium transition-all ${
                loading || phone.length !== 11
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-blue-500 hover:bg-blue-600'
              }`}
            >
              {loading ? '发送中...' : '获取验证码'}
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="text-center mb-4">
              <p className="text-gray-600">
                验证码已发送至 <span className="font-medium">{phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')}</span>
              </p>
              <button
                onClick={() => setStep('phone')}
                className="text-sm text-blue-500 hover:text-blue-600 mt-1"
              >
                修改手机号
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                验证码
              </label>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(formatCode(e.target.value))}
                placeholder="请输入 6 位验证码"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-center text-2xl tracking-widest"
                maxLength={6}
              />
              {countdown > 0 ? (
                <p className="text-sm text-gray-500 text-center mt-2">
                  {countdown}秒后重发
                </p>
              ) : (
                <button
                  onClick={sendCode}
                  className="text-sm text-blue-500 hover:text-blue-600 mt-2"
                >
                  重新发送
                </button>
              )}
            </div>

            <button
              onClick={verifyCode}
              disabled={loading || code.length !== 6}
              className={`w-full py-3 rounded-xl text-white font-medium transition-all ${
                loading || code.length !== 6
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-blue-500 hover:bg-blue-600'
              }`}
            >
              {loading ? '验证中...' : '登录'}
            </button>
          </div>
        )}

        <p className="text-xs text-gray-400 text-center mt-6">
          登录即表示您同意我们的服务条款和隐私政策
        </p>
      </div>
    </div>
  );
};

export default PhoneLoginModal;
