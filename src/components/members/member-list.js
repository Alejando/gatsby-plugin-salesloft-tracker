import React from 'react'
import {
  CardDeck,
} from 'reactstrap';
import Member from './member';
import { css } from 'emotion'

const MemberList = ({
  title,
  members,
  executive = false
}) => (
  <>
    <h3 className="mb-4">{ title }</h3>
    <CardDeck css={css`
        flex-flow: row wrap !important;
        margin-right: -15px;
        margin-left: -15px;
      `}
    >
      {
        members.map((member, i) => < Member 
          key={i} 
          member={member}  
          executive={executive}
        />)
      }
    </CardDeck>
  </>
)

export default MemberList;