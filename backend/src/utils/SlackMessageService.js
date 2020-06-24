const { App } = require('@slack/bolt');

export default class SlackMessageService {
  constructor() {
    console.log('Inicializando servicio con slack');
    this.token = process.env.SLACK_BOT_TOKEN;
    this.app = new App({
      token: this.token,
      signingSecret: process.env.SLACK_SIGNING_SECRET,
    });
  }

  enviarMensaje({ email }, cuerpo) {
    this.app.client.users.lookupByEmail({
      token: this.token,
      email,
    })
      .then((result) => {
        this.app.client.chat.postMessage(
          {
            token: this.token,
            channel: result.user.id,
            text: cuerpo,
          },
        );
      })
      . catch((error) => {
        console.error(error);
      });
  }
}
