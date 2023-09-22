import { useState } from 'react';
import { Container, Pagination } from 'react-bootstrap';

interface PaginationProps {
  serverUrl: string;
  onServerUrlChange: (page: number) => void;
}

export default function Pages({ onServerUrlChange }: PaginationProps) {
  const [activePage, setActivePage] = useState(1);
  function handlePageClick(page: number, skip: number) {
    onServerUrlChange(skip);
    setActivePage(page);
  }
  return (
    <Container>
      <Pagination>
        <Pagination.Item
          active={activePage === 1}
          onClick={() => handlePageClick(1, 0)}
        >
          1
        </Pagination.Item>
        <Pagination.Item
          active={activePage === 2}
          onClick={() => handlePageClick(2, 3)}
        >
          2
        </Pagination.Item>
        <Pagination.Item
          active={activePage === 3}
          onClick={() => handlePageClick(3, 6)}
        >
          3
        </Pagination.Item>
        <Pagination.Item
          active={activePage === 4}
          onClick={() => handlePageClick(4, 9)}
        >
          4
        </Pagination.Item>
      </Pagination>
    </Container>
  );
}
