const path = require('path')

module.exports = {
  // '*.{js,jsx,ts,tsx}': [buildEslintCommand],
  // Type check TypeScript files
  '**/*.(ts|tsx)': () => 'yarn tsc --noEmit',
  // Lint then format TypeScript and JavaScript files
  '(pages|ui)/**/*.(ts|tsx|js)': (filenames) => [
    `yarn lint --fix ${filenames.join(' ')}`,
    `yarn prettier --write ${filenames.join(' ')}`,
  ],
  // Format MarkDown and JSON
  '(pages|ui)/**/*.(md|json)': (filenames) =>
    `yarn prettier --write ${filenames.join(' ')}`,
}
