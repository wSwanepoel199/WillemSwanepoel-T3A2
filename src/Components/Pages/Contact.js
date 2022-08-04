import { Link } from "react-router-dom";
import { Container, Card, CardContent, CardMedia, Button, Typography } from "@mui/material";

const Contact = (props) => {
  const { form } = props;

  return (
    <>
      <Card>
        <CardContent>
          <Typography>
            Send by: {form.email}
          </Typography>
          <Typography>
            Number: {form.phonenumber}
          </Typography>
          <Typography varient="p" component="div">
            Reason: {form.reason}
          </Typography>
          <Container>
            <Typography>
              Body: {form.text}
            </Typography>
          </Container>
          <Link to={`/contacts/${form.id}`}>
            <Button variant="outlined">View Form</Button>
          </Link>
        </CardContent>
      </Card>
    </>
  );
};

export default Contact;