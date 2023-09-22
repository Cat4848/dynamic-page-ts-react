import { useState } from 'react';
import { Modal, Button, Form, Stack } from 'react-bootstrap';
import { Formik } from 'formik';
import { object, string, number } from 'yup';
import { Product } from '../../types/types';

interface AddNewProductProps {
  onCreateProduct: (product: Product) => void;
}

export default function AddNewProduct({ onCreateProduct }: AddNewProductProps) {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const initialValues: Product = {
    id: 0,
    title: '',
    rating: 0,
    description: '',
    thumbnail: '',
  };

  const productSchema = object().shape({
    id: number()
      .required('A number is required')
      .positive('Positive numbers only')
      .integer('Only whole numbers please'),
    title: string().required('Your product needs a title'),
    rating: number()
      .required('Your product needs a rating')
      .positive('Positive numbers only')
      .integer('Only whole numbers please'),
    description: string().required('Please add description'),
    thumbnail: string()
      .required('Your product needs a picture link')
      .url('Must be a valid URL'),
  });

  function handleAddNewProduct(newProduct: Product) {
    onCreateProduct(newProduct);
    handleClose();
  }

  return (
    <>
      <Button onClick={handleShow}>Add Product</Button>

      <Modal show={show}>
        <Modal.Header>
          <Modal.Title>Add New Product</Modal.Title>
        </Modal.Header>

        <Formik
          initialValues={initialValues}
          onSubmit={handleAddNewProduct}
          validationSchema={productSchema}
        >
          {({ handleSubmit, handleChange, touched, values, errors }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <Modal.Body>
                <Stack gap={3}>
                  <Form.Group>
                    <Form.Label>Product Id</Form.Label>
                    <Form.Control
                      type="number"
                      name="id"
                      value={values.id}
                      onChange={handleChange}
                      isValid={touched.id && !errors.id}
                      isInvalid={!!errors.id}
                    ></Form.Control>
                    <Form.Control.Feedback
                      type={errors.id ? 'invalid' : 'valid'}
                    >
                      {errors.id ? errors.id : 'Looks Good!'}
                    </Form.Control.Feedback>
                  </Form.Group>

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
                </Stack>
              </Modal.Body>

              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button type="submit">Save</Button>
              </Modal.Footer>
            </Form>
          )}
        </Formik>
      </Modal>
    </>
  );
}
