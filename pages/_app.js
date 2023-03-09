import { store } from '../store'
import { Provider } from 'react-redux'
import {CssBaseline, ThemeProvider} from '@mui/material';
import theme from './../theme'
import config from 'react-reveal/globals';
import Head from "next/head";
import {appName} from "../utils/constants";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {Toaster} from "react-hot-toast";
config({ ssrFadeout: true });


function MyApp({ Component, pageProps }) {
    const getLayout = Component.getLayout ?? ((page) => page);
  return (
      <>
          <Head>
              <title>{appName}</title>
              <meta name="viewport" content="initial-scale=1, width=device-width" />
              <link rel="icon" href="/favicon.ico" />
              <script src={"https://kit.fontawesome.com/42d5adcbca.js"} crossOrigin="anonymous"  async/>
          </Head>
          <Provider store={store}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <ThemeProvider theme={theme}>
                      <CssBaseline />
                      <Toaster position="top-center" />
                      {
                          getLayout(<Component {...pageProps} />)
                      }
                  </ThemeProvider>
              </LocalizationProvider>
          </Provider>
      </>
  )
}

export default MyApp
