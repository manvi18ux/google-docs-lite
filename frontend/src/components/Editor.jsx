import React, { useEffect, useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Collaboration from "@tiptap/extension-collaboration";
import CollaborationCursor from "@tiptap/extension-collaboration-cursor";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Heading from "@tiptap/extension-heading";


import { HocuspocusProvider } from "@hocuspocus/provider";
import "../styles/docs.css";

export default function CollaborativeEditor() {
  const [title, setTitle] = useState("Untitled document");
  const docId = "my-doc-1";

  // Connect to Hocuspocus server
 const provider = React.useMemo(() => {
  return new HocuspocusProvider({
    url: "ws://localhost:1234/",
    name: docId,
  });
}, [docId]);


  // TipTap + YJS + Cursor sync
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        history: false,
      }),
      Underline,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Heading.configure({
        levels: [1, 2, 3],
      }),
      Collaboration.configure({
        document: provider.document,
      }),
      CollaborationCursor.configure({
        provider,
        user: {
          name: "Manvi",
          color: "#ff9822",
        },
      }),
    ],
  });

  useEffect(() => {
    return () => editor?.destroy();
  }, [editor]);

  return (
    <div className="docs-container">
      {/* Header with Logo and Buttons */}
      <header className="docs-header">
        <div className="header-left">
          <div className="docs-logo">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <rect width="40" height="40" rx="8" fill="#4285F4" />
              <path d="M10 28h20v2H10z" fill="white" />
              <path d="M10 20h20v2H10z" fill="white" />
              <path d="M10 12h12v2H10z" fill="white" />
            </svg>
            <span className="docs-title">Google Docs</span>
          </div>
          <input
            className="doc-title-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Untitled document"
          />
        </div>

        <div className="header-right">
          <button className="header-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11z" />
            </svg>
          </button>
          <button className="header-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
            </svg>
          </button>
          <button className="share-btn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.15c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.56 9.31 6.88 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.88 0 1.56-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z" />
            </svg>
            Share
          </button>
        </div>
      </header>

      {/* Menu Bar */}
      <nav className="docs-menu">
        <button className="menu-item">File</button>
        <button className="menu-item">Edit</button>
        <button className="menu-item">View</button>
        <button className="menu-item">Insert</button>
        <button className="menu-item">Format</button>
        <button className="menu-item">Tools</button>
        <button className="menu-item">Extensions</button>
        <button className="menu-item">Help</button>
      </nav>

      {/* Toolbar */}
      <div className="docs-toolbar">
        <button
          onClick={() => editor?.chain().focus().undo().run()}
          className="toolbar-btn"
          title="Undo"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 7v6h6" />
            <path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13" />
          </svg>
        </button>

        <button
          onClick={() => editor?.chain().focus().redo().run()}
          className="toolbar-btn"
          title="Redo"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 7v6h-6" />
            <path d="M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3l3 2.7" />
          </svg>
        </button>

        <div className="toolbar-divider"></div>

        <select className="toolbar-select" onChange={(e) => {
          if (e.target.value === "paragraph") {
            editor?.chain().focus().setParagraph().run();
          } else {
            const level = parseInt(e.target.value.replace("h", ""));
            editor?.chain().focus().setHeading({ level }).run();
          }
        }} defaultValue="paragraph">
          <option value="paragraph">Normal text</option>
          <option value="h1">Heading 1</option>
          <option value="h2">Heading 2</option>
          <option value="h3">Heading 3</option>
        </select>

        <select className="toolbar-select">
          <option>Roboto</option>
          <option>Arial</option>
          <option>Georgia</option>
          <option>Times New Roman</option>
        </select>

        <select className="toolbar-select" style={{ width: "60px" }}>
          <option>11</option>
          <option>12</option>
          <option>14</option>
          <option>16</option>
          <option>18</option>
          <option>20</option>
        </select>

        <div className="toolbar-divider"></div>

        <button
          onClick={() => editor?.chain().focus().toggleBold().run()}
          className={`toolbar-btn ${editor?.isActive("bold") ? "active" : ""}`}
          title="Bold (Ctrl+B)"
        >
          <strong>B</strong>
        </button>

        <button
          onClick={() => editor?.chain().focus().toggleItalic().run()}
          className={`toolbar-btn ${editor?.isActive("italic") ? "active" : ""}`}
          title="Italic (Ctrl+I)"
        >
          <em>I</em>
        </button>

        <button
          onClick={() => editor?.chain().focus().toggleUnderline().run()}
          className={`toolbar-btn ${editor?.isActive("underline") ? "active" : ""}`}
          title="Underline (Ctrl+U)"
        >
          <u>U</u>
        </button>

        <button className="toolbar-btn" title="Text color">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
          </svg>
        </button>

        <button className="toolbar-btn" title="Highlight color">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.75 7L14 3.25l-10 10V17h3.75L17.75 7z" />
          </svg>
        </button>

        <div className="toolbar-divider"></div>

        <button
          onClick={() => editor?.chain().focus().setTextAlign("left").run()}
          className={`toolbar-btn ${editor?.isActive({ textAlign: "left" }) ? "active" : ""}`}
          title="Align left"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M15 15H3v2h12v-2zm0-4H3v2h12v-2zm0-4H3v2h12V7zm17 0v10h-2V7h2z" />
          </svg>
        </button>

        <button
          onClick={() => editor?.chain().focus().setTextAlign("center").run()}
          className={`toolbar-btn ${editor?.isActive({ textAlign: "center" }) ? "active" : ""}`}
          title="Align center"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M7 15v2h10v-2H7zm5-13C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3-13H9v2h6V7zm0 4H9v2h6v-2z" />
          </svg>
        </button>

        <button
          onClick={() => editor?.chain().focus().setTextAlign("right").run()}
          className={`toolbar-btn ${editor?.isActive({ textAlign: "right" }) ? "active" : ""}`}
          title="Align right"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 15h12v2H3v-2zm0-4h12v2H3v-2zm0-4h12v2H3V7zm15 0v10h2V7h-2z" />
          </svg>
        </button>

        <div className="toolbar-divider"></div>

        <button
          onClick={() => editor?.chain().focus().toggleBulletList().run()}
          className={`toolbar-btn ${editor?.isActive("bulletList") ? "active" : ""}`}
          title="Bullet list"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M4 10.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm0-6C3.17 4.5 2.5 5.17 2.5 6S3.17 7.5 4 7.5 5.5 6.83 5.5 6 4.83 4.5 4 4.5zm0 12c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zM7 19h14v-2H7v2zm0-6h14v-2H7v2zm0-8v2h14V5H7z" />
          </svg>
        </button>

        <button
          onClick={() => editor?.chain().focus().toggleOrderedList().run()}
          className={`toolbar-btn ${editor?.isActive("orderedList") ? "active" : ""}`}
          title="Numbered list"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M2 17h2v.5H3v1h1v.5H2v1h3v-4H2v1zm1-4h1V9H2v1h1v4zm-1-6h3V7H3V6h1V5H2v1zm5 10h12v-2H7v2zm0 4h12v-2H7v2zm0-14v2h12V5H7z" />
          </svg>
        </button>
      </div>

      {/* Page Wrapper */}
      <div className="page-wrapper">
        <div className="page">
          <EditorContent editor={editor} className="editor-content" />
        </div>
      </div>
    </div>
  );
}
