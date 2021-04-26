import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';

import { defaultHandler } from '../../utils/util-func';

import './Dialog.scss';

const toggleScroll = () => {
  document.querySelector('html').classList.toggle('scroll-lock');
};

const Dialog = ({ children, handleClose }) => {
  const ref = useRef();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    ref.current = document.getElementById('modal-root');
    setMounted(true);
  }, []);

  useEffect(() => {
    toggleScroll();
    return () => {
      toggleScroll();
    };
  });

  return mounted
    ? ReactDOM.createPortal(
        <div className="dialog">
          <div className="dialog-body">
            <button className="dialog-close" onClick={handleClose}>
              <svg className="dialog-close-icon" viewBox="0 0 40 40">
                <path d="M 10,10 L 30,30 M 30,10 L 10,30" />
              </svg>
            </button>
            <div className="dialog-content">{children}</div>
          </div>
        </div>,
        ref.current,
      )
    : null;
};

Dialog.defaultProps = {
  handleClose: defaultHandler,
};

Dialog.propTypes = {
  children: PropTypes.node.isRequired,
  handleClose: PropTypes.func,
};

export default Dialog;
