import React, {Component} from "react";
import "./App.css";
import DropDown from "./DropDown.js";
import Submit from "./Submit";

class ServerInfo extends Component {

    componentDidMount() {
        setInterval(this.getServerData, 2000);
    }

    getServerData = () => {
        fetch('/rest/server',
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

    render() {
        const haveData = this.state && this.state.result && this.state.result !== undefined && this.state.result["kie-server-info"];
        return (
                <div class="card mb-4">
                    <div class="view overlay" className="ReactTitleStyle4">
                        <center><strong>Server Info</strong></center>
                    </div>
                    <div class="card-body jbpm-card-body">
                        <dl class="row">
                            <dt class="col-sm-4">Action</dt>
                                <dd class="col-sm-8">
                                    <DropDown/>
                                </dd>
                            <dt class="col-sm-4">Owner</dt>
                            <dd class="col-sm-8">
                                <DropDown/>
                            </dd>
        

                            <dt class="col-sm-3">Submit</dt>
    
                                    <dd class="col-sm-9">
                                        <Submit/>
                                    </dd>

                            <dt class="col-sm-3">Capabilities</dt>
                            {haveData ? (
                                    <dd class="col-sm-9">
                                        <ul>
                                            {this.state.result["kie-server-info"].capabilities.map(capability => (
                                                    <li>{capability}</li>
                                            ))
                                            }
                                        </ul>
                                    </dd>
                            ) : (
                                    <dd class="col-sm-9"></dd>
                            )}
                        </dl>
                    </div>
                </div>
        );
    }
}

export default ServerInfo;