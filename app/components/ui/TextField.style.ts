// import { colors, componentColors, decide, fontFamily } from "@/src/config";
// import styled from "@emotion/styled";
// import { FormikErrors } from "formik";

// const { light } = componentColors.input;

// export type FormFieldLabelType = {
//   color?: string;
//   error?: string | FormikErrors<any> | string[] | FormikErrors<any>[] | boolean;
// };

// export const TextFieldDiv = styled("div")`
//   display: flex;
//   overflow: hidden;
//   height: 46px;
//   align-items: center;
//   margin-top: 0.5rem;
//   position: relative;
// `;

// export const TextAreaDiv = styled("div")`
//   /* display: flex;
// 	overflow: hidden;
// 	height: 46px;
// 	align-items: center; */
// `;
// export const TextFieldPrefix = styled("div")<{ theme: "light" | "dark" }>`
//   position: absolute;
//   left: 12px;
//   top: 0;
//   font-size: 15px;
//   height: 100%;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   font-size: 15px;
//   border: none;
//   padding: none;
//   background: none;
//   img,
//   svg {
//     height: 16px;
//     width: 16px;
//   }
// `;

// type TextFieldIconPropsType = {
//   suffix?: boolean;
//   type?: boolean;
//   hideNumberChange?: boolean;
//   password?: boolean;
//   disabled?: boolean;
// };

// export const TextFieldSuffix = styled("button")<TextFieldIconPropsType>`
//   position: absolute;
//   right: 0%;
//   cursor: ${({ disabled }) => decide(!!disabled, "auto", "pointer")};
//   height: 100%;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   font-size: 15px;
//   border: none;
//   padding: none;
//   background: none;
//   width: 10%;

//   img,
//   svg {
//     height: 16px;
//     width: 16px;
//   }
// `;

// type TextFieldPropsType = {
//   prefix?: string | number | JSX.Element;
//   suffix?: string | number | JSX.Element;
//   icon?: boolean;
//   theme: string;
//   errorPresent?: boolean;
// };

// export const TextFieldInput = styled("input")<TextFieldPropsType>`
//   display: flex;
//   width: 100%;
//   height: 100%;
//   border-radius: 8px;
//   background-color: ${({ theme }) =>
//     theme === "light" ? "transparent" : colors.primary200};
//   padding: ${({ prefix, suffix, icon }) =>
//     prefix && suffix && icon
//       ? "8px 50px 8px 36px"
//       : prefix && suffix
//         ? "8px 36px"
//         : suffix && icon
//           ? "8px 50px 8px 10px"
//           : prefix
//             ? "8px 12px 8px 36px"
//             : suffix || icon
//               ? "8px 36px 8px 10px"
//               : "12px"};
//   transition: all 0.3s ease;

//   &:active:not(:disabled),
//   :focus:not(:disabled) {
//     background: rgba(196, 196, 196, 0.12);
//     box-shadow: ${colors.textFieldShadow};
//     outline: none;
//   }

//   &:disabled {
//     background: rgba(150, 150, 150, 0.1);
//   }

//   border: 1px solid
//     ${({ errorPresent }) => (errorPresent ? colors.red : colors.grayIII)};

//   ::-webkit-inner-spin-button {
//     -webkit-appearance: none;
//   }
//   font-size: 14px;
//   font-family: "IBM Plex Sans";
//   color: ${({ theme }) => (theme === "light" ? "" : colors.primary800)};
//   ::placeholder {
//     font-family: "IBM Plex Sans";
//     color: ${colors.text600};
//     font-weight: 300;
//     font-size: 14px;
//     line-height: 20px;
//     font-feature-settings:
//       "salt" on,
//       "liga" off;
//     text-overflow: ellipsis;
//     white-space: nowrap;
//   }
// `;

// export const TextFieldIcon = styled("button")<TextFieldIconPropsType>`
//   position: absolute;
//   right: ${({ suffix, type, hideNumberChange }) =>
//     suffix && type && !hideNumberChange ? "58px" : suffix ? "38px" : "12px"};
//   top: 50%;
//   width: 15px;
//   height: 25px;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   cursor: pointer;
// `;

