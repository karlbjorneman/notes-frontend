import { withStyles } from '@material-ui/core/styles';
import * as React from 'react';
import {Card, CardContent, InputBase} from '@material-ui/core';
import {updateNoteDispatched, updateNoteImageDispatched} from '../services/notesService'
import { connect } from 'react-redux';
import NoteImageContent from './NoteImageContent';
import NoteToolbar from './NoteToolbar';

interface INoteItemProps {
    id?: string,
    body?: string,
    header?: string,
    position?: {column: string},
    imageUrl: string,
    imagePath: string,
    classes: any,
    auth:any,
    updateNoteDispatched: any,
    updateNoteImageDispatched: any
  }
  
interface INoteItemState {
    id?: string;
    body?: string;
    header?: string;
    position?: {column: string}
    imageUrl: string,
    imagePath: string,
    image: any
}

const backgroundColor = '#37374055';

const styles = (theme:any) => ({
    card: {
      backgroundColor: backgroundColor
    },
    header: {
        fontSize: 20
    },
    toolBar: {
      backgroundColor: backgroundColor,
      paddingTop: '4px'
    },
    addImageIcon: {
      color: theme.palette.text.primary,
      margin: '0 0 0 13px'
    }
  });

class Note extends React.Component<INoteItemProps, INoteItemState> {

    constructor(props: INoteItemProps) {
        super(props);

        this.state = {
            body: this.props.body,
            header: this.props.header,
            id: this.props.id,
            position: this.props.position,
            imageUrl: this.props.imageUrl == null ? "Unknown" : this.props.imageUrl,
            imagePath: this.props.imagePath,
            image: null
        }
    }

    public render() {
      const classes = this.props.classes;
      const colors = ['#1eb980', '#ffcf44', '#72deff'];
      let selectedColor = colors[Math.floor(Math.random() * colors.length)]

      return (
        <Card className={classes.card} style={{backgroundColor: selectedColor}}>
            <NoteImageContent imageUrl={this.state.imageUrl} />
            <CardContent>
              <InputBase 
                className={classes.header} 
                fullWidth={true} 
                value={this.state.header} 
                onChange={this.handleHeaderChange} 
                onBlur={this.handleSubmit}/>
              <InputBase 
                fullWidth={true} 
                value={this.state.body} 
                multiline={true} 
                onChange={this.handleBodyChange} 
                onBlur={this.handleSubmit}/>
            </CardContent>
            <NoteToolbar id={this.props.id} imageSelectedCallback={this.imageSelectedCallback}/>
        </Card>
      )
    }

    imageSelectedCallback = (imageFile:any) => {
      const imageUrl = URL.createObjectURL(imageFile);

      let note = {
         ...this.state,
         image : imageFile,
         imageUrl
      };

      this.setState(note);

      this.props.updateNoteImageDispatched(note);
    }

    handleBodyChange = (event: any) => {
        this.setState({
            ...this.state,
            body: event.target.value
        });
      }

    handleHeaderChange = (event: any) => {
        this.setState({
            ...this.state,
            header: event.target.value
        });
    }

    handleSubmit = (event: any) => {
        this.props.updateNoteDispatched(this.state);
        event.preventDefault();
      }
}

const mapStateToProps = (state:any) => ({
  auth: state.auth
});

const mapDispatchToProps = (dispatch: any) => ({
  updateNoteDispatched: (note:any) => dispatch(updateNoteDispatched(note)),
  updateNoteImageDispatched: (note:any) => dispatch(updateNoteImageDispatched(note))
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Note))
