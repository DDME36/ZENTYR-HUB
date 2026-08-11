# PUNN HUB

เว็บรวมบทความ คู่มือ และโปรเจกต์ที่สร้างโดย PUNN พัฒนาด้วย Next.js 16, React 19, TypeScript, Tailwind CSS และ Bun

## ความสามารถหลัก

- บทความ Markdown พร้อมรูปที่เก็บใน repository
- ค้นหาและกรองบทความตามหมวดหมู่
- สารบัญ, syntax highlighting, สูตรคณิตศาสตร์ และบทความแบบ series
- Metadata, Open Graph, JSON-LD, sitemap, robots.txt และ RSS
- Responsive UI, Vercel Analytics และ reduced-motion support
- ตรวจสอบ draft, frontmatter และ slug ซ้ำก่อนเผยแพร่

## เริ่มต้นใช้งาน

```bash
bun install
bun dev
```

เปิด `http://localhost:3000`

## คำสั่งสำคัญ

```bash
bun dev                 # Development server
bun run build           # Production build
bun run typecheck       # ตรวจ TypeScript
bun run lint            # ตรวจ ESLint
bun test                # รันชุดทดสอบ
bun run format:check    # ตรวจรูปแบบโค้ด
bun run post:new "ชื่อบทความ" article-slug
```

## การเขียนบทความ

บทความอยู่ใน `content/posts/*.md` และรูปอยู่ใน `public/images/` ระบบไม่ต้องใช้ Notion token หรือฐานข้อมูลภายนอก

สร้างบทความใหม่ด้วยคำสั่ง:

```bash
bun run post:new "ชื่อบทความ" article-slug
```

คำสั่งนี้จะสร้าง `content/posts/article-slug.md` และโฟลเดอร์รูป `public/images/posts/article-slug/` บทความใหม่จะเป็น `draft: true` จึงยังไม่แสดงบนเว็บไซต์ ให้เปลี่ยนเป็น `draft: false` เมื่อพร้อมเผยแพร่

ไฟล์บทความขั้นต่ำ:

```yaml
---
title: 'ชื่อบทความ'
date: '2026-08-11'
tags: ['Tutorial']
cover: '/images/covers/example.png'
excerpt: 'คำอธิบายสั้นสำหรับหน้าค้นหา'
draft: false
---
```

ใส่รูปโดยวางไฟล์ไว้ใน `public/images/posts/article-slug/` แล้วอ้างอิงในบทความดังนี้:

```markdown
![คำอธิบายรูป](/images/posts/article-slug/step-1.png)
```

ชื่อไฟล์ Markdown จะกลายเป็น URL ของบทความ เช่น `my-tool.md` จะเปิดที่ `/blog/my-tool`

## โครงสร้างโปรเจกต์

```text
app/                    Next.js routes และ metadata
components/             UI และ interactive components
content/posts/          ไฟล์บทความ Markdown
lib/mdx.ts              อ่าน ตรวจ และ cache บทความ
public/images/          รูปปกและรูปประกอบบทความ
scripts/new-post.js     ตัวช่วยสร้างบทความร่าง
```

## Deploy

ตั้งค่า Vercel ให้ใช้ `bun install` และ `bun run build` ตาม `vercel.json` ไม่ต้องตั้งค่า environment variable สำหรับการอ่านบทความ

## License

MIT
