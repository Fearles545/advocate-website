#!/usr/bin/env node
// Static design-system audit.
//
// Compares docs/DESIGN_SYSTEM.md, the tokens in src/styles.css and every style
// source in src/app: component .css files, inline `styles` in .ts components
// and style="" attributes in templates. No dependencies.
//
// Usage (from the repo root):
//   node docs/design-system/tools/static-audit.mjs                 # markdown
//   node docs/design-system/tools/static-audit.mjs --json out.json # + details

import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const GLOBAL_CSS = 'src/styles.css';
const THEME_SCSS = 'src/custom-theme.scss';
const DOC = 'docs/DESIGN_SYSTEM.md';
const APP = 'src/app';
const ROOT_FONT_PX = 16;
const NEAR_DELTA_E = 3; // CIE76; below ~2.3 most people cannot tell two colors apart

const rel = (p) => path.relative(ROOT, p).split(path.sep).join('/');
const read = (p) => fs.readFileSync(path.resolve(ROOT, p), 'utf8');
const lineAt = (text, index) => text.slice(0, index).split('\n').length;

function walk(dir, test, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, test, out);
    else if (test(e.name)) out.push(p);
  }
  return out;
}

// ---------------------------------------------------------------------------
// CSS reading
// ---------------------------------------------------------------------------

// Minimal CSS reader: comments, strings, parentheses and native nesting.
// Returns declarations with their rule/at-rule context, and every rule.
function parseCss(text, file, firstLine = 1) {
  const decls = [];
  const rules = [];
  const stack = [];
  let buf = '';
  let bufLine = null;
  let line = firstLine;
  let depth = 0;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (ch === '/' && text[i + 1] === '*') {
      const end = text.indexOf('*/', i + 2);
      const stop = end === -1 ? text.length : end + 2;
      line += (text.slice(i, stop).match(/\n/g) || []).length;
      i = stop - 1;
      continue;
    }
    if (ch === '"' || ch === "'") {
      let j = i + 1;
      while (j < text.length && text[j] !== ch) j += text[j] === '\\' ? 2 : 1;
      const chunk = text.slice(i, j + 1);
      if (bufLine === null) bufLine = line;
      buf += chunk;
      line += (chunk.match(/\n/g) || []).length;
      i = j;
      continue;
    }
    if (depth === 0 && (ch === '{' || ch === ';' || ch === '}')) {
      const t = buf.trim();
      if (ch === '{') {
        if (stack.length) stack[stack.length - 1].children++;
        stack.push({
          prelude: t,
          line: bufLine ?? line,
          decls: 0,
          children: 0,
        });
      } else {
        const colon = t.indexOf(':');
        if (t && !t.startsWith('@') && colon > 0) {
          const top = stack[stack.length - 1];
          if (top) top.decls++;
          decls.push({
            file,
            line: bufLine ?? line,
            prop: t.slice(0, colon).trim().toLowerCase(),
            value: t
              .slice(colon + 1)
              .replace(/!important/, '')
              .trim()
              .replace(/\s+/g, ' '),
            ctx: stack.map((s) => s.prelude),
          });
        }
        if (ch === '}') {
          const r = stack.pop();
          if (r) rules.push({ file, ...r });
        }
      }
      buf = '';
      bufLine = null;
      continue;
    }
    if (ch === '\n') line++;
    if (ch === '(') depth++;
    if (ch === ')') depth = Math.max(0, depth - 1);
    if (bufLine === null && !/\s/.test(ch)) bufLine = line;
    buf += ch;
  }
  return { decls, rules };
}

// Inline `styles: \`...\`` blocks in Angular components.
function inlineStyleBlocks(src) {
  const out = [];
  const re = /styles\s*:\s*\[?\s*`/g;
  let m;
  while ((m = re.exec(src))) {
    const start = m.index + m[0].length;
    let end = start;
    while (end < src.length && !(src[end] === '`' && src[end - 1] !== '\\')) {
      end++;
    }
    out.push({ css: src.slice(start, end), firstLine: lineAt(src, start) });
    re.lastIndex = end + 1;
  }
  return out;
}

// style="a: b; c: d" attributes in templates (.html or inline `template:`).
function styleAttributes(src, file) {
  const out = [];
  for (const m of src.matchAll(/\sstyle="([^"]*)"/g)) {
    const line = lineAt(src, m.index);
    for (const part of m[1].split(';')) {
      const colon = part.indexOf(':');
      if (colon < 1) continue;
      out.push({
        file,
        line,
        prop: part.slice(0, colon).trim().toLowerCase(),
        value: part
          .slice(colon + 1)
          .trim()
          .replace(/\s+/g, ' '),
        ctx: ['[style]'],
      });
    }
  }
  return out;
}

