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

  // Локальний стан для режиму редагування
  const [editMode, setEditMode] = useState({});
  const [editableMessages, setEditableMessages] = useState({});

  useEffect(() => {
    scrollTo?.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Ввімкнути режим редагування
  const handleEdit = id => {
    setEditMode(prevState => ({ ...prevState, [id]: true }));
    setEditableMessages(prevState => ({
      ...prevState,
      [id]: messages.find(msg => msg._id === id)?.body || '',
    }));
  };

  // Зберегти зміни
  const handleSave = id => {
    const newBody = editableMessages[id];
    if (!newBody || newBody.trim() === '') {
      alert('Поле оновлення не може бути порожнім!');
      return;
    }
    dispatch(updateMessageThunk({ id, body: newBody }));
    setEditMode(prevState => ({ ...prevState, [id]: false }));
  };

  // Скасувати редагування
  const handleCancel = id => {
    setEditMode(prevState => ({ ...prevState, [id]: false }));
  };

  // Видалити повідомлення
  const handleDelete = id => {
    dispatch(deleteMessageThunk(id));
  };

  // Оновити текст у стані
  const handleInputChange = (id, value) => {
    setEditableMessages(prevState => ({
      ...prevState,
      [id]: value,
    }));
  };

  return (
    <section style={{ overflowY: 'auto' }}>
      <ul>
        {messages.map(m => (
          <li key={m._id} className={styles.messageItem}>
            <p>ID: {m._id}</p>
            <p>Дата створення: {m.createdAt}</p>

            {editMode[m._id] ? (
              // Режим редагування
              <>
                <input
                  type='text'
                  value={editableMessages[m._id] || ''}
                  onChange={e => handleInputChange(m._id, e.target.value)}
                />
                <button onClick={() => handleSave(m._id)}>Save</button>
                <button onClick={() => handleCancel(m._id)}>Cancel</button>
              </>
            ) : (
              // Звичайний режим
              <>
                <p>{m.body}</p>
                <button onClick={() => handleEdit(m._id)}>Edit</button>
                <button onClick={() => handleDelete(m._id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
      <div ref={scrollTo} style={{ height: '20px' }}>
        {error && (
          <div style={{ color: 'red' }}>
            ERROR!!! {error.message || 'Unknown error'}
          </div>
        )}
        {isFetching && <div>Messages are loading. Please, wait...</div>}
      </div>
    </section>
  );
}

export default MessageList;
