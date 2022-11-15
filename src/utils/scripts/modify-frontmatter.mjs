import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkFrontmatter from 'remark-frontmatter';
import remarkStringify from 'remark-stringify';
import transformFrontmatter from '../plugins/modify-frontmatter-plugin.mjs';
import glob from 'glob';
import fs from 'fs-extra';

async function writeCache(cache, path, content) {
  const cacheFilePath = `src/utils/cache/file-cache.json`
  if (path === unified && content === unified) {
    return await fs.writeFile(cacheFilePath, JSON.stringify(cache));
  }

  if (cache[path] === undefined) {
    cache[path] = content;
    return await fs.writeFile(cacheFilePath, JSON.stringify(cache));
  }

  if (cache[path] !== content) {
    cache[path] = content;
    return await fs.writeFile(cacheFilePath, JSON.stringify(cache));
  }
}

function readCache(cache, path) {
  return cache[path];
}

async function modifyContent(content) {
  const modifiedContent = await unified()
    .use(remarkParse)
    .use(remarkStringify)
    .use(remarkFrontmatter, ['yaml', 'toml'])
    .use(transformFrontmatter)
    .process(content);
  return modifiedContent.value;
}

try {
  const files = glob.sync('src/blog/**/*.{md,mdx}');
  const outputFiles = glob.sync('posts/**/*.{md,mdx}')
  const response = await fs.readFile('src/utils/cache/file-cache.json', 'utf8');
  const cache = JSON.parse(response);

  if (Object.entries(cache).length !== files.length) {
    for (const [key, value] of Object.entries(cache)) {
      if (!files.includes(key)) {
        delete cache[key];
        await fs.remove(key.replace('src/blog', 'posts'));
        await writeCache(cache);
      }
    }
  }

  files.forEach(async file => {
    const fileContent = await fs.readFile(file, 'utf8');
    const outputFilePath = file.replace('src/blog', 'posts');
    let modifiedContent = readCache(cache, file);

    if (modifiedContent !== fileContent) {
      modifiedContent = await modifyContent(fileContent);
      await writeCache(cache, file, fileContent);

      fs.outputFile(outputFilePath, modifiedContent);
    }
  });
} catch (e) {
  console.error(e);
}
