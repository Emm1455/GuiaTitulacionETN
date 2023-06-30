import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";

function SuggestionsDialog({
  open,
  handleClose,
  handleSubmit,
  suggestion,
  setSuggestion,
}) {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Sugerencias</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Déjanos saber cómo podemos mejorar la página, qué te gustaría que
          agreguemos, qué está demás, tu opinión nos ayuda a mejorar.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="suggestion"
          label="Tu opinión"
          type="text"
          fullWidth
          multiline
          variant="standard"
          value={suggestion}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSubmit(suggestion);
          }}
          onChange={(e) => {
            setSuggestion(e.target.value);
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancelar</Button>
        <Button onClick={() => handleSubmit(suggestion)}>Enviar</Button>
      </DialogActions>
    </Dialog>
  );
}

export default SuggestionsDialog;
