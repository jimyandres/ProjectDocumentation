const args = require('./config').args;
const config = require('./config').config;
const fs = require('fs');
const path = require('path');
const { Client } = require('pg');

var readmeInfo = require('./src/readme.template');

const requiredArg = (arg,message) => {
  !arg && console.log(message) && process.exit(1)
}

let project = {
  code: args.code,
  location: args.location,
  netoffice: args.netoffice_number,
  folder: args.documentation_root,
  clarificationDoc: args.clarification_doc,
  deliveryDoc: args.delivery_doc,
};

const client = new Client(
  {
    host: config.host,
    port: config.port,
    database: config.database,
    user: config.user,
    password: config.password,
  }
);

const requiredArgList = [
  {arg: project.code, message: 'You must provide the Project Code'},
  // {arg: project.name, message: 'You must provide the Project Name'},
  // {arg: project.type, message: 'You must provide the Project type'},
  {arg: project.netoffice, message: 'You must provide the NetOffice Project number'},
];

// Check for errors when creating the Readme.txt file with the Project Info
const checkError = (err) => {
  err
  ? console.error(err)
  : console.log("Readme File Created");
};

// Create Project Folder
const createProjectFolder = (dir) => {
  if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
  }
};

// Create the Readme.txt project file
const createReadmeFile = (filePath, projectInfo) => {
  fs.writeFile(path.join(filePath,'Readme.txt'), projectInfo, checkError);
};

// Copy the given file to the Project folder
const copyDocument = (doc,projectPath,netoffice) => {
  const fileName = path.basename(doc,path.extname(doc));
  const extFile = path.extname(doc);
  const newFileName = `${fileName} - Proyecto ${netoffice}${extFile}`;
  fs.createReadStream(doc).pipe(fs.createWriteStream(path.join(projectPath,newFileName)));
  console.log("'"+fileName+"'  created.");
};

const fetchProjectData = (project) => (resolve) => {
  client.connect();

  const queryObj = {
    text: require('./src/constants'),
    rowMode: 'array',
    values: [project.code]
  }

  client.query(queryObj, (err, res) => {
    if (err) {
      console.log(err.stack);
      return client.end();
    }

    project = {
      ... project,
      name: res.rows[0][1],
      ver: res.rows[0][2],
      type: res.rows[0][3],
      lastDev: res.rows[0][4],
    }

    console.log("Project Info fetched.");
    console.dir(res.rows[0]);
    client.end();
    resolve(project);
  });
};

const run = () => {
  // Check for missing args
  requiredArgList.map(i => requiredArg(i.arg, i.message));

  // Get the project info from DB
  let projectInfoPromise = new Promise ((resolve, reject) => {
    fetchProjectData(project)(resolve);
  });

  projectInfoPromise.then((project)=> {
    console.log(project);
    // Define the folder location where all data will be stored
    const folderPath = `${project.folder}/${project.code} - ${project.name.toUpperCase()}`

    // Create the folder
    createProjectFolder(folderPath);

    // Create the Readme file
    createReadmeFile(folderPath,readmeInfo(project));

    // Create the Clarification Doc
    copyDocument(project.clarificationDoc, folderPath, project.netoffice);

    // Create the Delivery Doc
    copyDocument(project.deliveryDoc, folderPath, project.netoffice);
  });
};

run();
