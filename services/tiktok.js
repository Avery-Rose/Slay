module.exports = {
  name: 'tiktok',
  domains: ['tiktok.com'],
  check: async (client, message) => {
    console.log('tiktok check');
    const args = message.content.split(' ');
    if (args >= 1 || message.author.bot) return false;

    const linkRegex =
      /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/;

    if (linkRegex.test(args[0])) {
      const link = args[0];

      if (this.domains.some((domain) => link.includes(domain))) {
        console.log(`${serviceName} found in ${link}`);
        return true;
      }
    }

    return false;
  },
  run: async (client, message) => {
    if (!this.check) return;
  },
};
