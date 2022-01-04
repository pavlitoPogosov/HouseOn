import React from 'react';

import clsx from 'clsx';

import { IWizardStep } from '../WizardPage';

import s from './StepLine.module.scss';

export interface StepLineProps {
  allSteps: { [key in number]: IWizardStep };
  activeStep: IWizardStep;
}

export const StepLine: React.FC<StepLineProps> = ({ allSteps, activeStep }) => {
  return (
    <div className={s.StepLine__container}>
      {Object.values(allSteps).map((step) => (
        <div
          key={step.order}
          className={clsx(s.StepLine__step, {
            [s.StepLine__step_active]: activeStep.order === step.order,
            [s.StepLine__step_inactive]: activeStep.order < step.order,
            [s.StepLine__step_passed]: activeStep.order > step.order
          })}
          style={{ order: step.order }}>
          <div className={s.StepLine__stepCircle}>{step.order + 1}</div>

          <div className={s.StepLine__stepText}>
            {step.span && <span>{step.span}</span>}

            {step.title}
          </div>
        </div>
      ))}
    </div>
  );
};
