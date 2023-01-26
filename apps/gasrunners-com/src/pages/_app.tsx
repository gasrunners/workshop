import { type AppType } from "next/app"

import { api } from "../utils/api"

import "../styles/globals.css"
import Head from "next/head"

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <script
          src="https://kit.fontawesome.com/1204472a1e.js"
          crossOrigin="anonymous"
          async
        />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default api.withTRPC(MyApp)
