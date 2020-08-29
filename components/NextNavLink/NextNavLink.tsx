/** @jsx jsx */
import { jsx, LinkProps } from 'theme-ui';
import { PropsWithChildren } from 'react';
import { default as Link, LinkProps as NLinkProps } from 'next/link';

import { NavLink } from 'prestyled';

type NextNavLinkProps = Omit<LinkProps, 'as'> & NLinkProps;
export const NextNavLink: React.FC<NextNavLinkProps> = ({
  href,
  as,
  replace,
  scroll,
  shallow,
  passHref = true,
  prefetch,
  ...rest
}: PropsWithChildren<NextNavLinkProps>) => {
  return (
    <Link
      href={href}
      as={as}
      replace={replace}
      scroll={scroll}
      shallow={shallow}
      passHref={passHref}
      prefetch={prefetch}
    >
      <NavLink {...rest} />
    </Link>
  );
};
export default NextNavLink;
