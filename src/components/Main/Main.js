import React, { Component } from 'react'
import $ from 'jquery'

import Layout from '../Layout/Layout.js'
import Form from '../Form/Form.js'
import Greetings from '../Greetings/Greetings.js'
import TableHeader from '../Table/TableHeader.js'
import TableRow from '../Table/TableRow.js'

const prefix = '$$$-'

class Main extends Component {
  constructor (props) {
    super(props)

    this.state = {
      users: [],
      countries: [],
      userClicked: null,
      alertID: -1
    }

    this.handleSave = this.handleSave.bind(this)
    this.handleRowClick = this.handleRowClick.bind(this)
  }

  componentWillMount () {
    if (localStorage != null) {
      let arrUsers = []
      let index = 0
      for (var i = 0; i < localStorage.length; i++) {
        if (localStorage.key(i) != null) {
          const key = localStorage.key(i)
          if (key.startsWith(prefix) && localStorage.getItem(key) != null) {
            arrUsers[index] = JSON.parse(localStorage.getItem(key))
            index++
          }
        }
      }
      this.setState({
        users: arrUsers
      })
    }
  }

  handleRowClick (event) {
    event.preventDefault()
    $('#userTable tr').removeClass('active')
    $('#' + event.currentTarget.id).addClass('active')
    const fullName = event.currentTarget.childNodes[0].innerText
    const usr = JSON.parse(localStorage.getItem(prefix + fullName))
    this.setState({
      userClicked: usr,
      alertID: 3
    })
  }

  handleSave (event) {
    event.preventDefault()
    $('#userTable tr').removeClass('active')
    if ($('#name').val() !== '' && $('#surname').val() !== '' && $('#country').val() !== 'Countries' &&
        $('#birthday').val() !== '') {
      const key = `${prefix}${$('#name').val()} ${$('#surname').val()}`
      const user = {
        name: $('#name').val(),
        lastName: $('#surname').val(),
        country: $('#country').val(),
        birthday: $('#birthday').val()
      }
      if (localStorage.getItem(key) === null) {
        $('#name').val('')
        $('#surname').val('')
        $('#country').val('Countries')
        $('#birthday').val('')
        localStorage.setItem(key, JSON.stringify(user))
        this.setState({
          users: this.state.users.concat([user]),
          alertID: 2
        })
      } else {
        this.setState({
          alertID: 1
        })
      }
    } else {
      this.setState({
        alertID: 0
      })
    }
  }

  renderGreetings () {
    switch (this.state.alertID) {
      case 0: {
        return (
          <div className='alert alert-danger'>
            You must fill all fields
          </div>
        )
      }
      case 1: {
        return (
          <div className='alert alert-danger'>
            The record already exists!
          </div>
        )
      }
      case 2: {
        return (
          <Greetings userInfo={this.state.users[this.state.users.length - 1]} />
        )
      }
      case 3: {
        return (
          <Greetings userInfo={this.state.userClicked} />
        )
      }
    }
  }

  renderRowTable () {
    if (this.state.users) {
      return (this.state.users.map((object) => <TableRow objRow={object} key={`${prefix}${object.name} ${object.lastName}`} onRowClick={this.handleRowClick} />))
    }
  }

  render () {
    return (
      <Layout>
        <div className='row'>
          <div className='col-sm-6'>
            <Form
              onSave={this.handleSave}
            />
            {this.renderGreetings()}
          </div>
          <div className='col-sm-6'>
            <table id='userTable' className='ui selectable celled table'>
              <TableHeader />
              <tbody>
                {this.renderRowTable()}
              </tbody>
            </table>
          </div>
        </div>
      </Layout>
    )
  }
}

export default Main
