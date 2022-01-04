import React from 'react';

import { ErrorMessage } from '../ui/ErrorMessage/ErrorMessage';

export interface IErrorComponentProps {
  text?: string;
  description?: string;
}

export interface ErrorBoundaryProps {
  children: React.ReactNode;
  // FIX add error cmp
  // component: React.ComponentType<IErrorComponentProps>;
  renderError?: (props: IErrorComponentProps) => React.ReactNode;
}

export interface IErrorBoundaryState {
  error: any;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, IErrorBoundaryState> {
  state: IErrorBoundaryState = {
    error: null
  };

  static defaultProps = {
    component: ErrorMessage
  };

  componentDidUpdate(
    prevProps: { children: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined },
    prevState: any,
    snapshot: any
  ) {
    if (this.props.children !== prevProps.children) {
      this.setState({ error: null });
    }
  }

  static getDerivedStateFromError(error: any) {
    return { error };
  }

  render() {
    const { error } = this.state;
    const { children, renderError } = this.props;

    if (error) {
      const props = {
        text: 'Произошла ошибка',
        description: error.toString()
      };

      return null;

      // if (ErrorComponent) {
      //   return <ErrorComponent {...props} />;
      // } else if (renderError) {
      //   return renderError(props);
      // } else {
      //   return false;
      // }
    }

    return children;
  }
}
