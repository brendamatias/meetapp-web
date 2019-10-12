import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';

import { toast } from 'react-toastify';

import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';
import { MdClose, MdEdit, MdDeleteForever } from 'react-icons/md';

import colors from '~/styles/colors';

import api from '~/services/api';
import { getError } from '~/util/errorHandler';

import {
  Container,
  Loading,
  Button,
  Meetup,
  CancellationModal,
} from './styles';

const formatDate = d => format(d, "dd ' de ' MMMM', at ' H'h'", { locale: pt });

export default function Details({ history, match }) {
  const [cancelModalOpen, setCancelModalOpen] = useState(false);

  const id = useMemo(
    () => ({
      value: match.params.id,
    }),
    [match.params.id]
  );

  const [loading, setLoading] = useState(true);
  const [meetup, setMeetup] = useState([]);

  useEffect(() => {
    async function loadMeetups() {
      const { data } = await api.get(`organizing/${id.value}`);

      data.date = formatDate(parseISO(data.date));

      setMeetup(data);
      setLoading(false);
    }

    loadMeetups();
  }, [id.value]);

  async function handleCancelMeetup() {
    try {
      await api.delete(`meetups/${id.value}`);

      history.push('/meetups');
    } catch (err) {
      toast.error(getError(err) || 'Internal error!');
    }
  }

  return (
    <Container>
      <header>
        <strong>{meetup.title}</strong>
        <div>
          <Button
            color={colors.blue}
            onClick={() => history.push(`/edit/${id.value}`)}
          >
            <span>
              <MdEdit color="#FFf" size={16} /> Edit
            </span>
          </Button>
          <Button color={colors.pink} onClick={() => setCancelModalOpen(true)}>
            <span>
              <MdDeleteForever color="#FFf" size={16} /> Cancel
            </span>
          </Button>
        </div>
      </header>
      {!loading ? (
        <>
          <Meetup>
            <img src={meetup.file.url} alt={meetup.title} />
            <p>{meetup.description}</p>
            <div>
              <span>{meetup.date}</span>
              <span>{meetup.location}</span>
            </div>
          </Meetup>

          <CancellationModal open={cancelModalOpen}>
            <div className="content">
              <header>
                <span>Do you really want to cancel this meetup?</span>
                <button
                  onClick={() => setCancelModalOpen(false)}
                  className="close"
                  type="button"
                >
                  <MdClose color="#fff" size={24} />
                </button>
              </header>

              <div>
                <Button
                  color={colors.pink}
                  onClick={() => setCancelModalOpen(false)}
                >
                  No
                </Button>
                <Button color={colors.blue} onClick={handleCancelMeetup}>
                  Yes, cancel!
                </Button>
              </div>
            </div>
          </CancellationModal>
        </>
      ) : (
        <Loading>Carregando...</Loading>
      )}
    </Container>
  );
}

Details.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
