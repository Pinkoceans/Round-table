// Netlify Function: 读取对话记录
const { getStore } = require('@netlify/blobs');

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'GET') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const user = context.clientContext?.user;
    if (!user) {
      return { statusCode: 401, body: JSON.stringify({ error: '请先登录' }) };
    }

    const userId = user.id;
    const conversationId = event.queryStringParameters.id;

    if (!conversationId) {
      return { statusCode: 400, body: JSON.stringify({ error: '缺少对话 ID' }) };
    }

    const store = getStore('conversations');
    const key = `${userId}_${conversationId}`;
    const messages = await store.get(key);

    if (!messages) {
      return { statusCode: 404, body: JSON.stringify({ error: '对话不存在', messages: [] }) };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ messages })
    };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
};
