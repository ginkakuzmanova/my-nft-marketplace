import {ThemeProvider} from 'next-themes';
import Script from 'next/script';
import '../styles/globals.css'
import {Navbar, Footer} from "../components";

function MyApp({Component, pageProps}) {
  return (
      <ThemeProvider attribute="class">
        <div className="dark:bg-nft-dark bg-white min-h-screen">
          <Navbar/>
          <Component {...pageProps} />
          <Footer/>
        </div>
        <Script src="https://kit.fontawesome.com/3af1ce543a.js" crossOrigin="anonymous" />
      </ThemeProvider>
  )
}

export default MyApp