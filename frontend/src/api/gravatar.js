import * as md5 from 'md5';

const baseUrl = 'https://www.gravatar.com';

const getGravatarUrlFor = (email) => {
  const hashedEmail = md5((email || '').trim().toLowerCase());
  return `${baseUrl}/avatar/${hashedEmail}?s=600&d=identicon`;
};

export default getGravatarUrlFor;
