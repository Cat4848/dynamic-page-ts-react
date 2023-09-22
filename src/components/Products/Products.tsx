import { useContext, useEffect, useState } from 'react';
import { Product } from '../../types/types';
import { CommunicationContext } from '../context/CommunicationsProvider';
import Message from '../common/Message';
import ProductItem from '../ProductItem/ProductItem';
import SearchBar from '../SearchBar/SearchBar';
import { Filter } from '../Filter/Filter';
import { Container, Badge, Row } from 'react-bootstrap';

interface ProductsProps {
  serverUrl: string;
}

interface APIResponse {
  limit: number;
  products: Product[];
  skip: number;
  total: number;
}

interface FilterMap {
  [key: string]: (product: Product) => boolean;
}

const filterMap: FilterMap = {
  all: (product: Product) => true,
  highRating: (product: Product) => product.rating >= 4.9,
  medRating: (product: Product) => product.rating >= 4.5,
  lowRating: (product: Product) => product.rating >= 4.2,
};

export default function Products({ serverUrl }: ProductsProps) {
  const { errorMessage, setErrorMessage, successMessage, setSuccessMessage } =
    useContext(CommunicationContext);
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');

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

  function handleSearch(searchString: string) {
    setSearchTerm(searchString);
  }

  function handleFilter(filter: string) {
    setFilter(filter);
  }

  const filteredProducts = products
    // the filter method below filters the products
    // according the user input from the SearchBar
    .filter((product) => {
      const searchRegExp = new RegExp(searchTerm, 'gi');
      return product.title.search(searchRegExp) >= 0 ? true : false;
    })
    // the filter method below filters the products
    // according to the filterMap object's value.
    // The filterMap object's value is selected according
    // to the user's selection in the filter bar
    // by modifying React State's value of the 'filter' variable
    .filter(filterMap[filter]);

  return (
    <>
      <Container className='mb-5'>
        <Row>
        <SearchBar input={searchTerm} onSearch={handleSearch} />
        </Row>
        Products displayed <Badge>{filteredProducts.length}</Badge>
      </Container>

      <Container className="mb-4">
        <Filter onFilter={handleFilter} />
      </Container>
      {filteredProducts.map((product) => (
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
