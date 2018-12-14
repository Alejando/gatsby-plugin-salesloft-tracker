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
    <Col md="6" >
      <img alt={post.name} src={post.imageSrc} className="img-fluid" />
    </Col>
    <Col md="6"
      css={css`color: #aaa;`}
    >
      <h2
        css={css`color: #333333;`}
      >
        { post.name }
      </h2>
      <div
        className="my-3"
        css={css`font-size: 12px;`}
      >
        <span class="mr-3">
          <FontAwesomeIcon icon={["fas", "calendar-alt"]}  />
          <span class="ml-2">{ post.date } </span>
        </span>
        <span class="">
          <FontAwesomeIcon icon={["fas", "user"]}  />
          <span class="ml-2"> By
            <Link to={`/people/${slugify(post.author)}`} className="ml-1 text-muted">
              { post.author }
            </Link>
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
          post.tags.map((tag,i) =>(
            <span key={i} className="mx-1">
            <Link to="blog" className="text-danger">
              {tag}
            </Link>
            </span>
          ))
          }
        </span>
        <span>
          <FontAwesomeIcon icon={["fas", "link"]} className="mx-1" />
          <Link to={`/blog/${slugify(post.name)}`} className="text-danger">
            Read more
          </Link>
        </span>
      </div>
    </Col>
  </Row>
)

export default PostItem
