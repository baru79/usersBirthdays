import React, { Component } from 'react'
import moment from 'moment'

class Greetings extends Component {
  render () {
    let user = this.props.userInfo
    const day = moment(user.birthday, 'YYYY-MM-DD').format('DD')
    const month = moment(user.birthday, 'YYYY-MM-DD').format('MMMM')
    const years = moment(user.birthday, 'YYYY-MM-DD').fromNow().replace(' ago', '')
    return (
      <div className='alert alert-success'>
        Hello {user.name} {user.lastName} from {user.country} on {day} of {month} you will have {years}
      </div>
    )
  }
}

export default Greetings
