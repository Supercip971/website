import '../styles/globals.css'

import { Inter } from '@next/font/google'
import { Analytics} from "@vercel/analytics/react"

const inter = Inter({
  weight: 'variable', subsets: ['latin'], fallbacks: true, fallback:
    [
      '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', 'sans-serif',
    ],
  display: 'swap',
});
function MyApp({ Component, pageProps }) {
  return < >
    <div className={inter.className} >

      <Component {...pageProps} />
      <Analytics/>
    </div>
  </>
}

export default MyApp
