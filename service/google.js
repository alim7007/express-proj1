const {OAuth2Client} = require('google-auth-library');
const CLIENT_ID = '120190989342-rjkgo5ruoiggecgp3td3g5q6vqa6mqc2.apps.googleusercontent.com'
const client = new OAuth2Client(CLIENT_ID);

module.exports = async (token) => {
  const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID,
  });
  const payload = ticket.getPayload();
  console.log(payload)
  return payload
}