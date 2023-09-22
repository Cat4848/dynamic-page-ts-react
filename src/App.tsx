import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import Products from './components/Products/Products';

export default function App() {
  const [serverUrl, setServerUrl] = useState(
    'https://dummyjson.com/products?limit=2',
  );

  return (
    <>
      <h1>Products List</h1>
      <Products serverUrl={serverUrl} />
    </>
  );
}
