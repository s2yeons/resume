// index.html을 A4 PDF(resume.pdf)로 렌더링합니다.
import { chromium } from "playwright";
import { fileURLToPath, pathToFileURL } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const input = pathToFileURL(path.join(root, "index.html")).href;
const output = path.join(root, "resume.pdf");

const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto(input, { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts.ready);
await page.emulateMedia({ media: "print" });
await page.pdf({ path: output, preferCSSPageSize: true, printBackground: true });
await browser.close();

console.log(`PDF 생성 완료: ${output}`);
