import { EMAIL_ADDRESS, EMAIL_PASSWORD } from '@src/config/env.config';
import { createTransport } from 'nodemailer';
import { fileLogger } from './logger.config';

/**
 * @type {import("nodemailer").Transporter}
 */
export let transporter;

export const initMail = async () => {
  transporter = createTransport({
    host: 'smtp.gmail.com',
    secure: false,
    auth: {
      user: EMAIL_ADDRESS,
      pass: EMAIL_PASSWORD,
    },
  });
};

export const sendMail = async (
  /** @type {import('nodemailer').SendMailOptions} */ { to, subject, html }
) => {
  try {
    await transporter.sendMail({
      from: EMAIL_ADDRESS,
      to,
      subject,
      html,
    });
  } catch (err) {
    if (fileLogger && err instanceof Error) {
      fileLogger.error(err.message);
    }
  }
};
