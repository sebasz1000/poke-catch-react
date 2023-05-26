import { createRoot } from 'react-dom/client'
import { App } from './src/App'
import { FiltersContextProvider } from './src/context/filtersContextProvider'
import './style.css'

const root = createRoot(document.getElementById('app'))
root.render(
  <FiltersContextProvider >
    <App />
  </FiltersContextProvider>
)
