/** @jsx jsx */
import { jsx, Box } from 'theme-ui';
import { RecipeFrontmatter } from '../../lib/contentTypes';

export const Recipe: React.FC<{ recipe: RecipeFrontmatter }> = (props: { recipe: RecipeFrontmatter }) => (
  <Box {...props}>{props.recipe.title}</Box>
);
export default Recipe;
