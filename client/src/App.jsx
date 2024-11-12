import { useEffect } from 'react';
import { connect } from 'react-redux';
import {
  getMessagesThunk,
  newMessagePending,
} from './store/slices/messagesSlice';
import { ws } from './api';
import MessageForm from './components/forms/MessageForm';
import MessageList from './components/MessageList';

function App ({ messages, isFetching, error, limit, get, fetching }) {
  useEffect(() => {
    get(limit);
  }, [limit]);

  const addMessage = (values, formikBag) => {
    // create(values);
    ws.createMessage(values);
    fetching();
    formikBag.resetForm();
  };
  return (
    <article
      style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}
    >
      <MessageList messages={messages} error={error} isFetching={isFetching} />
      <MessageForm addMessage={addMessage} />
    </article>
  );
}

const mapStateToProps = ({ chat }) => chat;

const mapDispatchToProps = dispatch => ({
  get: limit => dispatch(getMessagesThunk(limit)),
  fetching: () => dispatch(newMessagePending()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
