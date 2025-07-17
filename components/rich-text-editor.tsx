"use client";

import { useState, useEffect } from "react";
import { Editor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import { TextStyle } from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import { Highlight } from "@tiptap/extension-highlight";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Bold,
  Italic,
  UnderlineIcon,
  Strikethrough,
  Code,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Undo,
  Redo,
  LinkIcon,
  ImageIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Palette,
  Highlighter,
} from "lucide-react";

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
  className?: string;
}

export function RichTextEditor({
  content,
  onChange,
  placeholder = "Commencez à écrire...",
  className,
}: RichTextEditorProps) {
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showHighlightPicker, setShowHighlightPicker] = useState(false);
  const [editor, setEditor] = useState<Editor | null>(null);

  useEffect(() => {
    let instance: Editor | null = null;
    let isMounted = true;
    import("@tiptap/react").then(({ Editor: TiptapEditor }) => {
      if (!isMounted) return;
      instance = new TiptapEditor({
        extensions: [
          StarterKit,
          Placeholder.configure({
            placeholder,
          }),
          Link.configure({
            openOnClick: false,
            HTMLAttributes: {
              class: "text-purple-600 underline cursor-pointer",
            },
          }),
          Image.configure({
            HTMLAttributes: {
              class: "max-w-full h-auto rounded-lg",
            },
          }),
          TextAlign.configure({
            types: ["heading", "paragraph"],
          }),
          Underline,
          TextStyle,
          Color,
          Highlight.configure({
            multicolor: true,
          }),
        ],
        content, // Only set on mount!
        onUpdate: ({ editor }: { editor: Editor }) => {
          onChange(editor.getHTML());
        },
        editorProps: {
          attributes: {
            class:
              "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[200px] p-4",
          },
        },
      });
      setEditor(instance);
    });
    return () => {
      isMounted = false;
      if (instance) instance.destroy();
    };
    // DO NOT include `content` in the dependency array!
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const handleClickOutside = () => {
      setShowColorPicker(false);
      setShowHighlightPicker(false);
    };

    if (showColorPicker || showHighlightPicker) {
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [showColorPicker, showHighlightPicker]);

  if (!editor) {
    return null;
  }

  const addLink = () => {
    const url = window.prompt("URL du lien:");
    if (url) {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url })
        .run();
    }
  };

  const addImage = () => {
    const url = window.prompt("URL de l'image:");
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const colors = [
    "#000000",
    "#374151",
    "#6B7280",
    "#EF4444",
    "#F97316",
    "#EAB308",
    "#22C55E",
    "#3B82F6",
    "#8B5CF6",
    "#EC4899",
  ];

  const highlights = [
    "#FEF3C7",
    "#DBEAFE",
    "#D1FAE5",
    "#FCE7F3",
    "#E0E7FF",
    "#FED7D7",
    "#F3E8FF",
    "#ECFDF5",
    "#FEF2F2",
    "#F0F9FF",
  ];

  return (
    <div
      className={`border border-gray-200 rounded-lg overflow-hidden ${className}`}
    >
      {/* Toolbar */}
      <div className="border-b border-gray-200 p-2 bg-gray-50">
        <div className="flex flex-wrap items-center gap-1">
          {/* Text Formatting */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={editor.isActive("bold") ? "bg-gray-200" : ""}
          >
            <Bold className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={editor.isActive("italic") ? "bg-gray-200" : ""}
          >
            <Italic className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={editor.isActive("underline") ? "bg-gray-200" : ""}
          >
            <UnderlineIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={editor.isActive("strike") ? "bg-gray-200" : ""}
          >
            <Strikethrough className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleCode().run()}
            className={editor.isActive("code") ? "bg-gray-200" : ""}
          >
            <Code className="h-4 w-4" />
          </Button>

          <Separator orientation="vertical" className="h-6 mx-1" />

          {/* Headings */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            className={
              editor.isActive("heading", { level: 1 }) ? "bg-gray-200" : ""
            }
          >
            <Heading1 className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            className={
              editor.isActive("heading", { level: 2 }) ? "bg-gray-200" : ""
            }
          >
            <Heading2 className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
            className={
              editor.isActive("heading", { level: 3 }) ? "bg-gray-200" : ""
            }
          >
            <Heading3 className="h-4 w-4" />
          </Button>

          <Separator orientation="vertical" className="h-6 mx-1" />

          {/* Lists */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={editor.isActive("bulletList") ? "bg-gray-200" : ""}
          >
            <List className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={editor.isActive("orderedList") ? "bg-gray-200" : ""}
          >
            <ListOrdered className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={editor.isActive("blockquote") ? "bg-gray-200" : ""}
          >
            <Quote className="h-4 w-4" />
          </Button>

          <Separator orientation="vertical" className="h-6 mx-1" />

          {/* Alignment */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
            className={
              editor.isActive({ textAlign: "left" }) ? "bg-gray-200" : ""
            }
          >
            <AlignLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
            className={
              editor.isActive({ textAlign: "center" }) ? "bg-gray-200" : ""
            }
          >
            <AlignCenter className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().setTextAlign("right").run()}
            className={
              editor.isActive({ textAlign: "right" }) ? "bg-gray-200" : ""
            }
          >
            <AlignRight className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().setTextAlign("justify").run()}
            className={
              editor.isActive({ textAlign: "justify" }) ? "bg-gray-200" : ""
            }
          >
            <AlignJustify className="h-4 w-4" />
          </Button>

          <Separator orientation="vertical" className="h-6 mx-1" />

          {/* Color & Highlight */}
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setShowColorPicker(!showColorPicker);
                setShowHighlightPicker(false);
              }}
              className={showColorPicker ? "bg-gray-200" : ""}
            >
              <Palette className="h-4 w-4" />
            </Button>
            {showColorPicker && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowColorPicker(false)}
                />
                <div className="absolute top-full left-0 mt-1 p-3 bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-[200px]">
                  <div className="text-xs font-medium text-gray-700 mb-2">
                    Couleur du texte
                  </div>
                  <div className="grid grid-cols-5 gap-2 mb-2">
                    {colors.map((color) => (
                      <button
                        key={color}
                        className="w-7 h-7 rounded border-2 border-gray-300 hover:border-gray-400 transition-colors flex items-center justify-center"
                        style={{ backgroundColor: color }}
                        onClick={() => {
                          editor.chain().focus().setColor(color).run();
                          setShowColorPicker(false);
                        }}
                        title={`Appliquer la couleur ${color}`}
                      >
                        {editor.isActive("textStyle", { color }) && (
                          <span className="text-white text-xs">✓</span>
                        )}
                      </button>
                    ))}
                  </div>
                  <button
                    className="w-full text-xs text-gray-600 hover:text-gray-800 py-1 px-2 rounded hover:bg-gray-100 transition-colors"
                    onClick={() => {
                      editor.chain().focus().unsetColor().run();
                      setShowColorPicker(false);
                    }}
                  >
                    Supprimer la couleur
                  </button>
                </div>
              </>
            )}
          </div>

          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setShowHighlightPicker(!showHighlightPicker);
                setShowColorPicker(false);
              }}
              className={showHighlightPicker ? "bg-gray-200" : ""}
            >
              <Highlighter className="h-4 w-4" />
            </Button>
            {showHighlightPicker && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowHighlightPicker(false)}
                />
                <div className="absolute top-full left-0 mt-1 p-3 bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-[200px]">
                  <div className="text-xs font-medium text-gray-700 mb-2">
                    Surlignage
                  </div>
                  <div className="grid grid-cols-5 gap-2 mb-2">
                    {highlights.map((color) => (
                      <button
                        key={color}
                        className="w-7 h-7 rounded border-2 border-gray-300 hover:border-gray-400 transition-colors flex items-center justify-center"
                        style={{ backgroundColor: color }}
                        onClick={() => {
                          editor.chain().focus().setHighlight({ color }).run();
                          setShowHighlightPicker(false);
                        }}
                        title={`Appliquer le surlignage ${color}`}
                      >
                        {editor.isActive("highlight", { color }) && (
                          <span className="text-gray-800 text-xs">✓</span>
                        )}
                      </button>
                    ))}
                  </div>
                  <button
                    className="w-full text-xs text-gray-600 hover:text-gray-800 py-1 px-2 rounded hover:bg-gray-100 transition-colors"
                    onClick={() => {
                      editor.chain().focus().unsetHighlight().run();
                      setShowHighlightPicker(false);
                    }}
                  >
                    Supprimer le surlignage
                  </button>
                </div>
              </>
            )}
          </div>

          <Separator orientation="vertical" className="h-6 mx-1" />

          {/* Media */}
          <Button variant="ghost" size="sm" onClick={addLink}>
            <LinkIcon className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={addImage}>
            <ImageIcon className="h-4 w-4" />
          </Button>

          <Separator orientation="vertical" className="h-6 mx-1" />

          {/* Undo/Redo */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
          >
            <Undo className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
          >
            <Redo className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Editor */}
      <div className="bg-white min-h-[200px]">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
