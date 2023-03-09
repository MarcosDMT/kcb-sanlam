import MKBox from "../../../@mui-components/box";
import BeneficiariesItems from "./beneficiaries-items";
import MKButton from "../../../@mui-components/button";
import {useDispatch} from "../../../../store";
import {useEffect, useState} from "react";
import NoBeneficiary from "./no-beneficiary";
import BeneficiariesForm from "./beneficiaries-form";
import {findNextSection} from "../personal-details-section";

const BeneficiariesDetailsSection = props => {
    const {
        responsesDetails,
        activeSection,
        questionSections,
        addResponseDetails,
        setActiveSection,
        handleOnBeneficiarySave,
        handleOnBeneficiaryDelete
    } = props;
    const [index, setIndex] = useState(null);
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
        setIndex(null)
    }

    const handleOnBeneficiaryClick = index => {
        setIndex(index);
    }

    const handleOnDeleteBeneficiary = (index, id) => {
        const data = [...responsesDetails[activeSection.section]];
        if (id){
            handleOnBeneficiaryDelete(id)
        }
        data.splice(index,1);
        const newData = {
            ...responsesDetails,
            [activeSection.section]: data
        }
        dispatch(addResponseDetails(newData));
    }

    const beneficiaries = responsesDetails[activeSection.section];

    useEffect(() => {
           if(beneficiaries.length <= 0){
               setShowForm(false)
           }else {
               setShowForm(true);
           }
    }, [beneficiaries]);



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
                            <BeneficiariesItems {...{beneficiaries, handleSelect: handleOnBeneficiaryClick,
                                handleDelete: handleOnDeleteBeneficiary}}/>
                        </MKBox>
                        <MKBox sx={{ p: 1, flex:2 }}>
                            <MKBox sx={{
                                display: 'flex',
                                justifyContent: 'flex-end'
                            }}>
                                {beneficiaries.length > 0 &&
                                    <MKButton
                                        color={'primary'}
                                        onClick={e => handleOnSectionChange()}>
                                        Proceed
                                    </MKButton>
                                }
                            </MKBox>

                            <BeneficiariesForm {...{index, setIndex, onSave: handleOnBeneficiarySave, responsesDetails}}/>
                        </MKBox>
                    </>
                ) : (
                    <>
                        <NoBeneficiary {...{handleAdd: handleOnAddBeneficiary, handleSkip: handleOnSectionChange}}/>
                    </>
                )
            }
        </MKBox>
        </>
    )
}

export default BeneficiariesDetailsSection;