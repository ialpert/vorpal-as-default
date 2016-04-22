/**
 * Run defined command if no commands where specified previously.
 * Takes into account parent history
 * @param {Vorpal} vorpal
 * @param {String} name
 * @returns {Vorpal}
 */
export default function (vorpal, name) {
  let isCommandExists = vorpal.find(name);
  let isHistoryEmpty = !vorpal.cmdHistory.getPreviousHistory();

  if (isHistoryEmpty && isCommandExists) {
    vorpal.execSync(name);
  }

  return vorpal;
}