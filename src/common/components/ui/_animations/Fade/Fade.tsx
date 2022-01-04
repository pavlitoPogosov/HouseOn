import React from 'react';
import { useTransition, animated, UseTransitionProps } from 'react-spring';

type OwnProps = {
  isActive: boolean;
  useTransitionProps?: Partial<UseTransitionProps>;
};

export type FadeProps = OwnProps & React.HTMLAttributes<HTMLDivElement>;

export const Fade: React.FC<FadeProps> = ({ isActive, children, useTransitionProps, style, ...otherProps }) => {
  const blackoutTransition = useTransition(isActive, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: { duration: 200 },
    ...useTransitionProps
  });

  return (
    <>
      {blackoutTransition(
        (transitionStyle, isVisible) =>
          isVisible && (
            <animated.div
              {...otherProps}
              style={
                {
                  ...transitionStyle,
                  ...style
                } as any
              }>
              {children}
            </animated.div>
          )
      )}
    </>
  );
};
