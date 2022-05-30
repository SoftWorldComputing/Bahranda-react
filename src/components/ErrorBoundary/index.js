import React from 'react';
export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: '' };
  }

  static getDerivedStateFromError(error) {    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {  // You can also log the error to an error reporting service
    // logErrorToMyService(error, errorInfo); //a function call to an error-reporting service
    this.setState({ error, errorInfo, hasError: true })
  }
  render() {
    if (this.state.hasError) {  // You can render any custom fallback UI 
      return (
        <div>
          <h1>Something went wrong.</h1>
          <p>{this.state.error}, errorInfo: {this.state.errorInfo}</p>
        </div>
      )
    }
    return this.props.children; 
  }
}
