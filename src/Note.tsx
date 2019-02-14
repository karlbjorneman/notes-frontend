import { withStyles } from '@material-ui/core/styles';
import { TextField, InputBase } from '@material-ui/core';
import * as React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import AzureStorage, { BlobService } from 'azure-storage/';

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
    imageUrl: string
}

const grid = 8;

const styles = (theme: { spacing: { unit: number; }; palette: { text: { secondary: any; }; }; }) => ({
    paper: {
    //   textAlign: 'center',
      color: theme.palette.text.secondary,
      margin: `0 0 ${grid}px 0`,
    },
    header: {
        fontSize: 20
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
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
            imageUrl: ""
        }

        this.handleHeaderChange = this.handleHeaderChange.bind(this);
        this.handleBodyChange = this.handleBodyChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    public componentDidMount () {
        const account = {
            name: 'gustaftechnotes',
            sas:  '?sv=2018-03-28&ss=bfqt&srt=sco&sp=rwdlacup&se=2019-02-15T14:55:28Z&st=2019-02-14T06:55:28Z&spr=https&sig=y6xFioLN4HjpTvpmIC3W3rBJjsqp2Mxudhpuhs6vkWo%3D'
        };
        
        const blobUri = 'https://' + account.name + '.blob.core.windows.net';
        const blobService = AzureStorage.createBlobServiceWithSas(blobUri, account.sas);

        const workaround:any = null;
        blobService.listBlobsSegmented('gustafechnotesblobstorage', workaround, (error:any, results:any) => {
                if (error) {
                    // Handle list blobs error
                } else {
                    results.entries.forEach((blob:any) => {
                        let url = blobService.getUrl('gustafechnotesblobstorage', blob.name);
                        url = url + account.sas;
                        this.setState({
                            ...this.state,
                            imageUrl: url
                        })
                        console.log('Name:' + blob.name + ', Type:' + blob.blobType + 'Url:' + url);
                    });
                }
            })           
    }

    public render() {
        const classes = this.props.classes;

        return (
                    <Card>
                        <CardMedia
                            className={classes.media}
                            image={this.state.imageUrl}
                        />
                        <CardContent>
                            <div className={classes.paper}>
                                <InputBase className={classes.header} fullWidth={true} value={this.state.header} onChange={this.handleHeaderChange} onBlur={this.handleSubmit}/>
                                <InputBase fullWidth={true} value={this.state.body} multiline={true} onChange={this.handleBodyChange} onBlur={this.handleSubmit}/>
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