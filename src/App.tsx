import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import Products from './components/Products/Products';
import Pages from './components/Pages/Pages';

export default function App() {
  const baseServerUrl = 'https://dummyjson.com/products?limit=3';
  const [serverUrl, setServerUrl] = useState(baseServerUrl);

  function handleServerUrlChange(page: number) {
    setServerUrl(baseServerUrl + `&skip=${page}`);
  }

  return (
    <>
      <h1>Products List</h1>
      <Products serverUrl={serverUrl} />
      <Pages serverUrl={serverUrl} onServerUrlChange={handleServerUrlChange} />
    </>
  );
}
