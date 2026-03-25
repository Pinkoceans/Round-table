# Netlify Blobs API 统一说明

## ✅ 已统一 API

所有 Netlify 函数现在都统一使用 `getStore()` API，这是 Netlify 推荐的现代方式。

### 统一的 API 模式

```javascript
const { getStore } = require('@netlify/blobs');

exports.handler = async (event, context) => {
  const store = getStore('store-name');
  
  // 存储数据
  await store.set(key, data);
  
  // 读取数据
  const data = await store.get(key);
  
  // 删除数据
  await store.delete(key);
};
```

## 📁 已更新的文件

### 1. auth.js - 用户认证和数据存储
- **Store 名称**: `user-data`
- **用途**: 用户登录数据的保存、加载和删除
- **操作**: save, load, delete

### 2. get-config.js - 读取用户配置
- **Store 名称**: `user-config`
- **用途**: 读取用户的 AI 配置、话题等
- **操作**: get

### 3. save-config.js - 保存用户配置
- **Store 名称**: `user-config`
- **用途**: 保存用户的 AI 配置、话题等
- **操作**: set

### 4. get-conversation.js - 读取对话记录
- **Store 名称**: `conversations`
- **用途**: 读取特定对话记录
- **操作**: get
- **Key 格式**: `{userId}_{conversationId}`

### 5. save-conversation.js - 保存对话记录
- **Store 名称**: `conversations`
- **用途**: 保存对话记录
- **操作**: set
- **Key 格式**: `{userId}_{conversationId}`

## 🔄 API 对比

### ❌ 旧方式（已废弃）
```javascript
const { Blob } = require('@netlify/blobs');
const blob = new Blob('store-name', { siteID: process.env.NETLIFY_SITE_ID });
await blob.set(key, data);
await blob.get(key);
await blob.delete(key);
```

### ✅ 新方式（推荐）
```javascript
const { getStore } = require('@netlify/blobs');
const store = getStore('store-name');
await store.set(key, data);
await store.get(key);
await store.delete(key);
```

## 🎯 优势

### 1. **代码更简洁**
- 不需要传递 `siteID` 参数
- API 更直观易用

### 2. **更好的类型支持**
- 自动处理序列化/反序列化
- 不需要手动 `JSON.stringify/parse`

### 3. **官方推荐**
- Netlify 官方推荐的现代 API
- 更好的文档和支持

### 4. **一致性**
- 所有函数使用相同的 API 模式
- 易于维护和扩展

## 📊 Store 分类

| Store 名称 | 用途 | 数据格式 | Key 格式 |
|-----------|------|---------|---------|
| `user-data` | 用户认证数据 | Object | userId |
| `user-config` | 用户配置 | Object | userId |
| `conversations` | 对话记录 | Array | userId_conversationId |

## 🔧 使用示例

### 保存用户配置
```javascript
const store = getStore('user-config');
await store.set(userId, {
  topics: [...],
  activeCharacters: [...],
  apiConfigs: [...]
});
```

### 读取用户配置
```javascript
const store = getStore('user-config');
const config = await store.get(userId);
```

### 保存对话记录
```javascript
const store = getStore('conversations');
const key = `${userId}_${conversationId}`;
await store.set(key, messages);
```

## ⚠️ 注意事项

### 1. 数据序列化
- 新 API 自动处理 JSON 序列化
- 不需要手动 `JSON.stringify/parse`

### 2. Store 名称
- Store 名称必须是字符串
- 建议使用小写字母和连字符

### 3. Key 命名
- 使用唯一的 Key 避免冲突
- 建议使用 `{userId}_{dataType}` 格式

### 4. 错误处理
- 所有操作都应该在 try-catch 块中
- 返回适当的 HTTP 状态码

## 🚀 部署后测试

### 1. 保存配置
```bash
curl -X POST https://your-site.netlify.app/.netlify/functions/save-config \
  -H "Content-Type: application/json" \
  -d '{"topics":[], "apiConfigs":[]}'
```

### 2. 读取配置
```bash
curl https://your-site.netlify.app/.netlify/functions/get-config
```

## 📖 相关文档

- [Netlify Blobs 官方文档](https://docs.netlify.com/blobs/overview/)
- [Netlify Functions 官方文档](https://docs.netlify.com/functions/build/)

## ✅ 检查清单

- [x] auth.js - 使用 getStore()
- [x] get-config.js - 使用 getStore()
- [x] save-config.js - 使用 getStore()
- [x] get-conversation.js - 使用 getStore()
- [x] save-conversation.js - 使用 getStore()
- [x] 所有 Store 名称统一
- [x] 所有 Key 格式统一
- [x] 错误处理完善
