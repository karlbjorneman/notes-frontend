import { withStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';
import * as React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

interface INoteItemProps {
    id: string;
    body?: string;
    header?: string;
    position: {column: string}
    classes: any
  }
  
interface INoteItemState {
    id: string;
    body?: string;
    header?: string;
    position: {column: string}
}

const grid = 8;

const styles = (theme: { spacing: { unit: number; }; palette: { text: { secondary: any; }; }; }) => ({
    paper: {
      padding: theme.spacing.unit * 2,
    //   textAlign: 'center',
      color: theme.palette.text.secondary,
      margin: `0 0 ${grid}px 0`,
    },
  });

class Note extends React.Component<INoteItemProps, INoteItemState> {


    constructor(props: INoteItemProps) {
        super(props);

        this.state = {
            body: props.body,
            header: props.header,
            id: props.id,
            position: props.position
        }

        this.handleHeaderChange = this.handleHeaderChange.bind(this);
        this.handleBodyChange = this.handleBodyChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    public render() {
        const classes = this.props.classes;

        return (
                    <Card>
                        <CardContent>
                            <div className={classes.paper}>
                                <TextField fullWidth={true} value={this.state.header} onChange={this.handleHeaderChange} onBlur={this.handleSubmit}/>
                                <TextField fullWidth={true} value={this.state.body} multiline={true} onChange={this.handleBodyChange} onBlur={this.handleSubmit}/>
                            </div>
                        </CardContent>
                    </Card>
        )
    }

    private handleBodyChange(event: any) {
        this.setState({
            ...this.state,
            body: event.target.value
        });
      }
    private handleHeaderChange(event: any) {
        this.setState({
            ...this.state,
            header: event.target.value
        });
    }

    private handleSubmit(event: any) {
        fetch('https://gustaftech-noteswebapi.azurewebsites.net/api/notes/' + this.state.id, {
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

export default withStyles(styles)(Note)

// Note.propTypes = {
//     body: PropTypes.string,
//     header: PropTypes.string
//   };