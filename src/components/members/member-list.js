import React from 'react'
import {
  Row,
} from 'reactstrap';
import Member from './member';

const MemberList = ({
  title,
  members,
}) => (
  <>
    <h3>{ title }</h3>
    <Row>
      {
        members.map((member, i) => <Member key={i} member={member} />)
      }
    </Row>
  </>
)

export default MemberList;
