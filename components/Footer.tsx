import Link from 'next/link';
import { Github, Heart, Rss } from 'lucide-react';

const quickLinks = [
  { name: 'หน้าแรก', href: '/' },
  { name: 'บทความ', href: '/blog' },
  { name: 'RSS Feed', href: '/feed.xml' },
  { name: 'GitHub', href: 'https://github.com/DDME36' },
  { name: 'เว็บส่วนตัว', href: 'https://satayupongpan.site/' },
];

const projects = [
  { name: 'PUNN INVESTING', href: 'https://ddme36.github.io/PUNN-INVESTING/' },
  { name: 'Smart AI Stock', href: 'https://smartaistock.vercel.app/' },
  { name: 'MemoKard', href: 'https://memokard.vercel.app/' },
];

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-gray-100/50 bg-transparent text-gray-700">
      <div className="relative mx-auto max-w-6xl px-6 py-16 sm:py-20">
        {/* Main Footer Links */}
        <div className="mb-16 grid grid-cols-1 gap-12 md:grid-cols-4">
          {/* Column 1: Brand */}
          <div className="space-y-6 md:col-span-2">
            <Link
              href="/"
              className="inline-block font-display text-3xl font-black tracking-tighter"
            >
              <span className="bg-gradient-to-r from-rose-400 to-purple-400 bg-clip-text text-transparent">
                PUNN
              </span>
              <span className="text-gray-800"> HUB</span>
            </Link>
            <p className="max-w-sm text-lg leading-relaxed text-gray-500">
              แหล่งรวมความรู้ เทคนิคการเขียนโปรแกรม และอัปเดตเทคโนโลยีใหม่ๆ
              เพื่อช่วยให้การพัฒนาซอฟต์แวร์เป็นเรื่องง่ายและสนุก
            </p>
            <div className="flex gap-4">
              <a
                href="https://github.com/DDME36"
                target="_blank"
                rel="noreferrer"
                className="flex h-12 w-12 items-center justify-center rounded-2xl border border-gray-100 bg-white shadow-sm transition-all hover:border-rose-200 hover:text-rose-500"
              >
                <Github size={20} />
              </a>
              <a
                href="/feed.xml"
                target="_blank"
                rel="noreferrer"
                className="flex h-12 w-12 items-center justify-center rounded-2xl border border-gray-100 bg-white shadow-sm transition-all hover:border-orange-200 hover:text-orange-500"
              >
                <Rss size={20} />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-6">
            <h4 className="text-sm font-black uppercase tracking-widest text-gray-400">
              ลิงก์หลัก
            </h4>
            <ul className="space-y-4">
              {quickLinks.slice(0, 3).map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="font-bold text-gray-600 transition-colors hover:text-rose-500"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Projects */}
          <div className="space-y-6">
            <h4 className="text-sm font-black uppercase tracking-widest text-gray-400">
              โปรเจกต์เด่น
            </h4>
            <ul className="space-y-4">
              {projects.map((project) => (
                <li key={project.name}>
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noreferrer"
                    className="font-bold text-gray-600 transition-colors hover:text-purple-500"
                  >
                    {project.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="mb-8 h-px w-full bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

        {/* Bottom Bar */}
        <div className="flex flex-col items-center justify-between gap-6 text-sm font-medium text-gray-400 md:flex-row">
          <div className="flex items-center gap-2">
            © {currentYear} PUNN HUB · Made with{' '}
            <Heart size={14} className="fill-rose-400 text-rose-400" /> in Thailand
          </div>
          <div className="flex items-center gap-6">
            <span className="flex cursor-default items-center gap-2 transition-colors hover:text-gray-600">
              <div className="h-1.5 w-1.5 rounded-full bg-rose-300" />
              Next.js 16
            </span>
            <span className="flex cursor-default items-center gap-2 transition-colors hover:text-gray-600">
              <div className="h-1.5 w-1.5 rounded-full bg-purple-300" />
              Tailwind v3
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
