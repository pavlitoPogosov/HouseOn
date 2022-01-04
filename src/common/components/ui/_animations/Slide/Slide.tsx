import React from 'react';
import { useTransition, animated, UseTransitionProps } from 'react-spring';

export type SlideAnimationProps = 'left' | 'right' | 'top' | 'bottom';

type OwnProps = {
  isActive: boolean;
  animation: SlideAnimationProps;

  useTransitionProps?: Partial<UseTransitionProps>;
};

export type SlideProps = OwnProps & React.HTMLAttributes<HTMLDivElement>;

const getRightTransformAnimation = (animation: SlideAnimationProps, propsValues?: Partial<UseTransitionProps>) => {
  const isTop = animation === 'top';
  const isBottom = animation === 'bottom';
  const isLeft = animation === 'left';

  const signBeforeNumber = isTop || isLeft ? '-' : '';
  const signAfterTranslate = isTop || isBottom ? 'Y' : 'X';

  return {
    from: { transform: `translate${signAfterTranslate}(${signBeforeNumber}100%)` },
    enter: { transform: `translate${signAfterTranslate}(0%)` },
    leave: { transform: `translate${signAfterTranslate}(${signBeforeNumber}100%)` },
    config: { duration: 200 },
    ...propsValues
  };
};

export const Slide: React.FC<SlideProps> = ({ children, animation, isActive, useTransitionProps, ...otherProps }) => {
  const slideTransition = useTransition(isActive, getRightTransformAnimation(animation, useTransitionProps));

  return (
    <>
      {slideTransition(
        (style, isVisible) =>
          isVisible && (
            <animated.div {...otherProps} style={style as any}>
              {children}
            </animated.div>
          )
      )}
    </>
  );
};