// ---------------------------------------------------------------------------
// Values
// ---------------------------------------------------------------------------

// Remove var(...) calls, fallbacks included, keeping only literal parts.
function stripVars(value) {
  let out = '';
  for (let i = 0; i < value.length; i++) {
    if (value.startsWith('var(', i)) {
      let depth = 0;
      for (; i < value.length; i++) {
        if (value[i] === '(') depth++;
        if (value[i] === ')' && --depth === 0) break;
      }
      continue;
    }
    out += value[i];
  }
  return out;
}

const varRefs = (value) =>
  [...value.matchAll(/var\(\s*(--[\w-]+)\s*(,)?/g)].map((m) => ({
    name: m[1],
    fallback: !!m[2],
  }));

const NAMED_COLORS = {
  white: [255, 255, 255],
  black: [0, 0, 0],
  red: [255, 0, 0],
  orange: [255, 165, 0],
  yellow: [255, 255, 0],
  green: [0, 128, 0],
  blue: [0, 0, 255],
  gray: [128, 128, 128],
  grey: [128, 128, 128],
  silver: [192, 192, 192],
  navy: [0, 0, 128],
  gold: [255, 215, 0],
  whitesmoke: [245, 245, 245],
  gainsboro: [220, 220, 220],
};
const COLOR_RE = new RegExp(
  '#[0-9a-fA-F]{3,8}\\b|rgba?\\([^)]*\\)|hsla?\\([^)]*\\)|(?<![\\w-])(' +
    Object.keys(NAMED_COLORS).join('|') +
    ')(?![\\w-])',
  'gi'
);

function hslToRgb(h, s, l) {
  const k = (n) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n) => l - a * Math.max(-1, Math.min(k(n) - 3, 9 - k(n), 1));
  return [f(0), f(8), f(4)].map((x) => Math.round(x * 255));
}

function parseColor(text) {
  const t = text.toLowerCase();
  if (t.startsWith('#')) {
    let h = t.slice(1);
    if (h.length === 3 || h.length === 4) h = [...h].map((c) => c + c).join('');
    if (h.length !== 6 && h.length !== 8) return null;
    const n = (i) => parseInt(h.slice(i, i + 2), 16);
    return [n(0), n(2), n(4), h.length === 8 ? +(n(6) / 255).toFixed(3) : 1];
  }
  const nums = t.match(/-?[\d.]+%?/g);
  if (t.startsWith('rgb') && nums && nums.length >= 3) {
    const ch = nums
      .slice(0, 3)
      .map((v) =>
        v.endsWith('%') ? Math.round(parseFloat(v) * 2.55) : parseFloat(v)
      );
    const a = nums[3]
      ? parseFloat(nums[3]) / (nums[3].endsWith('%') ? 100 : 1)
      : 1;
    return [...ch, a];
  }
  if (t.startsWith('hsl') && nums && nums.length >= 3) {
    const [h, s, l] = nums.map(parseFloat);
    const a = nums[3]
      ? parseFloat(nums[3]) / (nums[3].endsWith('%') ? 100 : 1)
      : 1;
    return [...hslToRgb(h, s / 100, l / 100), a];
  }
  if (NAMED_COLORS[t]) return [...NAMED_COLORS[t], 1];
  return null;
}

const colorsIn = (value) =>
  [...stripVars(value).matchAll(COLOR_RE)]
    .map((m) => ({ text: m[0], rgba: parseColor(m[0]) }))
    .filter((c) => c.rgba);

const hex = ([r, g, b]) =>
  '#' + [r, g, b].map((v) => v.toString(16).padStart(2, '0')).join('');
const colorKey = (rgba) =>
  rgba[3] === 1
    ? hex(rgba)
    : `rgba(${rgba.slice(0, 3).join(', ')}, ${rgba[3]})`;

function toLab([r, g, b]) {
  const lin = (c) => {
    c /= 255;
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  };
  const [R, G, B] = [lin(r), lin(g), lin(b)];
  const xyz = [
    (R * 0.4124 + G * 0.3576 + B * 0.1805) / 0.95047,
    R * 0.2126 + G * 0.7152 + B * 0.0722,
    (R * 0.0193 + G * 0.1192 + B * 0.9505) / 1.08883,
  ].map((v) => (v > 0.008856 ? Math.cbrt(v) : 7.787 * v + 16 / 116));
  return [116 * xyz[1] - 16, 500 * (xyz[0] - xyz[1]), 200 * (xyz[1] - xyz[2])];
}
const deltaE = (a, b) => {
  const [x, y] = [toLab(a), toLab(b)];
  return Math.hypot(x[0] - y[0], x[1] - y[1], x[2] - y[2]);
};

