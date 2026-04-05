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
    // 模拟目录数据 - 实际应从服务器获取
    return {
        title: 'Claude Code 教程目录',
        items: [
            {
                id: 'basics',
                title: '00 - 基础教程',
                description: 'Claude Code 安装与基本使用',
                files: [
                    { name: 'installation.md', title: '安装与配置', status: '已翻译' },
                    { name: 'basic-usage.md', title: '基本使用', status: '已翻译' }
                ]
            },
            {
                id: '01-slash-commands',
                title: '01 - 斜杠命令',
                description: '学习使用 Claude Code 的斜杠命令',
                files: [
                    { name: 'intro.md', title: '斜杠命令介绍', status: '已翻译' },
                    { name: 'basic-commands.md', title: '基础命令', status: '已翻译' },
                    { name: 'advanced-commands.md', title: '高级命令', status: '已翻译' },
                    { name: 'examples.md', title: '使用示例', status: '已翻译' }
                ]
            },
            {
                id: '02-memory',
                title: '02 - 记忆系统',
                description: '掌握 Claude Code 的记忆功能',
                files: [
                    { name: 'intro.md', title: '记忆系统介绍', status: '已翻译' },
                    { name: 'usage.md', title: '使用指南', status: '已翻译' },
                    { name: 'best-practices.md', title: '最佳实践', status: '已翻译' }
                ]
            },
            {
                id: '03-skills',
                title: '03 - 技能系统',
                description: '学习创建和使用技能',
                files: [
                    { name: 'intro.md', title: '技能系统介绍', status: '已翻译' },
                    { name: 'creating-skills.md', title: '创建技能', status: '已翻译' },
                    { name: 'builtin-skills.md', title: '内置技能', status: '已翻译' }
                ]
            },
            {
                id: '04-subagents',
                title: '04 - 子代理',
                description: '使用多智能体协作',
                files: [
                    { name: 'intro.md', title: '子代理介绍', status: '已翻译' },
                    { name: 'usage.md', title: '使用指南', status: '已翻译' }
                ]
            },
            {
                id: '05-mcp',
                title: '05 - MCP 服务器',
                description: '集成 Model Context Protocol',
                files: [
                    { name: 'intro.md', title: 'MCP 介绍', status: '已翻译' }
                ]
            },
            {
                id: '06-hooks',
                title: '06 - 钩子',
                description: '使用钩子扩展功能',
                files: [
                    { name: 'intro.md', title: '钩子介绍', status: '已翻译' }
                ]
            },
            {
                id: '07-plugins',
                title: '07 - 插件',
                description: '开发和使用插件',
                files: [
                    { name: 'intro.md', title: '插件介绍', status: '已翻译' },
                    { name: 'development.md', title: '插件开发', status: '已翻译' }
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
                <span class="stat-item"><i class="fas fa-check-circle" style="color: #38a169;"></i> 已翻译: 20</span>
                <span class="stat-item"><i class="fas fa-sync-alt" style="color: #d69e2e;"></i> 翻译中: 0</span>
                <span class="stat-item"><i class="fas fa-clock" style="color: #a0aec0;"></i> 未开始: 0</span>
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
            const fileName = this.getAttribute('data-file');
            const fileTitle = this.querySelector('.file-title').textContent;
            
            console.log('点击文件:', sectionId, fileName, fileTitle);
            
            // 根据章节ID和文件名跳转到对应的教程页面
            let targetUrl = '';
            
            // 特殊处理：基础教程
            if (sectionId === 'basics') {
                if (fileName === 'installation.md') {
                    targetUrl = 'content/basics/installation.html';
                } else if (fileName === 'basic-usage.md') {
                    targetUrl = 'content/basics/basic-usage.html';
                }
            }
            // 斜杠命令
            else if (sectionId === '01-slash-commands') {
                targetUrl = 'content/01-slash-commands.html';
            }
            // 记忆系统
            else if (sectionId === '02-memory') {
                targetUrl = 'content/02-memory.html';
            }
            // 技能系统
            else if (sectionId === '03-skills') {
                targetUrl = 'content/03-skills.html';
            }
            // 其他章节
            else {
                // 默认跳转到对应的HTML页面
                targetUrl = `content/${sectionId}.html`;
            }
            
            console.log('目标URL:', targetUrl);
            
            // 跳转到目标页面
            if (targetUrl) {
                window.location.href = targetUrl;
            } else {
                alert(`教程页面开发中...\n章节: ${sectionId}\n文件: ${fileName}`);
            }
        });
    });
}