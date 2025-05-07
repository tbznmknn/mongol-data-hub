'use client';
import * as React from 'react';
import './styles/index.css';

import type { Content, Editor } from '@tiptap/react';
import type { UseMinimalTiptapEditorProps } from './hooks/use-minimal-tiptap';
import { EditorContent } from '@tiptap/react';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { SectionOne } from './components/section/one';
import { SectionTwo } from './components/section/two';
import { SectionThree } from './components/section/three';
import { SectionFour } from './components/section/four';
import { SectionFive } from './components/section/five';
import { LinkBubbleMenu } from './components/bubble-menu/link-bubble-menu';
import { useMinimalTiptapEditor } from './hooks/use-minimal-tiptap';
import { MeasuredContainer } from './components/measured-container';

export interface MinimalTiptapProps
  extends Omit<UseMinimalTiptapEditorProps, 'onUpdate'> {
  value?: Content;
  onChange?: (value: Content) => void;
  className?: string;
  editorContentClassName?: string;
}

export const MinimalTipTapViewer = React.forwardRef<
  HTMLDivElement,
  MinimalTiptapProps
>(({ value, onChange, className, editorContentClassName, ...props }, ref) => {
  const editor = useMinimalTiptapEditor({
    value,
    onUpdate: onChange,
    ...props
  });

  if (!editor) {
    return null;
  }

  return (
    <MeasuredContainer
      as="div"
      name="editor"
      ref={ref}
      className={cn(
        'flex h-auto min-h-72 w-full flex-col rounded-md border border-input shadow-sm focus-within:border-primary',
        className
      )}
    >
      <EditorContent
        editor={editor}
        className={cn('minimal-tiptap-editor ', editorContentClassName)}
      />
      <LinkBubbleMenu editor={editor} />
    </MeasuredContainer>
  );
});

MinimalTipTapViewer.displayName = 'MinimalTipTapViewer';

export default MinimalTipTapViewer;
