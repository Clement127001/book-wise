import Head from "next/head";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner";
import { PageLoaderProvider } from "@/context/pageLoaderProvider";
import "@/styles/globals.css";

type responseType = { response: { status: number } };

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (_, err: unknown) => {
        const error = err as responseType;

        if (error) {
          if (
            (error.response && error.response.status >= 500) ||
            error.response.status < 600
          ) {
            return true;
          }
        }
        return false;
      },
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Overqualifiedhousewives - Celebrating Women Who Excel</title>
        <meta
          name="description"
          content="Your gateway to discovering extraordinary women professionals who bring creativity, expertise, and leadership to the table. Empowering women, transforming organizations."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Toaster />
      <QueryClientProvider client={queryClient}>
        <PageLoaderProvider>
          <Component {...pageProps} />
        </PageLoaderProvider>
      </QueryClientProvider>
    </>
  );
}
