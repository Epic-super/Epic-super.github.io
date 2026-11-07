// lib/wb-elements.js — 可复用 Web Components（零依赖、原生 ES module）
// 目前提供：<wb-ring> 圆形进度环（shadow DOM 封装；与 index.html 双线学分进度环等价）。
// 用法：<wb-ring value="0-100" color="var(--red)" size stroke></wb-ring>
// 2026-10-16 自查：轨道色原为硬编码 #EDEFF2，深色主题（卡片 #181d1a）下会渲染成一道亮灰环，
// 与夜读底强烈冲突 —— 改走 --ring-track 令牌（浅 #eaf0ec / 深 #222926）。
// 同时 color 属性改为写进 CSSOM style（而非 setAttribute 表现属性），这样传入 var(--red)
// 这类「变量」也能被解析（SVG 表现属性不支持 var()，style 支持）。
// 暴露实例属性 .value（0-100），设置后自动重绘弧线与百分数。
"use strict";

class WBRing extends HTMLElement {
  static observedAttributes = ["value", "color", "size", "stroke"];

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._build();
  }
  connectedCallback() { this._sync(); }
  attributeChangedCallback() { this._sync(); }

  get value() { return parseFloat(this.getAttribute("value") || "0"); }
  set value(v) { this.setAttribute("value", v); }

  _build() {
    this.shadowRoot.innerHTML = `
      <style>
        :host{display:inline-flex;flex:none;color:var(--text,#1d2723);}
        svg{display:block;}
        text{fill:currentColor;font-family:var(--serif,system-ui);font-weight:700;}
      </style>
      <svg width="88" height="88" viewBox="0 0 88 88">
        <circle class="tr" cx="44" cy="44" r="37" fill="none" style="stroke:var(--ring-track,#eaf0ec)" stroke-width="10"/>
        <circle class="arc" cx="44" cy="44" r="37" fill="none" style="stroke:var(--red,#e0564b)" stroke-width="10" stroke-linecap="round" transform="rotate(-90 44 44)"/>
        <text class="pct" x="44" y="49" text-anchor="middle" font-size="19">0%</text>
      </svg>`;
  }

  _sync() {
    const size = parseInt(this.getAttribute("size") || "88", 10) || 88;
    const stroke = parseInt(this.getAttribute("stroke") || "10", 10) || 10;
    const color = this.getAttribute("color") || "var(--red,#e0564b)";
    const r = Math.max(1, Math.round(size * 0.42));
    const C = 2 * Math.PI * r;
    const v = Math.max(0, Math.min(100, this.value));
    const svg = this.shadowRoot.querySelector("svg");
    svg.setAttribute("width", size);
    svg.setAttribute("height", size);
    svg.setAttribute("viewBox", "0 0 " + size + " " + size);
    const tr = this.shadowRoot.querySelector(".tr");
    const arc = this.shadowRoot.querySelector(".arc");
    const pct = this.shadowRoot.querySelector(".pct");
    [tr, arc].forEach(function (c) {
      c.setAttribute("cx", size / 2);
      c.setAttribute("cy", size / 2);
      c.setAttribute("r", r);
      c.setAttribute("stroke-width", stroke);
    });
    tr.style.stroke = "var(--ring-track,#eaf0ec)";
    arc.style.stroke = color;
    arc.setAttribute("transform", `rotate(-90 ${size / 2} ${size / 2})`);
    arc.setAttribute("stroke-dasharray", C.toFixed(1));
    arc.setAttribute("stroke-dashoffset", (C * (1 - v / 100)).toFixed(1));
    pct.setAttribute("x", size / 2);
    pct.setAttribute("y", Math.round(size / 2 + size * 0.057));
    pct.setAttribute("font-size", Math.round(size * 0.216));
    pct.textContent = v + "%";
  }
}

if (!customElements.get("wb-ring")) customElements.define("wb-ring", WBRing);