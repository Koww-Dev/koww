import NodeMailer from 'nodemailer';

class Email {
  #nodemailer = NodeMailer;

  #transporter;

  async valitation({ email, name, token }) {
    try {
      this.#transporter = this.#nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
          user: process.env.EMAIL, // generated ethereal user
          pass: process.env.PASSWORD, // generated ethereal password
        },
      });

      await this.#transporter.sendMail({
        from: '"Equipe kowworking 🐄" <kowworking.dev@gmail.com>', // sender address
        to: email, // list of receivers
        subject: 'Confirmação de e-mail 📧', // Subject line
        text: 'Confirme sua conta através do token', // plain text body
        html: `<p>Olá ${name}! Confirme seu e-mail usando esse token: <b style="font-size: 18px;">${token}</b></p>`, // html body
      });
    } catch (error) {
      console.log(process.env.EMAIL, process.env.PASSWORD);
      throw new Error(error);
    }
  }
}

export default Email;
