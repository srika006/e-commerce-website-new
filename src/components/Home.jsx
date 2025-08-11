import { useContext, useEffect, useState, useMemo } from "react";
import ProductList from "./ProductList.jsx";
import { Link } from "react-router-dom";
import { PageContainer } from "../context/PageContextProvider.jsx";
import { useDarkMode } from "../context/DarkModeContextProvider.jsx";
import LightIcon from "../assets/icons/LightIcon.jsx";
import DarkIcon from "../assets/icons/DarkIcon.jsx";

function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortDir, setSortDir] = useState(0);
  const [currCategory, setCurrCategory] = useState("All categories");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { pageNum, pageSize, setPageNum } = useContext(PageContainer);
  const { darkMode, toggleDarkMode } = useDarkMode();

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await fetch("https://fakestoreapi.in/api/products");
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        setProducts(data.products || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("https://fakestoreapi.in/api/products/category");
        if (!res.ok) throw new Error("Failed to fetch categories");
        const data = await res.json();
        setCategories(data.categories || []);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };

    fetchCategories();
  }, []);

  // Sorting functions
  const sortAscending = (a, b) => a.price - b.price;
  const sortDescending = (a, b) => b.price - a.price;

  // Memoized filtered and processed products
  const { filteredSortedGroupArr, totalPages } = useMemo(() => {
    if (!products.length) {
      return { filteredSortedGroupArr: [], totalPages: 0 };
    }

    // Step 1: Search filter
    let filteredArr = products;
    if (searchTerm.trim()) {
      const lowerSearchTerm = searchTerm.toLowerCase().trim();
      filteredArr = products.filter(product => 
        product.title?.toLowerCase().includes(lowerSearchTerm)
      );
    }

    // Step 2: Category filter
    if (currCategory && currCategory !== "All categories") {
      filteredArr = filteredArr.filter(product => 
        product.category === currCategory
      );
    }

    // Step 3: Sorting
    let sortedArr = [...filteredArr];
    if (sortDir === 1) {
      sortedArr.sort(sortAscending);
    } else if (sortDir === -1) {
      sortedArr.sort(sortDescending);
    }

    // Step 4: Pagination
    const totalPages = Math.ceil(sortedArr.length / pageSize);
    const startIndex = (pageNum - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedArr = sortedArr.slice(startIndex, endIndex);

    return { filteredSortedGroupArr: paginatedArr, totalPages };
  }, [products, searchTerm, sortDir, currCategory, pageNum, pageSize]);

  // Event handlers
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setPageNum(1); // Reset to first page when searching
  };

  const handleCategoryChange = (category) => {
    setCurrCategory(category);
    setPageNum(1); // Reset to first page when changing category
  };

  const handleSort = (direction) => {
    setSortDir(direction);
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl">Loading products...</div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className={darkMode ? "dark" : ""}>
      {/* Header */}
      <header className="flex flex-wrap items-center justify-between px-6 py-4 bg-gradient-to-r from-purple-500 to-indigo-500 shadow-md">
        {/* Search Bar */}
        <div className="flex items-center gap-2 w-full md:w-1/2 bg-white rounded-full px-4 py-2 shadow-inner">
          <input
            type="text"
            value={searchTerm}
            placeholder="Search products..."
            onChange={handleSearch}
            className="flex-1 bg-transparent outline-none text-gray-700 placeholder-gray-400"
          />
          
          {/* Sort Ascending */}
          <button
            onClick={() => handleSort(1)}
            className="p-1 rounded hover:bg-gray-100 transition"
            title="Sort by price (low to high)"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5 text-gray-600 hover:text-indigo-600"
            >
              <path fillRule="evenodd" d="M11.47 4.72a.75.75 0 011.06 0l3.75 3.75a.75.75 0 01-1.06 1.06L12 6.31 8.78 9.53a.75.75 0 01-1.06-1.06l3.75-3.75zm-3.75 9.75a.75.75 0 011.06 0L12 17.69l3.22-3.22a.75.75 0 111.06 1.06l-3.75 3.75a.75.75 0 01-1.06 0l-3.75-3.75a.75.75 0 010-1.06z" clipRule="evenodd" />
            </svg>
          </button>

          {/* Sort Descending */}
          <button
            onClick={() => handleSort(-1)}
            className="p-1 rounded hover:bg-gray-100 transition"
            title="Sort by price (high to low)"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5 text-gray-600 hover:text-indigo-600"
            >
              <path fillRule="evenodd" d="M11.47 19.28a.75.75 0 001.06 0l3.75-3.75a.75.75 0 00-1.06-1.06L12 17.69l-3.22-3.22a.75.75 0 00-1.06 1.06l3.75 3.75zm3.75-9.75a.75.75 0 00-1.06 0L12 6.31 8.78 9.53a.75.75 0 01-1.06-1.06l3.75-3.75a.75.75 0 011.06 0l3.75 3.75a.75.75 0 010 1.06z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex gap-6 text-white font-medium mt-3 md:mt-0">
          <Link to="/" className="hover:underline transition">
            Home
          </Link>
          <Link to="/cart" className="hover:underline transition">
            Cart
          </Link>
        </nav>

        {/* Dark Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-full bg-white shadow hover:scale-110 transition"
          aria-label={`Switch to ${darkMode ? 'light' : 'dark'} mode`}
        >
          {darkMode ? <LightIcon /> : <DarkIcon />}
        </button>
      </header>

      {/* Categories */}
      <div className="bg-gray-100 dark:bg-gray-800 py-3 px-4">
        <div className="flex items-center justify-center gap-4 overflow-x-auto">
          {/* Add "All categories" option */}
          <button
            onClick={() => handleCategoryChange("All categories")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition whitespace-nowrap ${
              currCategory === "All categories"
                ? "bg-indigo-500 text-white shadow-md"
                : "bg-white text-gray-600 hover:bg-indigo-100 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
            }`}
          >
            All categories
          </button>
          
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => handleCategoryChange(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition whitespace-nowrap ${
                currCategory === category
                  ? "bg-indigo-500 text-white shadow-md"
                  : "bg-white text-gray-600 hover:bg-indigo-100 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Products */}
      <main className={`min-h-screen p-6 ${darkMode ? "bg-gray-900 text-white" : "bg-white"}`}>
        {filteredSortedGroupArr.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <ProductList productList={filteredSortedGroupArr} />
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-gray-500 dark:text-gray-400">
              No products found matching your criteria
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setCurrCategory("All categories");
                setSortDir(0);
                setPageNum(1);
              }}
              className="mt-4 px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition"
            >
              Clear Filters
            </button>
          </div>
        )}
      </main>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-3 py-8 bg-gray-50 dark:bg-gray-800">
          {/* Previous Button */}
          <button
            onClick={() => setPageNum(pageNum - 1)}
            disabled={pageNum === 1}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-indigo-500 text-white hover:bg-indigo-600 transition disabled:opacity-40 disabled:cursor-not-allowed"
            aria-label="Previous page"
          >
            ‹
          </button>

          {/* Page Info */}
          <span className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300">
            Page {pageNum} of {totalPages}
          </span>

          {/* Next Button */}
          <button
            onClick={() => setPageNum(pageNum + 1)}
            disabled={pageNum === totalPages}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-indigo-500 text-white hover:bg-indigo-600 transition disabled:opacity-40 disabled:cursor-not-allowed"
            aria-label="Next page"
          >
            ›
          </button>
        </div>
      )}
    </div>
  );
}

export default Home;