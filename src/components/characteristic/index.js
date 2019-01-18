import React from 'react'
import {
  Col,
  Jumbotron,
} from 'reactstrap';
import FeaturedIcon from '../icon/featured-icon'
import {css} from 'emotion'
 
const Characteristic = ({
  icon,
  circleBgColor,
  title,
  descriptionHtml,
}) => (
  <Col md="6" className=" rounded  my-3 text-center" >
      <Jumbotron className="shadow h-100 bg-white pb-0" css={css`&:hover{ box-shadow: 0 0 !important; }`} >
        <FeaturedIcon icon={icon} size="3" color={'#' + circleBgColor}/>
        <h3 className="p-4">{title}</h3>
        <div className="dropdown-divider"/>
        <div 
          className="p-3 text-justify"
          dangerouslySetInnerHTML={{ __html: descriptionHtml }}
        />
      </Jumbotron>
  </Col>
)

export default Characteristic