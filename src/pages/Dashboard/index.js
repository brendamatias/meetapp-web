import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';
import {
  MdAddCircleOutline,
  MdChevronLeft,
  MdChevronRight,
  MdSentimentDissatisfied,
} from 'react-icons/md';

import api from '~/services/api';

import { Container, MeetupCard, NoMeetup, Pagination, Loading } from './styles';

const formatDate = d => format(d, "dd ' de ' MMMM', at ' H'h'", { locale: pt });

export default function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [meetups, setMeetups] = useState([]);

  const [page, setPage] = useState(1);

  useEffect(() => {
    async function loadMeetups() {
      const response = await api.get('organizing', {
        params: {
          page,
        },
      });

      const data = response.data.map(meetup => ({
        ...meetup,
        formattedDate: formatDate(parseISO(meetup.date)),
      }));

      setMeetups(data);
      setLoading(false);
    }

    loadMeetups();
  }, [page]);

  async function handlePageChange(next) {
    const nextPage = page + (next ? 1 : -1);

    setPage(nextPage);
  }

  return (
    <Container>
      <header>
        <strong>My meetups</strong>
        <Link to="/new">
          <MdAddCircleOutline color="#FFf" size={20} />
          New meetup
        </Link>
      </header>
      <nav>
        {!loading ? (
          <>
            {meetups.length > 0 ? (
              <ul>
                {meetups.map(meetup => (
                  <MeetupCard key={String(meetup.id)}>
                    <Link to={`details/${meetup.id}`}>{meetup.title}</Link>
                    <time>{meetup.formattedDate}</time>
                  </MeetupCard>
                ))}
              </ul>
            ) : (
              <NoMeetup>
                <MdSentimentDissatisfied color="#fff" size={40} />
                <span>You have no any meetup.</span>
              </NoMeetup>
            )}

            <Pagination>
              {page > 1 && (
                <button onClick={() => handlePageChange(false)} type="button">
                  <MdChevronLeft color="#fff" size={30} />
                </button>
              )}

              <span>{page}</span>

              {meetups.length > 0 && (
                <button onClick={() => handlePageChange(true)} type="button">
                  <MdChevronRight color="#fff" size={30} />
                </button>
              )}
            </Pagination>
          </>
        ) : (
          <Loading>Carregando...</Loading>
        )}
      </nav>
    </Container>
  );
}
