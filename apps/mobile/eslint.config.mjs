import { FlatCompat } from "@eslint/eslintrc";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const compat = new FlatCompat({ baseDirectory: __dirname });

export default [
  ...compat.extends("expo"),
  {
    files: ["app/**/*.{ts,tsx}"],
    ignores: ["**/node_modules/**"],
  },
];
