import { withStyles } from '@material-ui/core/styles';
import * as React from 'react';
import {Card, CardContent, CardMedia, InputBase} from '@material-ui/core';
import AddImageIcon from '@material-ui/icons/ImageOutlined';
import * as AzureStorage from "@azure/storage-blob";
import {updateNoteDispatched} from '../services/notesService'
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
            body: props.body,
            header: props.header,
            id: props.id,
            position: props.position,
            imageUrl: props.imageUrl == null ? "Unknown" : props.imageUrl,
            imagePath: props.imagePath,
            image: null
        }

        this.handleHeaderChange = this.handleHeaderChange.bind(this);
        this.handleBodyChange = this.handleBodyChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        //this.handleCapture = this.handleCapture.bind(this);
    }

    private handleCapture(event: any) {
      const image = event.target.files[0];
      const imageUrl = URL.createObjectURL(event.target.files[0]);

      this.setState({
        ...this.state,
        imageUrl: imageUrl,
        image: image
      })
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
            {/* <NoteToolbar handleCapture={(event:any) => this.handleCapture(event)} /> */}
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
        this.props.updateNoteDispatched(this.state);
        event.preventDefault();
      }
}

const mapStateToProps = (state:any) => ({
  auth: state.auth
});

const mapDispatchToProps = (dispatch: any) => ({
  updateNoteDispatched: (id:any) => dispatch(updateNoteDispatched(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Note))
