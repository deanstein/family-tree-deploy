# Family Tree Deploy
Deployment repo for the Family Tree app.

## Copying files

Currently, deploying the Family Tree requires building locally and copying the resulting files ito this repo.

In the `family-tree` repo, run:

```bash
yarn build
```

The build files from this will be in:

`GitHub\family-tree\dist`

Copy those files to:

`GitHub\family-tree-deploy`

QDir is recommended for this.