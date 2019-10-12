import React, { useState } from 'react';
import { format } from 'date-fns';
import { toast } from 'react-toastify';

import api from '~/services/api';
import { getError } from '~/util/errorHandler';

import FormMeetup from '~/components/FormMeetup';

export default function New({ history }) {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(data) {
    console.log(data);
    try {
      setLoading(true);
      data.date = format(new Date(data.date), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");
      const response = await api.post('meetups', data);
      const { id } = response.data;

      history.push(`/details/${id}`);
      toast.success('Meetup created successfully!');
      setLoading(false);
    } catch (err) {
      toast.error(getError(err) || 'Internal error!');
      setLoading(false);
    }
  }

  return (
    <>
      <FormMeetup handleSubmit={handleSubmit} loading={loading} />
    </>
  );
}
