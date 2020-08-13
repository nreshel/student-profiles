import React, { Component } from 'react'

export class StudentCard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      hasCollapsed: true,
      tagValue: '',
      tags: []
    }
    this.getTag = this.getTag.bind(this)
  }

  //changes the input value 
  valueChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  
  //gets the tags that had been outputted and sends it off to Student.js
  getTag(e){
    const {tags, tagValue} = this.state
    const {student} = this.props
    if(e.key === 'Enter') {
      this.setState({
        tagValue: '',
        tags: tags.concat(tagValue)
      }, this.props.getTags(tags.concat(tagValue), `${student.firstName} ${student.lastName}`))
    }
  }
  render() {
    const {hasCollapsed} = this.state
    const {student} = this.props
    return (
      <div class="student">
        <button type="button" class="expand-btn" onClick={() => this.setState({ hasCollapsed: !hasCollapsed })}>{hasCollapsed === true ? '+' : '-'}</button>
        <div style={{flexGrow: 2}}>
          <img src={`${student.pic}`} alt={`${student.firstName} ${student.lastName}`} />
        </div>
        <div style={{flexGrow: 10}}>
          <p class="student-name">{student.firstName + ' ' + student.lastName}</p>
          <div class='student-info'>
            <p>Email: {student.email}</p>
            <p>Company: {student.company}</p>
            <p>Skill: {student.skill}</p>
            <p>Grade Average: {this.props.findAvgGrade(student.grades)}%</p>
            <div className={hasCollapsed ? 'hide' : 'show'}>
              {student.grades.map((grade, index) => {
                return (
                  <p>Grade {`${index + 1}`}: {grade}</p>
                )
              })}
              <div class='tag-container'>
                <div class='tag-row'>{student.tags ? student.tags.map(tag => {
                  return (
                    <span class="tag-col">{tag}</span>
                  )
                }) : ''}</div>
                <input class="add-tag-input" type="text" placeholder="Add Tag" value={this.state.tagValue} onChange={(e) => this.setState({tagValue: e.target.value})} onKeyDown={this.getTag}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default StudentCard
