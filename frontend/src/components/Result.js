import React, { useState } from "react"; 
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import PercentIcon from "@mui/icons-material/Percent";
import CoronavirusIcon from "@mui/icons-material/Coronavirus";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LanguageIcon from "@mui/icons-material/Language";
import InfoIcon from "@mui/icons-material/Info";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import { jsPDF } from "jspdf";

const Result = ({
  image,
  skinType,
  symptoms,
  howCommon,
  treatments,
  duration,
  isDetails,
}) => {

  const [inputText, setInputText] = useState("");
  const [rating, setRating] = useState(""); 
  const [error, setError] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!inputText.trim() || !rating.trim()) {
      setError(true); // Set error state to true to show an alert if either field is empty
      return; // Prevent form submission
    }
    setError(false); // Reset error state on successful submission
    setInputText("");
    setRating("");
  };

  const downloadReport = async () => {
    const doc = new jsPDF();
    let y = 20; // Start Y coordinate for text

    doc.text("Analysis Report", 20, y);
    y += 10; // Increment Y coordinate for each new line

    doc.text(`Skin Type: ${skinType}`, 20, y);
    y += 10;

    if (symptoms && symptoms.length) {
      const symptomsText = `Symptoms: ${symptoms.join(", ")}`;
      const splitSymptoms = doc.splitTextToSize(symptomsText, 180); // Ensure text fits within page width
      doc.text(splitSymptoms, 20, y);
      y += (splitSymptoms.length * 10); // Adjust Y based on number of lines
    }

    if (treatments && treatments.length) {
      const treatmentsText = `Treatments: ${treatments.join(", ")}`;
      const splitTreatments = doc.splitTextToSize(treatmentsText, 180);
      doc.text(splitTreatments, 20, y);
      y += (splitTreatments.length * 10);
    }

    if (howCommon) {
      doc.text(`How Common: ${howCommon}`, 20, y);
      y += 10;
    }

    if (duration) {
      doc.text(`Duration: ${duration}`, 20, y);
      y += 10;
    }

    // Include the image
    if (image) {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        const imgData = canvas.toDataURL("image/jpeg", 1.0);
        doc.addImage(imgData, "JPEG", 20, y, 50, 50); // Add image to PDF
        doc.save("Analysis_Report.pdf");
      };
      img.onerror = () => {
        console.error("Error loading image");
      };
      img.src = image;
    } else {
      // Save PDF if no image is loaded
      doc.save("Analysis_Report.pdf");
    }
  };

  return (
    <Container>
      <Card sx={{ p: 2, boxShadow: 3, borderRadius: 1, marginTop: 0 }}>
        <Stack
          direction={{ sm: "column", lg: "row" }}
          divider={<Divider orientation="vertical" flexItem />}
        >
          {(skinType === "Healthy skin" || isDetails) && (
            <Grid
              item
              xs={skinType === "Healthy skin" && 6}
              lg={isDetails && 8}
              marginX="auto"
              align="center"
              alignItems="start"
              justifyContent="center"
            >
              <Typography
                variant="h5"
                component="div"
                sx={{
                  paddingX: 2,
                  paddingTop: 2,
                  fontWeight: 500,
                }}
              >
                Uploaded image
              </Typography>

              <CardMedia
                component="img"
                alt="Uploaded image"
                image={image}
                sx={{ padding: 2, width: "400px", objectFit: "contain" }}
              />
            </Grid>
          )}

          <Grid
            item
            lg={isDetails}
            xs={!isDetails && (skinType === "Healthy skin" ? 6 : 12)}
          >
            <Typography
              variant="h5"
              component="div"
              sx={{
                paddingX: 2,
                paddingTop: 2,
                fontWeight: 500,
                textAlign: "center",
              }}
            >
              Analysis
            </Typography>

            <CardContent>
              <List
                sx={{
                  width: "100%",
                  bgcolor: "background.paper",
                }}
              >
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <CoronavirusIcon color="error" />
                    </Avatar>
                  </ListItemAvatar>

                  <ListItemText
                    disableTypography
                    primary={
                      <Typography
                        style={{
                          fontSize: 17,
                          fontWeight: "bold",
                          fontFamily: "Helvetica",
                        }}
                      >
                        Skin type
                      </Typography>
                    }
                    secondary={
                      <Typography
                        style={{
                          fontSize: 15,
                          fontWeight: "bold",
                          fontFamily: "Helvetica",
                        }}
                      >
                        {skinType}
                      </Typography>
                    }
                  />
                </ListItem>

                <Divider variant="inset" component="li" />

                <Divider variant="inset" component="li" />

                {symptoms && symptoms.length > 0 && (
                  <div>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar>
                          <InfoIcon color="warning" />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        disableTypography
                        primary={
                          <Typography
                            style={{
                              fontSize: 17,
                              fontWeight: "bold",
                              fontFamily: "Helvetica",
                            }}
                          >
                            Symptoms
                          </Typography>
                        }
                        secondary={
                          <Typography
                            style={{
                              fontSize: 15,
                              fontWeight: "bold",
                              fontFamily: "Helvetica",
                            }}
                          >
                            {symptoms.map((symptom) => symptom + ", ")}
                          </Typography>
                        }
                      />
                    </ListItem>

                    <Divider variant="inset" component="li" />
                  </div>
                )}

                {treatments && treatments.length > 0 && (
                  <div>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar>
                          <LocalHospitalIcon color="primary" />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        disableTypography
                        primary={
                          <Typography
                            style={{
                              fontSize: 17,
                              fontWeight: "bold",
                              fontFamily: "Helvetica",
                            }}
                          >
                            Treatments
                          </Typography>
                        }
                        secondary={
                          <Typography
                            style={{
                              fontSize: 15,
                              fontWeight: "bold",
                              fontFamily: "Helvetica",
                            }}
                          >
                            {treatments.map((treatment) => treatment + ", ")}
                          </Typography>
                        }
                      />
                    </ListItem>

                    <Divider variant="inset" component="li" />
                  </div>
                )}

                {howCommon && (
                  <div>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar>
                          <LanguageIcon color="primary" />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        disableTypography
                        primary={
                          <Typography
                            style={{
                              fontSize: 17,
                              fontWeight: "bold",
                              fontFamily: "Helvetica",
                            }}
                          >
                            How common
                          </Typography>
                        }
                        secondary={
                          <Typography
                            style={{
                              fontSize: 15,
                              fontWeight: "bold",
                              fontFamily: "Helvetica",
                            }}
                          >
                            {howCommon}
                          </Typography>
                        }
                      />
                    </ListItem>

                    <Divider variant="inset" component="li" />
                  </div>
                )}

                {duration && (
                  <div>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar>
                          <AccessTimeIcon color="info" />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        disableTypography
                        primary={
                          <Typography
                            style={{
                              fontSize: 17,
                              fontWeight: "bold",
                              fontFamily: "Helvetica",
                            }}
                          >
                            Duration
                          </Typography>
                        }
                        secondary={
                          <Typography
                            style={{
                              fontSize: 15,
                              fontWeight: "bold",
                              fontFamily: "Helvetica",
                            }}
                          >
                            {duration}
                          </Typography>
                        }
                      />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                  </div>
                )}
              </List>
            </CardContent>
          </Grid>

          <Stack spacing={2} sx={{ maxWidth: 200, marginLeft: 'auto', marginRight: 0 }}>
            <form onSubmit={handleSubmit} noValidate>
              <TextField
                label="Feedback or Suggestion"
                variant="outlined"
                fullWidth
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                sx={{ mb: 2 }}
              />
              <TextField
                label="Rate our service (0-10)"
                type="number"
                variant="outlined"
                fullWidth
                value={rating}
                onChange={(e) => setRating(e.target.value.replace(/\D/g, ''))}
                inputProps={{ min: "0", max: "10", step: "1" }}
                sx={{ mb: 2 }}
              />
              {error && <Alert severity="error">Both fields must be filled out!</Alert>}
              <Button type="submit" variant="contained" color="primary" disabled={!inputText.trim() || !rating.trim()}>
                Submit
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={downloadReport}
                size="small"
                sx={{ height: '30px', width: '100%', padding: '4px 8px', fontSize: '0.75rem', marginTop: 2 }}
              >
                Download PDF
              </Button>
            </form>
          </Stack>

        </Stack>
      </Card>
    </Container>
  );
};

export default Result;
