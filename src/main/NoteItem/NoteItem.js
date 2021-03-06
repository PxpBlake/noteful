//dependencies
import React from 'react';
import {Link} from 'react-router-dom';
import config from '../../config';
//context
import NotefulsContext from '../../NotefulsContext';
//css
import './NoteItem.css';
//helper functions
import {getDate} from '../../notes-helpers';

export default class NoteItem extends React.Component {
  static contextType = NotefulsContext;
  static defaultProps = {
    onDeleteNote: () => {},
    history: {
      push: () => {}
    }
  };
  //prettier-ignore
  deleteNoteRequest = e => {
    const noteId = this.props.id;
    fetch(config.API_ENDPOINT_NOTE + `${noteId}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        'Authorization': `bearer ${config.API_KEY}`
      }
    })
      .then(res => {
        console.log(1, res)
        if (!res.ok) return res.json().then(e => Promise.reject(e));
        console.log(2)
      })
      .then(() => {
        console.log(3)
        this.context.deleteNote(noteId)
        console.log(4)

        // allow parent to perform extra behaviour
        this.props.onDeleteNote(noteId)
        console.log(5)

      })
      .catch(error => {
        console.error({error})
      })
  };

  editNoteRequest = e => {
    e.preventDefault();
    const noteId = this.props.id;
    this.props.history.push(`/update-note/${noteId}`);
  };
  render() {
    const {name, id, modified} = this.props;
    return (
      <li className="NoteItem" key={id}>
        <Link to={`/note/${this.props.id}`}>
          <h3 className="NoteItem__title">{name}</h3>
        </Link>
        <button
          className="Note__delete"
          type="button"
          onClick={this.deleteNoteRequest}
        >
          remove
        </button>
        <Link to={`/update-note/${this.props.id}`}>edit</Link>
        <p className=".Note__dates">
          Date modified on<time> {getDate(modified)}</time>
        </p>
      </li>
    );
  }
}
