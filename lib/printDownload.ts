import type { RefObject } from "react";

// lib/printDownload.ts — shared print-quality download utility
// scale: 4 → 720 DPI at 3.5"×2" (2520×1440px), well above 300 DPI print minimum
// Injects PNG pHYs chunk so printers read the correct DPI instead of 72 DPI screen default

function injectPngDpi(bytes: Uint8Array, dpi: number): Uint8Array {
  const table = new Uint32Array(256);
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    table[i] = c;
  }
  const crc32 = (buf: Uint8Array) => {
    let c = 0xffffffff;
    for (const b of buf) c = table[(c ^ b) & 0xff] ^ (c >>> 8);
    return (c ^ 0xffffffff) >>> 0;
  };

  const ppm = Math.round(dpi / 0.0254);
  const typeBytes = new Uint8Array([112, 72, 89, 115]); // "pHYs"
  const data = new Uint8Array([
    (ppm >> 24) & 0xff, (ppm >> 16) & 0xff, (ppm >> 8) & 0xff, ppm & 0xff,
    (ppm >> 24) & 0xff, (ppm >> 16) & 0xff, (ppm >> 8) & 0xff, ppm & 0xff,
    1, // unit = meter
  ]);
  const crcBuf = new Uint8Array(13);
  crcBuf.set(typeBytes); crcBuf.set(data, 4);
  const crc = crc32(crcBuf);

  const chunk = new Uint8Array(4 + 4 + 9 + 4);
  chunk[3] = 9;
  chunk.set(typeBytes, 4);
  chunk.set(data, 8);
  chunk[17] = (crc >> 24) & 0xff; chunk[18] = (crc >> 16) & 0xff;
  chunk[19] = (crc >> 8) & 0xff;  chunk[20] = crc & 0xff;

  const pos = 33; // PNG sig (8) + IHDR chunk (25)
  const out = new Uint8Array(bytes.length + chunk.length);
  out.set(bytes.slice(0, pos));
  out.set(chunk, pos);
  out.set(bytes.slice(pos), pos + chunk.length);
  return out;
}

async function captureCanvas(ref: RefObject<HTMLDivElement | null>): Promise<{ canvas: HTMLCanvasElement; cardEl: HTMLElement | null }> {
  const cardEl = ref.current!.firstElementChild as HTMLElement | null;
  if (cardEl) { cardEl.style.boxShadow = "none"; cardEl.style.borderRadius = "0"; }
  const html2canvas = (await import("html2canvas")).default;
  const canvas = await html2canvas(ref.current!, { scale: 4, useCORS: true, backgroundColor: null });
  if (cardEl) { cardEl.style.boxShadow = ""; cardEl.style.borderRadius = ""; }
  return { canvas, cardEl };
}

export async function downloadPrintAsset(
  ref: RefObject<HTMLDivElement | null>,
  filename: string,
  dpi = 720,
) {
  if (!ref.current) return;
  const { canvas } = await captureCanvas(ref);

  const blob = await new Promise<Blob>(resolve => canvas.toBlob(b => resolve(b!), "image/png"));
  const buf = (await blob.arrayBuffer()) as ArrayBuffer;
  const withDpi = injectPngDpi(new Uint8Array(buf), dpi);

  const a = document.createElement("a");
  a.download = `${filename}.png`;
  a.href = URL.createObjectURL(new Blob([withDpi.buffer as ArrayBuffer], { type: "image/png" }));
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 60000);
}

// Business card = 3.5" × 2" at 300 DPI → embed rasterized image in a properly-sized PDF
export async function downloadPrintAssetPDF(
  ref: RefObject<HTMLDivElement | null>,
  filename: string,
) {
  if (!ref.current) return;
  const { canvas } = await captureCanvas(ref);
  const imgData = canvas.toDataURL("image/png");

  const { jsPDF } = await import("jspdf");
  // Landscape PDF exactly 3.5" × 2"
  const pdf = new jsPDF({ orientation: "landscape", unit: "in", format: [3.5, 2] });
  pdf.addImage(imgData, "PNG", 0, 0, 3.5, 2);
  pdf.save(`${filename}.pdf`);
}
