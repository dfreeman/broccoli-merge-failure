const fs = require('fs');
const mkdirp = require('mkdirp');
const rimraf = require('rimraf');

const { Builder, Watcher } = require('broccoli');
const MergeTrees = require('broccoli-merge-trees');

const ONE = `${__dirname}/tmp/one`;
const TWO = `${__dirname}/tmp/two`;

rimraf.sync(ONE);
rimraf.sync(TWO);
mkdirp.sync(ONE);
mkdirp.sync(TWO);

let builder = new Builder(new MergeTrees([ONE, TWO]));
let watcher = new Watcher(builder);

let step = 0;

watcher.on('error', err => console.error(err));
watcher.on('change', () => {
  switch (++step) {
    case 1:
      mkdirp.sync(`${ONE}/subdir`);
      fs.writeFileSync(`${ONE}/subdir/file1`, '');
      break;
    case 2:
      mkdirp.sync(`${TWO}/subdir`);
      fs.writeFileSync(`${TWO}/subdir/file2`, '');
      break;
  }
});

watcher.watch();
