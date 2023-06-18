import { useNavigate } from 'react-router-dom';
import cn from 'classnames';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import './modals.scss';
import successIcon from '../../assets/icon/successIcon.png';
import errorIcon from '../../assets/icon/errorIcon.png';
import { setShowModal } from '../../store/modalsSlice';
import { resetAboutValue } from '../../store/aboutSlice';
import { reseteAdvantages } from '../../store/advantagesSlice';
import { resetStatusCheckBox } from '../../store/checkBoxesSlice';
import { resetProgressBar } from '../../store/progressBarSlice';
import { resetRadioValue } from '../../store/radioInputsSlice';
import { resetUserState } from '../../store/userSlice';

const Modals = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isModalShow } = useAppSelector((state) => state.modalsSlice);
  const { postData: { error } } = useAppSelector((state) => state.userSlice);
  if (!isModalShow) {
    return null;
  }
  const titleClass = () => cn('modal__title', {
    modal__title_error: error,
    modal__title_success: !error,
  });
  const footerClass = () => cn('modal__footer', {
    modal__footer_center: !error,
    modal__footer_right: error,
  });

  const handleClick = (err: string | null) => {
    dispatch(setShowModal(false));
    if (err) {
      return;
    }
    dispatch(resetAboutValue());
    dispatch(reseteAdvantages());
    dispatch(resetStatusCheckBox());
    dispatch(resetProgressBar());
    dispatch(resetRadioValue());
    dispatch(resetUserState());
    navigate('/');
  };

  return (
    <div
      className="modal"
      onClick={() => handleClick(error)}
      onKeyDown={() => handleClick(error)}
    >
      <div
        className="modal__content"
        onClick={(event) => event.stopPropagation()}
        onKeyDown={(event) => event.stopPropagation()}
      >
        <div className="modal__header">
          <h3 className={titleClass()}>
            {error ? 'Ошибка' : 'Форма успешно отправлена'}
          </h3>
        </div>
        <div className="modal__body">
          <div className="modal__logo__container">
            <img src={error ? errorIcon : successIcon} alt="ошибка" className="modal__logo" />
          </div>
        </div>
        <div className={footerClass()}>
          <a
            type="button"
            onClick={() => handleClick(error)}
            className="modal__link"
          >
            {error ? 'Закрыть' : 'На главную'}
          </a>
        </div>
      </div>
    </div>
  );
};

export default Modals;
