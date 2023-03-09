import MKBox from "../../@mui-components/box";
import MKTypography from "../../@mui-components/typography";
import {IconButton} from "@mui/material";
import {ArrowForwardIos} from "@mui/icons-material";
import PropTypes from "prop-types";
import {useCallback} from "react";
import toast from "react-hot-toast";

const checkCondition = (sections, condition) => {
    if (condition){
        const {operation, value, compareWith, section, action} = condition;
        const compareSection = sections.find(sect => sect.section === section);
        return compareSection[compareWith] === value;
    }
    return true;
}
const getConditionCategory = (sections, condition) => {
    if (condition){
        const {operation, value, compareWith, section, action} = condition;
        return sections.find(sect => sect.section === section);
    }
    return null;
}
const QuestionCategory = props => {
    const { name, questionSections, answeredQuestions, section, totalQuestions, background, condition, backgroundColor, onClick, color='light', ...other} = props;
    const isEnabled = checkCondition(questionSections, condition);
    const conditionSection = getConditionCategory(questionSections, condition);
    const handleOnClick =useCallback((value) => {

        isEnabled ? onClick(value) : toast.error(`Complete  ${conditionSection.name.toLowerCase()} section`);
    },[])

    return(
            <MKBox   sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: backgroundColor,
                background: background,
                minHeight: '10vh',
                borderRadius: 5,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                '&:hover':{
                    boxShadow: 10,
                    //transform: 'translate(2px) scale(1)',
                },
                px:3,
                my:3,
                py:4
            }} {...other}   onClick={e => handleOnClick(section)}>
                <MKBox>
                    <MKTypography variant={'h5'} color={color} >{ name }</MKTypography>
                    {/*<MKTypography color={color} variant={'caption'}  sx={{ textTransform: 'uppercase'}}>{totalQuestions} question(s)</MKTypography>*/}
                </MKBox>
                <MKBox>
                    <IconButton sx={{ border: '3px solid',}} color={color} >
                        <ArrowForwardIos/>
                    </IconButton>
                </MKBox>
            </MKBox>
    )
}

QuestionCategory.propTypes = {
    name: PropTypes.string.isRequired,
    answeredQuestions: PropTypes.any,
    totalQuestions: PropTypes.any.isRequired,
}
export default QuestionCategory;