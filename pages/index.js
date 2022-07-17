import * as React from "react";
import axios from "../helpers/axios-instance";
import Link from "next/link";

export default function Home(props) {
  const { phoneBooks } = props;

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
                    <Link href="/phone-books/create">
                      <a className="btn btn-primary">Create</a>
                    </Link>
                  </div>
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table table-striped table-hover align-middle">
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
                          {(phoneBooks || []).map((phoneBook, index) => (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>
                                <img
                                  className="rounded"
                                  src={phoneBook.image ?? "/images/default.png"}
                                  width={50}
                                  height={50}
                                  alt={phoneBook.name}
                                />
                              </td>
                              <td>{phoneBook.name}</td>
                              <td>{phoneBook.phone}</td>
                              <td>
                                <div
                                  className="btn-group"
                                  role="group"
                                  aria-label="Basic mixed styles example"
                                >
                                  <Link
                                    href={`/phone-books/edit/${phoneBook.id}`}
                                  >
                                    <a
                                      className="btn btn-primary"
                                      role="button"
                                    >
                                      Edit
                                    </a>
                                  </Link>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
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

export async function getServerSideProps() {
  const { data } = await axios.get("phone-books");

  return {
    props: {
      phoneBooks: data.data,
    },
  };
}
