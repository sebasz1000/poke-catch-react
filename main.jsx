import { createRoot } from 'react-dom/client'
import { App } from './src/App'
import { FiltersContextProvider } from './src/context/filtersContextProvider'
import './style.css'
import { CartContextProvider } from './src/context/CartContextProvider'

const root = createRoot(document.getElementById('app'))
root.render(
  <FiltersContextProvider >
    <CartContextProvider >
      <App />
    </CartContextProvider>
  </FiltersContextProvider>
)
