import React from 'react'
import {
  Col,
} from 'reactstrap';
import FeaturedIcon from '../icon/featured-icon'

const Characteristic = ({
  icon,
  circleBgColor,
  title,
  descriptionHtml,
}) => (
  <Col md="5" className="bg-white m-4 shadow rounded" >
    <Col sm="12" className="text-center my-3 ">
      <FeaturedIcon icon={icon} size="100" color={'#' + circleBgColor}/>
      <h3 className="p-4">{title}</h3>
      <div className="dropdown-divider"/>
      <div 
        className="p-3 text-justify"
        dangerouslySetInnerHTML={{ __html: descriptionHtml }}
      />
    </Col>
  </Col>
)

export default Characteristic