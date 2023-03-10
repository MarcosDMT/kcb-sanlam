import * as Yup from "yup";
import { useFormik } from "formik";
import Grid from "@mui/material/Grid";
import DMTTextInput from "../../../@dmt-components/form/text-input";
import LoadingButton from "@mui/lab/LoadingButton";
import MKBox from "../../../@mui-components/box";
import MKTypography from "../../../@mui-components/typography";
import { alpha, Table, TableBody, TableContainer } from "@mui/material";
import {
  StyledTableCell,
  StyledTableRow,
} from "../../../@dmt-components/tables";
import DMTNormalRadioButtons from "../../../@dmt-components/form/radio-button";
import DMTDatePicker, {
  calculateAge,
} from "../../../@dmt-components/form/datepicker";
import PaymentDeclarationSection from "./declaration-section";
import { paymentFrequencies } from "../../../../api-requests/data/payment-section-data";
import DMTFileInput from "../../../@dmt-components/form/file-input";
import DMTBankBranches from "../../../@dmt-components/form/bank-branches-select";
import toast from "react-hot-toast";
import { Save } from "@mui/icons-material";
import { useEffect } from "react";
import DMTPaymentTerms from "../../../@dmt-components/form/payment-terms-select";
import { utilsApi } from "../../../../api-requests/utils-api";
import MKButton from "../../../@mui-components/button";

const ALLOWED_DOCUMENTS = {
  error: "File format is unsupported.",
  formats: [".pdf", ".png", ".jpg", ".jpeg", ".xls", ".xlsx"],
  accept: ".pdf, .png, .jpg, .jpeg, .xls, .xlsx",
};

const checkIfValid = (file) => {
  if (file) {
    return ALLOWED_DOCUMENTS.formats.includes(file.extension);
  }
  return true;
};

