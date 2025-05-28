const { promisify } = require('util')
const dateFormat = require('dateformat')
const path = require('path')
const TEMPLATE_DIR = path.join(__dirname, 'templates')
const readFileAsync = promisify(require('fs').readFile)
const template = readFileAsync(path.join(TEMPLATE_DIR, '/default-template.hbs'))
const commitTemplate = readFileAsync(path.join(TEMPLATE_DIR,'/commit-template.hbs'))
module.exports = {

  branches: [
    "master",
    "main"
  ],
  plugins: [
    [
      'semantic-release-gitmoji', {
        releaseRules: {
          major: [':boom:'],
          minor: [':sparkles:'],
          patch: [
            ':bug:',
            ':zap:',
            ':ambulance:',
            ':lock:',
            ':hammer:',
            ':white_check_mark:',
            ':right_arrow_curving_left:',
          ]
        },
        releaseNotes: {
          template,
          partials: {
            commitTemplate
          },
          helpers: {
            formatDate: function(date){
              if(!date) date = new Date();
              return dateFormat(date, 'yyy-mm-dd HH:MM:ss');
            },
            split: function(string){
              return string.trim().split('\n');
            },
            formatDateCol: function(date) {
              if(!date) date = new Date();
              let formattedDate = date.toLocaleString('en-US', { timeZone: 'America/Bogota', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }).split(/\/|,|:| /);
              return `${formattedDate[2]}-${formattedDate[0]}-${formattedDate[1]} ${formattedDate[3]}:${formattedDate[4]}:${formattedDate[5]}`;
            }
          }
        }
      }
    ],
    [
      "@semantic-release/exec",
      {
        "prepareCmd": "mvn versions:set -DnewVersion=\"${nextRelease.version}\" && mvn clean install",
        "successCmd": 'echo "Release ${nextRelease.version} published successfully"'
      }
    ],
    [
      "@semantic-release/changelog",
      {
        "changelogFile": "docs/CHANGELOG.md",
        "changelogTitle": ['# Gitmoji Changelog', process.env.REPO_NAME, '\uD83C\uDF88'].join(' ')
      }
    ],
    [
      "@semantic-release/git",
      {
        assets: [
          "**/pom.xml",
          "docs/CHANGELOG.md"
        ],
        message: [
          ':bookmark: ${nextRelease.version} [skip ci]'
        ].join('')
      }
    ]
  ],
  tagFormat: '${version}'
}