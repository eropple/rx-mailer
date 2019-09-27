import * as React from 'react';
import ReactDOMServer from 'react-dom/server';

import { EmailTransformerFn } from './types';

const DOCTYPE = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">';

export function renderEmail(component: React.ReactElement, transformers: Array<EmailTransformerFn> = []) {
  let markup = ReactDOMServer.renderToStaticMarkup(component);
  for (const transformer of transformers) {
    markup = transformer(markup);
  }

  return `${DOCTYPE}\n${markup}`;
}
