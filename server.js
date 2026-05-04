const express = require('express');
const app = express();

app.use(express.json());

const loans = [
  { id: 1, status: "approved", amount: 50000, fundedDate: "2025-01-10", loan_id: "1234" },
  { id: 2, status: "pending", amount: 75000, fundedDate: null, loan_id: "5678" },
  { id: 3, status: "rejected", amount: 30000, fundedDate: null, loan_id: "9876" }
];

// 1) Get All Loans
app.get('/loans', (req, res) => {
  res.json({ success: true, data: loans });
});

/**
 * 2) Get Loan by flexible ID (id or loan_id)
 * We use a single route to handle both types of identification.
 */
app.get('/loans/:identifier', (req, res) => {
  const { identifier } = req.params;

  // Search logic: 
  // 1. Convert identifier to string to match against loan_id
  // 2. Convert identifier to number to match against the primary id
  const loan = loans.find(l => 
    l.id === parseInt(identifier) || l.loan_id === identifier
  );

  if (!loan) {
    return res.status(404).json({
      success: false,
      message: `No loan found with ID or Loan_ID: ${identifier}`
    });
  }

  res.json({
    success: true,
    data: loan
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
