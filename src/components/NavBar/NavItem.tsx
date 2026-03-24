import type { CharacterPose } from "@/components/Character/useCharacterState";

interface NavItemProps {
  label: string;
  pose: CharacterPose;
  href: string;
  onHover: (pose: CharacterPose) => void;
  onLeave: () => void;
}

export function NavItem({ label, pose, href, onHover, onLeave }: NavItemProps) {
  return (
    <a
      href={href}
      className="nav-item relative shrink-0 text-text-secondary hover:text-text transition-colors duration-200"
      onMouseEnter={() => onHover(pose)}
      onMouseLeave={onLeave}
    >
      {label}
    </a>
  );
}
