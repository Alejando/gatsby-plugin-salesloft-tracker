import React from 'react'

import {
	Row,
	Col,
} from 'reactstrap'
import SocialData from '../../data/social_networks.json'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { css } from 'emotion'

const Footer = () => (
	<Row
		className='pt-3'
		css={css`background: #f5f5f5; color: #999999; border-top: 1px solid #eaeaea;`}
	>
		<Col xs='12' className='mt-2 d-flex justify-content-center'>
			<p className="mb-0" >
				Follow us
			</p>
		</Col>
		<Col xs='12' className='mt-0 d-flex justify-content-center'>
			<ul className="list-inline">
				{
					SocialData.map((socialDetails) => (
						<li className="list-inline-item" >
							<a
								href={socialDetails.url}
								target="_blanK"
								rel="noopener noreferrer"
								className='btn border rounded-circle'
								css={css`color: #cdcdcd; background: #fff; &:hover{color: #fff; background: ${socialDetails.hoverBg} }`}
								>
								<FontAwesomeIcon icon={["fab", socialDetails.icon]}  />
							</a>
						</li>
					))
				}
			</ul>
		</Col>
		<Col xs='12' className='mb-5 d-flex justify-content-center'>
			Copyright { '© ' + new Date().getFullYear() } Density Labs LLC. All Rights Reserved
		</Col>
	</Row>
)

export default Footer
