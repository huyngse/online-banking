"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { EyeIcon, EyeOffIcon } from "lucide-react";

interface PasswordInputProps extends React.ComponentProps<"input"> {}

export const PasswordInput: React.FC<PasswordInputProps> = React.forwardRef<
  HTMLInputElement,
  PasswordInputProps
>(({ className, autoComplete, ...props }, ref) => {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <div className="relative w-full">
      <Input
        {...props}
        type={showPassword ? "text" : "password"}
        ref={ref}
        className={cn("pr-10", className)}
        autoComplete={autoComplete || "new-password"}
      />
      <Button
        type="button"
        onClick={() => setShowPassword((prev) => !prev)}
        variant="link"
        size="sm"
        className="absolute top-1/2 right-1 -translate-y-1/2 p-1"
        aria-label={showPassword ? "Hide password" : "Show password"}
      >
        {showPassword ? (
          <EyeOffIcon className="w-4 h-4" />
        ) : (
          <EyeIcon className="w-4 h-4" />
        )}
      </Button>
    </div>
  );
});

PasswordInput.displayName = "PasswordInput";
