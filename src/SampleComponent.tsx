import { Grid } from '@material-ui/core';
import * as React from 'react';
 import Note from './Note';

interface INoteItem {
    id: string;
    header: string;
    body: string;
}

export default class SampleComponent extends React.Component<{}, {error:string, notes:INoteItem[], isLoaded: boolean}> {

    constructor (props: {}) {
    super(props);

    this.state = {
        error: '',
        isLoaded: false,
        notes: []
    };
  }

  public componentDidMount () {

    fetch('http://localhost:5001/api/notes')
    .then(results => {
        return results.json();
    })
    .then(data => {
        this.setState({
            isLoaded: true,
            notes: data
        })
    },
        (error) => {
            this.setState({
              error: error.message,
              isLoaded: true
            });
          }
        // let fruits = data.map((fruit: string) => {
        // )

    )
    .catch(error => { 
        // tslint:disable-next-line:no-console
        console.debug(error) ; 
    } );
  }

  public render () {
    return (
        <Grid container={true} spacing={24}>
            {this.state.notes.map(note =>(
                <Note key={note.id} id={note.id} header={note.header} body={note.body}/>         
            ))}
        </Grid>
    )
  }
}

