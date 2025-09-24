import Head from "next/head";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner";
import { PageLoaderProvider } from "@/context/pageLoaderProvider";
import "@/styles/globals.css";
import { LoginProvider } from "@/context/LoginProvider";
import { UserDataProvider } from "@/context/UserDataProvider";
import PageRestrictionProvider from "@/context/PageRestrictionProvider";
import { TooltipProvider } from "@/components/ui/tooltip";

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
        <title>BookWise</title>
        <meta
          name="description"
          content=" Book Wise is your smart companion for discovering, organizing, and
        tracking books effortlessly. Whether you're an avid reader or just
        getting started, it helps you explore recommendations and manage your
        personal library with ease. With intuitive features and a sleek
        interface, finding and keeping track of your favorite books has never
        been simpler. Elevate your reading experience with Book Wise—where every
        book finds its place! 📚✨"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/assets/admin/logo.svg" type="image/svg" />
      </Head>
      <Toaster />
      <QueryClientProvider client={queryClient}>
        <PageLoaderProvider>
          <LoginProvider>
            <TooltipProvider>
              <UserDataProvider>
                <PageRestrictionProvider>
                  <Component {...pageProps} />
                </PageRestrictionProvider>
              </UserDataProvider>
            </TooltipProvider>
          </LoginProvider>
        </PageLoaderProvider>
      </QueryClientProvider>
    </>
  );
}
