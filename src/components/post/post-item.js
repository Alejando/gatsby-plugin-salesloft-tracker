import React from 'react'
import {
  Col,
  Row,
} from 'reactstrap';
import { slugify } from '../../lib/url-utils';
import {
  Link
 } from 'gatsby';
import { css } from "@emotion/core"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const PostItem = ({
  post
}) => (
  <Row className='my-5'>
    <Col md="6" className="mb-3" >
      <img alt={post.name} src={post.imageSrc} className="img-fluid" />
    </Col>
    <Col md="6"
      css={css`
        color: #51565C;
        a{ color: initial; &:hover{ color: #c15050} }
      `}
    >
      <h2
        css={css`color: #333333;`}
      >
        <Link
          to={`/blog/${slugify(post.name)}`}
          css={css` color: black; &:hover{ color: #c15050}`}
          >
          { post.name }
        </Link>
      </h2>
      <div
        className="my-3"
        css={css`font-size: 12px;`}
      >
        <span className="mr-3">
          <FontAwesomeIcon icon={["fas", "calendar-alt"]}  />
          <span className="ml-2">{ post.date } </span>
        </span>
        <span className="">
          <FontAwesomeIcon icon={["fas", "user"]}  />
          <span className="ml-2"> By { post.author }
          </span>
        </span>

      </div>
      <div dangerouslySetInnerHTML={{ __html: post.summaryHtml }}/>
    </Col>
    <Col className=" mt-2">
      <div className="dropdown-divider"/>
      <div
        className="d-flex justify-content-between"
        css={css`
          font-size: 12px;
          color: #aaa;
        `}
      >
        <span >
          <FontAwesomeIcon icon={["fas", "tags"]}  />
          {
          (post.tags || []).map((tag,i) =>(
            <span key={i} className="mx-1">
            <Link to="blog"  css={css`color: #A31929; &:hover{ color: #A31929; }`}>
              {tag}
            </Link>
            </span>
          ))
          }
        </span>
        <span>
          <FontAwesomeIcon icon={["fas", "link"]} className="mx-1" />
          <Link to={`/blog/${slugify(post.name)}`}  css={css`color: #A31929; &:hover{ color: #A31929; }`}>
            Read more
          </Link>
        </span>
      </div>
    </Col>
  </Row>
)

export default PostItem
