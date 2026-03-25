# 圆桌 AI 对话增强功能计划

## 🎯 目标
让 AI 对话更加真实、互动性更强，模拟真实的圆桌讨论场景。

---

## 📋 问题分析

### 当前问题：
1. **AI 无法看到彼此的消息** - 只能看到用户的消息，无法进行互动讨论
2. **AI 发言次数不足** - 设置发言 3 次，但每个 AI 只说 1 次
3. **AI 表现呆板** - 缺乏真人对话的互动感和个性
4. **缺少发言控制** - 没有最高发言次数限制，可能导致 AI 垄断对话

---

## 💡 解决方案

### 功能 1：多角色互动对话系统

#### 实现思路：
- **消息可见性**：每个 AI 可以看到之前所有角色（包括其他 AI）的发言
- **上下文关联**：AI 的回复要关联前面角色的发言
- **角色称呼**：AI 发言时可以称呼其他角色的名字

#### 技术方案：
```javascript
// 构建包含所有角色发言的上下文
const conversationContext = messages.map(msg => 
  `${msg.senderName}: ${msg.content}`
).join('\n');

// 在 prompt 中说明这是多人对话
const systemPrompt = `
你是一个圆桌讨论的参与者。以下是之前的对话记录：

${conversationContext}

请根据上面的讨论，发表你的看法。你可以：
1. 回应前面某位参与者的观点
2. 提出新的见解
3. 提出问题引导讨论
`;
```

---

### 功能 2：智能发言轮次控制

#### 实现思路：
- **最低发言次数**：确保每个 AI 至少发言 N 次
- **最高发言次数**：限制每个 AI 最多发言 M 次，防止垄断
- **发言权重**：根据 AI 的个性和话题相关度，动态调整发言概率

#### 技术方案：
```javascript
// 在 store 中添加发言计数
const speakerStats = {
  [characterId]: {
    minTurns: 1,      // 最少发言次数
    maxTurns: 3,      // 最多发言次数
    currentTurns: 0,  // 当前已发言次数
  }
};

// 判断 AI 是否可以发言
const canSpeak = (characterId) => {
  const stats = speakerStats[characterId];
  return stats.currentTurns < stats.maxTurns;
};

// 判断 AI 是否必须发言
const mustSpeak = (characterId) => {
  const stats = speakerStats[characterId];
  return stats.currentTurns < stats.minTurns;
};
```

---

### 功能 3：对话设置面板

#### 新增配置项：
1. **每轮最高发言次数** (默认 3 次)
   - 防止 AI 一直发言，用户无法插话
   - 范围：1-10 次

2. **每轮最低发言次数** (默认 1 次)
   - 确保每个 AI 都参与讨论
   - 范围：0-5 次

3. **发言间隔时间** (默认 2 秒)
   - 模拟真人思考时间
   - 范围：0-10 秒

4. **互动模式开关** (默认开启)
   - 开启：AI 可以看到并回应其他 AI 的发言
   - 关闭：AI 只回应用户的消息

5. **角色称呼模式** (默认开启)
   - 开启：AI 发言时会称呼其他角色名字
   - 关闭：AI 不称呼名字

#### UI 设计：
```jsx
<div className="settings-panel">
  <h3>对话设置</h3>
  
  <div className="setting-item">
    <label>每轮最高发言次数</label>
    <input type="range" min="1" max="10" value={maxTurns} />
    <span>{maxTurns} 次</span>
  </div>
  
  <div className="setting-item">
    <label>每轮最低发言次数</label>
    <input type="range" min="0" max="5" value={minTurns} />
    <span>{minTurns} 次</span>
  </div>
  
  <div className="setting-item">
    <label>发言间隔时间</label>
    <input type="range" min="0" max="10" value={delay} />
    <span>{delay} 秒</span>
  </div>
  
  <div className="setting-item">
    <label>互动模式</label>
    <input type="checkbox" checked={interactive} />
    <span>AI 可以互相回应</span>
  </div>
  
  <div className="setting-item">
    <label>角色称呼</label>
    <input type="checkbox" checked={useNames} />
    <span>AI 发言时称呼名字</span>
  </div>
</div>
```

---

### 功能 4：增强 AI 个性表现

#### 实现思路：
- **个性强化 Prompt**：在 system prompt 中强调角色个性
- **发言风格差异化**：不同角色有不同的发言长度、语气、用词习惯
- **情绪表达**：允许 AI 表达情绪（赞同、反对、疑问等）

#### 技术方案：
```javascript
const enhancedSystemPrompt = `
你是${character.name}，${character.identity}。

性格特点：${character.personality}
背景：${character.background}
说话风格：${character.speakingStyle}

重要提示：
1. 始终保持你的角色身份和说话风格
2. 可以用括号表达情绪，如：（微笑着）、（沉思片刻）
3. 可以称呼其他参与者的名字
4. 发言长度适中，不要过长（50-200 字）
5. 要有互动性，可以回应前面发言者的观点

当前讨论话题：${topic}

请发表你的看法：
`;
```

---

## 🔧 实现步骤

### 步骤 1：修改数据结构
- [ ] 在 store 中添加对话设置状态
- [ ] 在 store 中添加发言统计
- [ ] 在 message 结构中添加更多元数据

### 步骤 2：创建对话设置面板
- [ ] 创建新的 Settings 子组件
- [ ] 添加配置项 UI
- [ ] 连接到 store

### 步骤 3：修改 AI 对话逻辑
- [ ] 修改 ai-service.js，传递完整对话历史
- [ ] 实现发言轮次控制
- [ ] 实现互动模式
- [ ] 添加个性化 prompt

### 步骤 4：优化 ChatPanel
- [ ] 显示发言次数统计
- [ ] 添加发言控制按钮
- [ ] 优化消息显示（显示角色头像、名字）

### 步骤 5：测试和优化
- [ ] 测试多角色互动
- [ ] 测试发言控制
- [ ] 调整默认参数
- [ ] 性能优化

---

## 📊 预期效果

### 对话示例：
```
用户：什么是成功？

巴菲特：（微笑着）成功就是做你喜欢做的事，并且从中获得快乐。我每天都跳着踢踏舞去上班。

纳瓦尔：我同意巴菲特的观点，但我想补充一点：成功还意味着拥有自由。时间自由、财务自由、精神自由。

孔子：（点头）善哉！吾十有五而志于学，三十而立，四十而不惑。成功者，知行合一也。

用户：我同意你们的观点...

（下一轮）

巴菲特：（认真地）我注意到刚才纳瓦尔提到了自由，这个观点很有意思...
```

---

## 🎁 额外优化建议

1. **发言顺序控制**
   - 随机顺序：增加不确定性
   - 按年龄/资历：模拟尊卑有序
   - 按相关性：对话题最相关的先发言

2. **打断机制**
   - 允许 AI 在特定情况下打断其他 AI
   - 模拟真实的辩论场景

3. **总结发言**
   - 每轮讨论结束后，由一个 AI 做总结
   - 模拟会议主席的角色

4. **投票机制**
   - 对重要观点进行投票
   - 增加互动性

---

## ✅ 验收标准

- [ ] AI 可以看到并回应其他 AI 的发言
- [ ] 每个 AI 发言次数在设定范围内
- [ ] 用户可以控制 AI 的发言行为
- [ ] AI 的表现更加生动、有个性
- [ ] 对话流程自然流畅，像真实的圆桌讨论

---

**开始实施这个计划，让圆桌讨论真正"活"起来！** 🚀
