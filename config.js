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
  [ '-De', '--delivery-doc'],
  {
    help: 'Delivery doc location',
    defaultValue: process.env.ACTA_ENTREGA ? process.env.ACTA_ENTREGA : null
  }
);

const args = parser.parseArgs();

module.exports = {
  args: args,
};
