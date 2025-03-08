import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";

type InputProps = {
  value: string;
  setValue: (value: string) => void;
  maxLength: number;
  label: string;
};

function InputWithLimit({ value, setValue, maxLength, label }: InputProps) {
  const [isFocused, setIsFocused] = React.useState(false);
  const isHigher = value.length > maxLength;
  return (
    <div className="w-full space-y-1">
      <Label>{label}</Label>

      <div className="relative">
        <p
          className={`absolute right-2 top-3 text-sm transition-opacity ${
            isFocused ? "opacity-100" : "opacity-0"
          } ${isHigher ? "text-red-500" : "text-gray-500"}
        `}
        >
          {value.length}/{maxLength}
        </p>
        <Input
          className="h-20"
          type="text"
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </div>
    </div>
  );
}

export default InputWithLimit;
