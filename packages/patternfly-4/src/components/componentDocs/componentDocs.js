import React from 'react';
import PropTypes from 'prop-types';
import styles from './componentDocs.styles';
import { css } from '@patternfly/react-styles';
import Example from '../example';
import Content from '../content';
import { Title } from '@patternfly/react-core';
import PropsTable from '../propsTable';
import Section from '../section';

const propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  examples: PropTypes.arrayOf(PropTypes.func),
  components: PropTypes.objectOf(PropTypes.func),
  enumValues: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.any)),
  rawExamples: PropTypes.array
};

const defaultProps = {
  description: '',
  examples: [],
  components: {},
  enumValues: {},
  rawExamples: []
};

const ComponentDocs = ({ title, description, examples, components, enumValues, rawExamples }) => (
  <Content>
    <Title size="3xl">{title}</Title>
    {Boolean(description) && <p className={css(styles.description)}>{description}</p>}
    <Section title="Examples">
      {examples.map((ComponentExample, i) => {
        const rawExample = rawExamples.find(example => (example.name === ComponentExample.name));
        return (
          <Example
            key={i}
            raw={rawExample && rawExample.file}
            title={ComponentExample.title}
            description={ComponentExample.description}
            {...(ComponentExample.getContainerProps ? ComponentExample.getContainerProps() : {})}
          >
            <ComponentExample />
          </Example>
        )
      })}
    </Section>
    {/* {Object.entries(components).map(([componentName, { __docgenInfo: componentDocs }]) => (
      <PropsTable key={componentName} name={componentName} props={componentDocs.props} enumValues={enumValues} />
    ))} */}
  </Content>
);

ComponentDocs.propTypes = propTypes;
ComponentDocs.defaultProps = defaultProps;

export default ComponentDocs;
