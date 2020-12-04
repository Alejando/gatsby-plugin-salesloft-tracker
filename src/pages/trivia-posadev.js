import React from 'react'
import SimpleLayout from '../components/simple_layout'
import {
  Row,
  Col,
  Button
} from 'reactstrap';
import { Link } from 'gatsby';
import logo from '../images/logo.svg'
import logoPosadev from '../images/posadev.png'
import snowflake from '../images/snowflake.png'
import snowman from '../images/snowman.png'
import { css } from '@emotion/core'

const TriviaPosadev = () => {
  return (
    <SimpleLayout>
      <div
        className="position-absolute w-100 h-100 "
        css={css`
          background-color: #d9d9d9;
        `}
      >
        <div className=" d-flex justify-content-center align-items-center w-100 h-100">
          <Col sm={10} md={8} lg={6} xl={5} className="rounded bg-white p-5 m-auto">
              <Row>
                <Col md={6} className="d-flex justify-content-center justify-content-md-start p-0 mt-2">
                  <img src={logo} alt="Logo" width={200} />
                </Col>
                <Col md={6} className="d-flex justify-content-center justify-content-md-end p-0 mt-3">
                  <img src={logoPosadev} alt="Posadev" css={ css`width:200px; heigth: auto;`}/>
                </Col>
                <Col>
                  <div className="d-flex justify-content-between my-4" >
                    <figure className="d-flex align-items-center">
                      <img  src={snowflake} alt="snowflake" width={45}/>
                    </figure>
                    <h2 className="text-center ">
                    ¡Bienvenido a POSADEV 2019!
                    </h2>
                    <figure className="d-flex align-items-center">
                      <img  src={snowflake} alt="snowflake" width={45}/>
                    </figure>
                  </div>
                  <p>
                    ¿Te gustaría ganar uno de los siguientes premios?
                  </p>
                  <div className="d-flex justify-content-between">
                    <ul className="my-3">
                      <li>1 Nuevo Echo Dot (4ta Gen) - Bocina inteligente con Alexa - Gris</li>
                      <li>1 E-reader Kindle, ahora con una luz frontal, color Negro, 10ª generación</li>
                      <li>1 Xbox Series X 1 TB ó PlayStation 5 Edición digital (El ganador podrá elegir alguna de las 2 opciones)</li>
                    </ul>
                    <figure className="d-flex align-items-center">
                      <img  src={snowman} alt="snowman"/>
                    </figure>
                  </div>
                  <p className="mt-3">
                    ¡Regístrate para participar en nuestras trivias y poder ganar!
                  </p>
                  <div className="d-flex justify-content-center py-4">
                    <Link to="/trivia-posadev-form">
                      <Button color="danger">Continuar</Button>
                    </Link>
                  </div>

                </Col>
              </Row>
          </Col>
        </div>
      </div>
    </SimpleLayout>
  );
}

export default TriviaPosadev
