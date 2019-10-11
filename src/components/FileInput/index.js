import React, { useState, useRef, useEffect } from 'react';
import { useField } from '@rocketseat/unform';
import { toast } from 'react-toastify';

import { MdAddAPhoto } from 'react-icons/md';

import api from '~/services/api';

import { Container } from './styles';

export default function FileInput() {
  const { defaultValue, registerField } = useField('file');

  const [file, setFile] = useState(defaultValue && defaultValue.id);
  const [preview, setPreview] = useState(defaultValue && defaultValue.url);

  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      registerField({
        name: 'file_id',
        ref: ref.current,
        path: 'dataset.file',
      });
    }
  }, [ref, registerField]);

  async function handleChange(e) {
    const data = new FormData();

    data.append('file', e.target.files[0]);
    data.append('type', 'file');

    try {
      const response = await api.post('files', data);

      const { id, url } = response.data;

      setFile(id);
      setPreview(url);
    } catch (err) {
      toast.error('Ops, falha ao inserir imagem.');
    }
  }

  return (
    <Container>
      <label htmlFor="file">
        {preview && <img src={preview} alt="File" />}

        {!preview && <MdAddAPhoto size={48} color="rgba(255, 255, 255, .6)" />}

        <input
          type="file"
          id="file"
          accept="image/*"
          data-file={file}
          onChange={handleChange}
          ref={ref}
        />
      </label>
    </Container>
  );
}
