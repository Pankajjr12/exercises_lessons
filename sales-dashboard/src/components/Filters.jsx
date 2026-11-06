function Filters({
    search,
    setSearch,
    category,
    setCategory,
    status,
    setStatus,
    fromDate,
    setFromDate,
    toDate,
    setToDate,
    sort,
    setSort,
    resetFilters
  }) {
  
    return (
      <div className="filters">
  
        {/* Search */}
        <input
          type="text"
          placeholder="Search customer..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
  
        {/* Category Filter */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="All">All Categories</option>
          <option value="Electronics">Electronics</option>
          <option value="Fashion">Fashion</option>
        </select>
  
        {/* Status Filter */}
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="All">All Status</option>
          <option value="Completed">Completed</option>
          <option value="Pending">Pending</option>
          <option value="Cancelled">Cancelled</option>
        </select>
  
        {/* From Date */}
        <input
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
        />
  
        {/* To Date */}
        <input
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
        />
  
        {/* Sorting */}
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="">Sort Amount</option>
          <option value="low">Low to High</option>
          <option value="high">High to Low</option>
        </select>
  
        {/* Reset */}
        <button onClick={resetFilters}>
          Reset Filters
        </button>
  
      </div>
    );
  }
  
  export default Filters;