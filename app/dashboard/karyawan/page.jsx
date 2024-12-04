import EmployeeTable from "../../../components/EmployeeTable";
import AddEmployeeButton from "../../../components/AddEmployeeButton";
import ExpiringContractsNotification from "../../../components/ExpiringContractsNotification";
import ExcelImportSimulation from "../../../components/ExcelImportSimulation";

export default function EmployeeManagement() {
  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-2xl font-bold mb-4'>Pengelolaan Karyawan</h1>
      <ExpiringContractsNotification />
      <div className='mb-4 flex justify-between items-center'>
        <AddEmployeeButton />
        <ExcelImportSimulation />
      </div>
      <EmployeeTable />
    </div>
  );
}
