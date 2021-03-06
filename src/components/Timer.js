import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';

import styled, { keyframes } from 'styled-components';

const Container = styled.div`
  background-color: ${props => props.theme.colorGray};
  bottom: 0;
  height: 1em;
  left: 0;
  position: absolute;
  right: 0;
`;

const timeoutKeyframe = keyframes`
  0% {
    width: 100%;
  }

  100% {
    width: 0%
  }
`;

const Bar = styled.div`
  animation-play-state: ${props => (props.animating ? 'running' : 'paused')};
  animation-duration: ${props => props.duration}ms;
  animation-iteration-count: infinite;
  animation-name: ${timeoutKeyframe};
  animation-timing-function: linear;
  background-color: ${props => props.theme.colorRedLight};
  height: 100%;
`;

const Timer = ({ id, onTimeout, duration }) => {
  const [isAnimating, setAnimation] = useState(false);
  const timer = useRef(null);

  useEffect(() => {
    setAnimation(true);

    timer.current = setTimeout(() => {
      setAnimation(false);
      onTimeout && onTimeout();
    }, duration);

    return () => clearTimeout(timer.current);
  }, [id]);

  return (
    <Container>
      <Bar animating={isAnimating} duration={duration} />
    </Container>
  );
};

Timer.propTypes = {
  id: PropTypes.string.isRequired,
  onTimeout: PropTypes.func.isRequired,
  duration: PropTypes.number
};

Timer.defaultProps = {
  duration: 10 * 1000
};

export default Timer;
