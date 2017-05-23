const querystring = require('querystring');

// Such things should be configured via environment variables in the real-life.
// For the test task I'll keep these hardcoded values.

const TWITTER_CONSUMER_KEY    = process.env.TWITTER_CONSUMER_KEY;    //'ELXyx4jnyhMtGxZmBjf3OVU8i';
const TWITTER_CONSUMER_SECRET = process.env.TWITTER_CONSUMER_SECRET; //'j1o2uDIO98BXIbsxYu0V75BgSl3SufIeNJe33KgbmNAyBEiBwE'

const escapedKey    = querystring.escape(TWITTER_CONSUMER_KEY);
const escapedSecret = querystring.escape(TWITTER_CONSUMER_SECRET);

const rawToken = `${escapedKey}:${escapedSecret}`;

const AUTHORIZATION_TOKEN = new Buffer(rawToken).toString('base64');

const APPLICATION_CONFIG = module.exports = {
  AUTHORIZATION_TOKEN,
};
