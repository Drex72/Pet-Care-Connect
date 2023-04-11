import { ReactElement } from "react";
import { userData, tableHead } from "../../data/usersData";
import "./TableStyles.scss";

export const Table = ({ children }: { children: JSX.Element[] }) => {
  return (
    // <section>
    //   <table className="table-desktop">
    //     <thead>
    //       <tr>
    //         {tableHead.map((head: string) => (
    //           <th key={head}>{head}</th>
    //         ))}
    //         <th>View User</th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       {userData.map((data) => (
    //         <tr key={data.id}>
    //           <td>{data.firstName}</td>
    //           <td>{data.lastName}</td>
    //           <td>{data.email}</td>
    //           <td>{data.phoneNumber}</td>
    //           <td>
    //             <span
    //               className={`${
    //                 data.isCertified ? "verified-user" : "unverified-user"
    //               }`}
    //             >
    //               {data.isCertified ? "True" : "False"}
    //             </span>
    //           </td>
    //           <td>
    //             <button type="button" className="view-user-button">
    //               {data.isCertified ? "View Details" : "View Details"}
    //             </button>
    //           </td>
    //         </tr>
    //       ))}
    //     </tbody>
    //   </table>
    //   <table className="table-mobile">
    //     <thead>
    //       <tr>
    //         <th>First Name</th>
    //         <th>Last Name</th>
    //         <th>View User</th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       {userData.map((data) => (
    //         <tr key={data.id}>
    //           <td>{data.firstName}</td>
    //           <td>{data.lastName}</td>

    //           <td>
    //             <button type="button" className="view-user-button">
    //               {data.isCertified ? "View Details" : "View Details"}
    //             </button>
    //           </td>
    //         </tr>
    //       ))}
    //     </tbody>
    //   </table>
    // </section>
    <table>{children}</table>
  );
};

export const TableHeadContainer = ({
  children,
}: {
  children: ReactElement;
}) => {
  return (
    <thead>
      <tr>{children}</tr>
    </thead>
  );
};

export const TableBodyContainer = ({
  children,
}: {
  children: ReactElement;
}) => {
  return <tbody>{children}</tbody>;
};

export const TableHead = ({ label }: { label: string }) => {
  return <th>{label}</th>;
};

export const TableBodyRow = ({ children }: { children: ReactElement[] }) => {
  return <tr>{children}</tr>;
};

export const TableBodyRowChild = ({
  children,
  className,
}: {
  children: any;
  className?: string;
}) => {
  return <td className={className}>{children}</td>;
};
