import * as React from 'react';
import { withStyles, IconButton } from "@material-ui/core";
import AddImageIcon from '@material-ui/icons/ImageOutlined';
import { render } from 'react-dom';

interface INoteImageContentProps {
    classes:any,
    handleCapture:any
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
  
  constructor(props: INoteImageContentProps) {
    super(props);

    this.handleCapture = this.handleCapture.bind(this);
  }

  private handleCapture(event: any) {
    this.props.handleCapture(event);
  }

  public render(){ 
    const classes = this.props.classes;

    return (
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
        </div>);
  }
}

export default (withStyles(styles)(NoteToolbar))