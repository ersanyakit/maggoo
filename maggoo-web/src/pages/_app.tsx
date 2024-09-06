import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { NextUIProvider } from "@nextui-org/react";
import Header from "@/components/Header";
import Header2 from "@/components/Header2";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <NextUIProvider>
      <div>
        <Header2 />
        <Component {...pageProps} />
      </div>
    </NextUIProvider>
  );
}
