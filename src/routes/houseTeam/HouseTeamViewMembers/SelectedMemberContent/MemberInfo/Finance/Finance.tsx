import React, { useState } from 'react';
import { useIntl } from 'react-intl';

import clsx from 'clsx';

import { NBSP } from '@proscom/ui-utils';
import { ColorfulIcon, ColorfulIconTypes } from 'common/components/ui/ColorfulIcon/ColorfulIcon';
import { Text, TextPropsVariantsEnum } from 'common/components/ui/Text/Text';
import { useMutationWithError } from 'common/hooks/useMutationWithError';
import { MUTATION_CREATE_REWARD } from 'graphql/mutations/accounts';
import { AccountType, RewardInput, RewardType } from 'graphql/types';
import { useTypedDispatch } from 'redux/hooks/useTypedDispatch';
import { createToast } from 'redux/slices/toastSlice/actionCreators';

import { RewardCard } from './RewardCard/RewardCard';
import { ADD_REWARD_FORM_INITIAL_VALUES, AddRewardFormFieldNames, RewardDialog } from './RewardDialog/RewardDialog';
import { IWorkListItem, WorkList, WorkListEnums } from './WorkList/WorkList';

import s from './Finance.module.scss';

export interface FinanceProps {
  selectedMember: AccountType;
}

const ListData: IWorkListItem[] = [
  { type: WorkListEnums.STARTED, time: '8 am' },
  { type: WorkListEnums.STOPPED, time: '1 pm' },
  { type: WorkListEnums.STARTED, time: '2 pm' },
  { type: WorkListEnums.STOPPED, time: '8 pm' }
];

export const Finance: React.FC<FinanceProps> = ({ selectedMember }) => {
  const intl = useIntl();
  const dispatch = useTypedDispatch();

  // Необходимо для обновления списка rewards, после добавления.
  const [rewards, setRewards] = useState<RewardType[] | []>(selectedMember.rewards);
  const [isOpenAddReward, setIsOpenAddReward] = useState<boolean>(false);

  const [createReward] = useMutationWithError<{ result: RewardType }, { input: RewardInput }>(MUTATION_CREATE_REWARD, {
    onCompleted({ result }) {
      setRewards([...rewards, result]);
      dispatch(
        createToast({
          title: intl.formatMessage({
            id: 'houseTeam.finance.addReward.successTitle',
            defaultMessage: 'Success'
          }),
          text: intl.formatMessage({
            id: 'houseTeam.finance.addReward.successText',
            defaultMessage: 'Reward add successfully'
          }),
          type: 'success'
        })
      );
      setIsOpenAddReward(false);
    },
    onError() {
      dispatch(
        createToast({
          title: intl.formatMessage({
            id: 'houseTeam.finance.addReward.errorTitle',
            defaultMessage: 'Oops'
          }),
          text: intl.formatMessage({
            id: 'houseTeam.finance.addReward.errorText',
            defaultMessage: 'Failed to add reward. Please, try again'
          }),
          type: 'error'
        })
      );
      setIsOpenAddReward(false);
    }
  });

  const onAddReward = async (values: typeof ADD_REWARD_FORM_INITIAL_VALUES) => {
    await createReward({
      variables: {
        input: {
          amount: parseInt(values[AddRewardFormFieldNames.REWARD]),
          currency: values[AddRewardFormFieldNames.CURRENCY],
          receiver_account_id: selectedMember.id
        }
      }
    });
  };

  const rewardCards = rewards.map((reward) => <RewardCard key={reward.id} reward={reward} />);
  return (
    <>
      <div>
        <div className={s.Finance__block}>
          <Text className={s.Finance__title} variant={TextPropsVariantsEnum.H3}>
            {intl.formatMessage({
              id: 'houseTeam.finance.workToday.title',
              defaultMessage: 'Work today'
            })}
          </Text>
          <div className={s.Finance__row}>
            <Text variant={TextPropsVariantsEnum.CAPTION_M} className={s.Finance__text}>
              {intl.formatMessage(
                {
                  id: 'houseTeam.finance.workToday.period.start',
                  defaultMessage: 'Started: {time}'
                },
                { time: '8 am' }
              )}
            </Text>
            <span className={s.Finance__dot}>&#8226;</span>
            <Text variant={TextPropsVariantsEnum.CAPTION_M} className={s.Finance__text}>
              {intl.formatMessage(
                {
                  id: 'houseTeam.finance.workToday.period.end',
                  defaultMessage: 'Finished: {time}'
                },
                { time: '6 pm' }
              )}
            </Text>
          </div>
          <div className={s.Finance__row}>
            <Text variant={TextPropsVariantsEnum.CAPTION_R} className={s.Finance__text}>
              {intl.formatMessage(
                {
                  id: 'houseTeam.finance.workToday.period.total',
                  defaultMessage: 'Total: {time}'
                },
                {
                  time: (
                    <Text className={s.Finance__time} variant={TextPropsVariantsEnum.CAPTION_M}>
                      {NBSP}8 hours
                    </Text>
                  )
                }
              )}
            </Text>
          </div>
        </div>
        <div className={s.Finance__block}>
          <Text className={s.Finance__title} variant={TextPropsVariantsEnum.H3}>
            {intl.formatMessage({
              id: 'houseTeam.finance.previousWork.title',
              defaultMessage: 'Previous work'
            })}
          </Text>
          <WorkList list={ListData} />
        </div>
        <div className={s.Finance__block}>
          <Text className={s.Finance__title} variant={TextPropsVariantsEnum.H3}>
            {intl.formatMessage({
              id: 'houseTeam.finance.workingAgreements.title',
              defaultMessage: 'Working agreements'
            })}
          </Text>
          <Text variant={TextPropsVariantsEnum.CAPTION_R} className={s.Finance__text}>
            {intl.formatMessage(
              {
                id: 'houseTeam.finance.workingAgreements.text',
                defaultMessage: 'Payment: {time}'
              },
              {
                time: (
                  <Text className={s.Finance__time} variant={TextPropsVariantsEnum.CAPTION_M}>
                    {NBSP}$10/h
                  </Text>
                )
              }
            )}
          </Text>
        </div>
        <div className={s.Finance__block}>
          <div className={clsx(s.Finance__row, s.Finance__row_spaceBetween)}>
            <Text className={s.Finance__title} variant={TextPropsVariantsEnum.H3}>
              {intl.formatMessage({
                id: 'houseTeam.finance.rewards.title',
                defaultMessage: 'Rewards'
              })}
            </Text>
            {!selectedMember.is_pending_invite && (
              <Text
                onClick={() => setIsOpenAddReward(true)}
                variant={TextPropsVariantsEnum.CAPTION_M}
                className={s.Finance__action}>
                <ColorfulIcon icon={ColorfulIconTypes.PLUS} />
                {intl.formatMessage({ id: 'houseTeam.finance.rewards.action', defaultMessage: 'Add new reward' })}
              </Text>
            )}
          </div>
          <div className={clsx(s.Finance__row, s.Finance__row_column)}>{rewardCards}</div>
        </div>
      </div>
      <RewardDialog
        isLoading={false}
        isOpen={isOpenAddReward}
        onClose={() => setIsOpenAddReward(false)}
        onAddReward={onAddReward}
      />
    </>
  );
};
