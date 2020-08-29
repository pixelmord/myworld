/** @jsx jsx */
import { jsx, Box } from 'theme-ui';

export const Layout: React.FC<{ preview?: boolean }> = (props: React.PropsWithChildren<{ preview?: boolean }>) => (
  <Box {...props} />
);
export default Layout;
