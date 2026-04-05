---
title: 密钥管理
description: Claude Code 企业级密钥管理最佳实践
---

# 密钥管理

在企业环境中，正确管理 API 密钥和敏感信息至关重要。

## 禁止做法 ❌

```bash
# 绝对不要这样做！

# 1. 硬编码密钥
ANTHROPIC_API_KEY = "sk-ant-xxxxx"  # ❌

# 2. 提交 .env 到 Git
git add .env  # ❌

# 3. 在日志中打印密钥
echo "Using key: $ANTHROPIC_API_KEY"  # ❌

# 4. 在 CLAUDE.md 中存储密钥
# API Key: sk-ant-xxxxx  # ❌
```

## 推荐做法 ✅

### 1. 环境变量

```bash
# ~/.zshrc 或 ~/.bashrc
export ANTHROPIC_API_KEY="sk-ant-xxxxx"

# 或使用 .env 文件（不提交到 Git）
echo ".env" >> .gitignore
echo "ANTHROPIC_API_KEY=sk-ant-xxxxx" > .env
```

### 2. 密钥管理服务

**AWS Secrets Manager:**
```bash
# 获取密钥
export ANTHROPIC_API_KEY=$(aws secretsmanager get-secret-value \
  --secret-id claude-code-api-key \
  --query SecretString \
  --output text)
```

**HashiCorp Vault:**
```bash
# 获取密钥
export ANTHROPIC_API_KEY=$(vault kv get -field=api_key secret/claude-code)
```

**1Password CLI:**
```bash
# 获取密钥
export ANTHROPIC_API_KEY=$(op read "op://Private/Anthropic API Key/api_key")
```

### 3. 团队共享

使用 `.env.example` 模板：

```bash
# .env.example（提交到 Git）
ANTHROPIC_API_KEY=your-api-key-here
GITHUB_TOKEN=your-github-token-here

# 团队成员复制并填写
cp .env.example .env
# 编辑 .env 填入真实密钥
```

## Hooks 密钥检测

### Pre-commit Hook

创建 `.git/hooks/pre-commit`:

```bash
#!/bin/bash

# 检测可能的密钥
PATTERNS=(
  "sk-ant-[a-zA-Z0-9]{20,}"
  "sk-proj-[a-zA-Z0-9]{20,}"
  "ghp_[a-zA-Z0-9]{36}"
  "gho_[a-zA-Z0-9]{36}"
  "github_pat_[a-zA-Z0-9]{22}_[a-zA-Z0-9]{59}"
  "-----BEGIN (RSA |EC |DSA )?PRIVATE KEY-----"
  "api[_-]?key.*=.*['\"][a-zA-Z0-9]{20,}['\"]"
  "secret.*=.*['\"][a-zA-Z0-9]{20,}['\"]"
  "password.*=.*['\"][^'\"]{8,}['\"]"
)

FILES=$(git diff --cached --name-only)

for FILE in $FILES; do
  if [ -f "$FILE" ]; then
    for PATTERN in "${PATTERNS[@]}"; do
      if grep -qE "$PATTERN" "$FILE"; then
        echo "❌ Potential secret found in $FILE"
        echo "   Pattern: $PATTERN"
        echo ""
        echo "Please remove the secret or use environment variables."
        exit 1
      fi
    done
  fi
done

exit 0
```

### Claude Code Hook

在 `settings.json` 中配置：

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Write|Edit",
        "command": "bash -c 'if echo \"$TOOL_INPUT\" | grep -qE \"sk-ant-|api.key|secret\"; then echo \"Blocked: potential secret in content\"; exit 2; fi'"
      }
    ]
  }
}
```

## 密钥轮换

### 定期轮换策略

```bash
# 1. 生成新密钥（在 Anthropic Console）

# 2. 更新环境变量
export ANTHROPIC_API_KEY_NEW="sk-ant-new-xxxxx"

# 3. 测试新密钥
claude -p "test" --api-key "$ANTHROPIC_API_KEY_NEW"

# 4. 切换到新密钥
export ANTHROPIC_API_KEY="$ANTHROPIC_API_KEY_NEW"

# 5. 吊销旧密钥（在 Anthropic Console）
```

### 自动化轮换脚本

```bash
#!/bin/bash
# rotate-key.sh

OLD_KEY="$ANTHROPIC_API_KEY"
NEW_KEY="$1"

if [ -z "$NEW_KEY" ]; then
  echo "Usage: ./rotate-key.sh <new-api-key>"
  exit 1
fi

# 测试新密钥
if claude -p "Connection test" --api-key "$NEW_KEY" 2>/dev/null; then
  # 更新配置文件
  if [ -f ~/.zshrc ]; then
    sed -i.bak "s|export ANTHROPIC_API_KEY=.*|export ANTHROPIC_API_KEY=\"$NEW_KEY\"|" ~/.zshrc
    source ~/.zshrc
  fi
  
  echo "✅ Key rotated successfully"
  echo "⚠️  Remember to revoke old key in Anthropic Console"
else
  echo "❌ New key validation failed"
  exit 1
fi
```

## CI/CD 密钥管理

### GitHub Actions

```yaml
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      
      - name: Use API Key
        env:
          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
        run: |
          # 密钥自动注入环境变量
          claude -p "Review code"
```

### GitLab CI

```yaml
variables:
  ANTHROPIC_API_KEY: $ANTHROPIC_API_KEY  # 从 CI/CD 变量读取

job:
  script:
    - claude -p "Review code"
```

## 审计日志

### 启用使用日志

```bash
# 查看最近的 API 使用
claude /stats

# 导出使用报告
claude --export-usage > usage-report.json
```

### 监控异常使用

```bash
#!/bin/bash
# monitor-usage.sh

# 检查日使用量是否超过阈值
DAILY_LIMIT=10000  # 美分
USAGE=$(claude /cost --today 2>/dev/null | grep -oP '\d+' | head -1)

if [ "$USAGE" -gt "$DAILY_LIMIT" ]; then
  echo "⚠️  Daily usage exceeds limit: \$$((USAGE/100))"
  # 发送告警
  # curl -X POST $SLACK_WEBHOOK -d "{\"text\": \"Claude Code daily usage alert: \$$((USAGE/100))\"}"
fi
```

## 最佳实践清单

- [ ] 所有密钥使用环境变量
- [ ] `.env` 文件已添加到 `.gitignore`
- [ ] Pre-commit hook 检测密钥泄露
- [ ] 使用 `.env.example` 模板
- [ ] 定期轮换密钥（建议每月）
- [ ] CI/CD 使用加密的 Secrets
- [ ] 启用使用监控和告警
- [ ] 记录密钥使用审计日志

## 应急响应

### 密钥泄露处理流程

1. **立即吊销**泄露的密钥
2. **生成新密钥**并更新所有环境
3. **审查日志**检查异常使用
4. **通知团队**更新本地配置
5. **记录事件**以便后续分析

```bash
# 快速吊销流程
# 1. 登录 Anthropic Console
# 2. 导航到 API Keys
# 3. 点击 Revoke

# 紧急更新所有环境
./rotate-key.sh sk-ant-new-emergency-key
```

## 相关资源

- [审计日志配置](./audit.md)
- [CI/CD 集成](../cicd/github-actions.md)
- [安全最佳实践](./compliance.md)