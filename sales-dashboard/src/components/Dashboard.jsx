import { useState, useMemo } from "react";

import salesData from "../data/salesData";

import SummaryCards from "./SummaryCards";
import Filters from "./Filters";
import SalesTable from "./SalesTable";

function Dashboard() {

  // Search state
  const [search, setSearch] = useState("");

  // Filter states
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("All");

  // Date states
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  // Sorting state
  const [sort, setSort] = useState("");

  // Filter and sort sales data
  const filteredSales = useMemo(() => {

    let result = salesData.filter((item) => {

      // Search customer name
      const matchSearch = item.customer
        .toLowerCase()
        .includes(search.toLowerCase());

      // Category filter
      const matchCategory =
        category === "All" ||
        item.category === category;

      // Status filter
      const matchStatus =
        status === "All" ||
        item.status === status;

      // Date filter
      const matchFromDate =
        !fromDate || item.date >= fromDate;

      const matchToDate =
        !toDate || item.date <= toDate;

      return (
        matchSearch &&
        matchCategory &&
        matchStatus &&
        matchFromDate &&
        matchToDate
      );

    });

    // Sort by amount
    if (sort === "low") {
      result.sort((a, b) => a.amount - b.amount);
    }

    if (sort === "high") {
      result.sort((a, b) => b.amount - a.amount);
    }

    return result;

  }, [search, category, status, fromDate, toDate, sort]);

  // Reset all filters
  const resetFilters = () => {

    setSearch("");
    setCategory("All");
    setStatus("All");
    setFromDate("");
    setToDate("");
    setSort("");

  };

  return (

    <div className="dashboard">

      {/* Header */}
      <header className="header">

        <div>
          <h1>Sales Analytics Dashboard</h1>
          <p>Monitor your sales performance</p>
        </div>

        <span className="date-label">
          November 2026
        </span>

      </header>

      {/* Summary Cards */}
      <SummaryCards sales={salesData} />

      {/* Transactions Section */}
      <section className="sales-section">

        <div className="section-header">

          <h2>Sales Transactions</h2>

          <p>
            Showing {filteredSales.length} of {salesData.length} orders
          </p>

        </div>

        {/* Filters */}
        <Filters
          search={search}
          setSearch={setSearch}

          category={category}
          setCategory={setCategory}

          status={status}
          setStatus={setStatus}

          fromDate={fromDate}
          setFromDate={setFromDate}

          toDate={toDate}
          setToDate={setToDate}

          sort={sort}
          setSort={setSort}

          resetFilters={resetFilters}
        />

        {/* Sales Table */}
        <SalesTable sales={filteredSales} />

      </section>

    </div>

  );

}

export default Dashboard;