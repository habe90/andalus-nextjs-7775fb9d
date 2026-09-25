"use client";
import { useEffect, useRef } from "react";
import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Link2,
  Quote,
  Heading2,
  Heading3,
  Undo2,
  Redo2,
} from "lucide-react";

const TOOLS: {
  icon: typeof Bold;
  label: string;
  command: string;
  arg?: string;
}[] = [
  { icon: Bold, label: "Podebljano", command: "bold" },
  { icon: Italic, label: "Kurziv", command: "italic" },
  { icon: Underline, label: "Podvučeno", command: "underline" },
  { icon: Heading2, label: "Naslov", command: "formatBlock", arg: "h2" },
  { icon: Heading3, label: "Podnaslov", command: "formatBlock", arg: "h3" },
  { icon: List, label: "Lista", command: "insertUnorderedList" },
  { icon: ListOrdered, label: "Numerisana lista", command: "insertOrderedList" },
  { icon: Quote, label: "Citat", command: "formatBlock", arg: "blockquote" },
  { icon: Undo2, label: "Poništi", command: "undo" },
  { icon: Redo2, label: "Ponovi", command: "redo" },
];

export function RichTextEditor({
  name,
  defaultValue,
}: {
  name: string;
  defaultValue: string;
}) {
  const editorRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (editorRef.current) editorRef.current.innerHTML = defaultValue || "";
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  function sync() {
    if (editorRef.current && inputRef.current)
      inputRef.current.value = editorRef.current.innerHTML;
  }
  function run(command: string, arg?: string) {
    editorRef.current?.focus();
    if (command === "formatBlock") {
      document.execCommand(command, false, `<${arg}>`);
    } else if (command === "createLink") {
      const url = window.prompt("Unesite link (https://...)");
      if (url) document.execCommand(command, false, url);
    } else {
      document.execCommand(command, false);
    }
    sync();
  }
  return (
    <div className="rte">
      <div className="rte-toolbar" role="toolbar" aria-label="Alati za uređivanje teksta">
        {TOOLS.map(({ icon: Icon, label, command, arg }) => (
          <button
            key={label}
            type="button"
            aria-label={label}
            title={label}
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => run(command, arg)}
          >
            <Icon size={16} />
          </button>
        ))}
        <button
          type="button"
          aria-label="Dodaj link"
          title="Dodaj link"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => run("createLink")}
        >
          <Link2 size={16} />
        </button>
      </div>
      <div
        ref={editorRef}
        className="rte-editor"
        contentEditable
        onInput={sync}
        onBlur={sync}
        suppressContentEditableWarning
      />
      <input ref={inputRef} type="hidden" name={name} defaultValue={defaultValue} />
    </div>
  );
}
