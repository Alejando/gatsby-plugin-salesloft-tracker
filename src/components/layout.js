import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'

import FontFace from './font-face';
import Header from './header'
import Footer from './footer'
import { Global, css } from '@emotion/core'


import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import SiteMeta from './site-meta';
library.add(fas, fab)

const Layout = ({ children, siteMeta }) => (
  <StaticQuery
    query={graphql`
      query LayoutQuery {
        site {
          siteMetadata {
            title
            siteUrl
          }
        }
        gatsbyIcon: file(relativePath: { eq: "gatsby-icon.png" }) {
          childImageSharp {
            # Specify the image processing specifications right in the query.
            # Makes it trivial to update as your page's design changes.
            fluid(
              maxWidth: 430
              quality: 80
              traceSVG: { background: "#f2f8f3", color: "#d6ebd9" }
            ) {
              ...GatsbyImageSharpFluid_tracedSVG
            }
          }
        }
      }
    `}
    render={data => (
      <>
        <Helmet>
          <html lang="en" className="bg-light"/>
        </Helmet>
        <SiteMeta title={data.site.siteMetadata.title} baseUrl={data.site.siteMetadata.siteUrl} siteMeta={siteMeta} />
        <FontFace />
        <Header />
        <main className="bg-light">
          <Global
            styles={css`
              :root{
                font-size   : 100%;

                @media (max-width: 575.98px) {
                  font-size : 80%;
                }
                @media (min-width: 576px) and (max-width: 767.98px) {
                  font-size : 90%;
                }
              }
            `}
          />
          {children}
        </main>
				<Footer/>
      </>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
