---
title: GitLab CI 集成
description: 将 Claude Code 集成到 GitLab CI/CD 流水线
---

# GitLab CI 集成

将 Claude Code 集成到 GitLab CI/CD，实现自动化代码审查和质量检查。

## 基础配置

### 1. 设置 CI/CD 变量

在 GitLab 项目设置中添加变量：

```
Settings → CI/CD → Variables → Expand → Add variable
```

- **Key:** `ANTHROPIC_API_KEY`
- **Value:** 你的 API 密钥
- **Type:** Masked（推荐勾选 Protected）

### 2. 创建 .gitlab-ci.yml

```yaml
# .gitlab-ci.yml
stages:
  - review
  - test
  - deploy

variables:
  NODE_VERSION: "20"

.claude-base:
  image: node:${NODE_VERSION}
  before_script:
    - npm install -g @anthropic-ai/claude-code
    - apt-get update && apt-get install -y git

# 代码审查任务
claude-review:
  extends: .claude-base
  stage: review
  script:
    - |
      claude -p "Review the changes in this MR for:
      1. Security vulnerabilities (OWASP Top 10)
      2. Code quality issues
      3. Performance concerns
      4. Test coverage gaps
      
      Output findings grouped by severity." > review-report.md
  artifacts:
    paths:
      - review-report.md
    expire_in: 1 week
  rules:
    - if: $CI_PIPELINE_SOURCE == "merge_request_event"

# 安全扫描
security-scan:
  extends: .claude-base
  stage: review
  script:
    - |
      claude -p "Scan for security issues:
      - Hardcoded secrets
      - SQL injection risks
      - XSS vulnerabilities
      - Authentication bypasses
      
      Return 'PASS' if no critical issues, 'FAIL' otherwise." > security-result.txt
    - |
      if grep -q "FAIL" security-result.txt; then
        echo "Critical security issues found"
        exit 1
      fi
  rules:
    - if: $CI_PIPELINE_SOURCE == "merge_request_event"
      changes:
        - auth/**/*
        - "**/security/**/*"
        - "**/*.env*"
```

## 高级配置

### 多阶段审查流水线

```yaml
stages:
  - lint
  - security
  - review
  - test
  - deploy

variables:
  NODE_VERSION: "20"
  REVIEW_MODEL: "claude-sonnet-4.6"

# 快速 lint 检查
lint:
  image: node:${NODE_VERSION}
  stage: lint
  script:
    - npm ci
    - npm run lint
  rules:
    - if: $CI_PIPELINE_SOURCE == "merge_request_event"

# 安全审计
security-audit:
  image: node:${NODE_VERSION}
  stage: security
  script:
    - npm install -g @anthropic-ai/claude-code
    - |
      claude -p "Perform security audit on:
      - Authentication flow
      - Data validation
      - API endpoints
      - Database queries
      
      Check for OWASP Top 10 vulnerabilities.
      Output JSON format with severity levels." > security-audit.json
  artifacts:
    reports:
      sast: security-audit.json
    expire_in: 1 week
  rules:
    - if: $CI_PIPELINE_SOURCE == "merge_request_event"

# AI 代码审查
ai-review:
  image: node:${NODE_VERSION}
  stage: review
  script:
    - npm install -g @anthropic-ai/claude-code
    # 获取变更文件
    - |
      CHANGED_FILES=$(git diff --name-only origin/${CI_MERGE_REQUEST_TARGET_BRANCH_NAME} ${CI_COMMIT_SHA})
      echo "Changed files: $CHANGED_FILES"
    # 运行审查
    - |
      claude -p "Review these changed files:
      ${CHANGED_FILES}
      
      Focus on:
      1. Code correctness
      2. Best practices
      3. Maintainability
      
      Provide inline comments in GitLab format." > review-comments.json
  artifacts:
    paths:
      - review-comments.json
    expire_in: 1 week
  needs:
    - lint
    - security-audit
  rules:
    - if: $CI_PIPELINE_SOURCE == "merge_request_event"

# 自动生成文档
generate-docs:
  image: node:${NODE_VERSION}
  stage: deploy
  script:
    - npm install -g @anthropic-ai/claude-code
    - |
      claude --permission-mode acceptEdits \
        "Generate API documentation for all exported functions in src/api/.
        Update docs/api-reference.md following the existing format."
  rules:
    - if: $CI_COMMIT_BRANCH == "main"
      changes:
        - src/api/**/*
  artifacts:
    paths:
      - docs/
```

### 自动 MR 评论

```yaml
post-review-comment:
  image: node:${NODE_VERSION}
  stage: .post
  script:
    - |
      # 读取审查报告
      REVIEW_CONTENT=$(cat review-report.md)
      
      # 发布到 MR
      curl -X POST \
        "${CI_API_V4_URL}/projects/${CI_PROJECT_ID}/merge_requests/${CI_MERGE_REQUEST_IID}/notes" \
        -H "PRIVATE-TOKEN: ${GITLAB_TOKEN}" \
        -H "Content-Type: application/json" \
        -d "{\"body\": \"## Claude Code Review\n\n${REVIEW_CONTENT}\"}"
  needs:
    - ai-review
  rules:
    - if: $CI_PIPELINE_SOURCE == "merge_request_event"
```

## 条件执行

### 按文件类型触发

