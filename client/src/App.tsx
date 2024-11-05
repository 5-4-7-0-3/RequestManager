import React, { useState } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import ResultList from "./components/ResultList";
import { useRequestHandler } from "./hooks/useRequestHandler";

const App: React.FC = () => {
  const [concurrency, setConcurrency] = useState<number>(10);
  const { isRunning, results, startRequests } = useRequestHandler(10);

  const handleStart = () => {
    startRequests(concurrency);
  };

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          bgcolor: "background.paper",
          padding: 4,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Async Request Manager
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <TextField
            label="Concurrency Limit"
            type="number"
            value={concurrency}
            onChange={(e) =>
              setConcurrency(Math.min(Math.max(1, Number(e.target.value)), 100))
            }
            disabled={isRunning}
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <Button
            onClick={handleStart}
            disabled={isRunning}
            variant="contained"
            color="primary"
            fullWidth
            sx={{
              mt: 2,
              bgcolor: isRunning ? "grey.400" : "primary.main",
              "&:hover": {
                bgcolor: isRunning ? "grey.400" : "primary.dark",
              },
            }}
          >
            Start
          </Button>
        </Box>
        {results.length > 0 && <ResultList results={results} />}
      </Box>
    </Container>
  );
};

export default App;
