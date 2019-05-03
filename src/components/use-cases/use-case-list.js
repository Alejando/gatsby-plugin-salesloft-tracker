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
          <Row className='use-case-container mb-5' key={i}>
            <Col md="6" sm="12" className='text-center mb-3'>
              <div className=" position-relative">
                <img alt={useCase.name} src={useCase.imageSrc} className="img-fluid w-100" /><br/>
                <div 
                  css={css` 
                    position:absolute;
                    bottom:0;
                    margin:auto;
                    background-color:rgba(30,30,30,0.5);
                    color:white;
                    width: 100%;
                    opacity: 0;
                    -webkit-transition: all ease-in-out 0.25s;
                      -o-transition: all ease-in-out 0.25s;
                      transition: all ease-out-in 0.25s;
                    &:hover{
                      opacity: 1;
                    }

                  `}>
                  <p className="m-2"><small>{useCase.imageFooter}</small></p>
                </div>
              </div>
            </Col>
            <Col md="6"sm="12">
              <Link to={`/work/${slugify(useCase.name)}`} css={css` color:black; &:hover{ color: #c15050}`}>
                <h3 className="border-bottom pb-2  font-weight-normal">{ useCase.name }</h3>
              </Link>
              <p dangerouslySetInnerHTML={{ __html: useCase.descriptionHtml }} />
              <Link to={`/work/${slugify(useCase.name)}`} >
                <Button color="danger">Read More&nbsp;&nbsp;<FontAwesomeIcon icon='arrow-right'/></Button>
              </Link>
            </Col>
          </Row>
        ))
      }
    </div>
  );
};

export default UseCaseList;
