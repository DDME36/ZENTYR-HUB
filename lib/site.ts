export const SITE_NAME = 'ZENTYR';
export const SITE_URL = 'https://punn.site';
export const SITE_TITLE = 'ZENTYR | Creative Tech Lab';
export const SITE_DESCRIPTION =
  'พื้นที่ทดลองและแบ่งปันการสร้าง AI เว็บแอป และซอฟต์แวร์ จากไอเดียสู่โปรดักต์ที่ใช้งานได้จริง';
export const AUTHOR_NAME = 'Satayu Pongpan';
export const AUTHOR_URL = 'https://satayupongpan.site';

export const absoluteUrl = (path: string) => new URL(path, SITE_URL).toString();
