"use client";

import { useCallback, useEffect, useRef } from "react";

function ToolbarButton({
  label,
  title,
  onClick,
}: {
  label: string;
  title: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      title={title}
      onMouseDown={(event) => event.preventDefault()}
      onClick={onClick}
      className="h-8 min-w-8 border border-black/15 bg-white px-2 text-xs font-bold text-black"
    >
      {label}
    </button>
  );
}

function setEditorHtml(element: HTMLDivElement, html: string) {
  const next = html || "";
  if (element.innerHTML === next) return;
  element.innerHTML = next;
}

function findMarkAncestor(node: Node | null, root: HTMLElement): HTMLElement | null {
  let current: Node | null = node;
  while (current && current !== root) {
    if (current instanceof HTMLElement && current.tagName === "MARK") {
      return current;
    }
    current = current.parentNode;
  }
  return null;
}

function unwrapElement(element: HTMLElement) {
  const parent = element.parentNode;
  if (!parent) return;
  while (element.firstChild) {
    parent.insertBefore(element.firstChild, element);
  }
  parent.removeChild(element);
}

function placeCaretAfter(node: Node) {
  const selection = window.getSelection();
  if (!selection) return;
  const range = document.createRange();
  range.setStartAfter(node);
  range.collapse(true);
  selection.removeAllRanges();
  selection.addRange(range);
}

function getMarksInRange(range: Range, root: HTMLElement): HTMLElement[] {
  const marks: HTMLElement[] = [];
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT);
  let node: Node | null = walker.nextNode();
  while (node) {
    if (node instanceof HTMLElement && node.tagName === "MARK" && range.intersectsNode(node)) {
      marks.push(node);
    }
    node = walker.nextNode();
  }
  return marks;
}

export default function RichTextField({
  label,
  value,
  onChange,
  placeholder,
  compact = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  compact?: boolean;
}) {
  const editorRef = useRef<HTMLDivElement>(null);
  const isFocusedRef = useRef(false);
  const lastSyncedValueRef = useRef<string | null>(null);

  const syncValue = useCallback(() => {
    if (!editorRef.current) return;
    const html = editorRef.current.innerHTML;
    lastSyncedValueRef.current = html;
    onChange(html);
  }, [onChange]);

  useEffect(() => {
    if (!editorRef.current || isFocusedRef.current) return;
    if (lastSyncedValueRef.current === value) return;
    setEditorHtml(editorRef.current, value);
    lastSyncedValueRef.current = value;
  }, [value]);

  function toggleHighlight() {
    const editor = editorRef.current;
    if (!editor) return;
    editor.focus();

    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0);
    if (!editor.contains(range.commonAncestorContainer)) return;

    if (selection.isCollapsed) {
      const mark = findMarkAncestor(selection.anchorNode, editor);
      if (mark) {
        unwrapElement(mark);
        syncValue();
      }
      return;
    }

    const marks = getMarksInRange(range, editor);
    if (marks.length > 0) {
      marks.forEach((mark) => unwrapElement(mark));
      syncValue();
      return;
    }

    const mark = document.createElement("mark");
    mark.appendChild(range.extractContents());
    range.insertNode(mark);
    placeCaretAfter(mark);
    syncValue();
  }

  function clearFormatting() {
    const editor = editorRef.current;
    if (!editor) return;
    editor.focus();

    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0);
    if (!editor.contains(range.commonAncestorContainer)) return;

    if (selection.isCollapsed) {
      const mark = findMarkAncestor(selection.anchorNode, editor);
      if (mark) unwrapElement(mark);
    } else {
      getMarksInRange(range, editor).forEach((mark) => unwrapElement(mark));
      document.execCommand("removeFormat", false);
      document.execCommand("unlink", false);
    }

    syncValue();
  }

  function applyCommand(command: string, commandValue?: string) {
    editorRef.current?.focus();
    document.execCommand(command, false, commandValue);
    syncValue();
  }

  function addLink() {
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed) {
      window.alert("Select the words you want to turn into a link first.");
      return;
    }

    const url = window.prompt("Enter link URL", "https://");
    if (!url) return;
    applyCommand("createLink", url);
  }

  return (
    <div className="grid gap-2 text-sm">
      <span className="font-medium text-black/70">{label}</span>
      <div className="border border-black/15 bg-white">
        <div className="flex flex-wrap gap-1 border-b border-black/10 p-2">
          <ToolbarButton label="B" title="Bold" onClick={() => applyCommand("bold")} />
          <ToolbarButton label="I" title="Italic" onClick={() => applyCommand("italic")} />
          <ToolbarButton label="U" title="Underline" onClick={() => applyCommand("underline")} />
          <ToolbarButton label="H" title="Highlight (toggle)" onClick={toggleHighlight} />
          <ToolbarButton label="Link" title="Add link" onClick={addLink} />
          <ToolbarButton label="Clear" title="Remove formatting" onClick={clearFormatting} />
        </div>
        <div
          ref={editorRef}
          contentEditable
          suppressContentEditableWarning
          role="textbox"
          aria-multiline={compact ? "false" : "true"}
          tabIndex={0}
          data-placeholder={placeholder}
          onKeyDown={(event) => {
            if (compact && event.key === "Enter") {
              event.preventDefault();
            }
          }}
          onInput={syncValue}
          onFocus={() => {
            isFocusedRef.current = true;
          }}
          onBlur={() => {
            isFocusedRef.current = false;
            syncValue();
          }}
          className={`rich-text-editor cursor-text px-3 py-2 text-sm leading-6 text-black outline-none ${
            compact ? "min-h-[44px]" : "min-h-[120px]"
          }`}
        />
      </div>
      <p className="m-0 text-[11px] text-black/45">
        Select words to format. Press H again on highlighted text to remove highlight. Clear removes all formatting.
      </p>
    </div>
  );
}
