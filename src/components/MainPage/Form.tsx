import { useNavigate } from 'react-router-dom';
import './mainPage.scss';
import { myEmail, myPhone } from '../../utils/utils';

const Form = () => {
  const navigate = useNavigate();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate('/step1');
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label htmlFor="phoneNumber" className="form__label-flex form__label_main-page">
        Номер телефона
        <input
          type="text"
          name="phoneNumber"
          className="form__input form__input_main-page"
          disabled
          defaultValue={myPhone}
        />
      </label>
      <label htmlFor="email" className="form__label-flex form__label_main-page">
        Email
        <input
          type="email"
          name="email"
          className="form__input form__input_main-page"
          disabled
          defaultValue={myEmail}
        />
      </label>
      <div className="form__button-wrap">
        <button
          type="submit"
          className="form__button button__submit"
          id="button-start"
        >
          Начать
        </button>
      </div>
    </form>
  );
};
export default Form;
