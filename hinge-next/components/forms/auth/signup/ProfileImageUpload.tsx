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

// TODO: fix the any
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ProfileImageUploadForm({ form }: { form: any }) {
  const [preview, setPreview] = useState<string | null>(null);

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
        control={form.control}
        name="profileImage"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Profile Image</FormLabel>
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
    </>
  );
}
