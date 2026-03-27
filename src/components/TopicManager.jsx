import React, { useState } from 'react';
import { useForumStore } from '../store';
import { t } from '../i18n';

function TopicManager() {
  const { topics, currentTopicId, createTopic, switchTopic, deleteTopic, language } = useForumStore();
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');

  const handleCreateTopic = () => {
    if (!newTitle.trim()) return;
    createTopic(newTitle, newDescription);
    setNewTitle('');
    setNewDescription('');
  };

  return (
    <div className="bg-white/90 backdrop-blur-md rounded-xl border-2 border-gray-300 shadow-lg h-full flex flex-col">
      <h2 className="text-lg font-bold text-gray-800 mb-3 px-4 pt-4">{t('topic.list', language)}</h2>
      
      {/* 创建话题表单 - 始终显示在最上面 */}
      <div className="mb-4 p-3 bg-gray-100 rounded-lg border border-gray-200 mx-4">
        <div className="space-y-2">
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder={t('topic.placeholder.title', language)}
            className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-gray-800 text-sm placeholder-gray-400 focus:outline-none focus:border-gray-500"
          />
          <textarea
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            placeholder={t('topic.placeholder.description', language)}
            rows={2}
            className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-gray-800 text-sm placeholder-gray-400 focus:outline-none focus:border-gray-500 resize-none"
          />
          <button
            onClick={handleCreateTopic}
            disabled={!newTitle.trim()}
            className="w-full px-3 py-2 bg-gray-800 hover:bg-gray-700 disabled:bg-gray-400 text-white text-sm rounded transition-all disabled:cursor-not-allowed font-medium"
          >
            {t('topic.create', language)}
          </button>
        </div>
      </div>
      
      {/* 话题列表 */}
      <div className="flex-1 overflow-y-auto px-4 space-y-2">
        {topics.length === 0 ? (
          <p className="text-gray-500 text-sm text-center py-4">{t('topic.noTopics', language)}</p>
        ) : (
          topics.map((topic) => (
            <div
              key={topic.id}
              className={`p-3 rounded-lg border-2 transition-all cursor-pointer ${
                currentTopicId === topic.id
                  ? 'bg-gray-800 border-gray-700 text-white'
                  : 'bg-white border-gray-200 hover:border-gray-400 text-gray-800'
              }`}
              onClick={() => switchTopic(topic.id)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-medium text-sm">{topic.title}</h3>
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

export default TopicManager;
