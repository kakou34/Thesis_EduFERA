import React from 'react'
import './recordedMeetingPage.styles.scss'
import axios from "axios"
import 'react-toastify/dist/ReactToastify.css'
import {ToastContainer, toast} from 'react-toastify'
import {Line} from "react-chartjs-2"
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {Button} from "@material-ui/core";


class RecordedMeetingPage extends React.Component {
    state = {
        selectedFile: null,
        isVideoProcessed: false,
        isLoading: false,
        data: []
    };

    onFileChange = event => {
        this.setState({selectedFile: event.target.files[0]})
    };

    onFileUpload = () => {
        if (this.state.selectedFile === null) {
            toast.error('Please choose a video!')
        } else {
            this.setState({isLoading: true})

            const formData = new FormData()
            formData.append(
                "video",
                this.state.selectedFile,
                this.state.selectedFile.name
            );

            axios.post("http://localhost:5000/offline_analysis", formData)
                .then(r => {
                    this.setState({isLoading: false})
                    if (r.status === 201) {
                        console.log(r.data)
                        toast.error(r.data)
                    } else {
                        console.log(r.data)
                        this.setState({
                            isVideoProcessed: true,
                            data: r.data
                        })

                    }
                });
        }
    };

    fileData = () => {

        if (this.state.selectedFile) {

            return (
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    width: 300,
                    flexDirection: 'column',
                    alignItems: 'center',
                    borderColor: '#000',
                    borderRadius: 10,
                    border: 'solid',
                    borderWidth: 2,
                    marginTop: 10

                }}>
                    <h2>File Details:</h2>
                    <h4>File Name: {this.state.selectedFile.name}</h4>
                    <h4>File Type: {this.state.selectedFile.type}</h4>
                </div>
            );
        } else {
            return (
                <div>
                    <br/>
                    <h4 style={{textAlign: 'center'}}>Please first choose a file before pressing the Analyse button</h4>
                </div>
            );
        }
    };

    handleClose = () => {
        this.setState({isLoading: false})
    };

    render() {
        console.log(this.state.isVideoProcessed)
        return (
            <div className='meetingContainerForm'>
                {this.state.isVideoProcessed ?
                    <div style={{
                        height: 600,
                        width: 1555,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column',
                        border: 'solid',
                        borderWidth: 4,
                        borderColor: '#0CF7DA',
                        padding: 40,
                        marginLeft: 20

                    }}>
                        <h1 style={{
                            marginTop: 20,
                            marginBottom: 20
                        }}>Analysis Results</h1>
                        <Line data={{
                            labels: this.state.data[0],
                            datasets: [
                                {
                                    type: "line",
                                    label: "Active Pleasant",
                                    fill: false,
                                    backgroundColor: 'green',
                                    borderColor: 'green',
                                    borderWidth: 1,
                                    pointRadius: 0.1,
                                    data: this.state.data[1][0],
                                    lineTension: 0.2
                                }, {
                                    type: "line",
                                    label: "Active Unpleasant",
                                    fill: false,
                                    backgroundColor: 'red',
                                    borderColor: 'red',
                                    borderWidth: 2,
                                    pointRadius: 0.1,
                                    data: this.state.data[1][1],
                                    lineTension: 0.2
                                }, {
                                    type: "line",
                                    label: "Inactive Unpleasant",
                                    fill: false,
                                    backgroundColor: 'orange',
                                    borderColor: 'orange',
                                    borderWidth: 2,
                                    pointRadius: 0.1,
                                    data: this.state.data[1][2],
                                    lineTension: 0.2
                                }, {
                                    type: "line",
                                    label: "Inactive Pleasant",
                                    fill: false,
                                    lineTension: 0.2,
                                    backgroundColor: 'blue',
                                    borderColor: 'blue',
                                    borderWidth: 1,
                                    pointRadius: 0.1,
                                    data: this.state.data[1][3]

                                }
                            ]
                        }}
                              options={{
                                  responsive: true,
                                  maintainAspectRatio: false,
                                  tooltips: {
                                      enabled: true
                                  },
                                  scales: {
                                      x:
                                          {
                                              ticks: {
                                                  autoSkip: true,
                                                  maxTicksLimit: 10
                                              },
                                          }

                                  }
                              }}/>
                    </div>
                    :
                    <div className='currentForm'>
                        <div className='meetingContainerForm'>
                            <div className='form-containerr'>
                                <div style={{
                                    width: 300,
                                    height: 50,

                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderColor: '#000',
                                    borderRadius: 10,
                                    border: 'solid',
                                    borderWidth: 2


                                }}>
                                    <input type="file" onChange={this.onFileChange}/>
                                </div>
                                <button onClick={this.onFileUpload} style={{
                                    width: 170,
                                    height: 40,
                                    backgroundColor: '#0e6b60',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderRadius: 10,
                                    marginTop: 30
                                }}>
                                    <p style={{
                                        fontSize: 16,
                                        color: 'white',
                                        fontWeight: 'bold',
                                        letterSpacing: 1.2
                                    }}>Analyse</p>

                                </button>
                                {this.fileData()}
                            </div>
                        </div>
                        <Dialog
                            open={this.state.isLoading}
                            onClose={this.handleClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogTitle id="alert-dialog-title">{"Information"}</DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    Your video is being processed! This can take few minutes, please wait...
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={this.handleClose} color="primary">
                                    Okay
                                </Button>
                            </DialogActions>
                        </Dialog>
                        <ToastContainer position="top-right"/>
                    </div>

                }
            </div>
        );
    }
}


export default RecordedMeetingPage;