import React from 'react';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { toast } from 'react-toastify';

import api from '~/services/api';

import { Container } from './styles';

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

export default function New({ history }) {
  async function handleSubmit(data) {
    try {
      const response = await api.post('meetups', data);
      const { id } = response.data;

      history.push(`/details/${id}`);
    } catch (err) {
      toast.error('Ops, não foi possível incluir o meetup.');
    }
  }

  return (
    <Container>
      <Form schema={schema} onSubmit={handleSubmit}>
        <FileInput name="file_id" />
        <Input name="title" placeholder="Título do Meetup" />
        <Input name="description" placeholder="Descrição completa" />
        <Input name="location" placeholder="Localização" />
        <div>
          <button type="submit">Salvar meetup</button>
        </div>
      </Form>
    </Container>
  );
}
