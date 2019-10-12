import React, { useMemo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { parseISO } from 'date-fns';

import api from '~/services/api';

import FormMeetup from '~/components/FormMeetup';

export default function New({ history, match }) {
  const id = useMemo(() => match.params.id, [match.params.id]);

  const [loading, setLoading] = useState(false);
  const [meetup, setMeetup] = useState(null);

  useEffect(() => {
    async function loadMeetup() {
      try {
        setLoading(true);

        const { data } = await api.get(`organizing/${id}`);

        setMeetup({
          ...data,
          date: parseISO(data.date),
        });

        setLoading(false);
      } catch (err) {
        toast.error('Ops, erro interno.');
      }
    }

    loadMeetup();
  }, [id]);

  async function handleSubmit(data) {
    console.log(data);
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
      <FormMeetup meetup={meetup} onSubmit={handleSubmit} loading={loading} />
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
