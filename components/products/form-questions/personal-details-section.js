import {useEffect, useState} from "react";
import MKBox from "../../@mui-components/box";
import MKButton from "../../@mui-components/button";
import Question from "./question";
import Bounce from 'react-reveal/Bounce';
import {useFormik} from "formik";
import {useDispatch} from "../../../store";
import {createYupSchema} from "../../@dmt-components/yup-validator";
import * as yup from "yup";
import toast from "react-hot-toast";
import moment from "moment";
import {calculateAge} from "../../../utils/helper-functions";

export const findNextQuestion = (questions, activeQuestion) => {
    const nextQuestion = questions.find(quiz => quiz.id === activeQuestion?.nextQuestion);
    if (nextQuestion){
        return nextQuestion;
    }
   return null;
}
export const findPreviousQuestion = (questions, activeQuestion) => {
    const prevQuestion = questions.find(quiz => quiz.id === activeQuestion?.prevQuestion);
    if (prevQuestion){
        return prevQuestion;
    }
    return null;
}
export const findNextSection = (sections, activeSection) => {
    const nextSection = sections.find(quiz => quiz.section === activeSection?.nextSection);
    if (nextSection){
        return nextSection;
    }
    return null;
}
export const findPreviousSection = (sections, activeSection) => {
    const prevSection = sections.find(quiz => quiz.section === activeSection?.previousSection);
    if (prevSection){
        return prevSection;
    }
    return null;
}

const valueContains = (compareValue, value,) => {
    return compareValue === value;
}

