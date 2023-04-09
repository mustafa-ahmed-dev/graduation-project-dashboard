import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { InputBase, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";

const Team = () => {
  const [admins, setAdmins] = useState([]);

  const theme = useTheme();

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchData = async () => {
      try {
        const { data: adminData } = await axios.get(
          `http://localhost:4444/users`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const users = adminData.users.map((user) => {
          const id = user.id;

          const _user = {
            ...user,
            ...user.Person,
            name: user.Person.fullName,
            id,
            age:
              new Date().getFullYear() -
              new Date(user.Person.dateOfBirth).getFullYear(),
            dateOfBirth: moment(user.Person.dateOfBirth).format("L"),
            dateCreated: moment(user.dateCreated).format("LLLL"),
            dateUpdated: moment(user.dateUpdated).format("LLLL"),
          };

          delete _user.fullName;
          delete _user.Person;
          delete _user.password;
          delete _user.token;

          return _user;
        });

        setAdmins(users);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const colors = tokens(theme.palette.mode);

  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "username",
      headerName: "username",
      flex: 1,
    },
    {
      field: "gender",
      headerName: "Gender",
      flex: 1,
    },
    {
      field: "dateOfBirth",
      headerName: "Date Of Birth",
      flex: 1,
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "collegeEmail",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "isActive",
      headerName: "Active?",
      type: "boolean",
      flex: 1,
    },
    {
      field: "dateCreated",
      headerName: "Date Created",
      flex: 1,
    },
    {
      field: "dateUpdated",
      headerName: "Date Updated",
      flex: 1,
    },
  ];

  return (
    <Box m="20px">
      <Header title="Admins" subtitle="Managing the admins" />

      <Box display="flex" sx={{ justifyContent: "space-between" }}>
        <Box
          display="flex"
          backgroundColor={colors.primary[400]}
          borderRadius="3px"
          sx={{ width: `${100.0 / 3.0}%` }}
        >
          <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search Admin/s" />
          <IconButton type="button" sx={{ p: 1 }}>
            <SearchIcon />
          </IconButton>
        </Box>

        <ButtonGroup
          variant="contained"
          aria-label="outlined primary button group"
        >
          <Button
            variant="contained"
            size="large"
            sx={{
              backgroundColor: tokens(theme.palette.mode).redAccent[500],
              ":hover": {
                backgroundColor:
                  theme.palette.mode === "dark"
                    ? tokens(theme.palette.mode).primary[400]
                    : tokens(theme.palette.mode).primary[600],
              },
            }}
          >
            Delete
          </Button>
          <Button
            variant="contained"
            size="large"
            sx={{
              backgroundColor: tokens(theme.palette.mode).blueAccent[500],
              ":hover": {
                backgroundColor:
                  theme.palette.mode === "dark"
                    ? tokens(theme.palette.mode).primary[600]
                    : tokens(theme.palette.mode).primary[600],
              },
            }}
          >
            Add
          </Button>
        </ButtonGroup>
      </Box>

      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid rows={admins} columns={columns} checkboxSelection />
      </Box>
    </Box>
  );
};

export default Team;
