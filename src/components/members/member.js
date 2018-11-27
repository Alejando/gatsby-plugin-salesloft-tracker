import React from 'react'
import {
  Col,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
} from 'reactstrap';

const Member = ({
  member: {
    name,
    title,
    imageSrc,
    descriptionHtml,
  }
}) => (
  <Col md="6" lg="3" className="mb-3">
    <Card>
      <CardImg top width="100%" src={ imageSrc } alt={name} />
      <CardBody>
        <CardTitle className="text-center">{ name }</CardTitle>
        <CardSubtitle className="text-center font-weight-light mb-3">{ title }</CardSubtitle>
        <CardText dangerouslySetInnerHTML={{  __html: descriptionHtml }} />
      </CardBody>
    </Card>
  </Col>
)

export default Member;
