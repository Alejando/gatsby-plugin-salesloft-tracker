import React, { useState } from 'react';
import { css } from 'emotion'
import {
  FormFeedback,
  FormGroup,
  Label,
  Input,
  Col,
  Row,
  Modal, 
  ModalHeader, 
  ModalBody, 
  Button } from 'reactstrap';
import { Formik, Form, Field, ErrorMessage, getIn } from 'formik'
import { ReferSchema } from './helpers/refer-validator'
import * as ApplyService from '../../services/apply-to-career-service'
import ModalMessage from '../../components/success-modal'
import Spinner from '../../components/spinner';
import { get } from 'lodash';

const initialValues= {
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
  cv: '',
  lead_source: 'Website',
  linkedin_url: '',
  referred_by: { 
    first_name: '',
    last_name: '',
    email: ''
  }
  
}


const ReferAFriend = ({
  toggle,  
  show,
  careerSlug,
  careerName,
  success 
}) => {

  const [modal, setModal] = useState(false);
  const [resultMessage, setResultMessage] = useState('');
  const [resultTitle, setResultTitle] = useState('');

  return (
    <div>
      <ModalMessage
        show={ modal }
        toggle={ (value) => setModal(!value) }
        title={resultTitle}
        body={resultMessage}
        centered
        closeButtonText='Acept'
      />
      <Modal isOpen={show} toggle={toggle} centered={true} size="lg"
        css={ css`
          @media (max-height: 1000px) {
            top: 5%;
          }
          @media (max-height: 823px) {
            top: 10%;
          }

          @media (max-height: 736px) {
            top: 12%;
          }

          @media (max-height: 568px) {
            top: 15%;
          }
        `}
      >
        <ModalHeader toggle={toggle}>
          <Col md={12} className="text-uppercase text-muted">
            REFER A FRIEND AS A <span className="font-weight-bold text-dark">{careerName}</span>
          </Col>
        </ModalHeader>
        <ModalBody>
          <div className="col-12">
            <p>
              Your referral must fully comply with Density Labs’ requirements and successfully pass our recruitment process. 
            
              <a href="/how-to-refer-a-friend" css={css`
                color: #000000;
                text-decoration: underline;
                margin-left: 10px;
                &:hover{
                  color: #dc3545;
                }
              `}>
                How it works
              </a>
            </p>
          </div>
          <Formik
            initialValues={initialValues}
            validationSchema={ReferSchema}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              values = { "contact": values }
              ApplyService.referAFriend(values, careerSlug)
                .then(
                  () => {
                    setSubmitting(false);
                    setResultMessage(`Thank you for referring ${values.contact.first_name} to this great opportunity, one of our recruiters will contact you in the following 24 hours.`)
                    setResultTitle('Success!')
                    setModal(true)
                    resetForm(initialValues);
                  },
                  err => {
                    setResultMessage(err.message)
                    setResultTitle('Something is wrong!')
                    setModal(true)
                    setSubmitting(false)
                  }
                )
            }}
          >
            {({ values, errors, isSubmitting, touched, setFieldValue, setFieldTouched }) => (
              <Form className="px-3 pb-4 px-2">
                <Row>
                  <Col md={12}>
                    <strong>YOUR DATA</strong>
                  </Col>
                </Row>
                <br/>
                <Row>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="referred_by_first_name" className="font-weight-bold">First Name: *</Label>
                      <Input
                        type="text"
                        name="referred_by.first_name"
                        id="referred_by_first_name"
                        tag={Field}
                        invalid={Boolean(getIn(errors, 'referred_by.first_name') && getIn(touched, 'referred_by.first_name'))}
                        aria-required
                      />
                      <ErrorMessage name="referred_by.first_name" component={FormFeedback} />
                    </FormGroup>
                  </Col>
                  <input type="hidden" value="testing" name="lead_source" />
                  <Col md={6}>
                    <FormGroup>
                      <Label for="referred_by_last_name" className="font-weight-bold">Last name: *</Label>
                      <Input
                        type="text"
                        name="referred_by.last_name"
                        id="referred_by_last_name"
                        tag={Field}
                        invalid={Boolean(getIn(errors, 'referred_by.last_name') && getIn(touched, 'referred_by.last_name'))}
                        aria-required
                      />
                      <ErrorMessage name="referred_by.last_name" component={FormFeedback} />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={12}>
                    <FormGroup>
                      <Label for="referred_by_email" className="font-weight-bold">Email: *</Label>
                      <Input
                        type="text"
                        name="referred_by.email"
                        id="referred_by_email"
                        tag={Field}
                        invalid={Boolean(getIn(errors, 'referred_by.email') && getIn(touched, 'referred_by.email'))}
                        aria-required
                      />
                      <ErrorMessage name="referred_by.email" component={FormFeedback} />
                    </FormGroup>
                  </Col>
                </Row>
                <hr/>
                <Row>
                  <Col md={12}>
                    <strong>YOUR FRIEND'S DATA</strong>
                  </Col>
                </Row>
                <br/>
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
                      <Label for="phone" className="font-weight-bold"> Phone: </Label>
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
                  <Label className="font-weight-bold"> Resume/CV: </Label>
                  <Label 
                    for="cv"
                    css={ css`
                      margin-left: 10px;
                      color: #dc3445;
                      cursor: pointer;
                    `}
                  >Attach your friend's CV</Label>
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
                <FormGroup className="text-right">
                  <Button color="danger" type="submit" className="mt-4 px-5" disabled={isSubmitting}>
                    {
                      isSubmitting ?
                        (<Spinner />) : ('Submit referral')
                    }
                  </Button>
                </FormGroup>
              </Form>
            )}
          </Formik>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default ReferAFriend;
