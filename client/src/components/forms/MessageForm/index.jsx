import { Formik, Form, Field } from 'formik';
import styles from './MessageForm.module.css';

function MessageForm ({ addMessage }) {
  return (
    <section className={styles.formContainer}>
      <Formik initialValues={{ body: '' }} onSubmit={addMessage}>
        <Form className={styles.messageForm}>
          <Field
            name='body'
            className={styles.inputField}
            placeholder='Enter your message...'
          />
          <button type='submit' className={styles.submitButton}>
            Send
          </button>
        </Form>
      </Formik>
    </section>
  );
}

export default MessageForm;
