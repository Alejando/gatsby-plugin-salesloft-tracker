import React from 'react'
import Helmet from 'react-helmet'
import { defaults } from 'lodash'
import { withPrefix } from 'gatsby'

import image from '../images/kid-build-density-840b16a36986a010aa844b39b4d63897032ca2092715aecce9cf06fbb23ce3fa.jpg'


const favicon = withPrefix('/images/favicon.png')
const msIcon = withPrefix('/images/ms-icon.png')

export const defaultMeta = {
  keywords: 'Densitylabs, density labs, development web apps, development mobile apps, software development companies in mexico, Software Development Company, web development company, mobile app development, startup project management, software development for startups, ruby on rails development, ruby on rails development company, ROR development services, ruby on rails web development company, Ruby on Rails Development Services, Ruby on Rails Software Development, software product development, software development company Mexico',
  url: 'https://densitylabs.io',
  openGraphTitle: 'Software Engineering Company | DensityLabs',
  description: 'We build stunning web and mobile applications. Density Labs is a small team of elite engineers that builds successful web and mobile applications.',
  image,
  msIcon,
  favicon,
  type: 'Page',
  baseUrl: 'https://densitylabs.io',
}

const SiteMeta = ({
  title,
  siteMeta = {},
}) => {
  const m = defaults({ ...siteMeta }, defaultMeta, { title })
  return (
    <Helmet>
      <title>{`${m.title}${m.subtitle ? ` | ${m.subtitle}` : ''}`}</title>
      <meta name="msapplication-TileImage" content={m.msIcon} />
      <link rel="shortcut" href={m.favicon} />
      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta name="theme-color" content="#ffffff" />
      <meta name="keywords" content={m.keywords} />
      <meta name="description" content={m.description} />
      <meta property="og:url" content={m.path ? `${m.baseUrl}${m.path}` : m.url } />
      <meta property="og:title" content={m.openGraphTitle} />
      <meta property="og:description" content={m.description} />
      <meta property="og:image" content={m.image} />
      <meta property="og:type" content={m.type}/>
    </Helmet>
  )
}

export default SiteMeta
