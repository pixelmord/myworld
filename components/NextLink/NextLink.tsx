/** @jsx jsx */
import { jsx, LinkProps } from 'theme-ui';
import { PropsWithChildren } from 'react';
import { default as NLink, LinkProps as NLinkProps } from 'next/link';

import { Link } from 'prestyled';

type NextLinkProps = Omit<LinkProps, 'as'> & NLinkProps;

export const NextLink: React.FC<NextLinkProps> = ({
  href,
  as,
  replace,
  scroll,
  shallow,
  passHref = true,
  prefetch,
  ...rest
}: PropsWithChildren<NextLinkProps>) => (
  <NLink
    href={href}
    as={as}
    replace={replace}
    scroll={scroll}
    shallow={shallow}
    passHref={passHref}
    prefetch={prefetch}
  >
    <Link {...rest} as="a" />
  </NLink>
);
export default NextLink;
