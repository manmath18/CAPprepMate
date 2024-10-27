import React, { useState } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import './CollegePrediction.css'; // Import the custom CSS file
import Navbar from './shared/Navbar';

const CollegePrediction = () => {
    const [percentile, setPercentile] = useState('');
    const [rank, setRank] = useState('');
    const [state, setState] = useState('');
    const [pwd, setPwd] = useState('NO');
    const [gender, setGender] = useState('M');
    const [category, setCategory] = useState('GOPENS');
    const [sortby, setSortby] = useState('Rank');
    const [results, setResults] = useState([]);
    const [error, setError] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {
            percentile,
            rank,
            state,
            pwd,
            gender,
            category,
            sortby,
        };

        try {
            const response = await fetch('http://127.0.0.1:5000/predict-college', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Failed to fetch data');
            }

            setResults(result);
            setError(null);
        } catch (error) {
            setError(error.message);
            setResults([]);
        }
    };

    // Function to generate the PDF
    const generatePDF = () => {
        const doc = new jsPDF();
        
        // Title and Info
        doc.setFontSize(16);
        doc.text("College Prediction Results", 14, 20);
        doc.setFontSize(12);
        doc.text(`Percentile: ${percentile}`, 14, 30);
        doc.text(`Rank: ${rank}`, 14, 40);
        doc.text(`Gender: ${gender === 'M' ? 'Male' : 'Female'}`, 14, 50);
        doc.text(`Category: ${category}`, 14, 60);
        doc.text(`PWD: ${pwd}`, 14, 70);
        doc.text(`State: ${state}`, 14, 80);

        // Auto-table for College List
        const tableColumns = ["College", "Branch", "Category", "Rank", "Percentile", "Status"];
        const tableRows = [];

        results.forEach(result => {
            const rowData = [
                result.College,
                result.Branch,
                result.Category,
                result.Rank,
                result.Percentile,
                result.Status
            ];
            tableRows.push(rowData);
        });

        doc.autoTable({
            startY: 90, // Start after the info
            head: [tableColumns],
            body: tableRows,
        });

        // Save the PDF
        doc.save('college_prediction_results.pdf');
    };

    return (
        <>
        <Navbar/>
        <div className="container">
            <form className="prediction-form" onSubmit={handleSubmit}>
                <h1 className="form-title">MHTCET College Predictor</h1>
                
                <div className="form-group">
                    <label htmlFor="percentile">Percentile:</label>
                    <input 
                        type="text" 
                        id="percentile"
                        value={percentile} 
                        onChange={(e) => setPercentile(e.target.value)} 
                        placeholder="Enter your percentile"
                        className="form-control"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="rank">Rank:</label>
                    <input 
                        type="text" 
                        id="rank"
                        value={rank} 
                        onChange={(e) => setRank(e.target.value)} 
                        placeholder="Enter your rank"
                        className="form-control"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="gender">Gender:</label>
                    <select 
                        id="gender" 
                        value={gender} 
                        onChange={(e) => setGender(e.target.value)}
                        className="form-control"
                    >
                        <option value="M">Male</option>
                        <option value="F">Female</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="category">Category:</label>
                    <select 
                        id="category" 
                        value={category} 
                        onChange={(e) => setCategory(e.target.value)}
                        className="form-control"
                    >
                        <option value="GOPENS">General</option>
                        <option value="GSCS">SC</option>
                        <option value="GSTS">ST</option>
                        <option value="GOBCS">OBC</option>
                        <option value="EWS">EWS</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="pwd">PWD:</label>
                    <select 
                        id="pwd" 
                        value={pwd} 
                        onChange={(e) => setPwd(e.target.value)}
                        className="form-control"
                    >
                        <option value="NO">No</option>
                        <option value="YES">Yes</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="state">State:</label>
                    <input 
                        type="text" 
                        id="state"
                        value={state} 
                        onChange={(e) => setState(e.target.value)} 
                        placeholder="Enter your state"
                        className="form-control"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="sortby">Sort By:</label>
                    <select 
                        id="sortby" 
                        value={sortby} 
                        onChange={(e) => setSortby(e.target.value)}
                        className="form-control"
                    >
                        <option value="Rank">Rank</option>
                        <option value="Percentile">Percentile</option>
                    </select>
                </div>

                <button type="submit" className="submit-btn">Predict</button>
            </form>

            {error && <p className="error-message">{error}</p>}

            {results.length > 0 && (
                <div className="results-container">
                    <h2>College Prediction Results</h2>

                    {/* Button to download the PDF moved to the top-right */}
                    <div className="top-right-btn">
                        <button className="download-btn" onClick={generatePDF}>Download PDF</button>
                    </div>

                    <table className="results-table">
                        <thead>
                            <tr>
                                <th>College</th>
                                <th>Branch</th>
                                <th>Category</th>
                                <th>Rank</th>
                                <th>Percentile</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {results.map((college, index) => (
                                <tr key={index}>
                                    <td>{college.College}</td>
                                    <td>{college.Branch}</td>
                                    <td>{college.Category}</td>
                                    <td>{college.Rank}</td>
                                    <td>{college.Percentile}</td>
                                    <td>{college.Status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
        </>
    );
};

export default CollegePrediction;
