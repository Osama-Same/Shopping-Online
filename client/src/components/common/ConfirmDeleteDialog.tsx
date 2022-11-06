import { MainStateType } from "../mainState";
import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import CircularProgress from "@mui/material/CircularProgress";
interface ConfirmDeleteDialogProps {
  open: boolean;
  setopen: (b: boolean) => void;
  text: string;
  onConfirm: () => void;
  mainState: MainStateType;
  setMainState: (m: MainStateType) => void;
}
function ConfirmDeleteDialog({
  open,
  setopen,
  text,
  onConfirm,
  mainState,
  setMainState,
}: ConfirmDeleteDialogProps) {
  const [loading, setLoading] = useState(false);
  return (
    <Dialog open={open}>
      <DialogContent>{text}</DialogContent>
      <DialogActions>
        <Button onClick={() => setopen(false)}>NO</Button>
        <Button
          color="error"
          type="reset"
          onClick={() => {
            setLoading(true);
            onConfirm();
            setMainState({ ...mainState });
            setLoading(false);
            setopen(false);
          }}
          autoFocus
        >
          {loading ? <CircularProgress /> : "YES"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmDeleteDialog;
