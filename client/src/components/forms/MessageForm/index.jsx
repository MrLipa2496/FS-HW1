import { Formik, Form, Field } from 'formik';
import styles from './MessageForm.module.css';
function MessageForm ({ addMessage }) {
  return (
    <section className={styles.formContainer} style={{ marginTop: 'auto' }}>
      <Formik initialValues={{ body: '' }} onSubmit={addMessage}>
        <Form>
          <Field name='body'></Field>
          <button type='submit'>Send</button>
        </Form>
      </Formik>
    </section>
  );
}

export default MessageForm;