function lengthToPx(v) {
  const m = /^(-?[\d.]+)(rem|px)$/.exec(v);
  if (!m) return null;
  return +(parseFloat(m[1]) * (m[2] === 'rem' ? ROOT_FONT_PX : 1)).toFixed(2);
}

// Split a value on top-level spaces/commas (not inside parentheses).
function topLevelParts(value) {
  const parts = [];
  let depth = 0;
  let cur = '';
  for (const ch of value) {
    if (ch === '(') depth++;
    if (ch === ')') depth--;
    if (depth === 0 && (ch === ' ' || ch === ',')) {
      if (cur) parts.push(cur);
      cur = '';
    } else cur += ch;
  }
  if (cur) parts.push(cur);
  return parts;
}

const mediaOf = (d) => d.ctx.filter((c) => c.startsWith('@media')).join(' & ');
const where = (d) => `${d.file}:${d.line}`;

function countBy(items, keyFn) {
  const m = new Map();
  for (const it of items) {
    const k = keyFn(it);
    const e = m.get(k) ?? { key: k, n: 0, files: new Set(), at: [] };
    e.n++;
    e.files.add(it.file);
    if (e.at.length < 8) e.at.push(where(it));
    m.set(k, e);
  }
  return [...m.values()].sort((a, b) => b.n - a.n);
}

// ---------------------------------------------------------------------------
// Collect sources
// ---------------------------------------------------------------------------

const globalParsed = parseCss(read(GLOBAL_CSS), GLOBAL_CSS);
const sources = {
  global: globalParsed.decls,
  component: [],
  inline: [],
  attr: [],
};
const rules = [...globalParsed.rules];
const dynamicProps = new Set();

