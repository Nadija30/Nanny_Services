import css from './Select.module.css';

import Select from 'react-select';
const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];
export const CustomSelect = () => (
  <Select className={css.option} options={options} />
);
