// 用户数据同步服务
import { isLoggedIn, loadUserConfig, saveUserConfig, loadConversation, saveConversation } from './api';

// 检查是否需要同步
let lastSync = 0;
const SYNC_INTERVAL = 30000; // 30秒同步一次

export async function syncUserData(store) {
  // 节流
  const now = Date.now();
  if (now - lastSync < SYNC_INTERVAL) return;
  lastSync = now;

  if (!isLoggedIn()) return;

  try {
    // 加载云端配置
    const cloudConfig = await loadUserConfig();
    if (cloudConfig) {
      // 合并配置
      if (cloudConfig.apiConfigs) {
        store.setApiConfigs(cloudConfig.apiConfigs);
      }
      if (cloudConfig.dialogSettings) {
        store.setDialogSettings(cloudConfig.dialogSettings);
      }
    }

    // 保存当前配置到云端
    const currentConfig = {
      apiConfigs: store.apiConfigs,
      dialogSettings: store.dialogSettings,
      topics: store.topics,
      activeCharacters: store.activeCharacters,
    };
    await saveUserConfig(currentConfig);
  } catch (e) {
    console.log('同步失败', e);
  }
}

export async function syncConversation(store) {
  if (!isLoggedIn()) return;
  
  const { currentTopicId, messages } = store;
  if (!currentTopicId) return;

  try {
    await saveConversation(currentTopicId, messages);
  } catch (e) {
    console.log('保存对话失败', e);
  }
}

export async function loadCloudConversation(topicId) {
  if (!isLoggedIn()) return null;
  
  try {
    return await loadConversation(topicId);
  } catch (e) {
    console.log('加载对话失败', e);
    return null;
  }
}
