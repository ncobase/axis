import { useEffect, useState } from 'react';

import { Modal } from '../modal/modal';

import { Button } from '@/button';
import { Input } from '@/forms';
import { TablerIconsNamespace, Icons } from '@/icon';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/tabs';

type IconPickerProps = {
  opened: boolean;
  // eslint-disable-next-line no-unused-vars
  onVisible?: (visible: boolean) => void;
  // eslint-disable-next-line no-unused-vars
  onSelected?: (iconName: string) => void;
  translations?: {
    title?: string;
    outline?: string;
    filled?: string;
    searchPlaceholder?: string;
  };
};

export const IconPicker = ({
  opened,
  onVisible,
  onSelected,
  translations = {
    title: 'Select Icon',
    outline: 'Outline',
    filled: 'Filled',
    searchPlaceholder: 'Search icons...'
  }
}: IconPickerProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 150);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  const handleSelectIcon = (iconName: string) => {
    onSelected?.(iconName);
    onVisible?.(false);
  };

  const renderIcons = (isFilled: boolean) => {
    return Object.keys(TablerIconsNamespace)
      .filter(key => {
        const isIconFilled = key.endsWith('Filled');
        const matchesSearch = key.toLowerCase().includes(debouncedSearchTerm.toLowerCase());
        return isFilled === isIconFilled && matchesSearch;
      })
      .map(key => (
        <Button
          key={key}
          variant='outline-slate'
          size='ratio'
          title={key}
          className='[&>svg]:stroke-slate-500/65! [&>svg]:hover:stroke-slate-500/80!'
          onClick={() => handleSelectIcon(key)}
        >
          <Icons name={key} />
        </Button>
      ));
  };

  return (
    <Modal
      title={translations.title}
      isOpen={opened}
      onChange={() => onVisible?.(!opened)}
      className='w-[390px] max-h-[420px]'
    >
      <Tabs defaultValue='outline'>
        <TabsList className='flex items-center justify-end -mt-3'>
          <TabsTrigger
            value='outline'
            className='data-[state=active]:border-primary-500 data-[state=active]:text-primary-500'
          >
            {translations.outline}
          </TabsTrigger>
          <TabsTrigger
            value='filled'
            className='data-[state=active]:border-red-500 data-[state=active]:text-red-500'
          >
            {translations.filled}
          </TabsTrigger>
        </TabsList>
        <Input
          type='text'
          placeholder={translations.searchPlaceholder}
          className='py-1.5 my-3.5'
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <TabsContent value='outline'>
          <div className='flex flex-wrap gap-[12.2px]'>{renderIcons(false)}</div>
        </TabsContent>
        <TabsContent value='filled'>
          <div className='flex flex-wrap gap-[12.2px]'>{renderIcons(true)}</div>
        </TabsContent>
      </Tabs>
    </Modal>
  );
};
