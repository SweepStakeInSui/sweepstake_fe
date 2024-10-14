import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import type { ControllerRenderProps } from 'react-hook-form';
import { toast } from 'sonner';

import { Button } from '../../ui/button';
import Flex from '../Flex';
import Stack from '../Stack';
import Svg from '../Svg';
import Typography from '../Typography';

interface ImageUploaderProps extends ControllerRenderProps {
  variant?: 'big' | 'rounded' | 'default';
  desc?: string;
  customKey: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  onChange,
  value,
  variant = 'default',
  desc,
  customKey,
}) => {
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (value instanceof File) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(value);
    } else {
      setPreview(null);
    }
  }, [value]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.size <= 10 * 1024 * 1024) {
      onChange(file);
    } else {
      toast.error('File size exceeds 10MB limit');
    }

    event.target.value = '';
  };

  const handleRemove = () => {
    onChange(null);
    setPreview(null);
    if (document.getElementById('fileInput')) {
      (document.getElementById('fileInput') as HTMLInputElement).value = '';
    }
  };

  const previewImageSize = (() => {
    switch (variant) {
      case 'big':
        return 'size-30 rounded-md';
      case 'rounded':
        return 'size-30 rounded-full';
      default:
        return 'size-20 rounded-md';
    }
  })();

  return (
    <Stack>
      {preview && (
        <div className={`mb-2 relative ${previewImageSize} overflow-hidden`}>
          <Image
            src={preview}
            alt="Preview"
            className="max-w-full h-auto max-h-32 object-cover"
            fill
          />
          <button
            className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
            onClick={handleRemove}
            aria-label="Remove image"
          >
            <Svg
              src="/icons/delete_outline.svg"
              className="text-white size-6"
            />
          </button>
        </div>
      )}
      <Flex className="items-center">
        <Button
          className="rounded-full bg-blk-a80 border-blk-a85 px-2 py-0.5 gap-1"
          onClick={() => document.getElementById(customKey)?.click()}
        >
          <Typography>{value ? 'Change' : 'Upload'}</Typography>
          <Svg src="/icons/photo_camera.svg" />
        </Button>
        <input
          id={customKey}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
        {desc && (
          <Typography.Text size={13} className="text-text-subtle ml-2">
            {desc}
          </Typography.Text>
        )}
      </Flex>
    </Stack>
  );
};

export default ImageUploader;
