export const benRelationships = [
    'Aunt',
    'Brother',
    'Cousin',
    'Daughter',
    'Daughter-In-Law',
    'Father',
    'Father-In-Law',
    'Grand Child',
    'Grand Father',
    'Grand Mother',
    'Guardian',
    'Mother',
    'Mother-In-Law',
    'Nephew',
    'Niece',
    'Sister',
    'Spouse',
    'Son'
];
export const genderOpts = ['Male', 'Female'];
export const idOps = [ 'National ID', 'Passport ID', 'Alien ID'];
export const personalQuestions = [
    {
        id: '#name',
        question: 'My name is',
        questionType: 'multiple-text',
        children: [
            {
                id: 'surname',
                questionType:'text',
                placeholder: 'Surname',
                name: 'surname',
                required: true,
                validationType: 'string',
                validations: [
                    {
                        type: "required",
                        params: ["Enter your surname"]
                    },
                ]
            },

            {
                id: 'otherNames',
                questionType:'text',
                placeholder: 'Other Names',
                name: 'otherNames',
                required: true,
                validationType: 'string',
                validations: [
                    {
                        type: "required",
                        params: ["Enter other names"]
                    },
                ]
            },

        ],
        nextQuestion: '#contact',
        prevQuestion: null,
    },
    {
        id: '#contact',
        question: 'How you can reach me',
        questionType: 'multiple-text',
        nextQuestion: '#dob',
        prevQuestion: '#name',
        children: [
            {
                id: '#contact-email',
                questionType:'email',
                placeholder: 'Email Address',
                name: 'email',
                required: true,
                validationType: 'string',
                validations: [
                    {
                        type: "required",
                        params: ["Email is required"]
                    },
                    {
                        type: "email",
                        params: ["Email is invalid"]
                    },
                ]
            },
            {
                id: '#contact-phone',
                questionType:'text',
                placeholder: 'Phone Number',
                name: 'phoneNumber',
                dropdownName: 'countryCode',
                required: true,
                validationType: 'string',
                validations: [
                    {
                        type: "required",
                        params: ["Phone Number is required"]
                    },
                    {
                        type: "min",
                        params: [7, "Should contain at least 7 characters"]
                    },
                    {
                        type: "max",
                        params: [16, "Should not exceed 16 characters"]
                    },
                ]
            },
        ]
    },
    {
        id: '#dob',
        question: 'My date of birth is ',
        name: 'dob',
        label: 'Date of Birth',
        maxYears:'18',
        questionType: 'dob',
        required: true,
        validationType: 'string',
        validations: [
            {
                type: "required",
                params: ["Date of birth is required"]
            },

        ],
        nextQuestion: '#gender',
        prevQuestion: '#contact',
    },
    {
        id: '#gender',
        question: 'I am ',
        name: 'gender',
        questionType: 'radio',
        required: true,
        options: genderOpts,
        nextQuestion: '#idNumber',
        prevQuestion: '#dob',
        validationType: 'string',
        validations: [
            {
                type: "required",
                params: ["Please select gender"]
            },
        ]
    },
    {
        id: '#idNumber',
        question: 'Mode of Identification ',
        required: true,
        name: 'idNumber',
        questionType: 'dropdown-text',
        options: idOps,
        dropdownName: 'idType',
        nextQuestion: '#pin',
        prevQuestion: '#gender',
        validationType: 'string',
        validations: [
            {
                type: "required",
                params: ["Field is required"]
            },
            {
                type: "min",
                params: [7,"At least 7 characters"]
            },
        ]
    },
    {
        id: '#pin',
        question: 'What is your PIN number?',
        name: 'pin',
        placeholder: 'PIN Number',
        questionType: 'text',
        required: true,
        validationType: 'string',
        validations: [
            {
                type: "required",
                params: ["Pin is required"]
            },
            {
                type: "min",
                params: [9, "Should be at least 9 characters"]
            },
        ],
        nextQuestion: '#nationality',
        prevQuestion: '#idNumber',
    },
    {
        id: '#nationality',
        question: 'My nationality is',
        required: true,
        name: 'nationality',
        label: 'Nationality/Citizen',
        filter: 'EA',
        questionType: 'country-select',
        nextQuestion: '#residency',
        prevQuestion: '#pin',
        validationType: 'string',
        validations: [
            {
                type: "required",
                params: ["Field is required"]
            },
        ]
    },
    {
        id: '#residency',
        question: 'I am a resident in',
        name: 'residency',
        required: true,
        questionType: 'country-select',
        label: 'Residency',
        nextQuestion: '#usResidents',
        prevQuestion: '#nationality',
        validationType: 'string',
        validations: [
            {
                type: "required",
                params: ["Field is required"]
            },
        ]
    },
    {
        id: '#usResidents',
        question: ' Please provide this additional Info',
        questionType: 'multiple-text',
        children: [
            {
                id: '#address-us',
                questionType:'text',
                placeholder: 'Address',
                name: 'usAddress',
                required: true,
                validationType: 'string',
                validations: [
                    {
                        type: "required",
                        params: ["Field is required"]
                    },
                ]
            },
            {
                id: '#taxIdNumber',
                questionType:'text',
                placeholder: 'Taxpayer Identification Number',
                name: 'taxIdNumber',
                required: true,
                validationType: 'string',
                validations: [
                    {
                        type: "required",
                        params: ["Field is required"]
                    },
                ]
            },
        ],
        nextQuestion: '#occupation',
        prevQuestion: '#residency',
        condition: {
            operation: 'equals',
            value: 'US',
            //compareWith: 'nationality',
            compareWith: 'residency',
            action: 'show',
            section: 'personalDetails',
        }
    },
    {
        id: '#occupation',
        question: 'Kindly select your occupation',
        name: 'occupation',
        questionType: 'radio',
        required: true,
        options: [ 'Employed', 'Business'],
        nextQuestion: '#employed',
        validationType: 'string',
        validations: [
            {
                type: "required",
                params: ["Please select one option"]
            },
        ],
        prevQuestion: '#usResidents',
    },
    {
        id: '#employed',
        question: "Please provide more information about your employment",
        questionType: 'multiple-text',
        children: [
            {
                id: '#employerName',
                questionType:'text',
                placeholder: 'Employer Name',
                name: 'employerName',
                required: true,
                validationType: 'string',
                validations: [
                    {
                        type: "required",
                        params: ["Enter your employer name"]
                    },
                ]
            },
            {
                id: '#role',
                questionType:'text',
                placeholder: 'Role',
                name: 'role',
                required: true,
                validationType: 'string',
                validations: [
                    {
                        type: "required",
                        params: ["Enter your role"]
                    },
                ]
            },
            {
                id: '#employmentTerms',
                question: 'Employment Terms',
                placeholder:'Employment Terms',
                name: 'employmentTerms',
                questionType: 'radio',
                required: true,
                options: [ 'Temporary', 'Permanent', 'Contract'],
                validationType: 'string',
                fullWidth: true,
                validations: [
                    {
                        type: "required",
                        params: ["Field is required"]
                    },
                ]
            },
            {
                id: '#sourceOfIncome',
                question: 'Source of Income',
                placeholder:'Source of Income',
                name: 'sourceOfIncome',
                questionType: 'dropdown',
                required: true,
                options: ['Employment', 'Business'],
                validationType: 'string',
                fullWidth: true,
                validations: [
                    {
                        type: "required",
                        params: ["Field is required"]
                    },
                ]
            },
            {
                id: '#averageIncome',
                question: 'Average Monthly Income',
                placeholder:'Average Monthly Income',
                name: 'averageIncome',
                questionType: 'dropdown',
                required: true,
                options: ['10K – 20K', '21K – 40K', '41k – 60k', 'Above 60k'],
                validationType: 'string',
                fullWidth: true,
                validations: [
                    {
                        type: "required",
                        params: ["Field is required"]
                    },
                ]
            },
        ],
        nextQuestion: '#business',
        prevQuestion: '#occupation',
        condition: {
            operation: 'equals',
            value: 'Employed',
            compareWith: 'occupation',
            action: 'show',
            section: 'personalDetails',
        },
    },
    {
        id: '#business',
        question: 'Please provide more information about your business',
        questionType: 'multiple-text',
        children: [
            {
                id: '#businessName',
                questionType:'text',
                placeholder: 'Business Name',
                name: 'businessname',
                required: true,
                validationType: 'string',
                validations: [
                    {
                        type: "required",
                        params: ["Field is required"]
                    },
                ]
            },
            {
                id: '#natureOfBusiness',
                questionType:'text',
                placeholder: 'Nature of Business',
                name: 'natureofbusiness',
                required: false,
            },
            {
                id: '#role',
                questionType:'text',
                placeholder: 'Role in business',
                name: 'roleinbusiness',
                required: false,
                fullWidth: true
            },
            {
                id: '#sourceOfIncome',
                question: 'Source of Income',
                placeholder:'Source of Income',
                name: 'sourceOfIncome',
                questionType: 'dropdown',
                required: true,
                options: ['Employment', 'Business'],
                validationType: 'string',
                fullWidth: true,
                validations: [
                    {
                        type: "required",
                        params: ["Field is required"]
                    },
                ]
            },
            {
                id: '#averageIncome',
                question: 'Average Monthly Income',
                placeholder:'Average Monthly Income',
                name: 'averageIncome',
                questionType: 'dropdown',
                required: true,
                options: ['10K – 20K', '21K – 40K', '41k – 60k', 'Above 60k'],
                validationType: 'string',
                fullWidth: true,
                validations: [
                    {
                        type: "required",
                        params: ["Field is required"]
                    },
                ]
            },
        ],
        condition: {
            operation: 'equals',
            value: 'Business',
            compareWith: 'occupation',
            section: 'personalDetails',
            action: 'show',
        },
        nextQuestion: '#success',
        prevQuestion: '#occupation',
    },
    {
        id: '#success',
        question: 'You are almost there, Click Finish to proceed with the next section',
        questionType: 'success',
        nextQuestion: null,
        prevQuestion: '#business',
    },
];
export const healthQuestions = [
    {
        id: '#qst1',
        question: 'Has an application for life, sickness, disability or critical' +
            ' illness insurance on your life ever been declined, deferred, withdrawn or' +
            ' accepted with a loading or exclusion?',
        name: 'qst1',
        questionType: 'radio',
        required: true,
        validationType: 'string',
        validations: [
            {
                type: "required",
                params: ["Please select an option"]
            },
        ],
        options: [ 'Yes', 'No'],
        nextQuestion: '#qst2',
        prevQuestion: null,
    },
    {
        id: '#qst2',
        question: 'Have you consulted or currently consulting or \n' +
            'intend to consult in future a medical professional \n' +
            'for any diagnosis with any disease or medical \n' +
            'condition other than flue?\n',
        name: 'qst2',
        questionType: 'radio',
        required: true,
        validationType: 'string',
        validations: [
            {
                type: "required",
                params: ["Please select an option"]
            },
        ],
        options: [ 'Yes', 'No'],
        nextQuestion: '#qst4a',
        prevQuestion: '#qst1',
    },
    // {
    //     id: '#qst3',
    //     question: 'Have you in the last 5 years; consulted any medical professionals; ' +
    //         'had medical examinations and/or special investigations (including blood tests); ' +
    //         'taken medication or treatment; been hospitalised or received medical advice ' +
    //         'to alter or discontinue your alcohol consumption?',
    //     name: 'qst3',
    //     questionType: 'radio',
    //     required: true,
    //     validationType: 'string',
    //     validations: [
    //         {
    //             type: "required",
    //             params: ["Please select an option"]
    //         },
    //     ],
    //     options: [ 'Yes', 'No'],
    //     nextQuestion: '#qst4a',
    //     prevQuestion: '#qst2',
    // },
    {
        id: '#qst4a',
        question: ' Have you in the last 5 years, suffered from or been ' +
            'diagnosed with any form of: (tick appropriately or click next if not applicable) ',
        questionType: 'multiple-checks',
        children: [
            {
                id: '#qst4_1',
                questionType:'checkbox',
                placeholder: 'Blindness, hearing or speech problem? ',
                name: 'qst4_1',
            },
            {
                id: '#qst4_2',
                questionType:'checkbox',
                placeholder: 'Asthma, tuberculosis or chronic cough?',
                name: 'qst4_2',
            },
            {
                id: '#qst4_3',
                questionType:'text',
                placeholder: 'Heart attack, heart disease or disorder, high' +
                    'blood pressure, raised cholesterol? ',
                name: 'qst4_3',
            },

        ],
        nextQuestion: '#qst4b',
        prevQuestion: '#qst2',
    },
    {
        id: '#qst4b',
        question: ' Have you in the last 5 years, suffered from or been ' +
            'diagnosed with any form of: (tick appropriately or click next if not applicable). Continued',
        questionType: 'multiple-checks',
        children: [
            {
                id: '#qst4_4',
                questionType:'text',
                placeholder: 'Diabetes or stroke',
                name: 'qst4_4',
            },
            {
                id: '#qst4_5',
                questionType:'checkbox',
                placeholder: 'Cancer or tumors (state whether benign or malignant)',
                name: 'qst4_5',
            },
            {
                id: '#qst4_6',
                questionType:'checkbox',
                placeholder: 'Kidney disease, blood or protein in urine',
                name: 'qst4_6',
            },
        ],
        nextQuestion: '#qst4c',
        prevQuestion: '#qst4a',
    },
    {
        id: '#qst4c',
        question: ' Have you in the last 5 years, suffered from or been ' +
            'diagnosed with any form of: (tick appropriately or click next if not applicable) Continued',
        questionType: 'multiple-checks',
        children: [
            {
                id: '#qst4_7',
                questionType:'checkbox',
                placeholder: 'HIV/AIDS or HIV/AIDS related conditions, Sexually Transmitted Diseases (STDs)',
                name: 'qst4_7',
            },
            {
                id: '#qst4_8',
                questionType:'checkbox',
                placeholder: 'Psychological problems or disability? ',
                name: 'qst4_8',
            },
            {
                id: '#qst4_9',
                questionType:'checkbox',
                placeholder: 'Body or Limb defects, paralysis or physical disability',
                name: 'qst4_9',
            },
            {
                id: '#qst4_10',
                questionType:'checkbox',
                placeholder: 'Any condition other than colds, flue or other minor curable ailments',
                name: 'qst4_10',
            },

        ],
        nextQuestion: '#qst5a',
        prevQuestion: '#qst4b',
    },
    {
        id: '#qst5a',
        question: 'Are you currently pregnant?',
        name: 'qst5_1',
        questionType: 'radio',
        options: [ 'Yes', 'No'],
        required: true,
        validationType: 'string',
        validations: [
            {
                type: "required",
                params: ["Please select an option"]
            },
        ],
        condition: {
            operation: 'equals',
            value: 'Female',
            compareWith: 'gender',
            section: 'personalDetails',
            action: 'show',
        },
        nextQuestion: '#qst5b',
        prevQuestion: '#qst4c',
    },
    {
        id: '#qst5b',
        question: 'If you answered yes at commencement of cover, please know that any claim arising from \n' +
            'pregnancy-related conditions or causes shall be excluded from being covered during the period of \n' +
            'pregnancy',
        name: 'qst5_2',
        questionType: 'radio',
        required: true,
        validationType: 'string',
        validations: [
            {
                type: "required",
                params: ["Please select an option"]
            },
        ],
        options: [ 'Proceed with cover', 'Defer cover until after delivery'],
        condition: {
            operation: 'equals',
            value: 'Yes',
            compareWith: 'qst5_1',
            section: 'healthInfo',
            action: 'show',
        },
        nextQuestion: '#qst6',
        prevQuestion: '#qst5a',
    },
    {
        id: '#qst6',
        question: 'Have you been treated for or counseled or intend to \n' +
            'be treated for or counseled for alcohol and drug \n' +
            'use, dependency, addiction or abuse ?',
        name: 'qst6',
        required: true,
        validationType: 'string',
        validations: [
            {
                type: "required",
                params: ["Please select an option"]
            },
        ],

        questionType: 'radio',
        options: [ 'Yes', 'No'],
        nextQuestion: '#qst7a',
        prevQuestion: '#qst5b',
    },
    {
        id: '#qst7a',
        question: "What is your height?",
        name: 'qst7_1',
        placeholder: 'Height in feet/inch/m/cm ',
        questionType: 'text',
        type: 'text',
        required: true,
        nextQuestion: '#qst7b' ,
        prevQuestion: '#qst6',
        validationType: 'string',
        validations: [
            {
                type: "required",
                params: ["The field is required"]
            },
        ]
    },
    {
        id: '#qst7b',
        question: "What is your weight?",
        placeholder: 'Weight in Kg/pound',
        name: 'qst7_2',
        questionType: 'text',
        type: 'text',
        required: true,
        nextQuestion: '#qst7c' ,
        prevQuestion: '#qst7a',
        validationType: 'string',
        validations: [
            {
                type: "required",
                params: ["The field is required"]
            },
        ]
    },
    {
        id: '#qst7c',
        question: "Is your weight static, increasing or decreasing?",
        name: 'qst7_3',
        questionType: 'radio',
        label: 'm/ft',
        options: [ 'Static', 'Increasing', 'Decreasing'],
        nextQuestion: '#qst7d' ,
        prevQuestion: '#qst7b',
        required: true,
        validationType: 'string',

        validations: [
            {
                type: "required",
                params: ["The field is required"]
            },
        ]
    },
    {
        id: '#qst7d',
        question: "Please provide more details on increase or decrease in weight",
        placeholder: 'Answer',
        name: 'qst7_4',
        questionType: 'text',
        type: 'text',
        required: true,
        multiline: true,
        rows: 4,
        nextQuestion: '#qst8' ,
        prevQuestion: '#qst7c',
        validationType: 'string',
        condition: {
            operation: '!=',
            value: 'Static',
            compareWith: 'qst7_3',
            section: 'healthInfo',
            action: 'show',
        },
        validations: [
            {
                type: "required",
                params: ["The field is required"]
            },
        ]
    },
    {
        id: '#qst8',
        question: 'If you answered ‘yes’ to any of the questions, please let us know the following: Please answer ' +
            'all the questions below',
        questionType: 'multiple-text',
        condition: {
            operation: 'contains',
            value: 'Yes',
            compareWith: [
                'qst4_1',
                'qst4_2',
                'qst4_3',
                'qst4_4',
                'qst4_5',
                'qst4_6',
                'qst4_7',
                'qst4_8',
                'qst4_9',
                'qst4_10',
                'qst5_1',
                'qst6',
            ],
            section: 'healthInfo',
            action: 'show',
        },
        children: [
            {
                id: '#qst8a',
                questionType:'text',
                placeholder: 'Nature or complaint of symptoms',
                name: 'qst8_1',
                required: true,
                validationType: 'string',
                validations: [
                    {
                        type: "required",
                        params: ["The field is required"]
                    },
                ]
            },
            {
                id: '#qst8b',
                questionType:'text',
                placeholder: 'Type of treatment or medication',
                name: 'qst8_2',
                required: true,
                validationType: 'string',
                validations: [
                    {
                        type: "required",
                        params: ["The field is required"]
                    },
                ]
            },
            {
                id: '#qst8c',
                questionType:'date',
                placeholder: 'Date of symptoms or diagnosis',
                name: 'qst8_3',
                required: true,
                validationType: 'string',
                validations: [
                    {
                        type: "required",
                        params: ["The field is required"]
                    },
                ]
            },
            {
                id: '#qst8d',
                questionType:'date',
                placeholder: 'Date of last symptoms',
                name: 'qst8_4',
                required: true,
                validationType: 'string',
                validations: [
                    {
                        type: "required",
                        params: ["The field is required"]
                    },
                ]
            },
            {
                id: '#qst8e',
                questionType:'text',
                placeholder: 'Name of attending doctor?',
                name: 'qst8_5',
                required: true,
                validationType: 'string',
                validations: [
                    {
                        type: "required",
                        params: ["The field is required"]
                    },
                ]
            },
            {
                id: '#qst8f',
                questionType:'number',
                placeholder: 'Telephone number of attending doctor?',
                name: 'qst8_6',
                required: true,
                validationType: 'string',
                validations: [
                    {
                        type: "required",
                        params: ["The field is required"]
                    },
                ]
            },

        ],
        nextQuestion: null,
        prevQuestion:'#qst7d',
    },
    // {
    //     id: '#qst9',
    //     question: 'Can you climb one flight of stairs, i.e, one storey high without' +
    //         ' help from another person?',
    //     name: 'qst9',
    //     questionType: 'radio',
    //     options: [ 'Yes', 'No'],
    //     required: true,
    //     validationType: 'string',
    //     validations: [
    //         {
    //             type: "required",
    //             params: ["Please select an option"]
    //         },
    //     ],
    //     nextQuestion: '#qst10',
    //     prevQuestion: '#qst8',
    // },
    // {
    //     id: '#qst10',
    //     question: 'Can you do daily shopping? ',
    //     name: 'qst10',
    //     questionType: 'radio',
    //     validationType: 'string',
    //     options: [ 'Yes', 'No'],
    //     required: true,
    //     validations: [
    //         {
    //             type: "required",
    //             params: ["Please select an option"]
    //         },
    //     ],
    //     nextQuestion: '#qst11',
    //     prevQuestion: '#qst9',
    // },
    // {
    //     id: '#qst11',
    //     question: 'Can you dress, bath, eat and use the toilet by  yourself? ',
    //     name: 'qst11',
    //     questionType: 'radio',
    //     options: [ 'Yes', 'No'],
    //     validationType: 'string',
    //     required: true,
    //     validations: [
    //         {
    //             type: "required",
    //             params: ["Please select an option"]
    //         },
    //     ],
    //     nextQuestion: null,
    //     prevQuestion: '#qst10',
    // },
];
export const beneficiaryQuestions = [
    {
        id: '#name',
        question: '',
        questionType: 'multiple-text',
        children: [
            {
                id: 'title',
                title: 'Beneficiary Information',
                description: 'Please add all the fields required',
                separator: 'divider',
                // hidden: true,
            },
            {
                id: 'surname',
                questionType:'text',
                placeholder: 'Surname',
                name: 'surname',
                required: true,
                validationType: 'string',
                validations: [
                    {
                        type: "required",
                        params: ["Enter your surname"]
                    },
                ]
            },
            {
                id: 'otherNames',
                questionType:'text',
                placeholder: 'Other Names',
                name: 'otherNames',
                required: true,
                validationType: 'string',
                validations: [
                    {
                        type: "required",
                        params: ["Enter other names"]
                    },
                ]
            },
            {
                id: '#contact-email',
                questionType:'email',
                placeholder: 'Email Address',
                name: 'email',
                required: false,
                validationType: 'string',
                validations: [
                    {
                        type: "email",
                        params: ["Email is invalid"]
                    },
                ]
            },
            {
                id: '#contact-phone',
                questionType:'number',
                placeholder: 'Phone Number',
                name: 'phoneNumber',
                required: false,
                validationType: 'string',
                validations: [
                    {
                        type: "min",
                        params: [7, "Should contain at least 7 characters"]
                    },
                    {
                        type: "max",
                        params: [16, "Should not exceed 16 characters"]
                    },
                ]
            },
            {
                id: '#gender',
                questionType:'radio',
                placeholder: 'Gender',
                fullWidth: true,
                name: 'gender',
                required: true,
                options: ['Male', 'Female', 'Other'],
                validationType: 'string',
                validations: [
                    {
                        type: "required",
                        params: ["Gender is required"]
                    },
                ],
            },
            {
                id: '#dob',
                questionType:'date',
                placeholder: 'Date of Birth',
                name: 'date_of_birth',
                required: true,
                disableFuture: true,
                validationType: 'string',
                validations: [
                    {
                        type: "required",
                        params: ["Date of birth is required"]
                    },

                ],
            },
            {
                id: '#relationship',
                questionType:'dropdown',
                placeholder: 'Relationship',
                name: 'relationship',
                options: ['Spouse','Parent', 'Child','Other'],
                required: true,
                validationType: 'string',
                validations: [
                    {
                        type: "required",
                        params: ["Please select relationship"]
                    },
                ],
            },
            {
                id: '#percentage',
                questionType:'number',
                placeholder: 'Percentage',
                name: 'percentage',
                required: true,
                validationType: 'number',
                validations: [
                    {
                        type: "required",
                        params: ["Percentage is required"]
                    },
                    {
                        type: "max",
                        params: [100, "Percentage should not exceed 100"]
                    },

                ],
            },
            {
                id: '#idNumber',
                placeholder: 'Identification Number',
                //required: true,
                name: 'idNumber',
                questionType: 'dropdown-text',
                options: [ 'National ID', 'Passport ID', 'Alien ID'],
                dropdownName: 'idType',
                validationType: 'string',
                validations: [
                    {
                        type: "min",
                        params: [4,"At least 4 characters"]
                    },
                ]
            },
        ],
        nextQuestion: '#guardian',
        prevQuestion: null,
    },
];
export const occupationDetails = [
    {
        id: '#occ1',
        question: 'Has any proposal for life insurance cover on your life ever been ' +
            'made, or is now being made (excluding this application)?',
        name: 'occ1',
        questionType: 'radio',
        required: true,
        validationType: 'string',
        validations: [
            {
                type: "required",
                params: ["Please select an option"]
            },
        ],
        options: [ 'Yes', 'No'],
        nextQuestion: '#occ2',
        prevQuestion: null,
    },
    {
        id: '#occ2',
        question: ' Please provide more info about the cover',
        questionType: 'multiple-text',
        children: [
            {
                id: '#occ2a',
                questionType:'text',
                placeholder: 'Name of Issuer',
                name: 'issuerName',
                required: true,
                validationType: 'string',
                validations: [
                    {
                        type: "required",
                        params: ["Field is required"]
                    },
                ]
            },
            {
                id: '#occ2b',
                questionType:'text',
                placeholder: 'Year of Proposal',
                name: 'proposalYear',
                type: 'date',
                required: true,
                validationType: 'string',
                validations: [
                    {
                        type: "required",
                        params: ["Field is required"]
                    },
                ]
            },
            {
                id: '#occ2c',
                questionType:'text',
                placeholder: 'Sum Assured',
                name: 'occSumAssured',
                type: 'number',
                required: true,
                validationType: 'string',
                validations: [
                    {
                        type: "required",
                        params: ["Field is required"]
                    },
                ]
            },
            {
                id: '#occ2c',
                questionType:'text',
                placeholder: 'Type of Insurance',
                name: 'typeOfInsurance',
                required: true,
                validationType: 'string',
                validations: [
                    {
                        type: "required",
                        params: ["Field is required"]
                    },
                ]
            },
            {
                id: '#occ2c',
                questionType:'text',
                placeholder: 'Policy Status',
                name: 'policyStatus',
                required: true,
                fullWidth: true,
                validationType: 'string',
                validations: [
                    {
                        type: "required",
                        params: ["Field is required"]
                    },
                ]
            },
        ],
        nextQuestion: '#occ3',
        prevQuestion: '#occ1',
        condition: {
            operation: 'equals',
            value: 'Yes',
            compareWith: 'occ1',
            action: 'show',
            section: 'occupationDetails',
        }
    },
    {
        id: '#occ3',
        question: 'Do you have any intentions of: (if yes select appropriately or \n' +
            'click next if your answer is no for all)',
        questionType: 'multiple-checks',
        children: [
            {
                id: '#occ3_1',
                questionType:'checkbox',
                placeholder: 'Changing the nature of your occupation ',
                name: 'occ3_1',
            },
            {
                id: '#occ3_2',
                questionType:'checkbox',
                placeholder: 'Engaging in hazardous occupation ?(e.g Working with machinery \n' +
                    'or electricity)\n',
                name: 'occ3_2',
            },
            {
                id: '#occ3_4',
                questionType:'text',
                placeholder: 'Engaging in naval, military or air services?',
                name: 'occ3_4',
            },
            {
                id: '#occ3_5',
                questionType:'text',
                placeholder: 'Flying other than as a fare passenger by a recognized airline or \n' +
                    'schedule routes\n',
                name: 'occ3_5',
            },
        ],
        nextQuestion: null,
        prevQuestion: '#occ2',
    },
]
