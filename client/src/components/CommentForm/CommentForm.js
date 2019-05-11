import React from 'react';
import './style.css';

function CommentForm(props) {
    return(
        <div>
            <form id='commentId'>
                <label htmlFor='commentInput'>Post Comment Here</label>
                <input type='text' id='commentInput' onChange={props.handleInputChange} name='commentInput' value={props.commentInput}></input>
                <button type='submit' className='waves-light btn formSubmit' onClick={props.handleFormSubmit}>SUBMIT</button>
            </form>
        </div>
    )
}

export default CommentForm;