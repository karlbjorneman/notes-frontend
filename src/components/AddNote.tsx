import { withStyles } from '@material-ui/core/styles';
import * as React from 'react';
import { Card, CardContent, CardMedia, InputBase, IconButton } from '@material-ui/core';
import AddImageIcon from '@material-ui/icons/ImageOutlined';
import { connect } from 'react-redux';
import { addNoteImageDispatched } from '../services/notesService';

interface IAddNoteProps {
  id?: string;
  body?: string;
  header?: string;
  position?: { column: string }
  classes: any,
  addNoteImageDispatched: any,
  auth: any
}

interface IAddNoteState {
  id?: string;
  body?: string;
  header?: string;
  position?: { column: string }
  imageUrl: string,
  image: any
}

const backgroundColor = '#37374055';

const styles = (theme: any) => ({
  card: {
    backgroundColor: backgroundColor
  },
  header: {
    fontSize: 20
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  toolBar: {
    backgroundColor: backgroundColor,
    paddingTop: '4px'
  },
  addImageIcon: {
    color: theme.palette.text.primary,
    // margin: '0 0 0 13px'
  },
  input: {
    display: 'none'
  }
});

class AddNote extends React.Component<IAddNoteProps, IAddNoteState> {

  constructor(props: IAddNoteProps) {
    super(props);

    this.state = {
      body: props.body,
      header: props.header,
      id: props.id,
      position: props.position,
      imageUrl: "unknown",
      image: null
    }

    this.handleHeaderChange = this.handleHeaderChange.bind(this);
    this.handleBodyChange = this.handleBodyChange.bind(this);
    this.handleCapture = this.handleCapture.bind(this);
  }

  public async componentDidMount() {

  }

  public async componentWillUnmount() {
    this.props.addNoteImageDispatched(this.state.header, this.state.body, this.state.image);
  }

  public render() {
    const classes = this.props.classes;
    const colors = ['#1eb980', '#ffcf44', '#72deff'];
    let selectedColor = colors[Math.floor(Math.random() * colors.length)]

    return (
      <Card className={classes.card} style={{ backgroundColor: selectedColor }}>
        <CardMedia
          className={classes.media}
          image={this.state.imageUrl}
        />
        <CardContent>
          <InputBase
            className={classes.header}
            fullWidth={true}
            value={this.state.header}
            onChange={this.handleHeaderChange} />
          <InputBase
            fullWidth={true}
            value={this.state.body}
            multiline={true}
            onChange={this.handleBodyChange} />
        </CardContent>
        <div className={classes.toolBar} >
          <input
            accept="image/*"
            className={classes.input}
            id="button_image"
            onChange={this.handleCapture}
            type="file" />
          <label htmlFor="button_image">
            <IconButton className={classes.addImageIcon} component="span">
              <AddImageIcon />
            </IconButton>
          </label>
        </div>
      </Card>
    )
  }

  private handleCapture(event: any) {

    const image = event.target.files[0];
    const imageUrl = URL.createObjectURL(event.target.files[0])
    this.setState({
      ...this.state, 
      imageUrl: imageUrl,
      image: image
    })
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
}

const mapStateToProps = (state: any) => ({
  auth: state.auth
});

const mapDispatchToProps = (dispatch: any) => ({
  addNoteImageDispatched: (header: string, body: string, image: any) => dispatch(addNoteImageDispatched(header, body, image))
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AddNote))
