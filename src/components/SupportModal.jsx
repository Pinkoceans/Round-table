import React, { useState } from 'react';
import { APP_CONFIG } from '../config';

function SupportModal({ onClose }) {
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState('');
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [showQRCode, setShowQRCode] = useState(false);

  const amounts = [
    { value: 5, label: '¥5' },
    { value: 10, label: '¥10' },
    { value: 20, label: '¥20' },
    { value: 50, label: '¥50' },
    { value: 100, label: '¥100' },
  ];

  const handleConfirm = () => {
    if (selectedAmount || customAmount) {
      setShowQRCode(true);
    }
  };

  const handleBack = () => {
    setShowQRCode(false);
    setSelectedMethod(null);
  };

  const getAmount = () => {
    return customAmount ? `¥${customAmount}` : `¥${selectedAmount}`;
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl p-6 max-w-4xl w-full border border-gray-200">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-1">支持圆桌</h2>
            <p className="text-sm text-gray-500">感谢你的打赏与支持 ❤️</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-all"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {!showQRCode ? (
          <>
            {/* 横向布局：左侧金额选择，右侧支付方式 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 左侧：打赏金额选择 */}
              <div className="border border-gray-200 rounded-lg p-5">
                <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  选择打赏金额
                </h3>
                
                <div className="grid grid-cols-3 gap-2 mb-3">
                  {amounts.map((amount) => (
                    <button
                      key={amount.value}
                      onClick={() => setSelectedAmount(amount.value)}
                      className={`py-3 px-2 rounded-lg text-sm font-medium transition-all ${
                        selectedAmount === amount.value
                          ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md'
                          : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
                      }`}
                    >
                      {amount.label}
                    </button>
                  ))}
                </div>
                
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 text-sm">¥</span>
                  </div>
                  <input
                    type="number"
                    value={customAmount}
                    onChange={(e) => {
                      setCustomAmount(e.target.value);
                      setSelectedAmount(null);
                    }}
                    placeholder="自定义金额"
                    className="w-full pl-8 pr-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="1"
                  />
                </div>
                
                {selectedAmount && (
                  <p className="text-xs text-blue-600 mt-2">
                    已选择：¥{selectedAmount}
                  </p>
                )}
              </div>

              {/* 右侧：支付方式选择 */}
              <div className="border border-gray-200 rounded-lg p-5">
                <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                  选择支付方式
                </h3>
                
                <div className="space-y-3">
                  {/* 支付宝 */}
                  <button
                    onClick={() => setSelectedMethod('alipay')}
                    className={`w-full p-4 rounded-lg border-2 transition-all flex items-center ${
                      selectedMethod === 'alipay'
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                      <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12.0001 2C6.48008 2 2.00008 6.48 2.00008 12C2.00008 17.52 6.48008 22 12.0001 22C17.5201 22 22.0001 17.52 22.0001 12C22.0001 6.48 17.5201 2 12.0001 2ZM12.0001 20C7.58008 20 4.00008 16.42 4.00008 12C4.00008 7.58 7.58008 4 12.0001 4C16.4201 4 20.0001 7.58 20.0001 12C20.0001 16.42 16.4201 20 12.0001 20Z"/>
                        <path d="M12.0002 6C8.6902 6 6.0002 8.69 6.0002 12C6.0002 15.31 8.6902 18 12.0002 18C15.3102 18 18.0002 15.31 18.0002 12C18.0002 8.69 15.3102 6 12.0002 6ZM12.0002 16C9.7902 16 8.0002 14.21 8.0002 12C8.0002 9.79 9.7902 8 12.0002 8C14.2102 8 16.0002 9.79 16.0002 12C16.0002 14.21 14.2102 16 12.0002 16Z"/>
                        <path d="M12.0001 8C9.79008 8 8.00008 9.79 8.00008 12C8.00008 14.21 9.79008 16 12.0001 16C14.2101 16 16.0001 14.21 16.0001 12C16.0001 9.79 14.2101 8 12.0001 8ZM12.0001 14C10.8901 14 10.0001 13.11 10.0001 12C10.0001 10.89 10.8901 10 12.0001 10C13.1101 10 14.0001 10.89 14.0001 12C14.0001 13.11 13.1101 14 12.0001 14Z"/>
                      </svg>
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-medium text-gray-800">支付宝</p>
                      <p className="text-xs text-gray-500">扫码支付</p>
                    </div>
                    {selectedMethod === 'alipay' && (
                      <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                    )}
                  </button>

                  {/* 微信支付 */}
                  <button
                    onClick={() => setSelectedMethod('wechat')}
                    className={`w-full p-4 rounded-lg border-2 transition-all flex items-center ${
                      selectedMethod === 'wechat'
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center mr-3">
                      <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12.0001 2C6.48008 2 2.00008 6.48 2.00008 12C2.00008 17.52 6.48008 22 12.0001 22C17.5201 22 22.0001 17.52 22.0001 12C22.0001 6.48 17.5201 2 12.0001 2ZM12.0001 20C7.58008 20 4.00008 16.42 4.00008 12C4.00008 7.58 7.58008 4 12.0001 4C16.4201 4 20.0001 7.58 20.0001 12C20.0001 16.42 16.4201 20 12.0001 20Z"/>
                        <path d="M12.0001 6C8.6902 6 6.0002 8.69 6.0002 12C6.0002 15.31 8.6902 18 12.0001 18C15.3102 18 18.0002 15.31 18.0002 12C18.0002 8.69 15.3102 6 12.0001 6ZM12.0001 16C9.7902 16 8.0002 14.21 8.0002 12C8.0002 9.79 9.7902 8 12.0001 8C14.2102 8 16.0002 9.79 16.0002 12C16.0002 14.21 14.2102 16 12.0001 16Z"/>
                        <circle cx="12.0001" cy="12" r="3"/>
                      </svg>
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-medium text-gray-800">微信支付</p>
                      <p className="text-xs text-gray-500">扫码支付</p>
                    </div>
                    {selectedMethod === 'wechat' && (
                      <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* 确认按钮 */}
            <div className="mt-6 flex justify-center">
              <button
                onClick={handleConfirm}
                disabled={!selectedAmount && !customAmount}
                className={`px-12 py-3 rounded-lg text-base font-medium transition-all ${
                  selectedAmount || customAmount
                    ? 'bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white shadow-lg'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                确认打赏 {selectedAmount || customAmount ? getAmount() : ''}
              </button>
            </div>

            {/* 其他支持方式 */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="text-center font-semibold text-gray-700 mb-4 flex items-center justify-center">
                <svg className="w-5 h-5 mr-2 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                其他支持方式
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* GitHub Star */}
                <button
                  onClick={() => window.open(APP_CONFIG.GITHUB_REPO, '_blank')}
                  className="group p-4 bg-gradient-to-br from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 border-2 border-gray-200 hover:border-gray-400 rounded-xl transition-all duration-200"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                    </div>
                    <h4 className="font-semibold text-gray-800 mb-1">GitHub Star</h4>
                    <p className="text-xs text-gray-600 mb-2">点亮星标支持开源</p>
                    <span className="text-xs text-blue-600 font-medium group-hover:text-blue-700">
                      前往支持 →
                    </span>
                  </div>
                </button>

                {/* 分享项目 */}
                <button
                  onClick={() => {
                    const shareData = {
                      title: '圆桌 - 与伟人对话的思想平台',
                      text: '圆桌是一个创新的多角色 AI 对话模拟平台，让不同时代、不同领域的伟人通过 AI 进行思想碰撞！',
                      url: window.location.href
                    };
                    
                    if (navigator.share) {
                      navigator.share(shareData);
                    } else {
                      navigator.clipboard.writeText(shareData.url);
                      alert('链接已复制到剪贴板，快去分享给朋友吧！');
                    }
                  }}
                  className="group p-4 bg-gradient-to-br from-blue-50 to-indigo-100 hover:from-blue-100 hover:to-indigo-200 border-2 border-blue-200 hover:border-blue-400 rounded-xl transition-all duration-200"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                      </svg>
                    </div>
                    <h4 className="font-semibold text-gray-800 mb-1">分享项目</h4>
                    <p className="text-xs text-gray-600 mb-2">分享给更多朋友</p>
                    <span className="text-xs text-blue-600 font-medium group-hover:text-blue-700">
                      立即分享 →
                    </span>
                  </div>
                </button>

                {/* 提供建议 */}
                <button
                  onClick={() => {
                    const subject = encodeURIComponent('圆桌项目建议');
                    const body = encodeURIComponent(
                      '你好！我对圆桌项目有一些建议：\n\n' +
                      '--------------------------------\n' +
                      '建议类型：功能建议 / 问题反馈 / 其他\n' +
                      '--------------------------------\n\n' +
                      '请在这里详细描述你的建议：\n\n\n\n' +
                      '--------------------------------\n' +
                      '（邮件由圆桌应用自动生成）'
                    );
                    window.open(`mailto:${APP_CONFIG.FEEDBACK_EMAIL}?subject=${subject}&body=${body}`, '_blank');
                  }}
                  className="group p-4 bg-gradient-to-br from-green-50 to-emerald-100 hover:from-green-100 hover:to-emerald-200 border-2 border-green-200 hover:border-green-400 rounded-xl transition-all duration-200"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h4 className="font-semibold text-gray-800 mb-1">提供建议</h4>
                    <p className="text-xs text-gray-600 mb-2">帮助项目变得更好</p>
                    <span className="text-xs text-blue-600 font-medium group-hover:text-blue-700">
                      提交反馈 →
                    </span>
                  </div>
                </button>
              </div>
              
              <div className="mt-4 text-center">
                <p className="text-xs text-gray-500">
                  每一种支持方式都是对我们最大的鼓励！
                </p>
              </div>
            </div>
          </>
        ) : (
          /* 收款码显示 */
          <div className="text-center py-6">
            <div className="mb-6">
              <p className="text-lg font-medium text-gray-800 mb-2">
                请扫码支付 <span className="text-blue-600">{getAmount()}</span>
              </p>
              <p className="text-sm text-gray-500">
                {selectedMethod === 'alipay' ? '支付宝' : '微信支付'}
              </p>
            </div>
            
            <div className="flex justify-center mb-6">
              <div className="bg-white p-4 rounded-xl border-2 border-gray-200 shadow-lg">
                <div className="w-48 h-48 bg-gray-100 flex items-center justify-center rounded-lg">
                  <div className="text-center">
                    {selectedMethod === 'alipay' ? (
                      <>
                        <div className="w-16 h-16 bg-blue-500 rounded-full mx-auto mb-2 flex items-center justify-center">
                          <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                          </svg>
                        </div>
                        <p className="text-xs text-gray-500">支付宝收款码</p>
                      </>
                    ) : (
                      <>
                        <div className="w-16 h-16 bg-green-500 rounded-full mx-auto mb-2 flex items-center justify-center">
                          <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8.5 13.5L11 16.5L14.5 12L19 18H5L8.5 13.5Z"/>
                          </svg>
                        </div>
                        <p className="text-xs text-gray-500">微信收款码</p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-700">
                感谢您的支持！这将帮助我持续改进圆桌项目。<br/>
                <span className="text-xs text-gray-500">（请完成支付后点击返回）</span>
              </p>
            </div>
            
            <div className="flex justify-center space-x-4">
              <button
                onClick={handleBack}
                className="px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-lg transition-all"
              >
                返回
              </button>
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white text-sm font-medium rounded-lg transition-all shadow-md"
              >
                已完成支付
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SupportModal;
