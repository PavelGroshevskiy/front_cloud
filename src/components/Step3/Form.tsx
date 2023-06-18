import { useRef, useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import cn from "classnames";
import { useNavigate } from "react-router-dom";
import "./stepThree.scss";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { addFinishedStep, setActiveStep } from "../../store/progressBarSlice";
import { getTrueKeysCheckBoxes, myEmail, myPhone } from "../../utils/utils";
import { setShowModal } from "../../store/modalsSlice";

const Form = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const inputEl = useRef<HTMLTextAreaElement>(null);
	const { aboutValue } = useAppSelector((state) => state.aboutSlice);
	const { postData, step1 } = useAppSelector((state) => state.userSlice);

	const { advantages } = useAppSelector((state) => state.advantagesSlice);
	const { checkBoxes } = useAppSelector((state) => state.checkBoxesSlice);
	const { selectedRadioValue } = useAppSelector((state) => state.radioInputsSlice);

	useEffect(() => {
		if (inputEl.current) {
			inputEl.current.focus();
		}
	}, []);

	const signUpSchema = yup.object().shape({
		about: yup.string().max(200, "максимальная длина 200 символов"),
	});
	const formik = useFormik({
		validateOnMount: true,
		initialValues: {
			about: aboutValue,
		},
		validationSchema: signUpSchema,
		onSubmit: (value) => {
			const currentCheckBoxes = getTrueKeysCheckBoxes(checkBoxes);
			const dataForPostToApi = {
				email: myEmail,
				phone: myPhone,
				...step1,
				advantages,
				selectedCheckBoxes: currentCheckBoxes,
				selectedRadioValue,
				about: value,
			};
			dispatch(addFinishedStep(3));
			dispatch(setShowModal(true));
		},
	});

	const handleBack = () => {
		navigate(-1);
	};

	const textareaClass = () =>
		cn("form__textarea", {
			"form__label-error": formik.errors.about && formik.touched.about,
			mb88: !(formik.errors.about && formik.touched.about),
		});

	const textErrClass = () =>
		cn("form__error-text", {
			mb64: formik.errors.about && formik.touched.about,
		});

	return (
		<form className="form" onSubmit={formik.handleSubmit}>
			<label htmlFor="about" className="form__label-flex">
				About
				<textarea
					name="about"
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					value={formik.values.about}
					id="field-about"
					placeholder="Placeholder"
					className={textareaClass()}
					disabled={postData.isLoading}
					ref={inputEl}
				/>
				{formik.errors.about && formik.touched.about && (
					<p className={textErrClass()}>{formik.errors.about}</p>
				)}
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
					disabled={
						!formik.isValid ||
						(formik.isSubmitting && !formik.dirty) ||
						postData.isLoading
					}
				>
					Отправить
				</button>
			</div>
		</form>
	);
};

export default Form;
