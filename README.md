# Issue Comment Action

Github action for automatically adding label or setting assignee when a new comment is added to an Issue or Pull Request.

## Usage

### Assignee

Automatically assign `@username` when Issue title or body contains `test`

```yaml
name: "Set Assignee"
on:
  issues_comment:
    types: [created]]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: Amwam/issue-comment-action@v1.4.0
        with:
          keywords: '["test"]'
          assignees: '["username"]'
          github-token: "${{ secrets.GITHUB_TOKEN }}"
```

### Label

Automatically set `help wanted` label when Issue title or body contains `help` or `wanted`

```yaml
name: "Set Issue Label"
on:
  issues_comment:
    types: [created]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: Amwam/issue-comment-action@v1.4.0
        with:
          keywords: '["help", "wanted"]'
          labels: '["help wanted"]'
          github-token: "${{ secrets.GITHUB_TOKEN }}"
```

# Upgrading this package

When uploading github actions, `node_modules` and `lib` directories need to be commited.

Follow the steps below:

```sh
# create a new release branch
$ git checkout -b release/vX.X.X
```

Commentout the following lines in `.gitignore`

```
# comment this out distribution branches
node_modules/
lib
```

```
$ git add node_modules lib
$ git commit -a -m "release"
$ git push origin release/vX.X.X
```
