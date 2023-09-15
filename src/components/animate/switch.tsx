import React, { useRef } from 'react';
import { Routes, useLocation } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { CSSTransitionClassNames } from 'react-transition-group/CSSTransition';

interface AnimatedSwitchProps extends React.PropsWithChildren {
  type?: string | CSSTransitionClassNames;
  duration?: number;
}

const AnimatedSwitch: React.FC<AnimatedSwitchProps> = ({
  type = 'fade',
  duration = 10,
  children
}) => {
  const location = useLocation();
  const nodeRef = useRef(null);
  return (
    <TransitionGroup>
      <CSSTransition
        nodeRef={nodeRef}
        in={location.pathname !== null}
        key={location.key}
        classNames={type}
        timeout={duration}
        unmountOnExit
      >
        <Routes location={location}>{children}</Routes>
      </CSSTransition>
    </TransitionGroup>
  );
};

export default AnimatedSwitch;
