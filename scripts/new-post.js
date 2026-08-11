import fs from 'node:fs';
import path from 'node:path';

const [, , title, slugInput] = process.argv;

if (!title || !slugInput) {
  console.error('Usage: bun run post:new "ชื่อบทความ" article-slug');
  process.exit(1);
}

const slug = slugInput
  .trim()
  .toLowerCase()
  .replace(/[^a-z0-9-]+/g, '-')
  .replace(/-{2,}/g, '-')
  .replace(/^-|-$/g, '');

if (!slug) {
  console.error('Slug must contain English letters or numbers. Example: my-new-tool');
  process.exit(1);
}

const projectRoot = process.cwd();
const postPath = path.join(projectRoot, 'content', 'posts', `${slug}.md`);
const imageDirectory = path.join(projectRoot, 'public', 'images', 'posts', slug);

if (fs.existsSync(postPath)) {
  console.error(`Post already exists: ${postPath}`);
  process.exit(1);
}

const today = new Date().toISOString().slice(0, 10);
const frontmatterTitle = JSON.stringify(title.trim());
const template = `---
title: ${frontmatterTitle}
date: "${today}"
tags: []
cover: null
excerpt: ""
draft: true
---

# ${title.trim()}

เขียนเกริ่นนำสั้นๆ ว่าบทความหรือโปรแกรมนี้ช่วยแก้ปัญหาอะไร

## สิ่งที่ต้องเตรียม

- รายการที่ผู้อ่านต้องมี

## วิธีใช้งาน

1. ขั้นตอนแรก
2. ขั้นตอนถัดไป

## สรุป

สรุปผลลัพธ์และแนบลิงก์ที่เกี่ยวข้อง
`;

fs.mkdirSync(path.dirname(postPath), { recursive: true });
fs.mkdirSync(imageDirectory, { recursive: true });
fs.writeFileSync(postPath, template, 'utf8');

console.log(`Created draft: ${path.relative(projectRoot, postPath)}`);
console.log(`Image folder: ${path.relative(projectRoot, imageDirectory)}`);
console.log('Set draft: false when the article is ready to publish.');
