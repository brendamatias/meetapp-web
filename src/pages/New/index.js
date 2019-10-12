import React, { useState } from 'react';
import { toast } from 'react-toastify';

import api from '~/services/api';

import FormMeetup from '~/components/FormMeetup';

export default function New({ history }) {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(data) {
    try {
      setLoading(true);
      const response = await api.post('meetups', data);
      const { id } = response.data;

      history.push(`/details/${id}`);
      toast.success('Meetup criado com sucesso!');
      setLoading(false);
    } catch (err) {
      toast.error('Ops, não foi possível incluir o meetup.');
      setLoading(false);
    }
  }

  return (
    <>
      <FormMeetup onSubmit={handleSubmit} loading={loading} />
    </>
  );
}