// export const IncrementBtn = styled("button")<{ theme: string }>`
//   position: absolute;
//   /* top: 1.5rem; */
//   right: 0px;
//   height: 21px;
//   border-radius: 0px 11px 0px 0px;
//   border-left: 0.1px solid
//     ${(props) =>
//       props.theme === "dark" ? colors.primary200 : colors.lightGrey};
//   border-bottom: 0.1px solid
//     ${(props) =>
//       props.theme === "dark" ? colors.primary200 : colors.lightGrey};
//   border-right: none;
//   border-top: none;
//   color: ${({ theme }) => (theme === "light" ? "#b8b8b8" : "#676767")};
//   background: ${({ theme }) =>
//     theme === "dark"
//       ? "rgba(196, 196, 196, 0.1)"
//       : "rgba(196, 196, 196, 0.15)"};
//   width: 3%;
// `;
// export const DecrementBtn = styled("button")<{ theme: string }>`
//   position: absolute;
//   bottom: 0px;
//   right: 0px;
//   height: 22px;
//   border-radius: 0px 0px 10px 0px;
//   border-left: 0.1px solid
//     ${(props) =>
//       props.theme === "dark" ? colors.primary200 : colors.lightGrey};
//   border-bottom: none;
//   border-right: none;
//   border-top: none;
//   color: ${({ theme }) => (theme === "light" ? "#b8b8b8" : "#676767")};
//   background: ${({ theme }) =>
//     theme === "dark"
//       ? "rgba(196, 196, 196, 0.1)"
//       : "rgba(196, 196, 196, 0.15)"};
//   width: 3%;
// `;

// export const TextArea = styled("textarea")<TextFieldPropsType>`
//   display: flex;
//   width: 100%;
//   height: 100%;
//   border-radius: 8px;
//   background-color: ${({ theme }) =>
//     theme === "light" ? "transparent" : colors.primary200};
//   padding: ${({ prefix, suffix, icon }) =>
//     prefix && suffix && icon
//       ? "8px 50px 8px 36px"
//       : prefix && suffix
//         ? "8px 36px"
//         : suffix && icon
//           ? "8px 50px 8px 10px"
//           : prefix
//             ? "8px 12px 8px 36px"
//             : suffix || icon
//               ? "8px 36px 8px 10px"
//               : "12px"};
//   transition: all 0.3s ease;

//   &:active:not(:disabled),
//   :focus:not(:disabled) {
//     background: rgba(196, 196, 196, 0.12);
//     box-shadow: ${colors.textFieldShadow};
//     outline: none;
//   }

//   &:disabled {
//     background: rgba(150, 150, 150, 0.1);
//   }

//   border: 1px solid
//     ${({ errorPresent }) => (errorPresent ? colors.red : colors.inputGray)};

//   /* margin: 8px 0px; */
//   ::-webkit-inner-spin-button {
//     -webkit-appearance: none;
//   }
//   font-size: 14px;
//   font-family: "IBM Plex Sans";
//   color: ${({ theme }) => (theme === "light" ? "" : colors.primary800)};
// `;
// export const FormFieldLabel = styled("label")<FormFieldLabelType>`
//   color: ${({ error }) => (error ? colors.red : colors.text600)};
//   font-size: 16px;
//   font-family: ${fontFamily.ibmPlexSans};
//   font-weight: 500;
//   line-height: 20px;
//   letter-spacing: 0.16px;
//   .mandatory-asterisk {
//     color: ${colors.errorRed};
//   }
// `;
// export const FormField = styled("div")<{ error?: string }>`
//   position: relative;

//   .grospp-select {
//     min-width: 396px;
//   }
//   .rmdp-container {
//     .rmdp-input {
//       width: 100%;
//       gap: 1rem;
//       border-radius: 8px;
//       height: 42px;
//       border: 1px solid ${({ error }) => (error ? colors.red : colors.grey60)};
//     }
//   }
// `;

// export const SelectField = styled(FormField)`
//   display: flex;
//   flex-direction: column;
//   gap: 4px;
// `;
