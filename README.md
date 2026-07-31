# 海拉尔攻略站 (Hyrule Guides)

一个纯静态的《塞尔达传说》图文攻略站演示项目，符合 Google AdSense 审核与基础 SEO 要求。

## 技术栈

- 原生 **HTML5** + **CSS3** + **Vanilla JavaScript (ES6)**
- 无框架、无构建工具、无后端、无数据库
- 少量第三方资源：占位图使用 [placehold.co](https://placehold.co)，图标为内联 SVG（Triforce 三角神力）

## 中 / 英 双语切换

- 每个页面右上角提供 **中 / EN** 切换按钮，点击即在中文与英文之间切换。
- 实现方式：内容同时保留 `<span class="zh">` 与 `<span class="en">` 两份文本，由 `<html>` 上的 `lang-en` 类控制显示，并通过 `localStorage`（`hg-lang`）记住用户选择。
- 页面 `<title>` 与 `<meta name="description">` 也随语言切换（`data-zh` / `data-en` 属性）。
- 即使 JavaScript 失效，默认仍正常显示中文。

## 目录结构

```
海拉尔攻略站/
├── index.html          # 首页（最新攻略 / 推荐装备 / 赞助 / 资源入口）
├── guide.html          # 单篇攻略示例：如何拔起大师之剑
├── resources.html      # 资源下载页（数字商品 + 免费资源）
├── about.html          # 关于本站
├── contact.html        # 联系方式
├── privacy.html        # 隐私政策（满足 AdSense 审核）
├── style.css           # 全局样式（海拉尔绿 / 金色 / 羊皮纸主题）
├── script.js           # 全局脚本（导航 / 年份 / 高亮）
├── images/             # 图片资源目录（当前使用占位图）
├── CNAME               # 自定义域名（部署 GitHub Pages 时生效）
├── sitemap.xml         # SEO 站点地图
├── robots.txt          # 爬虫规则
└── README.md
```

## 本地预览

直接双击 `index.html` 即可在浏览器打开。若需本地服务器（推荐，避免某些浏览器对 `file://` 的限制）：

```bash
# 任选其一
python3 -m http.server 8080
# 或
npx serve .
```

然后访问 http://localhost:8080

## 变现位一览（均已用注释标注，便于替换）

| 标记 | 位置 |
| --- | --- |
| `<!-- 广告位：攻略首页顶部 -->` | index.html 英雄区下方 |
| `<!-- AdSense 广告位 1 -->` | index.html 攻略列表下方 |
| `<!-- AdSense 广告位 2 -->` | guide.html 文章底部 |
| `<!-- 联盟链接：Switch Pro 手柄 -->` | 多处（推荐装备卡片） |
| `<!-- 联系我们区域 -->` | 首页 / 攻略页 / 资源页侧边栏（邮箱 hello@hyrule-guides.cn） |

### 接入 AdSense 的步骤

1. 在 `index.html` 等页面的 `<head>` 中，将 `<!-- Google AdSense 脚本，审核后粘贴在此 -->` 替换为官方 `<script>` 代码。
2. 将各 `.ad-container` 内的占位内容替换为对应的 AdSense 广告单元代码。
3. 确保站点使用 **HTTPS** 部署（GitHub Pages 默认提供）。

## 部署

可一键部署到 GitHub Pages / Netlify / Vercel 等静态托管服务。将本目录内容推送至仓库根目录即可，`CNAME` 用于绑定自定义域名（请改为你自己的域名）。

## 声明

本项目为非官方粉丝站点，与任天堂公司无任何隶属关系，仅用于学习与交流。
