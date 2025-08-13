import React, { useState } from "react";
import StudentForm from "./components/StudentForm";
import StudentTable from "./components/StudentTable";
import SearchSortFilters from "./components/SearchSortFilters";
import TestRunner from "./components/TestRunner";
import { isFuzzyMatch } from "./utils/helpers";
import "./styles.css";

export default function App() {
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [filterDept, setFilterDept] = useState("");
  const [filterYear, setFilterYear] = useState("");

  const handleSave = (student) => {
    setStudents((prev) => {
      const exists = prev.some(
        (s) => s.roll === student.roll && s.roll !== editingStudent?.roll
      );
      if (exists) {
        alert("Roll number must be unique");
        return prev;
      }

      if (editingStudent) {
        return prev.map((s) => (s.roll === editingStudent.roll ? student : s));
      }
      return [...prev, student];
    });
    setEditingStudent(null);
  };

  const handleDelete = (roll) => {
    setStudents((prev) => prev.filter((s) => s.roll !== roll));
  };

  const filteredStudents = students
    .filter((s) => {
      if (!search) return true;
      return (
        isFuzzyMatch(search, s.roll) || isFuzzyMatch(search, s.name)
      );
    })
    .filter((s) => (filterDept ? s.dept === filterDept : true))
    .filter((s) => (filterYear ? s.year === filterYear : true))
    .sort((a, b) => {
      if (!sortField) return 0;
      if (sortField === "cgpa") {
        return sortOrder === "asc" ? a.cgpa - b.cgpa : b.cgpa - a.cgpa;
      } else {
        return sortOrder === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      }
    });

  return (
    <div className="container">
      <h1>Student Data Manager</h1>
      <StudentForm
        onSave={handleSave}
        editingStudent={editingStudent}
        clearEdit={() => setEditingStudent(null)}
      />
      <SearchSortFilters
        search={search}
        setSearch={setSearch}
        sortField={sortField}
        setSortField={setSortField}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        filterDept={filterDept}
        setFilterDept={setFilterDept}
        filterYear={filterYear}
        setFilterYear={setFilterYear}
      />
      <StudentTable
        students={filteredStudents}
        onEdit={(s) => setEditingStudent(s)}
        onDelete={handleDelete}
      />
      <TestRunner />
    </div>
  );
}
