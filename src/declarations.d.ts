// src/declarations.d.ts

/**
 * This declaration file is necessary to provide TypeScript with type information
 * for the dynamically generated 'lucide-react/dynamicIconImports' module.
 *
 * Without this, TypeScript cannot find the module and will report an error (ts(2307)).
 * This file tells TypeScript to treat the import as a module that exports an object
 * where keys are strings (the icon names) and values are dynamic import functions.
 */
declare module 'lucide-react/dynamicIconImports' {
  const dynamicIconImports: {
    [key: string]: () => Promise<{ default: React.ComponentType<any> }>;
  };
  export default dynamicIconImports;
}