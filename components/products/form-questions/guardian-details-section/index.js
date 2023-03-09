import MKBox from "../../../@mui-components/box";
import {useDispatch} from "../../../../store";
import {useCallback, useEffect, useState} from "react";
import NoGuardian from "./no-guardian";
import {findNextSection} from "../personal-details-section";
import GuardianForm from "./guardian-form";
import GuardianAdvert from "./guardian-advert";
import {calculateAge} from "../../../../utils/helper-functions";
import moment from "moment/moment";

const GuardianDetailsSection = props => {
    const {
        responsesDetails,
        activeSection,
        questionSections,
        addResponseDetails,
        setActiveSection,
        handleOnGuardianSave,
        handleOnBeneficiaryDelete
    } = props;
    
    const [showForm, setShowForm] = useState(false);
    const dispatch = useDispatch();

    const handleOnSectionChange = () => {
        const nextSection = findNextSection(questionSections,activeSection);
        if (nextSection) {
            dispatch(setActiveSection(nextSection))
        }
    }

    const handleOnAddBeneficiary = () => {
        setShowForm(true);
    }

    const handleOnSaveGuardian = async (values) =>{
        await  handleOnGuardianSave(values);
        handleOnSectionChange();
    }


    const handleOnDeleteGuardian = async (id) => {
        if (id){
            await handleOnBeneficiaryDelete(id)
        }
        const newData = {
            ...responsesDetails,
            [activeSection.section]: null
        }
        dispatch(addResponseDetails(newData));
    }

    const guardian = responsesDetails[activeSection.section];

    useEffect(() => {
           if(!guardian){
               setShowForm(false)
           }else {
               setShowForm(true);
           }
    }, [guardian]);



    return (<>
        <MKBox
            component={'section'}
            sx={{
                display: {md:'grid', lg:'flex', sm: 'grid',xs:'grid'},
                gap: 1,
                minHeight: '500px',
               // backgroundColor: theme => alpha(theme.palette.light.main,0.8),
                //opacity: 0.1,
              //  borderRadius: 5,
            }}
        >
            {
                showForm ? (
                    <>
                        <MKBox sx={{ flex:1, p:2,}}>
                            <GuardianAdvert/>
                        </MKBox>
                        <MKBox sx={{ p: 1, flex:2 }}>
                            <GuardianForm {...{ onSave: handleOnSaveGuardian, onDelete: handleOnDeleteGuardian, responsesDetails}}/>
                        </MKBox>
                    </>
                ) : (
                    <>
                        <NoGuardian {...{handleAdd: handleOnAddBeneficiary, handleSkip: handleOnSectionChange}}/>
                    </>
                )
            }
        </MKBox>
        </>
    )
}

export default GuardianDetailsSection;