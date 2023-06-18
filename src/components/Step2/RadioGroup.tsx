import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { setStatusCheckBox } from '../../store/checkBoxesSlice';
import './stepTwo.scss';
import { setRadioValue } from '../../store/radioInputsSlice';

const RadioGroup = () => {
  const dispatch = useAppDispatch();
  const { selectedRadioValue } = useAppSelector((state) => state.radioInputsSlice);
  const radioInputs = [1, 2, 3];

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setRadioValue(Number(event.target.value)));
  };

  const createRadioInputs = () => (radioInputs.map((num) => (
    <label key={num} className="checkbox-label">
      <input
        type="radio"
        name={`radio-${num}`}
        value={num}
        checked={selectedRadioValue === num}
        onChange={handleOptionChange}
        id={`field-radio-group-option-${num}`}
        className="checkbox-input"
      />
      {num}
    </label>
  )));

  return (
    <div className="checkBoxGroup checkBoxGroup_last">
      <span>Radio group</span>
      {createRadioInputs()}
    </div>
  );
};

export default RadioGroup;
