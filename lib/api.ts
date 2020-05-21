import matter from 'gray-matter';
import fg from 'fast-glob';
import fs from 'fs';
import path from 'path';
import { getGithubPreviewProps, parseMarkdown, GithubPreviewProps } from 'next-tinacms-github';
import { MarkdownPageProps, MarkdownFileProps, MarkdownFrontmatter } from './propTypes';

export function fetchMarkdownDoc<T extends MarkdownFrontmatter>(subdir = 'recipes', fileName): MarkdownFileProps<T> {
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
  const directory = path.resolve(`./content/${subdir}`);
  const files = await fg(directory + '/**/*.md');

  return files.map((fileName) => fetchMarkdownDoc<T>(subdir, fileName));
}

export const getMarkdownProps = async <T extends MarkdownFrontmatter>(
  subdir = 'recipes',
  fileName,
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
