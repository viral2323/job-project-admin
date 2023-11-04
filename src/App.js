import React, { useState } from "react";
import { styled, Box, Input, Button, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from 'axios';

const initJobData = {
  jobTitle: "",
  jobName: "",
  field: "",
  experience: "",
  jobDescription: [{ id: "1", value: "" }],
  rolesResponsibilities: [{ id: "1", value: "" }],
  desiredCandidate: [{ id: "1", value: "" }],
  perksBenefits: [{ id: "1", value: "" }],
};

function App() {
  const [form, setForm] = useState(initJobData);
  const [submitCount, setSubmitCount] = useState("");
  const [viewers, setViewers] = useState("");
  const [isAnalyticsPage, setIsAnalyticsPage] = useState(false);

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    if (name) {
      if (index !== undefined) {
        const rolesResponsibilities = form[name];
        rolesResponsibilities[index] = { id: form[name][index].id, value }
        setForm({ ...form, [name]: rolesResponsibilities })
      } else {
        setForm({ ...form, [name]: value });
      }
    }
  };

  const handleAdd = (name, index) => {
    setForm({ ...form, [name]: [...form[name], { id: index + 1, value: "" }] })
  }

  const handleDelete = (e, name, index) => {
    e.preventDefault();
    const initForm = form[name];
    initForm.splice(index, 1);
    setForm({ ...form, [name]: initForm })
  }

  const getRawData = (data) => {
    if (data && data.length > 0) {
      if (data.length === 1) {
        return data[0]?.value
      } else {
        return data.map((item) => item.value)
      }
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = form;
    const createdData = {
      jobData: {
        jobName: data.jobName,
        jobTitle: data.jobTitle,
        experience: data.experience,
        field: data.field
      },
      data: [
        {
          title: "Job description",
          description: getRawData(data.jobDescription)
        },
        {
          title: "Roles and Responsibilities",
          description: getRawData(data.rolesResponsibilities)
        },
        {
          title: "Desired Candidate Profile",
          description: getRawData(data.desiredCandidate)
        },
        {
          title: "Perks and Benefits",
          description: getRawData(data.perksBenefits)
        }
      ]
    }

    axios
      .post(`${process.env.REACT_APP_BASE_URL}/job/create-job`, {
        ...createdData
      })
      .then((response) => {
        if (response.data.success) {
          console.log("job created")
          alert("Job created successfully.")
        }
      }).catch((error) => {
        console.log("getting err", error);
      });
  }

  const handleReset = () => setForm(initJobData);

  const getAnalytics = () => {
    if(isAnalyticsPage){
      setIsAnalyticsPage(false);
    }else{
      axios.get(`${process.env.REACT_APP_BASE_URL}/view/get-all-views/6539f6f7bcb1294ec15daee0`)
      .then((res) => {
        if (res?.data?.success) {
          const { submitCount, viewers } = res.data.data;
          setSubmitCount(submitCount);
          setViewers(viewers);
        }
      });
      setIsAnalyticsPage(true);
    }
  }

  return (
    <React.Fragment>
      <Button onClick={getAnalytics} style={{ color: "white", background: "green", margin: "12px 0"}}>{!isAnalyticsPage ? "View Analytics" : "Go Home"}</Button>
      {!isAnalyticsPage ? <AppWrapper>
        <Box>
          Job Title: <br />
          <Input
            name="jobTitle"
            type="text"
            placeholder="Work from Home - Front End Developer"
            value={form.jobTitle}
            onChange={handleChange}
          />
          <br />
          <br />
          Job Name: <br />{" "}
          <Input
            name="jobName"
            type="text"
            placeholder="React Js Develoepr"
            value={form.jobName}
            onChange={handleChange}
          />
          <br />
          <br />
          Field: <br />
          <Input
            name="field"
            type="text"
            placeholder="Information Technology"
            value={form.field}
            onChange={handleChange}
          />
          <br />
          <br />
          Experience: <br />
          <Input
            name="experience"
            type="text"
            placeholder="0.5 - 2 years"
            value={form.experience}
            onChange={handleChange}
          />
          <br />
          <br />
          <Box className="content-wrapper bottom-space">
            <div>Job description:</div>
            <AddIcon className="pointer" onClick={() => handleAdd('jobDescription', form.jobDescription.length)} />
          </Box>
          {form.jobDescription.length > 0 && form.jobDescription.map((item, index) => (
            <React.Fragment key={`jobDescription-${index + 1}`}>
              <TextField
                variant="standard"
                multiline
                name="jobDescription"
                type="text"
                value={item.value}
                onChange={(e) => handleChange(e, index)}
                InputProps={form.jobDescription.length > 1 ? {
                  endAdornment: <DeleteIcon onClick={(e) => handleDelete(e, "jobDescription", index)} className="pointer" />
                } : {}}
              />
              <br />
              <br />
            </React.Fragment>
          ))}
          <Box className="content-wrapper bottom-space">
            <div>Roles and Responsibilities:</div>
            <AddIcon className="pointer" onClick={() => handleAdd('rolesResponsibilities', form.rolesResponsibilities.length)} />
          </Box>
          {form.rolesResponsibilities.length > 0 && form.rolesResponsibilities.map((item, index) => (
            <React.Fragment key={`rolesResponsibilities-${index + 1}`}>
              <TextField
                variant="standard"
                multiline
                name="rolesResponsibilities"
                type="text"
                value={item.value}
                onChange={(e) => handleChange(e, index)}
                InputProps={form.rolesResponsibilities.length > 1 ? {
                  endAdornment: <DeleteIcon onClick={(e) => handleDelete(e, "rolesResponsibilities", index)} className="pointer" />
                } : {}}
              />
              <br />
              <br />
            </React.Fragment>
          ))}
          <Box className="content-wrapper bottom-space">
            <div>Desired Candidate Profile: </div>
            <AddIcon className="pointer" onClick={() => handleAdd('desiredCandidate', form.desiredCandidate.length)} />
          </Box>
          {form.desiredCandidate.map((item, index) => (
            <React.Fragment key={`desiredCandidate-${index + 1}`}>
              <TextField
                variant="standard"
                multiline
                name="desiredCandidate"
                type="text"
                value={item.value}
                onChange={(e) => handleChange(e, index)}
                InputProps={form.desiredCandidate.length > 1 ? {
                  endAdornment: <DeleteIcon onClick={(e) => handleDelete(e, "desiredCandidate", index)} className="pointer" />
                } : {}}
              />
              <br />
              <br />
            </React.Fragment>
          ))}
          <Box className="content-wrapper bottom-space">
            <div>Perks and Benefits: </div>
            <AddIcon className="pointer" onClick={() => handleAdd('perksBenefits', form.perksBenefits.length)} />
          </Box>
          {form.perksBenefits.map((item, index) => (
            <React.Fragment key={`perksBenefits-${index + 1 + item.id}`}>
              <TextField
                variant="standard"
                multiline
                name="perksBenefits"
                type="text"
                value={item.value}
                onChange={(e) => handleChange(e, index)}
                InputProps={form.perksBenefits.length > 1 ? {
                  endAdornment: <DeleteIcon onClick={(e) => handleDelete(e, "perksBenefits", index)} className="pointer" />
                } : {}}
              />
              <br />
              <br />
            </React.Fragment>
          ))}
          <Button variant="outlined" onClick={handleReset} style={{ marginRight: "20px" }}>Reset</Button>
          <Button variant="outlined" onClick={handleSubmit}>Submit</Button>
        </Box>
      </AppWrapper>
      :
      <AnalyticsContainer>
        <Box>Page Viewers: {viewers}</Box>
        <Box>Submit Count: {submitCount}</Box>
      </AnalyticsContainer>
      }
    </React.Fragment>

  );
}


const AnalyticsContainer = styled(Box)({
  marginTop: "20px",
  "&>div": {
    fontSize: "24px",
    fontFamily: "monospace",
    marginBottom: "12px"
  }
})
const AppWrapper = styled(Box)({
  margin: "15px 0 20px",
  display: "flex",
  justifyContent: "center",
  "&>div": {
    maxWidth: "800px",
    width: "100%",
    fontSize: "18px",
    fontFamily: "sans-serif"
  },
  "& input": {
    width: "100%",
    marginTop: "8px",
  },
  "& .MuiInputBase-root, .MuiTextField-root": {
    width: "100%",
  },
  "& .content-wrapper": {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  "& .pointer": {
    cursor: "pointer"
  },
  "& .bottom-space": {
    marginBottom: "12px"
  },
});

export default App;
