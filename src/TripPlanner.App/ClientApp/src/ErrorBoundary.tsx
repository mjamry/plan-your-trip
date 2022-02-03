/* eslint-disable react/destructuring-assignment */
import React from 'react';
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
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    this.logger.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
