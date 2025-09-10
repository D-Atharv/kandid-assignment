"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";

/**
 * Provides the React Query client to the component tree.
 *
 * Wraps its children with a `QueryClientProvider`, enabling React Query features
 * such as data fetching, caching, and synchronization throughout the app.
 *
 * @param children - The React nodes to be rendered within the provider.
 */
export function Providers({ children }: { children: ReactNode }) {
  const [client] = useState(() => new QueryClient());
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
