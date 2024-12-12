# Contributing to the Sweepstacks

Thanks for taking the time to contribute !

- Before opening a pull request, please read the [contributing guidelines](CONTRIBUTING.md) first
- If your PR is work in progress, open it as `draft`
- Before requesting a review, all the checks need to pass
- Explain what your PR does

## Setup

Install the dependencies

```shell
yarn i
yarn dev
```

Don't forget to setup your IDE with `eslint` and `prettier`.
  
### Commit Convention

Before you create a Pull Request, please check whether your commits comply with
the commit conventions used in this repository.

When you create a commit we kindly ask you to follow the convention
`category(scope or module): message` in your commit message while using one of
the following categories:

- `feat / feature`: all changes that introduce completely new code or new
  features
- `fix`: changes that fix a bug (ideally you will additionally reference an
  issue if present)
- `refactor`: any code related change that is not a fix nor a feature
- `docs`: changing existing or creating new documentation (i.e. README, docs for
  usage of a lib or cli usage)
- `build`: all changes regarding the build of the software, changes to
  dependencies or the addition of new dependencies
- `test`: all changes regarding tests (adding new tests or changing existing
  ones)
- `ci`: all changes regarding the configuration of continuous integration (i.e.
  github actions, ci system)
- `chore`: all changes to the repository that do not fit into any of the above
  categories

  e.g. `feat(components): add new prop to the avatar component`
#### Submitting a PR
All the contributions to sweepstacks-fe happen via Pull Requests. Please follow the following steps when creating a PR:

1. Fork the sweepstacks-fe repository and create a new branch there to do your work.
2. The branch can contain any number of commits.  When merged, all commits will be squashed into a single commit.
3. The changes should be thoroughly tested.
4. When ready, send a pull request against the `master` branch of the `nearcore`
   repository.
5. Feel free to submit draft PRs to get early feedback and to make sure you are
   on the right track.
6. The PR name should follow the template: `<type>: <name>`.  Where `type` is:
   - `fix` for bug fixes;
   - `feat` for new features;
   - `refactor` for changes that reorganize code without adding new content;
   - `doc` for changes that change documentation or comments;
   - `test` for changes that introduce new tests;
   - `chore` for grunt tasks like updating dependencies.
7. The PR should also contain a description when appropriate to provide
   additional information to help the reviewer inspect the proposed change.
8. If your PR introduces a user-observable change (e.g. a new protocol feature,
   new configuration option, new Prometheus metric etc.) please document it in
   [CHANGELOG.md](CHANGELOG.md) in the `[unreleased]` section.
9. It is important to select the ` Allow edits and access to secrets by
   maintainers` checkbox on the PR.  Without this option, the merge bot will not
   have sufficient rights to be able to merge the PR when it is approved.  It
   also allows the maintainers to make trivial changes to the PR as necessary.
   Please see
   [these](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request-from-a-fork)
   [links](https://stackoverflow.com/questions/63341296/github-pull-request-allow-edits-by-maintainers)
   for the implications of selecting the checkbox.


### Release Schedule

Once your change ends up in master, it will be released with the rest of the
changes by other contributors on the regular release schedules.

We appreciate your contributions and look forward to working with you! 🙌
