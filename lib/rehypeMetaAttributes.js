// https://github.com/wooorm/xdm#syntax-highlighting-with-the-meta-field

import { visit } from "unist-util-visit";

const re = /\b([-\w]+(?![^{]*}))(?:=(?:"([^"]*)"|'([^']*)'|([^"'\s]+)))?/g;

export const rehypeMetaAttribute = (options = {}) => {
  return (tree) => {
    visit(tree, "element", visitor);
  };

  function visitor(node, index, parentNode) {
    let match;

    if (node.tagName === "code" && node.data && node.data.meta) {
      re.lastIndex = 0; // Reset regex.
      console.log("node.data.meta", node.data.meta);

      while ((match = re.exec(node.data.meta))) {
        parentNode.properties[match[1]] =
          match[2] || match[3] || match[4] || "";
      }
    }
  }
};
