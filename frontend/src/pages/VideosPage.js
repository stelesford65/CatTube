import React, { Component } from "react";
import VideoList from "../components/VideoList";
import VideoModal from "../components/VideoModal";
import { Container } from "react-bootstrap";

const PART = "snippet";
const Q = "cats";
const ORDER = "viewCount";
const TYPE = "video";
const DEFINITION = "high";
const EMBEDDABLE = "true";
// const KEY = "AIzaSyCPUogbU4UtrNJ9pRM80EQfXkLkY9qnUuA";
const KEY = "AIzaSyDGIqCKflf98bIIky5PJRCQ9qi612hPPic";
const LANG = "en";
const MAX = "20";
const SAFE = "strict";
const SERVICE_URL =
  "https://www.googleapis.com/youtube/v3/search?part=" +
  PART +
  "&q=" +
  Q +
  "&order=" +
  ORDER +
  "&type=" +
  TYPE +
  "&videoDefinition=" +
  DEFINITION +
  "&videoEmbeddable=" +
  EMBEDDABLE +
  "&key=" +
  KEY +
  "&relevanceLanguage=" +
  LANG +
  "&maxResults=" +
  MAX +
  "&safeSearch=" +
  SAFE;

class VideosPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videos: [],
      selectedVideo: null,
      showModal: false,
    };
  }

  selectVideo = (index) => {
    // Select a video by its index and show the modal
    this.setState({
      selectedVideo: index,
      showModal: true,
    });
  };

  hideModal = () => {
    // Hide modal and unselect video
    this.setState({
      selectedVideo: null,
      showModal: false,
    });
  };

  parseVideos = (item) => {
    // Extract relevant data into JSON object and add it to the list of videos
    let video = {
      id: item.id.videoId,
      title: item.snippet.title,
      imgUrl: item.snippet.thumbnails.high.url,
    };
    this.setState({ videos: this.state.videos.concat(video) });
  };

  componentDidMount() {
    fetch(SERVICE_URL)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ videos: [] });
        data.items.forEach(this.parseVideos);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  render() {
    // Conditional render of modal (in case video is not set)
    const modal =
      this.state.selectedVideo !== null ? (
        <VideoModal
          video={this.state.videos[this.state.selectedVideo]}
          user={this.props.user}
          show={this.state.showModal}
          handleHide={this.hideModal}
        />
      ) : null;

    return (
      <Container>
        <VideoList videos={this.state.videos} handleSelect={this.selectVideo} />
        {modal}
      </Container>
    );
  }
}

export default VideosPage;
