import React from 'react';
import { Link } from 'react-router-dom';

import clsx from 'clsx';

import { Avatar } from 'common/components/ui/Avatar/Avatar';
import { ChatMessage, EChatMessageSide, EChatMessageTypes } from 'common/components/ui/ChatMessage/ChatMessage';
import { NavigationLink } from 'common/components/ui/NavigationLink/NavigationLink';
import { ETextColors, Text, TextPropsVariantsEnum } from 'common/components/ui/Text/Text';
import { TeamMemberType } from 'routes/houseTeam/HouseTeamViewMembers/tempData';

import s from './ActivityCard.module.scss';

export type TActivityCard = {
  activityAuthor: TeamMemberType;
  activityAuthorColor?: ETextColors;
  activityAuthorLink?: string;
  activityAuthorVariant?: TextPropsVariantsEnum;
  activityDate: string;
  activityDateClassName?: string;
  activityDateColor?: ETextColors;
  activityDateVariant?: TextPropsVariantsEnum;
  activityTarget: string;
  activityTargetColor?: ETextColors;
  activityTargetLink?: string;
  activityTargetVariant?: TextPropsVariantsEnum;
  activityText: string;
  activityTextColor?: ETextColors;
  activityTextVariant?: TextPropsVariantsEnum;
  comment?: string;
  commentAvatarClassName?: string;
  commentClassName?: string;
  commentContainerClassName?: string;
  commentContentClassName?: string;
  containerClassName?: string;
  contentClassName?: string;
  headerActivityClassName?: string;
  headerActivityTargetClassName?: string;
  headerAuthorClassName?: string;
  headerClassName?: string;
  pointClassName?: string;
};

export const ActivityCard: React.FC<TActivityCard> = (props) => {
  const {
    activityAuthor,
    activityAuthorLink,
    pointClassName,
    activityAuthorColor,
    activityAuthorVariant = TextPropsVariantsEnum.BODY_M,
    activityDate,
    activityDateClassName,
    activityDateColor = ETextColors.TRETIARY,
    activityDateVariant = TextPropsVariantsEnum.CAPTION_R,
    activityTarget,
    activityTargetColor,
    activityTargetLink,
    activityTargetVariant = TextPropsVariantsEnum.BODY_M,
    activityText,
    activityTextColor = ETextColors.SECONDARY,
    activityTextVariant = TextPropsVariantsEnum.BODY_M,
    children,
    comment,
    commentAvatarClassName,
    commentClassName,
    commentContainerClassName,
    commentContentClassName,
    containerClassName,
    contentClassName,
    headerActivityClassName,
    headerActivityTargetClassName,
    headerAuthorClassName,
    headerClassName
  } = props;

  return (
    <div className={clsx(s.ActivityCard__container, containerClassName)}>
      <span className={clsx(s.ActivityCard__point, pointClassName)} />

      <div className={clsx(s.ActivityCard__content, contentClassName)}>
        <div className={clsx(s.ActivityCard__header, headerClassName)}>
          {activityAuthorLink && (
            <NavigationLink
              as={Link}
              className={clsx(s.header__author_link, headerAuthorClassName)}
              to={activityAuthorLink}
              isUnderline>
              {activityAuthor.name}
            </NavigationLink>
          )}

          {!activityAuthorLink && (
            <Text
              className={clsx(s.header__author, headerAuthorClassName)}
              color={activityAuthorColor}
              text={activityAuthor.name}
              variant={activityAuthorVariant}
            />
          )}

          <Text
            className={clsx(s.header__activity, headerActivityClassName)}
            color={activityTextColor}
            text={activityText}
            variant={activityTextVariant}
          />

          {activityTargetLink && (
            <NavigationLink
              as={Link}
              className={clsx(s.header__activity_target, headerActivityTargetClassName)}
              to={activityTargetLink}
              isUnderline>
              {activityTarget}
            </NavigationLink>
          )}

          {!activityTargetLink && (
            <Text
              className={clsx(s.header__activity_target, headerActivityTargetClassName)}
              color={activityTargetColor}
              text={activityTarget}
              variant={activityTargetVariant}
            />
          )}
        </div>

        {(comment || children) && (
          <div className={clsx(s.ActivityCard__comment, commentClassName)}>
            {comment && (
              <div className={clsx(s.content__comment_container, commentContainerClassName)}>
                <Avatar
                  avatar={activityAuthor.avatar}
                  containerClassName={clsx(s.comment__avatar, commentAvatarClassName)}
                  emptyText={activityAuthor.name}
                  height={32}
                  width={32}
                />

                <ChatMessage
                  containerClassName={clsx(s.comment__content, commentContentClassName)}
                  isLast
                  message={comment}
                  side={EChatMessageSide.LEFT}
                  type={EChatMessageTypes.SECONDARY}
                />
              </div>
            )}

            {!comment && children}
          </div>
        )}

        {activityDate && (
          <Text
            className={clsx(
              s.content__activity_date,
              !comment && !children && s.activity_date__no_margin_top,
              activityDateClassName
            )}
            color={activityDateColor}
            text={activityDate}
            variant={activityDateVariant}
          />
        )}
      </div>
    </div>
  );
};
