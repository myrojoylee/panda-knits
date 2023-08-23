import { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useStoreContext } from "../../utils/GlobalState";
import {
  UPDATE_CATEGORIES,
  UPDATE_CURRENT_CATEGORY,
} from "../../utils/actions";

import { QUERY_CATEGORIES } from "../../utils/queries";
import { idbPromise } from "../../utils/helpers";
import { Link } from "react-router-dom";
import { Navbar, Nav, Offcanvas } from "react-bootstrap";

function CategoryNav() {
  const [state, dispatch] = useStoreContext();

  const { categories } = state;

  const { loading, data: categoryData } = useQuery(QUERY_CATEGORIES);

  useEffect(() => {
    if (categoryData) {
      dispatch({
        type: UPDATE_CATEGORIES,
        categories: categoryData.categories,
      });
      categoryData.categories.forEach((category) => {
        idbPromise("categories", "put", category);
      });
    } else if (!loading) {
      idbPromise("categories", "get").then((categories) => {
        dispatch({
          type: UPDATE_CATEGORIES,
          categories: categories,
        });
      });
    }
  }, [categoryData, loading, dispatch]);

  const handleClick = (id) => {
    dispatch({
      type: UPDATE_CURRENT_CATEGORY,
      currentCategory: id,
    });
  };

  return (
    <>
      <Navbar expand="md">
        {/* <Navbar.Brand href="#">Navbar Offcanvas</Navbar.Brand> */}
        <Navbar.Toggle aria-controls="offcanvasNavbar-expand-md" />
        <Navbar.Offcanvas
          id="offcanvasNavbar-expand-md"
          aria-labelledby="offcanvasNavbarLabel-expand-md"
          placement="start"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id="offcanvasNavbarLabel-expand-md">
              Quick Filter
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="categoryBtnList" defaultActiveKey="/">
              {categories.map((item) => (
                <Link
                  key={item._id}
                  className="categoryBtn"
                  onClick={() => {
                    handleClick(item._id);
                  }}
                >
                  {item.name}
                </Link>
              ))}
              <button
                className="categoryBtn"
                onClick={() => {
                  handleClick("");
                }}
              >
                All
              </button>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Navbar>
    </>
  );

  // return (
  //   <>
  //     {[false, "sm", "md", "lg", "xl", "xxl"].map((expand) => (
  //       <Navbar key={expand} expand={expand} className="navbar-wrapper">
  //         <Navbar.Toggle
  //           aria-controls="responsive-navbar-nav"
  //           data-bs-toggle="offcanvas"
  //         />
  //         <Navbar.Collapse aria-controls={`offcanvasNavbar-expand-${expand}`}>
  //           <Nav className="categoryBtnList" defaultActiveKey="/">
  //             {categories.map((item) => (
  //               <Link
  //                 key={item._id}
  //                 className="categoryBtn"
  //                 onClick={() => {
  //                   handleClick(item._id);
  //                 }}
  //               >
  //                 {item.name}
  //               </Link>
  //             ))}

  //             <button
  //               className="categoryBtn"
  //               onClick={() => {
  //                 handleClick("");
  //               }}
  //             >
  //               All
  //             </button>
  //           </Nav>
  //         </Navbar.Collapse>
  //       </Navbar>
  //     ))}
  //   </>
  // );
}

export default CategoryNav;
