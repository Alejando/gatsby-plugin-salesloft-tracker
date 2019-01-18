import React from 'react'
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
} from 'reactstrap';

import { css } from 'emotion'

const Member = ({
  member: {
    name,
    title,
    imageSrc,
    descriptionHtml,
  }
}) => (
  <Card
    css={css`
    @media (min-width: 540px) {
      flex: 0 0 44% !important;
    }
    @media (min-width: 720px) {
      flex: 0 0 27% !important;
    }
    @media (min-width: 1200px) {
      flex: 0 0 22% !important;
    }
    box-shadow: 0 .5rem 1rem rgba(0,0,0,.15);
    &:hover{ box-shadow: 0 0 !important; }
    `}
    className="mb-5">
    <CardImg top width="100%" src={ imageSrc } alt={name} />
    <CardBody>
      <CardTitle className="text-center">{ name }</CardTitle>
      <CardSubtitle className="text-center font-weight-light mb-3">{ title }</CardSubtitle>
      <CardText tag="div" dangerouslySetInnerHTML={{  __html: descriptionHtml }} />
    </CardBody>
  </Card>
)

export default Member;
