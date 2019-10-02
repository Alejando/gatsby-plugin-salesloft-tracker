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
import * as Yup from 'yup'
import * as TalentoService from '../../services/talento-form-service'

const workAsOptions = [
  'Ruby and JavaScript Full Stack Developer',
  'JavaScript Full Stack Developer',
  'Project Manager',
  'QA Automation Engineer',
  'QA Manual Engineer',
  'Ruby Developer',
  'Trainee Fullstack Developer',
  'UI/ UX Engineer'
]
const TalentoSchema = Yup.object().shape({
  first_name: Yup.string()
    .min(2, 'Tu nombre debe de ser mayor a 2 caracteres')
    .required('Tu nombre es requerido'),
  last_name: Yup.string()
    .min(2, 'Tu apellido debe de ser mayor a 2 caracteres')
    .required('Tu apellido es requerido'),
  email: Yup.string()
    .email('Por favor ingresa un correo electrónico (nombre@dominio.com)')
    .required('Necesitamos un correo electrónico para poder contactarte'),
  work_as: Yup.string()
    .required('Nos gustaría saber que te interesa')
})
const initialValues={
  first_name: '',
  last_name: '',
  email: '',
  work_as: '',
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
        {({ values, handleChange, errors, isSubmitting, touched }) => (
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
              <Input
                type="select"
                name="work_as"
                id="work_as"
                invalid={Boolean(touched.work_as && errors.work_as)}
                aria-required
                value={values.work_as}
                onChange={handleChange}
              > 
                <option key="" value="">Elige una opción</option>
                {
                  workAsOptions.map(value => (
                    <option key={value} value={value}> {value} </option>
                  ))
                }
              </Input>
              <ErrorMessage name="work_as" component={FormFeedback} />
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
