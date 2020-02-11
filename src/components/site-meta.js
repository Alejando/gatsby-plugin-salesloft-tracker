import React from 'react'
import Helmet from 'react-helmet'
import { defaults } from 'lodash'
import { withPrefix } from 'gatsby'

import image from '../images/main_banner.jpg'


const favicon = withPrefix('/images/favicon.png')
const msIcon = withPrefix('/images/ms-icon.png')

export const defaultMeta = {
  keywords: 'Densitylabs, density labs, development web apps, development mobile apps, software development companies in mexico, Software Development Company, web development company, mobile app development, startup project management, software development for startups, ruby on rails development, ruby on rails development company, ROR development services, ruby on rails web development company, Ruby on Rails Development Services, Ruby on Rails Software Development, software product development, software development company Mexico',
  openGraphTitle: 'Software Engineering Company | DensityLabs',
  description: 'We build stunning web and mobile applications. Density Labs is a software development firm serving organizations to accelerate web, mobile, and SaaS application development',
  image,
  msIcon,
  favicon,
  type: 'website',
  twitterAccount: '@densitylabs'
}

const SiteMeta = ({
  title,
  baseUrl,
  siteMeta = {},
}) => {
  const m = defaults({ ...siteMeta }, { baseUrl, url: baseUrl }, defaultMeta, { title })
  const fullUrl = m.path ? `${m.baseUrl}${m.path}` : m.url
  return (
    <Helmet>
      <title>{`${m.title}${m.subtitle ? ` | ${m.subtitle}` : ''}`}</title>
      <meta name="description" content={m.description}/>
      <meta property="image" content={`${m.baseUrl}${m.image}`}/>
      <meta name="msapplication-TileImage" content={m.msIcon} />
      <link rel="shortcut icon" href={m.favicon}/>
      <link rel="canonical" href={fullUrl}/>
      <meta name="msapplication-TileColor" content="#ffffff"/>
      <meta name="theme-color" content="#ffffff"/>
      <meta name="keywords" content={m.keywords}/>
     
      <meta property="og:url" content={fullUrl}/>
      <meta property="og:title" content={m.openGraphTitle}/>
      <meta property="og:description" content={m.description} />
      <meta property="og:type" content={m.type}/>
      <meta property="og:image" content={`${m.baseUrl}${m.image}`}/>
      <meta property="og:image:secure_url" content={`${m.baseUrl}${m.image}`}/>
      <meta property="og:image:type" content={`image/${m.image.substr(m.image.indexOf('.') + 1)}`}/>
      <meta property="og:image:width" content="1000"/>
      <meta property="og:image:height" content="402"/>

      <meta name="twitter:card" content="summary_large_image"></meta>
      <meta name="twitter:title" content={m.openGraphTitle}/>
      <meta name="twitter:description" content={m.description} />
      <meta name="twitter:image" content={`${m.baseUrl}${m.image}`}/>
      <meta name="twitter:creator" content={m.twitterAccount}/>
    </Helmet>
  )
}

export default SiteMeta
