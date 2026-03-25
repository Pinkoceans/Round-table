// Netlify Function: 保存对话记录
const { getStore } = require('@netlify/blobs');

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const user = context.clientContext?.user;
    if (!user) {
      return { statusCode: 401, body: JSON.stringify({ error: '请先登录' }) };
    }

    const userId = user.id;
    const { conversationId, messages } = JSON.parse(event.body);

    if (!conversationId) {
      return { statusCode: 400, body: JSON.stringify({ error: '缺少对话 ID' }) };
    }

    const store = getStore('conversations');
    const key = `${userId}_${conversationId}`;
    await store.set(key, messages);

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true })
    };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
};
