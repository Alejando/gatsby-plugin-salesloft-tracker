import React from 'react'
import SimpleLayout from '../components/simple_layout'
import {
  Row,
  Col
} from 'reactstrap';
import logo from '../images/logo.svg'
import logoPosadev from '../images/posadev.png'

import snowflake from '../images/snowflake.png'
import StandForm from '../components/forms/posadev-form';
import { css } from '@emotion/core'

import { navigate } from "gatsby"

const TriviaPosadevForm = () => {
  return (
    <SimpleLayout>
      <div
        className="position-relative w-100 py-md-5 p-0"
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
                  <img src={logoPosadev} alt="Posadev" css={ css`width:200px; heigth: auto;`} />
                </Col>
                <Col md={12}>
                  <div className="d-flex justify-content-between mt-4" >
                    <figure className="d-flex align-items-center">
                      <img  src={snowflake} alt="snowflake" width={45}/>
                    </figure>
                    <h2 className="text-center ">
                      ¡Importante!
                    </h2>
                    <figure className="d-flex align-items-center">
                      <img  src={snowflake} alt="snowflake" width={45}/>
                    </figure>
                  </div>
                  <ul>
                    <li className="font-weight-bold">Se generará un ID de participante</li>
                    <li>Las trivias serán en linea, revisa los horarios en las redes sociales (habrá 5 trivias durante el evento)</li>
                    <li>La premiación será durante la clausura del evento.</li>
                  </ul>
                </Col>
                <Col md={12}>
                  <StandForm success={(triviaId) => navigate("/trivia-confirmacion",{ state: { triviaId: triviaId }, replace: true}) }/>
                </Col>
                <Col md={12}>
                  <p className="text-center text-md-right" >Para mayor información escribenos a nuestras redes sociales.</p>
                </Col>
              </Row>
          </Col>
        </div>
      </div>
    </SimpleLayout>
  );
}

export default TriviaPosadevForm
