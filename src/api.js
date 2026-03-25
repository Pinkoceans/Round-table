// 用户配置 API 服务

const API_BASE = '/.netlify/functions';

export async function saveUserConfig(config) {
  const token = getAuthToken();
  if (!token) throw new Error('请先登录');

  const res = await fetch(`${API_BASE}/save-config`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(config),
  });
  return res.json();
}

export async function loadUserConfig() {
  const token = getAuthToken();
  if (!token) return null;

  const res = await fetch(`${API_BASE}/get-config`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  const data = await res.json();
  return data.config;
}

export async function saveConversation(conversationId, messages) {
  const token = getAuthToken();
  if (!token) throw new Error('请先登录');

  const res = await fetch(`${API_BASE}/save-conversation`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ conversationId, messages }),
  });
  return res.json();
}

export async function loadConversation(conversationId) {
  const token = getAuthToken();
  if (!token) return null;

  const res = await fetch(`${API_BASE}/get-conversation?id=${conversationId}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  const data = await res.json();
  return data.messages;
}

function getAuthToken() {
  if (window.netlifyIdentity) {
    const user = window.netlifyIdentity.currentUser();
    if (user) {
      return user.token.access_token;
    }
  }
  return null;
}

export function isLoggedIn() {
  if (window.netlifyIdentity) {
    return !!window.netlifyIdentity.currentUser();
  }
  return false;
}
