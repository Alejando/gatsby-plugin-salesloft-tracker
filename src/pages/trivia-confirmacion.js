import React from 'react'
import {
  Row,
  Col
} from 'reactstrap';
import logo from '../images/logo.svg'
import logoPosadev from '../images/posadev.png'
import snowflake from '../images/snowflake.png'
import snowman from '../images/snowman.png'
import { css } from '@emotion/core'
import { get } from 'lodash';
import SocialData from '../../data/social_networks.json'
import SocialDataIcon from '../components/icon/social-data-icon';

const TriviaPosadev = () => {
  const triviaId = typeof window !== 'undefined' ? get(window, 'history.state.triviaId', "") : ""

  return (
    <div>
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
                  <img src={logoPosadev} alt="Posadev" css={ css`width:200px; heigth: auto;`} />
                </Col>
                <Col>
                  <div className="d-flex justify-content-between my-4" >
                    <figure className="d-flex align-items-center">
                      <img  src={snowflake} alt="snowflake" width={45}/>
                    </figure>
                    <h2 className="text-center ">
                    ¡Registro completo!
                    </h2>
                    <figure className="d-flex align-items-center">
                      <img  src={snowflake} alt="snowflake" width={45}/>
                    </figure>
                  </div>
                </Col>
                <Col md={12} className="text-center">
                  <p className="my-4">
                    Tú ID de participante es: <span className="font-weight-bold">{ triviaId }</span>
                  </p>
                  <p className="my-5 text-center">
                    No lo pierdas, esté será tu pase de entrada para participar y poder ganar uno de los íncreibles premios que tenemos para ti.
                  </p>
                  <figure className="d-flex align-items-center justify-content-center">
                      <img  src={snowman} alt="snowman"/>
                    </figure>
                  <p className="mt-5 text-center">
                    Recuerda permanecer atento a nuestras redes sociales y a las de POSADEV.
                  </p>
                </Col>
                <Col xs='12' className='mt-0 d-flex justify-content-center'>
                  <ul className="list-inline">
                    {
                      SocialData.map((socialDetails) => (
                        socialDetails.posadev &&
                        <li className="list-inline-item" key={socialDetails.icon} >
                          <SocialDataIcon socialDetails={socialDetails} />
                        </li>
                      ))
                    }
                  </ul>
                </Col>
              </Row>
          </Col>
        </div>
      </div>
    </div>
  );
}

export default TriviaPosadev
