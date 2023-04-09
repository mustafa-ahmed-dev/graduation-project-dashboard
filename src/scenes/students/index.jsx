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
  const [students, setStudents] = useState([]);

  const theme = useTheme();

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchData = async () => {
      try {
        const { data: studentsData } = await axios.get(
          `http://localhost:4444/students`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const students = studentsData.students.map((student) => {
          const id = student.id;

          return {
            ...student,
            Person: undefined,
            ...student.Person,
            dateOfBirth: moment(student.Person.dateOfBirth).format("L"),
            id,
          };
        });

        setStudents(students);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => console.log(students), [students]);

  const colors = tokens(theme.palette.mode);

  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "fullName",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "username",
      headerName: "Username",
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
      field: "personalEmail",
      headerName: "Personal Email",
      flex: 1,
    },
    {
      field: "collegeEmail",
      headerName: "College Email",
      flex: 1,
    },
  ];

  return (
    <Box m="20px">
      <Header title="Students" subtitle="Managing the Students" />

      <Box display="flex" sx={{ justifyContent: "space-between" }}>
        <Box
          display="flex"
          backgroundColor={colors.primary[400]}
          borderRadius="3px"
          sx={{ width: `${100.0 / 3.0}%` }}
        >
          <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search Student/s" />
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
        <DataGrid rows={students} columns={columns} checkboxSelection />
      </Box>
    </Box>
  );
};

export default Team;
