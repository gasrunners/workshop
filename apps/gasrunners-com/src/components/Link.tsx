import React, { PropsWithChildren } from "react";

type Props = {
  external?: boolean;
}

export default function Link(
  props: PropsWithChildren<Props> & React.HTMLProps<HTMLAnchorElement>
) {
  const externalProps = props.external 
    ? { target: '_blank', rel: 'noreferrer' }
    : {}

  return (
    <a {...externalProps} {...props}>{props.children}</a>
  )
}
