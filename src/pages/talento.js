import React, { useState } from 'react'
import SimpleLayout from '../components/simple_layout'
import {
  Container,
  Row,
  Col
} from 'reactstrap';
import TalentoForm from '../components/forms/talento-form';
import Modal from '../components/success-modal'
import { Link } from 'gatsby';
import logo from '../images/logo.svg'

const successMessage = () => {
  return(
    <div>
      Tu informacion fue enviada correctamente! te contactaremos en breve. 
      Mientras tanto, hecha un vistazo a <Link to='/blog'>nuestro blog </Link> para ver lo que estamos haciendo.
    </div>
  );
}
const Talento = () => {
  const [modal, setModal] = useState(false);
  return (
    <SimpleLayout>
      <Container >
        <Row className="justify-content-center my-5">
          <Col md={6} className="rounded bg-white p-5">
              <Row>
                <Col md={12}>
                  <img className="mb-0 p-2" src={logo} alt="Logo" width={230} />
                </Col>
                <Col> 
                  <TalentoForm success={() => setModal(true)} />
                  <Modal 
                    show={ modal }
                    toggle={ (value) => setModal(!value) }
                    title='Éxito!'
                    body={ successMessage() }
                  />
                </Col>
              </Row>
          </Col>
        </Row>
      </Container>
      </SimpleLayout>
  );
}

export default Talento
