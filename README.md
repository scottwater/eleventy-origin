# Eleventy Origin

![Origin Logo](src/images/origin.png)

Origin is an opinionated starter template for [Eleventy](https://www.11ty.io). It was assembled using many of the tools and libraries I use often on Rails projects.

## Features

It is preconfigured with the following:

* [Webpack](https://webpack.js.org/) - for managing all of the assets
* [Tailwind](https://tailwindcss.com/) - baked in for utility-first CSS
* [Tailwind Forms](https://tailwindcss-custom-forms.netlify.com/) - a better starting point for form elements that looks good out of the box.
* [Stimulus](https://stimulusjs.org/) - as a lightweight javascript framework
* [PurgeCSS](https://www.purgecss.com/) - removes all unused CSS classes
* [Turbolinks](https://github.com/turbolinks/turbolinks) - used to make navigating from page to page more efficient. No need to host a router/etc.
* [Syntax Highlighting](https://github.com/11ty/eleventy-plugin-syntaxhighlight) - preconfigured syntax highlights
* SEO - Under src/utils/seo.js is the basic starting point for a SEO plugin (similar to Jekyll SEO). It pulls data from the site.json file, but can be overridden with a seo.json file when want settings for bots.
* Easily deploy to Netlify & Now

## UI

There is no true default template. However, the default layout is configured to have both a sticky header and footer.



## Setup

1. `npm install`


## Directory Structure

### `src`

All of the CSS, JS and images are stored in the `src` directory, which is
managed by Webpack.

* controllers - any stimulus controllers will automatically be picked up from the folder
* images - all of your site's images. These will be copied to dist/assets/images when you build
* styles
  * styles.scss - imports all other style sheets & sets up Tailwind CSS
  * main.scss - some minor styles to provide basic margins for markdown content.
  * sytax.css - the default CSS for code
* templates - for now, a single template which contains the JavaScript and CSS packaged by webpack.
* utils - JavaScript used to help build the site (such as the SEO custom tag)

### `site`

All content and templates in in the `site` directory. This is managed and processed by Eleventy.

### `dist`

Both Webpack and Eleventy push content and assets here.

## Webpack and Eleventy

Webpack generates a main.js file and main.css file. Both saved to a file called `site/layouts/pack.njk`. This file ignored in Git and based on the template src/templates/pack.html.

## Usage

### Development

You need to have both Webpack and Eleventy running.

`npm run dev`

You can also run them separately:

1. `npm run package` (I recommend starting this one first)
2. `npm run serve`

### Production

This starter is also preconfigured to be easily deployable to Netlify and Now. If you need to deploy somewhere else:

1. `npm run build`
2. Point your webserver and/or deploy/etc the `/dist` folder.

## Prior Art

* [Eleventy Base Blog](https://github.com/11ty/eleventy-base-blog) - good starting point. Borrowed lots from here.
* [Jekyll-fun](https://github.com/joeybeninghove/jekyll-fun) - the core workflow (especially Webpack) is based off of Joey's original project.
* [Skeleventy](https://skeleventy.netlify.com/) - A good boilerplate for Eleventy and Tailwind. Having something simple to refer back to was a big help.
* [Deventy](https://github.com/ianrose/deventy) - A minimal 11ty starting point for building static websites with modern tools.

## Thanks

Thanks to everyone who contributes to Eleventy, the numerous packages it depends on.
