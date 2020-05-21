/** @jsx jsx */
import { jsx, Box } from 'theme-ui';
import { RecipeContentType } from '../../lib/contentTypes';

export const Recipe: React.FC<{ recipe: RecipeContentType }> = (props: { recipe: RecipeContentType }) => (
  <Box {...props}>{props.recipe.title}</Box>
);
export default Recipe;
