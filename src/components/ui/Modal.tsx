"use client";

import React, { useEffect, useRef } from "react";

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  /** Visible dialog title. Provide this OR `labelledBy`, not both. */
  title?: React.ReactNode;
  /** id of an element (usually rendered in `children`) that labels the dialog. */
  labelledBy?: string;
  maxWidth?: string;
  closeLabel?: string;
}

/**
 * Shared accessible modal: backdrop + `.plate`-framed panel, focus trap,
 * Escape-to-close, and focus restore to the invoking element on close.
 */
export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  title,
  labelledBy,
  maxWidth = "32rem",
  closeLabel = "Close",
}) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const titleId = useRef(`modal-title-${Math.random().toString(36).slice(2, 9)}`);
  const previouslyFocused = useRef<HTMLElement | null>(null);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) return;

    previouslyFocused.current = document.activeElement as HTMLElement | null;

    const panel = panelRef.current;
    const focusables = panel?.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
    const first = focusables && focusables.length > 0 ? focusables[0] : panel;
    first?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onCloseRef.current();
        return;
      }

      if (event.key !== "Tab") return;

      const currentPanel = panelRef.current;
      if (!currentPanel) return;
      const nodes = Array.from(currentPanel.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
        (el) => el.offsetParent !== null || el === document.activeElement
      );
      if (nodes.length === 0) {
        event.preventDefault();
        currentPanel.focus();
        return;
      }

      const firstEl = nodes[0];
      const lastEl = nodes[nodes.length - 1];
      const active = document.activeElement;

      if (event.shiftKey) {
        if (active === firstEl || !currentPanel.contains(active)) {
          event.preventDefault();
          lastEl.focus();
        }
      } else {
        if (active === lastEl || !currentPanel.contains(active)) {
          event.preventDefault();
          firstEl.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocused.current?.focus?.();
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink-900/40 backdrop-blur-[2px] p-4 animate-fade-in"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy ?? (title ? titleId.current : undefined)}
        tabIndex={-1}
        className="plate relative w-full bg-paper-raised rounded-lg border border-rule-strong shadow-lift p-6 sm:p-8 outline-none animate-scale-in"
        style={{ maxWidth }}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label={closeLabel}
          className="absolute top-3 right-3 inline-flex h-8 w-8 items-center justify-center rounded-full text-ink-500 hover:text-ink-900 hover:bg-paper-sunken transition-colors"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
        {title && !labelledBy && (
          <h2 id={titleId.current} className="font-display text-xl font-semibold text-ink-900 pr-8 mb-4">
            {title}
          </h2>
        )}
        {children}
      </div>
    </div>
  );
};

export default Modal;
