import { Link } from "react-router";
import type { CharacterPose } from "@/components/Character";
import { useTypewriter } from "@/hooks/useTypewriter";
import { POSE_TEXT } from "@/data/poseTextData";
import type { TypewriterPhase } from "@/hooks/useTypewriter";

const RESUME_URL = "/Evgeny_Shkuratov_Product_Design_Engineer.pdf";

const POSE_LABELS: Record<CharacterPose, { label: string; path: string }> = {
  experience: { label: "Experience", path: "/experience" },
  products: { label: "Products", path: "/products" },
  cases: { label: "Cases", path: "/cases" },
  content: { label: "Content", path: "/content" },
  about: { label: "About", path: "/about" },
  resume: { label: "Resume", path: "" },
};

interface PoseTextProps {
  pose: CharacterPose | null;
}

function getOpacityClass(phase: TypewriterPhase): string {
  switch (phase) {
    case "idle":
      return "opacity-0";
    case "typing":
      return "opacity-100";
    case "fading-out":
      return "opacity-0";
  }
}

export function PoseText({ pose }: PoseTextProps) {
  const { visibleChars, phase, activePose } = useTypewriter(pose);

  // Use activePose (not prop pose) so text stays visible during fade-out
  const textData = activePose ? POSE_TEXT[activePose] : null;

  if (!textData) return null;

  let charIndex = 0;

  return (
    <div
      className={`absolute w-[230px] md:w-[247px] left-1/2 -translate-x-1/2 top-[calc(100%+20px)] lg:left-[calc(100%-88px)] lg:translate-x-0 lg:top-[-16px] font-['SF_Pro_Text','-apple-system',BlinkMacSystemFont,sans-serif] text-[14px] md:text-lg leading-[1.3] text-center lg:text-left transition-opacity duration-200 ${getOpacityClass(phase)}`}
    >
      {textData.map((line, lineIdx) => {
        const lineContent = line.map((segment, segIdx) => {
          const segmentChars = segment.text.split("").map((char) => {
            const idx = charIndex;
            charIndex += 1;
            if (idx >= visibleChars) return null;
            return (
              <span
                key={idx}
                className={
                  segment.color === "white"
                    ? "text-white font-normal"
                    : "text-text-secondary"
                }
              >
                {char}
              </span>
            );
          });
          return <span key={segIdx}>{segmentChars}</span>;
        });

        return (
          <p key={lineIdx} className={lineIdx < textData.length - 1 ? "mb-3" : ""}>
            {lineContent}
          </p>
        );
      })}
      {activePose && (
        activePose === "resume" ? (
          <button
            type="button"
            onClick={() => {
              window.open(RESUME_URL, "_blank", "noopener");
              const a = document.createElement("a");
              a.href = RESUME_URL;
              a.download = "Evgeny_Shkuratov_Product_Design_Engineer.pdf";
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
            }}
            className="inline-block mt-4 text-accent md:hidden"
          >
            {POSE_LABELS[activePose].label}
          </button>
        ) : (
          <Link
            to={POSE_LABELS[activePose].path}
            className="inline-block mt-4 text-accent md:hidden"
          >
            {POSE_LABELS[activePose].label}
          </Link>
        )
      )}
    </div>
  );
}
