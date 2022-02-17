import { Button, TableCell, TableRow } from "@material-ui/core";

export default function Userss(props) {
    const submitHandler = (e) => {
        props.removeUser(props.unique)
      };
    return (
        <TableRow>
          <TableCell component="th" scope="row" align="left">
            {props.habit} 
          </TableCell>
          <TableCell component="th" scope="row" align="right">
            <Button onClick={submitHandler} className="mainButton">Remove</Button>
          </TableCell>
        </TableRow>
      );
}
