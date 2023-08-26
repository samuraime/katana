import React from 'react';
import PropTypes from 'prop-types';
import { IntlProvider } from 'react-intl';
import messages from '../locales/zh-CN';

export default function TestWrapper({ children }) {
  return (
    <IntlProvider locale="zh-CN" messages={messages}>
      {children}
    </IntlProvider>
  );
}

TestWrapper.propTypes = {
  children: PropTypes.element.isRequired,
};
