import { useState } from 'react';
import Screen from './Screen';
import Reveal from './Reveal';
import { NAV } from '../data/facilities';
import { CONTACT } from '../data/facilities';
import { WINGS, minRate, img } from '../data/rooms';
import { useLang } from '../i18n/LanguageContext';

const EMPTY = { name: '', phone: '', email: '', checkin: '', checkout: '', message: '' };

function Field({ label, error, children }) {
  return (
    <label className={`field ${error ? 'is-invalid' : ''}`}>
      {children}
      <span>{label}</span>
    </label>
  );
}

export default function Contact({ room, onRoomChange }) {
  const { t, L } = useLang();
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | sent | invalid

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    const next = {
      name: !form.name.trim(),
      email: !/^\S+@\S+\.\S+$/.test(form.email),
    };
    setErrors(next);
    if (next.name || next.email) return setStatus('invalid');
    setStatus('sending');
    // TODO: send to WhatsApp / email / booking backend
    setTimeout(() => {
      setStatus('sent');
      setForm(EMPTY);
      onRoomChange('');
    }, 900);
  };

  const message = {
    invalid: t('form.invalid'),
    sent: t('form.sent'),
  }[status] || '';

  return (
    <Screen id="contact" theme="dark" className="contact">
      <div className="contact__bg"><img src={img('hero-building.jpg')} alt="" /></div>
      <div className="container screen__inner contact__grid">
        <Reveal className="contact__info">
          <p className="eyebrow">{t('contact.eyebrow')}</p>
          <h2 className="title">{t('contact.title1')}<em>{t('contact.title2')}</em></h2>
          <span className="glowline" />
          <p>{t('contact.lead')}</p>
          <ul className="contact__list">
            <li><span>{t('contact.phone')}</span><a href={CONTACT.phoneHref}>{CONTACT.phone}</a></li>
            <li><span>{t('contact.email')}</span><a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></li>
            <li><span>{t('contact.address')}</span>{CONTACT.address}</li>
          </ul>
          <div className="socials">
            <a className="social social--facebook" href={CONTACT.socials.facebook} aria-label="Facebook">
              <svg viewBox="0 0 24 24"><path className="fill" d="M15.12 5.32H17V2.14A26 26 0 0 0 14.26 2c-2.72 0-4.58 1.66-4.58 4.7v2.62H6.61v3.56h3.07V22h3.68v-9.12h3.06l.46-3.56h-3.52V7.05c0-1.03.28-1.73 1.76-1.73z" /></svg>
            </a>
            <a className="social social--instagram" href={CONTACT.socials.instagram} aria-label="Instagram">
              <svg viewBox="0 0 24 24"><rect x="3.5" y="3.5" width="17" height="17" rx="5" /><circle cx="12" cy="12" r="4" /><circle className="fill" cx="17.3" cy="6.7" r="1.1" /></svg>
            </a>
            <a className="social social--whatsapp" href={CONTACT.socials.whatsapp} aria-label="WhatsApp">
              <svg viewBox="0 0 24 24"><path d="M12 3a9 9 0 0 0-7.8 13.5L3 21l4.6-1.2A9 9 0 1 0 12 3z" /><path className="fill" d="M16.6 14.2c-.3-.1-1.6-.8-1.8-.9-.3-.1-.5-.1-.7.1-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.1-.4-2.1-1.3-.8-.7-1.3-1.6-1.5-1.8-.2-.3 0-.4.1-.6l.4-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5-.1-.1-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4s1 2.8 1.2 3c.1.2 2 3.1 4.9 4.3 2.4 1 2.9.8 3.4.7.5-.1 1.6-.7 1.8-1.3.2-.6.2-1.2.2-1.3-.1-.1-.3-.2-.6-.3z" /></svg>
            </a>
          </div>
        </Reveal>

        <Reveal as="form" className="form" noValidate onSubmit={submit} delay={0.15}>
          <div className="form__row">
            <Field label={t('form.name')} error={errors.name}><input type="text" value={form.name} onChange={set('name')} placeholder=" " /></Field>
            <Field label={t('form.phone')}><input type="tel" value={form.phone} onChange={set('phone')} placeholder=" " /></Field>
          </div>
          <Field label={t('form.email')} error={errors.email}><input type="email" value={form.email} onChange={set('email')} placeholder=" " /></Field>
          <div className="form__row">
            <Field label={t('form.checkin')}><input type="date" value={form.checkin} onChange={set('checkin')} /></Field>
            <Field label={t('form.checkout')}><input type="date" value={form.checkout} min={form.checkin || undefined} onChange={set('checkout')} /></Field>
          </div>
          <label className="field field--select">
            <select value={room} onChange={(e) => onRoomChange(e.target.value)}>
              <option value="">{t('form.anyRoom')}</option>
              {WINGS.map((w) => (
                <optgroup key={w.id} label={w.label}>
                  {w.rooms.map((r, i) => (
                    <option key={i} value={`${w.id}|${i}`}>{L(r.name)} ({t('form.fromRM', { n: minRate(r) })})</option>
                  ))}
                </optgroup>
              ))}
            </select>
            <span>{t('form.room')}</span>
          </label>
          <Field label={t('form.message')}><textarea rows={2} value={form.message} onChange={set('message')} placeholder=" " /></Field>
          <button className="btn btn--glow btn--block" type="submit" disabled={status === 'sending'}>
            <span>{status === 'sending' ? t('form.sending') : t('form.send')}</span>
          </button>
          <p className="form__ok" role="status">{message}</p>
        </Reveal>
      </div>
      <footer className="mini-footer">
        <span className="mini-footer__brand">Seaway <em>Hotel</em></span>
        <nav>{NAV.map((n) => <a key={n.id} href={`#${n.id}`}>{L(n.label)}</a>)}</nav>
        <span>{t('footer.copy', { year: new Date().getFullYear() })}</span>
      </footer>
    </Screen>
  );
}
