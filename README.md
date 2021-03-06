# Figma Design Tokens plugin

[![licence mit](https://img.shields.io/badge/licence-MIT-blue.svg)](https://github.com/vinicius-pretto/figma-design-tokens-plugin/blob/master/LICENSE.md)

The goal of this project is to give ability to create and export tokens on Figma.

![Figma Design Tokens plugin](figma-plugin.gif)

## Running on development environment

**Requirements:**

- OS System (macOS or Windows)
- Node.js >= v10.22
- NPM >= v6.14.6

**1. Install dependencies**

```
$ npm install
```

**2. Build application**

```
$ npm run build
```

**3. Install Figma Desktop**

- [Figma downloads](https://www.figma.com/downloads/)

**4. Add plugin on Figma**

Go to manage plugins and click on "Create your own plugin"

![Figma plugins page](src/ui/img/figma-plugins-page.png)

Choose a name for this plugin and upload the manifest.json

![Figma plugins page](src/ui/img/figma-create-plugin-page.png)

Now you can run this plugin.

![Figma plugin](src/ui/img/figma-plugin.png)

## License

[MIT](https://github.com/vinicius-pretto/figma-design-tokens-plugin/blob/master/LICENSE.md)
