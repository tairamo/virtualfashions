import React from "react";

class ErrorBoundary extends React.Component {
  state = {
    hasError: false,
  };

  static getDerivedStateFromError(error) {
    console.warn("APP CRASHED", error);
  }

  componentDidCatch(error, errorInfo) {
    // TODO: register error o a log service
    console.warn("APP CRASHED", error, errorInfo);
  }

  render() {
    return this.props.children;
  }
}

export default ErrorBoundary;
