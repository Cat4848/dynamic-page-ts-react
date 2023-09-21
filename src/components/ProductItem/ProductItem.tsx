import { Badge, Container, Row, Col } from 'react-bootstrap';
import { Product } from '../../types/types';

export default function ProductItem({
  id,
  title,
  rating,
  description,
  thumbnail,
}: Product) {
  return (
    <Container>
      <Row xs="auto">
        <Col className="fw-bold">Product id:</Col>
        <Col>{id}</Col>

        <Col>
          <Badge>Rating {rating}</Badge>
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
      <hr/>
    </Container>
  );
}
