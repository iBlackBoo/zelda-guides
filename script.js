/* =========================================================
   海拉尔攻略站 — 全局脚本
   仅使用原生 JavaScript，无依赖。
   ========================================================= */
(function () {
  'use strict';

  // 1) 页脚年份自动更新
  var yearEls = document.querySelectorAll('#year');
  var currentYear = new Date().getFullYear();
  yearEls.forEach(function (el) {
    el.textContent = currentYear;
  });

  // 2) 移动端导航切换（按钮在窄屏显示）
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      nav.classList.toggle('open');
    });
    // 点击导航项后自动收起（移动端）
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        if (window.innerWidth <= 680) {
          nav.classList.remove('open');
        }
      });
    });
  }

  // 3) 高亮当前页面对应导航项
  var path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.main-nav a').forEach(function (a) {
    var href = a.getAttribute('href');
    if (href === path) {
      a.classList.add('active');
    }
  });

  // 4) 中 / 英 语言切换
  var LANG_KEY = 'hg-lang';
  var html = document.documentElement;
  var langBtn = document.getElementById('langToggle');

  function applyLang(lang) {
    if (lang === 'en') {
      html.classList.add('lang-en');
      html.setAttribute('lang', 'en');
    } else {
      html.classList.remove('lang-en');
      html.setAttribute('lang', 'zh-CN');
    }
    // 切换按钮标签：显示“可切换到的语言”
    if (langBtn) {
      langBtn.textContent = (lang === 'en') ? '中' : 'EN';
      langBtn.setAttribute('aria-label', (lang === 'en') ? '切换到中文' : 'Switch to English');
    }
    // 页面标题与 meta description 双语
    var titleEl = document.querySelector('title[data-en]');
    if (titleEl) {
      titleEl.textContent = (lang === 'en') ? titleEl.getAttribute('data-en') : titleEl.getAttribute('data-zh');
    }
    var descEl = document.querySelector('meta[name="description"][data-en]');
    if (descEl) {
      descEl.setAttribute('content', (lang === 'en') ? descEl.getAttribute('data-en') : descEl.getAttribute('data-zh'));
    }
  }

  var savedLang = null;
  try { savedLang = localStorage.getItem(LANG_KEY); } catch (e) {}
  var initialLang = (savedLang === 'en' || savedLang === 'zh') ? savedLang : 'zh';
  applyLang(initialLang);

  if (langBtn) {
    langBtn.addEventListener('click', function () {
      var next = html.classList.contains('lang-en') ? 'zh' : 'en';
      applyLang(next);
      try { localStorage.setItem(LANG_KEY, next); } catch (e) {}
    });
  }

  // 5) 图片灯箱（点击放大：收款码 / 攻略图 / 资源图）
  (function () {
    var sel = '.sponsor-box .qr, .article img, .product img';
    var imgs = document.querySelectorAll(sel);
    if (!imgs.length) return;

    // 创建灯箱容器（动态插入，所有页面通用）
    var lb = document.createElement('div');
    lb.className = 'lightbox';
    lb.setAttribute('role', 'dialog');
    lb.setAttribute('aria-label', '图片放大查看');
    lb.innerHTML =
      '<button class="lb-close" aria-label="关闭">&times;</button>' +
      '<img alt="">' +
      '<div class="lb-caption"></div>' +
      '<div class="lb-hint"><span class="zh">点击空白处或按 Esc 关闭</span><span class="en">Tap outside or press Esc to close</span></div>';
    document.body.appendChild(lb);
    var lbImg = lb.querySelector('img');
    var lbCap = lb.querySelector('.lb-caption');

    function openLB(src, alt) {
      lbImg.src = src;
      lbImg.alt = alt || '';
      lbCap.textContent = alt || '';
      lb.classList.add('open');
      document.body.style.overflow = 'hidden'; // 防止背景滚动
    }
    function closeLB() {
      lb.classList.remove('open');
      lbImg.removeAttribute('src');
      document.body.style.overflow = '';
    }

    imgs.forEach(function (img) {
      img.classList.add('zoomable');
      // 在图片下方插入“可放大”提示（中英双语，跟随语言切换）
      var hint = document.createElement('p');
      hint.className = 'zoom-hint';
      hint.innerHTML = '<span class="zh">点击图片可放大查看</span><span class="en">Click image to enlarge</span>';
      img.insertAdjacentElement('afterend', hint);
      // 点击放大
      img.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        openLB(img.currentSrc || img.src, img.alt);
      });
    });

    // 关闭：点关闭按钮、点遮罩空白、按 Esc
    lb.querySelector('.lb-close').addEventListener('click', closeLB);
    lb.addEventListener('click', function (e) {
      if (e.target !== lbImg) closeLB();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && lb.classList.contains('open')) closeLB();
    });
  })();
})();
