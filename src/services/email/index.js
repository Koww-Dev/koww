import NodeMailer from 'nodemailer';

class Email {
  #nodemailer = NodeMailer;

  #transporter;

  async valitation({ email, name, token }) {
    try {
      this.#transporter = this.#nodemailer.createTransport({
        host: 'smtp.sendgrid.net',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: 'apikey', // generated ethereal user
          pass: process.env.SEND_GRID_API_KEY, // generated ethereal password
        },
      });

      await this.#transporter.sendMail({
        from: '"Equipe kowworking 🐄" <kevsonfilipesantos@gmail.com>', // sender address
        to: email, // list of receivers
        subject: 'Confirmação de e-mail 📧', // Subject line
        text: 'Confirme sua conta através do token', // plain text body
        html: `<p>Olá ${name}! Confirme seu e-mail usando esse token: <b style="font-size: 18px;">${token}</b></p>`, // html body
      });
    } catch (error) {
      throw new Error('Falha ao enviar e-mail \n', error);
    }
  }
}

export default Email;
