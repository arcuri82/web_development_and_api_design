# PG6300
Code for the PG6300 course on *Web Development and API Design*.


## Useful NPM Commands

* **npm init -y**

  To create a new project, in particular the *package.json* file.

* **npm install**

  To download and install under *node_modules* all the needed libraries
  specified in the *package.json* file.
  Note: instead of installing libraries via NPM commandline, you
  can modify the *package.json* file manually.

* **npm install webpack webpack-cli webpack-dev-server --save-dev**

  To install WebPack.

* **npm install jest babel-jest babel-cli babel-core babel-preset-es2015 --save-dev**

  To install *Jest* with *Babel* support.
  Needed when writing frontend code, but then tests are run on
  *NodeJS*. So, need to make sure to use *Babel* to transform the
  module import statements.

* **npm install react react-dom**

  To install *React* libraries.

* **npm install babel-core babel-loader  babel-preset-react  --save-dev**

  To install *Babel* to handle the JSX files used by *React*.