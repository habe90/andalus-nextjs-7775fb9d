import "server-only";

const BLOCK_TAGS = new Set([
  "p",
  "br",
  "strong",
  "b",
  "em",
  "i",
  "u",
  "h2",
  "h3",
  "h4",
  "ul",
  "ol",
  "li",
  "a",
  "blockquote",
]);
const STRIP_WITH_CONTENT = new Set([
  "script",
  "style",
  "iframe",
  "object",
  "embed",
  "form",
  "input",
  "button",
]);

export function sanitizeArticleHtml(html: string): string {
  let out = html;
  for (const tag of STRIP_WITH_CONTENT)
    out = out.replace(
      new RegExp(`<${tag}[^>]*>[\\s\\S]*?<\\/${tag}>`, "gi"),
      "",
    );
  out = out.replace(/<!--[\s\S]*?-->/g, "");
  out = out.replace(/<\/?([a-z0-9]+)([^>]*)>/gi, (match, rawTag, attrs) => {
    const tag = String(rawTag).toLowerCase();
    const closing = match.startsWith("</");
    if (!BLOCK_TAGS.has(tag)) return "";
    if (closing) return `</${tag}>`;
    if (tag === "a") {
      const hrefMatch = /href\s*=\s*("([^"]*)"|'([^']*)')/i.exec(attrs);
      const href = hrefMatch ? hrefMatch[2] ?? hrefMatch[3] ?? "" : "";
      if (!href || /^\s*javascript:/i.test(href)) return "<a>";
      const safeHref = href.replace(/"/g, "&quot;");
      return `<a href="${safeHref}" target="_blank" rel="noreferrer noopener">`;
    }
    return `<${tag}>`;
  });
  return out.trim();
}
