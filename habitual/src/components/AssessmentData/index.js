import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
export default function CommunityPost(props) {
    return (    
    <Table className="assessment-list">
            <TableBody>
            <TableRow>
            <TableCell component="th" scope="row" align="left">
            {props.date}
            </TableCell>
            <TableCell component="th" scope="row" align = "right">
                {props.status}
            </TableCell>
            </TableRow>
            </TableBody>
            </Table>
    );
}