# `@eropple/rx-mailer` #
[![npm version](https://badge.fury.io/js/%40eropple%2Frx-mailer.svg)](https://badge.fury.io/js/%40eropple%2Frx-mailer)

`@eropple/rx-mailer` is a light, TypeScript-friendly email sender based around a TypeScript port of [react-html-email](https://github.com/chromakode/react-html-email). It uses [nodemailer](https://nodemailer.com) as its SMTP transport.

I wrote this library as the core of a replacement for [@nest-modules/mailer](https://github.com/nest-modules/mailer) because, in trying to work with it, I found it way too opinionated and way too hard to retrofit into it a React-based email templater in a type-safe way. Older systems are accustomed to the idea of "templates" as being separate languages, like Pug or Handlebars, that follow their own rules; with JSX, templating is first-class.

It's also type-safe.

I like type-safe.

So let's get started.

## Installation ##
You'll need to install `react` and `react-dom` to use this library, as `@eropple/rx-mailer` treats them as peer dependencies.

```
npm install @eropple/rx-mailer react react-dom
yarn add @eropple/rx-mailer react react-dom
```

## Usage ##
This is a pretty thin glue wrapper around `react-dom` and `nodemailer`, so deep introspection should be left for those libraries. Here's the quickest possible starting point for you, though (lifted from the E2E test, which right now just tests for basic functionality and not for deep correctness):

```ts
import React from 'react'; // necessary if you're using JSX

import { Mailer, Email, Box, Span } from '../src';

const rnd = Math.round(Math.random() * 5000).toString().padStart(4, '0');
const mailer = new Mailer({
  nodemailer: {
    transport: 'smtp://localhost:24025',
    defaults: {
      from: `"[${rnd}] RxMailer Test" <rx-mailer-${rnd}@example.com>`,
    },
  },
});

await mailer.sendEmail({
    subject: `[${rnd}] Test email`,
    to: `recipient-${rnd}@example.org`,
    html: <Email
      title={`[${rnd}] Test Email`}
    >
      <p>
        Hello, <Span style={{ fontWeight: 'bold', color: '#ff0000' }}>world</Span>!
      </p>
      <p>
        This is a test email.
      </p>
      <p>
        Sincerely,<br />
        Ed
      </p>
    </Email>,
  });
```

## Components ##
_(This section lifted in its entirety from [react-html-email](https://github.com/chromakode/react-html-email) Any discrepancies are my fault and not those of the original creator; my TypeScript port may not be perfect. Feel free to file an issue if that's the case!)_

Components in `react-html-email` include defaults for basic style properties, so that client styles are reset and normalized. Every component accepts a `style` prop which overrides the reset styles.

### `<Email>`

An HTML document with a centered 600px `<table>` inside `<table>` container based on [HTML Email Boilerplate](https://github.com/seanpowell/Email-Boilerplate).

It's necessary to always include a `title` prop for some clients' "open in browser" feature.

See [MailChimp's HTML guide](http://templates.mailchimp.com/development/html/) for how this works.

### `<Box>`

A simplification of the `<table>` element, the workhorse of an HTML email design. `<Box>`es contain a vertical stack of `<Item>`s. Use them to create visual structure, filled buttons, and spacing.

### `<Item>`

A subsection of a `<Box>`, essentially a `<tr><td>` unit.

### `<Span>`

Use to assign styles to text.

It can be handy to create an object containing your default text styles for reuse. For example:

```js
const textDefaults = {
  fontFamily: 'Verdana',
  fontSize: 42,
  fontWeight: 'bold',
  color: 'orange',
}

[...]

<Span {...textDefaults}>Congratulations!</Span>
<Span {...textDefaults}>You won a free cruise!</Span>
```

### `<A>`

Use to format links. Requires an `href` prop. Always sets `target="_blank"` and defaults to underline. To remove the underline, set `textDecoration="none"`.

### `<Image>`

An image, without any pesky borders, outlines, or underlines by default. Requires a `src` prop, and `width` and `height` to be set. You can override the default styles (such as adding a border) using the `style` prop.

## Head CSS and Media Queries
As with `react-html-email`, you can pass a string prop `headCSS` to your `<Email>` component. You can see it in `react-html-email`'s [kitchenSink.jsx](https://github.com/chromakode/react-html-email/blob/master/examples/kitchenSink.jsx) example.

## Running Tests ##
You'll need to start up docker-compose file in the repository to run the tests.

## Special Thanks ##
- `react-html-email` (MIT licensed, for the React email components)
  - [Max Goodman](https://github.com/chromakode)
- `@nest-modules/mailer` (MIT licensed, for guidance re: Nodemailer setup)
  - [Paweł Partyka](https://github.com/partyka95)
  - [Cristiam Diaz](https://github.com/cdiaz)
  - [Pat McGowan](https://github.com/p-mcgowan)
