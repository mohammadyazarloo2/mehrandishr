"use client";
import { Editor as TinyMCE } from '@tinymce/tinymce-react';

export default function Editor({ value, onChange }) {
  return (
    <TinyMCE
      apiKey="nr1ta163a2w8jdhjeqovt68avxs2tjkm8ju1saqm2cz74m7c"
      value={value}
      onEditorChange={onChange}
      init={{
        height: 500,
        menubar: true,
        directionality: 'rtl',
        plugins: [
          'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
          'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
          'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
        ],
        toolbar: 'undo redo | blocks | ' +
          'bold italic forecolor | alignleft aligncenter ' +
          'alignright alignjustify | bullist numlist outdent indent | ' +
          'removeformat | help',
        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
      }}
    />
  );
}
