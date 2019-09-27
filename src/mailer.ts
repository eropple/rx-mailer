import * as NM from 'nodemailer';
import NMail from 'nodemailer/lib/mailer';

import { MailerOptions } from './options';
import { EmailTransformerFn } from './types';
import { renderEmail } from './rendering';

export interface SendEmailArgs {
  subject: string;
  to: string | NMail.Address | Array<string | NMail.Address>;

  /**
   * The React component to render as the email's HTML part.
   */
  html: React.ReactElement;

  /**
   * A text version of your email, to provide to clients that don't
   * support or want to render HTML.
   */
  text?: string;
  /**
   * Additional `EmailTransformerFn` transformers that will run _after_
   * the global transformers.
   */
  transformers?: Array<EmailTransformerFn>;

  /**
   * Additional options to pass to Nodemailer. Anything that overlaps
   * between `SendEmailArgs` and this `options` hash will result
   * in the `SendEmailArgs` value winning out.
   */
  options?: NMail.Options;
}

export class Mailer {
  private readonly transporter: NM.Transporter;
  private readonly globalTransformers: Array<EmailTransformerFn>;

  constructor(
    private readonly options: MailerOptions,
  ) {
    this.transporter = NM.createTransport(options.nodemailer.transport, options.nodemailer.defaults);

    this.globalTransformers = [
      ...options.globalTransformers || [],
    ];
  }

  private _transformerList(localTransformers?: Array<EmailTransformerFn>) {
    return [
      ...this.globalTransformers,
      ...localTransformers || [],
    ];
  }

  async sendEmail({
    subject,
    to,
    html,
    text,
    transformers,
    options,
  }: SendEmailArgs): Promise<NM.SentMessageInfo> {
    const rendered = renderEmail(html, this._transformerList(transformers));

    return this.transporter.sendMail({
      ...options || {},
      subject,
      to,
      html: rendered,
      text,
    });
  }
}
