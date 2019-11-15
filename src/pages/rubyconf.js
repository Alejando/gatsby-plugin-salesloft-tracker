import React, { useState } from 'react'
import SimpleLayout from '../components/simple_layout'
import {
  Row,
  Col
} from 'reactstrap';
import RubyconfForm from '../components/forms/rubyconf-form';
import Modal from '../components/success-modal'
import { Link } from 'gatsby';
import logo from '../images/logo.svg'
import { css } from '@emotion/core'

const successMessage = () => {
  return(
    <div>
      <p>Thank you! Your data has been successfully sent.</p>
      <p>We'll be in touch. In the meantime, <Link to='/blog'>check out our blog</Link>!</p>
    </div>
  );
}
const Rubyconf = () => {
  const [modal, setModal] = useState(false);
  return (
    <SimpleLayout>
      <div 
        className="position-absolute w-100 h-100"
        css={css`
          background-color: #d9d9d9;
        `}
      >
        <div className=" d-flex justify-content-center align-items-center w-100 h-100">
          <Col sm={10} md={8} lg={6} xl={5} className="rounded bg-white p-5 m-auto">
              <Row>
                <Col md={12}>
                  <img className="mb-0 p-2" src={logo} alt="Logo" width={230} />
                </Col>
                <Col> 
                  <RubyconfForm success={() => setModal(true)} />
                  <Modal 
                    show={ modal }
                    toggle={ (value) => setModal(!value) }
                    title='Success'
                    body={ successMessage() }
                    centered
                    closeButtonText='Close'
                  />
                </Col>
              </Row>
          </Col>
        </div>
      </div>
    </SimpleLayout>
  );
}

export default Rubyconf
