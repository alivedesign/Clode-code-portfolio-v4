'use client';

import { useState, useRef, useEffect, KeyboardEvent } from 'react';
import { useRouter } from 'next/navigation';
import Fuse from 'fuse.js';
import { NavigationItem } from '@/lib/types/navigation';
import { CommandPrompt } from './CommandPrompt';
import { Divider } from './Divider';
import { useAnimation } from '@/contexts/AnimationContext';

interface CommandInputProps {
  navigationItems: NavigationItem[];
}

export function CommandInput({ navigationItems }: CommandInputProps) {
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState<NavigationItem[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { triggerFallingAvatars, triggerDesignAnimation } = useAnimation();

  // Initialize Fuse.js for fuzzy search
  const fuse = useRef(
    new Fuse(navigationItems, {
      keys: ['command', 'route'],
      threshold: 0.3,
      includeScore: true,
    })
  );

  // Update suggestions when input changes
  useEffect(() => {
    if (input.trim()) {
      const results = fuse.current.search(input);
      setSuggestions(results.map((result) => result.item));
      setSelectedIndex(0);
    } else {
      setSuggestions([]);
      setSelectedIndex(0);
    }
  }, [input]);

  const executeCommand = (command: string) => {
    const trimmedCommand = command.trim().toLowerCase();

    // Check for special /claude command
    if (trimmedCommand === '/claude') {
      // Trigger falling avatars animation
      triggerFallingAvatars();
      setInput('');
      setSuggestions([]);
      setHistoryIndex(-1);
      return;
    }

    // Check for special /design command
    if (trimmedCommand === '/design') {
      triggerDesignAnimation();
      setInput('');
      setSuggestions([]);
      setHistoryIndex(-1);
      return;
    }

    // Find matching navigation item
    const navItem = navigationItems.find(
      (item) =>
        item.command.toLowerCase() === trimmedCommand ||
        item.route.toLowerCase() === trimmedCommand ||
        item.command.toLowerCase().replace('/ ', '/') === trimmedCommand
    );

    if (navItem) {
      // Add to history
      setHistory((prev) => [command, ...prev].slice(0, 50));
      setInput('');
      setSuggestions([]);
      setHistoryIndex(-1);

      // Navigate to route
      router.push(navItem.route);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (suggestions.length > 0 && selectedIndex >= 0) {
        executeCommand(suggestions[selectedIndex].command);
      } else if (input.trim()) {
        executeCommand(input);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => Math.min(prev + 1, suggestions.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (suggestions.length > 0) {
        setSelectedIndex((prev) => Math.max(prev - 1, 0));
      } else {
        // Navigate command history
        if (historyIndex < history.length - 1) {
          const newIndex = historyIndex + 1;
          setHistoryIndex(newIndex);
          setInput(history[newIndex]);
        }
      }
    } else if (e.key === 'Escape') {
      setInput('');
      setSuggestions([]);
      setSelectedIndex(0);
    } else if (e.key === 'Tab' && suggestions.length > 0) {
      e.preventDefault();
      setInput(suggestions[selectedIndex].command);
      setSuggestions([]);
    }
  };

  return (
    <div className="flex flex-col">
      <Divider />

      <div className="flex items-center gap-spacing-2 py-spacing-2 px-0">
        <span className="text-text text-body">&gt;</span>
        <span className="text-text text-body">/</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent border-none outline-none text-text text-body placeholder:text-text-secondary"
          placeholder="Type a command..."
          aria-label="Command input"
          autoComplete="off"
          spellCheck="false"
        />
      </div>

      <Divider />

      {/* Autocomplete suggestions */}
      {suggestions.length > 0 && (
        <div className="mt-spacing-2 flex flex-col gap-spacing-1">
          {suggestions.map((suggestion, index) => (
            <button
              key={suggestion.route}
              onClick={() => executeCommand(suggestion.command)}
              className={`text-left px-spacing-4 py-spacing-2 text-body transition-colors ${
                index === selectedIndex
                  ? 'bg-text-secondary bg-opacity-20 text-text'
                  : 'text-text-secondary hover:text-text'
              }`}
            >
              {suggestion.command}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
