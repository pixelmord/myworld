import matter from 'gray-matter';
import fg from 'fast-glob';
import fs from 'fs';
import path from 'path';
import { getGithubPreviewProps, parseMarkdown, GithubPreviewProps } from 'next-tinacms-github';
import { MarkdownPageProps, MarkdownFileProps, MarkdownFrontmatter } from './propTypes';

export function fetchMarkdownDoc<T extends MarkdownFrontmatter>(
  subdir = 'recipes',
  fileName: string
): MarkdownFileProps<T> {
  const fileRelativePath = `content/${subdir}/${fileName}`;
  const fullPath = path.resolve(fileRelativePath);

  const file = fs.readFileSync(fullPath);
  const doc = matter(file);
  return {
    fileRelativePath,
    data: {
      frontmatter: doc.data,
      markdownBody: doc.content,
    },
  } as MarkdownFileProps<T>;
}

export async function fetchAllMarkdownDocs<T>(subdir = 'recipes'): Promise<MarkdownFileProps<T>[]> {
  const files = await fg(`./content/${subdir}/**/*.md`);

  return files.map((fileName: string) => {
    const parts = fileName.split('/');
    return fetchMarkdownDoc<T>(subdir, parts[parts.length - 1]);
  });
}

export const getMarkdownProps = async <T extends MarkdownFrontmatter>(
  subdir = 'recipes',
  fileName: string,
  preview: boolean,
  previewData: any
): Promise<{ props: MarkdownPageProps<T> } | GithubPreviewProps<T>> => {
  const fileRelativePath = `content/${subdir}/${fileName}`;
  if (preview) {
    return await getGithubPreviewProps<T>({
      ...previewData,
      fileRelativePath: fileRelativePath,
      parse: parseMarkdown,
    });
  }
  const file = fetchMarkdownDoc<T>(subdir, fileName);
  return {
    props: {
      error: null,
      preview: false,
      file,
    },
  } as { props: MarkdownPageProps<T> };
};
