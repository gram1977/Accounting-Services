import { useEffect, useState } from "react";

const DEFAULT_PROD_API_URL =
  "https://accounting-services-backend-g6cyg2h0amajb0aw.southindia-01.azurewebsites.net";

const API_URL = (() => {
  const configuredApiUrl = process.env.REACT_APP_API_URL?.trim();
  const isLocalHostRuntime = window.location.hostname === "localhost";
  const pointsToLocalHost =
    configuredApiUrl?.includes("localhost") ||
    configuredApiUrl?.includes("127.0.0.1");

  if (isLocalHostRuntime) {
    return configuredApiUrl || "http://localhost:4000";
  }

  if (configuredApiUrl && !pointsToLocalHost) {
    return configuredApiUrl;
  }

  return DEFAULT_PROD_API_URL;
})();

function Reports() {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [databaseStatusMessage, setDatabaseStatusMessage] = useState("");
  const [uiStatusMessage, setUiStatusMessage] = useState("");

  useEffect(() => {
    const fetchCustomers = async () => {
      setDatabaseStatusMessage("");
      setUiStatusMessage("");

      try {
        const response = await fetch(`${API_URL}/admin/`);
        if (!response.ok) {
          setDatabaseStatusMessage(
            "Failed to fetch customer data from Database",
          );
          setUiStatusMessage("Unable to load customer list in UI");
          throw new Error(
            `HTTP error: Unable to fetch customer list! status: ${response.status}`,
          );
        }
        const data = await response.json();
        setCustomers(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  const toggleCustomerSelection = (customerId) => {
    setSelectedCustomerIds((currentSelectedIds) =>
      currentSelectedIds.includes(customerId)
        ? currentSelectedIds.filter((id) => id !== customerId)
        : [...currentSelectedIds, customerId],
    );
  };

  const escapeCsvValue = (value) => {
    const text = (value ?? "").toString();
    return `"${text.replace(/"/g, '""')}"`;
  };

  const handleDownloadCsv = () => {
    if (customers.length === 0) {
      setUiStatusMessage("No customer records available to download");
      return;
    }

    const headers = ["Name", "Address", "Email", "Contact Number"];
    const rows = customers.map((customer) => [
      escapeCsvValue(customer.name),
      escapeCsvValue(customer.address),
      escapeCsvValue(customer.email),
      escapeCsvValue(customer.contactNumber),
    ]);
    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.join(",")),
    ].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const fileUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = fileUrl;
    link.download = "customer-report.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(fileUrl);

    setUiStatusMessage("Customer report downloaded as CSV");
  };

  const handleDeleteSelected = async () => {
    if (selectedCustomerIds.length === 0) {
      return;
    }

    setDatabaseStatusMessage("");
    setUiStatusMessage("");

    try {
      await Promise.all(
        selectedCustomerIds.map(async (customerId) => {
          const response = await fetch(`${API_URL}/admin/${customerId}`, {
            method: "DELETE",
          });

          if (!response.ok) {
            throw new Error(
              `Failed to delete record ${customerId}. status: ${response.status} from database`,
            );
          }
        }),
      );
      setDatabaseStatusMessage("Delete successful from Database");
      console.log("Records deleted from database");

      setCustomers((currentCustomers) =>
        currentCustomers.filter(
          (customer) => !selectedCustomerIds.includes(customer._id),
        ),
      );
      setSelectedCustomerIds([]);
      setUiStatusMessage("Delete successful from UI");
      console.log("Delete successful from UI");
    } catch (deleteError) {
      setError(
        deleteError?.message
          ? `Error while deleting from database: ${deleteError.message}`
          : "Error while deleting from database",
      );
    }
  };

  if (loading) return <p>Loading customers...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <section className="PageSection" aria-labelledby="reports-title">
      <h1 id="reports-title">Reports</h1>
      <p>View and download your Customer Enquiries.</p>
      <div className="ReportsContainer">
        <h2>Customers</h2>
        {customers.length > 0 ? (
          <table className="CustomerTable">
            <thead>
              <tr>
                <th>Select</th>
                <th>Name</th>
                <th>Address</th>
                <th>Email</th>
                <th>Contact Number</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer._id}>
                  <td>
                    <input
                      type="checkbox"
                      aria-label={`Select ${customer.name}`}
                      checked={selectedCustomerIds.includes(customer._id)}
                      onChange={() => toggleCustomerSelection(customer._id)}
                    />
                  </td>
                  <td>{customer.name}</td>
                  <td>{customer.address}</td>
                  <td>{customer.email}</td>
                  <td>{customer.contactNumber}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No customers available.</p>
        )}
        <div className="ReportsActions">
          <button
            type="button"
            className="DeleteButton"
            onClick={handleDeleteSelected}
          >
            Delete
          </button>
          <button
            type="button"
            className="DownloadButton"
            onClick={handleDownloadCsv}
          >
            Download CSV
          </button>
        </div>
        {databaseStatusMessage ? <p>{databaseStatusMessage}</p> : null}
        {uiStatusMessage ? <p>{uiStatusMessage}</p> : null}
      </div>
    </section>
  );
}

export default Reports;
