import React, { useCallback, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Alert,
  Button,
  ControlLabel,
  Drawer,
  Dropdown,
  Form,
  FormControl,
  FormGroup,
  Icon,
  Modal,
  Nav,
  Schema,
  SelectPicker,
} from 'rsuite';
import { useBooks } from '../../context/book.context';
import { useModalState } from '../../misc/custom-hooks';
import firebase from 'firebase/app';
import { database } from '../../misc/firebase';
import ProviderBlock from './ProviderBlock';
import { getBookByOwner } from '../../misc/helpers';
const { StringType } = Schema.Types;
const model = Schema.Model({
  name: StringType().isRequired('Book name is required'),
  description: StringType(),
  writeAccess: StringType().isRequired('Write Access cannot be empty'),
});
const INITIAL_FORM = {
  name: '',
  description: '',
  writeAccess: '',
};
// eslint-disable-next-line arrow-body-style
const SidNavBar = ({ profile, location, onSignOut, close }) => {
  const { name, avatar, uid } = profile;
  const { open, isOpen } = useModalState();
  const [isLoading, setIsLoading] = useState(false);
  const [formValue, setFormValue] = useState(INITIAL_FORM);
  const { bookSnap, booksDispatch } = useBooks();
  const myBooks = getBookByOwner(bookSnap, uid);
  const onFormChange = useCallback(value => {
    setFormValue(value);
  }, []);
  const formRef = useRef();
  const onSubmit = () => {
    if (!formRef.current.check()) {
      return;
    }
    setIsLoading(true);
    const bookRef = database.ref(`/books`);
    const activityRef = database.ref(`/activity/${uid}`);
    try {
      const createdAt = firebase.database.ServerValue.TIMESTAMP;
      const bookId = bookRef.push().key;
      const updates = {};
      const data = {
        cover: 'default',
        createdAt: createdAt,
        depth: 0,
        description: formValue.description,
        name: formValue.name,
        owner: uid,
        writeAccess: formValue.writeAccess,
      };
      const data2 = {
        createdAt: createdAt,
        task: `Created a New Book ${formValue.name}`,
        link: `/${bookId}`,
      };
      updates[`/books/${bookId}`] = data;
      database.ref().update(updates);
      activityRef.push(data2);
      Alert.info(`New Book Addes ${formValue.name} created`, 4000);
    } catch (err) {
      Alert.error(err.message, 4000);
    }
    setFormValue(INITIAL_FORM);
    setIsLoading(false);
    close();
  };
  const option = [
    { label: 'From list', value: 'list' },
    { label: 'Public', value: 'public' },
  ];
  return (
    <>
      <Drawer.Header>
        <ProviderBlock />
        <Button block color="red" onClick={onSignOut}>
          Sign out
        </Button>
      </Drawer.Header>
      <Drawer.Body>
        <Nav
          appearance="subtle"
          vertical
          reversed
          activeKey={location.pathname}
        >
          <Nav.Item
            componentClass={Link}
            to={`/profile/:${uid}`}
            eventKey={`/profile/:${uid}`}
            onSelect={close}
          >
            <Icon icon="profile" />
            Profile
          </Nav.Item>
          <Nav.Item
            componentClass={Link}
            to="/"
            eventKey={'/'}
            onSelect={close}
          >
            <Icon icon="home" />
            Home
          </Nav.Item>

          <Nav.Item>
            <Button onClick={open}>
              <Icon icon="pencil-square" />
              Create New Book +
            </Button>
            <Modal show={isOpen} onHide={close}>
              <Modal.Header>
                <Modal.Title>Create New Book</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form
                  fluid
                  onChange={onFormChange}
                  formValue={formValue}
                  model={model}
                  ref={formRef}
                >
                  <FormGroup>
                    <ControlLabel>Book Name</ControlLabel>
                    <FormControl name="name" placeholder="Enter Book Name..." />
                  </FormGroup>
                  <FormGroup>
                    <ControlLabel>Write Access</ControlLabel>
                    <SelectPicker
                      value={formValue.writeAccess}
                      placeholder="select access"
                      data={option}
                      onChange={value => {
                        setFormValue({ ...formValue, writeAccess: value });
                      }}
                    />
                  </FormGroup>
                  <FormGroup>
                    <ControlLabel>Description</ControlLabel>
                    <FormControl
                      componentClass="textarea"
                      rows={5}
                      name="description"
                      placeholder="Enter Book Description..."
                    />
                  </FormGroup>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  block
                  appearance="primary"
                  onClick={onSubmit}
                  disabled={isLoading}
                >
                  Create New Book
                </Button>
              </Modal.Footer>
            </Modal>
          </Nav.Item>
          <Dropdown title="My Books" trigger={['click', 'hover']}>
            {myBooks.map((el, index) => (
              <Dropdown.Item
                key={myBooks[index].id}
                componentClass={Link}
                to={`/books/:${myBooks[index].id}`}
                eventKey={`/books/:${myBooks[index].id}`}
                onSelect={close}
              >
                {myBooks[index].name}
              </Dropdown.Item>
            ))}
          </Dropdown>
        </Nav>
      </Drawer.Body>
    </>
  );
};

export default SidNavBar;
