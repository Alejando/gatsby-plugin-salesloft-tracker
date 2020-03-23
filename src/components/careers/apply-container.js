import React, { useState } from 'react';
import {
  Col,
  Row
} from 'reactstrap';
import ModalMessage from '../../components/success-modal'
import ApplyForm from './apply-form';

const ApplyContainer = ({
  careerSlug,
  success,
  successMessage
}) => {
  const [modal, setModal] = useState(false);
  const [resultMessage, setResultMessage] = useState('');
  const [resultTitle, setResultTitle] = useState('');

  return(
  <div>
    <ModalMessage
      show={ modal }
      toggle={ (value) => setModal(!value) }
      title={resultTitle}
      body={resultMessage}
      centered
      closeButtonText='Acept'
    />
    <Row>
      <Col lg={{ size:8, offset:2}} md={12} sm={12} xs={12}>
        <h3 className="text-center">Don’t see the position you’re interest in? Send us your contact info!</h3>
        <ApplyForm 
          careerSlug={careerSlug} 
          success={success} 
          setModal={(modalStatus) => {setModal(modalStatus)}} 
          setResultMessage={(message) => {setResultMessage(message)}} 
          successMessage={successMessage}
          setResultTitle={(title) => {setResultTitle(title)}}/>
      </Col>
    </Row>
  </div>
  );
}

export default ApplyContainer;
