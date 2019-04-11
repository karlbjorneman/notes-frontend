import { withStyles } from '@material-ui/core/styles';
import * as React from 'react';
import {Card, CardContent, CardMedia, InputBase} from '@material-ui/core';
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

const styles = (theme:any) => ({
    card: {
      backgroundColor: '#373740',
    },
    paper: {
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
            sas:  '?sv=2018-03-28&sr=c&sig=sGtKJp2MwNHAzAfXo%2BjKmgZ44Kdj5nQ0FvRlkXvgBn4%3D&se=2019-04-18T14%3A51%3A54Z&sp=rwl'
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
      const colors = ['#1eb980', '#ffcf44', '#72deff'];
      let selectedColor = colors[Math.floor(Math.random() * colors.length)]

        return (
                    <Card className={classes.card} style={{backgroundColor: selectedColor}}>
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
