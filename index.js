const args = require('./config').args;
const config = require('./config').config;
const fs = require('fs');
const path = require('path');

var readmeInfo = require('./src/readme.template');

const requiredArg = (arg,message) => {
  !arg && console.log(message) && process.exit(1)
}

const project = {
  code: args.code,
  name: args.name,
  ver: args.project_version,
  type: args.type,
  lastDev: args.last_developer,
  location: args.location,
  netoffice: args.netoffice_number,
  folder: args.documentation_root,
  clarificationDoc: args.clarification_doc,
  deliveryDoc: args.delivery_doc,
};

const requiredArgList = [
  {arg: project.code, message: 'You must provide the Project Code'},
  {arg: project.name, message: 'You must provide the Project Name'},
  {arg: project.type, message: 'You must provide the Project type'},
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
  const newFileName = `${fileName} - Proyecto ${netoffice}.${extFile}`;
  fs.createReadStream(doc).pipe(fs.createWriteStream(path.join(projectPath,newFileName)));
  console.log("'"+fileName+"'  created.");
};

const run = () => {
  // Check for missing args
  requiredArgList.map(i => requiredArg(i.arg, i.message));

  // Define the folder location where all data will be stored
  const folderPath = `${project.folder}/${project.code} - ${project.name.toUpperCase()}`;

  // Create the folder
  createProjectFolder(folderPath);

  // Create the Readme file
  createReadmeFile(folderPath,readmeInfo(project));

  // Create the Clarification Doc
  copyDocument(project.clarificationDoc, folderPath, project.netoffice);

  // Create the Delivery Doc
  copyDocument(project.deliveryDoc, folderPath, project.netoffice);
};

run();
