import * as React from "react";
import Image from "next/image";
export default function Home() {
  return (
    <React.Fragment>
      <nav className="navbar bg-light">
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h1">Phone Book App</span>
        </div>
      </nav>

      <main className="mt-5">
        <section>
          <div className="container">
            <div className="row">
              <div className="col">
                <div className="card">
                  <div className="card-header d-flex justify-content-between align-items-center">
                    <span>Phone Book List</span>

                    <a href="#" className="btn btn-primary ">
                      Create
                    </a>
                  </div>
                  <div className="card-body">
                    <table className="table table-striped table-hover">
                      <thead>
                        <tr>
                          <th>SL</th>
                          <th>Image</th>
                          <th>Name</th>
                          <th>Phone</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>1</td>
                          <td>Image</td>
                          <td>Name</td>
                          <td>Phone</td>
                          <td>
                            <div
                              className="btn-group"
                              role="group"
                              aria-label="Basic mixed styles example"
                            >
                              <button type="button" className="btn btn-success">
                                Edit
                              </button>
                              <button type="button" className="btn btn-danger">
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </React.Fragment>
  );
}
