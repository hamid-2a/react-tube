import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import './App.css';
import axios from 'axios';
import Loader from "./assets/loader.gif";

import {
  Row,
  Col,
  Input,
  Button,
  Switch,
  Card,
  Skeleton
} from 'antd';

import {
  SearchOutlined,
  CloseOutlined,
  CheckOutlined,
  CaretRightOutlined
} from '@ant-design/icons';

const { Meta } = Card;

const getData = async (searchValue, setData, setPlayingVideo) => {
  console.log("%c getData() starts", "color: green");
  const result = await axios("https://www.googleapis.com/youtube/v3/search", {
    method: "GET",
    params: {
      part: "snippet",
      key: "AIzaSyBLF-qplB3n6ZQSGvqCA9vA0c_2jJteG2g",
      type: "video",
      maxResults: 6,
      q: searchValue
    }
  });

  console.log(result);
  setData(result);
  setPlayingVideo({
    thumbnail: result.data.items[0].snippet.thumbnails.high.url,
    title: result.data.items[0].snippet.title,
    description: result.data.items[0].snippet.description,
    videoId: result.data.items[0].id.videoId,
    channelTitle: result.data.items[0].snippet.channelTitle
  })
  console.log("%c getData() done", "color: green");
}

const toggleDarkMode = (e) => {
  if (e) {
    document.querySelector(".App").classList.add("dark")
    document.body.classList.add("dark")
  }
  else {
    document.querySelector(".App").classList.remove("dark")
    document.body.classList.remove("dark")
  }
}

const App = () => {
  const [searchValue, setSearchValue] = useState("react js");
  const [data, setData] = useState([]);
  const [playingVideo, setPlayingVideo] = useState({});


  useEffect(() => {
    console.log("%c use effect", "color: yellow");
    getData(searchValue, setData, setPlayingVideo)
  },
    [searchValue]);

  return (
    <div className="App">
      <Row className="header" justify="center">
        <Col xs={24} sm={20} md={18} lg={16} xl={12}>

          <Input
            className="searchInput"
            id="searchInput"
            placeholder="Search video ..."
            allowClear
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                e.target.value === "" ? alert("Search field is empty!") : setSearchValue(e.target.value)
              }
            }} />

          <Button
            className="search-btn"
            icon={<SearchOutlined />}
            onClick={() => {
              document.getElementById("searchInput").value === "" ?
                alert("Search field is empty!") :
                setSearchValue(document.getElementById("searchInput").value)
            }
            }
          >
            SEARCH
          </Button>
        </Col>
      </Row>

      <Row>
        <Col xs={24} md={24} lg={18} xl={18} className="main-content">
          <Row justify="space-between">
            <Col xs={16} >
              <h1 className="app-name">React Tube<CaretRightOutlined /></h1>
            </Col>

            <Col className="switch-container">
              <Switch
                checkedChildren={<CheckOutlined />} unCheckedChildren={<CloseOutlined />}
                onClick={(e) => {
                  toggleDarkMode(e)
                }}
              />
              <span className="switch-text">Dark Mode</span>
            </Col>
          </Row>

          {
            !data.data ?
              <Row
                justify="center">
                <Col md={14} sm={22} xs={24}>
                  <Card
                    className="card waiting-card"
                    cover={<img className="spinner-img" alt="loading" src={Loader} />}
                  >
                    <Skeleton loading active>
                      <Meta
                        title="Card title"
                        description="This is the description"
                      />
                    </Skeleton>
                  </Card>
                </Col>
              </Row> :

              <Row
                justify="center">
                <Col md={14} sm={20} xs={24}>
                  <Card
                    className="card playing-video"
                    cover={
                      <iframe
                        className="video-player"
                        src={`https://www.youtube.com/embed/${playingVideo.videoId}`}
                        title={playingVideo.title}
                      ></iframe>}
                  >
                    <Meta
                      title={playingVideo.title}
                      description={playingVideo.description}
                    />
                    <h4 className="chanel-id">
                      <a
                        href={`https://www.youtube.com/${playingVideo.channelTitle}`}
                        target="blank">
                        {playingVideo.channelTitle}
                      </a>
                    </h4>
                  </Card>
                </Col>
              </Row>
          }
        </Col>


        <Col xs={24} md={24} lg={6} xl={6} className="right-sidebar">
          <Row >
            {
              !data.data ?
                <Card
                  md={14} xs={24}
                  className="card waiting-card"
                  cover={<img className="spinner-img" alt="loading" src={Loader} />}
                >
                  <Skeleton loading active>
                    <Meta
                      title="loading ..."
                      description="loading ..."
                    />
                  </Skeleton>
                </Card> :

                data.data.items.map(item => (
                  <Col lg={22} md={10} sm={22} xs={24} style={{ margin: "auto" }}>
                    <Card
                      className="card search-result"
                      hoverable
                      cover={<img alt="cover" src={item.snippet.thumbnails.high.url} />}

                      onClick={() => {
                        setPlayingVideo({
                          thumbnail: item.snippet.thumbnails.high.url,
                          title: item.snippet.title,
                          description: item.snippet.description,
                          videoId: item.id.videoId,
                          channelTitle: item.snippet.channelTitle
                        });
                        window.scrollTo({
                          top: 0,
                          left: 0,
                          behavior: 'smooth'
                        });
                      }
                      }
                    >
                      <Meta
                        className="card-details"
                        title={item.snippet.title}
                      />
                      <h4 className="chanel-id">
                        <a
                          href={`https://www.youtube.com/${item.snippet.channelTitle}`}
                          target="blank">
                          {item.snippet.channelTitle}
                        </a>
                      </h4>
                    </Card>
                  </Col>
                ))
            }
          </Row>

        </Col>

      </Row>
    </div>
  );
}


export default App;
