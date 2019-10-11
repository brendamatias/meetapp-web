import React, { useMemo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Textarea } from '@rocketseat/unform';
import * as Yup from 'yup';

import { toast } from 'react-toastify';

import api from '~/services/api';

import { Container, Loading } from '~/styles/FormMeetup/styles';

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

export default function New({ history, match }) {
  const id = useMemo(() => match.params.id, [match.params.id]);

  const [loading, setLoading] = useState(false);
  const [meetup, setMeetup] = useState(null);

  useEffect(() => {
    async function loadMeetup() {
      try {
        setLoading(true);

        const { data } = await api.get(`organizing/${id}`);

        setMeetup(data);
        setLoading(false);
      } catch (err) {
        toast.error('Ops, erro interno.');
      }
    }

    loadMeetup();
  }, [id]);

  async function handleSubmit(data) {
    try {
      await api.put(`meetups/${id}`, data);

      history.push(`/details/${id}`);
      toast.success('Meetup atualizado com sucesso!');
    } catch (err) {
      toast.error('Ops, erro ao atualizar o meetup.');
    }
  }

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
              <button type="submit">Salvar meetup</button>
            </div>
          </Form>
        </Container>
      ) : (
        <Loading>Carregando...</Loading>
      )}
    </>
  );
}

New.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
