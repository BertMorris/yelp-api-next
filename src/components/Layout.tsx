import React from "react";

type Props = {
  children: JSX.Element;
};

export default function Layout({ children }: Props) {
  return <div className="app-container">{children}</div>;
}
