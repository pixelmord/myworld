import { NextPage } from 'next';
import { GitFile } from 'react-tinacms-github/dist/form/useGitFileSha';

export type RecipeFrontmatter = {
  title: string;
  excerpt: string;
  ingredients: string[];
  tags: string[];
  preparationTime: number;
  difficulty: string;
  coverImage: string;
  date: string;
  ogImage: string;
};

export type KnowhowFrontmatter = {
  title: string;
};

export type PageData = {
  title: string;
  metaTitle: string;
};

export type NextPageWithDataProps = {
  preview: boolean;
  file: GitFile<PageData>;
};
export type NextPageWithData = NextPage<NextPageWithDataProps>;
