
var fs = require('fs');

function getLineToAdd(newEntry, indentation) {
  const spaces = Array(indentation + 1).join(' ');
  return spaces + newEntry;
}

function findLineToAddPod(podLines) {
  // match line with new target: target 'project_name' do (most likely target inside podfile main target)
  const nextTarget = /target ('|")\w+('|") do/g;
  // match line that has only 'end' (if we don't catch new target or function, this would mean this is end of current target)
  const endOfCurrentTarget = /^\s*end\s*$/g;
  // match function definition, like: post_install do |installer| (some Podfiles have function defined inside main target
  const functionDefinition = /^\s*[a-z_]+\s+do(\s+\|[a-z]+\|)?/g;

  for (let i = 4; i < podLines.length - 1; i++) {
    const matchNextConstruct =
      podLines[i].match(nextTarget) || podLines[i].match(functionDefinition);
    const matchEnd = podLines[i].match(endOfCurrentTarget);

    if (matchNextConstruct || matchEnd) {
      const firstNonSpaceCharacter = podLines[i].search(/\S/);

      return {
        indentation: firstNonSpaceCharacter + (matchEnd ? 2 : 0),
        line: i,
      }
    }
  }
  return null;
}
function addPodEntry(podLines, linesToAddEntry, listPods) {
  if (!linesToAddEntry) {
    return;
  }
  listPods.forEach(newEntry => {
    if (Array.isArray(linesToAddEntry)) {
      linesToAddEntry.map(({ line, indentation }, idx) => {
        podLines.splice(line + idx, 0, getLineToAdd(newEntry, indentation));
      });
    } else {
      const { line, indentation } = linesToAddEntry;
      podLines.splice(line, 0, getLineToAdd(newEntry, indentation));
    }
  });
  return podLines;
}
function savePodFile(podfilePath, podLines) {
  const newPodfile = podLines.join('\n');
  fs.writeFileSync(podfilePath, newPodfile);
}

function generatePodFile(pathProject, listPods) {
  console.log('/ios/Podfile');
  let podContent = fs.readFileSync(`${pathProject}/ios/Podfile`, { encoding: `utf-8`, flag: 'r' });
  let podLines = podContent.split(/\r?\n/g);
  savePodFile(`${pathProject}/ios/Podfile`, addPodEntry(podLines, findLineToAddPod(podLines), listPods))
}
module.exports = {
  generatePodFile
}