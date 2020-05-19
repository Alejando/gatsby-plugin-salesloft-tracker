import React from 'react'
import { css } from 'emotion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const LocationInfoList = ({
  locations = [],
}) => {
  console.log(locations)
  return (
    <div>
      {locations.map(location => (
        <ul key={location.title}
          className="border-bottom pb-3 pl-0"
          css={css`
            list-style: none;
            li {
              display: flex;
              flex-direction: row;
              margin-bottom: 0.5rem;
            }
            li > svg {
              margin-right: 1rem;
              margin-top: 4px;
            }
          `}
        > 
          <li>
          <h4>{location.title}</h4>
          </li>
          {
            location.phone &&
            <li>
            <FontAwesomeIcon icon={["fas", "phone"]} />
            <a css={css`color: #51565C; &:hover{ color: #51565C;}`} href={`tel:${location.phone}`}>{ location.phone }</a>
          </li>
          }
          {
            location.email &&
            <li>
              <FontAwesomeIcon icon={["fas", "envelope"]} />
              <a css={css`color: #A31929; &:hover{ color: #A31929;}`} href={`mailto:${location.email}`}>{ location.email }</a>
            </li>
          }
        </ul>
      ))}
    </div>
  )
}

export default LocationInfoList
