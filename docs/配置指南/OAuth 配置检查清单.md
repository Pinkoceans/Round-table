# OAuth 配置检查清单

## 📋 配置前检查

### 1. Netlify 站点信息
- [ ] 我有 Netlify 账号
- [ ] 我的代码已推送到 GitHub
- [ ] Netlify 已连接 GitHub 仓库
- [ ] 站点已部署（可以访问）
- [ ] 我的站点 URL 是：_____________________

### 2. Identity 服务状态
- [ ] 访问 Netlify 控制台
- [ ] 进入我的站点
- [ ] 点击左侧 "Identity"
- [ ] Identity 已启用（如果没有，点击 "Enable Identity"）

## 🔧 GitHub OAuth 配置

### 在 GitHub 配置
- [ ] 访问 https://github.com/settings/developers
- [ ] 点击 "New OAuth App"
- [ ] Application name 填写：`圆桌`
- [ ] Homepage URL 填写：`https://你的站点名.netlify.app`
- [ ] Callback URL 填写：`https://你的站点名.netlify.app/.netlify/identity`
- [ ] 点击 "Register application"
- [ ] 复制 Client ID: _____________________
- [ ] 生成并复制 Client Secret: _____________________
- [ ] **重要**: 保存好这两个值！

### 在 Netlify 配置
- [ ] 回到 Netlify Identity 设置
- [ ] 滚动到 "External providers"
- [ ] 点击 "GitHub"
- [ ] 点击 "Install provider"
- [ ] 粘贴 Client ID
- [ ] 粘贴 Client Secret
- [ ] 点击 "Save"
- [ ] 等待 2-5 分钟生效

## 🔧 Google OAuth 配置（可选）

### 在 Google Cloud Console 配置
- [ ] 访问 https://console.developers.google.com/
- [ ] 创建新项目 "圆桌"
- [ ] 配置 OAuth 同意屏幕
- [ ] 创建 OAuth 2.0 客户端 ID
- [ ] 应用类型选择：Web application
- [ ] Authorized JavaScript origins: `https://你的站点名.netlify.app`
- [ ] Authorized redirect URIs: `https://你的站点名.netlify.app/.netlify/identity`
- [ ] 复制 Client ID: _____________________
- [ ] 复制 Client Secret: _____________________

### 在 Netlify 配置
- [ ] Identity → External providers → Google
- [ ] 粘贴 Client ID 和 Secret
- [ ] 保存

## ✅ 测试

### 测试 GitHub 登录
- [ ] 访问站点：https://你的站点名.netlify.app
- [ ] 点击右上角 "登录" 按钮
- [ ] 选择 GitHub 登录
- [ ] 授权应用
- [ ] ✅ 成功登录并显示头像

### 测试 Google 登录
- [ ] 选择 Google 登录
- [ ] 选择 Google 账号
- [ ] ✅ 成功登录

## 🐛 故障排除

### 如果 GitHub 登录失败
- [ ] 检查 Callback URL 是否完全匹配
- [ ] 检查 Client ID 和 Secret 是否正确
- [ ] 等待 5 分钟让配置生效
- [ ] 清除浏览器缓存
- [ ] 使用无痕模式测试

### 如果 Google 登录失败
- [ ] 检查 redirect URI 是否匹配
- [ ] 检查 OAuth 同意屏幕是否配置
- [ ] 检查 Client ID 和 Secret 是否正确
- [ ] 等待配置生效

## 📞 配置完成后的下一步

配置完成后，请告诉我：
1. GitHub 登录是否配置成功？
2. Google 登录是否配置成功？
3. 遇到了什么错误？（如果有的话）

我会帮您测试和解决问题！

## 💡 提示

- 配置 OAuth 大约需要 15-30 分钟
- 第一次配置可能需要更长时间
- 不要担心出错，可以随时重试
- 配置信息只在 Netlify 后台保存，很安全
