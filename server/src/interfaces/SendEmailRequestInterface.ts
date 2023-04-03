export interface SendEmailRequestInterface {
  from?: string;
  to: string;
  subject: string;
  body: string;
}
