import React from 'react';
import { PropTypes } from 'prop-types';
import { Form, Input, Textarea } from '@rocketseat/unform';
import * as Yup from 'yup';

import { MdSave } from 'react-icons/md';
import { Container, Loading } from './styles';

import FileInput from '~/components/FileInput';

const schema = Yup.object().shape({
  file_id: Yup.number()
    .transform(value => (!value ? undefined : value))
    .required('Imagem obrigatória.'),
  title: Yup.string()
    .min(6, 'O título precisa de no mínimo 6 caracteres.')
    .max(35, 'O título não pode ter mais que 35 caracteres.')
    .required('Título obrigatório.'),
  description: Yup.string()
    .max(250, 'A descrição não pode ter mais que 250 caracteres.')
    .required('Descrição obrigatória.'),
  location: Yup.string()
    .min(6, 'A localização precisa de no mínimo 6 caracteres.')
    .max(100, 'A localização não pode ter mais que 100 caracteres')
    .required('Localização obrigatória.'),
  date: Yup.date().required('Data obrigatória.'),
});

export default function FormMeetup({ meetup, handleSubmit, loading }) {
  return (
    <>
      {!loading ? (
        <Container>
          <Form initialData={meetup} schema={schema} onSubmit={handleSubmit}>
            <FileInput name="file_id" />
            <Input name="title" placeholder="Título do Meetup" />
            <Textarea name="description" placeholder="Descrição completa" />
            <Input name="location" placeholder="Localização" />
            <div>
              <button type="submit">
                <MdSave color="#FFf" size={16} />
                Salvar meetup
              </button>
            </div>
          </Form>
        </Container>
      ) : (
        <Loading>Carregando...</Loading>
      )}
    </>
  );
}

FormMeetup.propTypes = {
  meetup: PropTypes.shape({
    file_id: PropTypes.number,
    title: PropTypes.string,
    description: PropTypes.string,
    localization: PropTypes.string,
    date: PropTypes.instanceOf(Date),
  }),
  handleSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

FormMeetup.defaultProps = {
  meetup: {},
};
