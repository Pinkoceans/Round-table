// Netlify Function: 读取用户配置
const { getStore } = require('@netlify/blobs');

exports.handler = async (event, context) => {
  // 只允许 GET
  if (event.httpMethod !== 'GET') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const user = context.clientContext?.user;
    if (!user) {
      return { statusCode: 401, body: JSON.stringify({ error: '请先登录' }) };
    }

    const userId = user.id;
    const store = getStore('user-config');
    const config = await store.get(userId);

    if (!config) {
      return { statusCode: 404, body: JSON.stringify({ error: '暂无配置', config: null }) };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ config })
    };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
};
