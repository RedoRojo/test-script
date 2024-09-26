import { exec } from 'child_process';
import * as fs from 'fs';

const command = 'npm run test-export-json'; 

exec(command, (error, stdout, stderr) => {
    if (error) {
        console.error(`Error executing command: ${error.message}`);
        return;
    }
    if (stderr) {
        console.error(`stderr: ${stderr}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
});


const readJSONFile = (filePath: string): any => {
  const rawData = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(rawData);
};

const writeJSONFile = (filePath: string, data: any): void => {
  const jsonString = JSON.stringify(data, null, 2);
  fs.writeFileSync(filePath, jsonString, 'utf-8');
};

const extractAndAddObject = (inputFile: string, outputFile: string) => {

  const jsonData = readJSONFile(inputFile);

  const value1 = jsonData.numPassedTests;
  const value2 = jsonData.numTotalTests;
  const value3 = jsonData.startTime;

  const newObject = {
    numPassedTests: value1,
    numTotalTests: value2,
    timestamp: value3
  };

  const outputData = readJSONFile(outputFile);

  outputData.push(newObject);

  writeJSONFile(outputFile, outputData);

  console.log('New object added successfully!');
};

const inputFilePath = './report.json'; 
const outputFilePath = './tdd_log.json';

extractAndAddObject(inputFilePath, outputFilePath);

