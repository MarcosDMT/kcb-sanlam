import MKBox from "../../../@mui-components/box";
import {useDispatch} from "../../../../store";
import {useEffect, useState} from "react";

import {findNextSection} from "../personal-details-section";
import NoChild from "./no-child";
import ChildForm from "./child-form";
import ChildAdvert from "./child-advert";
import {addResponseDetails} from "../../../../slices/sanlam-educare";

const ChildDetailsSection = props => {
    const {
        responsesDetails,
        activeSection,
        questionSections,
        setActiveSection,
        handleOnChildSave,
        handleOnChildDelete
    } = props;
    const [showForm, setShowForm] = useState(false);
    const dispatch = useDispatch();

    const handleOnSectionChange = () => {
        const nextSection = findNextSection(questionSections,activeSection);
        if (nextSection) {
            dispatch(setActiveSection(nextSection))
        }
    }

    const handleOnSaveProceed = async values => {
        await handleOnChildSave(values);
        handleOnSectionChange();
    }

    const handleOnDeleteChild = async (id) => {
        if (id){
            await handleOnChildDelete(id);
        }
        const newData = {
            ...responsesDetails,
            [activeSection.section]: null,
        }
        dispatch(addResponseDetails(newData));
        setShowForm(false);
    }

    const handleOnAddChild = () => {
        setShowForm(true);
    }
    const child = responsesDetails[activeSection.section];

    useEffect(() => {
        if(!child){
            setShowForm(false)
        }else {
            setShowForm(true);
        }
    }, [child]);



    return (<>
            <MKBox
                component={'section'}
                sx={{
                    display: {md:'grid', lg: 'flex',sm: 'grid',xs:'grid'},
                    gap: 1,
                    minHeight: '500px',
                }}
            >
                {
                    showForm ? (
                        <>
                            <MKBox sx={{ flex:1, p:2, display: { sm: 'none', xs: 'none', md: 'grid'}}}>
                                <ChildAdvert/>
                            </MKBox>
                            <MKBox sx={{ p: 1, flex:2 }}>
                                <ChildForm {...{ onSave: handleOnSaveProceed, onDelete: handleOnDeleteChild, responsesDetails}}/>
                            </MKBox>
                        </>
                    ) : (
                        <>
                            <NoChild {...{handleAdd: handleOnAddChild, handleSkip: handleOnSectionChange}}/>
                        </>
                    )
                }
            </MKBox>
        </>
    )
}

export default ChildDetailsSection;