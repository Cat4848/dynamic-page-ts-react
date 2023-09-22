import { useState } from 'react';
import {
  Badge,
  Container,
  Row,
  Col,
  Button,
  Form,
  Stack,
} from 'react-bootstrap';
import { Product } from '../../types/types';
import { Formik } from 'formik';
import { object, string, number } from 'yup';

interface ProductItemProps {
  product: Product;
  onEditProduct: (product: Product) => void;
}
export default function ProductItem({
  product,
  onEditProduct,
}: ProductItemProps) {
  const { id, title, rating, description, thumbnail } = product;
  const [isEditing, setIsEditing] = useState(false);

  const initialValues: Product = {
    id: id,
    title: title,
    rating: rating,
    description: description,
    thumbnail: thumbnail,
  };

  const productSchema = object().shape({
    title: string().required('Your product needs a title'),
    rating: number()
      .required('Your product needs a rating')
      .positive('Positive numbers only'),
    description: string().required('Please add description'),
    thumbnail: string()
      .required('Your product needs a picture link')
      .url('Must be a valid URL'),
  });

  let productContent: JSX.Element;

  if (isEditing) {
    productContent = (
      <Formik
        initialValues={initialValues}
        onSubmit={(editedProduct: Product) => {
          onEditProduct(editedProduct);
          setIsEditing(false);
        }}
        validationSchema={productSchema}
      >
        {({ handleSubmit, handleChange, touched, values, errors }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Stack gap={3} className="mb-5">
              <Form.Group>
                <Form.Label>Product Title</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={values.title}
                  onChange={handleChange}
                  isValid={touched.title && !errors.title}
                  isInvalid={!!errors.title}
                ></Form.Control>
                <Form.Control.Feedback
                  type={errors.title ? 'invalid' : 'valid'}
                >
                  {errors.title ? errors.title : 'Looks Good!'}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group>
                <Form.Label>Rating</Form.Label>
                <Form.Control
                  type="number"
                  name="rating"
                  value={values.rating}
                  onChange={handleChange}
                  isValid={touched.rating && !errors.rating}
                  isInvalid={!!errors.rating}
                ></Form.Control>
                <Form.Control.Feedback
                  type={errors.rating ? 'invalid' : 'valid'}
                >
                  {errors.rating ? errors.rating : 'Looks Good!'}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  type="text"
                  name="description"
                  value={values.description}
                  onChange={handleChange}
                  isValid={touched.description && !errors.description}
                  isInvalid={!!errors.description}
                ></Form.Control>
                <Form.Control.Feedback
                  type={errors.description ? 'invalid' : 'valid'}
                >
                  {errors.description ? errors.description : 'Looks Good!'}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group>
                <Form.Label>Picture Link</Form.Label>
                <Form.Control
                  type="text"
                  name="thumbnail"
                  value={values.thumbnail}
                  onChange={handleChange}
                  isValid={touched.thumbnail && !errors.thumbnail}
                  isInvalid={!!errors.thumbnail}
                ></Form.Control>
                <Form.Control.Feedback
                  type={errors.thumbnail ? 'invalid' : 'valid'}
                >
                  {errors.thumbnail ? errors.thumbnail : 'Looks Good!'}
                </Form.Control.Feedback>
              </Form.Group>
              <Button type="submit" variant="dark">
                Save
              </Button>
              <hr />
            </Stack>
          </Form>
        )}
      </Formik>
    );
  } else {
    productContent = (
      <Container>
        <Row xs="auto">
          <Col className="fw-bold">Product id:</Col>
          <Col>{id}</Col>
          <Col>
            <Badge>Rating {rating}</Badge>
          </Col>
          <Col>
            <Button variant="secondary" onClick={() => setIsEditing(true)}>
              Edit
            </Button>
          </Col>
        </Row>

        <Row xs="auto">
          <Col className="fw-bold">Title:</Col>
          <Col>{title}</Col>
        </Row>

        <Row xs="auto">
          <Col className="fw-bold">Description:</Col>
          <Col>{description}</Col>
        </Row>

        <Row xs="auto">
          <Col>{<img src={thumbnail} alt={title} />}</Col>
        </Row>
        <hr />
      </Container>
    );
  }

  return productContent;
}
