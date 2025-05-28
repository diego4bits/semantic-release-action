# Custom Semantic Release for Java

This project provides a customizable [GitHub Action](action.yml) to automate semantic versioning and changelog generation for Java projects using [semantic-release](https://github.com/semantic-release/semantic-release) and [Maven](https://maven.apache.org/).

## Features

- Automated semantic versioning based on commit messages (with [gitmoji](https://gitmoji.dev/) support)
- Changelog generation with custom Handlebars templates ([default-template.hbs](templates/default-template.hbs), [commit-template.hbs](templates/commit-template.hbs))
- Maven version bump and build integration
- Supports both standard and prerelease workflows
- Customizable via `.releaserc.js` and `.prerelease-releaserc.js`

### Inputs
| Name	| Description	| Required	| Default |
|-------|------|------|------|
| github_token	| GitHub token for authentication	| Yes	| |
| release_branch	| Branch to perform the release from	| No	| master |
| maven_settings_path	| Path to Maven settings.xml (if needed)	| No	|

### Outputs
| Name	| Description |
|-------|---------|
| release_version |	The version of the release created |


## Configuration
- Edit .releaserc.js for main releases.
- Edit .prerelease-releaserc.js for prereleases.
- Customize changelog templates in the templates/ directory.

## Usage

Add the following step to your workflow YAML:

```yaml
- name: Semantic Release
  uses: your-org/semantic-release-action@v1
  with:
    github_token: ${{ secrets.GITHUB_TOKEN }}
    release_branch: 'main' # or 'develop' for prereleases
    maven_settings_path: './settings.xml' # optional

```    

## 📄 Sources
- [semantic-release tool](https://github.com/semantic-release/semantic-release)
- [semantic-release configuration file](https://github.com/semantic-release/semantic-release/blob/master/docs/usage/configuration.md)
- [gitmoji plugin](https://github.com/momocow/semantic-release-gitmoji)
- [Handleebars](https://handlebarsjs.com/)
- [Github Actions Guide](https://docs.github.com/en/actions/about-github-actions/understanding-github-actions)