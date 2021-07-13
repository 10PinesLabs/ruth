import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Box from '@material-ui/core/Box';
import { ReunionesWrapper, ReunionesActivasTitle } from './EmpezarReunion.styled';
import { ReunionesActivas } from './ReunionesActivas';
import { ReunionesCerradas } from './ReunionesCerradas';

function TabPanel(props) {
  const {
    children, value, index, ...other
  } = props;

  return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    {children}
                </Box>
            )}
        </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

export default function ReunionesTabs() {
  const theme = useTheme();
  const [reunion, setReunion] = React.useState(0);

  const handleChange = (event, newValue) => {
    setReunion(newValue);
  };

  const handleChangeIndex = (index) => {
    setReunion(index);
  };

  return (
        <div>
            <Tabs
                value={reunion}
                TabIndicatorProps={{ style: { backgroundColor: '#448475' } }}
                onChange={handleChange}
                indicatorColor="primary"
                variant="fullWidth"
            >
                <ReunionesActivasTitle label="Reuniones Abiertas"/>
                <ReunionesActivasTitle label="Reuniones Cerradas"/>
            </Tabs>
            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'} // lo que hace es mover la tab de forma mas amena
                index={reunion}
                onChangeIndex={handleChangeIndex}
            >
                <TabPanel value={reunion} index={0} dir={theme.direction}>
                    <ReunionesWrapper>
                        <ReunionesActivas/>
                    </ReunionesWrapper>
                </TabPanel>
                <TabPanel value={reunion} index={1} dir={theme.direction}>
                    <ReunionesWrapper>
                        <ReunionesCerradas/>
                    </ReunionesWrapper>
                </TabPanel>
            </SwipeableViews>
        </div>
  );
}
