module.exports = function (project) {
  const { code, name, ver, type, lastDev, location } = project;
  return `
Cod: ${code}\r\n
Name: ${name}\r\n
Version: ${ver}\r\n
Type: ${type}\r\n
Last_Dev: ${lastDev}\r\n
Location: ${location}\r\n
Description: `;
};
