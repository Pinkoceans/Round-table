# 圆桌 - 项目规范文档

## 项目概述

圆桌是一个多角色 AI 对话模拟系统，允许用户配置多个历史/现代人物角色，使用不同的 AI 模型进行对话讨论。

## 技术栈

- **前端框架**: React 18
- **构建工具**: Vite 5.4
- **状态管理**: Zustand
- **样式**: Tailwind CSS
- **AI 集成**: 原生 Fetch API

## 项目结构

```
ai-forum/
├── src/
│   ├── components/
│   │   ├── CharacterPanel.jsx    # 角色选择和管理面板
│   │   ├── ChatPanel.jsx         # 聊天对话面板
│   │   ├── SettingsPanel.jsx     # AI 配置管理面板
│   │   └── TopicManager.jsx      # 话题管理面板
│   ├── App.jsx                   # 主应用组件
│   ├── ai-service.js             # AI 服务层（12 个 AI 厂商接口）
│   ├── index.css                 # 全局样式
│   ├── main.jsx                  # 应用入口
│   └── store.js                  # Zustand 状态管理
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.js
```

## 核心功能

### 1. 角色系统
- **74 个角色**，分为 6 个类别：
  - 投资商业（巴菲特、马斯克等）
  - 哲学思想（孔子、苏格拉底等）
  - 科学技术（爱因斯坦、牛顿等）
  - 文学艺术（李白、莎士比亚等）
  - 政治军事（毛泽东、拿破仑等）
  - 现代科技（乔布斯、黄仁勋等）

- 每个角色包含：
  - 姓名、身份、性格、说话风格、背景描述
  - 独立的 AI 配置（服务商、API Key、模型）

### 2. AI 配置系统
支持 12 个主流 AI 厂商，48 个最新模型（截至 2026 年 3 月）：

| 厂商 | 模型示例 |
|------|---------|
| OpenAI | gpt-5.4-thinking, gpt-5.4, gpt-4.5, gpt-4o |
| Anthropic | claude-opus-4.6, claude-opus-4.5, claude-3-7-sonnet |
| Google | gemini-3.1-pro, gemini-3-pro, gemini-2.0-flash |
| xAI | grok-4.20-beta, grok-4.2-ultimate, grok-3 |
| DeepSeek | deepseek-v4, deepseek-v3.2-thinking, deepseek-v3 |
| Qwen（阿里）| qwen3-max-thinking, qwen-3.5, qwen3-32b |
| Moonshot（Kimi）| kimi-k2.5, kimi-k2, kimi-k1.5 |
| Zhipu（智谱）| glm-5, glm-5-turbo, glm-4-plus |
| Baidu（文心）| ernie-4.5, ernie-4.0, ernie-3.5 |
| iFlytek（讯飞）| spark-x2, spark-4.0, spark-3.5 |
| MiniMax | minimax-m2.7, minimax-m2.5, minimax-m2 |
| Doubao（字节）| doubao-2.0, doubao-1.5-vision-pro |

### 3. 配置方式
- **批量配置**：在设置界面创建 AI 配置后，一键分配给多个角色
- **单个配置**：在圆桌界面点击角色的"配置"按钮，滑动面板快速配置

### 4. 对话系统
- 支持多角色同时对话
- 每个角色使用独立配置的 AI 模型
- 支持话题创建和管理
- 实时显示对话内容

## 开发规范

### 代码风格
- 使用函数式组件和 React Hooks
- 使用 Tailwind CSS 进行样式编写
- 组件文件采用 PascalCase 命名（如 `CharacterPanel.jsx`）
- 工具函数采用 camelCase 命名（如 `ai-service.js`）

### 状态管理（Zustand）
```javascript
// 示例
const useForumStore = create((set, get) => ({
  // 状态
  characters: [],
  apiConfigs: [],
  activeCharacters: [],
  
  // 操作
  addAPIConfig: (config) => set((state) => ({
    apiConfigs: [...state.apiConfigs, config]
  })),
}));
```

### 组件结构
```javascript
import React, { useState } from 'react';
import { useForumStore } from '../store';

function ComponentName() {
  const { /* 从 store 解构需要的状态和方法 */ } = useForumStore();
  const [localState, setLocalState] = useState(initialValue);
  
  // 事件处理函数
  const handleClick = () => {
    // 逻辑处理
  };
  
  return (
    <div className="样式">
      {/* JSX */}
    </div>
  );
}

export default ComponentName;
```

