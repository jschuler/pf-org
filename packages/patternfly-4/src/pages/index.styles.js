import { StyleSheet } from '@patternfly/react-styles';

export default StyleSheet.create({
  intro: {
    backgroundColor: 'blue'
  },
  introLeft: {
    display: 'inline-block',
    width: '60%'
  },
  introRight: {
    display: 'inline-block',
    width: '30%',
    height: '100%',
    backgroundColor: 'yellow'
  },
  page: {
    display: 'flex',
    minHeight: '100%',
    width: '100%'
  },
  nav: {
    position: 'relative',
    zIndex: 2
  },
  main: {
    position: 'relative',
    flex: '1 1 auto'
  }
});
