import { Label, Table, TableCell, TableRow,TableColumn, TableGrowingMode, TableRowType, Link, Icon } from '@ui5/webcomponents-react'
import React,{useEffect} from 'react'
import WorklistColumns from './WorklistColumns'

function Worklist(props) {
   
  return (
    <Table
        columns={<><TableColumn style={{width: '12rem'}}><Label>Shipment Number</Label></TableColumn><TableColumn minWidth={600} popinText="Execution"><Label>Execution</Label></TableColumn><TableColumn demandPopin minWidth={600} popinText="Source Location"><Label>Source Location</Label></TableColumn><TableColumn demandPopin minWidth={600} popinText="Pickup Date"><Label>Pickup Date</Label></TableColumn><TableColumn demandPopin minWidth={600} popinText="Destination Location"><Label>Destination Location</Label></TableColumn><TableColumn demandPopin minWidth={600} popinText="Return Date"><Label>Return Date</Label></TableColumn></>}
        growing={TableGrowingMode.Scroll}>
    </Table>
  )
}

export default Worklist