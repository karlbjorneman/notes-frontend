import * as React from 'react';
import { withStyles, IconButton } from "@material-ui/core";
import AddImageIcon from '@material-ui/icons/ImageOutlined';

interface INoteImageContentProps {
    classes:any,
    id?: string,
    imageSelectedCallback: Function
  }
  
interface INoteImageContentState {
}

const backgroundColor = '#37374055';

const styles = (theme: any) => ({
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

  class NoteToolbar extends React.Component<INoteImageContentProps, INoteImageContentState> {
  
    fileInput:any = undefined;
    form:any = undefined;

  constructor(props: INoteImageContentProps) {
    super(props);

    this.fileInput = React.createRef();
  }

  public render(){ 
    const classes = this.props.classes;

    return (
        <div className={classes.toolBar} >
          <form ref={ref => this.form = ref} onSubmit={this.handleCapture} >
            <input
            accept="image/*"
            className={classes.input}
            id={"button_image" + this.props.id}
            ref={this.fileInput}
            onChange={this.handleInput}
            type="file" />
            <label htmlFor={"button_image" + this.props.id}>
            <IconButton className={classes.addImageIcon} component="span">
                <AddImageIcon />
            </IconButton>
            </label>
          </form>
        </div>);
  }

  handleInput = (e:any) => {
    e.preventDefault();

    this.form.dispatchEvent(new Event('submit'));
  }

  handleCapture = (event: any) => {
    event.preventDefault();

    this.props.imageSelectedCallback(this.fileInput.current.files[0]);
  }
}

export default (withStyles(styles)(NoteToolbar))