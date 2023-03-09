import {AppLayout} from "../../../components/layouts";
import Head from "next/head";
import {appName} from "../../../utils/constants";
import EducarePlusSection from "../../../components/products/educare-plus";
import {useEffect} from "react";
import {getQuestions} from "../../../slices/educare-plus";
import {useDispatch, useSelector} from "../../../store";


const EducarePlus = () => {
    const dispatch = useDispatch();
    const {responsesDetails } = useSelector(({ educarePlus }) => educarePlus);
    useEffect(() => {
        if (responsesDetails.personalDetails?.email === undefined){
            dispatch(getQuestions());
        }
    },[]);
    return(
        <>
            <Head>
                <title>Educare Plus | {appName}</title>
                <meta name="description" content="apply for educare plus plan" />
            </Head>
            <EducarePlusSection/>
        </>
    )
}
EducarePlus.getLayout = (page) =>(
    <AppLayout>
        {page}
    </AppLayout>
)
export default EducarePlus;