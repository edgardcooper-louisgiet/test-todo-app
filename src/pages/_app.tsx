// src/pages/_app.tsx
import { withTRPC } from "@trpc/next";
import type { AppRouter } from "../server/router";
import type { AppType } from "next/dist/shared/lib/utils";
import type { createPage } from "../utils/nextjs";
import superjson from "superjson";
import { SessionProvider } from "next-auth/react";
import "../styles/globals.css";
import { ToastContainer } from "react-toastify";
import { mountNProgress } from "../utils/nprogress";

import 'react-toastify/dist/ReactToastify.css';


mountNProgress()

const MyApp: AppType = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
    const {
        Layout,
        SubLayout,
    } = Component as ReturnType<typeof createPage>


    if (Component.displayName === "ErrorPage") return <Component/>

    return (
        <SessionProvider session={session}>
            <ToastContainer 
            theme="colored"
            closeOnClick
            draggablePercent={20}
            newestOnTop
            />
            
            <Layout>
                <SubLayout>
                    <Component/>
                </SubLayout>
            </Layout>
        </SessionProvider>
    );
};

const getBaseUrl = () => {
  if (typeof window !== "undefined") {
    return "";
  }
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // SSR should use vercel url

  return `http://localhost:${process.env.PORT ?? 3000}`; // dev SSR should use localhost
};

export default withTRPC<AppRouter>({
  config({ ctx }) {
    /**
     * If you want to use SSR, you need to use the server's full URL
     * @link https://trpc.io/docs/ssr
     */
    const url = `${getBaseUrl()}/api/trpc`;

    return {
      url,
      transformer: superjson,
      queryClientConfig: {
        defaultOptions: {
            queries: {
                refetchInterval: false,
                refetchOnMount: false,
                refetchOnReconnect: false,
                refetchOnWindowFocus: false,
                cacheTime: Infinity,
                staleTime: Infinity,
            }
        }
      }
      /**
       * @link https://react-query.tanstack.com/reference/QueryClient
       */
      // queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
    };
  },
  /**
   * @link https://trpc.io/docs/ssr
   */
  ssr: false,
})(MyApp);
