import React, {
  useState,
  useCallback,
  useLayoutEffect,
} from 'react';
import { useIntl } from 'react-intl';

import { EditorState } from 'draft-js';

// eslint-disable-next-line import/order
import { ApolloError } from '@apollo/client';
// eslint-disable-next-line import/order
import { appHistory } from 'appHistory';
import { ReactComponent as CloseIcon } from 'assets/icons/close.svg';
import { Fade } from 'common/components/ui/_animations/Fade/Fade';
import { Button } from 'common/components/ui/Button/Button';
import { Logo } from 'common/components/ui/Logo/Logo';
import { NavigationLink } from 'common/components/ui/NavigationLink/NavigationLink';
import { useMediaQuery } from 'common/hooks/useMediaQuery';
import { useMutationWithError } from 'common/hooks/useMutationWithError';
import { MUTATION_INITIALIZE_HOUSE } from 'graphql/mutations/house';
import {
  FloorSpaceUnitsEnum,
  HouseInitializationInput,
  HouseInitializationResult,
} from 'graphql/types';
import { useTypedDispatch } from 'redux/hooks/useTypedDispatch';
import { useTypedSelector } from 'redux/hooks/useTypedSelector';
import accountsActions from 'redux/slices/accountsSlice';
import authActions from 'redux/slices/authSlice';
import { covertDraftJsStateToJSON } from 'utils/draftJsUtils';
import { LOCAL_STORAGE_KEY_LAST_HOUSE_ID } from 'utils/localStorageKeys';
import {
  HOUSE_PAGE_ROUTE,
  INDEX_PAGE_ROUTE,
  PROJECTS_PAGE_ROUTE,
} from 'utils/routes';

import { AdvancedStep } from './_steps/AdvancedStep';
import { AreaStep } from './_steps/AreaStep';
import { NameStep } from './_steps/NameStep';
import { AreaTooltip } from './_tooltips/AreaTooltip/AreaTooltip';
import { SafetyTooltip } from './_tooltips/SafetyTooltip/SafetyTooltip';
import { StepLine } from './StepLine/StepLine';

import s from './WizardPage.module.scss';

export enum WizardStepTypes {
  ADVANCED = 'advanced',
  AREA = 'area',
  NAME = 'name',
}

interface ISubmitStepProps {
  area: string;
  area_metric: FloorSpaceUnitsEnum;
  title: string;
}

export interface IWizardStepProps {
  error: ApolloError | undefined;
  loading: boolean;
  onCompleteWizard: () => void;
  onFirstProjectOpen: () => void;
  onPrevPage: () => void;
  onSubmit: (values: Partial<ISubmitStepProps>, direction: 'forward' | 'back') => void;
  savedValues: ISubmitStepProps;
}

export interface IWizardStep {
  component: React.FC<IWizardStepProps>;
  order: number;
  span?: string;
  title: string;
  type: WizardStepTypes;
}

const ALL_STEPS = {
  0: {
    component: NameStep,
    order: 0,
    title: 'Name',
    type: WizardStepTypes.NAME,
  },
  1: {
    component: AreaStep,
    order: 1,
    span: 'Aproximate ',
    title: 'area',
    type: WizardStepTypes.AREA,
  },
  2: {
    component: AdvancedStep,
    order: 2,
    title: 'Advanced',
    type: WizardStepTypes.ADVANCED,
  },
};

/* TODO: replace with real timezone data */
const timezone = '+00:00';

