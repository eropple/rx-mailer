import * as SMTPPool from 'nodemailer/lib/smtp-pool';
import * as SMTPTransport from 'nodemailer/lib/smtp-transport';
import * as SendmailTransport from 'nodemailer/lib/sendmail-transport';
import * as StreamTransport from 'nodemailer/lib/stream-transport';
import * as JSONTransport from 'nodemailer/lib/json-transport';
import * as SESTransport from 'nodemailer/lib/ses-transport';
import { EmailTransformerFn } from './types';

export type NodemailerOptions =
  | { transport?: SMTPTransport | SMTPTransport.Options | string, defaults?: SMTPTransport.Options }
  | { transport: SMTPPool | SMTPPool.Options, defaults?: SMTPPool.Options }
  | { transport: SendmailTransport | SendmailTransport.Options, defaults?: SendmailTransport.Options }
  | { transport: StreamTransport | StreamTransport.Options, defaults?: StreamTransport.Options }
  | { transport: JSONTransport | JSONTransport.Options, defaults?: JSONTransport.Options }
  | { transport: SESTransport | SESTransport.Options, defaults?: SESTransport.Options };

export interface MailerOptions {
  nodemailer: NodemailerOptions;
  globalTransformers?: Array<EmailTransformerFn>;
}
