import path from 'path';
import fs from "fs";
import type { Files, WalkerOptions } from "./types";

const NATIVE_DIR = path.resolve(__dirname, "../native");

export function getRoot(): string {
  return path.dirname(__filename);
}

export function getComposer(): string {
  return path.resolve(NATIVE_DIR, "php/composer");
}

export function getPhp(): string {
  return path.resolve(NATIVE_DIR, "php/php");
}

export function getPhpIni(): string {
  return path.resolve(NATIVE_DIR, "php/php.ini");
}

export function getPhpFpm(): string {
  return path.resolve(NATIVE_DIR, "php/php-fpm");
}

export function getPhpFpmIni(): string {
  return path.resolve(NATIVE_DIR, "php/php-fpm.ini");
}

export function getPhpCgi(): string {
  return path.resolve(NATIVE_DIR, "php/php-cgi");
}

export function getPhpFiles(): Promise<Files> {
  return walk(path.resolve(NATIVE_DIR, "php"), { prefix: "php" });
}

export function getPhpModulesFiles(): Promise<Files> {
  return walk(path.resolve(NATIVE_DIR, "php/modules"), { prefix: "php/modules" });
}

export async function getSharedLibsFiles(): Promise<Files> {
  return walk(path.resolve(NATIVE_DIR, "lib"), { prefix: "lib" });
}

export async function getFiles(): Promise<Files> {
  return {
    ...await getPhpFiles(),
    ...await getPhpModulesFiles(),
    ...await getSharedLibsFiles(),
  }
}

async function walk(folder: string, options?: WalkerOptions): Promise<Files> {
  const walker = await fs.promises.readdir(folder, { withFileTypes: true });

  const files = walker.filter(item => !item.isDirectory());

  return Object.assign(
    {},
    ...files.map(file => {
      const filename = options?.prefix ? path.join(options.prefix, file.name) : file.name;
      const filepath = path.join(folder, file.name);

      return { [filename]: filepath }
    })
  );
}
