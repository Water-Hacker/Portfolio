import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

window.addEventListener('error', (e) => {
  const el = document.getElementById('root')
  if (el && el.innerHTML === '') {
    el.innerHTML = `<div style="background:#050505;color:#ff6b6b;font-family:monospace;padding:2rem;min-height:100vh">
      <div style="color:#D4AF37;font-size:10px;letter-spacing:0.3em;margin-bottom:1rem">> RUNTIME ERROR DETECTED</div>
      <pre style="font-size:12px;white-space:pre-wrap;word-break:break-all">${e.message}\n\n${e.filename}:${e.lineno}</pre>
    </div>`
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
