import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Transition from 'react-transition-group/Transition';
import s from './Dialog.scss';

const noop = () => {};

export default class Dialog extends Component {
  static propTypes = {
    open: PropTypes.bool.isRequired,
    className: PropTypes.string,
    contentClassName: PropTypes.string,
    title: PropTypes.node,
    titleClassName: PropTypes.string,
    bodyClassName: PropTypes.string,
    children: PropTypes.node,
    actions: PropTypes.node,
    actionsClassName: PropTypes.string,
    overlayClassName: PropTypes.string,
    onRequestClose: PropTypes.func,
  }
  static defaultProps = {
    className: '',
    contentClassName: '',
    title: '',
    titleClassName: '',
    bodyClassName: '',
    children: null,
    actions: null,
    actionsClassName: '',
    overlayClassName: '',
    onRequestClose: noop,
  }
  render() {
    const duration = 500;
    const {
      open, className, contentClassName, title, titleClassName, bodyClassName, children,
      actions, actionsClassName, overlayClassName, onRequestClose,
      ...otherProps
    } = this.props;
    return open && (
      <Transition in={open} timeout={duration}>
        {state => (
          <div className={classnames(s.root, s[state])}>
            <div className={classnames(s.overlay, overlayClassName)} onClick={onRequestClose} />
            <div className={classnames(s.content, contentClassName, className)} {...otherProps}>
              {title && <h3 className={classnames(s.title, titleClassName)}>{title}</h3>}
              {children &&
                <div className={classnames(s.body, bodyClassName, {
                    [s.noTitle]: !title,
                    [s.noActions]: !actions,
                  })}
                >
                  {children}
                </div>
              }
              {actions &&
                <div className={classnames(s.actions, actionsClassName)}>{actions}</div>
              }
            </div>
          </div>
        )}
      </Transition>
    );
  }
}
