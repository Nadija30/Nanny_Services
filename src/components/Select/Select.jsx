import css from './Select.module.css';
// import { useField } from "formik";

// export const CustomSelect = ({label, ...props})=>{
//     const [field, meta] = useField(props);
//     return (
//         <>
//         <label>{label}</label>
//         <ul {...field}{...props}></ul>
//         </>
//     )
// }
import Select from 'react-select';
const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];
export const CustomSelect = () => (
  <Select className={css.option} options={options} />
);
