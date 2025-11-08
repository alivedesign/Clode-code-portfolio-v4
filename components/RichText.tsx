import { RichText as RichTextType, TextSegment } from "@/lib/types/content";

interface RichTextProps {
  content: RichTextType;
  className?: string;
}

function isTextSegment(segment: string | TextSegment): segment is TextSegment {
  return typeof segment === "object" && segment !== null && "text" in segment;
}

/**
 * Validates if a URL is safe to use (http/https only)
 * Prevents javascript:, data:, and other potentially dangerous protocols
 */
function isSafeUrl(url: string): boolean {
  try {
    // Try parsing as absolute URL first
    const parsedUrl = new URL(url);
    return parsedUrl.protocol === 'http:' || parsedUrl.protocol === 'https:';
  } catch {
    // If that fails, it might be a relative URL, which is also safe
    // Check if it starts with dangerous protocols
    const dangerousProtocols = ['javascript:', 'data:', 'vbscript:', 'file:'];
    const lowerUrl = url.toLowerCase().trim();
    return !dangerousProtocols.some(protocol => lowerUrl.startsWith(protocol));
  }
}

export function RichText({ content, className = "" }: RichTextProps) {
  return (
    <span className={className}>
      {content.map((segment, index) => {
        // Generate a more stable key using content hash
        const generateKey = () => {
          if (typeof segment === "string") {
            return `text-${index}-${segment.slice(0, 20)}`;
          }
          if (isTextSegment(segment)) {
            return `segment-${index}-${segment.text.slice(0, 20)}`;
          }
          return `unknown-${index}`;
        };

        if (typeof segment === "string") {
          return <span key={generateKey()}>{segment}</span>;
        }

        if (isTextSegment(segment) && segment.link) {
          // Validate URL before rendering as a link
          if (!isSafeUrl(segment.link)) {
            // If URL is unsafe, render as plain text
            console.warn(`Unsafe URL detected and blocked: ${segment.link}`);
            const colorClass = segment.color === 'white' ? 'text-white' : '';
            return <span key={generateKey()} className={`${segment.bold ? "font-semibold" : ""} ${colorClass}`.trim()}>{segment.text}</span>;
          }

          const colorClass = segment.color === 'white' ? 'text-white' : '';
          return (
            <a
              key={generateKey()}
              href={segment.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`text-link hover:underline transition-all ${segment.bold ? "font-semibold" : ""} ${colorClass}`.trim()}
            >
              {segment.text}
            </a>
          );
        }

        if (isTextSegment(segment)) {
          const colorClass = segment.color === 'white' ? 'text-white' : '';
          return <span key={generateKey()} className={`${segment.bold ? "font-semibold" : ""} ${colorClass}`.trim()}>{segment.text}</span>;
        }

        return null;
      })}
    </span>
  );
}
