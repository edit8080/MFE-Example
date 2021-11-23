import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import MainPage from './MainPage'
import SubPage from './SubPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/subPage" element={<SubPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
