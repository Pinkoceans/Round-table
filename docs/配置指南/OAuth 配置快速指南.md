# OAuth 配置快速指南

## 🎯 配置前准备

### 需要的信息
- 您的 Netlify 站点 URL（例如：https://your-site.netlify.app）
- GitHub 账号
- Google 账号（可选）

## 📝 GitHub OAuth 配置步骤

### 第一步：创建 GitHub OAuth App

1. **访问 GitHub Developer Settings**
   - 打开：https://github.com/settings/developers
   - 登录您的 GitHub 账号

2. **创建新的 OAuth App**
   - 点击 "New OAuth App" 按钮
   - 填写以下信息：

```
Application name: 圆桌
Homepage URL: https://your-site.netlify.app
Authorization callback URL: https://your-site.netlify.app/.netlify/identity
```

   ⚠️ **注意**：将 `your-site` 替换为您的实际站点名

3. **获取 Client ID 和 Secret**
   - 创建成功后，您会看到 "Client ID"
   - 点击 "Generate a new client secret" 生成密钥
   - **复制并保存** Client ID 和 Client Secret（只显示一次）

### 第二步：在 Netlify 配置

1. **访问 Netlify 控制台**
   - 打开：https://app.netlify.com
   - 选择您的 "圆桌" 站点

2. **进入 Identity 设置**
   - 点击左侧菜单 "Identity"
   - 如果显示 "Enable Identity"，先点击启用

3. **配置 GitHub Provider**
   - 滚动到 "External providers" 部分
   - 点击 "GitHub"
   - 点击 "Install provider"
   - 粘贴您刚才复制的：
     - Client ID
     - Client Secret
   - 点击 "Save"

4. **等待生效**
   - 配置完成后等待 2-5 分钟
   - 重新部署站点（可选）

## 📝 Google OAuth 配置步骤

### 第一步：创建 Google OAuth 客户端

1. **访问 Google Cloud Console**
   - 打开：https://console.developers.google.com/
   - 登录 Google 账号

2. **创建新项目**
   - 点击顶部的项目选择器
   - 点击 "NEW PROJECT"
   - 项目名称：圆桌
   - 点击 "CREATE"

3. **配置 OAuth 同意屏幕**
   - 左侧菜单：APIs & Services → OAuth consent screen
   - 选择 "External"
   - 填写：
     - App name: 圆桌
     - User support email: 您的邮箱
     - Developer contact: 您的邮箱
   - 点击 "SAVE AND CONTINUE"
   - 跳过 Scopes 和 Test users
   - 点击 "BACK TO DASHBOARD"

4. **创建 OAuth 2.0 客户端 ID**
   - 左侧菜单：APIs & Services → Credentials
   - 点击 "CREATE CREDENTIALS" → "OAuth client ID"
   - 应用类型：Web application
   - 名称：圆桌 Web 客户端
   - **Authorized JavaScript origins**:
     ```
     https://your-site.netlify.app
     ```
   - **Authorized redirect URIs**:
     ```
     https://your-site.netlify.app/.netlify/identity
     ```
   - 点击 "CREATE"

5. **获取 Client ID 和 Secret**
   - 复制显示的 Client ID 和 Client Secret

### 第二步：在 Netlify 配置

1. **进入 Identity 设置**
   - 在 Netlify 站点 → Identity → Settings and usage

2. **配置 Google Provider**
   - 滚动到 "External providers"
   - 点击 "Google"
   - 粘贴 Client ID 和 Client Secret
   - 点击 "Save"

## ✅ 测试登录

### 配置完成后测试

1. **访问您的站点**
   - 打开：https://your-site.netlify.app

2. **测试 GitHub 登录**
   - 点击登录按钮
   - 选择 GitHub 登录
   - 授权应用
   - 应该成功登录并显示头像

3. **测试 Google 登录**
   - 选择 Google 登录
   - 选择 Google 账号
   - 应该成功登录

## ⚠️ 常见问题

### 问题 1: 回调 URL 不匹配
**错误**: `redirect_uri_mismatch`
**解决**: 确保 GitHub/Google 中配置的回调 URL 完全匹配 Netlify 站点 URL

### 问题 2: 登录失败
**解决**: 
- 检查 Client ID 和 Secret 是否正确
- 等待 5 分钟让配置生效
- 清除浏览器缓存
- 使用无痕模式测试

### 问题 3: Identity 不可用
**解决**: 
- 确保已启用 Identity 服务
- 检查 Netlify 部署状态
- 重新部署站点

## 🔧 环境变量配置（可选）

如果需要，可以在 Netlify 配置环境变量：

1. 进入 Site settings → Build & deploy → Environment
2. 添加以下变量：

```bash
# GitHub OAuth
GITHUB_CLIENT_ID=your_client_id
GITHUB_CLIENT_SECRET=your_client_secret

# Google OAuth
GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CLIENT_SECRET=your_client_secret
```

## 📞 需要帮助？

配置过程中遇到问题：
1. 检查错误信息
2. 查看 Netlify 部署日志
3. 查看浏览器控制台
4. 参考官方文档
