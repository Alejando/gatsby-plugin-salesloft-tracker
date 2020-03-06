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
import * as Service from '../../services/digital-tech-fest-service'
import { Schema } from './helpers/digital-tech-fest-validator'
import Select from 'react-select';
import { get } from 'lodash';

const workAsOptions = [
  { value: '.Net Developer', label: '.Net Developer' },
  { value: 'Administrative', label: 'Administrative' },
  { value: 'Back-end Developer', label: 'Back-end Developer' },
  { value: 'Bash/Shell', label: 'Bash/Shell' },
  { value: 'Database Administrator', label: 'Database Administrator' },
  { value: 'C Developer', label: 'C Developer' },
  { value: 'C# Developer', label: 'C# Developer' },
  { value: 'C++ Developer', label: 'C++ Developer' },
  { value: 'Content Manager', label: 'Content Manager' },
  { value: 'Data Science', label: 'Data Science' },
  { value: 'DevOps', label: 'DevOps' },
  { value: 'Ember Developer', label: 'Ember Developer' },
  { value: 'Go Developer', label: 'Go Developer' },
  { value: 'Human Resources', label: 'Human Resources' },
  { value: 'Java Developer', label: 'Java Developer' },
  { value: 'Javascript Developer', label: 'Javascript Developer' },
  { value: 'Javascript Full Stack Developer', label: 'Javascript Full Stack Developer' },
  { value: 'Machine Learning', label: 'Machine Learning' },
  { value: 'Marketing', label: 'Marketing' },
  { value: 'MySQL', label: 'MySQL' },
  { value: 'Oracle', label: 'Oracle' },
  { value: 'PHP Developer', label: 'PHP Developer' },
  { value: 'Product Owner', label: 'Product Owner' },
  { value: 'Project Manager', label: 'Project Manager' },
  { value: 'Project Manager Junior', label: 'Project Manager Junior' },
  { value: 'Python Developer', label: 'Python Developer' },
  { value: 'QA Automation Engineer', label: 'QA Automation Engineer' },
  { value: 'QA Manual Engineer', label: 'QA Manual Engineer' },
  { value: 'React Developer', label: 'React Developer' },
  { value: 'Ruby Developer', label: 'Ruby Developer' },
  { value: 'Ruby Full Stack Developer', label: 'Ruby Full Stack Developer' },
  { value: 'Sales', label: 'Sales' },
  { value: 'Swift Developer', label: 'Swift Developer' },
  { value: 'Talent Acquisition', label: 'Talent Acquisition' },
  { value: 'Tech Support', label: 'Tech Support' },
  { value: 'Trainee Full Stack Developer', label: 'Trainee Full Stack Developer' },
  { value: 'VueJS Developer', label: 'VueJS Developer' },
  { value: 'UI/UX Designer', label: 'UI/UX Designer' },
  { value: 'UX Designer', label: 'UX Designer' },
  { value: 'Web Designer', label: 'Web Designer' },
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
  experience: [],
  receive_information: 'Yes'
}

const CustomForm = ({ success }) => {
  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={Schema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          Service.sendForm(values, process.env.DIGITAL_TECH_FEST_FORM_URL)
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
        {({ values, errors, isSubmitting, touched, setFieldValue, setFieldTouched, handleChange, handleBlur }) => (
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
              <Label for="work_as" className="font-weight-bold">Mi área de especialidad es: *</Label>
              <Select
                styles={customStyles(Boolean(touched.work_as && errors.work_as))}
                classNamePrefix='digital-tech-fest-1'
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
            <FormGroup>
              <Label for="experience" className="font-weight-bold">Años de experiencia en la industria: *</Label>
              <Select
                styles={customStyles(Boolean(touched.experience && errors.experience))}
                classNamePrefix='digital-tech-fest-2'
                placeholder="Elige una opción"
                name="experience"
                id="experience"
                options={ExperinceOptions}
                value={values.experience}
                onChange={(selected) => setFieldValue('experience', get(selected, 'value', null) ? selected : [])}
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
            <FormGroup check={true}>
              <Label check={true}>
                <Input 
                  type="checkbox"
                  name="receive_information" 
                  id="receive_information" 
                  tag={Field}
                  defaultChecked="Yes"
                />
                  Acepto recibir ofertas de trabajo / información técnica por correo
              </Label>
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

export default CustomForm;