# @ncobase/react

Ncobase React UI primitives and application components built with React, TypeScript, Radix UI, Vaul, Tabler icons, and Tailwind CSS classes.

## Install

```bash
pnpm add @ncobase/react
```

## Main Exports

- Layout: `Shell`, `Container`, `Tabs`, `Portal`, `ScrollView`
- Actions and feedback: `Button`, `Alert`, `AlertDialog`, `Badge`, `Progress`, `Skeleton`, `Toast`
- Forms: `Form`, field renderers, `InputField`, `TextareaField`, `SelectField`, `TreeSelectField`, `UploaderField`, `Switch`
- Overlays: `Dialog`, `Modal`, `Popover`, `Tooltip`, `Drawer`
- Data display: `TableView`, table cell helpers, `Avatar`, `Card`, `Accordion`
- Rich content: `Editor`, `CodeHighlighter`, `Icons`, `IconPicker`, `ColorPicker`

## Basic Usage

```tsx
import { Button, InputField } from '@ncobase/react';

export const LoginForm = () => {
  return (
    <form className='space-y-4'>
      <InputField name='email' label='Email' placeholder='name@example.com' />
      <Button type='submit'>Sign in</Button>
    </form>
  );
};
```

## Table Usage

```tsx
import { TableView, type TableViewProps } from '@ncobase/react';

const header: TableViewProps['header'] = [
  { title: 'Name', dataIndex: 'name' },
  { title: 'Email', dataIndex: 'email' }
];

export const UsersTable = ({ users }) => {
  return <TableView header={header} data={users} paginated />;
};
```

## Drawer Usage

```tsx
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from '@ncobase/react';

export const DetailsDrawer = () => {
  return (
    <Drawer>
      <DrawerTrigger>Open</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Details</DrawerTitle>
        </DrawerHeader>
        <DrawerClose>Close</DrawerClose>
      </DrawerContent>
    </Drawer>
  );
};
```

## Development

```bash
pnpm --filter @ncobase/react lint
pnpm --filter @ncobase/react typecheck
pnpm --filter @ncobase/react build
```
