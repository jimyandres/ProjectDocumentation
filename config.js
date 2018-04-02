const ArgumentParser = require('argparse').ArgumentParser;
require('dotenv').config();

const parser = new ArgumentParser({
  version: '1.0.0',
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

// Project Name
parser.addArgument(
  [ '-n', '--name' ],
  {
    help: 'Project Name',
    required: true,
  }
);

// Netoffice project ID
parser.addArgument(
  [ '-nn', '--netoffice-number' ],
  {
    help: 'The number of the respective Netoffice project',
    required: true
  }
);

// Project version
parser.addArgument(
  [ '-pv', '--project-version' ],
  {
    help: 'Project Version',
    defaultValue: '1.0.0.0 (default)'
  }
);

// Project Type (Desktop or Web)
parser.addArgument(
  [ '-t', '--type' ],
  {
    help: 'The type of the App (Desktop/Web)',
    required: true,
    choices: ['D', 'W']
  }
);

// Latest Developer
parser.addArgument(
  [ '-D', '--last-developer' ],
  {
    help: 'The latest Developer of this project',
    defaultValue: 'Not Asigned'
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

// Documentation folder
parser.addArgument(
  [ '-r', '--documentation-root'],
);

const args = parser.parseArgs();

module.exports = {
  args: args,
  config: {
    docsFolder: process.env.DOCS_FOLDER,
    clarificationDoc: process.env.ACTA_ACLARACION,
    deliveryDoc: process.env.ACTA_ENTREGA,
  }
};
