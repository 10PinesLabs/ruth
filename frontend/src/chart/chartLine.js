import React from 'react';
import {Line} from 'react-chartjs-2';
import {ChartlineContainer} from './Chart.styled';

class ChartLine extends React.Component {
    graphOptions = () => {
      return {
        layout: {
          padding: {
            left: 60,
            right: 60,
            top: 20,
            bottom: 20,
          },
        },
      };
    };

    formattedData = () => ({
      labels: this.props.data.horarios,
      datasets: this.props.data.data.map((data) => ({
        label: data.nombre,
        data: data.data,
        borderColor: data.color,
        backgroundColor: data.color,
        fill: false,
      })),
    });

    render() {
      return (
        <ChartlineContainer>
            <Line
              data={this.formattedData()}
              options={this.graphOptions()}
            />
        </ChartlineContainer>
      );
    }
}

export default ChartLine;