const PersonalDetailsSection = props => {
    const {
        questions,
        responsesDetails,
        activeQuestion,
        activeSection,
        questionSections,
        handleOnSave,
        setActiveQuestion,
        setSectionCompleted,
        setActiveSection,
    } = props;
    const dispatch = useDispatch();
    const [direction, setDirection] = useState({right: true});
    const [initialValues, setInitialValues] = useState({})
    const [validationSchema, setValidationSchema] = useState({});

    const checkCondition = (quiz, prev= false) => {
        const { value, compareWith, section, operation } = quiz.condition;
        let compareValue;
        if (operation === 'contains'){
            let match = false;
            compareWith.map( optVal => {
                if (match){
                    return;
                }
                if (valueContains(responsesDetails[section][optVal], value)){
                    match = true;
                }
            } );
            if (!match){
                let skipQuiz;
                if (prev){
                    skipQuiz = findPreviousQuestion(questions, quiz);
                }
                else{
                    skipQuiz = findNextQuestion(questions, quiz);
                }
                //dispatch(setActiveQuestion(skipQuiz));
                if (skipQuiz?.condition){
                    checkCondition(skipQuiz, prev)
                }else{
                    dispatch(setActiveQuestion(skipQuiz));
                }
            }
            else{
                dispatch(setActiveQuestion(quiz));
            }
        }
        if (operation === 'equals' || operation ==='!='){
            if (activeQuestion.name === compareWith){
                compareValue = formik.values[compareWith];
            }
            else{
                compareValue = responsesDetails[section][compareWith];
            }
            if (operation === 'equals'){
                if (value !== compareValue){
                    //skip the question
                    let skipQuiz;
                    if (prev){
                        skipQuiz = findPreviousQuestion(questions, quiz);
                    }
                    else{
                        skipQuiz = findNextQuestion(questions, quiz);
                    }
                    //dispatch(setActiveQuestion(skipQuiz));
                    if (skipQuiz?.condition){
                        checkCondition(skipQuiz, prev)
                    }else{
                        dispatch(setActiveQuestion(skipQuiz));
                    }
                }
                else{
                    dispatch(setActiveQuestion(quiz));
                }
            }
            else{
                if (value === compareValue){
                    //skip the question
                    let skipQuiz;
                    if (prev){
                        skipQuiz = findPreviousQuestion(questions, quiz);
                    }
                    else{
                        skipQuiz = findNextQuestion(questions, quiz);
                    }
                    //dispatch(setActiveQuestion(skipQuiz));
                    if (skipQuiz?.condition){
                        checkCondition(skipQuiz, prev)
                    }else{
                        dispatch(setActiveQuestion(skipQuiz));
                    }
                }
                else{
                    dispatch(setActiveQuestion(quiz));
                }
            }

        }

    }
    const handleOnNext = (activeQuestion) => {
        const nextQuiz = findNextQuestion(questions, activeQuestion);
        if (nextQuiz){
            setDirection({ right: true})

            // if question has a condition to be displayed.
            if (nextQuiz?.condition){
              checkCondition(nextQuiz)
            }
            //------------------------------------------------------------
            else{
                dispatch(setActiveQuestion(nextQuiz));
            }
        }
        else{

           let nextSection = findNextSection(questionSections,activeSection);
            if (nextSection){
                dispatch(setSectionCompleted(activeSection.section))
                if (nextSection.section === 'guardianDetails'){
                    if (responsesDetails?.childDetails?.dob){
                        const date = moment(responsesDetails.childDetails?.dob).format('DD-MMM-YYYY')
                        const age = calculateAge(date);
                        if (age!== null && age >= 18){
                            nextSection = findNextSection(questionSections,nextSection);
                        }
                    }
                }
                dispatch(setActiveSection(nextSection))
                dispatch(setActiveQuestion(nextSection.questions[0]));
            }
        }
    }

    const handleOnBack = (activeQuestion) => {
        const prevQuiz = findPreviousQuestion(questions, activeQuestion);
        if (prevQuiz){
            setDirection({left: true})
            // if question has a condition to be displayed.
            if (prevQuiz?.condition){
                checkCondition(prevQuiz, true)
            }
            //------------------------------------------------------------
            else{
                dispatch(setActiveQuestion(prevQuiz));
            }
        }
        else{

            let prevSection = findPreviousSection(questionSections,activeSection);
            if (prevSection){
                dispatch(setSectionCompleted(activeSection.section))
                if (prevSection.section === 'guardianDetails'){
                    if (responsesDetails?.childDetails?.dob){
                        const date = moment(responsesDetails.childDetails?.dob).format('DD-MMM-YYYY')
                        const age = calculateAge(date);
                        if (age!== null && age >= 18){
                            prevSection = findNextSection(questionSections,prevSection);
                        }
                    }
                }
                dispatch(setActiveSection(prevSection))
                dispatch(setActiveQuestion(prevSection.questions[0]));
            }
        }
    }


    // get all fields in a section
    const getAllFields = () => {
        let fields = {}, validations = {};
        if (activeQuestion?.children){
            activeQuestion.children.map((quiz) => {
                validations = {...validations, ...createYupSchema({}, quiz)}
                fields = {
                ...fields,
                [quiz.name]: (responsesDetails[activeSection?.section][quiz?.name] ?? '')
            }})
        }
        else if (activeQuestion?.name){
            validations = createYupSchema({}, activeQuestion);
            fields = {
                ...fields,
                [activeQuestion?.name]:(responsesDetails[activeSection?.section][activeQuestion?.name] ?? '')
            }
            if (activeQuestion?.dropdownName){
                fields = {
                    ...fields,
                    [activeQuestion?.dropdownName]:(responsesDetails[activeSection?.section][activeQuestion?.dropdownName] ?? '')
                }
            }
        }
        setInitialValues(fields);
        setValidationSchema(yup.object().shape(validations));
    }


    const formik = useFormik({
        enableReinitialize: true,
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: async (values, helpers) => {
            try {
                const data = {
                    ...responsesDetails,
                    [activeSection.section]: {
                        ...responsesDetails[activeSection.section],
                        ...values
                    }
                }
                await handleOnSave(data);
                handleOnNext(activeQuestion)
            }
            catch (e) {
                toast.error(e.message)
                helpers.setStatus({ success: false });
                helpers.setErrors({ submit: e.message });
                helpers.setSubmitting(false);
            }
        }
    });




    useEffect(() => {
        getAllFields();
    }, [activeQuestion]);
    // set the first question as active
    useEffect(() => {
        dispatch(setActiveQuestion(questions[0]));

    }, [questions]);


    return(
        <>
            <form onSubmit={formik.handleSubmit}>
                <Bounce {...direction} spy={activeQuestion} duration={500}>
                    <MKBox>
                        <Question {...{questionDetails : activeQuestion, formik}}/>
                    </MKBox>
                </Bounce>
                <MKBox sx={{
                    display: 'flex',
                    justifyContent:'space-between',
                    align: 'center',
                    my: 4
                }}>
                    <MKButton onClick={e => handleOnBack(activeQuestion)} disabled={!activeSection?.previousSection || formik.isSubmitting} >
                        Previous
                    </MKButton>
                    <MKButton type={'submit'} color={!activeQuestion?.nextQuestion ? 'success' : 'light'} disabled={formik.isSubmitting}>
                        {activeQuestion?.nextQuestion ? 'Next' : 'Finish' }
                    </MKButton>
                </MKBox>
            </form>
        </>
    )
}

export default PersonalDetailsSection;