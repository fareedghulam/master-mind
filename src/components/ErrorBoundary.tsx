import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("App Render Error:", error, info);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white p-6 text-center">
          <div>
            <h2 className="text-xl font-bold text-amber-400 mb-4">
              عارضی مسئلہ آگیا
            </h2>
            <p className="mb-4 text-sm">
              براہ کرم دوبارہ کوشش کریں۔
            </p>
            <button
              onClick={this.handleReload}
              className="bg-amber-500 text-slate-950 px-5 py-2 rounded-xl font-bold"
            >
              دوبارہ کوشش کریں
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
