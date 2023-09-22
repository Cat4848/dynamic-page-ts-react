import { useContext, useState } from 'react';
import { Product } from '../../types/types';
import { CommunicationContext } from '../context/CommunicationsProvider';
import Message from '../common/Message';
import ProductItem from '../ProductItem/ProductItem';
import SearchBar from '../SearchBar/SearchBar';
import { Filter } from '../Filter/Filter';
import { Container, Badge, Row, Col } from 'react-bootstrap';
import useFetch from '../../customHooks/useFetch';
import AddNewProduct from '../AddNewProduct/AddNewProduct';

interface ProductsProps {
  serverUrl: string;
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
  const { errorMessage, successMessage } = useContext(CommunicationContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [products, setProducts] = useFetch(serverUrl);

  function handleSearch(searchString: string) {
    setSearchTerm(searchString);
  }

  function handleFilter(filter: string) {
    setFilter(filter);
  }

  function handleCreateProduct(newProduct: Product) {
    setProducts([...products, newProduct]);
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
      <Container className="mb-3">
        <Row>
          <Col>
            <AddNewProduct onCreateProduct={handleCreateProduct} />
          </Col>
        </Row>
      </Container>
      <Container className="mb-5">
        <Row>
          <SearchBar input={searchTerm} onSearch={handleSearch} />
        </Row>
        Products displayed <Badge bg="success">{filteredProducts.length}</Badge>
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
