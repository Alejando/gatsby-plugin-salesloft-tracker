import React from 'react'
import {
  Col,
  Row,
  Button,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const UseCaseList = ({
  list,
}) => {
  return (
    <div className="use-case-list">
      {
        list.map((useCase, i) => (
          <Row className='use-case-container mb-5' key={i}>
            <Col>
              <img alt={useCase.name} src={useCase.imageSrc} className="img-fluid" />
              <em><small>{useCase.imageFooter}</small></em>
            </Col>
            <Col>
              <a href="#tbd"><h2 className="border-bottom pb-2">{ useCase.name }</h2></a>
              <p dangerouslySetInnerHTML={{ __html: useCase.descriptionHtml }} />
              <Button>Read More&nbsp;&nbsp;<FontAwesomeIcon icon='arrow-right'/></Button>
            </Col>
          </Row>
        ))
      }
    </div>
  );
};

export default UseCaseList;
