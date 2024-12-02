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

  const addUserLanguages = () => {
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

  const updateUser = (user) => {
    Axios.put("http://localhost:3001/updateUser", {
      id: user._id,
      name: user.name,
      age: user.age,
      username: user.username,
      email: user.email,
      birth_date: user.date
    }).then((response) => {
      alert("User was updated successfully!");
      setListOfUsers([...listOfUsers, { name, age, username, email, birth_date: date }]);
    });
  };

  const updateUserLanguages = (userLanguages) => {
    console.log(userLanguages);
    Axios.put("http://localhost:3001/updateUserLanguages", {
      id: userLanguages._id,
      userId: userLanguages.userId,
      languages: languages
    }).then((response) => {
      alert("Languages were updated successfully!");
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
    setName(user.name);
    setAge(user.age);
    setUsername(user.username);
    setEmail(user.email);
    setDate(user.birth_date);

    setSelectedUser(user);
    
    const languages = getUserLanguages(user._id);
    setLanguages(languages.join(", "));
  };

  const handleUpdateUser = () => {
    if (!selectedUser) {
      alert("Please select a user");
      return;
    }

    const updatedUser = {
      _id: selectedUser._id,
      name: name,
      age: age,
      username: username,
      email: email,
      birth_date: date
    };

    updateUser(updatedUser);
  };

  const handleUpdateLanguages = () => {
    if (!selectedUser) {
      alert("Please select a user");
      return;
    }

    const languages = listOfLanguages.filter(language => language.userId === selectedUser._id)[0];
    console.log(languages);

    const updatedLanguages = {
      _id: languages._id,
      userId: languages.userId,
      languages: languages.languages
    };

    updateUserLanguages(updatedLanguages);
  };

  const clearInputes = () => {
    setName("");
    setAge("");
    setUsername("");
    setEmail("");
    setDate("");
    setLanguages("");
    setSelectedUser(null);

  }

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
              <input type="text" placeholder="Name" value={name} onChange={(event) => { setName(event.target.value); }} />
              <input type="number" placeholder="Age" value={age} min={0} onChange={(event) => { setAge(event.target.value); }} />
              <input type="text" placeholder="Username" value={username} onChange={(event) => { setUsername(event.target.value); }} />
              <input type="email" placeholder="Email" value={email} onChange={(event) => { setEmail(event.target.value); }} />
              <input type="date" value={date} onChange={(event) => { setDate(event.target.value); }} />
              <Button variant="outline-primary" style={{ width: "300px", margin:"20px 0 0 0" }} onClick={createUser}>Create User</Button>
              <Button variant="outline-info" style={{ width: "300px", margin:"20px 0 0 0" }} onClick={handleUpdateUser}>Update</Button>
              <Button variant="outline-secondary" style={{ width: "300px", margin:"20px 0 0 0" }} onClick={clearInputes}>Clear</Button>
            </div>
          </Col>
          <Col md={6}>
            <div className='user-languages-form'>
              <input type="text" placeholder="User id" disabled={true} value={selectedUser ? selectedUser.name + "   " + selectedUser._id : ""} />
              <input id='languagesInput' type="text" placeholder="Languages you know" value={languages} onChange={(event) => setLanguages(event.target.value)} />
              <Button style={{ width: "300px", margin:"20px 0 0 0" }} variant="outline-success" onClick={addUserLanguages}>Save Languages</Button>
              <Button variant="outline-info" style={{ width: "300px", margin:"20px 0 0 0" }} onClick={handleUpdateLanguages}>Update</Button>
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
                  </Card.Text>
                  <div className="btn-container">
                    <Button id='deleteBtn' variant="danger" style={{margin: "0"}}  onClick={() => deleteUser(user._id)}>Delete</Button>
                  </div>
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
