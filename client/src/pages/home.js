import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Link } from "react-router-dom";
import DomesticOption from '../pages/DomesticOption';

export const Home=()=> {
  return (
    <div>
    <Row xs={1} md={2} className="g-4">
      
        <Col>
          <Card>
            <Card.Img class="images" variant="top" src="https://tse4.mm.bing.net/th?id=OIP.FNeK_zoJtYk_bg0IOiyJLAHaHa&pid=Api&P=0&h=180" />
            <Card.Body>
              <Card.Title>Medical Emergency</Card.Title>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Img class="images" variant="top" src="https://www.compliancesigns.com/media/NH/fire-emergency/1000/Emergency-Contact-911-Sign-NHE-13836_1000.gif" />
            <Card.Body>
              <Card.Title>Fire Emergency</Card.Title>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Img class="images" variant="top" src="https://cdn0.iconfinder.com/data/icons/man-fighting-resisting-and-obstructing-police-duty/358/policeman-fight-criminal-018-1024.png" />
            <Card.Body>
              <Card.Title>Police Emergency</Card.Title>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
          <Link to="/DomesticOption" element={<DomesticOption/>}><Card.Img class="images"variant="top" src="https://www.pngall.com/wp-content/uploads/5/Helping-Hands-PNG-Clipart.png" 
            /></Link>
            <Card.Body>
              <Card.Title>Domestic Help</Card.Title>
            </Card.Body>
          </Card>
        </Col>
    </Row>
   </div>
  );
}