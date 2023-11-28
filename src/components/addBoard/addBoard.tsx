import React from 'react'

function AddBoard() {
  return (
    <div className="calc">
    <div className='addBoard' data-testid="addBoard">
        <h1>Add New Board</h1>
        <div className="boardName">
            <label htmlFor="boardName">Name</label>
            <input type="text" placeholder='e.g. Web Design' />
        </div>
        <div className="columnsBoard">
            <label htmlFor="columsBoard">Columns</label>
            <div className="columnBoard">
                <input type="text" />
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
                <rect x="12.7275" width="3" height="18" transform="rotate(45 12.7275 0)" fill="#828FA3"/>
                <rect y="2.12132" width="3" height="18" transform="rotate(-45 0 2.12132)" fill="#828FA3"/>
                </svg>
            </div>
            <div className="addNewColumn">
                <p>+ Add New Column</p>
            </div>
            <div className="createNewBoard">
                <p>Create New Board</p>
            </div>
        </div>
    </div>
    </div>
  )
}

export default AddBoard