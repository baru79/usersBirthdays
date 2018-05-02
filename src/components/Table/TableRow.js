import React, { Component } from 'react'
import uuid from 'uuid'
import moment from 'moment'

class TableRow extends Component {
  render () {
    const obj = this.props.objRow
    const id = uuid.v4()
    return (
      <tr id={id} onClick={this.props.onRowClick}>
        <td>{obj.name} {obj.lastName}</td>
        <td>{obj.country}</td>
        <td>{moment(obj.birthday, 'YYYY-MM-DD').format('DD/MM/YYYY')}</td>
      </tr>
    )
  }
}

export default TableRow
