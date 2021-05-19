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
        if(this.state.selectedFile === null) {
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
                <div>
                    <h2>File Details:</h2>
                    <p>File Name: {this.state.selectedFile.name}</p>
                    <p>File Type: {this.state.selectedFile.type}</p>
                </div>
            );
        } else {
            return (
                <div>
                    <br/>
                    <h4>Choose before Pressing the Analyse button</h4>
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
                    <div style={{height: 500, width: 1000}}>
                        <h1>Analysis Results</h1>
                        <Line data={{
                            labels: this.state.data[0],
                            datasets: [
                                {
                                    type: "line",
                                    label: "Active Pleasant",
                                    fill: false,
                                    lineTension: 0.5,
                                    backgroundColor: 'rgba(75,192,192,1)',
                                    borderColor: 'rgb(75, 192, 192)',
                                    borderWidth: 1,
                                    pointRadius: 0.1,
                                    data: this.state.data[1][0],
                                    tension: 0.1
                                }, {
                                    type: "line",
                                    label: "Active Unpleasant",
                                    fill: false,
                                    lineTension: 0.5,
                                    backgroundColor: 'rgba(90,20,20,1)',
                                    borderColor: 'rgba(90,20,20,1)',
                                    borderWidth: 1,
                                    pointRadius: 0.1,
                                    data: this.state.data[1][1]
                                }, {
                                    type: "line",
                                    label: "Inactive Unpleasant",
                                    fill: false,
                                    lineTension: 0.5,
                                    backgroundColor: 'rgba(0,10,80,1)',
                                    borderColor: 'rgba(0,10,80,1)',
                                    borderWidth: 1,
                                    pointRadius: 0.1,
                                    data: this.state.data[1][2]
                                }, {
                                    type: "line",
                                    label: "Inactive Pleasant",
                                    fill: false,
                                    lineTension: 0.5,
                                    backgroundColor: 'rgba(0,150,0,1)',
                                    borderColor: 'rgba(0,150,0,1)',
                                    borderWidth: 1,
                                    pointRadius: 0.1,
                                    data: this.state.data[1][3]
                                }, {
                                    type: "line",
                                    label: "No Face",
                                    fill: false,
                                    lineTension: 0.5,
                                    backgroundColor: 'rgba(128,128,128,1)',
                                    borderColor: 'rgba(128,128,128,1)',
                                    borderWidth: 1,
                                    pointRadius: 0.1,
                                    data: this.state.data[1][4]
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
                                      xAxis: [
                                          {
                                              ticks: {
                                                  autoSkip: true,
                                                  maxTicksLimit: 10
                                              },
                                          }
                                      ]
                                  }
                              }}/>
                    </div>
                    :
                    <div className='currentForm'>
                        <div className='meetingContainerForm'>
                            <div className='form-container'>
                                <input type="file" onChange={this.onFileChange}/>
                                <button onClick={this.onFileUpload}>
                                    Analyse
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