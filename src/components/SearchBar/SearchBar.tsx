import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Container from 'react-bootstrap/Container';

interface SearchBarProps {
  input: string;
  onSearch: (searchString: string) => void;
}

export default function SearchBar({ input, onSearch }: SearchBarProps) {
  return (
    <Container className='mb-2'>
      <InputGroup>
        <InputGroup.Text>Search Products</InputGroup.Text>
        <Form.Control
          value={input}
          onChange={(e) => onSearch(e.target.value)}
        ></Form.Control>
      </InputGroup>
    </Container>
  );
}
