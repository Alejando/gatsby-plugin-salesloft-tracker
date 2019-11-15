import React from 'react'
import {
  FormFeedback,
  FormGroup,
  Label,
  Input,
  Button,
  Col,
  Row
} from 'reactstrap'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as FormService from '../../services/form-service'
import { RubyconfSchema } from './helpers/rubyconf-validator'

const jobDescriptions = [
 'Human Resources',
 'Intern (Any kind)',
 'JavaScript and Ruby Full Stack Developer',
 'JavaScript Full Stack Developer',
 'Junior or Trainee Developer',
 'Marketing & Content',
 'Project Manager',
 'QA Automation Engineer',
 'QA Manual Engineer',
 'React Developer',
 'Ruby Developer',
 'Sales & Business Development',
 'UI/UX Engineer',
]

const initialValues={
  name: '',
  last_name: '',
  email: '',
  my_main_job_description: '',
}

const RubyconfForm = ({ success }) => {
  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={RubyconfSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          FormService.sendForm(values)
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
        {({ values, errors, isSubmitting, touched, handleChange, handleBlur }) => (
          <Form className="px-3 py-4">
            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label for="name" className="font-weight-bold">* Name:</Label>
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
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="last_name" className="font-weight-bold">* Last name:</Label>
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
            <FormGroup>
              <Label for="email" className="font-weight-bold">* Email:</Label>
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
              <Label for="my_main_job_description" className="font-weight-bold">* My main job description is:</Label>
              <Input
                type="select"
                name="my_main_job_description"
                id="my_main_job_description"
                invalid={Boolean(touched.my_main_job_description && values.my_main_job_description === '')}
                value={values.my_main_job_description}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-required>
                <option value=''> Select...</option>
                {
                  jobDescriptions.map(job => <option key={job} value={job}>{job}</option>)
                }
              </Input>
              <ErrorMessage name="my_main_job_description" component={FormFeedback} />
            </FormGroup>
            <Button color="danger" type="submit" className="mt-4 px-5" disabled={isSubmitting}>
              Enviar
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default RubyconfForm
