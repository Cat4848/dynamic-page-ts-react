import { useEffect, useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

interface CommunicationMessage {
  success?: string;
  error?: string;
}

export default function Message({ success, error }: CommunicationMessage) {
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(success ? true : false);

  useEffect(() => {
    if (error) {
      setIsError(true);
    }
  }, [error]);

  useEffect(() => {
    if (success) {
      setIsSuccess(true);
      const timeOutId = setTimeout(() => {
        setIsSuccess(false);
      }, 2000);
      return () => clearTimeout(timeOutId);
    }
  }, [success]);

  const errorTemplate = (
    <Alert show={isError} variant="danger">
      <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
      <p>{error}</p>
      <hr />
      <div className="d-flex justify-content-end">
        <Button variant="outline-danger" onClick={() => setIsError(false)}>
          Close
        </Button>
      </div>
    </Alert>
  );

  const successTemplate = (
    <Alert show={isSuccess} variant="success">
      <Alert.Heading>Success</Alert.Heading>
      <p>{success}</p>
    </Alert>
  );

  return (
    <h6>
      {isError && errorTemplate}
      {isSuccess && successTemplate}
    </h6>
  );
}
