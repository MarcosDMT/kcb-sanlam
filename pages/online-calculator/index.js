import Head from 'next/head'
import {appName} from "../../utils/constants";
import DefaultLayout from "../../components/layouts";
import OnlineInsuranceCalculator from "../../components/online-insurance-calculator";



const  InsuranceCalculator = () => {
    return (
        <>
            <Head>
                <title>Online Calculator | {appName}</title>
                <meta name="description" content="landing page for insurance products" />
            </Head>
            <OnlineInsuranceCalculator/>
        </>
    )
}

InsuranceCalculator.getLayout  = (page) => (
    <DefaultLayout>
        {page}
    </DefaultLayout>
)
export default InsuranceCalculator



