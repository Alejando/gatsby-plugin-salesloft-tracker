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
import * as Service from '../../services/stand-form-service'
import { Schema } from './helpers/posadev-validator'
import Select from 'react-select';
import { css } from '@emotion/core'
import cleanChar from 'cleanchar'

const workAsOptions = [
  { value: 'Administrative', label: 'Administrative' },
  { value: 'Data Science', label: 'Data Science' },
  { value: 'DevOps', label: 'DevOps' },
  { value: 'Human Resources ', label: 'Human Resources ' },
  { value: 'JavaScript and Ruby Full Stack Developer', label: 'JavaScript and Ruby Full Stack Developer' },
  { value: 'JavaScript Full Stack Developer', label: 'JavaScript Full Stack Developer' },
  { value: 'Marketing & Content', label: 'Marketing & Content' },
  { value: 'Project Manager', label: 'Project Manager' },
  { value: 'Product Owner', label: 'Product Owner' },
  { value: 'Product Designer', label: 'Product Designer' },
  { value: 'QA Automation Engineer', label: 'QA Automation Engineer' },
  { value: 'QA Manual Engineer', label: 'QA Manual Engineer' },
  { value: 'React Developer', label: 'React Developer' },
  { value: 'React Full Stack', label: 'React Full Stack' },
  { value: 'Ruby Developer', label: 'Ruby Developer' },
  { value: '.Net', label: '.Net' },
  { value: 'Sales', label: 'Sales' },
  { value: 'Trainee Fullstack Developer', label: 'Trainee Fullstack Developer' },
  { value: 'UI/UX Engineer', label: 'UI/UX Engineer' },
  { value: 'Other', label: 'Other' },
]

const ExperinceOptions = [
  { value: 'Menos de 1 año', label: 'Menos de 1 año' },
  { value: '1-3 años', label: '1-3 años' },
  { value: '3-5 años', label: '3-5 años' },
  { value: '5 o más años', label: '5 o más años' },
]

const customStyles = (error) => (
  {
  container: (styles, state) => ({
      ...styles,
      boxShadow: state.isFocused ?  (error ? '0 0 0 0.2rem rgba(220,53,69,.25)' : '0 0 0 0.2rem rgba(0,123,255,.25)'): 'none',
      borderRadius: '4px',
      border: state.isFocused ?  (error ? '1px solid #dc3545' : '1px solid #80bdff'):  (error ? '1px solid #dc3545' : '1px solid #ced4da'),
    }),
    control: styles => ({
      ...styles,
      border: '0 !important',
      boxShadow: '0 !important',
      '&:hover': {
          border: '0 !important'
        }
    })

  }
);

const initialValues={
  first_name: '',
  last_name: '',
  email: '',
  work_as: [],
  receive_information: 'Yes',
  trivia_id: ''
}

/**
 * @param {string} prefix
 * @return {string}
 */
export function generateRandomCode (prefix) {
  let triviaId = Math.random().toString(36).substring(8);
  const cleanedPrefix = cleanChar(prefix).replace(' ', '_')
  return `${cleanedPrefix}_${triviaId}`
}

const CustomForm = ({ success }) => {
  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={Schema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          values['trivia_id'] = generateRandomCode(values.first_name) // Agregar nombre de persona en lugar de posadev
          Service.sendForm(values, process.env.TRIVIA_POSADEV_FORM_URL)
            .then(
              () => {
                setSubmitting(false);
                success(values['trivia_id']);
                resetForm(initialValues);
              },
              err => {
                setSubmitting(false)
                alert(err.message)
              }
            )
        }}
      >
        {({ values, errors, isSubmitting, touched, setFieldValue, setFieldTouched}) => (
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
              <Label for="email" className="font-weight-bold">Correo electrónico: *
                <span
                  className="font-weight-light text-muted ml-2"
                  css={css`
                    font-size:11px;
                  `}
                >
                  (De ser ganador te contactaremos por este medio)
                </span>
              </Label>
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
              <Label for="experience" className="font-weight-bold">Años de experiencia en la industria: *</Label>
              <Select
                styles={customStyles(Boolean(touched.experience && errors.experience))}
                classNamePrefix='posadev-2'
                placeholder="Elige una opción"
                name="experience"
                id="experience"
                options={ExperinceOptions}
                value={values.experience}
                onChange={(selected) => setFieldValue('experience', selected.value? selected : [])}
                onBlur={(value) => setFieldTouched('experience', value)}
                menuPlacement="auto"
                isClearable
              />
              {
                Boolean(touched.experience && errors.experience) &&
                <div className="invalid-feedback d-block">
                  {errors.experience}
                </div>
              }
            </FormGroup>
            <FormGroup>
              <Label for="work_as" className="font-weight-bold">Área de experiencia: *</Label>
              <Select
                styles={customStyles(Boolean(touched.work_as && errors.work_as))}
                classNamePrefix='posadev-1'
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

export default CustomForm
