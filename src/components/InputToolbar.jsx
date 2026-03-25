import React, { useState, useRef } from 'react';

const InputToolbar = ({ onImageSelect, onVoiceInput, isRecording, onStopRecording }) => {
  const [showImagePreview, setShowImagePreview] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  // 处理图片选择
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
        setShowImagePreview(true);
        onImageSelect(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // 触发文件选择
  const handleImageButtonClick = () => {
    fileInputRef.current?.click();
  };

  // 移除图片
  const handleRemoveImage = () => {
    setImagePreview(null);
    setShowImagePreview(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-2">
      {/* 图片预览 */}
      {showImagePreview && (
        <div className="relative inline-block">
          <img src={imagePreview} alt="预览" className="h-20 rounded-lg border border-gray-300" />
          <button
            onClick={handleRemoveImage}
            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      {/* 工具栏 */}
      <div className="flex items-center space-x-2">
        {/* 图片上传按钮 */}
        <button
          onClick={handleImageButtonClick}
          className="p-2 text-gray-600 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
          title="上传图片"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />

        {/* 语音输入按钮 */}
        <button
          onClick={isRecording ? onStopRecording : onVoiceInput}
          className={`p-2 rounded-lg transition-colors ${
            isRecording
              ? 'bg-red-500 text-white animate-pulse'
              : 'text-gray-600 hover:text-green-500 hover:bg-green-50'
          }`}
          title={isRecording ? '停止录音' : '语音输入'}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default InputToolbar;
