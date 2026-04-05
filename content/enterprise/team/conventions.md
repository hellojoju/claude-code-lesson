---
title: 团队约定模板
description: 团队统一的 Claude Code 配置和开发约定
---

# 团队约定模板

## 问题

如何在团队中统一 Claude Code 的使用方式和开发约定？

## 解决方案

创建团队共享的 CLAUDE.md 模板和配置文件，确保所有成员使用一致的工作方式。

### 团队 CLAUDE.md 模板

创建 `.claude/CLAUDE.md`（提交到仓库）：

```markdown
# [项目名称] 团队配置

## 项目概述

**技术栈：** TypeScript, React, Node.js, PostgreSQL
**包管理器：** pnpm
**测试框架：** Vitest + Playwright

## 代码规范

### 命名约定

| 类型 | 约定 | 示例 |
|------|------|------|
| 组件 | PascalCase | `UserProfile.tsx` |
| 函数 | camelCase | `getUserById()` |
| 常量 | UPPER_SNAKE_CASE | `MAX_RETRY_COUNT` |
| 文件 | kebab-case | `user-service.ts` |
| 目录 | kebab-case | `components/user-profile/` |

### 代码风格

- 使用 2 空格缩进
- 单引号优先
- 末尾无逗号
- 最大行宽 100 字符
- 函数最大 50 行
- 文件最大 800 行

### TypeScript 规则

- 严格模式开启
- 显式返回类型
- 避免 `any`，使用 `unknown` + 类型守卫
- 优先 `interface` 而非 `type`

## 测试要求

### 覆盖率标准

- 行覆盖率：≥ 80%
- 分支覆盖率：≥ 75%
- 关键路径：100%

### 测试组织

```
tests/
├── unit/           # 单元测试
├── integration/    # 集成测试
└── e2e/            # 端到端测试
```

### 测试命名

```typescript
describe('UserService', () => {
  describe('createUser', () => {
    it('should create user with valid data', () => {});
    it('should throw error with invalid email', () => {});
    it('should handle database connection failure', () => {});
  });
});
```

## Git 工作流

### 分支命名

- `feature/<ticket-id>-<description>` - 新功能
- `fix/<ticket-id>-<description>` - Bug 修复
- `refactor/<description>` - 重构
- `docs/<description>` - 文档更新

### 提交格式

```
<type>(<scope>): <description>

Types: feat, fix, refactor, docs, test, chore, perf, ci

示例:
feat(auth): add OAuth login support
fix(api): handle null response from database
refactor(utils): extract validation logic
```

### PR 检查清单

- [ ] 代码通过 lint 检查
- [ ] 测试覆盖率达标
- [ ] 无 TypeScript 错误
- [ ] 更新相关文档
- [ ] 关联 Issue

## Claude 使用约定

### 推荐命令

```bash
# 日常开发
/commit          # 提交代码
/review          # 代码审查
/test            # 运行测试

# 功能开发
/tdd <feature>   # TDD 工作流
/plan <task>     # 规划实现

# 调试
/debug <issue>   # 调试问题
/status          # 查看状态
```

### 禁止操作

- 不要直接修改 `.env` 文件
- 不要 force push 到 main 分支
- 不要在测试中跳过断言
- 不要提交 console.log

### 自动化工具

运行 `/setup-ci-cd` 配置：
- Pre-commit hooks
- GitHub Actions
- 自动化测试

## 文档约定

### README 结构

```markdown
# 功能名称

## 概述
## 安装
## 使用
## API 参考
## 示例
## 贡献
```

### 注释规范

```typescript
/**
 * 创建新用户
 * @param data - 用户数据
 * @returns 创建的用户对象
 * @throws {ValidationError} 数据验证失败时抛出
 * @example
 * const user = await createUser({ name: 'John', email: 'john@example.com' });
 */
export async function createUser(data: CreateUserDTO): Promise<User> {
  // 实现
}
```

## 性能标准

### API 响应时间

| 端点类型 | 目标 | 最大 |
|---------|------|------|
| 读取 | < 100ms | 500ms |
| 写入 | < 200ms | 1s |
| 搜索 | < 300ms | 2s |

### 前端指标

- FCP < 1.5s
- LCP < 2.5s
- CLS < 0.1

## 安全要求

### 代码审查重点

- [ ] 无硬编码密钥
- [ ] 输入验证完整
- [ ] SQL 参数化查询
- [ ] XSS 防护
- [ ] CSRF Token

### 敏感数据处理

- 使用环境变量存储密钥
- 日志不包含敏感信息
- 加密传输和存储

## 联系方式

**技术负责人：** @username
**问题反馈：** GitHub Issues
**紧急联系：** Slack #dev-channel
```

### 团队配置文件

创建 `.claude/settings.json`：

```json
{
  "permissions": {
    "allow": [
      "Read(*)",
      "Edit(*)",
      "Bash(npm *)",
      "Bash(pnpm *)",
      "Bash(git *)",
      "Bash(node *)"
    ],
    "deny": [
      "Bash(rm -rf /*)",
      "Bash(*:production*))"
    ]
  },
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Write|Edit",
        "command": "node scripts/check-secrets.js"
      }
    ],
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "command": "pnpm lint:fix $FILE_PATH"
      }
    ]
  }
}
```

## 快速部署脚本

创建 `scripts/setup-team-config.sh`：

```bash
#!/bin/bash

echo "🚀 设置团队配置..."

# 检查 Git
if [ ! -d ".git" ]; then
  echo "❌ 请在 Git 仓库中运行"
  exit 1
fi

# 创建目录
mkdir -p .claude/skills
mkdir -p .claude/hooks

# 下载团队模板
if [ -z "$TEAM_CONFIG_REPO" ]; then
  echo "⚠️  设置 TEAM_CONFIG_REPO 环境变量以使用自定义模板"
else
  git clone --depth 1 "$TEAM_CONFIG_REPO" /tmp/team-config
  cp -r /tmp/team-config/.claude/* .claude/
  rm -rf /tmp/team-config
fi

# 安装依赖
pnpm install

# 验证配置
echo ""
echo "✅ 团队配置完成"
echo ""
echo "下一步："
echo "1. 查看 .claude/CLAUDE.md 了解团队约定"
echo "2. 运行 /status 检查配置"
echo "3. 运行 /doctor 验证环境"
```

## 适用条件

| 团队规模 | 建议配置 |
|---------|---------|
| 1-2 人 | 简化版 CLAUDE.md |
| 3-10 人 | 完整团队模板 |
| 10+ 人 | 企业配置 + 自定义 Hooks |

## 注意事项

### 定期更新

- 每月审查 CLAUDE.md
- 根据项目演进更新约定
- 收集团队反馈优化配置

### 新成员入职

1. 克隆仓库
2. 运行配置脚本
3. 阅读 CLAUDE.md
4. 配置本地环境变量

### 冲突处理

- 个人偏好放在 `~/.claude/CLAUDE.md`
- 项目约定放在项目 `.claude/CLAUDE.md`
- 项目配置优先级高于个人配置

## 相关资源

- [代码审查流程](./review-flow.md)
- [知识库管理](./knowledge-base.md)
- [多项目管理](./multi-project.md)