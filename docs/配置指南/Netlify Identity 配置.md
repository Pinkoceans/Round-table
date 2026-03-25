# Netlify Identity 配置指南

## 启用 Netlify Identity

1. **登录 Netlify**
   - 访问 https://app.netlify.com
   - 登录你的账户

2. **选择你的站点**
   - 在 Netlify 仪表板中找到 "圆桌" 站点
   - 点击进入站点管理页面

3. **启用 Identity**
   - 点击左侧菜单的 "Identity"
   - 点击 "Enable Identity" 按钮
   - 等待 Identity 服务启用

4. **配置 Identity 设置**
   - 在 Identity 设置页面，点击 "Settings and usage"
   - 找到 "Registration" 部分
   - 选择 registration 选项：
     - **Open** (任何人可以注册) - 推荐用于公开部署
     - **Invite only** (仅邀请) - 推荐用于私人部署

5. **启用 Git Gateway（可选）**
   - 在 Identity 设置页面，找到 "Git Gateway"
   - 点击 "Enable Git Gateway"
   - 按照提示连接 GitHub 仓库

## 测试登录功能

1. **部署站点到 Netlify**
   ```bash
   git add .
   git commit -m "Add login functionality"
   git push origin main
   ```

2. **访问部署后的站点**
   - 打开你的 Netlify 站点 URL
   - 点击右上角的 "登录" 按钮

3. **注册账户**
   - 点击 "Sign up" 标签
   - 输入邮箱和密码
   - 点击注册

4. **验证邮箱**
   - 检查邮箱中的验证邮件
   - 点击验证链接

5. **登录**
   - 使用注册的邮箱和密码登录
   - 登录成功后，右上角会显示您的头像

## 数据同步说明

- **自动保存**：当您登录时，所有配置（AI 配置、话题、角色选择、对话设置）会自动保存到云端
- **跨设备同步**：在任何设备登录同一账户，都会自动加载您的配置
- **退出登录**：退出时会清除本地数据，保护隐私

## 故障排除

### 问题：登录按钮点击无反应
- 确保已在 Netlify 后台启用 Identity
- 检查浏览器控制台是否有错误信息

### 问题：无法收到验证邮件
- 检查垃圾邮件文件夹
- 确认邮箱地址正确
- 在 Netlify Identity 设置中重新发送验证邮件

### 问题：数据无法同步
- 确保已成功登录
- 检查网络连接
- 查看浏览器控制台的错误信息

## 安全提示

- 不要将敏感的 API 密钥提交到代码库
- 使用环境变量管理敏感配置
- 定期更新 Netlify 账户密码
