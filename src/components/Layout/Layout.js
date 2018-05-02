import React, { Component } from 'react'

import { Header, Container, Divider } from 'semantic-ui-react'

import styles from './Layout.css'

class Layout extends Component {
  render () {
    return (
      <Container>
        <Header className={styles.h1}> Users birthdays </Header>
        {this.props.children}
        <Divider />
        <p className={styles.pullRight}>
          Made by Martín Barutta
        </p>
        <p className={styles.pullRight}>
          <strong>martinbarutta@gmail.com</strong>
        </p>
      </Container>
    )
  }
}
export default Layout
