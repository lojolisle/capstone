import axios from "axios";

const API = axios.create({baseURL: "http://localhost:4000"});

export const createDrug = (formData) => API.post("/drugs/createDrug", formData);
export const getDrugs = () => API.get("/drugs/getDrugs");
export const getDrug = (id) => API.get(`/drugs/${id}`);
export const deleteDrug = (id) => API.delete(`/drugs/${id}`);