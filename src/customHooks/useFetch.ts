import {
  useState,
  useEffect,
  useContext,
  Dispatch,
  SetStateAction,
} from 'react';
import { Product } from '../types/types';
import { CommunicationContext } from '../components/context/CommunicationsProvider';

interface APIResponse {
  limit: number;
  products: Product[];
  skip: number;
  total: number;
}

export default function useFetch(
  serverUrl: string,
): [Product[], Dispatch<SetStateAction<Product[]>>] {
  const [products, setProducts] = useState<Product[]>([]);
  const { setErrorMessage, setSuccessMessage } =
    useContext(CommunicationContext);

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

  return [products, setProducts];
}