```yaml
# 前端审查
frontend-review:
  image: node:${NODE_VERSION}
  stage: review
  script:
    - npm install -g @anthropic-ai/claude-code
    - |
      claude -p "Review frontend changes for:
      - Accessibility (WCAG 2.1)
      - Performance (Core Web Vitals)
      - Component structure
      - State management patterns"
  rules:
    - if: $CI_PIPELINE_SOURCE == "merge_request_event"
      changes:
        - "src/**/*.tsx"
        - "src/**/*.css"
        - "src/**/*.scss"

# 后端审查
backend-review:
  image: node:${NODE_VERSION}
  stage: review
  script:
    - npm install -g @anthropic-ai/claude-code
    - |
      claude -p "Review backend changes for:
      - API design
      - Database queries
      - Error handling
      - Security best practices"
  rules:
    - if: $CI_PIPELINE_SOURCE == "merge_request_event"
      changes:
        - "api/**/*"
        - "services/**/*"
        - "**/*.sql"
```

### 按标签触发

```yaml
# 只在标记 'needs-review' 时运行
tagged-review:
  image: node:${NODE_VERSION}
  stage: review
  script:
    - npm install -g @anthropic-ai/claude-code
    - claude -p "Comprehensive review of all changes"
  rules:
    - if: $CI_PIPELINE_SOURCE == "merge_request_event"
      if: $CI_MERGE_REQUEST_LABELS =~ /needs-review/
```

## 成本优化

### 使用缓存

```yaml
variables:
  CACHE_KEY: "claude-cache-${CI_COMMIT_REF_SLUG}"

review-with-cache:
  image: node:${NODE_VERSION}
  stage: review
  cache:
    key: ${CACHE_KEY}
    paths:
      - .claude-cache/
  script:
    - npm install -g @anthropic-ai/claude-code
    - |
      # 检查缓存
      if [ -f ".claude-cache/review-result.json" ]; then
        CACHE_HASH=$(cat .claude-cache/hash.txt)
        CURRENT_HASH=$(git rev-parse HEAD)
        if [ "$CACHE_HASH" = "$CURRENT_HASH" ]; then
          echo "Using cached review"
          cat .claude-cache/review-result.json
          exit 0
        fi
      fi
      
      # 运行审查
      claude -p "Review changes" > .claude-cache/review-result.json
      git rev-parse HEAD > .claude-cache/hash.txt
```

### 限制并发

```yaml
# 串行执行，避免 API 限流
review-serial:
  image: node:${NODE_VERSION}
  stage: review
  script:
    - npm install -g @anthropic-ai/claude-code
    - |
      # 分批处理大文件
      for file in $(git diff --name-only origin/main | head -10); do
        claude -p "Review $file" --max-tokens 1000
        sleep 1  # 避免 rate limit
      done
  rules:
    - if: $CI_PIPELINE_SOURCE == "merge_request_event"
```

## 故障排查

### 调试模式

```yaml
debug-review:
  image: node:${NODE_VERSION}
  stage: review
  variables:
    DEBUG: "claude:*"
  script:
    - npm install -g @anthropic-ai/claude-code
    - claude --verbose -p "Review code" 2>&1 | tee debug.log
  artifacts:
    paths:
      - debug.log
    when: always  # 即使失败也保存日志
  rules:
    - if: $CI_PIPELINE_SOURCE == "merge_request_event"
      when: manual  # 手动触发调试
```

### API 错误处理

```yaml
resilient-review:
  image: node:${NODE_VERSION}
  stage: review
  script:
    - npm install -g @anthropic-ai/claude-code
    - |
      RETRY_COUNT=0
      MAX_RETRIES=3
      
      while [ $RETRY_COUNT -lt $MAX_RETRIES ]; do
        if claude -p "Review code" > review.md 2>&1; then
          echo "Review completed"
          exit 0
        fi
        
        RETRY_COUNT=$((RETRY_COUNT + 1))
        echo "Attempt $RETRY_COUNT failed, retrying in 30s..."
        sleep 30
      done
      
      echo "Review failed after $MAX_RETRIES attempts"
      exit 1
  rules:
    - if: $CI_PIPELINE_SOURCE == "merge_request_event"
```

## 完整示例

```yaml
# 完整的 GitLab CI 配置
stages:
  - lint
  - security
  - review
  - test
  - docs
  - deploy

variables:
  NODE_VERSION: "20"
  ANTHROPIC_API_KEY: $ANTHROPIC_API_KEY

# Lint 检查
lint:
  image: node:${NODE_VERSION}
  stage: lint
  script:
    - npm ci
    - npm run lint
  cache:
    paths:
      - node_modules/

# 安全扫描
security:
  image: node:${NODE_VERSION}
  stage: security
  script:
    - npm install -g @anthropic-ai/claude-code
    - claude -p "Security scan" > security.md
  artifacts:
    paths:
      - security.md

# AI 审查
review:
  image: node:${NODE_VERSION}
  stage: review
  script:
    - npm install -g @anthropic-ai/claude-code
    - claude -p "Review MR" > review.md
  artifacts:
    paths:
      - review.md
  needs: ["lint", "security"]

# 发布评论
comment:
  image: alpine:latest
  stage: .post
  script:
    - apk add curl
    - |
      curl -X POST \
        "${CI_API_V4_URL}/projects/${CI_PROJECT_ID}/merge_requests/${CI_MERGE_REQUEST_IID}/notes" \
        -H "PRIVATE-TOKEN: ${GITLAB_TOKEN}" \
        -d "{\"body\": \"$(cat review.md | sed 's/"/\\"/g' | tr '\n' '\\n')\"}"
  needs: ["review"]
```

## 相关资源

- [GitHub Actions 集成](./github-actions.md)
- [Jenkins 集成](./jenkins.md)
- [安全扫描配置](../security/audit.md)