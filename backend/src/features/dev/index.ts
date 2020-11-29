import { Middleware } from 'koa';

function getStatement(): string {
  const statements = [
    '碼運昌隆',
    '以夢為碼',
    '碼到成功',
    '鮮衣怒碼',
    '一碼當先',
    '厲兵秣碼',
    '路遙知碼力',
  ];
  const randomIndex = Math.floor(Math.random() * statements.length);

  return statements[randomIndex];
}

function getSVG(text: string): string {
  const fontSize = 20;
  const letterSpacing = 2;
  const width = text.length * fontSize + (text.length - 1) * letterSpacing;
  const height = fontSize * 1.5;
  return `
<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 ${width} ${height}"
  width="${width}"
  height="${height}"
>
  <text
    x="0"
    y="50%"
    dominant-baseline="central"
    font-size="${fontSize}"
    letter-spacing="${letterSpacing}"
  >
    ${text}
  </text>
</svg>
`;
}

const longLiveTheCode: Middleware = async ctx => {
  const text = getStatement();

  ctx.set('Content-Type', 'image/svg+xml');
  ctx.body = getSVG(text);
};

export default {
  longLiveTheCode,
};
