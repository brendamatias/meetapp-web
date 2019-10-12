import React from 'react';
import { PropTypes } from 'prop-types';
import { Form, Input, Textarea } from '@rocketseat/unform';
import * as Yup from 'yup';

import { MdSave } from 'react-icons/md';
import { Container, Button, Loading } from './styles';

import FileInput from '~/components/FileInput';
import DatePicker from '~/components/DatePicker';

const schema = Yup.object().shape({
  file_id: Yup.number()
    .transform(value => (!value ? undefined : value))
    .required('You must insert a banner for meetup!'),
  title: Yup.string()
    .min(6, 'Title must have at least 6 characters!')
    .max(35, 'Title can not exceed 20 characters!')
    .required('Title can not be empty!'),
  description: Yup.string()
    .min(10, 'Title must have at least 10 characters!')
    .max(250, 'Description can not exceed 250 characters!')
    .required('Description can not be empty!'),
  location: Yup.string()
    .min(6, 'Location must have at least 6 characters.')
    .max(100, 'Location can not exceed 100 characters!')
    .required('Location can not be empty!'),
  date: Yup.date().required('Date can not be empty!'),
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
            <DatePicker name="date" placeholder="Data do meetup" />
            <Input name="location" placeholder="Localização" />
            <Button>
              <button type="submit">
                <MdSave color="#FFf" size={16} />
                Save meetup
              </button>
            </Button>
          </Form>
        </Container>
      ) : (
        <Loading>Loading...</Loading>
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
