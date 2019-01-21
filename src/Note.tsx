// import Typography from '@material-ui/core/Typography';
import { Grid, TextField } from '@material-ui/core';
import * as React from 'react';

interface INoteItemProps {
    id: string;
    body?: string;
    header?: string;
  }
  
interface INoteItemState {
    id: string;
    body?: string;
    header?: string;
}

export default class Note extends React.Component<INoteItemProps, INoteItemState> {

    constructor(props: INoteItemProps) {
        super(props);

        this.state = {
            body: props.body,
            header: props.header,
            id: props.id,
        }

        this.handleHeaderChange = this.handleHeaderChange.bind(this);
        this.handleBodyChange = this.handleBodyChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    public render() {
        return (
                    <Grid item={true} xs={4}>
                        <TextField fullWidth={true} value={this.state.header} onChange={this.handleHeaderChange} onBlur={this.handleSubmit}/>
                        <br/>
                        <TextField fullWidth={true} value={this.state.body} multiline={true} onChange={this.handleBodyChange} onBlur={this.handleSubmit}/>
                    </Grid>
        )
    }

    private handleBodyChange(event: any) {
        this.setState({body: event.target.value});
      }
    private handleHeaderChange(event: any) {
        this.setState({header: event.target.value});
    }

    private handleSubmit(event: any) {
        fetch('http://localhost:5001/api/notes/' + this.state.id, {
            body: JSON.stringify(this.state),
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json;charset=UTF-8'
            },       
            method: 'PUT',
            mode: 'cors'
        });
        event.preventDefault();
      }
}

// Note.propTypes = {
//     body: PropTypes.string,
//     header: PropTypes.string
//   };