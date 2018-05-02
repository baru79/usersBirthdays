import React, { Component } from 'react'

class TableHeader extends Component {
  render () {
    return (
      <thead>
        <tr>
          <th>Name</th>
          <th>Country</th>
          <th>Birthday</th>
        </tr>
      </thead>
    )
  }
}

export default TableHeader
