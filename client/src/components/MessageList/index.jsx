import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  deleteMessageThunk,
  updateMessageThunk,
} from './../../store/slices/messagesSlice';
import styles from './MessageList.module.css';

function MessageList ({ messages, isFetching, error }) {
  const dispatch = useDispatch();
  const scrollTo = useRef(null);

  const [editMode, setEditMode] = useState({});
  const [editableMessages, setEditableMessages] = useState({});

  useEffect(() => {
    scrollTo?.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleEdit = id => {
    setEditMode(prevState => ({ ...prevState, [id]: true }));
    setEditableMessages(prevState => ({
      ...prevState,
      [id]: messages.find(msg => msg._id === id)?.body || '',
    }));
  };

  const handleSave = id => {
    const newBody = editableMessages[id];
    if (!newBody || newBody.trim() === '') {
      alert('Поле оновлення не може бути порожнім!');
      return;
    }
    dispatch(updateMessageThunk({ id, body: newBody }));
    setEditMode(prevState => ({ ...prevState, [id]: false }));
  };

  const handleCancel = id => {
    setEditMode(prevState => ({ ...prevState, [id]: false }));
  };

  const handleDelete = id => {
    dispatch(deleteMessageThunk(id));
  };

  const handleInputChange = (id, value) => {
    setEditableMessages(prevState => ({
      ...prevState,
      [id]: value,
    }));
  };

  return (
    <section className={styles.messageListContainer}>
      <ul className={styles.messageList}>
        {messages.map(m => (
          <li key={m._id} className={styles.messageItem}>
            <div className={styles.messageContent}>
              <p className={styles.messageId}>ID: {m._id}</p>
              <p className={styles.messageDate}>
                Дата створення: {m.createdAt}
              </p>
              {editMode[m._id] ? (
                <input
                  type='text'
                  className={styles.inputField}
                  value={editableMessages[m._id] || ''}
                  onChange={e => handleInputChange(m._id, e.target.value)}
                />
              ) : (
                <p className={styles.messageBody}>{m.body}</p>
              )}
            </div>
            <div className={styles.buttonContainer}>
              {editMode[m._id] ? (
                <>
                  <button
                    className={styles.saveButton}
                    onClick={() => handleSave(m._id)}
                  >
                    Save
                  </button>
                  <button
                    className={styles.cancelButton}
                    onClick={() => handleCancel(m._id)}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    className={styles.editButton}
                    onClick={() => handleEdit(m._id)}
                  >
                    Edit
                  </button>
                  <button
                    className={styles.deleteButton}
                    onClick={() => handleDelete(m._id)}
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
      <div ref={scrollTo} className={styles.scrollToBottom}>
        {error && (
          <div className={styles.errorMessage}>
            ERROR!!! {error.message || 'Unknown error'}
          </div>
        )}
        {isFetching && (
          <div className={styles.loadingMessage}>
            Messages are loading. Please, wait...
          </div>
        )}
      </div>
    </section>
  );
}

export default MessageList;
