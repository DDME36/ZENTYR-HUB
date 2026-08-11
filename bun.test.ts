import { expect, test, describe } from 'bun:test';

describe('Bun Test Example', () => {
  test('2 + 2 = 4', () => {
    expect(2 + 2).toBe(4);
  });

  test('string concatenation', () => {
    expect('Hello' + ' ' + 'World').toBe('Hello World');
  });
});

// ตัวอย่าง test สำหรับ utility functions
describe('Utils', () => {
  test('cn function should merge classes', async () => {
    const { cn } = await import('./lib/utils');
    expect(cn('class1', 'class2')).toContain('class1');
  });

  test('slugify supports Thai headings and normalizes spaces', async () => {
    const { slugify } = await import('./lib/utils');
    expect(slugify('  วิธี ใช้งาน PUNN HUB!  ')).toBe('วิธี-ใช้งาน-punn-hub');
  });
});
