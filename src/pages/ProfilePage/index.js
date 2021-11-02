import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { useDetectAdBlock } from 'adblock-detect-react';
import AdSense from 'react-adsense';
import {
  Loader,
  Container,
  Button,
  Icon,
  Alert,
  Tooltip,
  Whisper,
  Grid,
} from 'rsuite';
import { auth, database, storage } from '../../misc/firebase';
import ProfileCoverUploadBtn from './ProfileCoverUploadBtn';
import GoogleAd from '../../components/GoogleAd';
import SideAd from '../../components/SideAd';
import AvatarUploadBtn from './AvatarUploadBtn';
import { getBookByOwner, getUserById } from '../../misc/helpers';
import { useBooks } from '../../context/book.context';
import Book from '../../components/Book';

// eslint-disable-next-line arrow-body-style
const ProfilePage = () => {
  const { profile_uid } = useParams();
  const id = profile_uid.split(':')[1];
  const isUser = auth.currentUser.uid === id ? true : false;
  const adBlockDetected = useDetectAdBlock();
  const [author, setAuthor] = useState(null);
  const [cover, setCover] = useState(null);
  const [valid, setIsValid] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState('books');
  const { bookSnap } = useBooks();
  const myBooks = getBookByOwner(bookSnap, id);
  const switchToActivity = () => {
    if (activeTab !== 'activity') {
      setActiveTab('activity');
    }
  };
  const switchToBooks = () => {
    if (activeTab !== 'books') {
      setActiveTab('books');
    }
  };
  useEffect(() => {
    setIsLoading(true);
    const authorRef = database.ref(`/profiles/${id}`);
    authorRef.on('value', snap => {
      if (snap.val() === null) {
        setIsValid(false);
        return;
      } else {
        const { name, createdAt, accountType, topBanner, avatar } = snap.val();
        const data = {
          name,
          createdAt,
          accountType,
          topBanner,
          avatar,
        };
        if (data.accountType !== 'basic') {
          setShowImage(true);
        }
        setAuthor(data);
        setCover(topBanner);
      }
    });
    setIsLoading(false);
    return () => {
      authorRef.off();
    };
  }, []);
  const edit = () => {
    setIsLoading(true);
    setEditMode(!editMode);
    setIsLoading(false);
  };
  if (!author && isLoading) {
    return (
      <Container>
        <Loader center vertical size="md" content="Loading" speed="slow" />
      </Container>
    );
  }
  if (!valid) {
    return (
      <div>
        <p
          style={{
            position: 'absolute',
            marginLeft: '40vw',
            marginTop: '30vh',
          }}
        >
          INVALID USER ID
          <Link to="/home">Go TO HOME</Link>
        </p>
      </div>
    );
  }
  if (!adBlockDetected) {
    return (
      <div className="profilePageContainer">
        {cover && (
          <div
            className="profileTopContainer"
            style={{
              marginTop: '1vh',
              backgroundSize: '100% 100%',
              backgroundRepeat: 'no-repeat',
              backgroundImage: `url(${cover})`,
            }}
          >
            {showImage && editMode && (
              <ProfileCoverUploadBtn id={id} target="topBanner" />
            )}
            <div
              className="profileTopItems"
              style={{
                color: 'white',
                padding: '10px',
                backgroundColor: 'rgba(0, 0, 0, .68)',
              }}
            >
              {author && (
                <div>
                  <div
                    style={{
                      display: 'flex',
                      height: '7vh',
                      width: '10vw',
                      maxWidth: '100px',
                      backgroundSize: '100% 100%',
                      backgroundImage: `url(${author.avatar})`,
                    }}
                  ></div>
                  {editMode && <AvatarUploadBtn id={id} />}
                </div>
              )}
              {author && (
                <h4 style={{ marginTop: '30px', marginLeft: '40px' }}>
                  {author.name}
                </h4>
              )}
            </div>
            {isUser && (
              <Whisper
                trigger="hover"
                placement="left"
                speaker={
                  <Tooltip>
                    Go To <a>https://www.canva.com/</a> to Design your Cover
                    Image
                  </Tooltip>
                }
              >
                <Button
                  className="edit-profile-btn"
                  onClick={edit}
                  style={{
                    position: 'absolute',
                    top: '12px',
                    right: '3vw',
                    height: '5vh',
                    backgroundColor: editMode ? 'green' : 'grey',
                  }}
                >
                  Edit Profile <Icon icon="pencil" />
                </Button>
              </Whisper>
            )}
          </div>
        )}

        <div className="profileBottomContainer">
          <SideAd />
          <div className="activity">
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-around',
              }}
            >
              <h3
                onClick={switchToActivity}
                style={{
                  textDecoration:
                    activeTab === 'activity' ? 'underline' : 'none',
                  textDecorationColor:
                    activeTab === 'activity' ? 'blue' : 'none',
                }}
                disable={activeTab === 'activity' ? 'true' : 'false'}
              >
                Activity
              </h3>
              <h3
                onClick={switchToBooks}
                style={{
                  textDecoration: activeTab === 'books' ? 'underline' : 'none',
                  textDecorationColor: activeTab === 'books' ? 'blue' : 'none',
                }}
                disable={activeTab === 'books' ? 'true' : 'false'}
              >
                Books
              </h3>
            </div>
            <div
              style={{
                paddingLeft: '2vw',
                overflow: 'auto',
                height: '65vh',
                backgroundColor: 'AppWorkspace',
              }}
            >
              {activeTab === 'books' ? (
                <div>
                  {myBooks.map((el, index) => (
                    <Book key={myBooks[index].id} book={myBooks[index]} />
                  ))}
                </div>
              ) : (
                <></>
              )}
              {activeTab === 'activity' ? <p>my activity</p> : <></>}
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <Container>
      <Grid>
        <h1>Please Disable AD Block</h1>
      </Grid>
    </Container>
  );
};

export default ProfilePage;