const PaymentForm = (props) => {
  const {
    handleOnStepChange,
    responsesDetails,
    onSave,
    minPremium,
    maxPremium,
    productId,
  } = props;
  const initialValues = {
    sumAssured: responsesDetails.paymentInfo?.sumAssured ?? "",
    coverPremium: responsesDetails.paymentInfo?.coverPremium ?? "",
    policyFee: responsesDetails.paymentInfo?.policyFee ?? "",
    term: responsesDetails.paymentInfo?.term ?? "",
    termId: responsesDetails.paymentInfo?.term ?? "",
    compensationLevy: responsesDetails.paymentInfo?.compensationLevy ?? "",
    totalPremiumPayable:
      responsesDetails.paymentInfo?.totalPremiumPayable ?? "",
    branchName: responsesDetails.paymentInfo?.branchName ?? "",
    accountType: responsesDetails.paymentInfo?.accountType ?? "Current",
    accountName: responsesDetails.paymentInfo?.accountName ?? "",
    accountNumber: responsesDetails.paymentInfo?.accountNumber ?? "",
    amountDeducted: responsesDetails.paymentInfo?.amountDeducted ?? "",
    deductionDate: responsesDetails.paymentInfo?.deductionDate ?? "",
    frequency: responsesDetails.paymentInfo?.frequency ?? "",
    document1: responsesDetails.paymentInfo?.document1 ?? null,
    document2: responsesDetails.paymentInfo?.document2 ?? null,
    document3: responsesDetails.paymentInfo?.document3 ?? null,
    document4: responsesDetails.paymentInfo?.document4 ?? null,
    document5: responsesDetails.paymentInfo?.document5 ?? null,
  };
  const validationSchema = Yup.object({
    totalPremiumPayable: Yup.number()
      .required("Premium Amount is required")
      .min(0, "Amount should be more than equal to 0"),
    coverPremium: Yup.number()
      .required("Cover Premium is required")
      .min(0, "Amount should be more than equal to 0"),
    policyFee: Yup.number()
      .required("Policy Fee is required")
      .min(0, "Amount should be more than equal to 0"),
    term: Yup.number()
      .required("Term is required")
      .min(0, "Term should be more than equal to 0"),
    termId: Yup.number(),
    compensationLevy: Yup.number()
      .required("Policy Compensation Levy is required")
      .min(0, "Amount should be more than equal to 0"),
    sumAssured: Yup.number()
      .required("Sum Assured is required")
      .min(minPremium, `Sum Assurred must be greater or equal to ${minPremium}`)
      .max(
        maxPremium ?? 1000000000000,
        `Sum Assured must not exceed ${maxPremium ?? 1000000000000}`
      ),
    branchName: Yup.string().required("Branch Name is required"),
    accountType: Yup.string().required("Account type is required"),
    accountName: Yup.string().required("Account Name is required"),
    accountNumber: Yup.string()
      .required("Account Number is required")
    //   .min(13, "Account Number should be 13 characters")
      .max(13, "Account Number should be 13 characters"),
    amountDeducted: Yup.string().required("Amount  is required"),
    frequency: Yup.string().required("Frequency is required"),
    deductionDate: Yup.string().required("Deduction Date is required"),
    document1: Yup.object()
      .required("Upload a document")
      .nullable()
      .test("type", ALLOWED_DOCUMENTS.error, checkIfValid),
    document2: Yup.object()
      .nullable()
      .test("type", ALLOWED_DOCUMENTS.error, checkIfValid),
    document3: Yup.object()
      .nullable()
      .test("type", ALLOWED_DOCUMENTS.error, checkIfValid),
    document4: Yup.object()
      .nullable()
      .test("type", ALLOWED_DOCUMENTS.error, checkIfValid),
    document5: Yup.object()
      .nullable()
      .test("type", ALLOWED_DOCUMENTS.error, checkIfValid),
  });
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values, helpers) => {
      const data = { ...responsesDetails, paymentInfo: { ...values } };
      try {
        await onSave(data);
        handleOnStepChange();
      } catch (e) {
        toast.error(e.message);
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: e.message });
        helpers.setSubmitting(false);
      }
    },
  });
  const handleOnChange = (name, value) => {
    formik.setFieldValue(name, value);
  };
  useEffect(() => {
    formik.setFieldValue("amountDeducted", formik.values.totalPremiumPayable);
  }, [formik.values.totalPremiumPayable]);

  const computeRates = async () => {
    if (
      formik.values.sumAssured !== "" &&
      formik.values.frequency !== "" &&
      formik.values.termId !== ""
    ) {
      const dob = responsesDetails.personalDetails?.dob ?? 18;
      const age = calculateAge(dob);
      const values = {
        productId: productId,
        sumAssured: formik.values.sumAssured,
        age: age,
        termId: formik.values.termId,
        frequency: formik.values.frequency,
      };
      try {
        const res = await utilsApi.fetchComputeRates(values);
        if (res?.success) {
          formik.setFieldValue("coverPremium", res.coverPremium);
          formik.setFieldValue("compensationLevy", res.compensationLevy);
          formik.setFieldValue("totalPremiumPayable", res.totalPremium);
          formik.setFieldValue("policyFee", res.policyFee);
        }
        // console.log(res);
      } catch (e) {
        console.log(e);
      }
    } else {
      formik.setFieldValue("coverPremium", formik.initialValues.coverPremium);
      formik.setFieldValue(
        "compensationLevy",
        formik.initialValues.compensationLevy
      );
      formik.setFieldValue(
        "totalPremiumPayable",
        formik.initialValues.totalPremiumPayable
      );
      formik.setFieldValue("policyFee", formik.initialValues.policyFee);
    }
  };

  useEffect(() => {
    computeRates();
  }, [formik.values.frequency, formik.values.termId]);

  return (
    <>
      <form
        onSubmit={formik.handleSubmit}
        encType="multipart/form-data"
        autoComplete="off"
      >
        <Grid spacing={2} container alignItems={"center"} sx={{ mt: 1 }}>
          <Grid item sm={12} xs={12} md={5}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={12} sm={12}>
                <MKTypography color={"secondary"} variant={"h4"}>
                  Premium Details
                </MKTypography>
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <DMTTextInput
                  label={"Sum Assured"}
                  fullWidth
                  type={"number"}
                  onChange={formik.handleChange}
                  value={formik.values.sumAssured}
                  error={Boolean(
                    formik?.touched.sumAssured && formik?.errors.sumAssured
                  )}
                  helperText={
                    formik?.touched.sumAssured && formik?.errors.sumAssured
                  }
                  onBlur={(e) => {
                    formik.handleBlur(e);
                    computeRates();
                  }}
                  placeholder={"Sum assured"}
                  name={"sumAssured"}
                  required={true}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <DMTPaymentTerms
                  {...{
                    label: "Term (Years)",
                    onChange: (value) => {
                      if (value) {
                        handleOnChange("term", value.term);
                        handleOnChange("termId", value.id);
                      } else {
                        handleOnChange("term", "");
                        handleOnChange("termId", "");
                      }
                    },
                    value: formik.values.term,
                    productId: productId,
                    error: Boolean(formik?.touched.term && formik?.errors.term),
                    helperText: formik?.touched.term && formik?.errors.term,
                    onBlur: formik.handleBlur,
                    required: true,
                  }}
                />
                {/*<DMTTextInput*/}
                {/*    label={'Term (Years)'}*/}
                {/*    fullWidth*/}
                {/*    type={'number'}*/}
                {/*    onChange={formik.handleChange}*/}
                {/*    value={formik.values.term}*/}
                {/*    error={Boolean(formik?.touched.term && formik?.errors.term)}*/}
                {/*    helperText={formik?.touched.term && formik?.errors.term}*/}
                {/*    onBlur={formik.handleBlur}*/}
                {/*    placeholder={'Term in years'}*/}
                {/*    name={'term'}*/}
                {/*    required={true}*/}
                {/*/>*/}
              </Grid>
              <Grid item md={12} sm={12} xs={12}>
                <DMTNormalRadioButtons
                  {...{
                    name: "frequency",
                    options: paymentFrequencies,
                    label: "Frequency",
                    value: formik.values.frequency,
                    error: Boolean(
                      formik?.touched.frequency && formik?.errors.frequency
                    ),
                    helperText:
                      formik?.touched.frequency && formik?.errors.frequency,
                    onChange: (value) => handleOnChange("frequency", value),
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <DMTTextInput
                  label={"Cover Premium"}
                  fullWidth
                  type={"number"}
                  onChange={formik.handleChange}
                  value={formik.values.coverPremium}
                  error={Boolean(
                    formik?.touched.coverPremium && formik?.errors.coverPremium
                  )}
                  helperText={
                    formik?.touched.coverPremium && formik?.errors.coverPremium
                  }
                  onBlur={formik.handleBlur}
                  placeholder={"Cover Premium"}
                  name={"coverPremium"}
                  required={true}
                  disabled={true}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <DMTTextInput
                  label={"Policy Fee"}
                  fullWidth
                  type={"number"}
                  onChange={formik.handleChange}
                  value={formik.values.policyFee}
                  error={Boolean(
                    formik?.touched.policyFee && formik?.errors.policyFee
                  )}
                  helperText={
                    formik?.touched.policyFee && formik?.errors.policyFee
                  }
                  onBlur={formik.handleBlur}
                  placeholder={"Enter the policy fee"}
                  name={"policyFee"}
                  required={true}
                  disabled={true}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <DMTTextInput
                  label={"Compensation Levy"}
                  fullWidth
                  type={"number"}
                  onChange={formik.handleChange}
                  value={formik.values.compensationLevy}
                  error={Boolean(
                    formik?.touched.compensationLevy &&
                      formik?.errors.compensationLevy
                  )}
                  helperText={
                    formik?.touched.compensationLevy &&
                    formik?.errors.compensationLevy
                  }
                  onBlur={formik.handleBlur}
                  placeholder={"Policyholder's compensation levy"}
                  name={"compensationLevy"}
                  required={true}
                  disabled={true}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <DMTTextInput
                  label={"Total Premium"}
                  fullWidth
                  type={"number"}
                  onChange={formik.handleChange}
                  value={formik.values.totalPremiumPayable}
                  error={Boolean(
                    formik?.touched.totalPremiumPayable &&
                      formik?.errors.totalPremiumPayable
                  )}
                  helperText={
                    formik?.touched.totalPremiumPayable &&
                    formik?.errors.totalPremiumPayable
                  }
                  onBlur={formik.handleBlur}
                  placeholder={"Total Premium Payable"}
                  name={"totalPremiumPayable"}
                  required={true}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item md={12} sm={12} xs={12}>
                <MKTypography
                  gutterBottom
                  color={"secondary"}
                  variant={"h4"}
                  sx={{ mt: 4 }}
                >
                  {"Deduction Details"}
                </MKTypography>
              </Grid>
              <Grid item md={6} sm={12} xs={12}>
                <DMTTextInput
                  label={"Amount to be debited"}
                  fullWidth
                  type={"number"}
                  onChange={formik.handleChange}
                  value={formik.values.amountDeducted}
                  error={Boolean(
                    formik?.touched.amountDeducted &&
                      formik?.errors.amountDeducted
                  )}
                  helperText={
                    formik?.touched.amountDeducted &&
                    formik?.errors.amountDeducted
                  }
                  onBlur={formik.handleBlur}
                  placeholder={"Enter amount"}
                  name={"amountDeducted"}
                  required={true}
                />
              </Grid>
              <Grid item md={6} sm={12} xs={12}>
                <DMTDatePicker
                  label={"Deduction Date"}
                  fullWidth
                  value={formik.values.deductionDate}
                  required={true}
                  onChange={(value) => handleOnChange("deductionDate", value)}
                  // disableFuture={true}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item sm={12} xs={12} md={7}>
            <MKBox mt={{ md: 5 }}>
              <TableContainer>
                <Table
                  sx={{
                    backgroundColor: (theme) =>
                      alpha(theme.palette.light.main, 0.3),
                  }}
                >
                  <TableBody>
                    <StyledTableRow>
                      <StyledTableCell>
                        <MKTypography color={"secondary"} variant={"h6"}>
                          {`Originator`}
                        </MKTypography>
                      </StyledTableCell>
                      <StyledTableCell>
                        <MKTypography color={"secondary"} variant={"h6"}>
                          {`Payer’s Bank Details`}
                        </MKTypography>
                      </StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                      <StyledTableCell>
                        Name: <b>{"Sanlam Life"}</b>{" "}
                      </StyledTableCell>
                      <StyledTableCell>
                        <DMTBankBranches
                          {...{
                            label: "Branch Name",
                            onChange: (value) =>
                              handleOnChange("branchName", value),
                            value: formik.values.branchName,
                            error: Boolean(
                              formik?.touched.branchName &&
                                formik?.errors.branchName
                            ),
                            helperText:
                              formik?.touched.branchName &&
                              formik?.errors.branchName,
                            onBlur: formik.handleBlur,
                            required: true,
                          }}
                        />
                        {/*<DMTTextInput*/}
                        {/*    label={'Branch Name'}*/}
                        {/*    fullWidth*/}
                        {/*    type={'text'}*/}
                        {/*    onChange={formik.handleChange}*/}
                        {/*    value={formik.values.branchName}*/}
                        {/*    error={Boolean(formik?.touched.branchName && formik?.errors.branchName)}*/}
                        {/*    helperText={formik?.touched.branchName && formik?.errors.branchName}*/}
                        {/*    onBlur={formik.handleBlur}*/}
                        {/*    placeholder={'Enter the Branch Name'}*/}
                        {/*    name={'branchName'}*/}
                        {/*    required={true}*/}
                        {/*/>*/}
                      </StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                      <StyledTableCell>
                        Policy Number: <b>{"SC"}</b>{" "}
                      </StyledTableCell>
                      <StyledTableCell rowSpan={3}>
                        <DMTNormalRadioButtons
                          {...{
                            name: "accountType",
                            options: ["Current"],
                            label: "Account Type",
                            value: formik.values.accountType,
                            error: Boolean(
                              formik?.touched.accountType &&
                                formik?.errors.accountType
                            ),
                            helperText:
                              formik?.touched.accountType &&
                              formik?.errors.accountType,
                            onChange: (value) =>
                              handleOnChange("accountType", value),
                          }}
                        />
                      </StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                      <StyledTableCell>
                        Bank Name: <b>{"Kenya Commercial Bank"}</b>
                      </StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                      <StyledTableCell>
                        Bank Branch: <b>{"Kencom Branch"}</b>
                      </StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                      <StyledTableCell>
                        Branch Number: <b>{"02-078"}</b>
                      </StyledTableCell>
                      <StyledTableCell>
                        <DMTTextInput
                          label={"Account Name"}
                          fullWidth
                          type={"text"}
                          onChange={formik.handleChange}
                          value={formik.values.accountName}
                          error={Boolean(
                            formik?.touched.accountName &&
                              formik?.errors.accountName
                          )}
                          helperText={
                            formik?.touched.accountName &&
                            formik?.errors.accountName
                          }
                          onBlur={formik.handleBlur}
                          placeholder={"Enter the account name"}
                          name={"accountName"}
                          required={true}
                        />
                      </StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                      <StyledTableCell>
                        Credit Account: <b>{"0104021198709"}</b>
                      </StyledTableCell>
                      <StyledTableCell>
                        <DMTTextInput
                          label={"Account Number"}
                          fullWidth
                          type={"text"}
                          onChange={formik.handleChange}
                          value={formik.values.accountNumber}
                          error={Boolean(
                            formik?.touched.accountNumber &&
                              formik?.errors.accountNumber
                          )}
                          helperText={
                            formik?.touched.accountNumber &&
                            formik?.errors.accountNumber
                          }
                          onBlur={formik.handleBlur}
                          placeholder={"Enter the account number"}
                          name={"accountNumber"}
                          required={true}
                        />
                      </StyledTableCell>
                    </StyledTableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </MKBox>
          </Grid>
          <Grid item sm={12} xs={12} md={12}>
            <MKBox mt={4}>
              <MKTypography color={"secondary"} variant={"h4"} gutterBottom>
                {"File Attachments"}
              </MKTypography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={6}>
                  <DMTFileInput
                    label={"Policy holder National ID/Passport"}
                    fullWidth
                    onChange={(value) => handleOnChange("document1", value)}
                    value={formik.values?.document1?.name}
                    error={Boolean(
                      formik?.touched.document1 && formik?.errors.document1
                    )}
                    helperText={
                      formik?.touched.document1 && formik?.errors.document1
                    }
                    onBlur={formik.handleBlur}
                    placeholder={"Choose Document"}
                    name={"document1"}
                    required={true}
                    inputProps={{
                      accept: ALLOWED_DOCUMENTS.accept,
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <DMTFileInput
                    label={"MID"}
                    fullWidth
                    onChange={(value) => handleOnChange("document2", value)}
                    value={formik.values?.document2?.name}
                    error={Boolean(
                      formik?.touched.document2 && formik?.errors.document2
                    )}
                    helperText={
                      formik?.touched.document2 && formik?.errors.document2
                    }
                    onBlur={formik.handleBlur}
                    placeholder={"Choose Document"}
                    name={"document2"}
                    inputProps={{
                      accept: ALLOWED_DOCUMENTS.accept,
                    }}
                    // required={true}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <DMTFileInput
                    label={"IFNA"}
                    fullWidth
                    onChange={(value) => handleOnChange("document3", value)}
                    value={formik.values?.document3?.name}
                    error={Boolean(
                      formik?.touched.document3 && formik?.errors.document3
                    )}
                    helperText={
                      formik?.touched.document3 && formik?.errors.document3
                    }
                    onBlur={formik.handleBlur}
                    placeholder={"Choose Document"}
                    name={"document3"}
                    inputProps={{
                      accept: ALLOWED_DOCUMENTS.accept,
                    }}
                    // required={true}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <DMTFileInput
                    label={"Bronchure"}
                    fullWidth
                    onChange={(value) => handleOnChange("document4", value)}
                    value={formik.values.document4?.name}
                    error={Boolean(
                      formik?.touched.document4 && formik?.errors.document4
                    )}
                    helperText={
                      formik?.touched.document4 && formik?.errors.document4
                    }
                    onBlur={formik.handleBlur}
                    placeholder={"Choose Document"}
                    name={"document4"}
                    inputProps={{
                      accept: ALLOWED_DOCUMENTS.accept,
                    }}
                    // required={true}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <DMTFileInput
                    label={"Other documents "}
                    fullWidth
                    onChange={(value) => handleOnChange("document5", value)}
                    value={formik.values?.document5?.name}
                    error={Boolean(
                      formik?.touched.document5 && formik?.errors.document5
                    )}
                    helperText={
                      formik?.touched.document5 && formik?.errors.document5
                    }
                    onBlur={formik.handleBlur}
                    placeholder={"Choose Document"}
                    name={"document5"}
                    inputProps={{
                      accept: ALLOWED_DOCUMENTS.accept,
                    }}
                    // required={true}
                  />
                </Grid>
              </Grid>
            </MKBox>
          </Grid>
          <Grid item sm={12} xs={12} md={12}>
            <MKBox mt={4}>
              <MKTypography color={"secondary"} variant={"h4"}>
                {"Declaration"}
              </MKTypography>
              <PaymentDeclarationSection />
            </MKBox>
          </Grid>
        </Grid>
        <MKBox
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            mt: 5,
          }}
        >
          <MKButton
            // loading={formik.isSubmitting}
            // loadingPosition="start"
            // startIcon={<Save />}
            variant="contained"
            color={"secondary"}
            type={"submit"}
          >
            Agree and Proceed
          </MKButton>
        </MKBox>
      </form>
    </>
  );
};

export default PaymentForm;
