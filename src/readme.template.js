module.exports = function (project) {
  const { code, name, ver, type, last_developer, location } = project;
  const app_type = type === 'D' ? 'Desktop' : 'Web';
  return `
Cod: ${code}\r\n
Name: ${name}\r\n
Version: ${ver}\r\n
Type: ${app_type}\r\n
Last_Dev: ${last_developer}\r\n
Location: ${location}`;
};
