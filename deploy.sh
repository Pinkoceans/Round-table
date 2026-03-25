#!/bin/bash

# 圆桌项目一键部署脚本 - Netlify 版本

echo "🚀 开始部署圆桌项目到 Netlify..."
echo ""

# 进入项目目录
cd /Users/pinkocean/Desktop/开发/Round\ table/ai-forum

# 检查 Git 状态
echo "📦 检查 Git 状态..."
git status

if [ $? -ne 0 ]; then
    echo ""
    echo "⚠️  当前目录不是 Git 仓库"
    echo "🔧 正在初始化 Git 仓库..."
    git init
    git add .
    git commit -m "Initial commit"
fi

echo ""
echo "🔨 开始构建项目..."
npm run build

if [ $? -ne 0 ]; then
    echo ""
    echo "❌ 构建失败，请检查错误信息"
    exit 1
fi

echo ""
echo "✅ 构建成功！"
echo ""
echo "📤 准备推送到 Git 仓库..."
echo ""
echo "💡 提示："
echo "   - 确保你的 GitHub 仓库已连接 Netlify"
echo "   - Netlify 会自动检测推送并重新部署"
echo "   - 访问 netlify.com 查看部署状态"
echo ""

# 添加所有更改
git add .

# 询问是否提交
read -p "是否提交更改并推送？(y/n) " -n 1 -r
echo ""

if [[ $REPLY =~ ^[Yy]$ ]]; then
    # 获取当前分支
    CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
    
    # 提交更改
    git commit -m "Deploy to Netlify - $(date '+%Y-%m-%d %H:%M:%S')"
    
    # 推送到 GitHub
    echo "🚀 推送到 GitHub..."
    git push origin $CURRENT_BRANCH
    
    echo ""
    echo "✅ 推送成功！"
    echo ""
    echo "🌐 Netlify 将自动部署您的应用"
    echo "📱 访问 netlify.com 查看部署进度"
    echo ""
    echo "🔗 部署完成后，您的应用网址格式："
    echo "   https://your-site-name.netlify.app"
else
    echo ""
    echo "⚠️  已取消推送"
    echo "💡 您可以稍后手动执行："
    echo "   git add ."
    echo "   git commit -m '你的提交信息'"
    echo "   git push"
fi

echo ""
echo "📝 下一步操作："
echo "   1. 在 Netlify 后台启用 Identity 服务"
echo "   2. 配置 OAuth 提供商（GitHub、Google 等）"
echo "   3. 等待 Netlify 自动部署完成"
echo ""
