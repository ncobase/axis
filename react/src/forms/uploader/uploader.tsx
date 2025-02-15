import React from 'react';

import { cn } from '@ncobase/utils';

import { Icons } from '../../icon';

import {
  FileInput,
  FileUploader,
  FileUploaderContent,
  FileUploaderItem,
  type FileUploaderProps
} from './elements';

interface DropPlaceholderProps {
  text?: {
    main?: string;
    sub?: string;
    hint?: string;
  };
}

const DropPlaceholder: React.FC<DropPlaceholderProps> = ({
  text = {
    main: 'Browse file to upload',
    sub: 'or drag and drop',
    hint: 'SVG, PNG, JPG or GIF'
  }
}) => {
  return (
    <div className='flex items-center justify-center flex-col pt-3 pb-4 w-full bg-slate-50/55 hover:bg-slate-50/25 border border-slate-200/65 shadow-[0.03125rem_0.03125rem_0.125rem_0_rgba(0,0,0,0.03)] rounded-md cursor-pointer'>
      <Icons name='IconCloudUpload' className='w-12 h-12 mb-2 text-slate-400' stroke={1} />
      <p className='mb-1 text-sm text-gray-500 dark:text-gray-400'>
        <span className='font-medium'>{text.main}</span>
        &nbsp; {text.sub}
      </p>
      {text.hint && <p className='text-xs text-gray-500 dark:text-gray-400'>{text.hint}</p>}
    </div>
  );
};

const SingleFileDropPlaceholder: React.FC<DropPlaceholderProps> = ({
  text = {
    main: 'Click to upload',
    sub: 'or drag and drop'
  }
}) => {
  return (
    <div className='flex items-center justify-start w-full bg-slate-50/55 hover:bg-slate-50/25 border border-slate-200/65 shadow-[0.03125rem_0.03125rem_0.125rem_0_rgba(0,0,0,0.03)] rounded-md cursor-pointer px-3 py-2.5'>
      <Icons name='IconCloudUpload' className='w-5 h-5 mr-2 text-slate-400' stroke={1} />
      <div>
        <p className='text-sm text-gray-500 dark:text-gray-400'>
          <span className='font-medium'>{text.main}</span>
          &nbsp; {text.sub}
          {text.hint && <p className='text-xs text-gray-500 dark:text-gray-400'>{text.hint}</p>}
        </p>
      </div>
    </div>
  );
};

export interface UploaderProps extends FileUploaderProps {
  placeholderText?: DropPlaceholderProps['text'];
  renderCustomFileItem?: (file: File, index: number) => React.ReactNode;
  className?: string;
}

export const Uploader: React.FC<UploaderProps> = ({
  value,
  onValueChange,
  dropzoneOptions,
  orientation,
  maxFiles = 1,
  maxSize,
  accept,
  placeholderText,
  renderCustomFileItem,
  className,
  ...props
}) => {
  const isSingleFile = maxFiles === 1;

  const handleRemove = (index: number) => {
    if (isSingleFile) {
      onValueChange(null);
    } else if (Array.isArray(value)) {
      const newFiles = value.filter((_, i) => i !== index);
      onValueChange(newFiles.length > 0 ? newFiles : null);
    }
  };

  const renderFileItems = () => {
    const files = Array.isArray(value) ? value : value ? [value] : [];
    return files.map((file, i) =>
      renderCustomFileItem ? (
        renderCustomFileItem(file, i)
      ) : (
        <FileUploaderItem
          key={i}
          index={i}
          file={file}
          onRemove={handleRemove}
          isSingleFile={isSingleFile}
          className={cn('rounded-md overflow-hidden', isSingleFile ? 'w-full' : 'w-24 h-24')}
          aria-roledescription={`file ${i + 1} containing ${file.name}`}
        />
      )
    );
  };

  return (
    <FileUploader
      value={value}
      onValueChange={onValueChange}
      dropzoneOptions={dropzoneOptions}
      orientation={orientation}
      maxFiles={maxFiles}
      maxSize={maxSize}
      accept={accept}
      className={`focus:outline-none focus:ring-0 ${className}`}
      {...props}
    >
      <FileInput className='focus:outline-none focus:ring-0'>
        {(!value || Array.isArray(value)) &&
          (isSingleFile ? (
            <SingleFileDropPlaceholder text={placeholderText} />
          ) : (
            <DropPlaceholder text={placeholderText} />
          ))}
      </FileInput>
      <FileUploaderContent
        className={cn('flex items-center gap-2', isSingleFile ? 'flex-col' : 'flex-row flex-wrap')}
      >
        {renderFileItems()}
      </FileUploaderContent>
    </FileUploader>
  );
};
