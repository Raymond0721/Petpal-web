/* eslint-disable */
// How to Implement Pagination in React  https://hygraph.com/blog/react-pagination
import React from "react";

const Paginate = ({ totalPages, currentPage, paginate }) => {
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="col col-12 mx-auto">
            <ul className="d-flex justify-content-center gap-3 flex-wrap p-0">
                <li
                    className={`btn btn-outline-primary-cust rounded-circle ${currentPage === 1 ? "disabled" : ""}`}
                    onClick={() => (currentPage > 1 ? paginate(currentPage - 1) : paginate(currentPage))}
                >
                    &lt;
                </li>
                {pageNumbers.map((number) => (
                    <li
                        key={number}
                        onClick={() => paginate(number)}
                        className={`btn btn-outline-primary-cust rounded-circle
                            ${currentPage === number ? `active` : ``}`}
                    >
                        {number}
                    </li>
                ))}
                <li
                    className={`btn btn-outline-primary-cust rounded-circle ${
                        currentPage === totalPages ? "disabled" : ""
                    }`}
                    onClick={() => (currentPage < totalPages ? paginate(currentPage + 1) : paginate(currentPage))}
                >
                    &gt;
                </li>
            </ul>
        </div>
    );
};

export default Paginate;
