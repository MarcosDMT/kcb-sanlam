import {AppLayout} from "../../../components/layouts";
import Head from "next/head";
import {appName} from "../../../utils/constants";
import {useEffect} from "react";
import {getQuestions} from "../../../slices/sanlam-educare";
import {useDispatch, useSelector} from "../../../store";
import SanlamEducareSection from "../../../components/products/sanlam-educare";


const SanlamEducare = () => {
    const dispatch = useDispatch();
    const {responsesDetails}  = useSelector(({ sanlamEducare }) => sanlamEducare);
    useEffect(() => {
        if (responsesDetails.personalDetails?.email === undefined){
            dispatch(getQuestions());
        }
    },[]);
    return(
        <>
            <Head>
                <title>Sanlam Educare | {appName}</title>
                <meta name="description" content="apply for Sanlam Educare plan" />
            </Head>
           <SanlamEducareSection/>
        </>
    )
}
SanlamEducare.getLayout = (page) =>(
    <AppLayout>
        {page}
    </AppLayout>
)
export default SanlamEducare;