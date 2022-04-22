
import { FaEdit, FaTrash } from "react-icons/fa";
function List({ list, removeItem, editItem }) {
  return (
    <div>
      {list.map((persone,index) => {
        const { id, title } = persone;
        return (
          <div className="todolist" key={index}>
            <p>{title}</p>
            <span className="edit-btn">
              <FaEdit onClick={() => editItem(id)} />
            </span>
            <span>
              <FaTrash
                onClick={() => removeItem(id, title)}
                className="delete-btn"
              />
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default List;
