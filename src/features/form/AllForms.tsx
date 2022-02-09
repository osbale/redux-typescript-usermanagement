import { Form, selectForm, update } from "./formSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  Box,
  Button,
  Grid,
  IconButton,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridRowId,
} from "@mui/x-data-grid";
import { useState } from "react";
import { remove } from "./formSlice";
import EditIcon from "@mui/icons-material/Edit";
import { Gap } from "./Form";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  pt: 2,
  px: 4,
  pb: 3,
};

export const AllForms = () => {
  const forms = useAppSelector(selectForm);
  const dispatch = useAppDispatch();

  const [selected, setSelected] = useState<GridRowId[]>([]);
  const [edit, setEdit] = useState<boolean>(false);
  const [modalInfo, setModalInfo] = useState<Form>();

  const onDelete = () => {
    dispatch(remove(selected.map((gid) => gid.toString())));
  };

  const onClick = (info: Form) => {
    setEdit(true);
    setModalInfo(info);
    console.log(info);
  };

  const onClose = () => {
    setEdit(false);
  };

  const onUpdate = () => {
    dispatch(update(modalInfo!));
    setEdit(false);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setModalInfo({ ...modalInfo!, [e.target.name]: e.target.value });
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 300 },
    { field: "name", headerName: "Name", width: 130 },
    { field: "lastname", headerName: "Lastname", width: 130 },
    {
      field: "address",
      headerName: "Address",
      width: 90,
    },
    {
      field: "email",
      headerName: "Email",
      width: 160,
    },
    {
      field: "edit",
      headerName: "Edit",
      renderCell: (params: GridRenderCellParams) => (
        <IconButton onClick={() => onClick(params.row)}>
          <EditIcon />
        </IconButton>
      ),
    },
  ];

  return (
    <Box>
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        direction={"column"}
      >
        <Box height={400} width={1000}>
          <DataGrid
            rows={forms.value}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
            onStateChange={(state) => setSelected(state.selection)}
            disableSelectionOnClick={true}
          />
        </Box>
        <Box textAlign="left" width={1000} mt={1} mb={5}>
          <Button
            color="error"
            variant="contained"
            disabled={selected.length ? false : true}
            onClick={onDelete}
          >
            Delete {selected.length > 0 && selected.length}
          </Button>
        </Box>
      </Grid>
      <Modal
        open={edit}
        onClose={onClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <Typography>{modalInfo?.id}</Typography>
          <br />
          {modalInfo
            ? Object.keys(modalInfo)
                .filter((key) => key !== "id")
                .map((input) => (
                  <Box>
                    <TextField
                      value={modalInfo![input as keyof Form]}
                      id="outlined-basic"
                      label={input.charAt(0).toUpperCase() + input.slice(1)}
                      name={input}
                      variant="outlined"
                      onChange={onChange}
                    />
                    <br />
                    <Gap />
                  </Box>
                ))
            : null}
          <Button variant="contained" onClick={onUpdate}>
            Submit
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};
