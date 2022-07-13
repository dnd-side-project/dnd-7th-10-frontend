module.exports = {
  extends: ['@commitlint/config-conventional'],
  parserPreset: './parser-preset',
  rules: {
    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never'],
    'type-enum': [
      2,
      'always',
      [
        'init',
        'feat',
        'fix',
        'style',
        'refactor',
        'comment',
        'docs',
        'test',
        'chore',
        'rename',
        'remove'
      ]
    ],
    'scope-case': [0],
    'scope-empty': [0],
    'scope-enum': [2, 'always', ['test']]
  }
}
