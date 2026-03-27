# 🆓 完全免费 AI 使用指南

## 方案一：Ollama 本地部署（完全免费，无限使用）⭐ 最推荐

### 什么是 Ollama？
Ollama 是一个本地运行大语言模型的工具，完全免费，不需要联网，隐私安全。

### 安装步骤（macOS）

#### 1. 安装 Ollama
```bash
# 使用 Homebrew 安装（推荐）
brew install ollama

# 或者从官网下载安装
# 访问 https://ollama.ai 下载 macOS 版本
```

#### 2. 下载模型
```bash
# 下载 Llama 2（推荐，7B 参数，效果好）
ollama pull llama2

# 下载 Qwen 2.5（阿里开源模型，中文效果好）
ollama pull qwen2.5

# 下载 Mistral（欧洲开源模型）
ollama pull mistral

# 下载 Gemma 2（Google 开源模型）
ollama pull gemma2

# 查看已下载的模型
ollama list
```

#### 3. 启动 Ollama 服务
```bash
# 启动服务（默认端口 11434）
ollama serve
```

保持这个终端窗口打开，Ollama 会在后台运行。

#### 4. 在圆桌中配置

1. 打开圆桌应用
2. 点击右上角设置图标 ⚙️
3. 点击"添加配置"
4. 选择服务商：**Ollama (本地免费)**
5. 配置名称：例如"本地 AI"
6. 选择模型：Llama 2 (推荐) 或其他已下载的模型
7. API 地址：保持默认 `http://localhost:11434`（如果有自定义端口则修改）
8. **不需要 API Key**
9. 点击保存

### 优点
- ✅ **完全免费**，不需要任何 API Key
- ✅ **无限使用**，没有调用次数限制
- ✅ **隐私安全**，所有数据都在本地
- ✅ **离线可用**，不需要网络连接
- ✅ **速度快**，没有网络延迟

### 缺点
- ❌ 需要自己的电脑性能较好（建议 8GB+ 内存）
- ❌ 模型效果可能不如顶级付费模型
- ❌ 需要保持 Ollama 服务运行

### 常见问题

#### Q: Ollama 服务启动失败？
```bash
# 检查是否已安装
ollama --version

# 检查端口是否被占用
lsof -i :11434

# 重启服务
pkill ollama
ollama serve
```

#### Q: 模型下载很慢？
```bash
# 使用国内镜像
export OLLAMA_DOWNLOAD_URL=https://ollama.iiiai.io/
ollama pull llama2
```

#### Q: 电脑配置不够？
- 使用更小的模型：`ollama pull phi` (微软小模型，2.7B)
- 使用量化版本：`ollama pull llama2:7b-q4_0` (4bit 量化)

---

## 方案二：Hugging Face（完全免费，有速率限制）

### 什么是 Hugging Face？
Hugging Face 是最大的 AI 模型社区，提供免费 Inference API。

### 使用步骤

#### 1. 注册账号
访问 https://huggingface.co 注册免费账号

#### 2. 获取 Access Token
1. 登录后点击右上角头像
2. 选择 Settings
3. 左侧选择 Access Tokens
4. 点击 New token
5. 选择 Type: Read
6. 复制生成的 Token

#### 3. 在圆桌中配置
1. 打开圆桌应用
2. 点击右上角设置图标 ⚙️
3. 点击"添加配置"
4. 选择服务商：**Hugging Face (免费)**
5. 配置名称：例如"HF 免费 AI"
6. 选择模型：Mistral-7B-Instruct (推荐)
7. 粘贴 Access Token
8. 点击保存

### 优点
- ✅ 完全免费
- ✅ 数千个模型可选
- ✅ 不需要本地资源

### 缺点
- ❌ 有速率限制（每分钟调用次数有限）
- ❌ 需要联网
- ❌ 模型加载可能需要等待

---

## 方案三：Groq（有免费额度，速度极快）

### 什么是 Groq？
Groq 是专门做 AI 推理的公司，提供免费额度，速度非常快。

### 使用步骤

#### 1. 注册账号
访问 https://console.groq.com 注册免费账号

#### 2. 获取 API Key
1. 登录后进入 Console
2. 左侧选择 API Keys
3. 点击 Create API Key
4. 复制生成的 Key

#### 3. 在圆桌中配置
1. 打开圆桌应用
2. 点击右上角设置图标 ⚙️
3. 点击"添加配置"
4. 选择服务商：**Groq (免费额度)**
5. 配置名称：例如"Groq 高速 AI"
6. 选择模型：Llama 3 70B (推荐)
7. 粘贴 API Key
8. 点击保存

### 优点
- ✅ 免费额度充足（个人使用基本够用）
- ✅ 速度极快（业界最快）
- ✅ 模型效果好（Llama 3 70B）

### 缺点
- ❌ 免费额度有限（但比硅基流动少）
- ❌ 需要联网

---

## 🎯 推荐配置方案

### 零成本最佳组合：

1. **主力**：Ollama 本地部署
   - 配置：Llama 2 或 Qwen 2.5
   - 用途：日常对话、开发测试

2. **备用**：Hugging Face
   - 配置：Mistral-7B-Instruct
   - 用途：Ollama 不可用时的备选

3. **高速**：Groq
   - 配置：Llama 3 70B
   - 用途：需要快速响应时

### 预期成本：
- **Ollama**：¥0/月（完全免费）
- **Hugging Face**：¥0/月（完全免费）
- **Groq**：¥0/月（免费额度够用）

**总计：¥0/月** 🎉

---

## 📝 快速开始（5 分钟）

### macOS 用户：
```bash
# 1. 安装 Ollama
brew install ollama

# 2. 下载模型
ollama pull llama2

# 3. 启动服务
ollama serve

# 4. 在圆桌中配置 Ollama
# 设置 → 添加配置 → 选择 Ollama → 保存
```

### Windows 用户：
1. 访问 https://ollama.ai 下载 Windows 版本
2. 安装并运行
3. 在终端运行：`ollama pull llama2`
4. 在圆桌中配置

### Linux 用户：
```bash
curl -fsSL https://ollama.ai/install.sh | sh
ollama pull llama2
ollama serve
```

---

## 🔗 相关链接

- Ollama 官网：https://ollama.ai
- Ollama GitHub：https://github.com/ollama/ollama
- Hugging Face：https://huggingface.co
- Groq Console：https://console.groq.com
- 模型排行榜：https://huggingface.co/spaces/lmsys/chatbot-arena-leaderboard

---

**现在你可以完全免费地使用圆桌了！🎉**

如果遇到任何问题，请查看常见问题部分或联系技术支持。
