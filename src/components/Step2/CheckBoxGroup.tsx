import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { setStatusCheckBox } from '../../store/checkBoxesSlice';
import './stepTwo.scss';

const CheckBoxGroup = () => {
  const dispatch = useAppDispatch();
  const { checkBoxes } = useAppSelector((state) => state.checkBoxesSlice);
  const checkBoxNumbers = [1, 2, 3];

  const createCheckBoxes = () => (checkBoxNumbers.map((num) => (
    <label key={num} className="checkbox-label">
      <input
        type="checkbox"
        name={`checkbox${num}`}
        checked={checkBoxes[num]}
        onChange={(event) => dispatch(setStatusCheckBox({ num, checked: event.target.checked }))}
        id={`field-checkbox-group-option-${num}`}
        className="checkbox-input"
      />
      {num}
    </label>
  )));

  return (
    <div className="checkBoxGroup">
      <span>Checkbox group</span>
      {createCheckBoxes()}
    </div>
  );
};

export default CheckBoxGroup;
