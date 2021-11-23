import React, { lazy, Suspense } from 'react'
import ReactDOM from 'react-dom'

const App = lazy(() => import('router/App'))

ReactDOM.render(
  <React.StrictMode>
    <Suspense fallback={<div>로딩중...</div>}>
      <App />
    </Suspense>
  </React.StrictMode>,
  document.getElementById('root'),
)
