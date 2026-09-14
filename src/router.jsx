import { createBrowserRouter } from 'react-router';
import { App } from './App.jsx';
import { Home } from "./pages/Home/Home";
import { Shop } from "./pages/Shop/Shop";
import { Cart } from "./pages/Cart/Cart";
import { Checkout } from './pages/Checkout/Checkout';
import { ErrorView } from './components/ErrorView/ErrorView';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'shop', element: <Shop /> },
      { path: 'cart', element: <Cart /> },
      { path: 'checkout', element: <Checkout />},
      {
        path: '*',
        element: (
          <ErrorView 
            title="Page Not Found"
            message="The page you are looking for doesn't exist or has been moved."
          />
        ),
      },
    ],
  },
]);
