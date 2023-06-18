import { useRef, useEffect } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import cn from 'classnames';
import { useNavigate } from 'react-router-dom';
import './stepOne.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { Gender, InputNameType } from '../../types';
import {
  setNickName, setName, setSurname, setSex,
} from '../../store/userSlice';
import { addFinishedStep, setActiveStep } from '../../store/progressBarSlice';

const Form = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const inputEl = useRef<HTMLInputElement>(null);
  const {
    nickname, name, surname, sex,
  } = useAppSelector((state) => state.userSlice.step1);
  const { activeStep, finishedSteps } = useAppSelector((state) => state.progressBarSlice);

  useEffect(() => {
    if (inputEl.current) {
      inputEl.current.focus();
    }
  }, []);

  const signUpSchema = yup.object().shape({
    nickname: yup
      .string()
      .max(30, 'Максимальная длина никнейма - 30 символов')
      .matches(/^[a-zA-Z0-9]+$/, 'Никнейм может содержать только буквы и цифры')
      .required('Поле является обязательным'),
    name: yup
      .string()
      .max(50, 'Максимальная длина имени - 50 символов')
      .matches(/^[a-zA-Z]+$/, 'Имя может содержать только буквы')
      .required('Поле является обязательным'),
    surname: yup
      .string()
      .max(50, 'Максимальная длина фамилии - 50 символов')
      .matches(/^[a-zA-Z]+$/, 'Фамилия может содержать только буквы')
      .required('Поле является обязательным'),
    sex: yup.string().oneOf(['man', 'woman'], 'Выберите пол').required('Поле является обязательным'),
  });
  const formik = useFormik({
    validateOnMount: true,
    initialValues: {
      nickname,
      name,
      surname,
      sex,
    },
    validationSchema: signUpSchema,
    onSubmit: () => {
      const nextStep = 2;
      if (!finishedSteps.includes(activeStep)) {
        dispatch(addFinishedStep(activeStep));
      }
      dispatch(setActiveStep(nextStep));
      navigate('/step2');
    },
  });

  const inputClass = (inputName: InputNameType) => cn('form__input', 'form__input_step1', {
    'form__input-error': formik.errors[inputName] && formik.touched[inputName],
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name: inputName, value } = event.target;
    switch (inputName) {
      case 'nickname':
        dispatch(setNickName(value));
        break;
      case 'name':
        dispatch(setName(value));
        break;
      case 'surname':
        dispatch(setSurname(value));
        break;
      case 'sex':
        dispatch(setSex(value as Gender));
        break;
      default:
        break;
    }
    formik.handleChange(event);
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <form className="form" onSubmit={formik.handleSubmit}>
      <label htmlFor="nickname" className="form__label-flex form__label_step1">
        Nickname
        <input
          type="text"
          name="nickname"
          onChange={handleInputChange}
          onBlur={formik.handleBlur}
          value={formik.values.nickname}
          id="field-nickname"
          placeholder="Никнейм"
          className={inputClass('nickname')}
          ref={inputEl}
          required
        />
        {formik.errors.nickname && formik.touched.nickname && <p className="form__error-text">{formik.errors.nickname}</p>}
      </label>
      <label htmlFor="name" className="form__label-flex form__label_step1">
        Name
        <input
          type="text"
          name="name"
          onChange={handleInputChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
          id="field-name"
          placeholder="Имя"
          className={inputClass('name')}
          required
        />
        {formik.errors.name && formik.touched.name && <p className="form__error-text">{formik.errors.name}</p>}
      </label>
      <label htmlFor="surname" className="form__label-flex form__label_step1">
        Surname
        <input
          type="text"
          name="surname"
          onChange={handleInputChange}
          onBlur={formik.handleBlur}
          value={formik.values.surname}
          id="field-surname"
          placeholder="Фамилия"
          className={inputClass('surname')}
          required
        />
        {formik.errors.surname && formik.touched.surname && <p className="form__error-text">{formik.errors.surname}</p>}
      </label>
      <label htmlFor="sex" className="form__label-flex form__label_step1">
        Sex
        <select
          name="sex"
          onChange={handleInputChange}
          onBlur={formik.handleBlur}
          value={formik.values.sex}
          placeholder="Не выбрано"
          id="field-sex"
          className={inputClass('sex')}
          required
        >
          <option value="" disabled>Не выбрано</option>
          <option value="man" id="field-sex-option-man">man</option>
          <option value="woman" id="field-sex-option-woman">woman</option>
        </select>
        {formik.errors.sex && formik.touched.sex && <p className="form__error-text">{formik.errors.sex}</p>}
      </label>
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
          disabled={!formik.isValid || (formik.isSubmitting && !formik.dirty)}
        >
          Далее
        </button>
      </div>
    </form>
  );
};
export default Form;
