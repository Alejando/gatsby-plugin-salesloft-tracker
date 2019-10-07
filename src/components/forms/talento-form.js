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
import * as TalentoService from '../../services/talento-form-service'
import { TalentoSchema } from './helpers/validator'
import Select from 'react-select';

import { css } from 'emotion'

const workAsOptions = [
  { value: 'JavaScript and Ruby Full Stack Developer', label: 'JavaScript and Ruby Full Stack Developer' },
  { value: 'JavaScript Full Stack Developer', label: 'JavaScript Full Stack Developer' },
  { value: 'Marketing & Content', label: 'Marketing & Content' },
  { value: 'Project Manager', label: 'Project Manager' },
  { value: 'QA Automation Engineer', label: 'QA Automation Engineer' },
  { value: 'QA Manual Engineer', label: 'QA Manual Engineer' },
  { value: 'React Developer', label: 'React Developer' },
  { value: 'RH ', label: 'RH ' },
  { value: 'Ruby Developer', label: 'Ruby Developer' },
  { value: 'Trainee Fullstack Developer', label: 'Trainee Fullstack Developer' },
  { value: 'UI/ UX Engineer', label: 'UI/ UX Engineer' },
]

const initialValues={
  first_name: '',
  last_name: '',
  email: '',
  work_as: [],
}

const TalentoForm = ({ success }) => {
  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={TalentoSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {

          TalentoService.sendForm(values)
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
        {({ values, errors, isSubmitting, touched, setFieldValue, setFieldTouched }) => (
          <Form className="px-3 py-4">
            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label for="first_name" className="font-weight-bold">Nombre: *</Label>
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
              <Col md={6}>
                <FormGroup>
                  <Label for="last_name" className="font-weight-bold">Apellido: *</Label>
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
              <Label for="email" className="font-weight-bold">Correo electrónico: *</Label>
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
              <Label for="work_as" className="font-weight-bold">Me gustaría trabajar como: *</Label>
              <Select
                classNamePrefix='talento'
                placeholder="Elige una opción (Máximo 3)"
                name="work_as"
                id="work_as"
                options={workAsOptions}
                value={values.work_as}
                onChange={(selected) => setFieldValue('work_as', selected? selected : [])} 
                onBlur={(value) => setFieldTouched('work_as',value)}
                isMulti
                menuPlacement="auto"
                closeMenuOnSelect={false}
                css={css`
                  border-radius: 4px;
                  border: 1px solid;
                  ${Boolean(touched.work_as && errors.work_as)? 'border-color: #dc3545;' : 'border-color: #ced4da;'}
                  & > div {
                    border: none;
                  }
                `}
              />
              {
                Boolean(touched.work_as && errors.work_as) &&
                <div className="invalid-feedback d-block">
                  {errors.work_as}
                </div>
              }
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

export default TalentoForm
