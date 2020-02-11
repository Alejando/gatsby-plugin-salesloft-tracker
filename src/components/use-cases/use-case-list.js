import React from 'react'
import {
  Col,
  Row,
  Button,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'gatsby'
import { slugify } from '../../lib/url-utils';
import { css } from 'emotion'

const UseCaseList = ({
  list,
}) => {
  return (
    <div className="use-case-list">
      {
        list.map((useCase, i) => (
          <Row className='use-case-container my-5' key={i}>
            <Col md="3" xs="6" className='d-flex align-items-center justify-content-center mx-auto'>
              <img alt={useCase.name} src={useCase.logo} className="w-75"/>
            </Col>
            <Col md="9"sm="12">
              <Link to={`/use-cases/${slugify(useCase.name)}`} css={css` color:black; &:hover{ color: #c15050}`}>
                <h3 className="border-bottom pb-2  font-weight-normal">{ useCase.name }</h3>
              </Link>
              <div>{useCase.imageFooter}</div>
              <Link to={`/use-cases/${slugify(useCase.name)}`} >
                <Button color="danger" className="mt-4">Read More&nbsp;&nbsp;<FontAwesomeIcon icon='arrow-right'/></Button>
              </Link>
            </Col>
          </Row>
        ))
      }
    </div>
  );
};

export default UseCaseList;
