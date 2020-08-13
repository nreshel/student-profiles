import React, { Component } from 'react'
import StudentCard from './StudentCard'

export class Students extends Component {
  constructor(props) {
    super(props)

    this.state = {
      filteredStudents: [],
      search: '',
      hasCollapsed: true,
      tagObj: {},
      filteredTags: [],
      searchTag: ''
    }
    this.getTags = this.getTags.bind(this)
  }

  // finds the average grade
  findAvgGrade = (grades) => {
    let gradeTotal = 0 
    grades.forEach(grade => {
      gradeTotal += parseInt(grade, 10)
    })
    return gradeTotal / grades.length
  }
  
  // function for filtering students based on their name
  filterStudents = (e) => {
    const {fetchedStudents} = this.props
    let value = e.target.value
    let filteringStudents = []
    this.setState({
      search: value
    })

    if(filteringStudents === []) {
      filteringStudents = []
      this.setState({
        filteredStudents: fetchedStudents
      })
    } else {
      filteringStudents = fetchedStudents.filter((student) => {
        let fullName = `${student.firstName} ${student.lastName}`.toLowerCase()
        let search = value.toLowerCase()
        return fullName.includes(search)
      })
      this.setState({
        filteredStudents: filteringStudents
      })
    }

  }

  // function filtering students based on their tags
  filterTags = (e) => {
    const {fetchedStudents} = this.props
    let value = e.target.value
    let filteringTags = []
    this.setState({
      searchTag: value
    })
    if(filteringTags === []) {
      this.setState({
        filteredTags: fetchedStudents
      })
    } else {
      filteringTags = fetchedStudents.filter((student) => {
        return student.tags ? student.tags.includes(value) : null
      })
      this.setState({
        filteredTags: filteringTags
      })
    }
  }

  // gets that tags from StudentCard.js, updates the state, then sends it off to App.js to add to fetchedStudents object
  getTags = (tags, name) => {
    this.setState({
      tagObj: {
        ...this.state.tagObj,
        [name]: {
          tags: tags,
          name
        }
      }
    }, this.props.addTagsToStudents({...this.state.tagObj, [name]: {tags: tags, name}}))
  }

  render() {
    const {filteredStudents, filteredTags, search, searchTag} = this.state
    const {fetchedStudents} = this.props
    
    return (
      <div class="container">
        <div class="row">
          <input id="name-input" type="text" placeholder="Search by name" onChange={this.filterStudents}/>
          <input id="tag-input" type="text" placeholder="Search by tag" onChange={this.filterTags}/>

          {filteredStudents && search ? filteredStudents.map(studObj => {
            return (
              <StudentCard student={studObj} findAvgGrade={this.findAvgGrade} getTags={this.getTags}/>
            )
          }) : filteredTags && searchTag ? filteredTags.map(studObj => {
            return (
              <StudentCard student={studObj} findAvgGrade={this.findAvgGrade} getTags={this.getTags}/>
            )
          }) : fetchedStudents.map(studObj => {
            return (
              <StudentCard student={studObj} findAvgGrade={this.findAvgGrade} getTags={this.getTags}/>
            )
          })}
        </div>
      </div>
    )
  }
}

export default Students