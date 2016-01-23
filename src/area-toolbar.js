import React from 'react'

class AreaToolbar extends React.Component {
  render() {
    return (
      <form>
        <fieldset>
          <legend>Area Information</legend>
          <div className="form-element">
            <label htmlFor="area-name">Area Name</label>
            <input id="area-name" type="text" className="form-input"></input>
          </div>
          <div className="form-element">
            <label htmlFor="min-level">Minimum Level</label>
            <input id="min-level" type="number" min="1" max="101" className="form-input"></input>
          </div>
          <div className="form-element">
            <label htmlFor="max-level">Maximum Level</label>
            <input id="max-level" type="number" min="1" max="101" className="form-input"></input>
          </div>
          <div className="form-element">
            <label htmlFor="author-name">Author Name</label>
            <input id="author-name" type="text" className="form-input"></input>
          </div>
        </fieldset>
      </form>
    )
  }
}

export default AreaToolbar
