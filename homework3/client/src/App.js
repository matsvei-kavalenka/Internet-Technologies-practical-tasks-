import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Axios from "axios";
import { useState, useEffect } from "react";
import { Container, Row, Col, Button, Card } from 'react-bootstrap';

function App() {
  const [listOfUsers, setListOfUsers] = useState([]);
  const [listOfLanguages, setListOfLanguages] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [languages, setLanguages] = useState("");

  useEffect(() => {
    Axios.get("http://localhost:3001/getUsers").then((response) => {
      setListOfUsers(response.data);
    });
  }, []);

  useEffect(() => {
    Axios.get("http://localhost:3001/getAllLanguages").then((response) => {
      setListOfLanguages(response.data);
    });
  }, []);

  const createUser = () => {
    Axios.post("http://localhost:3001/createUser", {
      name: name,
      age: age,
      username: username,
      email: email,
      birth_date: date
    }).then((response) => {
      alert("User was created successfully!");
      setListOfUsers([...listOfUsers, { name, age, username, email, birth_date: date }]);
    });
  };

  const deleteUser = (id) => {
    Axios.delete("http://localhost:3001/deleteUser", {
      data: {
        id: id
      }
    }).then((response) => {
      alert("User was deleted");
      setListOfUsers(listOfUsers.filter(user => user._id !== id));
    });
  };

  const deleteUserLanguages = () => {
    if (!selectedUser) {
      alert("Please select a user");
      return;
    }

    if (getUserLanguages(selectedUser._id).length === 0) {
      alert("No languages to delete for this user");
      return;
    }
    const languages = listOfLanguages.filter(language => language.userId === selectedUser._id);

    Axios.delete("http://localhost:3001/deleteUserLanguages", {
      data: {
        id: languages.map(language => language._id)
      }
    }).then((response) => {
      alert("Languages were deleted");
      setListOfLanguages(listOfLanguages.filter(language => language.userId !== selectedUser._id));
      setLanguages("");
    });
  };

  const handleUserClick = (user) => {
    setSelectedUser(user);
    setUsername(user.username);
    const languages = getUserLanguages(user._id);
    setLanguages(languages.join(", "));
  };

  const handleSaveLanguages = () => {
    if (!languages) {
      alert("Please enter languages");
      return;
    }

    if (!selectedUser) {
      alert("Please select a user");
      return;
    }

    if (getUserLanguages(selectedUser._id).length > 0) {
      alert("Languages already saved for this user. Please delete them first.");
      return;
    }

    if (selectedUser) {
      Axios.post("http://localhost:3001/addLanguages", {
        userId: selectedUser._id,
        languages: languages
      }).then(() => {
        alert("Languages saved successfully!");
      });
    }
  };

  const getUserLanguages = (userId) => {
    const userLanguages = listOfLanguages.filter(language => language.userId === userId);
    return userLanguages.map((language) => language.languages);
  };

  return (
    <div className="App">
      <Container>
        <Row className="mb-4">
          <Col md={6}>
            <div className='user-form'>
              <input type="text" placeholder="Name" onChange={(event) => { setName(event.target.value); }} />
              <input type="number" placeholder="Age" min={0} onChange={(event) => { setAge(event.target.value); }} />
              <input type="text" placeholder="Username" onChange={(event) => { setUsername(event.target.value); }} />
              <input type="email" placeholder="Email" onChange={(event) => { setEmail(event.target.value); }} />
              <input type="date" onChange={(event) => { setDate(event.target.value); }} />
              <Button variant="outline-primary" style={{ width: "300px" }} onClick={createUser}>Create User</Button>
            </div>
          </Col>
          <Col md={6}>
            <div className='user-languages-form'>
              <input type="text" placeholder="User id" disabled={true} value={selectedUser ? selectedUser.name + "   " + selectedUser._id : ""} />
              <input id='languagesInput' type="text" placeholder="Languages you know" value={languages} onChange={(event) => setLanguages(event.target.value)} />
              <Button style={{ width: "300px" }} variant="outline-success" onClick={handleSaveLanguages}>Save Languages</Button>
              <Button variant="outline-danger" style={{ width: "300px", margin:"20px 0 0 0" }} onClick={deleteUserLanguages}>Delete</Button>
            </div>
          </Col>
        </Row>

        <Row className="mb-4">
          {listOfUsers.map((user, index) => (
            <Col md={4} key={user.username || index}>
              <Card className="mb-3">
                <Card.Body className="text-start" onClick={() => handleUserClick(user)}>
                  <Card.Title>{user.name}</Card.Title>
                  <Card.Text>
                    <strong>Age:</strong> {user.age} <br />
                    <strong>Username:</strong> {user.username} <br />
                    {user.email && <><strong>Email:</strong> {user.email} <br /></>}
                    {user.birth_date && <><strong>Birth Date:</strong> {user.birth_date} <br /></>}

                    <strong>Languages: </strong>
                    {user._id && (
                      getUserLanguages(user._id).length > 0
                        ? getUserLanguages(user._id).join(", ")
                        : "No languages available"
                    )}
                    <br />
                    <Button variant="danger" style={{ margin: "20px 0px 0px 0px" }} onClick={() => deleteUser(user._id)}>Delete</Button>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default App;
