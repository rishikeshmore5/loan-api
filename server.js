const express = require('express');
const app = express();

app.use(express.json());

// Sample loan data (mock database)
const loans = [
  {
    id: 1,
    status: "approved",
    amount: 50000,
    fundedDate: "2025-01-10", 
    loan_id : "1234"
  },
  {
    id: 2,
    status: "pending",
    amount: 75000,
    fundedDate: null, 
    loan_id:"5678"
  },
  {
    id: 3,
    status: "rejected",
    amount: 30000,
    fundedDate: null, 
    loan_id:"9876"
  }
];


// 1) Get All Loans
app.get('/loans', (req, res) => {
  res.json({
    success: true,
    data: loans
  });
});


// 2) Get Loan by ID
app.get('/loans/:id', (req, res) => {
  const loanId = parseInt(req.params.id);

  const loan = loans.find(l => l.id === loanId);

  if (!loan) {
    return res.status(404).json({
      success: false,
      message: "Loan not found"
    });
  }

  res.json({
    success: true,
    data: loan
  });
});


// Start server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
