module.exports = {
  extends: ["next", "turbo", "prettier"],
  rules: {
    "@next/next/no-html-link-for-pages": "off",
    "react/jsx-key": "off",
    "curly": ["error", "multi-line"],
    "vue/multi-word-component-names": ["off"],
    "no-console": ["off"]
  },
};
