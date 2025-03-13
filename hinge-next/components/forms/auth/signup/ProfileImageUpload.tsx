"use client";

import React, { useState } from "react";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Control } from "react-hook-form";

export default function ProfileImageUploadForm({
  control,
}: {
  // TODO: fix the any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
}) {
  const existingImage = control._defaultValues.avatar_url || null;
  const [preview, setPreview] = useState<string | null>(existingImage);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);
    }
  };

  return (
    <>
      <FormField
        control={control}
        name="profileImage"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Profile Image</FormLabel>
            {preview && (
              <div className="flex justify-center">
                <div className="relative w-48 h-64">
                  <Image
                    src={preview}
                    alt="Profile Preview"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            )}
            <FormControl>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  field.onChange(file);
                  handleImageChange(e);
                }}
                ref={field.ref}
              />
            </FormControl>
            <FormDescription>Upload a potrait image</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
