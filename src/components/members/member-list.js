import React from 'react'
import {
  CardDeck,
} from 'reactstrap';
import Member from './member';

const MemberList = ({
  title,
  members,
}) => (
  <>
    <h3>{ title }</h3>
    <CardDeck>
      {
        members.map((member, i) => <Member key={i} member={member} />)
      }
    </CardDeck>
  </>
)

export default MemberList;
