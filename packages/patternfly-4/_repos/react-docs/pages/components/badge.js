import React from 'react';
import PropTypes from 'prop-types';
import ComponentDocs from '../../components/componentDocs';
import Docs from '../../components/docs';
import Example from '../../components/example';
import UnreadBadge from '../../examples/badge/UnreadBadge';
import ReadBadge from '../../examples/badge/ReadBadge';

const propTypes = {
  data: PropTypes.any.isRequired
};

const examples = [
  {
    title: 'Unread Badge',
    js: require('../../examples/badge/UnreadBadge'),
    raw: require('!!raw!../../examples/badge/UnreadBadge'),
    github: 'examples/badge/UnreadBadge.js'
  },
  {
    title: 'Read Badge',
    js: require('../../examples/badge/ReadBadge'),
    raw: require('!!raw!../../examples/badge/ReadBadge'),
    github: 'examples/badge/ReadBadge.js'
  }
];

const BadgeDocs = ({ data }) => (
  <ComponentDocs data={data}>
    <Example
      title="Unread Badge" style={{ background: 'white' }}
      js={examples[0].js}
      raw={examples[0].raw}
      github={examples[0].github}>
      <UnreadBadge />
    </Example>
    <Example
      title="Read Badge" style={{ background: 'white' }}
      js={examples[1].js}
      raw={examples[1].raw}
      github={examples[1].github}>
      <ReadBadge />
    </Example>
  </ComponentDocs>
  // <Docs
  //   title={data.componentMetadata.displayName}
  //   props={data.componentMetadata.props}
  //   examples={examples}
  //   style={{ background: 'white' }}
  // />
);

BadgeDocs.propTypes = propTypes;

export const query = graphql`
  query BadgeDocsQuery {
    componentMetadata(displayName: { eq: "Badge" }) {
      ...ComponentDocs
    }
  }
`;

export default BadgeDocs;
