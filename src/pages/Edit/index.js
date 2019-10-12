import React, { useMemo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { format, parseISO } from 'date-fns';
import { toast } from 'react-toastify';

import api from '~/services/api';
import { getError } from '~/util/errorHandler';

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
        toast.error(getError(err) || 'Internal error!');
      }
    }

    loadMeetup();
  }, [id]);

  async function handleSubmit(data) {
    try {
      data.date = format(new Date(data.date), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");
      await api.put(`meetups/${id}`, data);

      history.push(`/details/${id}`);
      toast.success('Meetup updated successfully!');
    } catch (err) {
      toast.error(getError(err) || 'Internal error!');
    }
  }

  return (
    <>
      <FormMeetup
        meetup={meetup}
        handleSubmit={handleSubmit}
        loading={loading}
      />
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
