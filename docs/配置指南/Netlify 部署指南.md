# Netlify 部署指南

## 📦 使用部署脚本

### 一键部署

```bash
cd "/Users/pinkocean/Desktop/开发/Round table/ai-forum"
chmod +x deploy.sh
./deploy.sh
```

### 脚本功能

1. **检查 Git 状态** - 确保是 Git 仓库
2. **构建项目** - 执行 `npm run build`
3. **提交更改** - 询问是否提交并推送
4. **推送到 GitHub** - 自动推送到您的仓库
5. **Netlify 自动部署** - GitHub 推送后自动触发

## 🚀 手动部署步骤

### 1. 推送到 GitHub

```bash
git add .
git commit -m "Deploy to Netlify"
git push origin main
```

### 2. 在 Netlify 配置

1. 访问 https://app.netlify.com
2. 点击 "Add new site" → "Import an existing project"
3. 选择 GitHub
4. 授权 Netlify 访问您的 GitHub
5. 选择 "Round-table" 仓库
6. 配置构建设置：
   - **Branch to deploy**: main
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
7. 点击 "Deploy site"

### 3. 启用 Identity

1. 进入 Site settings → Identity
2. 点击 "Enable Identity"
3. 在 Registration preferences 选择注册方式

### 4. 配置 OAuth（可选）

1. Site settings → Identity → External providers
2. 添加 GitHub、Google 等 OAuth 提供商

## 📁 项目结构

```
ai-forum/
├── netlify.toml          # Netlify 配置文件
├── deploy.sh             # 部署脚本
├── src/                  # 源代码
├── netlify/functions/    # Netlify 函数
└── dist/                 # 构建输出（自动生成）
```

## ⚙️ netlify.toml 配置

```toml
[build]
  command = "npm run build"
  publish = "dist"

[functions]
  directory = "netlify/functions"

[identity]
  enabled = true

[identity.external_providers]
  github = true
  google = true
```

## 🌐 部署后的 URL

部署完成后，Netlify 会生成以下格式的 URL：

```
https://your-site-name.netlify.app
```

### 自定义域名（可选）

1. 进入 Site settings → Domain management
2. 点击 "Add custom domain"
3. 输入您的域名
4. 按照提示配置 DNS

## 🔄 自动部署流程

```
推送代码到 GitHub
    ↓
Netlify 检测到推送
    ↓
自动拉取代码
    ↓
执行 npm install
    ↓
执行 npm run build
    ↓
部署到 CDN
    ↓
更新网站
```

## 📊 查看部署状态

1. 访问 https://app.netlify.com
2. 选择您的站点
3. 查看 "Deploys" 标签页
4. 可以看到：
   - 部署历史
   - 部署状态
   - 部署日志
   - 回滚选项

## 🐛 故障排除

### 部署失败

**检查构建日志**
```bash
# 在 Netlify 控制台查看
Site → Deploys → 点击失败的部署 → 查看日志
```

**常见问题**
- 依赖安装失败 → 检查 package.json
- 构建命令错误 → 检查 netlify.toml
- 环境变量缺失 → 在 Netlify 后台添加

### Identity 无法使用

**确保已启用**
1. Site settings → Identity
2. 确认显示 "Enable Identity" 按钮已点击

**检查 API 端点**
- Identity API: `https://your-site.netlify.app/.netlify/identity`

### 函数无法调用

**检查函数目录**
- 确保函数在 `netlify/functions/` 目录下

**查看函数日志**
1. Site → Functions
2. 点击函数名称
3. 查看日志

## 📝 部署检查清单

- [ ] 代码已推送到 GitHub
- [ ] Netlify 已连接 GitHub 仓库
- [ ] 构建命令配置正确
- [ ] Identity 服务已启用
- [ ] OAuth 提供商已配置（如需要）
- [ ] 环境变量已设置（如需要）
- [ ] 测试登录功能
- [ ] 测试数据同步

## 🎯 最佳实践

### 1. 使用环境变量

```bash
# 在 Netlify 后台设置
Site settings → Build & deploy → Environment
```

### 2. 分支部署

- **main 分支** → 生产环境
- **develop 分支** → 预览环境（可选）

### 3. 部署通知

- 启用邮件通知
- 配置 Slack 通知（可选）

### 4. 性能优化

- 启用 CDN 缓存
- 配置缓存策略
- 使用增量构建

## 📞 获取帮助

### Netlify 文档
- https://docs.netlify.com

### 社区支持
- Netlify Forums: https://answers.netlify.com
- GitHub Issues

### 查看部署日志
```bash
# 在 Netlify 控制台
Deploys → 点击部署 → 查看日志
```
