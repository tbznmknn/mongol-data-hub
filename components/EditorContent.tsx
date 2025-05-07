import { useEffect, useRef } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import { StarterKit } from '@tiptap/starter-kit';

export const TiptapViewer = ({ content }: { content: string }) => {
  const editor = useEditor({
    extensions: [
      StarterKit // Add the starter extensions for basic functionality
    ],
    content: content, // Set the initial content
    editable: false // Disable editing (viewer mode)
  });

  return (
    <div>
      <EditorContent editor={editor} />
    </div>
  );
};
export default TiptapViewer;
