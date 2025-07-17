const path = require('path');
const fs = require('fs');
const index = require('./../../dist/index');

const toUnixPermissions = mode => '0' + (mode & parseInt('777', 8)).toString(8);

test('count files', async () => {
  expect(Object.keys(await index.getFiles()).length).toEqual(110);
  expect(Object.keys(await index.getPhpFiles()).length).toEqual(6);
  expect(Object.keys(await index.getPhpModulesFiles()).length).toEqual(44);
  expect(Object.keys(await index.getSharedLibsFiles()).length).toEqual(60);
});

test('has composer bin', async () => {
  const files = await index.getFiles();

  expect(files).toHaveProperty('php/composer');
  expect(files['php/composer']).toEqual(path.resolve(__dirname, '../../native/php/composer'));
});

test('has php files', async () => {
  const files = await index.getFiles();

  expect(files).toHaveProperty('php/php');
  expect(files).toHaveProperty('php/php-cgi');
  expect(files).toHaveProperty('php/php-fpm');
  expect(files).toHaveProperty(['php/php.ini']);
  expect(files).toHaveProperty(['php/php-fpm.ini']);
});

test('bins are executable', async () => {
  const files = await index.getFiles();

  expect(toUnixPermissions((await fs.promises.stat(files['php/composer'])).mode)).toEqual('0755');
  expect(toUnixPermissions((await fs.promises.stat(files['php/php'])).mode)).toEqual('0755');
  expect(toUnixPermissions((await fs.promises.stat(files['php/php-cgi'])).mode)).toEqual('0755');
  expect(toUnixPermissions((await fs.promises.stat(files['php/php-fpm'])).mode)).toEqual('0755');
});
