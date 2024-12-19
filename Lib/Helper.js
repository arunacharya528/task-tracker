/**
 * Helper to check if the use is asking for help
 * @returns {Boolean}
 */
export function showHelpText() {
    return process.argv.includes("**get-help") || process.argv.includes("*gh");
}