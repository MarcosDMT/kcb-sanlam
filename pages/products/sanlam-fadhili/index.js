import {AppLayout} from "../../../components/layouts";
import Head from "next/head";
import {appName} from "../../../utils/constants";
import {useEffect} from "react";
import {useDispatch, useSelector} from "../../../store";
import SuperEndowmentSection from "../../../components/products/super-endowment";
import {getQuestions} from "../../../slices/super-endowment";


const SuperEndowment = () => {
    const dispatch = useDispatch();
    const { responsesDetails } = useSelector(({superEndowment}) => superEndowment)
    useEffect(() => {
        if (responsesDetails.personalDetails?.email === undefined){
            dispatch(getQuestions());
        }
    },[]);
    return(
        <>
            <Head>
                <title>Super Endowment | {appName}</title>
                <meta name="description" content="apply for super endowment plan" />
            </Head>
            <SuperEndowmentSection/>
        </>
    )
}
SuperEndowment.getLayout = (page) =>(
    <AppLayout>
        {page}
    </AppLayout>
)
export default SuperEndowment;