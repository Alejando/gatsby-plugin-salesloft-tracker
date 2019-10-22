import React from 'react'
import SimpleLayout from '../components/simple_layout'
import {
  Row,
  Col
} from 'reactstrap';
import Modal from '../components/success-modal'
import { Link } from 'gatsby';
import logo from '../images/logo.svg'
import { css } from '@emotion/core'
import Form from "react-jsonschema-form";
import axios from 'axios';
import { set } from 'idb-keyval';
// import { withTheme } from 'react-jsonschema-form';
// import Bootstrap4Theme from 'react-jsonschema-form-theme-bs4';

// const ThemedForm = withTheme(Bootstrap4Theme); 


const successMessage = () => {
  return(
    <div>
      <p>Gracias, tus datos han sido registrados.</p>
      <p>¡Echa un vistazo a nuestro <Link to='/blog'> blog </Link> para ver lo que estamos haciendo!</p>
    </div>
  );
}
const url = 'https://my-integration.densitylabs.io/form/9a1a46483a71507708ebb06f'


class DynamicForm extends React.Component {
  constructor(props){
    super(props)
    this.state = { 
      jsonSchema: {},
      UiSchema: {},
      modal: false,
      formData: {},
      liveValidate: false
    };
  }

  componentDidMount(){
    axios.get(url)
    .then((response) => {
      this.setState({
        jsonSchema: response.data.json_schema,
        UiSchema: response.data.ui_schema
      });
    })
    .catch((error) => {
      return {}
    })
  }

  render(){
    return(
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
                  <Form schema={this.state.jsonSchema}
                    liveValidate= {this.state.liveValidate}
                    uiSchema={this.state.uiSchema}
                    formData={this.state.formData}
                    onChange= {({formData}) => {
                      this.setState({formData:formData})}
                    }
                    onError={console.log("errors")}
                    method="post"
                    action={url} 
                  />
                  <Modal 
                    show={ this.state.modal }
                    toggle={ (value) => set.state({modal:!value})}
                    title='Éxito'
                    body={ successMessage() }
                    centered
                    closeButtonText='Salir'
                  />
                </Col>
              </Row>
          </Col>
        </div>
      </div>
    </SimpleLayout>
    );
  }
}

export default DynamicForm
