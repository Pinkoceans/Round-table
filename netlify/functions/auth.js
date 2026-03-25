// Netlify Function: 用户认证和数据存储
const { Blob } = require('@netlify/blobs');

exports.handler = async (event, context) => {
  const blob = new Blob('user-data', { siteID: process.env.NETLIFY_SITE_ID });

  try {
    const user = context.clientContext?.user;
    if (!user) {
      return {
        statusCode: 401,
        body: JSON.stringify({ error: '未授权' })
      };
    }

    const userId = user.id;
    const { action, data } = JSON.parse(event.body);

    switch (action) {
      case 'save':
        await blob.set(userId, data);
        return {
          statusCode: 200,
          body: JSON.stringify({ success: true })
        };

      case 'load':
        const savedData = await blob.get(userId);
        return {
          statusCode: 200,
          body: JSON.stringify({ data: savedData || null })
        };

      case 'delete':
        await blob.delete(userId);
        return {
          statusCode: 200,
          body: JSON.stringify({ success: true })
        };

      default:
        return {
          statusCode: 400,
          body: JSON.stringify({ error: '无效的操作' })
        };
    }
  } catch (error) {
    console.error('Auth function error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};