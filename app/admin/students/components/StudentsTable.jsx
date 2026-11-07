import Link from "next/link";
import ResponseSection from "./ResponseSection";

export default function StudentsTable({ students }) {
  return (
    <table className="w-full table-auto border-collapse text-left ">
      <thead className="text-gray-500 ">
        <tr>
          <th className="font-medium py-2">Name</th>
          <th className="font-medium">Email</th>
          <th className="font-medium text-center pr-5">Status</th>
          <th className="font-medium text-center ">Actions</th>
        </tr>
      </thead>
      <tbody className="font-normal text">
        {!students || students.length === 0 ? (
          <tr className="h-64 ">
            <td colSpan={4} className="text-center align-middle p-8">
              No records available
            </td>
          </tr>
        ) : (
          <>
            {students.map((student, index) => {
              const color = student.isBlocked ? "#e5e7eb" : "#d1fae5";
              const student_id = student._id.toString();
              return (
                <tr key={index}>
                  <td className="px-3 py-6">
                    <Link href={`/admin/students/${student._id}`} className="flex text-green-500 items-center gap-1 hover:underline cursor-pointer">
                      {student.name}
                    </Link>

                  </td>
                  <td>{student.email}</td>
                  <td className="pr-5">
                    {" "}
                    <p
                      className="text-sm font-medium w-24 text-center rounded-xl py-1"
                      style={{ backgroundColor: color }}
                    >
                      {" "}
                      {student.isBlocked ? "Blocked" : "Active"}
                    </p>{" "}
                  </td>
                  <td>
                    {" "}
                    <ResponseSection studentId={student_id} studentName={student.name} isBlocked={student.isBlocked} />{" "}
                  </td>
                </tr>
              );
            })}
          </>
        )}
      </tbody>
    </table>
  );
}
