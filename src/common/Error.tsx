import { Component, ErrorInfo } from "react";
import { ErrorBoundaryProps, ErrorBoundaryState } from "../types/errors";

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // You can log the error to an external service here
    console.error("Error caught in Error Boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Render fallback UI when an error is caught
      return (
        <h2 className="text-lightBeige text-3xl text-center">
          Something went wrong.
        </h2>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
