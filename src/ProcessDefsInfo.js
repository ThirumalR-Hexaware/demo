import React, {Component} from "react";
import "./App.css";
import Demo from './Demo'

class ProcessDefsInfo extends Component {

    componentDidMount() {
        setInterval(this.getProcessDefsData, 2000);
    }

    getProcessDefsData = () => {
        fetch('/rest/server/containers/sample-react-kjar/processes',
                {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                })
                .then(response => response.json())
                .then(data => {
                    this.setState(data);
                });
    };

    handleStartProcess = (cid, pid) => {
        fetch('/rest/server/containers/' + cid + '/processes/' + pid + '/instances', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
    };

    render() {
        const haveData = this.state && this.state.processes;
        return (
                <div class="card mb-4">
                    <div class="view overlay" className="ReactTitleStyle2">
                        <center><strong>Process Definitions</strong></center>
                    </div>
                    <div class="card-body jbpm-card-body">
                    <Demo/>
                    </div>
                </div>
        );
    }
}

export default ProcessDefsInfo;