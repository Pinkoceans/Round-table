#!/bin/bash

# 圆桌项目清理脚本
# 用于删除不必要的文档文件，方便上传到 GitHub

echo "🔍 圆桌项目清理脚本"
echo "=================="
echo ""

# 获取脚本所在目录
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$SCRIPT_DIR"

echo "📂 当前目录：$SCRIPT_DIR"
echo ""

# 检查 docs 文件夹是否存在
if [ -d "docs" ]; then
    echo "📁 发现 docs 文件夹（包含开发文档）"
    echo ""
    echo "选项："
    echo "1. 删除 docs 文件夹（推荐）"
    echo "2. 移动到项目外备份"
    echo "3. 保留不处理"
    echo ""
    read -p "请选择 (1/2/3): " choice
    
    case $choice in
        1)
            echo ""
            echo "⚠️  确定要删除 docs 文件夹吗？此操作不可恢复！"
            read -p "确认删除？(y/n): " confirm
            if [ "$confirm" = "y" ]; then
                rm -rf docs
                echo "✅ docs 文件夹已删除"
            else
                echo "❌ 取消删除操作"
            fi
            ;;
        2)
            PARENT_DIR="$(dirname "$SCRIPT_DIR")"
            BACKUP_NAME="ai-forum-docs-backup-$(date +%Y%m%d)"
            mv docs "$PARENT_DIR/$BACKUP_NAME"
            echo "✅ docs 已移动到：$PARENT_DIR/$BACKUP_NAME"
            ;;
        3)
            echo "⏭️  保留 docs 文件夹"
            ;;
        *)
            echo "❌ 无效选择，保留 docs 文件夹"
            ;;
    esac
else
    echo "ℹ️  docs 文件夹不存在，跳过"
fi

echo ""
echo "📋 检查其他不必要的文件..."

# 检查是否有其他临时文件
if [ -d ".git" ]; then
    echo "✅ 已初始化 Git 仓库"
else
    echo "⚠️  未检测到 Git 仓库"
fi

echo ""
echo "📊 当前项目结构："
echo "================"
ls -la

echo ""
echo "✅ 清理完成！"
echo ""
echo "📝 下一步："
echo "1. 检查 .gitignore 文件"
echo "2. 运行：git add ."
echo "3. 运行：git commit -m '初始提交'"
echo "4. 推送到 GitHub"
echo ""
