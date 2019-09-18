import React from 'react';
import { 
  Modal, 
  ModalHeader, 
  ModalBody,
  ModalFooter, 
  Button } from 'reactstrap';

const SuccessModal = ({toggle, title, body, show}) => {
  return (
    <div>
      <Modal isOpen={show} toggle={toggle} centered>
        <ModalHeader toggle={toggle}>{title} </ModalHeader>
        <ModalBody>
          {body}
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={toggle}>Close</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default SuccessModal;