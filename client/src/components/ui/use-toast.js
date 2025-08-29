import { toast as sonnerToast } from "sonner";

export function useToast() {
  return {
    toast: ({ title, description, variant = "default", ...props }) => {
      if (variant === "destructive") {
        sonnerToast.error(title, {
          description,
          ...props,
        });
      } else {
        sonnerToast.success(title, {
          description,
          ...props,
        });
      }
    },
  };
} 