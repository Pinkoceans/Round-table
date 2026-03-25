# 🎭 圆桌

一个让不同时代、不同领域的伟人通过 AI 进行思想碰撞的平台。

## ✨ 核心特性

### 🎭 74 位历史与现代智者
涵盖 6 大领域：
- **投资商业** - 巴菲特、马斯克、贝佐斯等
- **哲学思想** - 孔子、苏格拉底、老子等
- **科学技术** - 爱因斯坦、牛顿、居里夫人等
- **文学艺术** - 李白、莎士比亚、达芬奇等
- **政治军事** - 毛泽东、拿破仑、孙子等
- **现代科技** - 乔布斯、黄仁勋、皮查伊等

### 🎯 功能特点
- 支持 74 个角色同时对话
- 12 个主流 AI 厂商，48 个最新模型（截至 2026 年 3 月）
- 批量配置和单个配置两种模式
- 多话题并行讨论
- 金属白主题 UI，支持响应式设计

## 🚀 快速开始

### 前提条件
- Node.js 16+ 
- npm 或 yarn

### 安装依赖

```bash
cd "/Users/pinkocean/Desktop/开发/Round table/ai-forum"
npm install
```

### 启动开发服务器

```bash
npm run dev
```

启动后，浏览器会自动打开 http://localhost:5173

## 📁 项目结构

```
ai-forum/
├── src/
│   ├── components/          # React 组件
│   │   ├── CharacterPanel.jsx   # 角色选择面板
│   │   ├── ChatPanel.jsx        # 对话面板
│   │   ├── SettingsPanel.jsx    # AI 配置管理面板
│   │   └── TopicManager.jsx     # 话题管理
│   ├── App.jsx              # 主应用组件
│   ├── main.jsx             # 入口文件
│   ├── store.js             # 状态管理 (Zustand)
│   ├── ai-service.js        # AI 服务层
│   └── index.css            # 全局样式
├── index.html               # HTML 模板
├── package.json             # 项目依赖
├── vite.config.js           # Vite 配置
├── tailwind.config.js       # TailwindCSS 配置
└── postcss.config.js        # PostCSS 配置
```

## 🎨 技术栈

- **React 18** - 前端框架
- **Vite 5.4** - 构建工具
- **TailwindCSS 3** - 样式方案
- **Zustand 4** - 轻量级状态管理

## 💡 使用说明

### 方式一：批量配置（推荐）
1. 点击"设置"标签
2. 新建 AI 配置（填写名称、选择服务商、输入 API Key、选择模型）
3. 点击"一键配置角色"
4. 选择需要配置的角色
5. 点击"确认配置"
6. 回到"圆桌"界面开始对话

### 方式二：单个配置
1. 在圆桌界面点击角色（激活）
2. 点击角色右侧的"配置"按钮
3. 在滑动面板中配置 AI
4. 保存配置

### 开始对话
1. 在圆桌界面左侧选择要参与讨论的角色
2. 在右侧创建话题
3. 在中间输入框输入问题，按回车或点击发送
4. 观看不同角色的精彩回答

## 🔧 开发说明

### 添加新角色

编辑 `src/store.js` 中的 `characters` 数组：

```javascript
{
  id: '75',
  name: '达尔文',
  identity: '生物学家',
  personality: '严谨、耐心、富有观察力',
  background: '进化论创始人，著有《物种起源》',
  speakingStyle: '用大量实例和观察数据说明观点',
  category: 'science',
  status: 'deceased',
}
```

### 添加新的 AI 厂商

1. 在 `src/ai-service.js` 中添加新的服务商调用函数
2. 在 `src/components/SettingsPanel.jsx` 的 `providers` 数组中添加服务商
3. 在 `src/components/SettingsPanel.jsx` 的 `models` 对象中添加对应模型

## 🌟 支持的 AI 厂商和模型

| 厂商 | 代表模型 |
|------|---------|
| OpenAI | gpt-5.4-thinking, gpt-5.4, gpt-4.5 |
| Anthropic | claude-opus-4.6, claude-opus-4.5 |
| Google | gemini-3.1-pro, gemini-3-pro |
| xAI | grok-4.20-beta, grok-4.2-ultimate |
| DeepSeek | deepseek-v4, deepseek-v3.2-thinking |
| Qwen（阿里）| qwen3-max-thinking, qwen-3.5 |
| Moonshot（Kimi）| kimi-k2.5, kimi-k2 |
| Zhipu（智谱）| glm-5, glm-5-turbo |
| Baidu（文心）| ernie-4.5, ernie-4.0 |
| iFlytek（讯飞）| spark-x2, spark-4.0 |
| MiniMax | minimax-m2.7, minimax-m2.5 |
| Doubao（字节）| doubao-2.0, doubao-1.5-vision-pro |

## 📝 注意事项

1. **API Key 安全**
   - 当前版本 API Key 存储在浏览器本地
   - 建议使用自己的 API Key
   - 生产环境建议通过后端转发 API 请求

2. **网络要求**
   - 部分 AI 厂商的 API 可能需要特殊网络环境
   - 请确保网络连接正常

3. **费用说明**
   - 使用各厂商的 AI 模型会产生相应费用
   - 请注意控制使用量

## 🎯 示例对话

**问题**: "在当前经济环境下，应该持有现金还是投资股票？"

- **巴菲特**: "别人贪婪时恐惧，别人恐惧时贪婪。关键是找到被低估的优质资产，用合理的价格买入并长期持有..."

- **马斯克**: "我会选择投资。现金会被通胀侵蚀，而优秀的资产会创造价值。但要注意分散风险..."

- **苏格拉底**: "你认为持有现金的目的是什么？安全感的来源是金钱本身，还是对未来的掌控？..."

- **芒格**: "反过来想，如果你持有现金，通胀会让你损失什么？如果投资，你最大的风险是什么？..."

## 📚 相关文档

- [项目规范文档](./PROJECT_GUIDELINES.md) - 详细的开发规范和使用说明

---

**享受与伟人的思想碰撞！🎭✨**
