'use client';

import { useState, useRef, KeyboardEvent, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { NavigationItem } from '@/lib/types/navigation';
import { throttle } from '@/lib/utils/performance';

interface CommandInputSimpleProps {
  navigationItems: NavigationItem[];
  dropdownBehavior?: 'absolute' | 'relative'; // Controls dropdown positioning: 'absolute' overlays (default), 'relative' pushes content
}

export function CommandInputSimple({ navigationItems, dropdownBehavior = 'absolute' }: CommandInputSimpleProps) {
  const [input, setInput] = useState('/');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const mirrorRef = useRef<HTMLDivElement>(null);
  const [cursorCoords, setCursorCoords] = useState({ top: 0, left: 0, height: 24 });
  const router = useRouter();

  // Auto-focus input on mount and position cursor after "/"
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
      setIsFocused(true);
      // Set cursor position after the "/"
      inputRef.current.setSelectionRange(1, 1);
    }
  }, []);

  // Auto-resize textarea based on content
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
    }
  }, [input]);

  // Calculate cursor position for custom cursor
  const updateCursorPosition = useCallback(() => {
    if (!inputRef.current || !mirrorRef.current) return;

    const textarea = inputRef.current;
    const cursorPosition = textarea.selectionStart;
    const textBeforeCursor = input.substring(0, cursorPosition);

    // Update mirror content with text before cursor
    mirrorRef.current.textContent = textBeforeCursor;

    // Get the position of the end of the mirror content
    const range = document.createRange();
    const textNode = mirrorRef.current.firstChild;

    if (textNode && textBeforeCursor.length > 0) {
      range.setStart(textNode, textBeforeCursor.length);
      range.setEnd(textNode, textBeforeCursor.length);
      const rect = range.getBoundingClientRect();
      const mirrorRect = mirrorRef.current.getBoundingClientRect();

      setCursorCoords({
        top: rect.top - mirrorRect.top,
        left: rect.left - mirrorRect.left,
        height: rect.height || 24,
      });
    } else {
      // Cursor at start
      setCursorCoords({ top: 0, left: 0, height: 24 });
    }
  }, [input]);

  // Update cursor position on input change, selection change, and clicks
  useEffect(() => {
    updateCursorPosition();
  }, [input, updateCursorPosition]);

  useEffect(() => {
    const handleSelectionChange = () => {
      if (document.activeElement === inputRef.current) {
        updateCursorPosition();
      }
    };

    // Throttle selectionchange to max 60fps (16.67ms) for better performance
    const throttledHandleSelectionChange = throttle(handleSelectionChange, 16);

    document.addEventListener('selectionchange', throttledHandleSelectionChange);
    return () => document.removeEventListener('selectionchange', throttledHandleSelectionChange);
  }, [updateCursorPosition]);

  // Execute command - defined early to be used in useEffect below
  const executeCommand = useCallback((command: string) => {
    const navItem = navigationItems.find(item =>
      item.command.toLowerCase() === command.toLowerCase()
    );

    if (navItem) {
      router.push(navItem.route);
      setInput('/');
      setIsFocused(false);
      inputRef.current?.blur();
    }
  }, [navigationItems, router]);

  // Global keyboard shortcuts
  useEffect(() => {
    const handleGlobalKeyDown = (e: globalThis.KeyboardEvent) => {
      // Ctrl+K or Cmd+K to focus input
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
        setIsFocused(true);
      }

      // Number keys 1-4 as shortcuts (when not typing in input)
      if (e.key >= '1' && e.key <= '4' && !isFocused) {
        e.preventDefault();
        const index = parseInt(e.key) - 1;
        if (navigationItems[index]) {
          executeCommand(navigationItems[index].command);
        }
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [isFocused, navigationItems, executeCommand]);

  // Filter suggestions based on input
  const suggestions = input.length > 1
    ? navigationItems.filter(item => {
        // Strip "/" from both input and command for comparison
        const searchTerm = input.replace(/^\//, '').toLowerCase();
        const commandText = item.command.replace(/^\//, '').toLowerCase();
        return commandText.includes(searchTerm);
      })
    : navigationItems;

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (suggestions.length > 0) {
        executeCommand(suggestions[selectedIndex].command);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => Math.min(prev + 1, suggestions.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => Math.max(prev - 1, 0));
    } else if (e.key === 'Tab') {
      e.preventDefault();
      if (suggestions.length > 0) {
        // Move to next item in dropdown
        setSelectedIndex(prev => (prev + 1) % suggestions.length);
      }
    } else if (e.key === 'Escape') {
      setInput('/');
      setIsFocused(false);
      inputRef.current?.blur();
    } else if (e.key === 'Backspace' && input === '/') {
      e.preventDefault();
    }
  };

  const handleChange = (value: string) => {
    if (!value.startsWith('/')) {
      setInput('/' + value);
    } else {
      setInput(value);
    }
    setSelectedIndex(0);
  };

  return (
    <div className="relative w-full flex flex-col">
      {/* Command Input */}
      <div className="flex flex-col gap-spacing-4 overflow-x-hidden">
        <div className="h-[1px] w-full bg-link" />

        <div className="flex gap-spacing-4 items-start pt-spacing-2 relative">
          <span className="text-text-18 text-text font-semibold">&gt;</span>
          <div className="relative flex-1 min-w-0 overflow-x-hidden">
            {/* Hidden mirror div for cursor position calculation */}
            <div
              ref={mirrorRef}
              className="absolute invisible text-text-18 text-text whitespace-pre-wrap break-words pointer-events-none"
              style={{
                wordBreak: 'break-word',
                width: '100%',
                left: 0,
                top: 0,
              }}
              aria-hidden="true"
            />

            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => handleChange(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setTimeout(() => setIsFocused(false), 200)}
              onClick={updateCursorPosition}
              className="w-full bg-transparent border-none outline-none text-text-18 text-text placeholder:text-text-secondary caret-transparent resize-none overflow-hidden break-words whitespace-pre-wrap relative z-10"
              placeholder="/"
              autoComplete="off"
              spellCheck="false"
              rows={1}
              style={{ wordBreak: 'break-word' }}
            />

            {/* Custom 8px cursor - only visible when focused */}
            {isFocused && (
              <div
                className="absolute w-[8px] bg-text pointer-events-none cursor-blink"
                style={{
                  left: `${cursorCoords.left}px`,
                  top: `${cursorCoords.top}px`,
                  height: `${cursorCoords.height}px`,
                }}
              />
            )}
          </div>
        </div>

        <div className="h-[1px] w-full bg-link" />
      </div>

      {/* Dropdown Menu */}
      {isFocused && (
        <div className={`${dropdownBehavior === 'relative' ? 'relative' : 'relative tablet:absolute tablet:top-full tablet:left-0'} w-full mt-spacing-6 ${dropdownBehavior === 'relative' ? 'mb-spacing-8' : 'mb-spacing-8 tablet:mb-0'} flex flex-col gap-spacing-6 desktop:gap-spacing-4 z-10`}>
          {suggestions.map((item, index) => (
            <button
              key={item.route}
              onClick={() => executeCommand(item.command)}
              className={`flex gap-spacing-4 tablet:gap-[calc(var(--spacing-12)+6px)] pl-spacing-7 transition-all text-left ${
                index === selectedIndex
                  ? 'text-link'
                  : 'text-text-secondary hover:text-link'
              }`}
            >
              <span className="text-text-18 w-[130px] tablet:w-[300px] flex-shrink-0">
                {item.command}
              </span>
              <span className="text-text-18 flex-1">
                {item.description}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
