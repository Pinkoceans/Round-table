// Netlify Function: 保存用户配置
const { getStore } = require('@netlify/blobs');

exports.handler = async (event, context) => {
  // 只允许 POST
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    // 获取用户 ID（从 JWT）
    const user = context.clientContext?.user;
    if (!user) {
      return { statusCode: 401, body: JSON.stringify({ error: '请先登录' }) };
    }

    const userId = user.id;
    const data = JSON.parse(event.body);

    // 存储到 Netlify Blobs
    const store = getStore('user-config');
    await store.set(userId, data);

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, message: '配置已保存' })
    };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
};
