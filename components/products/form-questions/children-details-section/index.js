import MKBox from "../../../@mui-components/box";
import MKButton from "../../../@mui-components/button";
import {useDispatch} from "../../../../store";
import {useEffect, useState} from "react";

import {findNextSection} from "../personal-details-section";
import ChildrenItems from "./children-items";
import ChildrenForm from "./children-form";
import NoChild from "./no-child";

const ChildrenDetailsSection = props => {
    const {
        responsesDetails,
        activeSection,
        questionSections,
        addResponseDetails,
        setActiveSection,
        handleOnChildSave,
        handleOnChildDelete
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

    const handleOnAddChild = () => {
        setShowForm(true);
        setIndex(null)
    }

    const handleOnChildClick = index => {
        setIndex(index);
    }

    const handleOnDeleteChild = (index, id) => {
        const data = [...responsesDetails[activeSection.section]];
        if (id){
            handleOnChildDelete(id)
        }

        data.splice(index,1);
        const newData = {
            ...responsesDetails,
            [activeSection.section]: data
        }
        dispatch(addResponseDetails(newData));

    }

    const children = responsesDetails[activeSection.section];

    useEffect(() => {
        if(children.length <= 0){
            setShowForm(false)
        }else {
            setShowForm(true);
        }
    }, [children]);



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
                            <MKBox sx={{ flex:1, p:2,}}>
                                <ChildrenItems {...{
                                    children,
                                    handleSelect: handleOnChildClick,
                                    handleDelete: handleOnDeleteChild
                                }}
                                />
                            </MKBox>
                            <MKBox sx={{ p: 1, flex:2 }}>
                                <MKBox sx={{
                                    display: 'flex',
                                    justifyContent: 'flex-end'
                                }}>
                                    {children.length > 0 &&
                                        <MKButton
                                            color={'primary'}
                                            onClick={e => handleOnSectionChange()}>
                                            Proceed
                                        </MKButton>
                                    }
                                </MKBox>

                                <ChildrenForm {...{index, setIndex, onSave: handleOnChildSave, responsesDetails}}/>
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

export default ChildrenDetailsSection;