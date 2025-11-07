import { RichText as RichTextType, TextSegment } from "@/lib/types/content";

interface RichTextProps {
  content: RichTextType;
  className?: string;
}

function isTextSegment(segment: string | TextSegment): segment is TextSegment {
  return typeof segment === "object" && segment !== null && "text" in segment;
}

export function RichText({ content, className = "" }: RichTextProps) {
  return (
    <span className={className}>
      {content.map((segment, index) => {
        if (typeof segment === "string") {
          return segment;
        }

        if (isTextSegment(segment) && segment.link) {
          return (
            <a
              key={index}
              href={segment.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-link hover:underline transition-all"
            >
              {segment.text}
            </a>
          );
        }

        if (isTextSegment(segment)) {
          return segment.text;
        }

        return null;
      })}
    </span>
  );
}
