import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'

const IndexPage = () => (
  <Layout>
    <h1>About</h1>
    <p>About page</p>
    <Link to="/">Back to Index</Link>
  </Layout>
)

export default IndexPage
