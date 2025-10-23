import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import { AppRoutes } from './routes'

import './index.css'

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
)
