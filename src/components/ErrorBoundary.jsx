import React from 'react';

// Sovereign Architecture: Error Boundary Component
// This component is used to catch JavaScript errors in child components
// and display a fallback UI instead of crashing the entire app.
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI
        return { hasError: true };
    }

    componentDidCatch(error, info) {
        // You can also log the error to an error reporting service
        console.error('Error caught by Error Boundary:', error, info);
    }

    render() {
        if (this.state.hasError) {
            // Render fallback UI
            return <h1>Something went wrong.</h1>;
        }

        return this.props.children; 
    }
}

export default ErrorBoundary;