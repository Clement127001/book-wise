import { Toaster } from "@/components/ui/sonner";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";

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
      <Component {...pageProps} />
    </>
  );
}
