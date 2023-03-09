import {beneficiaryQuestions, healthQuestions, occupationDetails, personalQuestions} from "./common-data";


const sanlamEducareQuestions = [
    {
        name: 'Personal Details',
        description: "Welcome! We're delighted you've decided to apply for Life insurance with us.",
        additionalInfo:"To get started, we’d like to learn a bit about you.",
        totalQuestions: personalQuestions.length,
        answeredQuestions: 0,
        section: 'personalDetails',
        backgroundColor: 'primary.main',
        background: 'linear-gradient(25deg,#0075c9,#4188e7 20%,#25c1ed 90%)',
        //backgroundColor: theme => alpha(theme.palette.primary.main, 0.5),
        questions: personalQuestions,
        condition: null,
        completed: false,
        nextSection: 'childDetails',
        previousSection: null,
    },
    {
        name: 'Child Details',
        description: "",
        additionalInfo:"",
        totalQuestions: 1,
        answeredQuestions: 0,
        section: 'childDetails',
        //hidden: true,
        backgroundColor: 'primary.main',
        background: 'linear-gradient(25deg,#0075c9,#4188e7 20%,#25c1ed 90%)',
        //backgroundColor: theme => alpha(theme.palette.primary.main, 0.5),
        questions: personalQuestions,
        condition: null,
        completed: false,
        nextSection: 'occupationDetails',
        previousSection: 'personalDetails',
    },
    {
        name: 'Occupational Details',
        description: "",
        additionalInfo:"",
        totalQuestions: occupationDetails.length,
        answeredQuestions: 0,
        section: 'occupationDetails',
        backgroundColor: 'primary.main',
        background: 'linear-gradient(25deg,#0075c9,#4188e7 20%,#25c1ed 90%)',
        //backgroundColor: theme => alpha(theme.palette.primary.main, 0.5),
        questions: occupationDetails,
        condition: null,
        completed: true,
       // hidden: true,
        nextSection: 'healthInfo',
        previousSection: 'childDetails',
    },
    {
        name: 'Health Information',
        description: "Answering these fast and simple health questions assists us in wrapping up your application.",
        additionalInfo:"To get started, we’d like to learn a bit about you.",
        totalQuestions: healthQuestions.length,
        answeredQuestions: 0,
        section: 'healthInfo',
        backgroundColor: 'success.main',
        background: 'linear-gradient(25deg,#249728,#04c20c 20%,#6ccf07 90%)',
        //backgroundColor: theme => alpha(theme.palette.success.main, 0.5),
        questions: healthQuestions,
        completed: true,
        // condition: {
        //     operation: 'equals',
        //     value: true,
        //     compareWith: 'completed',
        //     section: 'personalDetails',
        //     action: 'show',
        // },
        nextSection: 'guardianDetails',
        previousSection: 'occupationDetails',
    },
    {
        name: 'Guardian Details',
        totalQuestions: beneficiaryQuestions.length,
        answeredQuestions: 0,
        section: 'guardianDetails',
        allowMultiple: true,
        backgroundColor: 'secondary.main',
        background: 'linear-gradient(25deg,#585b6e,#5e6798 20%,#939dcf 90%)',
        // backgroundColor: theme => alpha(theme.palette.secondary.main, 0.5),
        questions: beneficiaryQuestions,
        nextSection: 'paymentInfo',
        previousSection: 'healthInfo',
        //hidden: true,
        // condition: {
        //     operation: '!=',
        //     value: '18',
        //     compareWith: 'dob',
        //     section: 'childDetails',
        //     action: 'skip',
        // },

    },
    // {
    //     name: 'Beneficiary Details',
    //     totalQuestions: beneficiaryQuestions.length,
    //     answeredQuestions: 0,
    //     section: 'beneficiaryInfo',
    //     allowMultiple: true,
    //     backgroundColor: 'secondary.main',
    //     background: 'linear-gradient(25deg,#585b6e,#5e6798 20%,#939dcf 90%)',
    //     // backgroundColor: theme => alpha(theme.palette.secondary.main, 0.5),
    //     questions: beneficiaryQuestions,
    //     nextSection: 'paymentInfo',
    //     previousSection: 'healthInfo',
    //     condition: {
    //         operation: 'equals',
    //         value: true,
    //         compareWith: 'completed',
    //         section: 'healthInfo',
    //         action: 'show',
    //     },
    //
    // },
    {
        totalQuestions: beneficiaryQuestions.length,
        answeredQuestions: 0,
        allowMultiple: true,
        backgroundColor: 'secondary.main',
        background: 'linear-gradient(25deg,#585b6e,#5e6798 20%,#939dcf 90%)',
        questions: beneficiaryQuestions,
        name: 'Payment Details',
        //hidden: true,
        section: 'paymentInfo',
        nextSection: null,
        previousSection: 'guardianDetails',
    },
];

export default sanlamEducareQuestions;