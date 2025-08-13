import React from "react";

export default function StudentTable({ students, onEdit, onDelete }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Roll</th>
          <th>Name</th>
          <th>Dept</th>
          <th>Year</th>
          <th>CGPA</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {students.length === 0 ? (
          <tr><td colSpan="6">No records found</td></tr>
        ) : (
          students.map((s) => (
            <tr key={s.roll}>
              <td>{s.roll}</td>
              <td>{s.name}</td>
              <td>{s.dept}</td>
              <td>{s.year}</td>
              <td>{s.cgpa}</td>
              <td>
                <button onClick={() => onEdit(s)}>Edit</button>
                <button onClick={() => onDelete(s.roll)}>Delete</button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}
