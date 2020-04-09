import React from 'react'
import {
  graphql,
  Link,
  withPrefix
} from 'gatsby'
import {
  Button
} from 'reactstrap'
import Layout from '../components/layout'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Container, Row, Col } from 'reactstrap'
import ShareButtons from '../components/share-buttons'
import { css } from '@emotion/core'
import { slugify } from '../lib/url-utils';
import { DiscussionEmbed } from 'disqus-react'

const PostDetail = ({ data, location }) => {
  const post = data.markdownRemark
  const socialImage = post.frontmatter.social_media_image || post.frontmatter.image

  const siteMeta = {
    path: `/blog/${slugify(post.frontmatter.name)}`,
    subtitle: post.frontmatter.name,
    openGraphTitle: post.frontmatter.name,
    keywords: post.frontmatter.keywords || (post.frontmatter.tags || []).join(', '),
    description: post.frontmatter.social_summary || post.frontmatter.description ,
    image: withPrefix(socialImage.childImageSharp.original.src),
    type: 'article'
  }

  const disqusConfig = {
    shortname: process.env.GATSBY_DISQUS_NAME,
    config: { identifier: slugify(post.frontmatter.name) },
  }

  return (
    <Layout siteMeta={siteMeta}>
      <Container className="pt-4">
        <Row>
          <Col md="12">
            <h1 className="pb-2 mb-3">{post.frontmatter.name}</h1>
            <div
              className="my-3"
              css={css`color: #51565C;`}
            >
              <span className="mr-3">
                <FontAwesomeIcon icon={["fas", "calendar-alt"]}  />
                <span className="ml-2">{ post.frontmatter.date } </span>
              </span>
              <span>
                <FontAwesomeIcon icon={["fas", "user"]}  />
                <span className="ml-2"> By { post.frontmatter.author }
                </span>
              </span>
            </div>
          </Col>
          <Col md="12 border-bottom">
            <img alt={post.name} src={post.frontmatter.image.childImageSharp.original.src} className="img-fluid  mb-4" />
            <div
              dangerouslySetInnerHTML={{ __html: post.html }}
              css={css`
                p{ color: #51565C; }
                a{ color: #c15050; &:hover{ color: #c15050};  }
              `}
            />
          </Col>
          <Col
            className="d-flex justify-content-between mt-2 mb-5"
            css={css`
              font-size: 12px;
              color: #51565C;
            `}
          >
            <div>
              {
                post.frontmatter.tags !== null  &&
                <span  className=" mr-2">
                  <FontAwesomeIcon icon={["fas", "tags"]}  />
                  {
                  post.frontmatter.tags.map((tag, i) =>(
                    <span key={i} className="mx-1">
                    <Link to={`/blog/tags/${slugify(tag)}`} className="text-danger">
                      {tag}
                    </Link>
                    </span>
                  ))
                  }
                </span>
              }

              <Button
                outline
                color="dark"
                size="sm"
                href="https://github.com/densitylabs"
                data-count-href="/densitylabs/followers"
                data-count-api="/users/densitylabs#followers"
                data-count-aria-label="# followers on GitHub"
                aria-label="Follow @densitylabs on GitHub"
              >
                <FontAwesomeIcon icon={["fab", "github"]} />
                <div className="m-0 ml-2 d-inline-block" css={css`font-size: 12px;`}>Follow @densitylabs</div>
              </Button>
            </div>
            <ShareButtons url={location.href} title={post.frontmatter.name} summary={post.frontmatter.social_summary}/>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <DiscussionEmbed {...disqusConfig} />
          </Col>
        </Row>
      </Container>
    </Layout>
  )
}

export const query = graphql`
query($id: String!) {
  markdownRemark(
    id: { eq: $id }
  ) {
    id
    frontmatter {
      name
      date
      image{
        childImageSharp {
          original {
            src
          }
        }
      }
      social_media_image{
        childImageSharp {
          original {
            src
          }
        }
      }
      keywords
      description
      tags
      author
      social_summary
    }
    html
  }
}
`

export default PostDetail;
