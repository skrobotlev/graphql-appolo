import { useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import "./App.css";
import { CREATE_USER } from "./mutations/user";
import { GET_ALL_USERS, GET_ONE_USER } from "./query/user";

function App() {
  const [newUser] = useMutation(CREATE_USER);
  const { data, loading, error, refetch } = useQuery(GET_ALL_USERS, {
    pollInterval: 500,
  });
  const { data: oneUser, loading: loadingOneUser } = useQuery(GET_ONE_USER, {
    variables: {
      id: 1,
    },
  });
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState("");
  const [age, setAge] = useState(0);

  console.log(data);
  console.log(oneUser, "oneUS");

  useEffect(() => {
    console.log(loading, "loaddd");
  }, [loading]);

  useEffect(() => {
    if (!loading) {
      setUsers(data.getAllUsers);
    }
    console.log(typeof data, "da");
    console.log(users, "isers");
  }, [data, loading]);

  const addUser = (e) => {
    e.preventDefault();
    newUser({
      variables: {
        input: {
          username,
          age: parseInt(age),
        },
      },
    }).then(({ data }) => {
      console.log(data, "dataa");
      setUsername("");
      setAge(0);
    });
  };

  const getAll = (e) => {
    e.preventDefault();
    refetch();
  };

  return (
    <div className="App">
      <form>
        <input
          value={username}
          type="text"
          onChange={(e) => setUsername(e.target.value)}
        ></input>
        <input
          value={age}
          type="number"
          onChange={(e) => {
            console.log(e.target.value);
            setAge(e.target.value);
          }}
        ></input>

        <div className="btns">
          <button onClick={(e) => addUser(e)}>SOzdat`</button>
          <button onClick={(e) => getAll(e)}>Poluchit`</button>
        </div>
      </form>
      <div>
        {users.map((user) => {
          return (
            <div className="user">
              {user.id} {user.username} {user.age}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
