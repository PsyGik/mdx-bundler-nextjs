import * as React from "react";
import { getMDXComponent } from "mdx-bundler/client";
import { bundler } from "../lib/mdx";

export async function getStaticProps() {
  const result = await bundler();
  const { code, frontmatter } = result;
  return { props: { code, frontmatter } };
}

function Hello(props) {
  const { code, frontmatter } = props;
  // it's generally a good idea to memoize this function call to
  // avoid re-creating the component every render.
  const Component = React.useMemo(() => getMDXComponent(code), [code]);
  return (
    <>
      <header>
        <h1>{frontmatter.title}</h1>
        <p>{frontmatter.description}</p>
      </header>
      <main>
        <Component />
      </main>
    </>
  );
}

export default Hello;
