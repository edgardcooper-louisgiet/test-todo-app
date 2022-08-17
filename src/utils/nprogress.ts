import { Router } from "next/router"
import nProgress from "nprogress"

import "nprogress/nprogress.css"
// import "./nProgress.scss"

export const mountNProgress = () => {
    nProgress.configure({
        showSpinner: false,
        // parent: 
    })
    
    Router.events.on("routeChangeStart", () => nProgress.start())
    Router.events.on("routeChangeComplete", () => nProgress.done())
    Router.events.on("routeChangeError", () => nProgress.done())
}