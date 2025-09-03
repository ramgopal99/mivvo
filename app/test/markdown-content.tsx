"use client"

import { MarkdownCompound } from "../../components/markdown-compound"

export const markdownContent = `## A demo of \`react-markdown\`

\`react-markdown\` is a markdown component for React.

👉 Changes are re-rendered as you type.

👈 Try writing some markdown on the left.

## Overview

* Follows [CommonMark](https://commonmark.org)
* Optionally follows [GitHub Flavored Markdown](https://github.github.com/gfm/)
* Renders actual React elements instead of using \`dangerouslySetInnerHTML\`
* Lets you define your own components (to render \`MyHeading\` instead of \`'h1'\`)
* Has a lot of plugins

## Contents

Here is an example of a plugin in action
([\`remark-toc\`](https://github.com/remarkjs/remark-toc)).
**This section is replaced by an actual table of contents**.

## Syntax highlighting

Here is an example of a plugin to highlight code:
[\`rehype-starry-night\`](https://github.com/rehypejs/rehype-starry-night).

\`\`\`js
import React from 'react'
import ReactDom from 'react-dom'
import {MarkdownHooks} from 'react-markdown'
import rehypeStarryNight from 'rehype-starry-night'

const markdown = \`
# Your markdown here
\`

ReactDom.render(
  <MarkdownHooks rehypePlugins={[rehypeStarryNight]}>{markdown}</MarkdownHooks>,
  document.querySelector('#content')
)
\`\`\`

Pretty neat, eh?

## GitHub flavored markdown (GFM)

For GFM, you can *also* use a plugin:
[\`remark-gfm\`](https://github.com/remarkjs/react-markdown#use).
It adds support for GitHub-specific extensions to the language:
tables, strikethrough, tasklists, and literal URLs.

These features **do not work by default**.
👆 Use the toggle above to add the plugin.

| Feature    | Support              |
| ---------: | :------------------- |
| CommonMark | 100%                 |
| GFM        | 100% w/ \`remark-gfm\` |

~~strikethrough~~

* [ ] task list
* [x] checked item

https://example.com

## HTML in markdown

✅ **Secure HTML Support**: This component now safely renders HTML using both
[\`rehype-raw\`](https://github.com/rehypejs/rehype-raw) and
[\`rehype-sanitize\`](https://github.com/rehypejs/rehype-sanitize).
All potentially dangerous HTML attributes and elements are automatically sanitized for security.

### HTML Examples

Here are some HTML elements that will be rendered:

<div style="background: linear-gradient(45deg, #ff6b6b, #4ecdc4); color: white; padding: 1rem; border-radius: 8px; margin: 1rem 0;">
  <h3 style="margin: 0 0 0.5rem 0;">🎨 Styled HTML Div</h3>
  <p style="margin: 0;">This is a <strong>styled div</strong> with gradient background!</p>
</div>

<button onclick="alert('Hello!')" style="background: #007bff; color: white; border: none; padding: 0.5rem 1rem; border-radius: 4px; cursor: pointer;">
  Click me! (HTML Button - onclick sanitized for security)
</button>

<blockquote style="border-left: 4px solid #007bff; padding-left: 1rem; margin: 1rem 0; background: #f8f9fa; font-style: italic;">
  👆 Use the toggle above to add the plugin.
</blockquote>

## Components

You can pass components to change things:

\`\`\`js
import React from 'react'
import ReactDom from 'react-dom'
import Markdown from 'react-markdown'
import MyFancyRule from './components/my-fancy-rule.js'

const markdown = \`
# Your markdown here
\`

ReactDom.render(
  <Markdown
    components={{
      // Use h2s instead of h1s
      h1: 'h2',
      // Use a component instead of hrs
      hr(props) {
        const {node, ...rest} = props
        return <MyFancyRule {...rest} />
      }
    }}
  >
    {markdown}
  </Markdown>,
  document.querySelector('#content')
)
\`\`\`

## More info?

Much more info is available in the
[readme on GitHub](https://github.com/remarkjs/react-markdown)!

***

A component by [Espen Hovlandsdal](https://espen.codes/)`

export default function MarkdownContent() {
  return (
    <div className="h-screen flex bg-background">
      {/* Left side - Raw Markdown */}
      <div className="w-1/2 border-r border-border flex flex-col">
        <div className="bg-muted/50 p-4 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">Raw Markdown</h2>
          <p className="text-sm text-muted-foreground">Editable content</p>
        </div>
        <textarea
          className="flex-1 p-4 font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground border-0"
          defaultValue={markdownContent}
          placeholder="Enter your markdown here..."
        />
      </div>

      {/* Right side - Rendered View */}
      <div className="w-1/2 flex flex-col">
        <div className="bg-muted/50 p-4 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">Rendered View</h2>
          <p className="text-sm text-muted-foreground">Live preview</p>
        </div>
        <div className="flex-1 p-4 overflow-auto bg-background">
          <MarkdownCompound variant="rich" size="md" allowHtml={true}>
            {markdownContent}
          </MarkdownCompound>
        </div>
      </div>
    </div>
  )
}
