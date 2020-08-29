/** @jsx jsx */
import { jsx } from 'theme-ui';
import Layout from '~components/Layout';
import { GetStaticProps, NextPage } from 'next';
import { fetchAllMarkdownDocs } from 'lib/api';
import NextLink from '~components/NextLink';
import { RecipeFrontmatter } from 'lib/contentTypes';
import { MarkdownFileProps } from 'lib/propTypes';
import { slugFromFilepath } from 'lib/slugHelpers';
export type RecipeOverviewpageProps = { recipes: MarkdownFileProps<RecipeFrontmatter>[] };
const RecipeOverviewPage: NextPage<RecipeOverviewpageProps> = ({ recipes }: RecipeOverviewpageProps) => {
  return (
    <Layout>
      {!!recipes.length &&
        recipes.map((recipe) => (
          <NextLink key={recipe.fileRelativePath} href={`/recipes/${slugFromFilepath(recipe.fileRelativePath)}`}>
            {recipe.data.frontmatter.title}
          </NextLink>
        ))}
    </Layout>
  );
};
export default RecipeOverviewPage;

export const getStaticProps: GetStaticProps = async () => {
  const recipes = await fetchAllMarkdownDocs<RecipeFrontmatter>();
  return {
    props: {
      recipes,
    },
  };
};
