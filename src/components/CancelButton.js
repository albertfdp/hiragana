import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import styled from 'styled-components';

import Octicon, { X } from '@primer/octicons-react';

const CrossButton = styled.button`
  background-color: transparent;
  border: none;
  color: ${props => props.theme.colorWhite};
  left: 10px;
  padding: 15px;
  position: absolute;
  top: 10px;

  &:hover {
    opacity: 0.8;
    cursor: pointer;
  }
`;

const Portal = ({ children, node }) => createPortal(children, node);

Portal.propTypes = {
  children: PropTypes.node,
  node: PropTypes.any
};

Portal.defaultProps = {
  node: document.body
};

const CancelButton = ({ onClick }) => {
  const onKeyDown = e => {
    if (e.keyCode === 27) {
      onCancel();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [onKeyDown]);

  const onCancel = () => {
    if (confirm(`Are you sure you want to cancel?`)) {
      onClick();
    }
  };

  return (
    <Portal>
      <CrossButton tabIndex={1} aria-label="Cancel" onClick={onCancel}>
        <Octicon icon={X} size="medium" />
      </CrossButton>
    </Portal>
  );
};

CancelButton.propTypes = {
  onClick: PropTypes.func
};

export default CancelButton;
