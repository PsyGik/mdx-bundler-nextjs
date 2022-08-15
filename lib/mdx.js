import { bundleMDX } from "mdx-bundler";
import fs from "fs";
import path from "path";
import { rehypeMetaAttribute } from "./rehypeMetaAttributes";

const mdxSource = fs.readFileSync(
  path.join(process.cwd(), "data", "hello.md"),
  "utf8"
);

export const bundler = () =>
  bundleMDX({
    source: mdxSource,
    mdxOptions(options, frontmatter) {
      // this is the recommended way to add custom remark/rehype plugins:
      // The syntax might look weird, but it protects you in case we add/remove
      // plugins in the future.
      options.remarkPlugins = [...(options.remarkPlugins ?? [])];
      options.rehypePlugins = [
        ...(options.rehypePlugins ?? []),
        rehypeMetaAttribute,
      ];

      return options;
    },
  });
