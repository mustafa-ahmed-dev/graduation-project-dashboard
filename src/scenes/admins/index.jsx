import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";

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

  useEffect(() => console.log(admins), [admins]);

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
    // {
    //   fields: "actions",
    //   headerName: "Actions",
    //   flex: 2,
    // },
  ];

  return (
    <Box m="20px">
      <Header title="Admins" subtitle="Managing the admins" />
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
        <DataGrid rows={admins} columns={columns} />
      </Box>
    </Box>
  );
};

export default Team;