### AI 服务调用
```javascript
// 示例：调用 OpenAI 接口
async function callOpenAI(messages, config) {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${config.apiKey}`
    },
    body: JSON.stringify({
      model: config.model,
      messages: messages,
      temperature: config.temperature
    })
  });
  
  const data = await response.json();
  return data.choices[0].message.content;
}
```

## 界面说明

### 1. 圆桌界面（主界面）
- **左侧**：角色选择面板
  - 分类筛选
  - 排序（按知名度/按字母）
  - 全选/清空
  - 点击角色激活/移除
  - 配置按钮（滑动出 AI 配置面板）

- **中间**：聊天面板
  - 显示所有角色的对话
  - 不同角色不同颜色标识

- **右侧**：话题管理
  - 创建新话题
  - 话题列表

### 2. 设置界面
- **AI 配置管理**
  - 新建/编辑/删除配置
  - 一键配置角色（打开角色选择器）
  - 显示已分配角色数量

## 使用说明

### 快速开始
1. 点击"设置"标签
2. 新建 AI 配置（填写名称、选择服务商、输入 API Key、选择模型）
3. 点击"一键配置角色"
4. 选择需要配置的角色
5. 点击"确认配置"
6. 回到"圆桌"界面开始对话

### 单个角色配置
1. 在圆桌界面点击角色（激活）
2. 点击角色右侧的"配置"按钮
3. 在滑动面板中配置 AI
4. 保存配置

## 设计规范

### 颜色主题
- **主色调**：金属白 + 灰色渐变
- **激活状态**：深灰色背景（bg-gray-800）
- **非激活状态**：白色背景 + 透明效果
- **强调色**：蓝色（配置按钮）、绿色（已配置状态）

### 布局规范
- 三栏布局：角色选择（1/4）+ 聊天（2/4）+ 话题管理（1/4）
- 响应式设计：小屏幕自动切换为单栏
- 所有面板高度一致，避免多余滚动条

### 交互规范
- 点击角色卡片切换选择状态
- 滑动面板使用 CSS transform 实现平滑动画
- 模态框使用固定定位 + 半透明背景

## 性能优化

### 已实现
- 使用 Zustand 进行轻量级状态管理
- 组件按需渲染
- CSS transform 实现动画（GPU 加速）
- Tailwind CSS 按需加载

### 建议
- 大量角色时可考虑虚拟滚动
- 长对话历史可考虑分页加载
- AI 响应可使用流式传输

## 安全建议

1. **API Key 存储**
   - 当前存储在本地浏览器内存中
   - 刷新页面会丢失
   - 建议：使用 localStorage 加密存储（生产环境）

2. **API 调用限制**
   - 建议在服务端实现请求限流
   - 避免前端直接暴露 API Key（生产环境）

## 扩展建议

### 功能扩展
- [ ] 对话历史保存和导出
- [ ] 角色自定义创建
- [ ] 对话记录搜索
- [ ] 多语言支持
- [ ] 语音合成（TTS）
- [ ] 对话导出为文章/剧本

### 技术优化
- [ ] 添加单元测试
- [ ] 实现 E2E 测试
- [ ] 添加错误边界处理
- [ ] 实现离线支持（Service Worker）
- [ ] 添加性能监控

## 常见问题

### Q: 如何添加新的 AI 厂商？
A: 在 `ai-service.js` 中添加新的服务商函数，在 `SettingsPanel.jsx` 的 `providers`和`models` 中添加配置。

### Q: 如何添加新角色？
A: 在 `store.js` 的初始 `characters`数组中添加角色对象，包含 id、name、identity、personality、speakingStyle、background、category 等字段。

### Q: 对话没有响应？
A: 检查：
1. 角色是否已激活
2. 角色是否已配置 AI
3. API Key 是否正确
4. 网络连接是否正常
5. 查看浏览器控制台错误信息

## 开发命令

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产构建
npm run preview
```

## 版本信息

- **当前版本**: 1.0.0
- **更新日期**: 2026-03-22
- **React 版本**: 18.x
- **Vite 版本**: 5.4.x

## 联系方式

如有问题或建议，请查看项目代码注释或联系开发团队。
