import { createTransport } from "nodemailer";
import { config } from "../config";
import { SendEmailRequestInterface } from "../interfaces/SendEmailRequestInterface";
import sendgridTransport from "nodemailer-sendgrid";
import responseHandler from "../handlers/ResponseHandler";

class MailingService {
  #getTransporter() {
    const options = {
      apiKey: config.sendGridKey,
    };
    return createTransport(sendgridTransport(options));
  }

  async sendEmail({
    from = "Petcare.connect@gmail.com",
    to,
    subject,
    body,
  }: SendEmailRequestInterface) {
    try {
      const transporter = this.#getTransporter();
      const mailOptions = {
        from,
        to,
        subject,
        html: body,
      };

      const response = await transporter.sendMail(mailOptions);
      return responseHandler.responseSuccess(
        200,
        "Mail Sent Successfully",
        !!response
      );
    } catch (err: any) {
      return responseHandler.responseError(
        400,
        `Unable to send Mai ${JSON.stringify(err.response.body.errors)}`
      );
    }
  }
}

export default MailingService;
