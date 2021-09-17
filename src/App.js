import './App.css';
import { Card, Avatar } from 'antd';
import 'antd/dist/antd.css';
const { Meta } = Card;

function App() {
  return (
    <div className="App">
      <Card
        hoverable
        style={{ width: 240 }}
        cover={<img alt="example" src="https://images.unsplash.com/photo-1470202456367-bd76a65211d2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" />}
      >
        <Meta
          avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
          title="This is video title"
          description="Lorem ipsum dolor sit amet consectetur adipisicing elit." />
      </Card>


    </div>
  );
}


export default App;
