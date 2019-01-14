import React from 'react'
import {
  FormFeedback,
  FormGroup,
  Label,
  Input,
  Button,
} from 'reactstrap'
import { navigate } from 'gatsby'
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

const ContactUsForm = () => {
  return (
    <div>
      <Formik
        initialValues={{
          name: '',
          email: '',
          company: '',
          message: '',
        }}
        validationSchema={ContactUsSchema}
        onSubmit={(values, { setSubmitting }) => {
          ContactUsService.sendForm(values)
            .then(
              () => {
                setSubmitting(false)
                navigate('/contact-us-success')
              },
              err => {
                setSubmitting(false)
                alert(err.message)
              }
            )
        }}
      >
        {({ errors, isSubmitting }) => (
          <Form>
            <FormGroup>
              <Label for="name">Name *</Label>
              <Input
                type="name"
                name="name"
                tag={Field}
                invalid={!!errors.name}
                aria-required
              />
              <ErrorMessage name="name" component={FormFeedback} />
            </FormGroup>
            <FormGroup>
              <Label for="email">Email *</Label>
              <Input
                type="email"
                name="email"
                tag={Field}
                invalid={!!errors.email}
                aria-required
              />
              <ErrorMessage name="email" component={FormFeedback} />
            </FormGroup>
            <FormGroup>
              <Label for="company">Company</Label>
              <Input
                type="text"
                name="company"
                tag={Field}
                invalid={!!errors.company}
              />
              <ErrorMessage name="company" component={FormFeedback} />
            </FormGroup>
            <FormGroup>
              <Label for="message">Message *</Label>
              <Input
                type="textarea"
                component="textarea"
                name="message"
                tag={Field}
                invalid={!!errors.message}
                aria-required
              />
              <ErrorMessage name="message" component={FormFeedback} />
            </FormGroup>
            <Button color="primary" type="submit" disabled={isSubmitting}>
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default ContactUsForm
