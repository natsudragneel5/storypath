import React, { useState, useRef, memo } from 'react';
import { Alert, Button, Icon, Modal } from 'rsuite';
import { useModalState } from '../../misc/custom-hooks';
import AvatarEditor from 'react-avatar-editor';
import { database, storage } from '../../misc/firebase';

const fileInputTypes = '.png, .jpeg, .jpg';
const acceptedFileTypes = ['image/png', 'image/jpeg', 'image/pjpeg'];
const isValidFile = file => acceptedFileTypes.includes(file.type);
const getBlob = canvas => {
  return new Promise((resolve, reject) => {
    canvas.toBlob(blob => {
      if (blob) {
        resolve(blob);
      } else {
        reject(new Error('File processing error'));
      }
    });
  });
};

const AvatarUploadBtn = ({ id }) => {
  const { isOpen, open, close } = useModalState();
  const [img, setImg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const coverRef = useRef();
  const onFileInputChange = ev => {
    const currFiles = ev.target.files;
    if (currFiles.length === 1) {
      const file = currFiles[0];
      if (isValidFile(file)) {
        setImg(file);
        console.log(img);
        open();
      } else {
        Alert.warning(`Wrong file type ${file.type}`, 4000);
      }
    }
  };

  const onUploadClick = async () => {
    const canvas = coverRef.current.getImageScaledToCanvas();
    try {
      setIsLoading(true);
      const blob = await getBlob(canvas);
      const coverFileRef = storage.ref(`/profiles/${id}`).child(`avatar`);
      const uploadCoverResult = await coverFileRef.put(blob, {
        cacheControl: `public, max-age=${3600 * 24 * 3}`,
      });
      const downloadUrl = uploadCoverResult.ref.getDownloadURL();
      const profileCoverRef = database.ref(`/profiles/${id}`).child('/avatar');
      downloadUrl.then(url => {
        profileCoverRef.set(url);
      });
      Alert.info('Avatar has been uploaded', 4000);
      setIsLoading(false);
      close();
    } catch (err) {
      setIsLoading(false);
      close();
      Alert.error(err.message, 4000);
    }
  };
  return (
    <div className="text-center">
      <label htmlFor="profile-pic-upload">
        <h6>
          Edit <Icon icon="pencil" />
        </h6>
        <input
          id="profile-pic-upload"
          type="file"
          className="d-none"
          accept={fileInputTypes}
          onChange={onFileInputChange}
        />
      </label>
      <Modal show={isOpen} onHide={close}>
        <Modal.Header>
          <Modal.Title>Upload New Profile Picture</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {img && <AvatarEditor ref={coverRef} image={img} border={0} />}
        </Modal.Body>
        <Modal.Footer>
          <Button
            block
            appearance="ghost"
            onClick={onUploadClick}
            disabled={isLoading}
          >
            Upload
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default memo(AvatarUploadBtn);
