const mailjet = require ('node-mailjet')
.connect('950c69fab054149b52fa80ba96cab2ee', 'eb9f795dccd1a796457f2cb31eb4cd52')

const SendMailJet = async (user, type) =>{
    let token; let route; let text

    if (type === "reset_password") {
      token = await user.resetPasswordToken;
      route = await "reset_verification";
      text = "Verify for Reset Password";
    } else if (type === "verify") {
      token = await user.registerToken;
      route = await "verification";
      text = "Verify for Registration";
    }

    mailjet.post("send", { version: "v3.1" }).request({
      Messages: [
        {
          From: {
            Email: "olimtoni7007@gmail.com",
            Name: "Olim",
          },
          To: [
            {
              Email: user.email,
              Name: "Olim",
            },
          ],
          Subject: "Greetings from Mailjet.",
          TextPart: "My first Mailjet email",
          HTMLPart: `
            <a href=http://localhost:3000/${route}?token=${token}>${text}</a>
            `,
          CustomID: "AppGettingStartedTest",
        },
      ],
    });
} 

module.exports = SendMailJet