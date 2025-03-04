"use client";

// Simplified toast implementation
import { useState, useEffect } from "react";

type ToastProps = {
  title: string;
  description?: string;
  variant?: "default" | "destructive";
};

let toastCallback: ((toast: ToastProps) => void) | null = null;

export function useToast() {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  useEffect(() => {
    toastCallback = (toast) => {
      setToasts((prev) => [...prev, toast]);
      setTimeout(() => {
        setToasts((prev) => prev.slice(1));
      }, 3000);
    };

    return () => {
      toastCallback = null;
    };
  }, []);

  return {
    toast: (props: ToastProps) => {
      if (toastCallback) {
        toastCallback(props);
      }
    },
    toasts,
  };
}

export const toast = (props: ToastProps) => {
  if (toastCallback) {
    toastCallback(props);
  }
};

export function Toaster() {
  const { toasts } = useToast();

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map((toast, index) => (
        <div
          key={index}
          className={`p-4 rounded-md shadow-md ${
            toast.variant === "destructive"
              ? "bg-destructive text-white"
              : "bg-background border"
          }`}
        >
          <h3 className="font-medium">{toast.title}</h3>
          {toast.description && (
            <p className="text-sm mt-1">{toast.description}</p>
          )}
        </div>
      ))}
    </div>
  );
}
