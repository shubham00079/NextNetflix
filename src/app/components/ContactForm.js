'use client';
import styles from '@/app/contact/contact.module.css';
import { Mulish } from 'next/font/google';
import { useState } from 'react';

const mulish = Mulish({
  weight: ['300', '400', '500', '600', '700', '800'],
  subsets: ['latin'],
  display: 'swap',
});

export default function ContactForm() {
  const [user, setUser] = useState({
    username: '',
    email: '',
    phone: '',
    message: '',
  });

  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUser((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { Content_Type: 'application/json' },
        body: JSON.stringify({
          username: user.username,
          email: user.email,
          phone: user.phone,
          message: user.message,
        }),
      });

      if (res.status === 200) {
        setUser({
          username: '',
          email: '',
          phone: '',
          message: '',
        });
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.log(e);
    }
  };

  return (
    <form className={styles.contact_form} onSubmit={handleSubmit}>
      <div className={styles.input_fields}>
        <label htmlFor="username" className={styles.label}>
          Enter your username
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Enter you username"
            className={mulish.className}
            required
            value={user.username}
            onChange={(e) => handleChange(e)}
            autoComplete="off"
          />
        </label>
      </div>
      <br />
      <div className={styles.input_fields}>
        <label htmlFor="email" className={styles.label}>
          Enter your email :
          <input
            type="text"
            name="email"
            id="email"
            placeholder="Enter you email"
            className={mulish.className}
            required
            value={user.email}
            onChange={(e) => handleChange(e)}
            autoComplete="off"
          />
        </label>
      </div>
      <br />
      <div className={styles.input_fields}>
        <label htmlFor="phone" className={styles.label}>
          Enter your phone :
          <input
            type="number"
            name="phone"
            id="phone"
            placeholder="Enter you phone"
            className={mulish.className}
            required
            value={user.phone}
            onChange={(e) => handleChange(e)}
            autoComplete="off"
          />
        </label>
      </div>
      <br />
      <div className={styles.input_fields}>
        <label htmlFor="message" className={styles.label}>
          Message
          <textarea
            name="message"
            id="message"
            rows={5}
            placeholder="Enter you message"
            className={mulish.className}
            required
            value={user.message}
            onChange={(e) => handleChange(e)}
            autoComplete="off"
          />
        </label>
      </div>
      <br />
      <div>
        {status === 'success' && (
          <p className={styles.success_msg}>Thank you for your message!</p>
        )}
        {status === 'error' && (
          <p className={styles.error_msg}>
            There was an error submitting your message. Please try again.
          </p>
        )}

        <button type="submit" className={mulish.className}>
          Send a message
        </button>
      </div>
    </form>
  );
}
