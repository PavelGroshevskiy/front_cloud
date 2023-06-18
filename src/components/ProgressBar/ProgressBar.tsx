import { useEffect } from 'react';
import cn from 'classnames';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import './progressBar.scss';
import { StepNumbersType } from '../../types';
import finishedStep from '../../assets/icon/interface/finishedStep.svg';
import calculateProgressBarWidth from '../../utils/utils';
import { setActiveStep } from '../../store/progressBarSlice';

const ProgressBar = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { activeStep, finishedSteps } = useAppSelector((state) => state.progressBarSlice);
  const stepNumbers: StepNumbersType = [1, 2, 3];
  const stepClass = (stepNumber: number) => cn('progress-bar__step', {
    active: stepNumber === activeStep,
    finished: finishedSteps.includes(stepNumber),
  });
  const circleClass = (stepNumber: number) => cn('progress-bar__circle', {
    active: stepNumber === activeStep,
    finished: finishedSteps.includes(stepNumber),
  });

  useEffect(() => {
    const calculatedWidth = calculateProgressBarWidth(activeStep);
    console.log('progressBAR', calculatedWidth, activeStep);

    document.documentElement.style.setProperty('--finished-steps-width', `${calculatedWidth}%`);
  }, [activeStep, location]);

  const renderCircleContent = (stepNumber: number) => {
    if (finishedSteps.includes(stepNumber)) {
      return <img src={finishedStep} alt="finished" />;
    }
    if (activeStep === stepNumber) {
      return <div className="progress-bar__circle__inner-circle" />;
    }
    return null;
  };

  const handleClick = (stepNumber: number) => {
    const finishedStepsLength = finishedSteps.length;
    switch (finishedStepsLength) {
      case 0:
        break;
      case 1:
      case 2:
      case 3:
        dispatch(setActiveStep(stepNumber));
        navigate(`/step${stepNumber}`);
        break;
      default:
        break;
    }
  };

  const createStepsProgressBar = () => (
    stepNumbers.map((stepNumber) => (
      <div
        className={stepClass(stepNumber)}
        key={stepNumber}
        onClick={() => handleClick(stepNumber)}
        role="button"
        tabIndex={0}
        onKeyUp={() => handleClick(stepNumber)}
      >
        <div className="progress-bar__circle">
          <div className={circleClass(stepNumber)}>
            {renderCircleContent(stepNumber)}
          </div>
        </div>
        <span className="progress-bar__text">{stepNumber}</span>
      </div>
    ))
  );
  return (
    <div className="progress-bar">
      {createStepsProgressBar()}
      <div className="progress-bar__connector default" />
      <div className="progress-bar__connector finished" />
    </div>
  );
};

export default ProgressBar;
