import AppRoutes from "./routes";
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from "@emotion/react";
import LoadingProvider from "./providers/LoadingProvider";
import CustomerProvider from "./providers/CustomerProvider";

const theme = createTheme();
function App() {
  return (
    <ThemeProvider theme={theme}>
      <LoadingProvider>
        <CustomerProvider>
          <main>
            <AppRoutes />
          </main>
        </CustomerProvider>
      </LoadingProvider>
    </ThemeProvider>
  )
}

export default App;