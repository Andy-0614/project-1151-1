import { readdirSync, readFileSync } from 'node:fs';
import { join, basename } from 'node:path';

export function parseSections(text) {
  const lines = text.split('\n');
  let title = null;
  const sections = new Map();
  let currentSection = null;
  let currentLines = [];

  for (const line of lines) {
    const h1 = line.match(/^#\s+(.+)/);
    const h2 = line.match(/^##\s+(.+)/);

    if (h1 && title === null) {
      title = h1[1].trim();
      continue;
    }

    if (h2) {
      if (currentSection !== null) {
        sections.set(currentSection, currentLines.join('\n').trim());
      }
      currentSection = h2[1].trim();
      currentLines = [];
      continue;
    }

    if (currentSection !== null) {
      currentLines.push(line);
    }
  }

  if (currentSection !== null) {
    sections.set(currentSection, currentLines.join('\n').trim());
  }

  return { title, sections };
}

export function parseMembers(memberText) {
  return memberText
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.startsWith('- '))
    .map(line => line.slice(2).trim());
}

export function isTodo(value) {
  return typeof value === 'string' && value.trimStart().startsWith('TODO');
}

function teamSortKey(name) {
  const match = name.match(/^team-(.+)$/);
  if (!match) return [name.length, name];
  const suffix = match[1];
  return [suffix.length, suffix];
}

function compareTeams(a, b) {
  const ka = teamSortKey(a);
  const kb = teamSortKey(b);
  if (ka[0] !== kb[0]) return ka[0] - kb[0];
  if (ka[1] < kb[1]) return -1;
  if (ka[1] > kb[1]) return 1;
  return 0;
}

export function discoverTeams(dataDir) {
  const teamsDir = join(dataDir, 'teams');
  let entries;
  try {
    entries = readdirSync(teamsDir, { withFileTypes: true });
  } catch {
    return [];
  }
  return entries
    .filter(e => e.isDirectory() && !e.name.startsWith('_'))
    .map(e => e.name)
    .sort(compareTeams);
}

export function teamDisplayName(folderName) {
  const match = folderName.match(/^team-(.+)$/);
  if (!match) return folderName;
  const suffix = match[1].toUpperCase();
  return `Team ${suffix}`;
}

export function loadTeamData(dataDir, teamFolder) {
  const filePath = join(dataDir, 'teams', teamFolder, 'team.md');
  try {
    const text = readFileSync(filePath, 'utf-8');
    return { filePath, ...parseSections(text) };
  } catch (err) {
    return { filePath, error: `無法讀取檔案：${err.message}` };
  }
}

export function loadMemberData(dataDir, memberName) {
  const filePath = join(dataDir, 'members', `${memberName}.md`);
  try {
    const text = readFileSync(filePath, 'utf-8');
    return { filePath, ...parseSections(text) };
  } catch {
    return { filePath, error: `找不到 data/members/${memberName}.md` };
  }
}

export function discoverMembers(dataDir) {
  const membersDir = join(dataDir, 'members');
  let entries;
  try {
    entries = readdirSync(membersDir, { withFileTypes: true });
  } catch {
    return [];
  }
  return entries
    .filter(e => e.isFile() && e.name.endsWith('.md') && !e.name.startsWith('_'))
    .map(e => basename(e.name, '.md'));
}
