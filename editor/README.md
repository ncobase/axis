# @ncobase/editor

A powerful and extensible rich text editor built on Tiptap. Provides a complete WYSIWYG editing experience with markdown support, collaborative editing capabilities, and extensive customization options.

## Features

- **Rich Text Editing**: Full WYSIWYG editor with formatting toolbar
- **Markdown Support**: Write in markdown and see live preview
- **Extensible**: Built on Tiptap with custom extensions
- **Collaborative**: Real-time collaborative editing support
- **Media Support**: Images, videos, and file embeds
- **Code Blocks**: Syntax highlighting for code
- **Tables**: Full table editing support
- **Mentions**: @mention users and entities
- **Slash Commands**: Quick formatting with `/` commands
- **Internationalization**: Full i18n support
- **Customizable**: Extensive theming and configuration options

## Installation

```bash
npm install @ncobase/editor
# or
pnpm add @ncobase/editor
# or
yarn add @ncobase/editor
```

## Quick Start

### Basic Editor

```tsx
import { Editor } from '@ncobase/editor';

function MyEditor() {
  const [content, setContent] = useState('');

  return <Editor content={content} onChange={setContent} placeholder='Start typing...' />;
}
```

### With Toolbar

```tsx
import { Editor, Toolbar } from '@ncobase/editor';

function EditorWithToolbar() {
  const [content, setContent] = useState('');

  return (
    <div>
      <Toolbar />
      <Editor content={content} onChange={setContent} editable={true} />
    </div>
  );
}
```

### Read-Only Mode

```tsx
import { Editor } from '@ncobase/editor';

function ReadOnlyEditor({ content }) {
  return <Editor content={content} editable={false} />;
}
```

## Features

### Text Formatting

- **Bold**, _Italic_, ~~Strikethrough~~, `Code`
- Headings (H1-H6)
- Blockquotes
- Lists (ordered, unordered, task lists)
- Text alignment (left, center, right, justify)
- Text color and highlight
- Font family and size

### Rich Content

```tsx
import { Editor } from '@ncobase/editor';

function RichEditor() {
  return (
    <Editor
      content=''
      onChange={content => console.log(content)}
      extensions={{
        image: true,
        video: true,
        table: true,
        codeBlock: true,
        mention: true
      }}
    />
  );
}
```

### Collaborative Editing

```tsx
import { Editor, CollaborationProvider } from '@ncobase/editor';

function CollaborativeEditor() {
  return (
    <CollaborationProvider documentId='doc-123' websocketUrl='wss://your-server.com'>
      <Editor content='' collaborative={true} />
    </CollaborationProvider>
  );
}
```

### Custom Extensions

```tsx
import { Editor } from '@ncobase/editor';
import { CustomExtension } from './custom-extension';

function EditorWithCustomExtension() {
  return <Editor content='' extensions={[CustomExtension]} />;
}
```

## Slash Commands

Type `/` to open the command menu:

- `/h1`, `/h2`, `/h3` - Headings
- `/bold`, `/italic` - Text formatting
- `/bullet`, `/number` - Lists
- `/quote` - Blockquote
- `/code` - Code block
- `/image` - Insert image
- `/table` - Insert table

## Keyboard Shortcuts

- `Ctrl/Cmd + B` - Bold
- `Ctrl/Cmd + I` - Italic
- `Ctrl/Cmd + U` - Underline
- `Ctrl/Cmd + Shift + S` - Strikethrough
- `Ctrl/Cmd + K` - Insert link
- `Ctrl/Cmd + Z` - Undo
- `Ctrl/Cmd + Shift + Z` - Redo
- `Ctrl/Cmd + Alt + 1-6` - Headings

## Configuration

### Editor Options

```tsx
<Editor
  content=''
  onChange={content => {}}
  editable={true}
  placeholder='Start typing...'
  autofocus={true}
  spellcheck={true}
  minHeight='200px'
  maxHeight='600px'
/>
```

### Toolbar Configuration

```tsx
<Toolbar
  items={[
    'bold',
    'italic',
    'underline',
    'strike',
    '|',
    'heading',
    'bulletList',
    'orderedList',
    '|',
    'link',
    'image',
    'codeBlock'
  ]}
/>
```

## Internationalization

The editor supports multiple languages:

```tsx
import { Editor } from '@ncobase/editor';
import { zhCN } from '@ncobase/editor/locales';

function LocalizedEditor() {
  return <Editor content='' locale={zhCN} />;
}
```

Supported languages:

- English (en-US)
- Chinese Simplified (zh-CN)
- Chinese Traditional (zh-TW)
- Japanese (ja-JP)
- Korean (ko-KR)

## Content Format

The editor supports multiple content formats:

### HTML

```tsx
const htmlContent = '<p>Hello <strong>world</strong></p>';

<Editor content={htmlContent} format='html' />;
```

### JSON

```tsx
const jsonContent = {
  type: 'doc',
  content: [
    {
      type: 'paragraph',
      content: [
        { type: 'text', text: 'Hello ' },
        { type: 'text', marks: [{ type: 'bold' }], text: 'world' }
      ]
    }
  ]
};

<Editor content={jsonContent} format='json' />;
```

### Markdown

```tsx
const markdownContent = '# Hello\n\nThis is **bold** text.';

<Editor content={markdownContent} format='markdown' />;
```

## Styling

The editor uses CSS variables for theming:

```css
.editor {
  --editor-bg: #ffffff;
  --editor-text: #000000;
  --editor-border: #e5e7eb;
  --editor-focus: #3b82f6;
}

.dark .editor {
  --editor-bg: #1f2937;
  --editor-text: #f9fafb;
  --editor-border: #374151;
}
```

## API Reference

### Editor Props

| Prop          | Type                        | Default | Description             |
| ------------- | --------------------------- | ------- | ----------------------- |
| `content`     | `string \| object`          | `''`    | Initial content         |
| `onChange`    | `(content: string) => void` | -       | Content change callback |
| `editable`    | `boolean`                   | `true`  | Enable/disable editing  |
| `placeholder` | `string`                    | -       | Placeholder text        |
| `autofocus`   | `boolean`                   | `false` | Auto-focus on mount     |
| `extensions`  | `Extension[]`               | -       | Custom extensions       |
| `locale`      | `Locale`                    | `enUS`  | Localization            |

### Toolbar Props

| Prop     | Type       | Default   | Description           |
| -------- | ---------- | --------- | --------------------- |
| `items`  | `string[]` | All items | Toolbar items to show |
| `sticky` | `boolean`  | `false`   | Sticky toolbar        |

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Dependencies

- React 19+
- Tiptap 2+
- ProseMirror

## License

MIT

## Contributing

Contributions are welcome! Please read our contributing guidelines before submitting PRs.

## Support

For issues and questions, please open an issue on GitHub.
