import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Loader, Container } from 'rsuite';
import { database } from '../misc/firebase';
// eslint-disable-next-line arrow-body-style
const ProfilePage = () => {
  const { uid } = useParams();
  const id = uid.split(':')[1];
  const [author, setAuthor] = useState(null);
  const [showImage, setShowImage] = useState(false);
  useEffect(() => {
    const authorRef = database.ref(`/profiles/${id}`);
    authorRef.on('value', snap => {
      const {
        name,
        createdAt,
        accountType,
        topBanner = null,
        rightBanner = null,
        leftBanner = null,
        books = null,
        avatar = null,
      } = snap.val();
      const data = {
        name,
        createdAt,
        accountType,
        topBanner,
        rightBanner,
        leftBanner,
        books,
        avatar,
      };
      if (data.accountType !== 'basic') {
        setShowImage(true);
      }
      setAuthor(data);
    });
    return () => {
      authorRef.off();
    };
  }, []);
  if (!author) {
    return (
      <Container>
        <Loader center vertical size="md" content="Loading" speed="slow" />
      </Container>
    );
  }

  return (
    <div className="profilePageContainer">
      <div className="profileTopContainer">
        <div className="profileTopItems">
          {showImage && <img alt="profile-pic" />} {author.name}
        </div>
      </div>
      <div className="profileBottomContainer">
        <div className="leftBanner">{!showImage && <p>display Ads</p>}</div>
        <div className="activity">activity</div>
        <div className="rightBanner">{!showImage && <p>display Ads</p>}</div>
      </div>
    </div>
  );
};

export default ProfilePage;
