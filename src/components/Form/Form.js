import React, { Component } from 'react'
import styles from './Form.css'

class Form extends Component {
  constructor (props) {
    super(props)
    this.state = {
      countries: []
    }
    this.init()
  }

  init () {
    fetch('https://restcountries.eu/rest/v2/all')
      .then(results => {
        return results.json()
      })
      .then(data => {
        const countries = data.map(item => item.name)
        this.setState({
          countries: countries
        })
      })
  }

  getCountries () {
    const countries = this.state.countries
    let optionItems
    if (countries.length > 0) {
      optionItems = countries.map((item) => <option key={item}>{item}</option>
      )
    }
    return optionItems
  }

  render () {
    return (
      <div>
        <form>
          <ul className={styles.wrapper}>
            <li className={styles.formRow}>
              <label>Name: </label>
              <input type='text' id='name' placeholder='name here' />
            </li>
            <li className={styles.formRow}>
              <label>Surname: </label>
              <input type='text' id='surname' placeholder='name here' />
            </li>
            <li className={styles.formRow}>
              <label>Countries: </label>
              <select id='country' onChange={this.props.onCountries}>
                <option>Countries</option>
                {this.getCountries()}
              </select>
            </li>
            <li className={styles.formRow}>
              <label>Birthday: </label>
              <input type='date' id='birthday' placeholder='mm/dd/yyyy' />
            </li>
            <li className={styles.formRow}>
              <button onClick={this.props.onSave}>Save</button>
            </li>
          </ul>
        </form>
      </div>
    )
  }
}

export default Form
