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
