import React from "react";

export default function SearchSortFilters({
  search,
  setSearch,
  sortField,
  setSortField,
  sortOrder,
  setSortOrder,
  filterDept,
  setFilterDept,
  filterYear,
  setFilterYear
}) {
  const toggleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  return (
    <div className="filters">
      <input
        placeholder="Search Roll or Name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <button onClick={() => toggleSort("cgpa")}>
        Sort CGPA ({sortField === "cgpa" ? sortOrder : "asc"})
      </button>
      <button onClick={() => toggleSort("name")}>
        Sort Name ({sortField === "name" ? sortOrder : "asc"})
      </button>

      <select value={filterDept} onChange={(e) => setFilterDept(e.target.value)}>
        <option value="">All Departments</option>
        {["CSE", "ECE", "ME", "CE", "EE"].map((d) => (
          <option key={d} value={d}>{d}</option>
        ))}
      </select>

      <select value={filterYear} onChange={(e) => setFilterYear(e.target.value)}>
        <option value="">All Years</option>
        {[1, 2, 3, 4].map((y) => (
          <option key={y} value={y}>{y}</option>
        ))}
      </select>
    </div>
  );
}
