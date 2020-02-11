import React from 'react'
import { Row } from 'reactstrap'
import UseCase from './use_case'

const UseCaseList = ({data}) => (
  <Row className="mt-2">
    {
      data.map((use_case, index) => (
        <UseCase  data={use_case} align={index % 2 === 0 ? 'left':'right'}/>
      ))
     }
  </Row>
)


export default UseCaseList;