for (const f of walk(path.resolve(ROOT, APP), (n) =>
  /\.(css|ts|html)$/.test(n)
)) {
  const src = fs.readFileSync(f, 'utf8');
  const file = rel(f);
  if (f.endsWith('.css')) {
    const p = parseCss(src, file);
    sources.component.push(...p.decls);
    rules.push(...p.rules);
    continue;
  }
  if (f.endsWith('.ts')) {
    for (const block of inlineStyleBlocks(src)) {
      const p = parseCss(block.css, file, block.firstLine);
      sources.inline.push(...p.decls);
      rules.push(...p.rules);
    }
  }
  sources.attr.push(...styleAttributes(src, file));
  // Custom properties set from code: setProperty('--x'), [style.--x], '--x': ...
  for (const m of src.matchAll(
    /(?:setProperty\(\s*['"]|\[style\.|['"])(--[\w-]+)/g
  )) {
    dynamicProps.add(m[1]);
  }
}

const appDecls = [...sources.component, ...sources.inline, ...sources.attr];
const allDecls = [...sources.global, ...appDecls];

// ---------------------------------------------------------------------------
// Tokens: :root in src/styles.css, base value + media overrides
// ---------------------------------------------------------------------------

const tokens = new Map();
const isRootToken = (d) =>
  d.prop.startsWith('--') &&
  d.file === GLOBAL_CSS &&
  d.ctx.filter((c) => !c.startsWith('@')).join() === ':root';

for (const d of sources.global.filter(isRootToken)) {
  const t = tokens.get(d.prop) ?? {
    name: d.prop,
    base: null,
    overrides: [],
    line: d.line,
  };
  const media = mediaOf(d);
  if (media) t.overrides.push({ media, value: d.value, line: d.line });
  else Object.assign(t, { base: d.value, line: d.line });
  tokens.set(d.prop, t);
}

const localProps = new Map();
for (const d of allDecls.filter(
  (x) => x.prop.startsWith('--') && !isRootToken(x)
)) {
  if (!localProps.has(d.prop)) localProps.set(d.prop, []);
  localProps.get(d.prop).push(where(d));
}

function resolve(value, seen = new Set()) {
  return value.replace(
    /var\(\s*(--[\w-]+)\s*(?:,\s*([^()]*(?:\([^()]*\))?[^()]*))?\)/g,
    (all, name, fb) => {
      const t = tokens.get(name);
      if (!t || seen.has(name)) return fb ?? all;
      return resolve(t.base ?? '', new Set([...seen, name]));
    }
  );
}

// var() references everywhere (token definitions included).
const refs = [];
for (const d of allDecls) {
  for (const r of varRefs(d.value))
    refs.push({ ...r, file: d.file, line: d.line });
}
const refCount = new Map();
for (const r of refs) refCount.set(r.name, (refCount.get(r.name) ?? 0) + 1);

const EXTERNAL_PROP = /^--(mat|mdc|md|g)-/;
const undefinedRefs = countBy(
  refs.filter(
    (r) =>
      !tokens.has(r.name) &&
      !localProps.has(r.name) &&
      !dynamicProps.has(r.name) &&
      !EXTERNAL_PROP.test(r.name)
  ),
  (r) => `${r.name}${r.fallback ? ' (has fallback)' : ' (NO fallback)'}`
);
const unusedTokens = [...tokens.keys()].filter((t) => !refCount.has(t));

// ---------------------------------------------------------------------------
// Doc vs tokens
// ---------------------------------------------------------------------------

const doc = read(DOC);
const docTokens = new Set([...doc.matchAll(/`(--[\w-]+)`/g)].map((m) => m[1]));
const docMentions = new Set([...doc.matchAll(/(--[\w-]+)/g)].map((m) => m[1]));
const docOnly = [...docTokens].filter(
  (t) => !tokens.has(t) && !localProps.has(t) && !EXTERNAL_PROP.test(t)
);
const undocumented = [...tokens.keys()].filter((t) => !docMentions.has(t));

const norm = (v) => resolve(v).toLowerCase().replace(/\s+/g, '');
const cells = (row) =>
  row
    .split('|')
    .slice(1, -1)
    .map((c) => c.trim());
// Only columns that hold the token's own value (not usage, radius, etc.).
const VALUE_COLUMN =
  /^(value|hex|size|default|points to|mobile|desktop|tablet)/i;
const docLines = doc.split('\n');
const docValueMismatch = [];
for (const m of doc.matchAll(/^\|\s*`(--[\w-]+)`\s*\|.*$/gm)) {
  const t = tokens.get(m[1]);
  if (!t || !t.base) continue;
  let h = lineAt(doc, m.index) - 1;
  while (h > 0 && !/^\|[\s\-:|]+\|$/.test(docLines[h])) h--;
  const header = cells(docLines[h - 1] ?? '');
  const docVals = cells(m[0])
    .filter((_, i) => i > 0 && VALUE_COLUMN.test(header[i] ?? ''))
    .flatMap((c) => [...c.matchAll(/`([^`]+)`/g)].map((x) => x[1]));
  if (!docVals.length) continue;
  const cssVals = [t.base, ...t.overrides.map((o) => o.value)];
  const docSet = new Set(docVals.map(norm));
  const cssSet = new Set(cssVals.map(norm));
  const same =
    docSet.size === cssSet.size && [...docSet].every((v) => cssSet.has(v));
  if (!same) {
    docValueMismatch.push({
      token: m[1],
      doc: docVals.join(' / '),
      css: [t.base, ...t.overrides.map((o) => `${o.value} ${o.media}`)].join(
        ' / '
      ),
      docLine: lineAt(doc, m.index),
      cssLine: t.line,
    });
  }
}

// ---------------------------------------------------------------------------
// Colors
// ---------------------------------------------------------------------------

const tokenColors = [];
for (const t of tokens.values()) {
  if (!t.base) continue;
  const v = resolve(t.base).trim();
  const cs = colorsIn(v);
  if (cs.length === 1 && cs[0].text.length === v.length) {
    tokenColors.push({ name: t.name, rgba: cs[0].rgba });
  }
}
const sameRgb = (a, b) => a[0] === b[0] && a[1] === b[1] && a[2] === b[2];
const BRAND_ALPHA_BASES = tokenColors.filter((t) => /alpha/.test(t.name));

const colorUses = [];
for (const d of allDecls) {
  if (isRootToken(d)) continue;
  for (const c of colorsIn(d.value)) {
    const [r, g, b, a] = c.rgba;
    let cls;
    let token = null;
    let dE = null;
    const exact = tokenColors.find(
      (t) => sameRgb(t.rgba, c.rgba) && Math.abs(t.rgba[3] - a) < 0.005
    );
    if (exact) {
      cls = 'token-duplicate';
      token = exact.name;
    } else if (a < 1) {
      const base = BRAND_ALPHA_BASES.find((t) => sameRgb(t.rgba, c.rgba));
      if (base) cls = 'alpha-step-without-token';
      else if (
        (r === 255 && g === 255 && b === 255) ||
        (r === 0 && g === 0 && b === 0)
      ) {
        cls = 'neutral-alpha';
      } else cls = 'off-palette-alpha';
      token = base ? base.name.replace(/-\d+$/, '-*') : null;
    } else {
      const opaque = tokenColors.filter((t) => t.rgba[3] === 1);
      let best = null;
      for (const t of opaque) {
        const e = deltaE(t.rgba, c.rgba);
        if (!best || e < best.e) best = { name: t.name, e };
      }
      if (best && best.e < NEAR_DELTA_E) {
        cls = 'near-token';
        token = best.name;
        dE = +best.e.toFixed(2);
      } else cls = 'off-palette';
    }
    colorUses.push({
      ...d,
      color: colorKey(c.rgba),
      rgba: c.rgba,
      cls,
      token,
      dE,
    });
  }
}

// Group opaque, untokenized colors that look alike (single linkage).
function clusterColors(uses) {
  const distinct = countBy(uses, (u) => u.color).map((e) => ({
    ...e,
    rgba: uses.find((u) => u.color === e.key).rgba,
  }));
  const clusters = [];
  for (const c of distinct) {
    const home = clusters.find((cl) =>
      cl.members.some((m) => deltaE(m.rgba, c.rgba) < NEAR_DELTA_E)
    );
    if (home) home.members.push(c);
    else clusters.push({ members: [c] });
  }
  return clusters
    .map((cl) => ({ ...cl, n: cl.members.reduce((s, m) => s + m.n, 0) }))
    .sort((a, b) => b.n - a.n);
}
const untokenizedOpaque = colorUses.filter((u) =>
  ['off-palette', 'near-token'].includes(u.cls)
);
const colorClusters = clusterColors(untokenizedOpaque);

// Every opaque light color (backgrounds, mostly), lightest first.
const WHITE = [255, 255, 255];
const lightColors = countBy(
  colorUses.filter((u) => u.rgba[3] === 1 && toLab(u.rgba)[0] > 90),
  (u) => u.color
)
  .map((e) => ({ ...e, rgba: colorUses.find((u) => u.color === e.key).rgba }))
  .sort((a, b) => toLab(b.rgba)[0] - toLab(a.rgba)[0]);

// ---------------------------------------------------------------------------
// Typography
// ---------------------------------------------------------------------------

const fontTokenPx = new Map();
for (const t of tokens.values()) {
  if (!/^--(font-size|section-intro-font-size)/.test(t.name)) continue;
  for (const v of [t.base, ...t.overrides.map((o) => o.value)]) {
    const px = lengthToPx(v);
    if (px !== null)
      fontTokenPx.set(px, [...(fontTokenPx.get(px) ?? []), t.name]);
  }
}

function classifyFontSize(value) {
  if (/var\(/.test(value)) return { cls: 'token' };
  const px = lengthToPx(value);
  if (px !== null) {
    if (fontTokenPx.has(px)) return { cls: 'on-scale-literal', px };
    let nearest = null;
    for (const p of fontTokenPx.keys()) {
      if (nearest === null || Math.abs(p - px) < Math.abs(nearest - px))
        nearest = p;
    }
    return { cls: 'off-scale', px, nearest };
  }
  if (/em$|%$/.test(value)) return { cls: 'relative' };
  if (/clamp|calc|min\(|max\(/.test(value)) return { cls: 'fluid' };
  return { cls: 'keyword' };
}

const fontSizes = allDecls
  .filter((d) => d.prop === 'font-size' && !isRootToken(d))
  .map((d) => ({ ...d, ...classifyFontSize(d.value) }));
const fontWeights = allDecls.filter((d) => d.prop === 'font-weight');
const fontFamilies = allDecls.filter((d) => d.prop === 'font-family');
const lineHeights = allDecls.filter(
  (d) => d.prop === 'line-height' && !isRootToken(d)
);
const letterSpacings = allDecls.filter((d) => d.prop === 'letter-spacing');

// ---------------------------------------------------------------------------
// Spacing, radius, shadow, motion, breakpoints, z-index
// ---------------------------------------------------------------------------

const SPACING_PROPS = /^(padding|margin|gap|row-gap|column-gap)(-|$)/;
const spacingLengths = [];
const spacingTokens = [];
for (const d of allDecls.filter((x) => SPACING_PROPS.test(x.prop))) {
  for (const part of topLevelParts(d.value)) {
    if (part.startsWith('var('))
      spacingTokens.push({ ...d, token: varRefs(part)[0]?.name });
    else if (/^-?[\d.]+(rem|px|em)$/.test(part) && parseFloat(part) !== 0) {
      spacingLengths.push({ ...d, len: part.replace(/^-/, '') });
    }
  }
}
const onGrid = (len) => {
  const px = lengthToPx(len);
  return px !== null && Math.abs(px / 4 - Math.round(px / 4)) < 0.01;
};

const radii = allDecls.filter(
  (d) => /^border(-[a-z]+)*-radius$/.test(d.prop) && !isRootToken(d)
);
const shadows = allDecls.filter(
  (d) => d.prop === 'box-shadow' && !isRootToken(d)
);
const motion = allDecls.filter((d) =>
  /^(transition|animation)(-duration|-timing-function)?$/.test(d.prop)
);
const durations = [];
const easings = [];
for (const d of motion) {
  for (const m of stripVars(d.value).matchAll(/(?<![\w.-])([\d.]+)(ms|s)\b/g)) {
    durations.push({
      ...d,
      ms: Math.round(parseFloat(m[1]) * (m[2] === 's' ? 1000 : 1)),
    });
  }
  for (const m of stripVars(d.value).matchAll(
    /cubic-bezier\([^)]*\)|\b(ease-in-out|ease-in|ease-out|ease|linear)\b/g
  )) {
    easings.push({ ...d, easing: m[0].replace(/\s+/g, '') });
  }
}

const mediaRules = rules.filter((r) => r.prelude.startsWith('@media'));
const breakpoints = [];
for (const r of mediaRules) {
  for (const m of r.prelude.matchAll(
    /\((min|max)-width:\s*([\d.]+)(px|rem|em)\)/g
  )) {
    breakpoints.push({
      file: r.file,
      line: r.line,
      bp: `${m[1]}-width: ${m[2]}${m[3]}`,
    });
  }
}
const zIndexes = allDecls.filter((d) => d.prop === 'z-index');
const emptyRules = rules.filter((r) => r.decls === 0 && r.children === 0);

// ---------------------------------------------------------------------------
// Angular Material theme
// ---------------------------------------------------------------------------

const theme = read(THEME_SCSS);
const appliedPalettes = [
  ...theme.matchAll(/(primary|tertiary):\s*mat\.\$([\w-]+)/g),
].map((m) => `${m[1]}: ${m[2]}`);
const brandThemeDefined = /\$my-theme\s*:/.test(theme);
const brandThemeApplied = /@include[^;]*\$my-theme/.test(theme);

// ---------------------------------------------------------------------------
// Per-file scorecard
// ---------------------------------------------------------------------------

const files = new Map();
const fileRow = (f) => {
  if (!files.has(f)) {
    files.set(f, {
      file: f,
      decls: 0,
      varRefs: 0,
      colorLiterals: 0,
      colorTokenDup: 0,
      fontSizeLiteral: 0,
      fontSizeOffScale: 0,
      fontSizeToken: 0,
    });
  }
  return files.get(f);
};
for (const d of allDecls.filter((x) => !isRootToken(x))) {
  const row = fileRow(d.file);
  row.decls++;
  row.varRefs += varRefs(d.value).length;
}
for (const u of colorUses.filter(
  (x) => x.file !== GLOBAL_CSS || !isRootToken(x)
)) {
  const row = fileRow(u.file);
  row.colorLiterals++;
  if (u.cls === 'token-duplicate') row.colorTokenDup++;
}
for (const f of fontSizes) {
  const row = fileRow(f.file);
  if (f.cls === 'token') row.fontSizeToken++;
  else row.fontSizeLiteral++;
  if (f.cls === 'off-scale') row.fontSizeOffScale++;
}

// ---------------------------------------------------------------------------
// Report
// ---------------------------------------------------------------------------

const out = [];
const p = (s = '') => out.push(s);
const table = (head, rows) => {
  p(`| ${head.join(' | ')} |`);
  p(`|${head.map(() => '---').join('|')}|`);
  for (const r of rows) p(`| ${r.join(' | ')} |`);
  p();
};
const pct = (a, b) => (b ? `${Math.round((a / b) * 100)}%` : '–');
const by = (arr, cls) => arr.filter((x) => x.cls === cls).length;
const code = (s) => '`' + String(s).replace(/\|/g, '\\|') + '`';

p('# Static audit');
p();
p(
  `Generated ${new Date().toISOString().slice(0, 10)} from ${GLOBAL_CSS}, ${APP}/**/*.css, inline component styles and style="" attributes.`
);
p();
p('## Sources');
p();
table(
  ['Source', 'Declarations'],
  [
    [GLOBAL_CSS, sources.global.length],
    ['component .css', sources.component.length],
    ['inline `styles` in .ts', sources.inline.length],
    ['style="" attributes', sources.attr.length],
  ]
);

p('## Tokens');
p();
p(
  `- ${tokens.size} tokens in \`:root\`; ${docTokens.size} tokens named in the doc.`
);
p(
  `- Named in the doc but not defined: ${docOnly.length ? docOnly.map(code).join(', ') : 'none'}.`
);
p(
  `- Defined but never mentioned in the doc (${undocumented.length}): ${undocumented.map(code).join(', ')}.`
);
p(
  `- Defined but never referenced (${unusedTokens.length}): ${unusedTokens.map(code).join(', ')}.`
);
p();
if (undefinedRefs.length) {
  p(
    'Referenced but defined nowhere (not in `:root`, not local, not set from code):'
  );
  p();
  table(
    ['Reference', 'Uses', 'Where'],
    undefinedRefs.map((e) => [code(e.key), e.n, e.at.join(', ')])
  );
}
if (docValueMismatch.length) {
  p('Doc table values that differ from the CSS (all breakpoints compared):');
  p();
  table(
    ['Token', 'Doc', 'CSS', 'Doc line', 'CSS line'],
    docValueMismatch.map((m) => [
      code(m.token),
      code(m.doc),
      code(m.css),
      m.docLine,
      m.cssLine,
    ])
  );
}

p('## Colors');
p();
const colorTotal = colorUses.length;
table(
  ['Class', 'Uses', 'Share'],
  [
    'token-duplicate',
    'alpha-step-without-token',
    'near-token',
    'off-palette',
    'neutral-alpha',
    'off-palette-alpha',
  ].map((c) => [c, by(colorUses, c), pct(by(colorUses, c), colorTotal)])
);
p('Untokenized opaque colors grouped by look-alike (ΔE < 3):');
p();
table(
  ['Cluster', 'Uses', 'Members (uses)', 'Files'],
  colorClusters
    .slice(0, 20)
    .map((cl, i) => [
      i + 1,
      cl.n,
      cl.members.map((m) => `${code(m.key)} ×${m.n}`).join(', '),
      new Set(cl.members.flatMap((m) => [...m.files])).size,
    ])
);
p('Light colors (L* > 90), lightest first:');
p();
table(
  ['Color', 'L*', 'ΔE to white', 'Uses', 'Files', 'Where'],
  lightColors.map((e) => [
    code(e.key),
    toLab(e.rgba)[0].toFixed(1),
    deltaE(e.rgba, WHITE).toFixed(1),
    e.n,
    e.files.size,
    e.at.slice(0, 3).join(', '),
  ])
);
p('Brand-alpha steps without a token:');
p();
table(
  ['Color', 'Uses', 'Files'],
  countBy(
    colorUses.filter((u) => u.cls === 'alpha-step-without-token'),
    (u) => u.color
  )
    .slice(0, 20)
    .map((e) => [code(e.key), e.n, e.files.size])
);
p('Near-token colors (look like a token, but are not):');
p();
table(
  ['Color', 'Looks like', 'ΔE', 'Uses', 'Where'],
  countBy(
    colorUses.filter((u) => u.cls === 'near-token'),
    (u) => `${u.color}|${u.token}|${u.dE}`
  ).map((e) => {
    const [c, t, de] = e.key.split('|');
    return [code(c), code(t), de, e.n, e.at.slice(0, 3).join(', ')];
  })
);

p('## Typography');
p();
table(
  ['font-size class', 'Uses', 'Share'],
  [
    'token',
    'on-scale-literal',
    'off-scale',
    'relative',
    'fluid',
    'keyword',
  ].map((c) => [c, by(fontSizes, c), pct(by(fontSizes, c), fontSizes.length)])
);
p(
  `Token scale (px): ${[...fontTokenPx.keys()].sort((a, b) => a - b).join(', ')}.`
);
p();
p('Off-scale font sizes:');
p();
table(
  ['Value', 'px', 'Nearest step', 'Uses', 'Files'],
  countBy(
    fontSizes.filter((f) => f.cls === 'off-scale'),
    (f) => f.value
  ).map((e) => {
    const f = fontSizes.find((x) => x.value === e.key);
    return [code(e.key), f.px, f.nearest, e.n, e.files.size];
  })
);
table(
  ['font-weight', 'Uses', 'Files'],
  countBy(fontWeights, (d) => d.value).map((e) => [
    code(e.key),
    e.n,
    e.files.size,
  ])
);
table(
  ['font-family', 'Uses', 'Where'],
  countBy(fontFamilies, (d) => d.value).map((e) => [
    code(e.key),
    e.n,
    e.at.slice(0, 3).join(', '),
  ])
);
table(
  ['line-height', 'Uses'],
  countBy(lineHeights, (d) => d.value).map((e) => [code(e.key), e.n])
);
table(
  ['letter-spacing', 'Uses'],
  countBy(letterSpacings, (d) => d.value).map((e) => [code(e.key), e.n])
);

p('## Spacing');
p();
p(
  `- ${spacingLengths.length} literal lengths in padding/margin/gap, ${spacingTokens.length} token references.`
);
p(
  `- ${countBy(spacingLengths, (s) => s.len).length} distinct literal lengths; ${pct(spacingLengths.filter((s) => onGrid(s.len)).length, spacingLengths.length)} sit on a 4px grid.`
);
p();
table(
  ['Length', 'Uses', 'On 4px grid'],
  countBy(spacingLengths, (s) => s.len)
    .slice(0, 30)
    .map((e) => [code(e.key), e.n, onGrid(e.key) ? 'yes' : 'no'])
);
table(
  ['Spacing token', 'Uses'],
  countBy(spacingTokens, (s) => s.token).map((e) => [code(e.key), e.n])
);

p('## Radius, shadow, motion');
p();
table(
  ['border-radius', 'Uses', 'Files'],
  countBy(radii, (d) => d.value)
    .slice(0, 25)
    .map((e) => [code(e.key), e.n, e.files.size])
);
p(
  `box-shadow: ${shadows.length} declarations, ${countBy(shadows, (d) => d.value).length} distinct values, ${shadows.filter((d) => /var\(/.test(d.value)).length} use a token.`
);
p();
p(
  `Motion tokens: ${['--transition-normal', '--ease-standard', '--ease-bounce']
    .map((t) => `${code(t)} ×${refCount.get(t) ?? 0}`)
    .join(', ')}.`
);
p();
table(
  ['Duration (ms)', 'Uses'],
  countBy(durations, (d) => d.ms).map((e) => [e.key, e.n])
);
table(
  ['Easing', 'Uses'],
  countBy(easings, (d) => d.easing).map((e) => [code(e.key), e.n])
);

p('## Breakpoints');
p();
table(
  ['Media feature', 'Blocks', 'Files'],
  countBy(breakpoints, (b) => b.bp).map((e) => [code(e.key), e.n, e.files.size])
);
table(
  ['z-index', 'Uses'],
  countBy(zIndexes, (d) => d.value).map((e) => [code(e.key), e.n])
);

p('## Dead code');
p();
p(`${emptyRules.length} empty rules or media blocks:`);
p();
for (const r of emptyRules) p(`- ${r.file}:${r.line} ${code(r.prelude)}`);
p();

p('## Angular Material theme');
p();
p(
  `- Applied \`mat.theme\` palettes: ${appliedPalettes.map(code).join(', ') || 'none'}.`
);
p(
  `- Brand theme \`$my-theme\` defined: ${brandThemeDefined ? 'yes' : 'no'}; applied: ${brandThemeApplied ? 'yes' : 'no'}.`
);
p();

p('## Files');
p();
table(
  [
    'File',
    'Decls',
    'var() refs',
    'Color literals',
    'of them token dup',
    'font-size literal',
    'off-scale',
    'font-size token',
  ],
  [...files.values()]
    .sort(
      (a, b) =>
        b.colorLiterals +
        b.fontSizeLiteral -
        (a.colorLiterals + a.fontSizeLiteral)
    )
    .map((r) => [
      r.file,
      r.decls,
      r.varRefs,
      r.colorLiterals,
      r.colorTokenDup,
      r.fontSizeLiteral,
      r.fontSizeOffScale,
      r.fontSizeToken,
    ])
);

process.stdout.write(out.join('\n'));

const jsonAt = process.argv.indexOf('--json');
if (jsonAt > -1) {
  const strip = (arr) =>
    arr.map(({ ctx, ...rest }) => ({
      ...rest,
      media: ctx ? ctx.filter((c) => c.startsWith('@')).join(' & ') : undefined,
    }));
  fs.writeFileSync(
    process.argv[jsonAt + 1],
    JSON.stringify(
      {
        tokens: [...tokens.values()],
        undefinedRefs: undefinedRefs.map((e) => ({
          ...e,
          files: [...e.files],
        })),
        unusedTokens,
        undocumented,
        docOnly,
        docValueMismatch,
        colorUses: strip(colorUses),
        colorClusters: colorClusters.map((cl) => ({
          n: cl.n,
          members: cl.members.map((m) => ({
            color: m.key,
            n: m.n,
            files: [...m.files],
            at: m.at,
          })),
        })),
        fontSizes: strip(fontSizes),
        spacingLengths: strip(spacingLengths),
        radii: strip(radii),
        shadows: strip(shadows),
        durations: strip(durations),
        breakpoints,
        emptyRules,
        theme: { appliedPalettes, brandThemeDefined, brandThemeApplied },
        files: [...files.values()],
      },
      null,
      1
    )
  );
}
