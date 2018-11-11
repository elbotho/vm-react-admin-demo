
import React from 'react';
import { List, Filter, Datagrid, TextField, TextInput } from 'react-admin';



export default props => (
    <List {...props} filters={<TagsFilter />} >
        <Datagrid rowClick="edit" >
            <TextField source="id" />
            <TextField source="title" />
        </Datagrid>
    </List>
);

const TagsFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Filter Tags" source="title" alwaysOn />
    </Filter>
);