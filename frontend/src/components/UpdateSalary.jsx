import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const UpdateSalary = () => {
    const { id } = useParams(); // Get the salary ID from the URL params
    const navigate = useNavigate();
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [base, setBase] = useState("");
    const [otRate, setOtRate] = useState("");
    const [otHours, setOtHours] = useState("");
    const [bonus, setBonus] = useState("");
    const [reason, setReason] = useState("");
    const [finalSal, setFinalSal] = useState("");
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        const fetchSalary = async () => {
            try {
                const response = await fetch(`/api/salaries/${id}`);
                const salaryData = await response.json();
                setFname(salaryData.fname);
                setLname(salaryData.lname);
                setEmail(salaryData.email);
                setRole(salaryData.role);
                setBase(salaryData.base);
                setOtRate(salaryData.otRate);
                setOtHours(salaryData.otHours);
                setBonus(salaryData.bonus);
                setReason(salaryData.reason);
                setFinalSal(salaryData.finalSal);
            } catch (error) {
                console.error("Error fetching data", error);
            }
        };

        fetchSalary();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedSalary = {
            fname,
            lname,
            email,
            role,
            base,
            otRate,
            otHours,
            bonus,
            reason,
            finalSal,
        };

        try {
            const response = await fetch(`/api/salaries/${id}`, {
                method: 'PUT',
                body: JSON.stringify(updatedSalary),
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            if (response.ok) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: 'Salary details updated successfully!'
                });
                setTimeout(() => navigate('/SalaryDescription'), 2000);
            } else {
                const errorData = await response.json();
                setError(errorData.error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: errorData.error
                });
            }
        } catch (error) {
            console.error("Error:", error);
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'An error occurred while updating the salary details.'
            });
        }
    };

    return (
        
            <div className="update-salary">
                <h2>Edit Salary Details</h2>
                <form onSubmit={handleSubmit}>
                    <label>First Name:</label>
                    <input
                        type="text"
                        value={fname}
                        onChange={(e) => setFname(e.target.value)}
                    />
                    <label>Last Name:</label>
                    <input
                        type="text"
                        value={lname}
                        onChange={(e) => setLname(e.target.value)}
                    />
                    <label>Email:</label>
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <label>Role:</label>
                    <input
                        type="text"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                    />
                    <label>Base Salary:</label>
                    <input
                        type="text"
                        value={base}
                        onChange={(e) => setBase(e.target.value)}
                    />
                    <label>Overtime Rate:</label>
                    <input
                        type="text"
                        value={otRate}
                        onChange={(e) => setOtRate(e.target.value)}
                    />
                    <label>Overtime Hours:</label>
                    <input
                        type="text"
                        value={otHours}
                        onChange={(e) => setOtHours(e.target.value)}
                    />
                    <label>Bonus:</label>
                    <input
                        type="text"
                        value={bonus}
                        onChange={(e) => setBonus(e.target.value)}
                    />
                    <label>Reason:</label>
                    <input
                        type="text"
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                    />
                    <label>Final Salary:</label>
                    <input
                        type="text"
                        value={finalSal}
                        onChange={(e) => setFinalSal(e.target.value)}
                    />
                    <button type="submit">Update</button>
                    {error && <div className="error">{error}</div>}
                    {successMessage && <div className="success-message">{successMessage}</div>}
                </form>
            </div>
        
    );
};

export default UpdateSalary;
