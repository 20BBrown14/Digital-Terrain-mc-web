import React from 'react';
import type { AppProps } from 'next/app'
import Head from 'next/head'
import '../styles/globals.css'
import { QueryClient, QueryClientProvider } from 'react-query';

function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentElement) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        <title>Digital Terrain</title>
        <meta name="description" content="Website for the Digital Terrain Minecraft server" />
        <link rel="icon" href="/bee.ico" />
      </Head>
      <Component {...pageProps} />
    </QueryClientProvider>
  )
}
export default MyApp
