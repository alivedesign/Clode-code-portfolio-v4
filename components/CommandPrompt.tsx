export function CommandPrompt() {
  return (
    <div className="flex items-center gap-2 text-text">
      <span className="text-text">&gt;</span>
      <span className="text-text">/</span>
      <span className="cursor-blink inline-block w-2 h-6 bg-text ml-2"></span>
    </div>
  );
}
