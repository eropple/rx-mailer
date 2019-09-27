import React from 'react';

import { Mailer, Email, Box, Span } from '../src';

describe('e2e tests', () => {
  const rnd = Math.round(Math.random() * 5000).toString().padStart(4, '0');
  const mailer = new Mailer({
    nodemailer: {
      transport: 'smtp://localhost:24025',
      defaults: {
        from: `"[${rnd}] RxMailer Test" <rx-mailer-${rnd}@example.com>`,
      },
    },
  });

  it('should send a test email', async () => {
    await mailer.sendEmail({
      subject: `[${rnd}] Test email`,
      to: `recipient-${rnd}@example.org`,
      html: <Email
        title={`[${rnd}] Test Email`}
      >
        <p>
          Hello, <Span style={{ fontWeight: 'bold', color: '#ff0000' }}>world</Span>!
        </p>
        <p>
          This is a test email.
        </p>
        <p>
          Sincerely,<br />
          Ed
        </p>
      </Email>,
    });
  });
});
