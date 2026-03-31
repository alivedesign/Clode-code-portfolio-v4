import { Component } from "react";
import type { ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    if (import.meta.env.DEV) {
      console.error("ErrorBoundary caught an error:", error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex h-dvh w-full flex-col items-center justify-center bg-black px-6 text-center">
          <h1 className="mb-4 text-3xl font-semibold text-white">
            Something went wrong
          </h1>
          <p className="mb-8 max-w-md text-[#999899]">
            An unexpected error occurred. Please try returning to the home page.
          </p>
          <a
            href="/"
            className="text-lg text-[#d77757] underline underline-offset-4 transition-opacity hover:opacity-80"
          >
            Back to Home
          </a>
        </div>
      );
    }

    return this.props.children;
  }
}
