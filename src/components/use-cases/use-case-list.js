import React from 'react'
import {
  Col,
  Row,
  Button,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'gatsby'
import { slugify } from '../../lib/url-utils';

const UseCaseList = ({
  list,
}) => {
  return (
    <div className="use-case-list">
      {
        list.map((useCase, i) => (
          <Row className='use-case-container mb-5' key={i}>
            <Col className='text-center'>
              <img alt={useCase.name} src={useCase.imageSrc} className="img-fluid" /><br/>
              <em><small>{useCase.imageFooter}</small></em>
            </Col>
            <Col>
              <Link to={`/work/${slugify(useCase.name)}`}>
                <h2 className="border-bottom pb-2">{ useCase.name }</h2>
              </Link>
              <p dangerouslySetInnerHTML={{ __html: useCase.descriptionHtml }} />
              <Link to={`/work/${slugify(useCase.name)}`}>
                <Button color="primary">Read More&nbsp;&nbsp;<FontAwesomeIcon icon='arrow-right'/></Button>
              </Link>
            </Col>
          </Row>
        ))
      }
    </div>
  );
};

export default UseCaseList;
