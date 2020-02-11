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
  },
  executive = false
}) => (
  <Card
    css={css`
      @media (max-width: 769px) {
        flex: ${executive ? '1':'0'} 0 ${executive ? '50':'40'}% !important;
        margin-right: 15px;
        margin-left: 15px;
      }
      @media (min-width: 768px) {
        flex: 0 0 45.8% !important;
      }
      @media (min-width: 992px) {
        flex: 0 0 30.2% !important;
      }
      @media (min-width: 1200px) {
        flex: 0 0 ${executive ? '30.7':'22.3'}% !important;
      }
      box-shadow: 0 .5rem 1rem rgba(0,0,0,.15);
      &:hover{ box-shadow: 0 0 !important; }
    `}
    className="mb-5 d-block">
    <CardImg top width="100%" src={ imageSrc } alt={name} className={`${executive ? 'p-5':'p-4'}`}/>
    <CardBody className="pt-0">
      <CardTitle className="text-center">{ name }</CardTitle>
      <CardSubtitle className="text-center font-weight-light mb-3">{ title }</CardSubtitle>
      {
        executive && 
        <CardText tag="div" dangerouslySetInnerHTML={{ __html: descriptionHtml }} />
      }
    </CardBody>
  </Card>
)

export default Member;
