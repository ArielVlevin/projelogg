"use client";

import { ReactNode, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NotificationProvider } from "@/context/NotificationContext";
import { ToastContainer } from "react-toastify";

export function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <NotificationProvider>
        {children} <ToastContainer />
      </NotificationProvider>
    </QueryClientProvider>
  );
}
