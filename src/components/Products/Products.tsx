import { useContext, useEffect, useState } from 'react';
import { Product } from '../../types/types';
import { CommunicationContext } from '../context/CommunicationsProvider';
import Message from '../common/Message';
import ProductItem from '../ProductItem/ProductItem';

interface ProductsProps {
  serverUrl: string;
}

interface APIResponse {
  limit: number;
  products: Product[];
  skip: number;
  total: 100;
}

export default function Products({ serverUrl }: ProductsProps) {
  const { errorMessage, setErrorMessage, successMessage, setSuccessMessage } =
    useContext(CommunicationContext);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const productsRequest = await fetch(serverUrl);
        const productsResponse: APIResponse = await productsRequest.json();
        if (productsResponse === null) {
          throw new Error('Products list empty');
        }
        setProducts(productsResponse.products);
        setSuccessMessage('Products loaded successfully');
      } catch (e) {
        if (e instanceof Error) {
          setErrorMessage(e.message);
        }
      }
    })();
  }, [serverUrl, setErrorMessage, setSuccessMessage]);
  console.log('products', products);

  return (
    <>
      {products.map((product) => (
        <ProductItem
          key={product.id}
          id={product.id}
          title={product.title}
          rating={product.rating}
          description={product.description}
          thumbnail={product.thumbnail}
        />
      ))}
      <Message error={errorMessage} success={successMessage} />
    </>
  );
}
