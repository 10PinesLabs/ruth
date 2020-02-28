const createUriToValidate = (uid, email, username, fullName, root) => [`uid=${uid.toString()}`,
  `email=${email}`,
  `username=${username}`,
  `full_name=${fullName}`,
  `root=${root.toString()}`].join('&');

const BackofficeValidator = {

  isFromBackoffice: ({
    uid, email, username, full_name, root, hmac,
  }) => {
    const uriToValidate = createUriToValidate(uid, email, username, full_name, root);

    const crypto = require('crypto');
    const generatedHmac = crypto.createHmac('sha256', process.env.BACKOFFICE_SECRET);
    generatedHmac.update(uriToValidate);

    const result = generatedHmac.digest('hex');

    return hmac === result;
  },
};

export default BackofficeValidator;
