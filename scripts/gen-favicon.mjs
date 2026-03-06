// Generates public/favicon.png — a 32x32 gold square with "PV"
// No dependencies, uses only Node built-ins (zlib + fs)
import { deflateSync } from "zlib";
import { writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { join, dirname } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

function crc32(buf) {
  let crc = 0xffffffff;
  for (const b of buf) {
    crc ^= b;
    for (let i = 0; i < 8; i++)
      crc = crc & 1 ? (crc >>> 1) ^ 0xedb88320 : crc >>> 1;
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const typeBytes = Buffer.from(type, "ascii");
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const crcInput = Buffer.concat([typeBytes, data]);
  const crcBuf = Buffer.alloc(4);
  crcBuf.writeUInt32BE(crc32(crcInput));
  return Buffer.concat([len, typeBytes, data, crcBuf]);
}

const W = 32, H = 32;

// Background color: #8B6914 (Soft Autumn gold)
const BG = [0x8b, 0x69, 0x14];

// Build raw image rows (RGBA)
const rows = [];
for (let y = 0; y < H; y++) {
  const row = [];
  for (let x = 0; x < W; x++) {
    // Rounded corner mask (radius 5)
    const r = 5;
    const dx = Math.min(x, W - 1 - x);
    const dy = Math.min(y, H - 1 - y);
    const inCorner = dx < r && dy < r;
    const dist = Math.sqrt((r - dx) ** 2 + (r - dy) ** 2);
    const alpha = inCorner ? (dist > r ? 0 : dist > r - 1 ? Math.round((r - dist) * 255) : 255) : 255;

    row.push(...BG, alpha);
  }
  rows.push(row);
}

// Overlay simple "PV" pixels (hand-drawn 1-bit font, centered in 32x32)
// P: cols 8-12, rows 8-20  V: cols 14-22, rows 8-20
const pixels = [
  // Letter P (x offset 6)
  ...[8,9,10,11].map(x => ({ x, y: 8 })),
  ...[8,9,10,11].map(x => ({ x, y: 13 })),
  ...Array.from({length:13}, (_,i) => ({ x: 6, y: 8+i })),
  ...[7,8,9,10].map(x => ({ x, y: 8 })),
  ...[7,8,9,10].map(x => ({ x, y: 13 })),
  { x: 11, y: 9 }, { x: 11, y: 10 }, { x: 11, y: 11 }, { x: 11, y: 12 },
  // Letter V (x offset 14)
  ...Array.from({length:9}, (_,i) => ({ x: 14, y: 8+i })),
  ...Array.from({length:9}, (_,i) => ({ x: 22, y: 8+i })),
  { x: 15, y: 17 }, { x: 21, y: 17 },
  { x: 16, y: 18 }, { x: 20, y: 18 },
  { x: 17, y: 19 }, { x: 19, y: 19 },
  { x: 18, y: 20 },
];

const CREAM = [0xf5, 0xe6, 0xc8];
for (const { x, y } of pixels) {
  if (x >= 0 && x < W && y >= 0 && y < H) {
    const i = y * W * 4 + x * 4;
    rows[y][x * 4 + 0] = CREAM[0]; // wait, rows is flat per row
    // rebuild: rows[y] is flat RGBA array of length W*4
  }
}

// Simpler rebuild: flat RGBA buffer
const imgData = Buffer.alloc(H * W * 4);
for (let y = 0; y < H; y++) {
  for (let x = 0; x < W; x++) {
    const i = (y * W + x) * 4;
    const r = 5;
    const dx = Math.min(x, W - 1 - x);
    const dy = Math.min(y, H - 1 - y);
    const inCorner = dx < r && dy < r;
    const dist = Math.sqrt((r - dx) ** 2 + (r - dy) ** 2);
    const alpha = inCorner ? (dist > r ? 0 : dist > r - 1 ? Math.round((r - dist) * 255) : 255) : 255;
    imgData[i] = BG[0]; imgData[i+1] = BG[1]; imgData[i+2] = BG[2]; imgData[i+3] = alpha;
  }
}
for (const { x, y } of pixels) {
  if (x >= 0 && x < W && y >= 0 && y < H) {
    const i = (y * W + x) * 4;
    imgData[i] = CREAM[0]; imgData[i+1] = CREAM[1]; imgData[i+2] = CREAM[2]; imgData[i+3] = 255;
  }
}

// Build PNG
const sig = Buffer.from([137,80,78,71,13,10,26,10]);
const ihdr = Buffer.alloc(13);
ihdr.writeUInt32BE(W, 0); ihdr.writeUInt32BE(H, 4);
ihdr[8] = 8; // bit depth
ihdr[9] = 6; // RGBA
ihdr[10] = 0; ihdr[11] = 0; ihdr[12] = 0;

// Build raw scanlines (filter byte 0 + row data)
const raw = Buffer.alloc(H * (1 + W * 4));
for (let y = 0; y < H; y++) {
  raw[y * (1 + W * 4)] = 0; // filter none
  imgData.copy(raw, y * (1 + W * 4) + 1, y * W * 4, (y + 1) * W * 4);
}

const compressed = deflateSync(raw, { level: 9 });

const png = Buffer.concat([
  sig,
  chunk("IHDR", ihdr),
  chunk("IDAT", compressed),
  chunk("IEND", Buffer.alloc(0)),
]);

const outPath = join(__dirname, "../public/favicon.png");
writeFileSync(outPath, png);
console.log("Written:", outPath, `(${png.length} bytes)`);
