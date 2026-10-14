import axios from "axios";

const API = "https://shoply-backend-p6zl.onrender.com/users";

export const getUsers = () => axios.get(API);

export const deleteUser = (id) => axios.delete(`${API}/${id}`);
