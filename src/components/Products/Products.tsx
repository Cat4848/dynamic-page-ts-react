import { useContext, useEffect, useState } from 'react';
import { Product } from '../../types/types';
import { CommunicationContext } from '../context/CommunicationsProvider';
import Message from '../common/Message';
import ProductItem from '../ProductItem/ProductItem';
import SearchBar from '../SearchBar/SearchBar';
import { Filter } from '../Filter/Filter';
import { Container, Badge, Row } from 'react-bootstrap';
import AddNewProduct from '../AddNewProduct/AddNewProduct';
import useFetch from '../../customHooks/useFetch';

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
  const { setErrorMessage } = useContext(CommunicationContext);
  const [products, setProducts] = useFetch(serverUrl);

  useEffect(() => {
    if (isInLocalStorage()) {
      const load = localStorage.getItem('products');
      if (load === null) {
        setErrorMessage('Local Storage products load error');
      } else {
        const loadedLocalStorageProducts: Product[] = JSON.parse(load);
        setProducts(loadedLocalStorageProducts);
      }
    }
  }, [setErrorMessage, setProducts]);

  function isInLocalStorage() {
    if (localStorage.getItem('products') === null) return false;
    else return true;
  }

  function updateLocalStorage() {
    localStorage.setItem('products', JSON.stringify(products));
  }

  function handleSearch(searchString: string) {
    setSearchTerm(searchString);
  }

  function handleFilter(filter: string) {
    setFilter(filter);
  }

  function handleCreateProduct(newProduct: Product) {
    setProducts([...products, newProduct]);
    updateLocalStorage();
  }

  function handleEditProduct(editedProduct: Product) {
    const updatedProducts = products.map((product) => {
      if (product.id === editedProduct.id) {
        return editedProduct;
      }
      return product;
    });
    setProducts(updatedProducts);
    updateLocalStorage();
  }

  function handleDeleteProduct(deletedProductId: number) {
    const updatedProducts = products.filter(
      (product) => product.id !== deletedProductId,
    );
    setProducts(updatedProducts);
    updateLocalStorage();
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
      <Message error={errorMessage} success={successMessage} />

      <Container className="mb-3">
        <AddNewProduct onCreateProduct={handleCreateProduct} />
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
          product={product}
          onEditProduct={handleEditProduct}
          onDeleteProduct={handleDeleteProduct}
        />
      ))}
    </>
  );
}
