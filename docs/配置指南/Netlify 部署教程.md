# 🚀 Netlify 网站部署教程（永久网址）

## 问题说明

Netlify Drop 临时部署的网址只能存在 1 小时且有密码。

**解决方案**：使用 Netlify 正式账号部署，获得**永久、公开、免费**的网址。

***

## 📝 详细部署步骤

### 步骤 1：访问 Netlify 官网

打开浏览器访问：

```
https://app.netlify.com
```

***

### 步骤 2：注册/登录账号

1. 点击 **"Sign up"** 或 **"Log in"**
2. 选择 **"Continue with GitHub"**（推荐）
   - 或者使用邮箱注册
3. 授权 Netlify 访问你的 GitHub 账号

**为什么用 GitHub 登录？**

- ✅ 更安全
- ✅ 更方便
- ✅ 以后可以自动部署

***

### 步骤 3：创建新站点

1. 登录后，点击 **"Add new site"**
2. 选择 **"Deploy manually"**（手动部署）

***

### 步骤 4：上传 dist 文件夹

1. 打开**访达（Finder）**
2. 找到你的 `dist` 文件夹，位置：
   ```
   /Users/pinkocean/Desktop/开发/Round table/ai-forum/dist
   ```
3. 将 `dist` 文件夹**拖拽**到 Netlify 网页上的虚线框内
4. 等待上传完成（约 10-30 秒）

***

### 步骤 5：获取永久网址

部署完成后，你会看到：

- 绿色的 **"Site deployed"** 提示
- 你的永久网址，例如：
  ```
  https://yuanzhuo-xxx.netlify.app
  ```

**点击网址即可访问！**

***

### 步骤 6：（可选）修改网址名称

1. 点击 **"Site settings"**
2. 点击 **"Change site name"**
3. 输入你想要的名称，例如：`yuanzhuo`
4. 保存后，网址变为：
   ```
   https://yuanzhuo.netlify.app
   ```

***

## ✅ 部署完成后的优势

### 你的网址将：

- ✅ **永久存在**（只要账号存在）
- ✅ **完全公开**（无需密码）
- ✅ **免费 HTTPS**（安全连接）
- ✅ **全球 CDN**（访问速度快）
- ✅ **免费带宽**（个人使用足够）
- ✅ **自动更新**（重新拖拽 dist 文件夹即可）

***

## 🔄 如何更新网站？

当你修改代码后：

1. **重新构建**：
   ```bash
   cd /Users/pinkocean/Desktop/开发/Round\ table/ai-forum
   npm run build
   ```
2. **重新部署**：
   - 打开 Netlify 网站
   - 进入你的项目
   - 将新的 `dist` 文件夹拖拽到上传区域
   - 或者点击 "Deploys" → "Deploy manually"

***

## 📱 分享你的网站

部署完成后，你可以：

- ✅ 通过微信、QQ 分享网址
- ✅ 发布到朋友圈
- ✅ 在微博、知乎等平台分享
- ✅ 添加到浏览器书签
- ✅ 在手机、平板上访问

***

## 🎯 快速总结

### 最简单的流程：

1. **访问**：[c](https://app.netlify.com)
2. **登录**：使用 GitHub 账号
3. **创建**：Add new site → Deploy manually
4. **上传**：拖拽 dist 文件夹
5. **完成**：获得永久网址

***

## 💡 提示

### 如果 dist 文件夹不存在：

先运行构建命令：

```bash
cd /Users/pinkocean/Desktop/开发/Round\ table/ai-forum
npm run build
```

### 如果找不到 dist 文件夹：

在访达中：

1. 按 `Cmd + Shift + G`
2. 输入路径：
   ```
   /Users/pinkocean/Desktop/开发/Round table/ai-forum/dist
   ```
3. 点击前往

***

## 🔒 安全说明

### Netlify 是安全可靠的：

- ✅ 上市公司，行业领导者
- ✅ 无数开源项目在使用
- ✅ 自动 HTTPS 加密
- ✅ 专业安全保护
- ✅ 不会查看你的代码

### 你的数据是安全的：

- 部署的只是**编译后的文件**（HTML/CSS/JS）
- **不会泄露**源代码
- **不会泄露**API 密钥（如果使用环境变量）

***

## 📞 遇到问题？

### 常见问题：

**Q: 网址真的永久吗？**
A: 是的，只要你的 Netlify 账号存在，网址就永久有效。

**Q: 需要付费吗？**
A: 个人使用完全免费，额度非常充足。

**Q: 可以绑定自己的域名吗？**
A: 可以，在 Site settings → Domain management 中配置。

**Q: 如何删除网站？**
A: 在 Site settings → Danger zone → Delete site。

***

**开始部署吧！** 🚀

只需 5 分钟，你就会有一个永久的、公开的网址！
