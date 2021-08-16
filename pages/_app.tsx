import React from 'react';
import type { AppProps } from 'next/app'
import Head from 'next/head'
import CssBaseline from '@material-ui/core/CssBaseline';
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentElement) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
    <Head>
      <title>Digital Terrain</title>
      <meta name="description" content="Website for the Digital Terrain Minecraft server" />
      <link rel="icon" href="/bee.ico" />
    </Head>
    <Component {...pageProps} />
    </>
  )
}
export default MyApp
