import React, { Component } from 'react'
import Students from './components/Students'
import './styles/students.css'

export class App extends Component {
  constructor() {
    super()

    this.state = {
      fetchedStudents: [],
      newFetchtedStudents: []
    }
  }

  // fetches student information from API
  componentDidMount() {
    const apiUrl = 'https://www.hatchways.io/api/assessment/students';
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          fetchedStudents: data['students']
        })
      })
  }
  
  // adds the outputted tags to the fetchedStudents object
  addTagsToStudents = (tags) => {
    const {fetchedStudents} = this.state
    fetchedStudents.map(student => {
      return (
        Object.entries(tags).forEach(([name, value]) => {
          if(name === `${student.firstName} ${student.lastName}`) {
            student['tags'] = value.tags
            return student['tags']
          }
        })
      )
    })

    let newStudents = fetchedStudents.slice()
    this.setState({
      newFetchtedStudents: newStudents
    })
  }
  render() {
    return (
      <React.Fragment>
        <Students fetchedStudents={Object.keys(this.state.newFetchtedStudents).length !== 0 ? this.state.newFetchtedStudents : this.state.fetchedStudents} addTagsToStudents={this.addTagsToStudents}/>
      </React.Fragment>
    )
  }
}

export default App