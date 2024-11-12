import { useEffect, useRef } from 'react';
import styles from './MessageList.module.css';
function MessageList ({ messages, isFetching, error }) {
  const scrollTo = useRef(null);

  useEffect(() => {
    scrollTo?.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <section style={{ overflowY: 'auto' }}>
      <ul>
        {messages.map(m => (
          <li key={m._id} className={styles.messageItem}>
            <p>{m._id}</p>
            <p>{m.body}</p>
            <p>{m.createdAt}</p>
          </li>
        ))}
      </ul>
      <div ref={scrollTo} style={{ height: '20px' }}>
        {error && <div style={{ color: 'red' }}>ERROR!!!</div>}
        {isFetching && <div>Messages is loading. Please, wait...</div>}
      </div>
    </section>
  );
}

export default MessageList;
