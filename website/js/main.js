// 主 JavaScript 文件 - Claude Code 中文教程网站

document.addEventListener('DOMContentLoaded', function() {
    // 初始化网站
    initWebsite();

    // 设置搜索功能
    setupSearch();

    // 加载目录结构
    loadDirectoryStructure();
});

function initWebsite() {
    console.log('Claude Code 中文教程网站已初始化');

    // 设置当前年份
    const yearElement = document.querySelector('footer p');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.innerHTML = yearElement.innerHTML.replace('2026', currentYear);
    }
}

function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');

    if (!searchInput || !searchBtn) return;

    // 搜索按钮点击事件
    searchBtn.addEventListener('click', performSearch);

    // 输入框回车事件
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
}

function performSearch() {
    const searchInput = document.getElementById('searchInput');
    const query = searchInput.value.trim();

    if (!query) {
        alert('请输入搜索关键词');
        return;
    }

    // 简单搜索功能 - 实际应连接后端API
    alert(`搜索功能开发中...\n搜索关键词: "${query}"\n\n在完整版中，这里将显示包含"${query}"的教程列表。`);

    // 清空搜索框
    searchInput.value = '';
}

function loadDirectoryStructure() {
    const directoryTree = document.getElementById('directoryTree');
    if (!directoryTree) return;

    // 模拟从服务器获取目录数据
    const directoryData = getMockDirectoryData();

    // 生成目录HTML
    const directoryHTML = generateDirectoryHTML(directoryData);

    // 更新DOM
    directoryTree.innerHTML = directoryHTML;

    // 添加点击事件
    setupDirectoryClickEvents();
}

function getMockDirectoryData() {
    // 模块数据 - 对应实际存在的模块页面
    return {
        title: 'Claude Code 教程目录',
        items: [
            {
                id: '01-slash-commands',
                title: '01 - Slash Commands',
                description: '学习使用 Claude Code 的斜杠命令',
                files: [
                    { name: 'README.md', title: '斜杠命令完整指南', status: '已翻译' }
                ]
            },
            {
                id: '02-memory',
                title: '02 - Memory',
                description: '掌握 Claude Code 的记忆功能',
                files: [
                    { name: 'README.md', title: 'Memory 系统完整指南', status: '已翻译' }
                ]
            },
            {
                id: '03-skills',
                title: '03 - Skills',
                description: '学习创建和使用技能',
                files: [
                    { name: 'README.md', title: 'Skills 系统完整指南', status: '已翻译' }
                ]
            },
            {
                id: '04-subagents',
                title: '04 - Subagents',
                description: '使用专业子代理',
                files: [
                    { name: 'README.md', title: 'Subagents 完整指南', status: '已翻译' }
                ]
            },
            {
                id: '05-mcp',
                title: '05 - MCP',
                description: '集成 Model Context Protocol',
                files: [
                    { name: 'README.md', title: 'MCP 完整指南', status: '已翻译' }
                ]
            },
            {
                id: '06-hooks',
                title: '06 - Hooks',
                description: '使用钩子扩展功能',
                files: [
                    { name: 'README.md', title: 'Hooks 完整指南', status: '已翻译' }
                ]
            },
            {
                id: '07-plugins',
                title: '07 - Plugins',
                description: '开发和使用插件',
                files: [
                    { name: 'README.md', title: 'Plugins 完整指南', status: '已翻译' }
                ]
            },
            {
                id: '08-checkpoints',
                title: '08 - Checkpoints',
                description: '会话快照与回滚',
                files: [
                    { name: 'README.md', title: 'Checkpoints 完整指南', status: '已翻译' }
                ]
            },
            {
                id: '09-advanced-features',
                title: '09 - Advanced Features',
                description: '高级功能详解',
                files: [
                    { name: 'README.md', title: '高级功能完整指南', status: '已翻译' }
                ]
            },
            {
                id: '10-cli',
                title: '10 - CLI',
                description: '命令行界面',
                files: [
                    { name: 'README.md', title: 'CLI 完整指南', status: '已翻译' }
                ]
            },
            {
                id: '11-multi-agent',
                title: '11 - 多 Agent 协作',
                description: '多 Agent 协作模式',
                files: [
                    { name: 'README.md', title: '多 Agent 协作指南', status: '已翻译' }
                ]
            },
            {
                id: '12-background-tasks',
                title: '12 - 后台任务',
                description: '后台任务执行机制',
                files: [
                    { name: 'README.md', title: '后台任务指南', status: '已翻译' }
                ]
            },
            {
                id: '13-channels',
                title: '13 - Channels',
                description: 'MCP 消息推送',
                files: [
                    { name: 'README.md', title: 'Channels 指南', status: '已翻译' }
                ]
            }
        ]
    };
}

