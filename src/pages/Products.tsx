import { useEffect, useState } from "react";
import axios from "axios";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  category: string;
}

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]); // Store product data
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]); // Store filtered products
  const [loading, setLoading] = useState<boolean>(true); // Track loading state
  const [error, setError] = useState<string>(""); // Track error state
  const [searchQuery, setSearchQuery] = useState<string>(""); // Track the search query

  // Pagination states
  const [currentPage, setCurrentPage] = useState<number>(1); // Current page
  const [productsPerPage] = useState<number>(8); // Products per page

  // Filter states
  const [selectedCategory, setSelectedCategory] = useState<string>(""); // Category filter
  const [selectedPriceRange, setSelectedPriceRange] = useState<
    [number, number]
  >([0, 1000]); // Price range filter

  // Fetch product data when the component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        setProducts(response.data);
        setFilteredProducts(response.data); // Initially, no filters applied
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch products");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter products based on category, price, and search query
  const searchProducts = () => {
    let filtered = [...products];

    // Filter by product name (case-insensitive search)
    if (searchQuery) {
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    // Filter by price range
    filtered = filtered.filter(
      (product) =>
        product.price >= selectedPriceRange[0] &&
        product.price <= selectedPriceRange[1]
    );

    setFilteredProducts(filtered);
  };

  // Calculate current page's products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Calculate total pages
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // Handle page change
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Render loading state, error message, or product list
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  // Fetch unique categories from the products
  const categories = Array.from(
    new Set(products.map((product) => product.category))
  );

  return (
    <div>
      <h1>Products</h1>

      {/* Search Input */}
      <div className="mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by product name"
          className="p-2 border rounded text-charcoal w-full"
        />
        <button
          onClick={searchProducts}
          className="bg-softBlue text-white p-2 rounded mt-2"
        >
          Search
        </button>
      </div>

      {/* Filter Section */}
      <div className="mb-4 flex gap-4">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="p-2 border rounded text-charcoal"
        >
          <option value="">All Categories</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>

        <div>
          <label className="mr-2">Price Range:</label>
          <input
            type="number"
            value={selectedPriceRange[0]}
            onChange={(e) =>
              setSelectedPriceRange([
                Number(e.target.value),
                selectedPriceRange[1],
              ])
            }
            className="p-2 border rounded text-charcoal"
            placeholder="Min"
          />
          <span className="mx-2">-</span>
          <input
            type="number"
            value={selectedPriceRange[1]}
            onChange={(e) =>
              setSelectedPriceRange([
                selectedPriceRange[0],
                Number(e.target.value),
              ])
            }
            className="p-2 border rounded text-charcoal"
            placeholder="Max"
          />
        </div>

        <button
          onClick={searchProducts}
          className="bg-softBlue text-white p-2 rounded ml-2"
        >
          Apply Filters
        </button>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {currentProducts.map((product) => (
          <div key={product.id} className="p-4 border rounded shadow">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-48 object-cover mb-4"
            />
            <h3 className="text-lg font-semibold">{product.title}</h3>
            <p>{product.description}</p>
            <p className="text-xl font-bold">${product.price}</p>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-4">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 mx-2 bg-mintGreen text-charcoal hover:bg-softBlue hover:text-lightBeige rounded"
        >
          Previous
        </button>
        <span className="px-4 py-2 mx-2">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 mx-2 bg-mintGreen text-charcoal hover:bg-softBlue hover:text-lightBeige rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Products;
