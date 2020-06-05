import * as React from 'react';
import { withStyles, CardMedia } from '@material-ui/core';

interface INoteImageContentProps {
    imageUrl?: string,
    classes: any
  }
  
const styles = (theme:any) => ({
    media: {
        height: 0,
        paddingTop: '56.25%'
    }
  });


function NoteImageContext(props: INoteImageContentProps) {
    const classes = props.classes;

    if (props.imageUrl == null) {
        return (<div/>);
    }

    return (
        <CardMedia
        component="div"
        className={classes.media}
        image={props.imageUrl}/>
    );
}


export default (withStyles(styles)(NoteImageContext))