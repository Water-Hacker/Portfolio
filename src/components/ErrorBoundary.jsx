import { Component } from 'react'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, info) {
    console.error('[PORTFOLIO ERROR]', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          background: '#050505',
          color: '#00E5FF',
          fontFamily: 'JetBrains Mono, monospace',
          padding: '2rem',
          minHeight: '100vh',
          boxSizing: 'border-box',
        }}>
          <div style={{ color: '#D4AF37', fontSize: '10px', letterSpacing: '0.3em', marginBottom: '1rem' }}>
            // SYSTEM ERROR — RENDER FAULT DETECTED
          </div>
          <pre style={{ fontSize: '12px', color: '#ff6b6b', whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
            {this.state.error?.message}
          </pre>
          <pre style={{ fontSize: '10px', color: '#e0e0e0', opacity: 0.4, marginTop: '1.5rem', whiteSpace: 'pre-wrap' }}>
            {this.state.error?.stack}
          </pre>
        </div>
      )
    }
    return this.props.children
  }
}
