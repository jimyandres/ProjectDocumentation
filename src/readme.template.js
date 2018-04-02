module.exports = function (project) {
  const { code, name, ver, type, lastDev, location } = project;
  const app_type = type === 'D' ? 'Desktop' : 'Web';
  return `
Cod: ${code}\r\n
Name: ${name}\r\n
Version: ${ver}\r\n
Type: ${app_type}\r\n
Last_Dev: ${lastDev}\r\n
Location: ${location}`;
};
