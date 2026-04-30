# @ncobase/react

A comprehensive React component library for building modern enterprise applications. Built with React 19, TypeScript, Tailwind CSS 4, and Radix UI primitives.

## Features

- **150+ Production-Ready Components** across 37 categories
- **Fully Typed** with TypeScript for excellent developer experience
- **Accessible** components built on Radix UI primitives
- **Customizable** with Tailwind CSS and CSS variables
- **Dark Mode** support out of the box
- **Form Integration** with react-hook-form and Zod validation
- **Advanced Table** with sorting, filtering, pagination, and editing
- **Rich Icons** library with 3000+ Tabler icons

## Installation

```bash
npm install @ncobase/react
# or
pnpm add @ncobase/react
# or
yarn add @ncobase/react
```

## Component Categories

### Form Components

- **Input**: Text, email, password, number inputs
- **Select**: Single and multi-select dropdowns
- **Checkbox**: Single and group checkboxes
- **Radio**: Radio button groups
- **Textarea**: Multi-line text input
- **Switch**: Toggle switches
- **Slider**: Range sliders
- **Datepicker**: Single and range date pickers
- **ColorPicker**: Color selection with presets
- **IconPicker**: Icon selection from 3000+ icons
- **FileUploader**: Drag-and-drop file uploads

### Data Display

- **Table (TableView)**: Advanced data table with:
  - Backend/frontend pagination
  - Column sorting and filtering
  - Row selection and bulk actions
  - Inline cell editing
  - CSV/Excel import/export
  - Keyboard navigation
  - Responsive design
- **Badge**: Status indicators and labels
- **Avatar**: User avatars with fallbacks
- **Card**: Content containers
- **Accordion**: Collapsible content sections

### Feedback

- **Toast**: Notification system
- **Alert**: Contextual alerts
- **Progress**: Progress indicators
- **Skeleton**: Loading placeholders
- **Spinner**: Loading spinners

### Overlay

- **Dialog**: Modal dialogs
- **Modal**: Full-screen modals
- **Popover**: Contextual popovers
- **Tooltip**: Hover tooltips
- **AlertDialog**: Confirmation dialogs

### Layout

- **Shell**: Application shell with header, sidebar, topbar
- **Container**: Content containers
- **Tabs**: Tabbed interfaces
- **Portal**: Render components outside DOM hierarchy

### Navigation

- **Breadcrumb**: Navigation breadcrumbs
- **Pagination**: Page navigation
- **Menu**: Dropdown menus
- **Sidebar**: Collapsible sidebars

### Utilities

- **CodeHighlighter**: Syntax highlighting for code
- **Icons**: 3000+ Tabler icons
- **ThemeProvider**: Theme and dark mode management

## Quick Start

### Basic Usage

```tsx
import { Button, Input, Select } from '@ncobase/react';

function MyForm() {
  return (
    <div className='space-y-4'>
      <Input label='Email' type='email' placeholder='Enter your email' />

      <Select
        label='Country'
        options={[
          { value: 'us', label: 'United States' },
          { value: 'uk', label: 'United Kingdom' }
        ]}
      />

      <Button variant='primary'>Submit</Button>
    </div>
  );
}
```

### Form Integration

```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input, Button } from '@ncobase/react';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(schema)
  });

  const onSubmit = data => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
      <Input label='Email' {...register('email')} error={errors.email?.message} />

      <Input
        label='Password'
        type='password'
        {...register('password')}
        error={errors.password?.message}
      />

      <Button type='submit'>Login</Button>
    </form>
  );
}
```

### Advanced Table

```tsx
import { TableView } from '@ncobase/react';

function UserTable() {
  const columns = [
    { key: 'name', label: 'Name', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'role', label: 'Role', filterable: true },
    { key: 'status', label: 'Status', filterable: true }
  ];

  const data = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active' }
  ];

  return (
    <TableView
      columns={columns}
      data={data}
      pagination={{
        pageSize: 10,
        total: 100
      }}
      onSort={(column, direction) => console.log('Sort:', column, direction)}
      onFilter={filters => console.log('Filters:', filters)}
      selectable
      onSelectionChange={selected => console.log('Selected:', selected)}
    />
  );
}
```

### Application Shell

```tsx
import { Shell } from '@ncobase/react';

function App() {
  return (
    <Shell
      header={{
        logo: <Logo />,
        title: 'My App'
      }}
      sidebar={{
        items: [
          { label: 'Dashboard', icon: 'dashboard', path: '/' },
          { label: 'Users', icon: 'users', path: '/users' },
          { label: 'Settings', icon: 'settings', path: '/settings' }
        ]
      }}
    >
      <YourContent />
    </Shell>
  );
}
```

## Theming

The library uses CSS variables for theming, making it easy to customize colors and styles.

```tsx
import { ThemeProvider } from '@ncobase/react';

function App() {
  return (
    <ThemeProvider defaultTheme='light'>
      <YourApp />
    </ThemeProvider>
  );
}
```

### Custom Theme

```css
:root {
  --primary: 220 90% 56%;
  --secondary: 220 14% 96%;
  --accent: 220 90% 56%;
  --destructive: 0 84% 60%;
  --success: 142 76% 36%;
  --warning: 38 92% 50%;
}
```

## Component Props

All components are fully typed with TypeScript. Use your IDE's autocomplete to explore available props.

### Common Props

Most components support these common props:

- `className`: Additional CSS classes
- `disabled`: Disable the component
- `error`: Error message to display
- `label`: Label text
- `placeholder`: Placeholder text
- `required`: Mark as required

## Accessibility

All components follow WAI-ARIA guidelines and include:

- Proper ARIA attributes
- Keyboard navigation support
- Focus management
- Screen reader support

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Dependencies

- React 19+
- Radix UI primitives
- Tailwind CSS 4+
- react-hook-form (for forms)
- Zod (for validation)

## License

MIT

## Contributing

Contributions are welcome! Please read our contributing guidelines before submitting PRs.

## Support

For issues and questions, please open an issue on GitHub.
