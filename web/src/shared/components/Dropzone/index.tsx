import React, { useCallback, useState } from 'react';
import './styles.css';
import { useDropzone } from 'react-dropzone';
import { FiUpload } from 'react-icons/fi';

interface EcoletaDropzoneProps {
  onFileUploaded: (file: File) => void;
}

export const EcoletaDropzone: React.FC<EcoletaDropzoneProps> = ({
  onFileUploaded,
}) => {
  const [selectedFileUrl, setSelectedFileUrl] = useState<string>('');
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      setSelectedFileUrl(URL.createObjectURL(file));
      onFileUploaded(file);
    },
    [onFileUploaded],
  );
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*',
  });

  return (
    <div className="dropzone" {...getRootProps()}>
      <input {...getInputProps()} accept="image/*" />
      {selectedFileUrl ? (
        <img src={selectedFileUrl} alt="Estabelecimento"></img>
      ) : (
        <p>
          <FiUpload />
          Imagem do estabelecimento
        </p>
      )}
    </div>
  );
};
