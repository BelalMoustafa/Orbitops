import React from 'react';
import PropTypes from 'prop-types';
import Markdown from '../Markdown';

export default class Stats extends React.Component {
    constructor(props) {
        super(props);
        this.setVideoRef = this.setVideoRef.bind(this);
    }
    static propTypes = {
        description: PropTypes.string,
        velocity: PropTypes.string,
        magnitude: PropTypes.string,
        trueAnomaly: PropTypes.string,
        time: PropTypes.string,
        videoUrl: PropTypes.string,
        modalActive: PropTypes.bool,
    }

    componentDidUpdate(prevProps) {
        if (this.videoRef && prevProps.modalActive !== this.props.modalActive && !this.props.modalActive) {
            this.videoRef.pause();
        }
    }

    setVideoRef = (element) => {
        this.videoRef = element;
    }

    render() {
        return (
            <div className="stats">
                {this.props.videoUrl && (
                    <div className="video-container">
                        <video ref={this.setVideoRef} controls width="600">
                            <source src={this.props.videoUrl} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                )}
                <Markdown text={this.props.description || ''} />
                <div className="stats__footer">
                    <div className="stats__info">
                        <span>{this.props.pageText.stats.currentEarthTime}</span><br />
                        <span>{this.props.pageText.stats.velocityAtVector}</span><br />
                        <span>{this.props.pageText.stats.distanceToSun}</span><br />
                        <span>{this.props.pageText.stats.trueAnomaly}</span><br />
                    </div>
                    <div className="stats__info">
                        <span>{this.props.time}</span><br />
                        <span>
                            {this.props.velocity}&nbsp;
                            {this.props.pageText.abbreviations.kilometers}/
                            {this.props.pageText.abbreviations.seconds}
                        </span><br />
                        <span>{this.props.magnitude} {this.props.pageText.abbreviations.kilometers}</span><br />
                        <span>{this.props.trueAnomaly} {this.props.pageText.abbreviations.theta}</span>
                    </div>
                </div>
            </div>
        );
    }
}
