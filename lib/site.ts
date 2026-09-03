export const SITE_NAME = 'ZENTYR';

const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL;
const normalizedSiteUrl = configuredSiteUrl
  ? configuredSiteUrl.startsWith('http')
    ? configuredSiteUrl
    : `https://${configuredSiteUrl}`
  : 'https://zentyr-hub.vercel.app';

export const SITE_URL = normalizedSiteUrl.replace(/\/$/, '');
export const SITE_TITLE = 'ZENTYR | Creative Tech Lab';
export const SITE_DESCRIPTION =
  'พื้นที่ทดลองและแบ่งปันการสร้าง AI เว็บแอป และซอฟต์แวร์ จากไอเดียสู่โปรดักต์ที่ใช้งานได้จริง';
export const AUTHOR_NAME = 'Satayu Pongpan';
export const AUTHOR_URL = 'https://satayupongpan.site';

export const absoluteUrl = (path: string) => new URL(path, SITE_URL).toString();
