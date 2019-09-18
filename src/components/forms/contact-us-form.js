import React from 'react'
import {
  FormFeedback,
  FormGroup,
  Label,
  Input,
  Button,
} from 'reactstrap'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as ContactUsService from '../../services/contact-us-service'
import * as Yup from 'yup'

const ContactUsSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Your name must be longer than 2 characters')
    .required('Please specify your name'),
  email: Yup.string()
    .email('Please enter a valid email address e.g. name@domain.com')
    .required('We need your email address to contact you'),
  company: Yup.string(),
  message: Yup.string()
    .min(10, 'Your message must be longer than 10 characters')
    .required('Please enter a message'),
})
const initialValues={
  name: '',
  email: '',
  company: '',
  message: '',
}

const ContactUsForm = ({ success }) => {
  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={ContactUsSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          ContactUsService.sendForm(values)
            .then(
              () => {
                setSubmitting(false);
                success();
                resetForm(initialValues);
              },
              err => {
                setSubmitting(false)
                alert(err.message)
              }
            )
        }}
      >
        {({ errors, isSubmitting, touched }) => (
          <Form>
            <FormGroup>
              <Label for="name">Name *</Label>
              <Input
                type="text"
                name="name"
                id="name"
                tag={Field}
                invalid={Boolean(touched.name && errors.name)}
                aria-required
              />
              <ErrorMessage name="name" component={FormFeedback} />
            </FormGroup>
            <FormGroup>
              <Label for="email">Email *</Label>
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
            <FormGroup>
              <Label for="company">Company</Label>
              <Input
                type="text"
                name="company"
                id="company"
                tag={Field}
                invalid={Boolean(touched.company && errors.company)}
              />
              <ErrorMessage name="company" component={FormFeedback} />
            </FormGroup>
            <FormGroup>
              <Label for="message">Message *</Label>
              <Input
                type="textarea"
                component="textarea"
                name="message"
                id="message"
                tag={Field}
                invalid={Boolean(touched.message && errors.message)}
                aria-required
              />
              <ErrorMessage name="message" component={FormFeedback} />
            </FormGroup>
            <Button color="danger" type="submit" disabled={isSubmitting}>
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default ContactUsForm
