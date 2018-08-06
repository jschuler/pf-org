import React from 'react';
import { renderToString } from 'react-dom/server';
import { renderStatic } from '@patternfly/react-styles/server';

// let count = 0;

exports.replaceRenderer = ({
  bodyComponent,
  replaceBodyHTMLString,
  setHeadComponents
}) => {
  const { html, styleTags, renderedClassNames } = renderStatic(
    () => {
      // console.log(`\n\n${count++}-${bodyComponent}`);
      let innerCount = count;
      let bodyComponentToInspect = bodyComponent;
      try {
        renderToString(bodyComponent);
      } catch (err) {
        console.log(`failed on ${innerCount}: ${err}`);
        console.log(bodyComponentToInspect);
      }
    }
  );

  replaceBodyHTMLString(html);

  setHeadComponents([
    ...styleTags.map((tag, i) => (
      <style
        key={i}
        {...tag.attributes}
        dangerouslySetInnerHTML={{ __html: tag.content }}
      />
    )),
    <script
      id="patternfly-style-ids"
      key="patternfly-style-ids"
      dangerouslySetInnerHTML={{
        __html: `
        // <![CDATA[
        window._pf_styles = ${JSON.stringify(renderedClassNames)}
        // ]]>
        `
      }}
    />
  ]);
};
