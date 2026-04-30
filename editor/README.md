# @ncobase/editor

Tiptap based rich text editor package for Ncobase applications. It bundles the editor shell, toolbar, bubble/floating menus, status bar, default extensions, hooks, and shared editor types.

## Install

```bash
pnpm add @ncobase/editor @tiptap/react @tiptap/starter-kit
```

## Exports

- Components: `Editor`, `Toolbar`, `BubbleMenu`, `FloatingMenu`, `StatusBar`
- Hooks: `useEditor`, `useEditorAutosave`, `useEditorContentChange`, `useEditorKeyboardShortcuts`
- Extensions: `defaultExtensions`, `CustomExtension`, image, table, code highlight, and mention extensions
- Types: `EditorProps`, `ToolbarProps`, `MenuBarProps`, `ImageAttributes`, and related component props

## Basic Usage

```tsx
import { Editor } from '@ncobase/editor';

export const ArticleEditor = () => {
  return (
    <Editor
      content='<p>Hello Ncobase</p>'
      placeholder='Start writing...'
      onChange={html => console.log(html)}
    />
  );
};
```

## Controlled Save Flow

```tsx
import { Editor } from '@ncobase/editor';

export const DraftEditor = ({ content, saveDraft }) => {
  return <Editor content={content} onSave={saveDraft} showBubbleMenu showFloatingMenu />;
};
```

## Image Upload

```tsx
import { Editor } from '@ncobase/editor';

export const MediaEditor = () => {
  return (
    <Editor
      uploadImage={async file => {
        const data = new FormData();
        data.append('file', file);
        const response = await fetch('/api/uploads', { method: 'POST', body: data });
        const result = await response.json();
        return result.url;
      }}
    />
  );
};
```

## Styling

Import the package stylesheet once in the application entry when the bundled editor styles are needed.

```ts
import '@ncobase/editor/dist/index.css';
```

## Development

```bash
pnpm --filter @ncobase/editor lint
pnpm --filter @ncobase/editor typecheck
pnpm --filter @ncobase/editor build
```
