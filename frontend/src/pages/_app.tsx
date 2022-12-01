import type { AppProps } from "next/app";
import { Layout } from "../components/Layout";
import "bootstrap/dist/css/bootstrap.css";
import "../styles/pico.min.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
