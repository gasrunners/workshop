import { type AppType } from "next/app"
import { api } from "../utils/api"
import "../styles/globals.css"
import Script from "next/script"

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <Script
        src="https://kit.fontawesome.com/1204472a1e.js"
        crossOrigin="anonymous"
        async
      />
      <Component {...pageProps} />
    </>
  )
}

export default api.withTRPC(MyApp)
