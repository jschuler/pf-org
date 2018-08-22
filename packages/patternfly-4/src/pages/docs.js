import React from 'react';
import Content from '../components/content';
import { Title } from '@patternfly/react-core';
import { StyleSheet, css } from '@patternfly/react-styles';
import packageJson from '../../package.json';
import {
  global_Color_dark_100 as heroBackgrounColor,
  global_Color_light_100 as heroTextColor
} from '@patternfly/react-tokens';

const styles = StyleSheet.create({
  hero: {
    height: '100vh',
    backgroundColor: heroBackgrounColor.var,
    display: 'flex',
    alignItems: 'center'
  },
  heroText: {
    color: heroTextColor.var
  }
});

const DocsPage = () => (
  <div>
    <div className={css(styles.hero)}>
      <Content>
        <Title size="4xl" className={css(styles.heroText)}>
          PatternFly 4 Documentation
        </Title>
        <Title size="md" className={css(styles.heroText)}>
          Version: {packageJson.version}
        </Title>
      </Content>
    </div>
  </div>
);

export default DocsPage;
