export function parseCommandArgs(process, prefix = "--") {
  const commandLineArgs = process.argv.slice(2);

  return commandLineArgs.reduce((argMap, arg) => {
    if (!arg.startsWith(prefix)) return argMap;

    const [key, value] = arg.slice(prefix.length).split("=");

    return argMap.set(key, value);
  }, new Map());
}
