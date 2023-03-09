import Head from 'next/head'
import {appName} from "../utils/constants";
import LandingPage from "../components/landing-page";
import DefaultLayout, {AppLayout} from "../components/layouts";

const  Home = () => {
  return (
    <>
      <Head>
        <title>Products | {appName}</title>
        <meta name="description" content="landing page for insurance products" />
      </Head>
        <LandingPage />
    </>
  )
}

Home.getLayout  = (page) => (
    <DefaultLayout color={'light.main'} position={'absolute'}>
        {page}
    </DefaultLayout>
)
export default Home



