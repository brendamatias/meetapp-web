import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';

import { toast } from 'react-toastify';

import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';
import { MdClose } from 'react-icons/md';

import colors from '~/styles/colors';
import api from '~/services/api';

import {
  Container,
  Loading,
  Button,
  Meetup,
  CancellationModal,
} from './styles';

const formatDate = d =>
  format(d, "dd ' de ' MMMM ', às ' H'h'", { locale: pt });

export default function Edit({ history, match }) {
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
      toast.error('Ops, ocorreu um erro ao tentar deleter o meetup :(');
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
            Editar
          </Button>
          <Button color={colors.pink} onClick={() => setCancelModalOpen(true)}>
            Cancelar
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
                <span>Deseja mesmo cancelar esse meetup?</span>
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
                  Não
                </Button>
                <Button color={colors.blue} onClick={handleCancelMeetup}>
                  Sim, cancelar meetup!
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

Edit.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
