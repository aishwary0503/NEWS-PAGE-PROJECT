import Head from "next/head";
import Header from "./Header";

export default function Layout({ children, title = "Magazine News", description = "" }) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>

      <Header />

      <main className="min-h-screen bg-gray-50">
        {children}
      </main>
    </>
  );
}
