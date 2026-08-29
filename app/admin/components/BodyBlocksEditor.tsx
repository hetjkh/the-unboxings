"use client";

import type { ResourceBlock } from "@/lib/cms/content-types";
import { TextField } from "./AdminFields";

export function BodyBlocksEditor({
  blocks,
  onChange,
}: {
  blocks: ResourceBlock[];
  onChange: (blocks: ResourceBlock[]) => void;
}) {
  function updateBlock(index: number, block: ResourceBlock) {
    onChange(blocks.map((item, itemIndex) => (itemIndex === index ? block : item)));
  }

  function removeBlock(index: number) {
    onChange(blocks.filter((_, itemIndex) => itemIndex !== index));
  }

  function addBlock(type: ResourceBlock["type"]) {
    if (type === "list") {
      onChange([...blocks, { type: "list", items: [""] }]);
      return;
    }
    onChange([...blocks, { type, text: "" }]);
  }

  return (
    <div className="grid gap-4">
      <div className="flex flex-wrap gap-2">
        <button type="button" onClick={() => addBlock("paragraph")} className="h-8 border border-black px-3 text-[10px] font-bold uppercase">
          + Paragraph
        </button>
        <button type="button" onClick={() => addBlock("heading")} className="h-8 border border-black px-3 text-[10px] font-bold uppercase">
          + Heading
        </button>
        <button type="button" onClick={() => addBlock("list")} className="h-8 border border-black px-3 text-[10px] font-bold uppercase">
          + List
        </button>
      </div>

      {blocks.map((block, index) => (
        <article key={`block-${index}`} className="grid gap-3 border border-black/10 p-4">
          <div className="flex items-center justify-between gap-3">
            <span className="text-[10px] font-bold tracking-[0.12em] text-black/40 uppercase">{block.type}</span>
            <button type="button" onClick={() => removeBlock(index)} className="text-[10px] text-red-600 uppercase">
              Remove
            </button>
          </div>

          {block.type === "list" ? (
            <label className="grid gap-2 text-sm">
              <span className="font-medium text-black/70">List items (one per line)</span>
              <textarea
                value={block.items.join("\n")}
                onChange={(event) =>
                  updateBlock(index, {
                    type: "list",
                    items: event.target.value.split("\n").map((item) => item.trim()).filter(Boolean),
                  })
                }
                rows={6}
                className="border border-black/15 px-3 py-2 text-sm"
              />
            </label>
          ) : (
            <TextField
              label={block.type === "heading" ? "Heading text" : "Paragraph text"}
              value={block.text}
              onChange={(value) => updateBlock(index, { type: block.type, text: value })}
              multiline
            />
          )}
        </article>
      ))}
    </div>
  );
}
