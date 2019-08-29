import React from 'react'
import { css } from 'emotion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import SocialDataIcon from '../icon/social-data-icon'


const LocationList = ({
  locations = [],
}) => {
  return (
    <div>
      {locations.map(location => (
        <ul key={location.address}
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
            <FontAwesomeIcon icon={["fas", "home"]} />
            <div dangerouslySetInnerHTML={{ __html: location.address }} />
          </li>
          <li>
            <FontAwesomeIcon icon={["fas", "phone"]} />
            <a css={css`color: #51565C; &:hover{ color: #51565C;}`} href={`tel:${location.phone}`}>{ location.phone }</a>
          </li>
          <li>
            <FontAwesomeIcon icon={["fas", "envelope"]} />
            <a css={css`color: #A31929; &:hover{ color: #A31929;}`} href={`mailto:${location.email}`}>{ location.email }</a>
          </li>
          <li>
            {
              location.social.map((socialDetails) => (
                <span key={socialDetails.icon}>
                  <SocialDataIcon key={socialDetails.icon} socialDetails={socialDetails} />
                  &nbsp;
                </span>
              ))
            }
          </li>
        </ul>
      ))}
    </div>
  )
}

export default LocationList
