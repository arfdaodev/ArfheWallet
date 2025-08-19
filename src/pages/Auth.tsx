import React from "react";
import { Typography, Box, Button, Grid, Modal, Alert } from "@mui/material";
import Account from "../backend/Account.js";
import { AppContext, WalletContext } from "../AppContext.js";
import * as ethers from "ethers";
import { useNavigate } from "react-router";
import AccountManager from "../backend/AccountManager.js";
import "./Auth.css";

function CreateWallet() {
  const context = React.useContext<AppContext | undefined>(WalletContext);
  const navigate = useNavigate();

  const accountManager = context?.accountManager;
  
  const [modalOpen, setModalOpen] = React.useState(false);
  const [words, setWords] = React.useState<string[]>([]);

  const handleCreateAccount = () => {
    if (!accountManager) return;

    // Create new account and get its index
    const index = accountManager.CreateAccount();

    if (index < 0 || !accountManager.accounts[index]) return;

    // Get mnemonic words safely
    const mnemonicWords = accountManager.accounts[index]?.GetWords();

    setWords(mnemonicWords ?? []);

    setModalOpen(true);
  };

  return (
    <>
      <div className="create-wallet">
        <Box mb={2}>
          {accountManager ? (
            <Alert severity="success">AccountManager is online</Alert>
          ) : (
            <Alert severity="error">AccountManager is offline</Alert>
          )}
        </Box>

        <Typography mb={2}>
          You do not have an ArfheWallet created yet. Let's create one.
        </Typography>

        <Button fullWidth variant="contained" onClick={handleCreateAccount}>
          I am Ready
        </Button>

        <Modal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          className="create-wallet-modal"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: { xs: "90%", sm: "60%" },
              minHeight: "50%",
              bgcolor: "background.paper",
              border: "2px solid #000",
              boxShadow: 24,
              p: 4,
            }}
          >
            <Grid container spacing={2}>
              {words.map((word, index) => (
                <Grid size={{ xs: 6, sm: 6, md: 4, lg: 3 }} key={index}>
                  <NumberedWord index={index} word={word} />
                </Grid>
              ))}
            </Grid>

            <Box mt={3}>
              <Button
                variant="outlined"
                fullWidth
                onClick={() => {
                  setModalOpen(false);
                  navigate("/home");
                }}
              >
                I GOT IT DOWN
              </Button>
            </Box>
          </Box>
        </Modal>
      </div>
    </>
  );
}

function LoginIntoWallet() {
  return (
    <Typography>
      Login or DIE!
    </Typography>
  );
}

export default function Auth() {
  const [accountExists, setAccountExist] = React.useState(false);
  
  // TODO: get the private key from localStorage
  // and set accountExists accordingly
  // TODO: also handle multiple accounts scenarios

  return (
    <div className="auth">
      {
        accountExists ? 
        <LoginIntoWallet />
        :
        <CreateWallet />
      }
    </div>
  );
}

function NumberedWord({ index, word }: { index: number; word: string }) {
  return (
    <Box
      display="flex"
      alignItems="center"
      sx={{
        border: ".1rem solid gray",
        borderRadius: "4px",
        overflow: "hidden",
        width: "100%",
        height: "100%",
      }}
    >
      {/* Number box */}
      <Box
        sx={{
          padding: "2px 4px",
          borderRight: "1px solid gray",
          textAlign: "center",
          minWidth: "20px",
          flexShrink: 0,
        }}
      >
        <Typography fontSize={13}>{index + 1}</Typography>
      </Box>

      {/* Word box */}
      <Box
        sx={{
          padding: "4px 12px",
          flex: 1,
        }}
      >
        <Typography fontSize={13} textAlign="center">
          {word}
        </Typography>
      </Box>
    </Box>
  );
}