import { access, mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

export const version = '0.0.1';
export const status = 'ready';

export type ProjectTemplate = 'admin-console' | 'package' | 'plugin';
export type PackageManager = 'pnpm' | 'npm' | 'yarn';
export type FileAction = 'created' | 'overwritten' | 'skipped';

export interface ScaffoldFile {
  path: string;
  action: FileAction;
}

export interface ScaffoldResult {
  root: string;
  files: ScaffoldFile[];
}

export interface CreateProjectOptions {
  name: string;
  directory?: string;
  template?: ProjectTemplate;
  packageManager?: PackageManager;
  description?: string;
  features?: string[];
  overwrite?: boolean;
}

export interface GenerateComponentOptions {
  name: string;
  directory?: string;
  type?: 'component' | 'page' | 'layout';
  extension?: 'tsx' | 'jsx';
  propsName?: string;
  withIndex?: boolean;
  client?: boolean;
  overwrite?: boolean;
}

export interface GenerateFeatureOptions {
  name: string;
  directory?: string;
  withRoutes?: boolean;
  withService?: boolean;
  withTypes?: boolean;
  overwrite?: boolean;
}

interface FileSpec {
  path: string;
  content: string;
}

const packageManagerCommands: Record<
  PackageManager,
  { install: string; dev: string; build: string }
> = {
  pnpm: { install: 'pnpm install', dev: 'pnpm dev', build: 'pnpm build' },
  npm: { install: 'npm install', dev: 'npm run dev', build: 'npm run build' },
  yarn: { install: 'yarn', dev: 'yarn dev', build: 'yarn build' }
};

const assertName = (name: string, label = 'name') => {
  if (!name || !name.trim()) {
    throw new Error(`${label} is required`);
  }
};

export const toKebabCase = (value: string) =>
  value
    .trim()
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .replace(/[^a-zA-Z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase();

export const toPascalCase = (value: string) => {
  const normalized = toKebabCase(value);
  return normalized
    .split('-')
    .filter(Boolean)
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
};

const exists = async (targetPath: string) => {
  try {
    await access(targetPath);
    return true;
  } catch {
    return false;
  }
};

const writeScaffoldFile = async (
  root: string,
  file: FileSpec,
  overwrite = false
): Promise<ScaffoldFile> => {
  const absolutePath = path.join(root, file.path);
  const alreadyExists = await exists(absolutePath);

  if (alreadyExists && !overwrite) {
    return { path: absolutePath, action: 'skipped' };
  }

  await mkdir(path.dirname(absolutePath), { recursive: true });
  await writeFile(absolutePath, file.content, 'utf8');
  return { path: absolutePath, action: alreadyExists ? 'overwritten' : 'created' };
};

const packageName = (name: string) => toKebabCase(name) || name.trim().toLowerCase();

const projectPackageJson = ({
  name,
  template,
  description
}: Required<Pick<CreateProjectOptions, 'name' | 'template' | 'description'>>) => {
  const base = {
    name: packageName(name),
    version: '0.1.0',
    private: true,
    description,
    type: 'module'
  };

  if (template === 'package') {
    return JSON.stringify(
      {
        ...base,
        main: './dist/index.js',
        module: './dist/index.mjs',
        types: './dist/index.d.ts',
        files: ['dist/**'],
        scripts: {
          build: 'tsup src/index.ts --format esm,cjs --dts',
          dev: 'tsup src/index.ts --format esm,cjs --watch --dts',
          typecheck: 'tsc --noEmit'
        },
        devDependencies: {
          tsup: '^8.4.0',
          typescript: '^5.8.0'
        }
      },
      null,
      2
    );
  }

  if (template === 'plugin') {
    return JSON.stringify(
      {
        ...base,
        scripts: {
          build: 'tsc --noEmit',
          dev: 'tsc --noEmit --watch'
        },
        devDependencies: {
          typescript: '^5.8.0'
        }
      },
      null,
      2
    );
  }

  return JSON.stringify(
    {
      ...base,
      scripts: {
        dev: 'vite',
        build: 'tsc && vite build',
        preview: 'vite preview',
        typecheck: 'tsc --noEmit'
      },
      dependencies: {
        react: '^19.0.0',
        'react-dom': '^19.0.0'
      },
      devDependencies: {
        '@vitejs/plugin-react': '^5.0.0',
        '@types/react': '^19.0.0',
        '@types/react-dom': '^19.0.0',
        vite: '^7.0.0',
        typescript: '^5.8.0'
      }
    },
    null,
    2
  );
};

const commonFiles = (options: Required<CreateProjectOptions>): FileSpec[] => {
  const commands = packageManagerCommands[options.packageManager];
  return [
    {
      path: 'README.md',
      content: `# ${options.name}

${options.description}

## Usage

\`\`\`bash
${commands.install}
${commands.dev}
${commands.build}
\`\`\`
`
    },
    {
      path: 'package.json',
      content: `${projectPackageJson(options)}\n`
    },
    {
      path: 'tsconfig.json',
      content: `${JSON.stringify(
        {
          compilerOptions: {
            target: 'ES2022',
            module: 'ESNext',
            moduleResolution: 'Bundler',
            strict: true,
            jsx: 'react-jsx',
            skipLibCheck: true
          },
          include: ['src']
        },
        null,
        2
      )}\n`
    }
  ];
};

const adminConsoleFiles = (name: string): FileSpec[] => [
  {
    path: 'index.html',
    content: `<div id="root"></div>
<script type="module" src="/src/main.tsx"></script>
`
  },
  {
    path: 'vite.config.ts',
    content: `import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()]
});
`
  },
  {
    path: 'src/main.tsx',
    content: `import React from 'react';
import { createRoot } from 'react-dom/client';

import { App } from './App';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
`
  },
  {
    path: 'src/App.tsx',
    content: `export const App = () => {
  return (
    <main>
      <h1>${name}</h1>
    </main>
  );
};
`
  }
];

const packageFiles = (): FileSpec[] => [
  {
    path: 'src/index.ts',
    content: `export const createMessage = (name: string) => \`Hello, \${name}\`;
`
  },
  {
    path: 'tsup.config.ts',
    content: `import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  clean: true
});
`
  }
];

const pluginFiles = (name: string): FileSpec[] => [
  {
    path: 'src/index.ts',
    content: `export interface PluginContext {
  register: (_name: string, _handler: unknown) => void;
}

export const activate = (context: PluginContext) => {
  context.register('${packageName(name)}', {});
};
`
  },
  {
    path: 'plugin.json',
    content: `${JSON.stringify(
      {
        name: packageName(name),
        version: '0.1.0',
        main: 'src/index.ts'
      },
      null,
      2
    )}\n`
  }
];

const featureFiles = (features: string[]): FileSpec[] =>
  features.filter(Boolean).map(feature => {
    const kebab = toKebabCase(feature);
    const pascal = toPascalCase(feature);
    return {
      path: `src/features/${kebab}/index.ts`,
      content: `export const ${pascal}Feature = {
  name: '${kebab}'
};
`
    };
  });

const filesForTemplate = (options: Required<CreateProjectOptions>): FileSpec[] => {
  switch (options.template) {
    case 'package':
      return packageFiles();
    case 'plugin':
      return pluginFiles(options.name);
    case 'admin-console':
    default:
      return adminConsoleFiles(options.name);
  }
};

export const createProject = async (options: CreateProjectOptions): Promise<ScaffoldResult> => {
  assertName(options.name, 'project name');

  const normalized: Required<CreateProjectOptions> = {
    directory: options.directory || process.cwd(),
    template: options.template || 'admin-console',
    packageManager: options.packageManager || 'pnpm',
    description: options.description || `${options.name} project`,
    features: options.features || [],
    overwrite: options.overwrite || false,
    name: options.name
  };

  const root = path.resolve(normalized.directory, packageName(normalized.name));
  const files = [
    ...commonFiles(normalized),
    ...filesForTemplate(normalized),
    ...featureFiles(normalized.features)
  ];

  const written = [];
  for (const file of files) {
    written.push(await writeScaffoldFile(root, file, normalized.overwrite));
  }

  return { root, files: written };
};

const componentSource = ({
  name,
  propsName,
  type,
  client,
  extension
}: Required<
  Pick<GenerateComponentOptions, 'name' | 'propsName' | 'type' | 'client' | 'extension'>
>) => {
  const componentName = toPascalCase(name);
  const directive = client ? `'use client';\n\n` : '';
  const tag = type === 'page' ? 'main' : 'div';

  if (extension === 'jsx') {
    return `${directive}export const ${componentName} = ({ className }) => {
  return (
    <${tag} className={className}>
      ${componentName}
    </${tag}>
  );
};
`;
  }

  return `${directive}export interface ${propsName} {
  className?: string;
}

export const ${componentName} = ({ className }: ${propsName}) => {
  return (
    <${tag} className={className}>
      ${componentName}
    </${tag}>
  );
};
`;
};

export const generateComponent = async (
  options: GenerateComponentOptions
): Promise<ScaffoldResult> => {
  assertName(options.name, 'component name');

  const componentName = toPascalCase(options.name);
  const root = path.resolve(options.directory || process.cwd());
  const folder = toKebabCase(options.name);
  const extension = options.extension || 'tsx';
  const filePath = path.join(folder, `${componentName}.${extension}`);
  const propsName = options.propsName || `${componentName}Props`;
  const type = options.type || 'component';
  const client = options.client || false;

  const files: FileSpec[] = [
    {
      path: filePath,
      content: componentSource({
        name: componentName,
        propsName,
        type,
        client,
        extension
      })
    }
  ];

  if (options.withIndex !== false) {
    files.push({
      path: path.join(folder, `index.ts`),
      content: `export * from './${componentName}';
`
    });
  }

  const written = [];
  for (const file of files) {
    written.push(await writeScaffoldFile(root, file, options.overwrite || false));
  }

  return { root, files: written };
};

export const generateFeatureModule = async (
  options: GenerateFeatureOptions
): Promise<ScaffoldResult> => {
  assertName(options.name, 'feature name');

  const root = path.resolve(options.directory || process.cwd());
  const kebab = toKebabCase(options.name);
  const pascal = toPascalCase(options.name);
  const basePath = path.join('features', kebab);

  const files: FileSpec[] = [
    {
      path: path.join(basePath, 'index.ts'),
      content: `export * from './${kebab}';
`
    },
    {
      path: path.join(basePath, `${kebab}.tsx`),
      content: `export const ${pascal} = () => {
  return <section>${pascal}</section>;
};
`
    }
  ];

  if (options.withRoutes) {
    files.push({
      path: path.join(basePath, 'routes.tsx'),
      content: `import { ${pascal} } from './${kebab}';

export const ${pascal}Routes = [{ path: '/', element: <${pascal} /> }];
`
    });
  }

  if (options.withService) {
    files.push({
      path: path.join(basePath, 'service.ts'),
      content: `export const ${kebab.replace(/-([a-z])/g, (_, letter: string) => letter.toUpperCase())}Service = {
  list: async () => []
};
`
    });
  }

  if (options.withTypes) {
    files.push({
      path: path.join(basePath, 'types.ts'),
      content: `export interface ${pascal}Record {
  id: string;
}
`
    });
  }

  const written = [];
  for (const file of files) {
    written.push(await writeScaffoldFile(root, file, options.overwrite || false));
  }

  return { root, files: written };
};
