import { withStyles } from '@material-ui/core/styles';
import { TextField, InputBase } from '@material-ui/core';
import * as React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import * as AzureStorage from "@azure/storage-blob";
import {updatenote} from './services/notesService'

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
            imageUrl: "unknown"
        }

        this.handleHeaderChange = this.handleHeaderChange.bind(this);
        this.handleBodyChange = this.handleBodyChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    public async componentDidMount () {
        const account = {
            name: 'gustaftechnotes',
            sas:  '?sv=2015-12-11&sr=c&sig=AbymxNR6rFctDU3L%2BSOF0%2BA2TGUMB0cAAbEi8bDbhCM%3D&se=2019-03-18T07%3A16%3A11Z&sp=rwl'
        };

        const anonymousCredential = new AzureStorage.AnonymousCredential();
 
        // Use sharedKeyCredential, tokenCredential or anonymousCredential to create a pipeline
        const pipeline = AzureStorage.StorageURL.newPipeline(anonymousCredential);

        const serviceURL = new AzureStorage.ServiceURL(
            // When using AnonymousCredential, following url should include a valid SAS or support public access
            `https://${account.name}.blob.core.windows.net` + account.sas,
            pipeline
          );

          const containerURL = AzureStorage.ContainerURL.fromServiceURL(serviceURL, 'gustafechnotesblobstorage');
          let marker = undefined;
          do  {
            const listBlobsResponse:AzureStorage.Models.ContainerListBlobFlatSegmentResponse = await containerURL.listBlobFlatSegment(
              AzureStorage.Aborter.none,
              marker
            );
         
            marker = listBlobsResponse.nextMarker;
            for (const blob of listBlobsResponse.segment.blobItems) {
              const blobUrl = AzureStorage.BlobURL.fromContainerURL(containerURL, blob.name);
              this.setState({
                ...this.state,
                imageUrl: blobUrl.url
              })
            }
          } while (marker);         
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
        updatenote(this.state);
        event.preventDefault();
      }
}

export default withStyles(styles)(Note)
