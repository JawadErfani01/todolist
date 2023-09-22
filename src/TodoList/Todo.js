import React, { useState, useRef, useEffect } from "react";
import Alert from "./Alert";
import List from "./List";


const getLocalStorage = () => {
  let store = localStorage.getItem("MyList");
  if (store) {
    return JSON.parse(store);
  } else {
    return [];
  }
};

function Todo() {
  const [list, setlist] = useState(getLocalStorage);
  const [Name, setName] = useState("");
  const [alert, setAlert] = useState({ Show: false, msg: "", type: "" });
  const [editID, seteditID] = useState();
  const [Edit, setEdit] = useState(false);
  const [Loding, setLoding] = useState(true);
  const Myref = useRef();

  useEffect(() => {
    localStorage.setItem("MyList", JSON.stringify(list));
  }, [list]);

  useEffect(() => {
    const Mytime = setTimeout(() => {
      setLoding(!Loding);
      Myref.current.focus();
    }, 2000);
    return () => {
      clearTimeout(Mytime);
    };
  }, []);
  if (Loding) {
    return (
      <div>
        <h1 style={{ textAlign: "center" }}>Loding...</h1>
      </div>
    );
  }

  const HandelSubmit = (e) => {
    e.preventDefault();
    if (!Name) {
      showAlert(true, "please full the form", "error");
    } else if (Name && Edit) {
      setlist(
        list.map((item) => {
          if (item.id === editID) {
            return { ...list, title: Name };
          }
          return item;
        })
      );
      setEdit(false);
      setName("");
      seteditID(null);
      showAlert(true, `you edit a name`, "success");
    } else {
      showAlert(true, `you add ${Name} to list`, "success");
      const newItem = { id: new Date().getTime().toString(), title: Name };
      setlist([...list, newItem]);
      setName("");
    }
  };

  const showAlert = (Show = false, msg = "", type = "") => {
    setAlert({ Show, msg, type });
  };
  const removeItem = (id, DName) => {
    setlist(list.filter((item) => item.id !== id));
    showAlert(true, `you deleted ${DName} value`, "error");
  };
  const editItem = (id) => {
    const newItem = list.find((item) => item.id === id);
    setName(newItem.title);
    setEdit(true);
    seteditID(id);
  };
  const clearList = () => {
    setlist([]);
    showAlert(true, `you clear ${list.length} value`, "error");   
  };

  return (
    <div className="todoList-contanier ">
      <h1 className="todo-text"> Todo List</h1>
      {alert.Show && <Alert {...alert} removeAlert={showAlert} />}
      <form onSubmit={HandelSubmit}>
        <input
          className="input-text"
          type="text"
          ref={Myref}
          value={Name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Add new todo..."
          name="name"
        />
        <button className="submit-btn">{Edit ? "Edit" : "Submit"}</button>
      </form>
      <List editItem={editItem} removeItem={removeItem} list={list} />
      {list.length > 0 && (
        <button className="clear-btn" onClick={clearList}>
          Clear the list
        </button>
      )}
    </div>
  );
}

export default Todo;
