import React, { useState } from 'react';
import { css } from 'emotion'
import {
  Col,
  Modal, 
  ModalHeader, 
  ModalBody } from 'reactstrap';
import ApplyForm from './apply-form'
import ModalMessage from '../../components/success-modal'

const ApplyToCareer = ({
  toggle,  
  show,
  careerSlug,
  careerName,
  success ,
  successMessage
}) => {

  const [modal, setModal] = useState(false);
  const [resultMessage, setResultMessage] = useState('');
  const [resultTitle, setResultTitle] = useState('');

  return (
    <div>
      <ModalMessage 
        show={ modal }
        toggle={ (value) => setModal(!value) }
        title={resultTitle}
        body={resultMessage}
        centered
        closeButtonText='Acept'
      />
      <Modal isOpen={show} toggle={toggle} centered={true} size="lg"
        css={ css`
          @media (max-height: 823px) {
            top: 5%;
          }

          @media (max-height: 736px) {
            top: 12%;
          }

          @media (max-height: 568px) {
            top: 15%;
          }
        `}
      >
        <ModalHeader toggle={toggle}>
          <Col md={12} className="text-uppercase text-muted">
            Join our team as a <span className="font-weight-bold text-dark">{careerName}</span>
          </Col>
        </ModalHeader>
        <ModalBody>
          <ApplyForm
            careerSlug={careerSlug}
            success={success}
            setModal={(modalStatus) => {setModal(modalStatus)}}
            setResultMessage={(message) => {setResultMessage(message)}}
            setResultTitle={(title) => {setResultTitle(title)}}
            successMessage={successMessage}
            noCareer={false}
          />
        </ModalBody>
      </Modal>
    </div>
  );
}

export default ApplyToCareer;
