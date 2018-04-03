const ArgumentParser = require('argparse').ArgumentParser;
require('dotenv').config();
const version = require('./package.json').version;

const parser = new ArgumentParser({
  version: version,
  addHelp: true,
  description: 'Sript to create a project documentation folder with the relevant info'
});

// Code Project
parser.addArgument(
  [ '-c', '--code' ],
  {
    help: 'Project code (according to SIMA)',
    required: true,
  }
);

// Netoffice project ID
parser.addArgument(
  [ '-n', '--netoffice-number' ],
  {
    help: 'The number of the respective Netoffice project',
    required: true
  }
);

// Source Code Location
parser.addArgument(
  [ '-l', '--location' ],
  {
    help: 'The Project Source Code location',
    defaultValue: 'Unknown'
  }
);

// Documentation ROOT folder
parser.addArgument(
  [ '-r', '--documentation-root'],
  {
    help: 'Project folder (root) where all documentation will be stored',
    defaultValue: process.env.DOCS_FOLDER ? process.env.DOCS_FOLDER : null,
  }
);

// Clarification doc location
parser.addArgument(
  [ '-C', '--clarification-doc'],
  {
    help: 'Clarification Doc location.',
    defaultValue: process.env.ACTA_ACLARACION ? process.env.ACTA_ACLARACION : null
  }
);

// Delivery doc location
parser.addArgument(
  [ '-D', '--delivery-doc'],
  {
    help: 'Delivery doc location',
    defaultValue: process.env.ACTA_ENTREGA ? process.env.ACTA_ENTREGA : null
  }
);

// Database to fetch the project info
parser.addArgument(
  [ '-d', '--database' ],
  {
    help: 'Database host address',
    defaultValue: process.env.DB_HOST ? process.env.DB_HOST : null
  }
);

// Database port
parser.addArgument(
  [ '-p', '--port' ],
  {
    help: 'Database port',
    defaultValue: process.env.DB_PORT ? process.env.DB_PORT : null
  }
);

const args = parser.parseArgs();

module.exports = {
  args: args,
  config: {
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  }
};
