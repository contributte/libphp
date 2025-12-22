<h1 align=center>libphp</h1>

<p align=center>
   🐘 PHP library compiled for many platform and cloud providers, especially for AWS and ▲ Vercel.
</p>

<p align=center>
🕹 <a href="https://f3l1x.io">f3l1x.io</a> | 💻 <a href="https://github.com/f3l1x">f3l1x</a> | 🐦 <a href="https://twitter.com/xf3l1x">@xf3l1x</a>
</p>

-----

## ⚙️ Runtimes

### Amazon Linux 2

- [@libphp/amazon-linux-2-v72](libs/amazon-linux-2-v72) - PHP 7.2
- [@libphp/amazon-linux-2-v73](libs/amazon-linux-2-v73) - PHP 7.3
- [@libphp/amazon-linux-2-v74](libs/amazon-linux-2-v74) - PHP 7.4
- [@libphp/amazon-linux-2-v80](libs/amazon-linux-2-v80) - PHP 8.0
- [@libphp/amazon-linux-2-v81](libs/amazon-linux-2-v81) - PHP 8.1
- [@libphp/amazon-linux-2-v82](libs/amazon-linux-2-v82) - PHP 8.2
- [@libphp/amazon-linux-2-v83](libs/amazon-linux-2-v83) - PHP 8.3

### Amazon Linux 2023

- [@libphp/amazon-linux-2023-v84](libs/amazon-linux-2023-v84) - PHP 8.4

### AlmaLinux 9 (EL9)

- [@libphp/almalinux-9-v85](libs/almalinux-9-v85) - PHP 8.5

## ⚙️ Usage

This repository contains libraries for building PHP layers in clouds (AWS, ...). You can build your package/library based on these libraries.

For example `@libphp/amazon-linux-2-v83`. Used in [`vercel-php`](https://github.com/juicyfx/vercel-php) a PHP runtime for [Vercel](https://vercel.com) platform.

```js
import * as php from "@libphp/amazon-linux-2-v83";

// @libphp/amazon-linux-2-v82
// ├── dist
// │   └── *.js
// └── native
//     ├── lib
//     │   └── * (shared libs)
//     └── php
//         ├── modules
//         │   └── *.so (php modules)
//         ├── composer
//         ├── php.ini
//         ├── php
//         ├── php-cgi
//         ├── php-fpm
//         └── php-fpm.ini

php.getRoot(); // root folder
php.getComposer(); // composer bin
php.getPhpFiles(); // list of all PHP files
php.getPhpModulesFiles(); // list of all PHP modules
php.getSharedLibsFiles(); // list of all shared libs
php.getFiles(); // list of all related files
```

## 📝 License

Copyright © 2020 [f3l1x](https://github.com/f3l1x).
This project is [MIT](LICENSE) licensed.
