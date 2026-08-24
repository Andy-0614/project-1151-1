import { readFileSync, writeFileSync, mkdirSync, cpSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  discoverTeams, loadTeamData, loadMemberData,
  parseSections, parseMembers, isTodo, teamDisplayName
} from './parse.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');
const dataDir = join(rootDir, 'data');
const siteDir = join(rootDir, 'site');
const distDir = join(rootDir, 'dist');

const COLORS = [
  '#4285F4', '#EA4335', '#FBBC04', '#34A853',
  '#A142F4', '#00ACC1', '#FF7043', '#E91E8B'
];

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function buildMemberHtml(dataDir, memberName) {
  const data = loadMemberData(dataDir, memberName);

  if (data.error) {
    return `<div class="member member--error"><span class="member__icon">&#9888;</span> 找不到 data/members/${escapeHtml(memberName)}.md</div>`;
  }

  const name = data.title || memberName;
  const dept = data.sections.get('系所') || '';
  const year = data.sections.get('年級') || '';
  const interest = data.sections.get('興趣') || '';
  const github = data.sections.get('GitHub') || '';

  const parts = [];
  parts.push(`<div class="member">`);
  parts.push(`<span class="member__name">${escapeHtml(name)}</span>`);
  if (dept && !isTodo(dept)) parts.push(`<span class="member__info">${escapeHtml(dept)}</span>`);
  if (year && !isTodo(year)) parts.push(`<span class="member__info">${escapeHtml(year)}</span>`);
  if (interest && !isTodo(interest)) parts.push(`<span class="member__info">${escapeHtml(interest)}</span>`);
  if (github && !isTodo(github)) {
    parts.push(`<a class="member__github" href="https://github.com/${escapeHtml(github)}" target="_blank" rel="noopener">@${escapeHtml(github)}</a>`);
  }
  parts.push(`</div>`);
  return parts.join('\n');
}

function buildTeamCard(dataDir, teamFolder, index) {
  const display = teamDisplayName(teamFolder);
  const color = COLORS[index % COLORS.length];
  const data = loadTeamData(dataDir, teamFolder);

  if (data.error) {
    return {
      status: 'error',
      html: `<article class="card card--error" style="--team-color: ${color}">
  <div class="card__header">
    <span class="card__code">${escapeHtml(display)}</span>
    <span class="card__status card__status--error">&#9888; 格式錯誤</span>
  </div>
  <div class="card__body">
    <p class="card__error-msg">&#9888; 資料格式有誤：${escapeHtml(data.error)}</p>
  </div>
</article>`
    };
  }

  const sections = data.sections;
  const requiredSections = ['Team Name', 'Slogan', 'Introduction', 'Members'];
  const missingSections = requiredSections.filter(s => !sections.has(s));

  if (missingSections.length > 0) {
    return {
      status: 'error',
      html: `<article class="card card--error" style="--team-color: ${color}">
  <div class="card__header">
    <span class="card__code">${escapeHtml(display)}</span>
    <span class="card__status card__status--error">&#9888; 格式錯誤</span>
  </div>
  <div class="card__body">
    <p class="card__error-msg">&#9888; 資料格式有誤：缺少區段 ${missingSections.map(s => `「## ${s}」`).join('、')}</p>
  </div>
</article>`
    };
  }

  const teamName = sections.get('Team Name');
  const slogan = sections.get('Slogan');
  const intro = sections.get('Introduction');
  const membersText = sections.get('Members');
  const memberList = isTodo(membersText) ? [] : parseMembers(membersText);

  const allTodo = isTodo(teamName) && isTodo(slogan) && isTodo(intro) && memberList.length === 0;

  if (allTodo) {
    return {
      status: 'pending',
      html: `<article class="card card--pending" style="--team-color: ${color}">
  <div class="card__header">
    <span class="card__code">${escapeHtml(display)}</span>
    <span class="card__status card__status--pending">&#9203; 尚未提交</span>
  </div>
  <div class="card__body">
    <p class="card__pending-msg">等待隊伍提交資料...</p>
  </div>
</article>`
    };
  }

  const membersHtml = memberList.length > 0
    ? `<div class="card__members">${memberList.map(m => buildMemberHtml(dataDir, m)).join('\n')}</div>`
    : '';

  return {
    status: 'done',
    html: `<article class="card card--done" style="--team-color: ${color}">
  <div class="card__header">
    <span class="card__code">${escapeHtml(display)}</span>
    <span class="card__status card__status--done">&#10003;</span>
  </div>
  <div class="card__body">
    <h2 class="card__team-name">${isTodo(teamName) ? escapeHtml(display) : escapeHtml(teamName)}</h2>
    ${!isTodo(slogan) ? `<p class="card__slogan">${escapeHtml(slogan)}</p>` : ''}
    ${!isTodo(intro) ? `<p class="card__intro">${escapeHtml(intro)}</p>` : ''}
    ${membersHtml}
  </div>
</article>`
  };
}

const teams = discoverTeams(dataDir);

let contentHtml;

if (teams.length === 0) {
  contentHtml = `
<div class="empty-state">
  <h2>&#128075; 尚未建立任何隊伍</h2>
  <p>請講師執行以下指令來初始化隊伍：</p>
  <pre><code>node scripts/init-teams.mjs &lt;組數&gt;</code></pre>
  <p>例如 <code>node scripts/init-teams.mjs 5</code> 會建立 Team A 到 Team E。</p>
</div>`;
} else {
  const cards = teams.map((t, i) => buildTeamCard(dataDir, t, i));
  const doneCount = cards.filter(c => c.status === 'done').length;
  const total = cards.length;

  const tagItems = teams.map((t, i) => {
    const status = cards[i].status;
    const icon = status === 'done' ? '&#10003;' : status === 'error' ? '&#9888;' : '&#9203;';
    const cls = `tag tag--${status}`;
    return `<span class="${cls}">${escapeHtml(teamDisplayName(t))} ${icon}</span>`;
  }).join('\n');

  contentHtml = `
<div class="progress">
  <div class="progress__summary">已完成 <strong>${doneCount}</strong> / <strong>${total}</strong> 組</div>
  <div class="progress__tags">${tagItems}</div>
</div>
<div class="grid">
  ${cards.map(c => c.html).join('\n')}
</div>`;
}

const buildTime = new Date().toLocaleString('zh-TW', { timeZone: 'Asia/Taipei' });

const template = readFileSync(join(siteDir, 'template.html'), 'utf-8');
const finalHtml = template
  .replace('<!-- TEAMS -->', contentHtml)
  .replace('<!-- BUILD_TIME -->', escapeHtml(buildTime));

mkdirSync(distDir, { recursive: true });
writeFileSync(join(distDir, 'index.html'), finalHtml, 'utf-8');
cpSync(join(siteDir, 'style.css'), join(distDir, 'style.css'));

console.log('');
console.log('=== 建置完成 ===');
console.log('');
console.log(`隊伍數：${teams.length}`);
console.log(`輸出：dist/index.html`);
console.log(`建置時間：${buildTime}`);
console.log('');
