import React from 'react'

import {
	Row,
	Col,
	Container,
} from 'reactstrap'
import SocialData from '../../data/social_networks.json'
import SocialDataIcon from './icon/social-data-icon.js';

import { css } from 'emotion'

const Footer = () => (
	<Container fluid>
	<Row
		className='pt-3'
		css={css`background: #f5f5f5; color: #4F4F4F; border-top: 1px solid #eaeaea;`}
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
						<li className="list-inline-item" key={socialDetails.icon} >
							<SocialDataIcon socialDetails={socialDetails} />
						</li>
					))
				}
			</ul>
		</Col>
		<Col xs='12' className='mb-5 d-flex justify-content-center'>
			Copyright { '© ' + new Date().getFullYear() } Density Labs LLC. All Rights Reserved
		</Col>
	</Row>
	</Container>
)

export default Footer
