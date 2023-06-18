import { useNavigate } from 'react-router-dom';
import './stepTwo.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { addFinishedStep, setActiveStep } from '../../store/progressBarSlice';
import { addNewAdvantage, deleteAdvantage, setAdvantageValueById } from '../../store/advantagesSlice';
import removeIcon from '../../assets/icon/remove-input.svg';
import plusIcon from '../../assets/icon/plus.svg';
import CheckBoxGroup from './CheckBoxGroup';
import RadioGroup from './RadioGroup';

const Form = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { advantages } = useAppSelector((state) => state.advantagesSlice);
  const { activeStep, finishedSteps } = useAppSelector((state) => state.progressBarSlice);

  const handleSubmit = () => {
    const nextStep = 3;

    if (!finishedSteps.includes(activeStep)) {
      dispatch(addFinishedStep(activeStep));
    }
    dispatch(setActiveStep(nextStep));
    navigate('/step3');
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, id: number) => {
    const { value } = event.target;
    dispatch(setAdvantageValueById({ id, value }));
  };

  const handleBack = () => {
    const previousStep = 1;
    dispatch(setActiveStep(previousStep));
    navigate(-1);
  };

  const handleRemoveInput = (id: number) => {
    dispatch(deleteAdvantage(id));
  };
  const handleAddInput = () => {
    const lastAdvantage = advantages.length > 0 ? advantages[advantages.length - 1].id : 0;
    const newId = lastAdvantage + 1;
    dispatch(addNewAdvantage({ id: newId, value: '' }));
  };

  const createInputs = () => (advantages.map((advantage) => (
    <div className="form__input_wrapper" key={advantage.id}>
      <input
        type="text"
        name={`advantage${advantage.id}`}
        onChange={(event) => handleInputChange(event, advantage.id)}
        value={advantage.value}
        placeholder="Placeholder"
        id={advantage.id.toString()}
        className="form__input form__input_step2"
      />
      <button type="button" className="button-transparent" onClick={() => handleRemoveInput(advantage.id)}>
        <img src={removeIcon} alt="remove" className="form__remove-input-icon" />
      </button>
    </div>
  )));

  return (
    <form className="form" onSubmit={handleSubmit}>
      <fieldset className="form__fieldset">
        <legend>Advantages</legend>
        {createInputs()}
        <button
          type="button"
          className="button-transparent button-plus"
          onClick={handleAddInput}
        >
          <img src={plusIcon} alt="plus" className="form__add-input-icon" />
        </button>
        <CheckBoxGroup />
        <RadioGroup />
        <div className="form__button-wrap">
          <button
            type="button"
            className="form__button button__back"
            id="button-back"
            onClick={handleBack}
          >
            Назад
          </button>
          <button
            type="submit"
            className="form__button button__submit"
            id="button-next"
          >
            Далее
          </button>
        </div>
      </fieldset>
    </form>
  );
};
export default Form;