export const WizardPage: React.FC<unknown> = () => {
  const [ { hasAccessToWizard }, { availableAccounts } ] = useTypedSelector(s => [ s.auth, s.accounts ]);
  const intl = useIntl();
  const dispatch = useTypedDispatch();

  useLayoutEffect(() => {
    if (!hasAccessToWizard) {
      appHistory.goBack();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [ savedValues, setSavedValues ] = useState({
    area: '',
    area_metric: FloorSpaceUnitsEnum.Meter,
    title: '',
  });

  const [ initializeHouse, {
    error,
    loading,
  } ] = useMutationWithError<
  { result: HouseInitializationResult },
  { input: HouseInitializationInput }
  >(MUTATION_INITIALIZE_HOUSE);

  const [ activeStep, setActiveStep ] = useState<IWizardStep>(ALL_STEPS[0]);

  const onNextPage = useCallback(() => {
    if (loading) return;

    // @ts-ignore
    setActiveStep(ALL_STEPS[activeStep.order + 1]);
  }, [ activeStep, loading ]);

  const onPrevPage = useCallback(() => {
    if (loading) return;

    // @ts-ignore
    setActiveStep(ALL_STEPS[activeStep.order - 1]);
  }, [ activeStep, loading ]);

  const onCompleteWizard = useCallback((isLink: boolean, isSkip?: boolean) => {
    return async () => {
      const { data } = await initializeHouse({
        variables: {
          input: {
            comments: covertDraftJsStateToJSON(EditorState.createEmpty()),
            floor_space: isSkip ? 0 : Number(savedValues.area),
            floor_space_unit: savedValues.area_metric,
            timezone,
            title: isSkip ? 'No name' : savedValues.title,
          },
        },
      });

      if (data?.result) {
        dispatch(authActions.toggleWizardAccess());

        if (isLink) {
          // TODO add route to specific task
          appHistory.push(PROJECTS_PAGE_ROUTE);

          return;
        }

        const {
          account,
          house,
        } = data.result;
        const newAccounts = [ ...(availableAccounts || []), account ];

        dispatch(accountsActions.setAvailableAccounts(newAccounts));
        dispatch(accountsActions.setCurrentAccountId(account.id));
        dispatch(accountsActions.setCurrentHouseId(house.id));

        localStorage.setItem(LOCAL_STORAGE_KEY_LAST_HOUSE_ID, house.id);

        newAccounts.length
          ? appHistory.push(HOUSE_PAGE_ROUTE.replace(':id(\\d+)', house.id))
          : appHistory.push(INDEX_PAGE_ROUTE);
      }
    };
  },
  [
    dispatch,
    initializeHouse,
    savedValues,
    availableAccounts,
  ]);

  const onSubmit = useCallback((values: Partial<ISubmitStepProps>, direction: 'forward' | 'back') => {
    direction === 'forward' ? onNextPage() : onPrevPage();

    setSavedValues(prev => ({
      ...prev,
      ...values,
    }));
  },
  [ onNextPage, onPrevPage ]);

  const isTablet = useMediaQuery('(min-width: 576px)');

  return (
    <div className={s.WizardPage__container}>
      <div className={s.WizardPage__header}>
        <Logo />

        {
          activeStep.type !== WizardStepTypes.ADVANCED && (
            <>
              {
                isTablet ? (
                  <Button
                    className={s.WizardPage__skipBtn}
                    color="green"
                    onClick={onCompleteWizard(false, true)}
                    size="xl"
                    variant="secondary"
                  >
                    Skip
                  </Button>
                ) : (
                  <NavigationLink
                    as="div"
                    icon={<CloseIcon />}
                    isIconRight
                    onClick={onCompleteWizard(false, true)}
                  >
                    {intl.formatMessage({ defaultMessage: 'Skip', id: 'app.button.skip' })}
                  </NavigationLink>
                )
              }
            </>
          )
        }
      </div>

      <StepLine
        activeStep={activeStep}
        allSteps={ALL_STEPS}
      />

      <div className={s.WizardPage__content}>
        <Fade
          isActive
          key={activeStep.order}
          useTransitionProps={{ config: { duration: 400 } }}
        >
          <activeStep.component
            error={error}
            loading={loading}
            onCompleteWizard={onCompleteWizard(false)}
            onFirstProjectOpen={onCompleteWizard(true)}
            onPrevPage={onPrevPage}
            onSubmit={onSubmit}
            savedValues={savedValues}
          />
        </Fade>
      </div>

      <div className={s.WizardPage__footer}>
        <SafetyTooltip />

        {activeStep.type === WizardStepTypes.AREA && <AreaTooltip />}
      </div>
    </div>
  );
};
