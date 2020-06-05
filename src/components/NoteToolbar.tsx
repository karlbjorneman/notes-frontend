import * as React from 'react';
import { withStyles, IconButton } from "@material-ui/core";
import AddImageIcon from '@material-ui/icons/ImageOutlined';

interface INoteImageContentProps {
    classes:any,
    handleCapture:any
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

  function NoteToolbar(props: INoteImageContentProps) {  
    const classes = props.classes;

    return (
        <div className={classes.toolBar} >
            <input
            accept="image/*"
            className={classes.input}
            id="button_image"
            onChange={props.handleCapture}
            type="file" />
            <label htmlFor="button_image">
            <IconButton className={classes.addImageIcon} component="span">
                <AddImageIcon />
            </IconButton>
            </label>
        </div>);
  }

export default (withStyles(styles)(NoteToolbar))