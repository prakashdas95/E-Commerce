import React from 'react';
import { ErrorImageContainer, ErrorImageOverlay, ErrorImageText } from "./error-boundary.styles";

class ErrorBoundary extends React.Component {

    constructor() {
        super();

        this.state = {
            hasErrored: false
        }
    }

    // this(getDerivedStateFromError) lifecycle method essentialy catches any error 
    // that gets thrown in any of the children of this error boundary component.
    static getDerivedStateFromError(error) {
        // process the error 
        return { hasErrored: true };
    }

    // second lifecycle method we actually have access to that 
    // lets react know that this component is a error boundary component
    componentDidCatch(error, info) {
        console.log(error);
    }

    render() {
        if (this.state.hasErrored) {
            return (
                <ErrorImageOverlay>
                    <ErrorImageContainer imageUrl='https://i.imgur.com/yW2W9SC.png' />
                    <ErrorImageText>Sorry this page is broken</ErrorImageText>
                </ErrorImageOverlay>
            )
        }

        return this.props.children;
    }
}

export default ErrorBoundary;