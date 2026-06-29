"use client";

import { useEffect, useCallback, useState } from "react";

interface KeyboardShortcutsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  showAudienceSelector?: boolean;
  setShowAudienceSelector: (show: boolean) => void;
  setMobileMenuOpen: (open: boolean) => void;
  setSearchQuery: (query: string) => void;
}

export function useKeyboardShortcuts({
  activeTab,
  setActiveTab,
  showAudienceSelector,
  setShowAudienceSelector,
  setMobileMenuOpen,
  setSearchQuery,
}: KeyboardShortcutsProps) {
  const [helpOpen, setHelpOpen] = useState(false);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    const target = e.target as HTMLElement;
    const tagName = target.tagName.toLowerCase();
    const isInput = tagName === "input" || tagName === "textarea" || target.isContentEditable;
    if (isInput && !(e.ctrlKey || e.metaKey || e.altKey)) return;

    if (e.key === "Escape") {
      e.preventDefault();
      setMobileMenuOpen(false);
      if (showAudienceSelector) setShowAudienceSelector(false);
      if (helpOpen) setHelpOpen(false);
      return;
    }

    if (isInput) return;

    switch (e.key.toLowerCase()) {
      case "h":
        e.preventDefault();
        setActiveTab("home");
        break;
      case "p":
        e.preventDefault();
        setActiveTab("podcast");
        break;
      case "r":
        e.preventDefault();
        setActiveTab("recursos");
        break;
      case "q":
        e.preventDefault();
        setActiveTab("quiz");
        break;
      case "f":
        e.preventDefault();
        const homeElement = document.querySelector("input[type='search']");
        if (homeElement) {
          (homeElement as HTMLInputElement).focus();
        } else {
          setActiveTab("home");
          setTimeout(() => {
            const el = document.querySelector("input[type='search']");
            if (el) (el as HTMLInputElement).focus();
          }, 100);
        }
        break;
      case "?":
        e.preventDefault();
        setHelpOpen((prev) => !prev);
        break;
      default:
        if (/^[1-6]$/.test(e.key)) {
          e.preventDefault();
          const tabs = ["home", "podcast", "recursos", "quiz", "faq", "duvidas"];
          const index = parseInt(e.key) - 1;
          if (index >= 0 && index < tabs.length) {
            setActiveTab(tabs[index]);
          }
        }
        break;
    }
  }, [activeTab, showAudienceSelector, helpOpen, setActiveTab, setShowAudienceSelector, setMobileMenuOpen]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return { helpOpen, setHelpOpen };
}
