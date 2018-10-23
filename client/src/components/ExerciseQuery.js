import React from "react";
import { Query } from "react-apollo";
import { Text } from "rebass";

import Table from 'rc-table';
import '../styles/rc-table.css';
import findExercisesByDate from "../graphql/findExercisesByDate";
import { isToday } from "date-fns";

// import Table from 'rc-table';

const columns = [{
  title: 'Name', dataIndex: 'name', key:'name', width: 100,
}, {
  title: 'Age', dataIndex: 'age', key:'age', width: 100,
}, {
  title: 'Address', dataIndex: 'address', key:'address', width: 200,
}, {
  title: 'Operations', dataIndex: '', key:'operations', render: () => <a href="#">Delete</a>,
}];

const tableData = [
  { name: 'Jack', age: 28, address: 'some where', key:'1' },
  { name: 'Rose', age: 36, address: 'some where', key:'2' },
];

const exerciseData = [{
    "exerciseId": "5bcd6038b29382082b608fc3",
    "description": "jogging",
    "userId": "5bcd2718d3308082eeb1d4c8",
    "duration": 35,
    "date": "Sun Oct 21 2018",
    "__typename": "Exercise"
}];

const exerciseColumns = [
  {
    title: "User",
    dataIndex: "userId",
    key: "userId",
    width: 100
  },{
    title: "Description",
    dataIndex: "description",
    key: "description",
    width: 100
  },{
    title: "Duration",
    dataIndex: "duration",
    key: "duration",
    width: 100
  },{
    title: "Date",
    dataIndex: "date",
    key: "date",
    width: 100
  },{
    title: "ID",
    dataIndex: "exerciseId",
    key: "exerciseId",
    width: 100
  }
]

const ExerciseQuery = ({ from = "2017,1,1", to = "2025,1,1", limit = 200 }) => (
  <Query query={findExercisesByDate} variables={{ from, to, limit } }>
    {({ loading, error, data }) => {
      if (loading) return 'LOADING'
      if (error)
        return `
      👻  🌟   ERROR  🌟  👻 \n
      ${JSON.stringify(error, null, 2)}
      `
      if(from == null || undefined) {
        <div>
          Please select a date range!
        </div>
      }
      return (
        <Table columns={exerciseColumns} data={data.findExercisesByDate} />
        )
      }}
    </Query>
  );

  export { ExerciseQuery };