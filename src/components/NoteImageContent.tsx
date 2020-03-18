import * as React from 'react';
import { withStyles, CardMedia } from '@material-ui/core';

interface INoteImageContentProps {
    imageUrl: string,
    classes: any
  }
  
interface INoteImageContentState {
}

const styles = (theme:any) => ({
    media: {
        height: 0,
        paddingTop: '56.25%'
    }
  });

class NoteImageContext extends React.Component<INoteImageContentProps, INoteImageContentState> {
    constructor(props: INoteImageContentProps) {
        super(props);
    }

    public render() {
        const classes = this.props.classes;

        if (this.props.imageUrl == null) {
            return (<div/>);
        }

        return (
            <CardMedia
            component="div"
            className={classes.media}
            image={this.props.imageUrl}/>
        );
    }
}

export default (withStyles(styles)(NoteImageContext))