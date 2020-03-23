import React from 'react';
import { css } from 'emotion'
import {
  FormFeedback,
  FormGroup,
  Label,
  Input,
  Col,
  Row,
  Container,
  Button } from 'reactstrap';
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { CareerSchema } from './helpers/apply-validator'
import * as ApplyService from '../../services/apply-to-career-service'
import Spinner from '../../components/spinner';
import { get } from 'lodash';

const initialValues= {
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
  cv: '',
  linkedin_url: '',
  url: '',
  lead_source: 'Website'
}
class ApplyForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div>
        <Formik
          initialValues={initialValues}
          validationSchema={CareerSchema}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            values = { "contact": values }
            ApplyService.apply(values, this.props.careerSlug)
              .then(
                () => {
                  setSubmitting(false);
                  this.props.setResultMessage(this.props.successMessage)
                  this.props.setResultTitle('Success!')
                  this.props.setModal(true)
                  resetForm(initialValues);
                },
                err => {
                  this.props.setResultMessage(err.message)
                  this.props.setResultTitle('Something is wrong!')
                  this.props.setModal(true)
                  setSubmitting(false)
                }
              )
          }}
        >
          {({ values, errors, isSubmitting, touched, setFieldValue, setFieldTouched }) => (
            <Form className="px-3 py-4">
              <Container></Container>
              <Row>
                <Col md={6}>
                  <FormGroup>
                    <Label for="first_name" className="font-weight-bold">First Name: *</Label>
                    <Input
                      type="text"
                      name="first_name"
                      id="first_name"
                      tag={Field}
                      invalid={Boolean(touched.first_name && errors.first_name)}
                      aria-required
                    />
                    <ErrorMessage name="first_name" component={FormFeedback} />
                  </FormGroup>
                </Col>
                <input type="hidden" value="testing" name="lead_source" />
                <Col md={6}>
                  <FormGroup>
                    <Label for="last_name" className="font-weight-bold">Last name: *</Label>
                    <Input
                      type="text"
                      name="last_name"
                      id="last_name"
                      tag={Field}
                      invalid={Boolean(touched.last_name && errors.last_name)}
                      aria-required
                    />
                    <ErrorMessage name="last_name" component={FormFeedback} />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <FormGroup>
                    <Label for="email" className="font-weight-bold"> Email: *</Label>
                    <Input
                      type="email"
                      name="email"
                      id="email"
                      tag={Field}
                      invalid={Boolean(touched.email && errors.email)}
                      aria-required
                    />
                    <ErrorMessage name="email" component={FormFeedback} />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="phone" className="font-weight-bold"> Phone: *</Label>
                    <Input
                      type="text"
                      name="phone"
                      id="phone"
                      tag={Field}
                      invalid={Boolean(touched.phone && errors.phone)}
                      aria-required
                    />
                    <ErrorMessage name="phone" component={FormFeedback} />
                  </FormGroup>
                </Col>
              </Row>
              <br/>
              <FormGroup>
                <Label className="font-weight-bold"> Resume/CV: *</Label>
                <Label 
                  for="cv"
                  css={ css`
                    margin-left: 10px;
                    color: #dc3445;
                    cursor: pointer;
                  `}
                >Attach you CV</Label>
                <Label
                  css={ css`
                    color: #7d7d7d;
                    font-size: 14px;
                    margin-left: 10px;
                  `}
                >(.pdf, .zip, .docx)</Label>
                <br/>
                <Label
                  css={ css`
                    color: #7d7d7d;
                  `}
                >{get(values, "cv['name']", '')}</Label>
                <Input 
                  id="cv" 
                  name="cv" 
                  type="file"
                  invalid={Boolean(touched.cv && errors.cv)}
                  onChange={(event) => {
                      setFieldValue("cv", event.currentTarget.files[0]);
                    }
                  }
                  hidden
                />
                <ErrorMessage name="cv" component={FormFeedback} />
              </FormGroup>
              <hr/>
              <br/>
              <FormGroup>
                <Label for="linkedin_url" className="font-weight-bold">LinkedIn url</Label>
                <Input
                  type="text"
                  name="linkedin_url"
                  id="linkedin_url"
                  tag={Field}
                  invalid={Boolean(touched.linkedin_url && errors.linkedin_url)}
                  aria-required
                />
                <ErrorMessage name="linkedin_url" component={FormFeedback} />
              </FormGroup>
              <FormGroup>
                <Label for="url" className="font-weight-bold">Website url</Label>
                <Input
                  type="text"
                  name="url"
                  id="url"
                  tag={Field}
                  invalid={Boolean(touched.url && errors.url)}
                  aria-required
                />
                <ErrorMessage name="url" component={FormFeedback} />
              </FormGroup>
              <FormGroup className="text-right">
                <Button color="danger" type="submit" className="mt-4 px-5" disabled={isSubmitting}>
                  {
                    isSubmitting ?
                      (<Spinner />) : ('Submit application')
                  }
                </Button>
              </FormGroup>
            </Form>
          )}
        </Formik>
      </div>
    );
  }
}

export default ApplyForm;
