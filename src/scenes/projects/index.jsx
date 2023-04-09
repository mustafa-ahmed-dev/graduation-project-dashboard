import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import { InputBase, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";

const Team = () => {
  const [projects, setProjects] = useState([]);

  const theme = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: projectData } = await axios.get(
          `http://localhost:4444/projects`
        );

        const projects = projectData.projects.map((project) => {
          return {
            name: project.name,
            id: project.id,
            year: project.year,
            college: project.Department.College.name,
            department: project.Department.name,
            supervisor: project.Supervisor.Person.fullName,
          };
        });

        setProjects(projects);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => console.log(projects), [projects]);

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
      field: "year",
      headerName: "Year",
      flex: 1,
    },
    {
      field: "supervisor",
      headerName: "supervisor",
      flex: 1,
    },
    {
      field: "department",
      headerName: "Department",
      flex: 1,
    },
    {
      field: "college",
      headerName: "College",
      flex: 1,
    },
  ];

  return (
    <Box m="20px">
      <Header title="Projects" subtitle="Managing the Projects" />

      <Box display="flex" sx={{ justifyContent: "space-between" }}>
        <Box
          display="flex"
          backgroundColor={colors.primary[400]}
          borderRadius="3px"
          sx={{ width: `${100.0 / 3.0}%` }}
        >
          <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search Project/s" />
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
        <DataGrid rows={projects} columns={columns} checkboxSelection />
      </Box>
    </Box>
  );
};

export default Team;
