export type MarkdownPageProps<T = MarkdownFrontmatter> = {
  file: MarkdownFileProps<T>;
  preview?: boolean;
  error?: string;
};

export type MarkdownFileData<T = MarkdownFrontmatter> = {
  frontmatter: T;
  markdownBody: string;
};
export type MarkdownFileProps<T = MarkdownFrontmatter> = {
  fileRelativePath: string;
  data: MarkdownFileData<T>;
};

export type MarkdownFrontmatter = { [key: string]: any };
