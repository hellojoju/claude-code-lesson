---
title: GitHub Actions 集成
description: 将 Claude Code 集成到 GitHub Actions 工作流
---

# GitHub Actions 集成

将 Claude Code 集成到 CI/CD 流水线，实现自动化代码审查和问题检测。

## 基础配置

### 1. 存储 API 密钥

在 GitHub 仓库设置中添加 Secret：

```
Settings → Secrets and variables → Actions → New repository secret
```

- **Name:** `ANTHROPIC_API_KEY`
- **Value:** 你的 API 密钥

### 2. 创建工作流文件

创建 `.github/workflows/claude-review.yml`:

```yaml
name: Claude Code Review

on:
  pull_request:
    types: [opened, synchronize]

jobs:
  review:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      pull-requests: write
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
        with:
          fetch-depth: 0
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
      
      - name: Install Claude Code
        run: npm install -g @anthropic-ai/claude-code
      
      - name: Get changed files
        id: changed-files
        run: |
          echo "files=$(git diff --name-only ${{ github.event.pull_request.base.sha }} ${{ github.event.pull_request.head.sha }} | tr '\n' ' ')" >> $GITHUB_OUTPUT
      
      - name: Run Claude Code Review
        env:
          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
        run: |
          claude -p "Review the following changed files for:
          1. Security vulnerabilities (OWASP Top 10)
          2. Performance issues
          3. Code style consistency
          4. Test coverage gaps
          
          Changed files: ${{ steps.changed-files.outputs.files }}
          
          Output findings as a markdown report with severity levels:
          - CRITICAL: Must fix before merge
          - HIGH: Should fix before merge
          - MEDIUM: Consider fixing
          - LOW: Minor suggestions" > review-report.md
      
      - name: Post Review Comment
        uses: actions/github-script@v7
        with:
          script: |
            const fs = require('fs');
            const report = fs.readFileSync('review-report.md', 'utf8');
            await github.rest.issues.createComment({
              owner: context.repo.owner,
              repo: context.repo.repo,
              issue_number: context.issue.number,
              body: `## Claude Code Review Report\n\n${report}`
            });
```

## 高级配置

### 按文件类型审查

```yaml
name: Claude Smart Review

on:
  pull_request:
    types: [opened, synchronize]

jobs:
  detect-changes:
    runs-on: ubuntu-latest
    outputs:
      security: ${{ steps.filter.outputs.security }}
      frontend: ${{ steps.filter.outputs.frontend }}
      backend: ${{ steps.filter.outputs.backend }}
    steps:
      - uses: actions/checkout@v4
      - uses: dorny/paths-filter@v3
        id: filter
        with:
          filters: |
            security:
              - 'auth/**'
              - '**/security/**'
              - '**/*.env*'
            frontend:
              - 'src/**/*.tsx'
              - 'src/**/*.css'
            backend:
              - 'api/**'
              - 'services/**'

  security-review:
    needs: detect-changes
    if: needs.detect-changes.outputs.security == 'true'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Security Review
        env:
          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
        run: |
          claude -p "Perform security audit on authentication and security-related files. Check for:
          - Hardcoded secrets
          - Authentication bypasses
          - SQL injection risks
          - XSS vulnerabilities
          - CSRF protection" | tee security-report.md

  frontend-review:
    needs: detect-changes
    if: needs.detect-changes.outputs.frontend == 'true'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Frontend Review
        env:
          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
        run: |
          claude -p "Review frontend changes for:
          - Accessibility issues
          - Performance optimizations
          - Component structure
          - State management patterns" | tee frontend-report.md
```

### 阻断式审查

设置必须通过的检查：

```yaml
name: Claude Security Gate

on:
  pull_request:
    types: [opened, synchronize]

jobs:
  security-check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Security Scan
        env:
          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
        run: |
          # Run security scan and check for CRITICAL issues
          claude -p "Scan for CRITICAL security issues. Return 'PASS' if no critical issues, 'FAIL' otherwise." > result.txt
          if grep -q "FAIL" result.txt; then
            echo "::error::Critical security issues found"
            exit 1
          fi
```

## 模板库

### 模板 1：完整 PR 审查

```yaml
# .github/workflows/pr-review.yml
name: PR Review

on: pull_request

jobs:
  review:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Claude Review
        env:
          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
        run: |
          claude --permission-mode acceptEdits \
            "Review this PR thoroughly:
            1. Check CLAUDE.md for project conventions
            2. Review all changed files
            3. Suggest improvements inline
            4. Create a summary comment"
```

### 模板 2：预提交检查

```yaml
# .github/workflows/pre-commit.yml
name: Pre-commit Checks

on: push

jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Lint Check
        run: npm run lint
      
      - name: Claude Style Check
        env:
          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
        run: |
          claude -p "Check if changed files follow project style guide from @CLAUDE.md. Report any violations."
```

### 模板 3：自动文档生成

```yaml
# .github/workflows/docs.yml
name: Update Documentation

on:
  push:
    branches: [main]
    paths: ['src/**']

jobs:
  docs:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Generate API Docs
        env:
          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
        run: |
          claude --permission-mode acceptEdits \
            "Generate API documentation for all exported functions in src/api/. Update docs/api-reference.md"
      
      - name: Commit Docs
        run: |
          git config user.name "Claude Bot"
          git config user.email "claude@example.com"
          git add docs/
          git diff --quiet && git diff --staged --quiet || git commit -m "docs: update API documentation"
          git push
```

## 成本控制

### 限制运行频率

```yaml
on:
  pull_request:
    types: [opened, synchronize, labeled]  # 只在添加特定标签时运行

jobs:
  review:
    if: contains(github.event.pull_request.labels.*.name, 'needs-review')
```

### 缓存结果

```yaml
- name: Cache Claude Analysis
  uses: actions/cache@v4
  with:
    path: .claude-cache
    key: claude-${{ hashFiles('src/**') }}
```

## 最佳实践

1. **明确审查范围**：指定具体的文件或目录
2. **设置超时**：避免长时间运行
3. **错误处理**：优雅处理失败情况
4. **结果缓存**：避免重复分析

## 故障排查

### API 密钥问题

```yaml
- name: Verify API Key
  run: |
    if [ -z "${{ secrets.ANTHROPIC_API_KEY }}" ]; then
      echo "::error::ANTHROPIC_API_KEY secret not set"
      exit 1
    fi
```

### 超时问题

```yaml
- name: Claude Review
  timeout-minutes: 10
  env:
    ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
  run: |
    claude -p "Quick review of changed files" --max-tokens 2000
```

## 相关资源

- [GitLab CI 集成](./gitlab-ci.md)
- [Jenkins 集成](./jenkins.md)
- [安全扫描配置](../security/audit.md)