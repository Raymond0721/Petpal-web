import { useEffect, useState } from "react";
import { fetchWithToken } from "../services/utils";
import { useNavigate } from "react-router-dom";
import { getUserId } from "../services/userService";

const BlogList = ({ userId }) => {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const currentUserId = getUserId(); // Directly get the current user's ID

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetchWithToken(`/blogs/?author=${userId}`);
        if (response.ok) {
          const blogsData = await response.json();
          setBlogs(blogsData.results);
        } else {
          throw new Error("Error fetching blogs");
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (userId) {
      fetchBlogs();
    }
  }, [userId]);

  if (isLoading) {
    return <div>Loading blogs...</div>;
  }

  const goToBlog = (blogId) => {
    navigate(`/blogs/${blogId}`);
  };

  const handleCreateBlog = () => {
    navigate("/blogs/new");
  };

  return (
    <div className="card-body">
      <h2 className="card-title">Blogs</h2>
      {blogs.length === 0 ? (
        <p>No blogs found.</p>
      ) : (
        <ul>
          {blogs.map((blog) => (
            <li key={blog.id} className="m-3">
              {blog.title}
              {"  "}
              <button
                onClick={() => goToBlog(blog.id)}
                className="btn btn-outline-primary-cust btn-sm"
              >
                Read
              </button>
            </li>
          ))}
        </ul>
      )}
      {userId === currentUserId && (
        <button
          onClick={handleCreateBlog}
          className="btn btn-primary-cust mt-3"
        >
          Create New Blog
        </button>
      )}
    </div>
  );
};

export default BlogList;
