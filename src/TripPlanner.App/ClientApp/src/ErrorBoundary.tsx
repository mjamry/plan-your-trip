/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { Redirect } from 'react-router-dom';
import useLoggerService from './Services/Diagnostics/LoggerService';

type State = {
  hasError: boolean,
}

class ErrorBoundary extends React.Component<{}, State> {
  logger = useLoggerService('ErrorBoundary');

  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.logger.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      <Redirect to="/error/1" />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