function generateDirectoryHTML(data) {
    let html = `
        <div class="directory-header">
            <h3><i class="fas fa-folder-open"></i> ${data.title}</h3>
            <p class="directory-stats">
                <span class="stat-item"><i class="fas fa-check-circle" style="color: #38a169;"></i> 已翻译: 13 个模块</span>
            </p>
            <p class="directory-hint"><i class="fas fa-info-circle"></i> 点击章节标题展开/折叠，点击文件名查看教程</p>
        </div>
        <div class="directory-content">
    `;

    data.items.forEach((section, index) => {
        html += `
            <div class="directory-section" data-section="${section.id}">
                <div class="section-header">
                    <h4>
                        <i class="fas fa-folder-open"></i>
                        ${section.title}
                        <span class="section-badge">${section.files.length}个文件</span>
                    </h4>
                    <p class="section-description">${section.description}</p>
                </div>
                <div class="section-files">
        `;

        section.files.forEach(file => {
            let statusIcon = '';
            let statusClass = '';

            switch(file.status) {
                case '已翻译':
                    statusIcon = 'fa-check-circle';
                    statusClass = 'status-translated';
                    break;
                case '翻译中':
                    statusIcon = 'fa-sync-alt';
                    statusClass = 'status-translating';
                    break;
                case '未开始':
                    statusIcon = 'fa-clock';
                    statusClass = 'status-pending';
                    break;
            }

            html += `
                <div class="file-item ${statusClass}" data-file="${file.name}">
                    <i class="fas fa-file-alt"></i>
                    <span class="file-title">${file.title}</span>
                    <span class="file-status">
                        <i class="fas ${statusIcon}"></i> ${file.status}
                    </span>
                </div>
            `;
        });

        html += `
                </div>
            </div>
        `;
    });

    html += `</div>`;

    return html;
}

function setupDirectoryClickEvents() {
    console.log('设置目录点击事件...');
    
    // 章节点击事件
    const sectionHeaders = document.querySelectorAll('.section-header');
    console.log('找到章节标题数量:', sectionHeaders.length);
    
    sectionHeaders.forEach(header => {
        header.addEventListener('click', function(e) {
            e.stopPropagation();
            const section = this.closest('.directory-section');
            const files = section.querySelector('.section-files');
            files.classList.toggle('collapsed');

            const icon = this.querySelector('.fa-folder, .fa-folder-open');
            if (files.classList.contains('collapsed')) {
                icon.classList.remove('fa-folder-open');
                icon.classList.add('fa-folder');
            } else {
                icon.classList.remove('fa-folder');
                icon.classList.add('fa-folder-open');
            }
        });
    });

    // 文件点击事件 - 跳转到实际教程页面
    const fileItems = document.querySelectorAll('.file-item');
    console.log('找到文件项数量:', fileItems.length);

    fileItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.stopPropagation();

            const section = this.closest('.directory-section');
            const sectionId = section.getAttribute('data-section');

            // 直接跳转到对应的模块页面
            const targetUrl = `content/${sectionId}.html`;
            window.location.href = targetUrl;
        });
    });
}