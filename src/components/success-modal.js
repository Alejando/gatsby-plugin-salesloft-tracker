import React from 'react';
import { 
  Modal, 
  ModalHeader, 
  ModalBody,
  ModalFooter, 
  Button } from 'reactstrap';

const SuccessModal = ({toggle, title, body, show, centered=false, closeButtonText}) => {
  return (
    <div>
      <Modal isOpen={show} toggle={toggle} centered={centered}>
        <ModalHeader toggle={toggle}>{title} </ModalHeader>
        <ModalBody dangerouslySetInnerHTML={{ __html: body }}>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={toggle}>{closeButtonText}</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default SuccessModal;