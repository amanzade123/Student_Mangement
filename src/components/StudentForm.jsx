import React, { useState, useEffect } from "react";

export default function StudentForm({ onSave, editingStudent, clearEdit }) {
  const [formData, setFormData] = useState({
    roll: "",
    name: "",
    dept: "",
    year: "",
    cgpa: ""
  });

  useEffect(() => {
    if (editingStudent) setFormData(editingStudent);
  }, [editingStudent]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const clearForm = () => {
    setFormData({ roll: "", name: "", dept: "", year: "", cgpa: "" });
    clearEdit();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { roll, name, dept, year, cgpa } = formData;

    if (!roll || !name || !dept || !year || cgpa === "")
      return alert("All fields are required");
    if (cgpa < 0 || cgpa > 10) return alert("CGPA must be between 0 and 10");

    onSave(formData);
    clearForm();
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <label>Roll Number:</label>
      <input name="roll" value={formData.roll} onChange={handleChange} />

      <label>Name:</label>
      <input name="name" value={formData.name} onChange={handleChange} />

      <label>Department:</label>
      <select name="dept" value={formData.dept} onChange={handleChange}>
        <option value="">Select</option>
        {["CSE", "ECE", "ME", "CE", "EE"].map((d) => (
          <option key={d} value={d}>{d}</option>
        ))}
      </select>

      <label>Year:</label>
      <select name="year" value={formData.year} onChange={handleChange}>
        <option value="">Select</option>
        {[1, 2, 3, 4].map((y) => (
          <option key={y} value={y}>{y}</option>
        ))}
      </select>

      <label>CGPA:</label>
      <input
        name="cgpa"
        type="number"
        step="0.01"
        value={formData.cgpa}
        onChange={handleChange}
      />

      <div>
        <button type="submit">Save</button>
        <button type="button" onClick={clearForm}>Clear</button>
      </div>
    </form>
  );
}
