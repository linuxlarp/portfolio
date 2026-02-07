/* eslint-disable */
const fs = require("fs");
const path = require("path");

function buildOutputs() {
  const outputsDir = path.join(__dirname, "../outputs");
  const files = fs.readdirSync(outputsDir);

  console.log(`Building command outputs from ${outputsDir}`);

  const outputs = {};

  files.forEach((filename) => {
    if (!filename.endsWith(".txt")) {
      const isDirectory = fs.statSync(filename).isDirectory();

      if (isDirectory) {
        const subFiles = fs.readdirSync(filePath);

        subFiles.forEach((subFile) => {});
      } else {
        return;
      }
    }

    const filePath = path.join(outputsDir, filename);
    const content = fs.readFileSync(filePath, "UTF-8");
    const commandName = filename.replace(".txt", "");

    console.log(`Building ${filePath} as ${commandName}...`);

    outputs[commandName] = content;
  });

  console.log(`Done building!`);

  const generatedDir = path.join(__dirname, "../src/generated");

  if (!fs.existsSync(generatedDir)) {
    fs.mkdirSync(generatedDir, { recursive: true });
  }

  console.log(`Writing to ${generatedDir}...`);

  fs.writeFileSync(
    path.join(generatedDir, "commandOutputs.json"),
    JSON.stringify(outputs, null, 2),
  );

  console.log(`Done, all files added to ${generatedDir}/commandOutputs.json`);
}

buildOutputs();
